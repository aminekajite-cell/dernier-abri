# Agrandissement x4 avec Real-ESRGAN (RRDBNet), sur CPU, par tuiles.
# Prérequis : pip install torch pillow numpy ; modèle RealESRGAN_x4plus.pth (releases GitHub de xinntao/Real-ESRGAN).
# usage : python3 upscale.py modele.pth entree.png sortie.png
import sys, torch, torch.nn as nn, torch.nn.functional as F, numpy as np
from PIL import Image

class RDB(nn.Module):
    def __init__(s, nf=64, gc=32):
        super().__init__()
        s.conv1 = nn.Conv2d(nf, gc, 3, 1, 1); s.conv2 = nn.Conv2d(nf + gc, gc, 3, 1, 1)
        s.conv3 = nn.Conv2d(nf + 2 * gc, gc, 3, 1, 1); s.conv4 = nn.Conv2d(nf + 3 * gc, gc, 3, 1, 1)
        s.conv5 = nn.Conv2d(nf + 4 * gc, nf, 3, 1, 1); s.l = nn.LeakyReLU(0.2, True)
    def forward(s, x):
        x1 = s.l(s.conv1(x)); x2 = s.l(s.conv2(torch.cat((x, x1), 1)))
        x3 = s.l(s.conv3(torch.cat((x, x1, x2), 1))); x4 = s.l(s.conv4(torch.cat((x, x1, x2, x3), 1)))
        return s.conv5(torch.cat((x, x1, x2, x3, x4), 1)) * 0.2 + x

class RRDB(nn.Module):
    def __init__(s, nf=64):
        super().__init__(); s.rdb1 = RDB(nf); s.rdb2 = RDB(nf); s.rdb3 = RDB(nf)
    def forward(s, x): return s.rdb3(s.rdb2(s.rdb1(x))) * 0.2 + x

class Net(nn.Module):
    def __init__(s, nf=64, nb=23):
        super().__init__()
        s.conv_first = nn.Conv2d(3, nf, 3, 1, 1); s.body = nn.Sequential(*[RRDB(nf) for _ in range(nb)])
        s.conv_body = nn.Conv2d(nf, nf, 3, 1, 1); s.conv_up1 = nn.Conv2d(nf, nf, 3, 1, 1)
        s.conv_up2 = nn.Conv2d(nf, nf, 3, 1, 1); s.conv_hr = nn.Conv2d(nf, nf, 3, 1, 1)
        s.conv_last = nn.Conv2d(nf, 3, 3, 1, 1); s.l = nn.LeakyReLU(0.2, True)
    def forward(s, x):
        f = s.conv_first(x); f = f + s.conv_body(s.body(f))
        f = s.l(s.conv_up1(F.interpolate(f, scale_factor=2, mode='nearest')))
        f = s.l(s.conv_up2(F.interpolate(f, scale_factor=2, mode='nearest')))
        return s.conv_last(s.l(s.conv_hr(f)))

def load(path):
    m = Net(); sd = torch.load(path, map_location='cpu')
    m.load_state_dict(sd.get('params_ema', sd.get('params', sd))); m.eval(); return m

def upscale(m, im, tile=160, pad=10):
    a = torch.from_numpy(np.array(im.convert('RGB'), dtype=np.float32) / 255).permute(2, 0, 1)[None]
    _, _, H, W = a.shape; out = torch.zeros(1, 3, H * 4, W * 4)
    with torch.no_grad():
        for y in range(0, H, tile):
            for x in range(0, W, tile):
                y0, x0 = max(0, y - pad), max(0, x - pad); y1, x1 = min(H, y + tile + pad), min(W, x + tile + pad)
                r = m(a[:, :, y0:y1, x0:x1])
                ty, tx = min(tile, H - y), min(tile, W - x)
                out[:, :, y * 4:(y + ty) * 4, x * 4:(x + tx) * 4] = r[:, :, (y - y0) * 4:(y - y0 + ty) * 4, (x - x0) * 4:(x - x0 + tx) * 4]
    return Image.fromarray((out[0].permute(1, 2, 0).clamp(0, 1).numpy() * 255).round().astype(np.uint8))

if __name__ == '__main__':
    torch.set_num_threads(max(1, torch.get_num_threads()))
    m = load(sys.argv[1])
    for i in range(2, len(sys.argv), 2):
        upscale(m, Image.open(sys.argv[i])).save(sys.argv[i + 1]); print(sys.argv[i + 1], flush=True)
