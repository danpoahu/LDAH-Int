/* LDAH Virtual Event Builder: flyer templates (generated assets + hand-written layouts).
   Each theme returns the HTML for one flyer root; letter = 8.5x11, square = 1:1 for Facebook/Instagram.
   All sizes use cqw so the same markup renders at any width. */
(function () {
  var A = {"jan": {"css": ".flyer{container-type:inline-size;aspect-ratio:8.5/11;position:relative;overflow:hidden;border-radius:4px;box-shadow:0 10px 30px rgba(13,18,64,.35);background:linear-gradient(170deg,#0d1240 0%,#1b1f5e 48%,#3a1f7a 100%);font-family:Poppins,Inter,sans-serif;color:#fff}\n.flyer .sky{position:absolute;inset:0;width:100%;height:100%;pointer-events:none}\n.flyer .wave{pointer-events:none}\n.flyer .fl-logo{position:absolute;left:5cqw;top:4.5cqw;width:15cqw;height:15cqw;border-radius:50%;background:#fff;display:grid;place-items:center;box-shadow:0 0 0 .8cqw #ffcc4d,0 1cqw 3cqw rgba(0,0,0,.45);z-index:3}\n.flyer .fl-logo img{width:11cqw}\n.flyer .fl-logo.pip{border-radius:2.4cqw;width:21cqw;height:12.5cqw}\n.flyer .fl-logo.pip img{width:19cqw}\n.flyer .fl-kick{position:absolute;left:24cqw;top:15.6cqw;font-size:1.85cqw;letter-spacing:.24em;white-space:nowrap;color:#9fe9f5;z-index:3;font-weight:500}\n.flyer .fl-ll{position:absolute;left:24cqw;top:6.4cqw;font:800 7cqw/1 Poppins,sans-serif;color:#fff;z-index:3;letter-spacing:-.01em}\n.flyer .fl-ll span{color:#ffcc4d}\n.flyer .fl-happy{position:absolute;left:7cqw;top:20.5cqw;font:400 7.4cqw/1.3 Pacifico,cursive;color:#ff7ab3;transform:rotate(-5deg);z-index:4;text-shadow:0 .5cqw 0 rgba(0,0,0,.35)}\n.flyer .fl-year{position:absolute;left:19cqw;top:30.5cqw;font:800 24cqw/1 Poppins,sans-serif;letter-spacing:-.03em;color:transparent;-webkit-text-stroke:.75cqw #ffcc4d;transform:rotate(-4deg);z-index:2;text-shadow:0 0 4cqw rgba(255,204,77,.45)}\n.flyer .fl-year i{font-style:normal;color:#ffcc4d;-webkit-text-stroke:0}\n.flyer .fl-month{position:absolute;left:20cqw;top:56.5cqw;white-space:nowrap;background:#ff3d8b;color:#fff;font-weight:800;font-size:2.7cqw;letter-spacing:.32em;padding:1.1cqw 3cqw;border-radius:5cqw;transform:rotate(-4deg);z-index:4;box-shadow:0 .8cqw 0 #b81f63}\n.flyer .ribbon{position:absolute;right:-13cqw;top:6cqw;width:40cqw;transform:rotate(40deg);background:#3fd8ec;color:#0d1240;text-align:center;font-weight:800;font-size:2.5cqw;letter-spacing:.2em;padding:1.2cqw 0;z-index:5;box-shadow:0 .6cqw 1.5cqw rgba(0,0,0,.35)}\n.flyer .tix{position:absolute;z-index:4;background:#fff;color:#1b1f5e;border-radius:2.2cqw;padding:2.4cqw 3cqw 2.2cqw;box-shadow:0 1.5cqw 3.5cqw rgba(0,0,0,.45)}\n.flyer .tix::before{content:\"\";position:absolute;left:50%;top:-1.2cqw;width:3.2cqw;height:3.2cqw;margin-left:-1.6cqw;border-radius:50%;background:#1b1f5e;box-shadow:inset 0 0 0 .7cqw #ffcc4d}\n.flyer .tix .tab{display:inline-block;background:#ffcc4d;color:#1b1f5e;font-weight:800;font-size:2.3cqw;letter-spacing:.14em;padding:.6cqw 2cqw;border-radius:3cqw;margin-bottom:1.4cqw}\n.flyer .tix .dd{font:800 4.8cqw/1 Poppins,sans-serif;color:#1b1f5e}\n.flyer .tix .tt2{font-weight:700;font-size:2.9cqw;color:#ff3d8b;margin:.6cqw 0 1.4cqw}\n.flyer .tix .ti{font:800 3.9cqw/1.08 Poppins,sans-serif;color:#3a1f7a;margin-bottom:1.2cqw}\n.flyer .tix .bl{font-size:2.2cqw;line-height:1.45;color:#3d4470}\n.flyer .tix .bl b{color:#ff3d8b}\n.flyer .t1{left:5cqw;top:65cqw;width:46cqw;transform:rotate(-4deg)}\n.flyer .t2{right:5cqw;top:72.5cqw;width:43cqw;transform:rotate(3.5deg)}\n.flyer .stick{position:absolute;z-index:6;width:17cqw;height:17cqw;line-height:1.05;border-radius:50%;background:radial-gradient(circle,#ffcc4d 0 62%,#ffb703 63%);color:#1b1f5e;display:grid;place-items:center;text-align:center;font-weight:800;font-size:2.3cqw;line-height:1.1;transform:rotate(12deg);box-shadow:0 .8cqw 2cqw rgba(0,0,0,.4);border:.6cqw dashed #fff}\n.flyer .s-hst{right:4cqw;top:44cqw}\n.flyer .wave{position:absolute;left:0;right:0;bottom:13.5cqw;width:100%;height:9cqw;z-index:3}\n.flyer .fl-foot{position:absolute;left:0;right:0;bottom:0;height:14cqw;background:#fff;z-index:3;display:flex;align-items:center;gap:3cqw;padding:0 5cqw;color:#1b1f5e}\n.flyer .fl-foot .rg{font-size:2.35cqw;line-height:1.35;flex:1}\n.flyer .fl-foot .rg b{display:block;font-size:3.1cqw;color:#3a1f7a}\n.flyer .fl-foot .rg b span{color:#ff3d8b}\n.flyer .fl-qr{width:11cqw;height:11cqw;border:.7cqw solid #1b1f5e;border-radius:1cqw;background:repeating-linear-gradient(90deg,#1b1f5e 0 .9cqw,#fff .9cqw 1.8cqw);display:grid;place-items:center;flex:none}\n.flyer .fl-qr span{background:#fff;font-size:1.8cqw;font-weight:800;padding:0 .6cqw}\n.flyer .fl-lg{display:flex;flex-direction:column;gap:1cqw}\n.flyer .fl-lg span{border:1.5px solid #c9d3ff;border-radius:1cqw;font-size:1.7cqw;font-weight:700;padding:.6cqw 1.2cqw;color:#1b1f5e;text-align:center}\n.flyer .fl-tag{position:absolute;left:6cqw;right:6cqw;bottom:14.6cqw;z-index:4;text-align:center;font-size:1.95cqw;font-weight:700;letter-spacing:.05em;color:#3a1f7a;line-height:1.35}\n.flyer .p-year{top:29cqw;font-size:14.5cqw;left:35cqw}\n.flyer .p-happy{top:20cqw;font-size:6cqw;left:9cqw}\n.flyer .p-month{top:43.5cqw;left:30cqw}\n.flyer .ltag{position:absolute;z-index:4;background:#fff;color:#1b1f5e;border-radius:2cqw;padding:1.8cqw 2.6cqw;width:41cqw;box-shadow:0 1.2cqw 3cqw rgba(0,0,0,.45)}\n.flyer .ltag .n{font-weight:800;font-size:2.2cqw;letter-spacing:.16em;color:#ff3d8b}\n.flyer .ltag .ti{font:800 3.1cqw/1.08 Poppins,sans-serif;color:#3a1f7a;margin:.6cqw 0}\n.flyer .ltag .bl{font-size:2cqw;color:#3d4470}\n.flyer .l1{left:5cqw;top:50cqw;transform:rotate(-3deg)}\n.flyer .l2{right:5cqw;top:50.5cqw;transform:rotate(3deg)}\n.flyer .clk-h{position:absolute;left:0;right:0;top:66.5cqw;text-align:center;z-index:4;font:400 4.3cqw/1.3 Pacifico,cursive;color:#ffcc4d;text-shadow:0 .5cqw 0 rgba(0,0,0,.35)}\n.flyer .clk-s{position:absolute;left:0;right:0;top:73cqw;text-align:center;z-index:4;font-size:2.2cqw;letter-spacing:.2em;color:#9fe9f5;font-weight:600}\n.flyer .clk{position:absolute;z-index:4;width:16.5cqw;height:16.5cqw;border-radius:50%;background:#fff;color:#1b1f5e;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;box-shadow:0 0 0 .6cqw #3fd8ec,0 1cqw 2.5cqw rgba(0,0,0,.4);padding:1cqw}\n.flyer .clk.h{box-shadow:0 0 0 .8cqw #ffcc4d,0 1cqw 2.5cqw rgba(0,0,0,.4);background:#fff7d6}\n.flyer .clk .i{font-weight:800;font-size:2.15cqw;line-height:1.05;color:#3a1f7a}\n.flyer .clk .d{font-size:1.75cqw;color:#5b6290;margin:.4cqw 0 .2cqw}\n.flyer .clk .t{font-weight:800;font-size:2.7cqw;color:#ff3d8b;line-height:1}\n.flyer .clk .hand{width:3cqw;height:3cqw;margin-bottom:.5cqw}", "skyHst": "<svg class=\"sky\" viewBox=\"0 0 100 129.4\" preserveAspectRatio=\"none\" aria-hidden=\"true\"><defs><radialGradient id=\"g1\" cx=\"78%\" cy=\"12%\" r=\"60%\"><stop offset=\"0\" stop-color=\"#5b3fc4\"/><stop offset=\"1\" stop-color=\"#5b3fc4\" stop-opacity=\"0\"/></radialGradient></defs><rect width=\"100\" height=\"129.4\" fill=\"url(#g1)\"/><circle cx=\"45.2\" cy=\"53.2\" r=\"0.33\" fill=\"#fff\" opacity=\"0.66\"/><circle cx=\"50.8\" cy=\"55.8\" r=\"0.16\" fill=\"#fff\" opacity=\"0.68\"/><circle cx=\"63.0\" cy=\"75.3\" r=\"0.14\" fill=\"#fff\" opacity=\"0.57\"/><circle cx=\"9.1\" cy=\"76.9\" r=\"0.28\" fill=\"#fff\" opacity=\"0.42\"/><circle cx=\"98.2\" cy=\"91.7\" r=\"0.27\" fill=\"#fff\" opacity=\"0.74\"/><circle cx=\"15.7\" cy=\"1.4\" r=\"0.24\" fill=\"#fff\" opacity=\"0.43\"/><circle cx=\"19.0\" cy=\"23.0\" r=\"0.13\" fill=\"#fff\" opacity=\"0.66\"/><circle cx=\"44.1\" cy=\"80.0\" r=\"0.24\" fill=\"#fff\" opacity=\"0.75\"/><circle cx=\"50.0\" cy=\"62.9\" r=\"0.23\" fill=\"#fff\" opacity=\"0.55\"/><circle cx=\"99.8\" cy=\"94.6\" r=\"0.31\" fill=\"#fff\" opacity=\"0.79\"/><circle cx=\"31.5\" cy=\"21.8\" r=\"0.19\" fill=\"#fff\" opacity=\"0.44\"/><circle cx=\"76.6\" cy=\"38.0\" r=\"0.31\" fill=\"#fff\" opacity=\"0.61\"/><circle cx=\"95.8\" cy=\"80.5\" r=\"0.12\" fill=\"#fff\" opacity=\"0.52\"/><circle cx=\"91.0\" cy=\"44.6\" r=\"0.35\" fill=\"#fff\" opacity=\"0.62\"/><circle cx=\"7.3\" cy=\"59.8\" r=\"0.30\" fill=\"#fff\" opacity=\"0.55\"/><circle cx=\"8.7\" cy=\"31.6\" r=\"0.34\" fill=\"#fff\" opacity=\"0.82\"/><circle cx=\"11.8\" cy=\"23.4\" r=\"0.14\" fill=\"#fff\" opacity=\"0.43\"/><circle cx=\"79.7\" cy=\"16.9\" r=\"0.25\" fill=\"#fff\" opacity=\"0.65\"/><circle cx=\"19.1\" cy=\"69.5\" r=\"0.15\" fill=\"#fff\" opacity=\"0.75\"/><circle cx=\"11.7\" cy=\"40.0\" r=\"0.17\" fill=\"#fff\" opacity=\"0.55\"/><circle cx=\"97.1\" cy=\"76.3\" r=\"0.19\" fill=\"#fff\" opacity=\"0.89\"/><circle cx=\"21.1\" cy=\"37.5\" r=\"0.32\" fill=\"#fff\" opacity=\"0.75\"/><circle cx=\"10.0\" cy=\"94.0\" r=\"0.17\" fill=\"#fff\" opacity=\"0.54\"/><circle cx=\"77.3\" cy=\"31.3\" r=\"0.19\" fill=\"#fff\" opacity=\"0.44\"/><circle cx=\"9.0\" cy=\"55.4\" r=\"0.18\" fill=\"#fff\" opacity=\"0.73\"/><circle cx=\"37.2\" cy=\"43.1\" r=\"0.34\" fill=\"#fff\" opacity=\"0.67\"/><circle cx=\"57.5\" cy=\"82.3\" r=\"0.16\" fill=\"#fff\" opacity=\"0.48\"/><circle cx=\"90.8\" cy=\"77.7\" r=\"0.18\" fill=\"#fff\" opacity=\"0.50\"/><circle cx=\"73.9\" cy=\"89.3\" r=\"0.17\" fill=\"#fff\" opacity=\"0.92\"/><circle cx=\"88.2\" cy=\"57.3\" r=\"0.22\" fill=\"#fff\" opacity=\"0.46\"/><circle cx=\"3.9\" cy=\"91.5\" r=\"0.17\" fill=\"#fff\" opacity=\"0.79\"/><circle cx=\"25.7\" cy=\"78.3\" r=\"0.26\" fill=\"#fff\" opacity=\"0.56\"/><circle cx=\"17.5\" cy=\"68.4\" r=\"0.14\" fill=\"#fff\" opacity=\"0.53\"/><circle cx=\"55.9\" cy=\"81.0\" r=\"0.26\" fill=\"#fff\" opacity=\"0.55\"/><circle cx=\"91.7\" cy=\"19.4\" r=\"0.12\" fill=\"#fff\" opacity=\"0.55\"/><circle cx=\"44.6\" cy=\"5.7\" r=\"0.16\" fill=\"#fff\" opacity=\"0.60\"/><circle cx=\"57.2\" cy=\"12.5\" r=\"0.20\" fill=\"#fff\" opacity=\"0.89\"/><circle cx=\"98.0\" cy=\"62.4\" r=\"0.28\" fill=\"#fff\" opacity=\"0.72\"/><circle cx=\"14.0\" cy=\"3.3\" r=\"0.12\" fill=\"#fff\" opacity=\"0.90\"/><circle cx=\"70.1\" cy=\"91.5\" r=\"0.12\" fill=\"#fff\" opacity=\"0.75\"/><circle cx=\"48.2\" cy=\"69.4\" r=\"0.19\" fill=\"#fff\" opacity=\"0.95\"/><circle cx=\"7.5\" cy=\"51.9\" r=\"0.29\" fill=\"#fff\" opacity=\"0.90\"/><circle cx=\"73.7\" cy=\"66.9\" r=\"0.30\" fill=\"#fff\" opacity=\"0.90\"/><circle cx=\"35.2\" cy=\"65.1\" r=\"0.33\" fill=\"#fff\" opacity=\"0.88\"/><circle cx=\"41.7\" cy=\"75.1\" r=\"0.32\" fill=\"#fff\" opacity=\"0.72\"/><circle cx=\"62.5\" cy=\"36.3\" r=\"0.25\" fill=\"#fff\" opacity=\"0.73\"/><circle cx=\"8.0\" cy=\"60.7\" r=\"0.35\" fill=\"#fff\" opacity=\"0.88\"/><circle cx=\"72.8\" cy=\"36.9\" r=\"0.29\" fill=\"#fff\" opacity=\"0.72\"/><circle cx=\"44.1\" cy=\"79.6\" r=\"0.14\" fill=\"#fff\" opacity=\"0.81\"/><circle cx=\"3.0\" cy=\"57.1\" r=\"0.23\" fill=\"#fff\" opacity=\"0.53\"/><circle cx=\"69.8\" cy=\"47.2\" r=\"0.26\" fill=\"#fff\" opacity=\"0.91\"/><circle cx=\"25.6\" cy=\"1.1\" r=\"0.19\" fill=\"#fff\" opacity=\"0.77\"/><circle cx=\"20.3\" cy=\"16.1\" r=\"0.33\" fill=\"#fff\" opacity=\"0.76\"/><circle cx=\"44.2\" cy=\"84.7\" r=\"0.20\" fill=\"#fff\" opacity=\"0.77\"/><circle cx=\"19.9\" cy=\"40.9\" r=\"0.31\" fill=\"#fff\" opacity=\"0.90\"/><circle cx=\"88.0\" cy=\"36.5\" r=\"0.25\" fill=\"#fff\" opacity=\"0.57\"/><circle cx=\"13.6\" cy=\"47.2\" r=\"0.31\" fill=\"#fff\" opacity=\"0.87\"/><circle cx=\"71.1\" cy=\"90.3\" r=\"0.18\" fill=\"#fff\" opacity=\"0.49\"/><circle cx=\"45.1\" cy=\"26.1\" r=\"0.17\" fill=\"#fff\" opacity=\"0.63\"/><circle cx=\"62.6\" cy=\"46.9\" r=\"0.19\" fill=\"#fff\" opacity=\"0.86\"/><path d=\"M95.3114315474702,42.140539609906476 L95.52263343001368,42.77414525753692 L96.15623907764413,42.98534714008041 L95.52263343001368,43.19654902262389 L95.3114315474702,43.83015467025434 L95.10022966492673,43.19654902262389 L94.46662401729628,42.98534714008041 L95.10022966492673,42.77414525753692Z\" fill=\"#ffcc4d\" opacity=\".9\"/><path d=\"M5.959662915346238,82.09386712395198 L6.165886175225426,82.71253690358954 L6.784555954862991,82.91876016346873 L6.165886175225426,83.12498342334793 L5.959662915346238,83.74365320298548 L5.75343965546705,83.12498342334793 L5.134769875829485,82.91876016346873 L5.75343965546705,82.71253690358954Z\" fill=\"#ffcc4d\" opacity=\".9\"/><path d=\"M69.61130732611278,53.21986802116651 L69.85766187882427,53.958931679300996 L70.59672553695876,54.20528623201249 L69.85766187882427,54.451640784723985 L69.61130732611278,55.19070444285847 L69.36495277340128,54.451640784723985 L68.6258891152668,54.20528623201249 L69.36495277340128,53.958931679300996Z\" fill=\"#ffcc4d\" opacity=\".9\"/><path d=\"M77.40227103993047,0.9343027118631619 L77.6226532137427,1.5954492332998464 L78.28379973517939,1.8158314071120745 L77.6226532137427,2.0362135809243025 L77.40227103993047,2.697360102360987 L77.18188886611824,2.0362135809243025 L76.52074234468155,1.8158314071120745 L77.18188886611824,1.5954492332998464Z\" fill=\"#ffcc4d\" opacity=\".9\"/><path d=\"M45.75424688944472,1.051217230524118 L46.07869715461358,2.024568026030697 L47.05204795012016,2.3490182911995565 L46.07869715461358,2.673468556368416 L45.75424688944472,3.6468193518749947 L45.429796624275866,2.673468556368416 L44.45644582876928,2.3490182911995565 L45.429796624275866,2.024568026030697Z\" fill=\"#ffcc4d\" opacity=\".9\"/><path d=\"M25.316446835174425,12.55491441719299 L25.523488220553872,13.176038573331333 L26.144612376692216,13.38307995871078 L25.523488220553872,13.590121344090228 L25.316446835174425,14.211245500228571 L25.109405449794977,13.590121344090228 L24.488281293656634,13.38307995871078 L25.109405449794977,13.176038573331333Z\" fill=\"#ffcc4d\" opacity=\".9\"/><line x1=\"85.25\" y1=\"17.00\" x2=\"95.00\" y2=\"17.00\" stroke=\"#ff3d8b\" stroke-width=\"0.55\" stroke-linecap=\"round\"/><circle cx=\"97.21\" cy=\"17.00\" r=\"0.44\" fill=\"#ff3d8b\"/><line x1=\"85.00\" y1=\"18.24\" x2=\"94.01\" y2=\"21.97\" stroke=\"#ff3d8b\" stroke-width=\"0.55\" stroke-linecap=\"round\"/><circle cx=\"96.05\" cy=\"22.82\" r=\"0.44\" fill=\"#ff3d8b\"/><line x1=\"84.30\" y1=\"19.30\" x2=\"91.19\" y2=\"26.19\" stroke=\"#ff3d8b\" stroke-width=\"0.55\" stroke-linecap=\"round\"/><circle cx=\"92.76\" cy=\"27.76\" r=\"0.44\" fill=\"#ff3d8b\"/><line x1=\"83.24\" y1=\"20.00\" x2=\"86.97\" y2=\"29.01\" stroke=\"#ff3d8b\" stroke-width=\"0.55\" stroke-linecap=\"round\"/><circle cx=\"87.82\" cy=\"31.05\" r=\"0.44\" fill=\"#ff3d8b\"/><line x1=\"82.00\" y1=\"20.25\" x2=\"82.00\" y2=\"30.00\" stroke=\"#ff3d8b\" stroke-width=\"0.55\" stroke-linecap=\"round\"/><circle cx=\"82.00\" cy=\"32.21\" r=\"0.44\" fill=\"#ff3d8b\"/><line x1=\"80.76\" y1=\"20.00\" x2=\"77.03\" y2=\"29.01\" stroke=\"#ff3d8b\" stroke-width=\"0.55\" stroke-linecap=\"round\"/><circle cx=\"76.18\" cy=\"31.05\" r=\"0.44\" fill=\"#ff3d8b\"/><line x1=\"79.70\" y1=\"19.30\" x2=\"72.81\" y2=\"26.19\" stroke=\"#ff3d8b\" stroke-width=\"0.55\" stroke-linecap=\"round\"/><circle cx=\"71.24\" cy=\"27.76\" r=\"0.44\" fill=\"#ff3d8b\"/><line x1=\"79.00\" y1=\"18.24\" x2=\"69.99\" y2=\"21.97\" stroke=\"#ff3d8b\" stroke-width=\"0.55\" stroke-linecap=\"round\"/><circle cx=\"67.95\" cy=\"22.82\" r=\"0.44\" fill=\"#ff3d8b\"/><line x1=\"78.75\" y1=\"17.00\" x2=\"69.00\" y2=\"17.00\" stroke=\"#ff3d8b\" stroke-width=\"0.55\" stroke-linecap=\"round\"/><circle cx=\"66.79\" cy=\"17.00\" r=\"0.44\" fill=\"#ff3d8b\"/><line x1=\"79.00\" y1=\"15.76\" x2=\"69.99\" y2=\"12.03\" stroke=\"#ff3d8b\" stroke-width=\"0.55\" stroke-linecap=\"round\"/><circle cx=\"67.95\" cy=\"11.18\" r=\"0.44\" fill=\"#ff3d8b\"/><line x1=\"79.70\" y1=\"14.70\" x2=\"72.81\" y2=\"7.81\" stroke=\"#ff3d8b\" stroke-width=\"0.55\" stroke-linecap=\"round\"/><circle cx=\"71.24\" cy=\"6.24\" r=\"0.44\" fill=\"#ff3d8b\"/><line x1=\"80.76\" y1=\"14.00\" x2=\"77.03\" y2=\"4.99\" stroke=\"#ff3d8b\" stroke-width=\"0.55\" stroke-linecap=\"round\"/><circle cx=\"76.18\" cy=\"2.95\" r=\"0.44\" fill=\"#ff3d8b\"/><line x1=\"82.00\" y1=\"13.75\" x2=\"82.00\" y2=\"4.00\" stroke=\"#ff3d8b\" stroke-width=\"0.55\" stroke-linecap=\"round\"/><circle cx=\"82.00\" cy=\"1.79\" r=\"0.44\" fill=\"#ff3d8b\"/><line x1=\"83.24\" y1=\"14.00\" x2=\"86.97\" y2=\"4.99\" stroke=\"#ff3d8b\" stroke-width=\"0.55\" stroke-linecap=\"round\"/><circle cx=\"87.82\" cy=\"2.95\" r=\"0.44\" fill=\"#ff3d8b\"/><line x1=\"84.30\" y1=\"14.70\" x2=\"91.19\" y2=\"7.81\" stroke=\"#ff3d8b\" stroke-width=\"0.55\" stroke-linecap=\"round\"/><circle cx=\"92.76\" cy=\"6.24\" r=\"0.44\" fill=\"#ff3d8b\"/><line x1=\"85.00\" y1=\"15.76\" x2=\"94.01\" y2=\"12.03\" stroke=\"#ff3d8b\" stroke-width=\"0.55\" stroke-linecap=\"round\"/><circle cx=\"96.05\" cy=\"11.18\" r=\"0.44\" fill=\"#ff3d8b\"/><line x1=\"83.75\" y1=\"17.00\" x2=\"89.00\" y2=\"17.00\" stroke=\"#ffcc4d\" stroke-width=\"0.45\" stroke-linecap=\"round\"/><circle cx=\"90.19\" cy=\"17.00\" r=\"0.36\" fill=\"#ffcc4d\"/><line x1=\"83.42\" y1=\"18.03\" x2=\"87.66\" y2=\"21.11\" stroke=\"#ffcc4d\" stroke-width=\"0.45\" stroke-linecap=\"round\"/><circle cx=\"88.63\" cy=\"21.81\" r=\"0.36\" fill=\"#ffcc4d\"/><line x1=\"82.54\" y1=\"18.66\" x2=\"84.16\" y2=\"23.66\" stroke=\"#ffcc4d\" stroke-width=\"0.45\" stroke-linecap=\"round\"/><circle cx=\"84.53\" cy=\"24.79\" r=\"0.36\" fill=\"#ffcc4d\"/><line x1=\"81.46\" y1=\"18.66\" x2=\"79.84\" y2=\"23.66\" stroke=\"#ffcc4d\" stroke-width=\"0.45\" stroke-linecap=\"round\"/><circle cx=\"79.47\" cy=\"24.79\" r=\"0.36\" fill=\"#ffcc4d\"/><line x1=\"80.58\" y1=\"18.03\" x2=\"76.34\" y2=\"21.11\" stroke=\"#ffcc4d\" stroke-width=\"0.45\" stroke-linecap=\"round\"/><circle cx=\"75.37\" cy=\"21.81\" r=\"0.36\" fill=\"#ffcc4d\"/><line x1=\"80.25\" y1=\"17.00\" x2=\"75.00\" y2=\"17.00\" stroke=\"#ffcc4d\" stroke-width=\"0.45\" stroke-linecap=\"round\"/><circle cx=\"73.81\" cy=\"17.00\" r=\"0.36\" fill=\"#ffcc4d\"/><line x1=\"80.58\" y1=\"15.97\" x2=\"76.34\" y2=\"12.89\" stroke=\"#ffcc4d\" stroke-width=\"0.45\" stroke-linecap=\"round\"/><circle cx=\"75.37\" cy=\"12.19\" r=\"0.36\" fill=\"#ffcc4d\"/><line x1=\"81.46\" y1=\"15.34\" x2=\"79.84\" y2=\"10.34\" stroke=\"#ffcc4d\" stroke-width=\"0.45\" stroke-linecap=\"round\"/><circle cx=\"79.47\" cy=\"9.21\" r=\"0.36\" fill=\"#ffcc4d\"/><line x1=\"82.54\" y1=\"15.34\" x2=\"84.16\" y2=\"10.34\" stroke=\"#ffcc4d\" stroke-width=\"0.45\" stroke-linecap=\"round\"/><circle cx=\"84.53\" cy=\"9.21\" r=\"0.36\" fill=\"#ffcc4d\"/><line x1=\"83.42\" y1=\"15.97\" x2=\"87.66\" y2=\"12.89\" stroke=\"#ffcc4d\" stroke-width=\"0.45\" stroke-linecap=\"round\"/><circle cx=\"88.63\" cy=\"12.19\" r=\"0.36\" fill=\"#ffcc4d\"/><line x1=\"65.50\" y1=\"9.00\" x2=\"70.00\" y2=\"9.00\" stroke=\"#ffffff\" stroke-width=\"0.35\" stroke-linecap=\"round\"/><circle cx=\"71.02\" cy=\"9.00\" r=\"0.28\" fill=\"#ffffff\"/><line x1=\"65.30\" y1=\"9.75\" x2=\"69.20\" y2=\"12.00\" stroke=\"#ffffff\" stroke-width=\"0.35\" stroke-linecap=\"round\"/><circle cx=\"70.08\" cy=\"12.51\" r=\"0.28\" fill=\"#ffffff\"/><line x1=\"64.75\" y1=\"10.30\" x2=\"67.00\" y2=\"14.20\" stroke=\"#ffffff\" stroke-width=\"0.35\" stroke-linecap=\"round\"/><circle cx=\"67.51\" cy=\"15.08\" r=\"0.28\" fill=\"#ffffff\"/><line x1=\"64.00\" y1=\"10.50\" x2=\"64.00\" y2=\"15.00\" stroke=\"#ffffff\" stroke-width=\"0.35\" stroke-linecap=\"round\"/><circle cx=\"64.00\" cy=\"16.02\" r=\"0.28\" fill=\"#ffffff\"/><line x1=\"63.25\" y1=\"10.30\" x2=\"61.00\" y2=\"14.20\" stroke=\"#ffffff\" stroke-width=\"0.35\" stroke-linecap=\"round\"/><circle cx=\"60.49\" cy=\"15.08\" r=\"0.28\" fill=\"#ffffff\"/><line x1=\"62.70\" y1=\"9.75\" x2=\"58.80\" y2=\"12.00\" stroke=\"#ffffff\" stroke-width=\"0.35\" stroke-linecap=\"round\"/><circle cx=\"57.92\" cy=\"12.51\" r=\"0.28\" fill=\"#ffffff\"/><line x1=\"62.50\" y1=\"9.00\" x2=\"58.00\" y2=\"9.00\" stroke=\"#ffffff\" stroke-width=\"0.35\" stroke-linecap=\"round\"/><circle cx=\"56.98\" cy=\"9.00\" r=\"0.28\" fill=\"#ffffff\"/><line x1=\"62.70\" y1=\"8.25\" x2=\"58.80\" y2=\"6.00\" stroke=\"#ffffff\" stroke-width=\"0.35\" stroke-linecap=\"round\"/><circle cx=\"57.92\" cy=\"5.49\" r=\"0.28\" fill=\"#ffffff\"/><line x1=\"63.25\" y1=\"7.70\" x2=\"61.00\" y2=\"3.80\" stroke=\"#ffffff\" stroke-width=\"0.35\" stroke-linecap=\"round\"/><circle cx=\"60.49\" cy=\"2.92\" r=\"0.28\" fill=\"#ffffff\"/><line x1=\"64.00\" y1=\"7.50\" x2=\"64.00\" y2=\"3.00\" stroke=\"#ffffff\" stroke-width=\"0.35\" stroke-linecap=\"round\"/><circle cx=\"64.00\" cy=\"1.98\" r=\"0.28\" fill=\"#ffffff\"/><line x1=\"64.75\" y1=\"7.70\" x2=\"67.00\" y2=\"3.80\" stroke=\"#ffffff\" stroke-width=\"0.35\" stroke-linecap=\"round\"/><circle cx=\"67.51\" cy=\"2.92\" r=\"0.28\" fill=\"#ffffff\"/><line x1=\"65.30\" y1=\"8.25\" x2=\"69.20\" y2=\"6.00\" stroke=\"#ffffff\" stroke-width=\"0.35\" stroke-linecap=\"round\"/><circle cx=\"70.08\" cy=\"5.49\" r=\"0.28\" fill=\"#ffffff\"/><line x1=\"94.50\" y1=\"40.00\" x2=\"99.00\" y2=\"40.00\" stroke=\"#3fd8ec\" stroke-width=\"0.4\" stroke-linecap=\"round\"/><circle cx=\"100.02\" cy=\"40.00\" r=\"0.32\" fill=\"#3fd8ec\"/><line x1=\"94.21\" y1=\"40.88\" x2=\"97.85\" y2=\"43.53\" stroke=\"#3fd8ec\" stroke-width=\"0.4\" stroke-linecap=\"round\"/><circle cx=\"98.68\" cy=\"44.13\" r=\"0.32\" fill=\"#3fd8ec\"/><line x1=\"93.46\" y1=\"41.43\" x2=\"94.85\" y2=\"45.71\" stroke=\"#3fd8ec\" stroke-width=\"0.4\" stroke-linecap=\"round\"/><circle cx=\"95.17\" cy=\"46.68\" r=\"0.32\" fill=\"#3fd8ec\"/><line x1=\"92.54\" y1=\"41.43\" x2=\"91.15\" y2=\"45.71\" stroke=\"#3fd8ec\" stroke-width=\"0.4\" stroke-linecap=\"round\"/><circle cx=\"90.83\" cy=\"46.68\" r=\"0.32\" fill=\"#3fd8ec\"/><line x1=\"91.79\" y1=\"40.88\" x2=\"88.15\" y2=\"43.53\" stroke=\"#3fd8ec\" stroke-width=\"0.4\" stroke-linecap=\"round\"/><circle cx=\"87.32\" cy=\"44.13\" r=\"0.32\" fill=\"#3fd8ec\"/><line x1=\"91.50\" y1=\"40.00\" x2=\"87.00\" y2=\"40.00\" stroke=\"#3fd8ec\" stroke-width=\"0.4\" stroke-linecap=\"round\"/><circle cx=\"85.98\" cy=\"40.00\" r=\"0.32\" fill=\"#3fd8ec\"/><line x1=\"91.79\" y1=\"39.12\" x2=\"88.15\" y2=\"36.47\" stroke=\"#3fd8ec\" stroke-width=\"0.4\" stroke-linecap=\"round\"/><circle cx=\"87.32\" cy=\"35.87\" r=\"0.32\" fill=\"#3fd8ec\"/><line x1=\"92.54\" y1=\"38.57\" x2=\"91.15\" y2=\"34.29\" stroke=\"#3fd8ec\" stroke-width=\"0.4\" stroke-linecap=\"round\"/><circle cx=\"90.83\" cy=\"33.32\" r=\"0.32\" fill=\"#3fd8ec\"/><line x1=\"93.46\" y1=\"38.57\" x2=\"94.85\" y2=\"34.29\" stroke=\"#3fd8ec\" stroke-width=\"0.4\" stroke-linecap=\"round\"/><circle cx=\"95.17\" cy=\"33.32\" r=\"0.32\" fill=\"#3fd8ec\"/><line x1=\"94.21\" y1=\"39.12\" x2=\"97.85\" y2=\"36.47\" stroke=\"#3fd8ec\" stroke-width=\"0.4\" stroke-linecap=\"round\"/><circle cx=\"98.68\" cy=\"35.87\" r=\"0.32\" fill=\"#3fd8ec\"/><line x1=\"13.25\" y1=\"44.00\" x2=\"17.00\" y2=\"44.00\" stroke=\"#b9a8ff\" stroke-width=\"0.35\" stroke-linecap=\"round\"/><circle cx=\"17.85\" cy=\"44.00\" r=\"0.28\" fill=\"#b9a8ff\"/><line x1=\"13.01\" y1=\"44.73\" x2=\"16.05\" y2=\"46.94\" stroke=\"#b9a8ff\" stroke-width=\"0.35\" stroke-linecap=\"round\"/><circle cx=\"16.73\" cy=\"47.44\" r=\"0.28\" fill=\"#b9a8ff\"/><line x1=\"12.39\" y1=\"45.19\" x2=\"13.55\" y2=\"48.76\" stroke=\"#b9a8ff\" stroke-width=\"0.35\" stroke-linecap=\"round\"/><circle cx=\"13.81\" cy=\"49.56\" r=\"0.28\" fill=\"#b9a8ff\"/><line x1=\"11.61\" y1=\"45.19\" x2=\"10.45\" y2=\"48.76\" stroke=\"#b9a8ff\" stroke-width=\"0.35\" stroke-linecap=\"round\"/><circle cx=\"10.19\" cy=\"49.56\" r=\"0.28\" fill=\"#b9a8ff\"/><line x1=\"10.99\" y1=\"44.73\" x2=\"7.95\" y2=\"46.94\" stroke=\"#b9a8ff\" stroke-width=\"0.35\" stroke-linecap=\"round\"/><circle cx=\"7.27\" cy=\"47.44\" r=\"0.28\" fill=\"#b9a8ff\"/><line x1=\"10.75\" y1=\"44.00\" x2=\"7.00\" y2=\"44.00\" stroke=\"#b9a8ff\" stroke-width=\"0.35\" stroke-linecap=\"round\"/><circle cx=\"6.15\" cy=\"44.00\" r=\"0.28\" fill=\"#b9a8ff\"/><line x1=\"10.99\" y1=\"43.27\" x2=\"7.95\" y2=\"41.06\" stroke=\"#b9a8ff\" stroke-width=\"0.35\" stroke-linecap=\"round\"/><circle cx=\"7.27\" cy=\"40.56\" r=\"0.28\" fill=\"#b9a8ff\"/><line x1=\"11.61\" y1=\"42.81\" x2=\"10.45\" y2=\"39.24\" stroke=\"#b9a8ff\" stroke-width=\"0.35\" stroke-linecap=\"round\"/><circle cx=\"10.19\" cy=\"38.44\" r=\"0.28\" fill=\"#b9a8ff\"/><line x1=\"12.39\" y1=\"42.81\" x2=\"13.55\" y2=\"39.24\" stroke=\"#b9a8ff\" stroke-width=\"0.35\" stroke-linecap=\"round\"/><circle cx=\"13.81\" cy=\"38.44\" r=\"0.28\" fill=\"#b9a8ff\"/><line x1=\"13.01\" y1=\"43.27\" x2=\"16.05\" y2=\"41.06\" stroke=\"#b9a8ff\" stroke-width=\"0.35\" stroke-linecap=\"round\"/><circle cx=\"16.73\" cy=\"40.56\" r=\"0.28\" fill=\"#b9a8ff\"/><line x1=\"48.88\" y1=\"40.00\" x2=\"51.50\" y2=\"40.00\" stroke=\"#ffcc4d\" stroke-width=\"0.3\" stroke-linecap=\"round\"/><circle cx=\"52.09\" cy=\"40.00\" r=\"0.24\" fill=\"#ffcc4d\"/><line x1=\"48.62\" y1=\"40.62\" x2=\"50.47\" y2=\"42.47\" stroke=\"#ffcc4d\" stroke-width=\"0.3\" stroke-linecap=\"round\"/><circle cx=\"50.90\" cy=\"42.90\" r=\"0.24\" fill=\"#ffcc4d\"/><line x1=\"48.00\" y1=\"40.88\" x2=\"48.00\" y2=\"43.50\" stroke=\"#ffcc4d\" stroke-width=\"0.3\" stroke-linecap=\"round\"/><circle cx=\"48.00\" cy=\"44.09\" r=\"0.24\" fill=\"#ffcc4d\"/><line x1=\"47.38\" y1=\"40.62\" x2=\"45.53\" y2=\"42.47\" stroke=\"#ffcc4d\" stroke-width=\"0.3\" stroke-linecap=\"round\"/><circle cx=\"45.10\" cy=\"42.90\" r=\"0.24\" fill=\"#ffcc4d\"/><line x1=\"47.12\" y1=\"40.00\" x2=\"44.50\" y2=\"40.00\" stroke=\"#ffcc4d\" stroke-width=\"0.3\" stroke-linecap=\"round\"/><circle cx=\"43.91\" cy=\"40.00\" r=\"0.24\" fill=\"#ffcc4d\"/><line x1=\"47.38\" y1=\"39.38\" x2=\"45.53\" y2=\"37.53\" stroke=\"#ffcc4d\" stroke-width=\"0.3\" stroke-linecap=\"round\"/><circle cx=\"45.10\" cy=\"37.10\" r=\"0.24\" fill=\"#ffcc4d\"/><line x1=\"48.00\" y1=\"39.12\" x2=\"48.00\" y2=\"36.50\" stroke=\"#ffcc4d\" stroke-width=\"0.3\" stroke-linecap=\"round\"/><circle cx=\"48.00\" cy=\"35.91\" r=\"0.24\" fill=\"#ffcc4d\"/><line x1=\"48.62\" y1=\"39.38\" x2=\"50.47\" y2=\"37.53\" stroke=\"#ffcc4d\" stroke-width=\"0.3\" stroke-linecap=\"round\"/><circle cx=\"50.90\" cy=\"37.10\" r=\"0.24\" fill=\"#ffcc4d\"/><path d=\"M104,30 C80,46 92,58 66,66 S40,64 30,84 S8,96 -4,104\" stroke=\"#ff3d8b\" stroke-width=\"0.8\" fill=\"none\" stroke-linecap=\"round\"/><path d=\"M104,36 C84,50 96,62 70,71 S44,70 34,90 S12,100 -4,110\" stroke=\"#ffcc4d\" stroke-width=\"0.6\" fill=\"none\" stroke-linecap=\"round\"/><path d=\"M-4,58 C10,52 18,64 30,58\" stroke=\"#3fd8ec\" stroke-width=\"0.55\" fill=\"none\" stroke-linecap=\"round\"/><rect x=\"62.9\" y=\"48.2\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#ffffff\" transform=\"rotate(118 62.9 48.2)\"/><rect x=\"80.7\" y=\"103.5\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#ff3d8b\" transform=\"rotate(36 80.7 103.5)\"/><rect x=\"47.5\" y=\"19.3\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#ffcc4d\" transform=\"rotate(136 47.5 19.3)\"/><rect x=\"53.5\" y=\"3.9\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#ff3d8b\" transform=\"rotate(49 53.5 3.9)\"/><rect x=\"34.6\" y=\"75.3\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#ffffff\" transform=\"rotate(90 34.6 75.3)\"/><rect x=\"99.7\" y=\"17.2\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#ff3d8b\" transform=\"rotate(16 99.7 17.2)\"/><rect x=\"93.3\" y=\"78.0\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#ff3d8b\" transform=\"rotate(81 93.3 78.0)\"/><rect x=\"19.7\" y=\"95.8\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#ffcc4d\" transform=\"rotate(68 19.7 95.8)\"/><rect x=\"56.9\" y=\"95.0\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#3fd8ec\" transform=\"rotate(83 56.9 95.0)\"/><rect x=\"65.1\" y=\"22.1\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#ffcc4d\" transform=\"rotate(38 65.1 22.1)\"/><rect x=\"90.0\" y=\"105.9\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#3fd8ec\" transform=\"rotate(97 90.0 105.9)\"/><rect x=\"79.1\" y=\"34.6\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#ffcc4d\" transform=\"rotate(63 79.1 34.6)\"/><rect x=\"8.3\" y=\"47.6\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#ffffff\" transform=\"rotate(76 8.3 47.6)\"/><rect x=\"27.5\" y=\"99.3\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#ff3d8b\" transform=\"rotate(146 27.5 99.3)\"/><rect x=\"6.4\" y=\"86.4\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#ff3d8b\" transform=\"rotate(96 6.4 86.4)\"/><rect x=\"68.7\" y=\"98.9\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#b9a8ff\" transform=\"rotate(27 68.7 98.9)\"/><rect x=\"51.7\" y=\"78.1\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#b9a8ff\" transform=\"rotate(170 51.7 78.1)\"/><rect x=\"49.3\" y=\"102.5\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#ffcc4d\" transform=\"rotate(136 49.3 102.5)\"/><rect x=\"43.9\" y=\"60.3\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#ffffff\" transform=\"rotate(115 43.9 60.3)\"/><rect x=\"52.3\" y=\"91.1\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#ffffff\" transform=\"rotate(46 52.3 91.1)\"/><rect x=\"67.1\" y=\"103.1\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#ffffff\" transform=\"rotate(37 67.1 103.1)\"/><rect x=\"85.1\" y=\"104.6\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#ffffff\" transform=\"rotate(49 85.1 104.6)\"/><rect x=\"49.8\" y=\"44.4\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#ffcc4d\" transform=\"rotate(91 49.8 44.4)\"/><rect x=\"60.5\" y=\"3.0\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#ffcc4d\" transform=\"rotate(93 60.5 3.0)\"/><rect x=\"40.1\" y=\"86.5\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#ffffff\" transform=\"rotate(22 40.1 86.5)\"/><rect x=\"9.3\" y=\"18.0\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#ffffff\" transform=\"rotate(83 9.3 18.0)\"/><rect x=\"92.1\" y=\"86.4\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#b9a8ff\" transform=\"rotate(48 92.1 86.4)\"/><rect x=\"47.3\" y=\"13.7\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#b9a8ff\" transform=\"rotate(162 47.3 13.7)\"/><rect x=\"93.6\" y=\"99.4\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#ffffff\" transform=\"rotate(57 93.6 99.4)\"/><rect x=\"19.1\" y=\"66.7\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#3fd8ec\" transform=\"rotate(23 19.1 66.7)\"/><rect x=\"77.9\" y=\"2.5\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#ff3d8b\" transform=\"rotate(28 77.9 2.5)\"/><rect x=\"1.2\" y=\"30.7\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#3fd8ec\" transform=\"rotate(44 1.2 30.7)\"/><rect x=\"49.9\" y=\"54.0\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#ffffff\" transform=\"rotate(22 49.9 54.0)\"/><rect x=\"51.0\" y=\"27.1\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#ff3d8b\" transform=\"rotate(126 51.0 27.1)\"/><rect x=\"87.9\" y=\"2.5\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#b9a8ff\" transform=\"rotate(149 87.9 2.5)\"/><rect x=\"61.6\" y=\"58.1\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#ffffff\" transform=\"rotate(115 61.6 58.1)\"/><rect x=\"53.0\" y=\"91.9\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#ffffff\" transform=\"rotate(106 53.0 91.9)\"/><rect x=\"13.6\" y=\"98.8\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#3fd8ec\" transform=\"rotate(162 13.6 98.8)\"/><rect x=\"31.6\" y=\"34.0\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#ff3d8b\" transform=\"rotate(39 31.6 34.0)\"/><rect x=\"99.8\" y=\"95.9\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#ff3d8b\" transform=\"rotate(160 99.8 95.9)\"/><rect x=\"13.3\" y=\"9.5\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#b9a8ff\" transform=\"rotate(17 13.3 9.5)\"/><rect x=\"83.2\" y=\"45.5\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#ff3d8b\" transform=\"rotate(36 83.2 45.5)\"/><rect x=\"62.8\" y=\"86.3\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#ffcc4d\" transform=\"rotate(36 62.8 86.3)\"/><rect x=\"68.2\" y=\"98.4\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#3fd8ec\" transform=\"rotate(21 68.2 98.4)\"/><rect x=\"50.6\" y=\"81.9\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#ffffff\" transform=\"rotate(180 50.6 81.9)\"/><rect x=\"83.3\" y=\"86.7\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#b9a8ff\" transform=\"rotate(19 83.3 86.7)\"/><rect x=\"3.7\" y=\"59.6\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#ffffff\" transform=\"rotate(163 3.7 59.6)\"/><rect x=\"48.1\" y=\"20.5\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#ffcc4d\" transform=\"rotate(37 48.1 20.5)\"/><rect x=\"84.0\" y=\"107.0\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#ffcc4d\" transform=\"rotate(104 84.0 107.0)\"/><rect x=\"13.4\" y=\"73.5\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#ffcc4d\" transform=\"rotate(138 13.4 73.5)\"/><rect x=\"32.7\" y=\"50.4\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#ffffff\" transform=\"rotate(64 32.7 50.4)\"/><rect x=\"21.0\" y=\"40.3\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#ffcc4d\" transform=\"rotate(152 21.0 40.3)\"/><rect x=\"18.1\" y=\"49.0\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#3fd8ec\" transform=\"rotate(73 18.1 49.0)\"/><rect x=\"19.5\" y=\"17.8\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#ffffff\" transform=\"rotate(143 19.5 17.8)\"/><rect x=\"32.4\" y=\"9.2\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#b9a8ff\" transform=\"rotate(103 32.4 9.2)\"/><rect x=\"19.1\" y=\"63.1\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#3fd8ec\" transform=\"rotate(145 19.1 63.1)\"/><rect x=\"25.8\" y=\"98.4\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#ff3d8b\" transform=\"rotate(147 25.8 98.4)\"/><rect x=\"40.6\" y=\"96.8\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#ffffff\" transform=\"rotate(125 40.6 96.8)\"/><rect x=\"76.7\" y=\"82.6\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#b9a8ff\" transform=\"rotate(37 76.7 82.6)\"/><rect x=\"18.5\" y=\"86.1\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#3fd8ec\" transform=\"rotate(84 18.5 86.1)\"/><rect x=\"1.1\" y=\"38.4\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#ffffff\" transform=\"rotate(9 1.1 38.4)\"/><rect x=\"27.3\" y=\"103.8\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#3fd8ec\" transform=\"rotate(61 27.3 103.8)\"/><rect x=\"66.0\" y=\"61.5\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#ffffff\" transform=\"rotate(14 66.0 61.5)\"/><rect x=\"51.5\" y=\"53.7\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#ff3d8b\" transform=\"rotate(126 51.5 53.7)\"/><rect x=\"76.2\" y=\"105.8\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#ffcc4d\" transform=\"rotate(21 76.2 105.8)\"/><rect x=\"10.8\" y=\"25.6\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#b9a8ff\" transform=\"rotate(72 10.8 25.6)\"/><rect x=\"5.0\" y=\"21.1\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#b9a8ff\" transform=\"rotate(2 5.0 21.1)\"/><rect x=\"25.9\" y=\"29.8\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#3fd8ec\" transform=\"rotate(99 25.9 29.8)\"/><rect x=\"50.8\" y=\"104.5\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#ffffff\" transform=\"rotate(152 50.8 104.5)\"/><rect x=\"10.0\" y=\"48.0\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#ffcc4d\" transform=\"rotate(99 10.0 48.0)\"/><path d=\"M8,69.612 q2,9.1 -1.2,16.900000000000002 t1.6,9.1\" stroke=\"#d9defc\" stroke-width=\".25\" fill=\"none\"/><ellipse cx=\"8\" cy=\"64\" rx=\"4.6\" ry=\"5.611999999999999\" fill=\"#ff3d8b\"/><path d=\"M7.2,69.41199999999999 l.8,1.4 l.8,-1.4z\" fill=\"#ff3d8b\"/><ellipse cx=\"6.252000000000001\" cy=\"61.64296\" rx=\"0.9199999999999999\" ry=\"1.6835999999999998\" fill=\"#fff\" opacity=\".5\" transform=\"rotate(-25 6.252000000000001 61.64296)\"/><path d=\"M15.5,65.636 q-1.5,9.799999999999999 0.8999999999999999,18.2 t-1.2000000000000002,9.799999999999999\" stroke=\"#d9defc\" stroke-width=\".25\" fill=\"none\"/><ellipse cx=\"15.5\" cy=\"61\" rx=\"3.8\" ry=\"4.636\" fill=\"#ffcc4d\"/><path d=\"M14.7,65.43599999999999 l.8,1.4 l.8,-1.4z\" fill=\"#ffcc4d\"/><ellipse cx=\"14.056000000000001\" cy=\"59.05288\" rx=\"0.76\" ry=\"1.3908\" fill=\"#fff\" opacity=\".5\" transform=\"rotate(-25 14.056000000000001 59.05288)\"/><path d=\"M91,87.368 q-2,8.399999999999999 1.2,15.600000000000001 t-1.6,8.399999999999999\" stroke=\"#d9defc\" stroke-width=\".25\" fill=\"none\"/><ellipse cx=\"91\" cy=\"82\" rx=\"4.4\" ry=\"5.368\" fill=\"#3fd8ec\"/><path d=\"M90.2,87.16799999999999 l.8,1.4 l.8,-1.4z\" fill=\"#3fd8ec\"/><ellipse cx=\"89.328\" cy=\"79.74544\" rx=\"0.8800000000000001\" ry=\"1.6104\" fill=\"#fff\" opacity=\".5\" transform=\"rotate(-25 89.328 79.74544)\"/><path d=\"M97,82.148 q2,9.1 -1.2,16.900000000000002 t1.6,9.1\" stroke=\"#d9defc\" stroke-width=\".25\" fill=\"none\"/><ellipse cx=\"97\" cy=\"78\" rx=\"3.4\" ry=\"4.148\" fill=\"#b9a8ff\"/><path d=\"M96.2,81.948 l.8,1.4 l.8,-1.4z\" fill=\"#b9a8ff\"/><ellipse cx=\"95.708\" cy=\"76.25784\" rx=\"0.68\" ry=\"1.2444\" fill=\"#fff\" opacity=\".5\" transform=\"rotate(-25 95.708 76.25784)\"/></svg>", "skyPartner": "<svg class=\"sky\" viewBox=\"0 0 100 129.4\" preserveAspectRatio=\"none\" aria-hidden=\"true\"><defs><radialGradient id=\"g1\" cx=\"78%\" cy=\"12%\" r=\"60%\"><stop offset=\"0\" stop-color=\"#5b3fc4\"/><stop offset=\"1\" stop-color=\"#5b3fc4\" stop-opacity=\"0\"/></radialGradient></defs><rect width=\"100\" height=\"129.4\" fill=\"url(#g1)\"/><circle cx=\"66.8\" cy=\"90.8\" r=\"0.21\" fill=\"#fff\" opacity=\"0.92\"/><circle cx=\"38.6\" cy=\"92.2\" r=\"0.32\" fill=\"#fff\" opacity=\"0.70\"/><circle cx=\"59.7\" cy=\"40.8\" r=\"0.23\" fill=\"#fff\" opacity=\"0.56\"/><circle cx=\"39.9\" cy=\"29.7\" r=\"0.24\" fill=\"#fff\" opacity=\"0.67\"/><circle cx=\"27.0\" cy=\"88.3\" r=\"0.27\" fill=\"#fff\" opacity=\"0.81\"/><circle cx=\"2.7\" cy=\"73.4\" r=\"0.25\" fill=\"#fff\" opacity=\"0.75\"/><circle cx=\"40.9\" cy=\"65.0\" r=\"0.13\" fill=\"#fff\" opacity=\"0.57\"/><circle cx=\"39.8\" cy=\"55.3\" r=\"0.29\" fill=\"#fff\" opacity=\"0.58\"/><circle cx=\"79.8\" cy=\"21.3\" r=\"0.29\" fill=\"#fff\" opacity=\"0.54\"/><circle cx=\"75.5\" cy=\"4.3\" r=\"0.14\" fill=\"#fff\" opacity=\"0.85\"/><circle cx=\"90.9\" cy=\"13.7\" r=\"0.34\" fill=\"#fff\" opacity=\"0.53\"/><circle cx=\"70.6\" cy=\"4.8\" r=\"0.22\" fill=\"#fff\" opacity=\"0.46\"/><circle cx=\"86.1\" cy=\"33.9\" r=\"0.16\" fill=\"#fff\" opacity=\"0.60\"/><circle cx=\"14.0\" cy=\"39.6\" r=\"0.26\" fill=\"#fff\" opacity=\"0.75\"/><circle cx=\"68.2\" cy=\"34.6\" r=\"0.29\" fill=\"#fff\" opacity=\"0.85\"/><circle cx=\"13.7\" cy=\"27.6\" r=\"0.15\" fill=\"#fff\" opacity=\"0.66\"/><circle cx=\"50.3\" cy=\"29.3\" r=\"0.24\" fill=\"#fff\" opacity=\"0.87\"/><circle cx=\"27.5\" cy=\"57.9\" r=\"0.29\" fill=\"#fff\" opacity=\"0.78\"/><circle cx=\"19.0\" cy=\"26.5\" r=\"0.18\" fill=\"#fff\" opacity=\"0.92\"/><circle cx=\"50.2\" cy=\"62.0\" r=\"0.17\" fill=\"#fff\" opacity=\"0.78\"/><circle cx=\"62.8\" cy=\"0.9\" r=\"0.18\" fill=\"#fff\" opacity=\"0.41\"/><circle cx=\"3.8\" cy=\"21.1\" r=\"0.18\" fill=\"#fff\" opacity=\"0.82\"/><circle cx=\"91.3\" cy=\"15.3\" r=\"0.17\" fill=\"#fff\" opacity=\"0.94\"/><circle cx=\"48.4\" cy=\"33.6\" r=\"0.20\" fill=\"#fff\" opacity=\"0.67\"/><circle cx=\"13.3\" cy=\"82.6\" r=\"0.30\" fill=\"#fff\" opacity=\"0.65\"/><circle cx=\"82.2\" cy=\"79.6\" r=\"0.30\" fill=\"#fff\" opacity=\"0.64\"/><circle cx=\"74.7\" cy=\"37.1\" r=\"0.15\" fill=\"#fff\" opacity=\"0.48\"/><circle cx=\"83.6\" cy=\"56.7\" r=\"0.19\" fill=\"#fff\" opacity=\"0.82\"/><circle cx=\"82.6\" cy=\"17.5\" r=\"0.27\" fill=\"#fff\" opacity=\"0.72\"/><circle cx=\"46.2\" cy=\"30.8\" r=\"0.25\" fill=\"#fff\" opacity=\"0.64\"/><circle cx=\"56.8\" cy=\"77.5\" r=\"0.23\" fill=\"#fff\" opacity=\"0.85\"/><circle cx=\"0.9\" cy=\"29.5\" r=\"0.33\" fill=\"#fff\" opacity=\"0.73\"/><circle cx=\"69.5\" cy=\"47.0\" r=\"0.30\" fill=\"#fff\" opacity=\"0.58\"/><circle cx=\"88.2\" cy=\"20.8\" r=\"0.27\" fill=\"#fff\" opacity=\"0.58\"/><circle cx=\"90.6\" cy=\"30.6\" r=\"0.22\" fill=\"#fff\" opacity=\"0.73\"/><circle cx=\"90.2\" cy=\"65.3\" r=\"0.18\" fill=\"#fff\" opacity=\"0.69\"/><circle cx=\"99.2\" cy=\"43.5\" r=\"0.17\" fill=\"#fff\" opacity=\"0.93\"/><circle cx=\"73.0\" cy=\"49.0\" r=\"0.14\" fill=\"#fff\" opacity=\"0.86\"/><circle cx=\"2.4\" cy=\"64.3\" r=\"0.25\" fill=\"#fff\" opacity=\"0.84\"/><circle cx=\"73.9\" cy=\"35.0\" r=\"0.21\" fill=\"#fff\" opacity=\"0.49\"/><circle cx=\"59.1\" cy=\"16.8\" r=\"0.14\" fill=\"#fff\" opacity=\"0.65\"/><circle cx=\"85.5\" cy=\"77.1\" r=\"0.17\" fill=\"#fff\" opacity=\"0.43\"/><circle cx=\"15.9\" cy=\"28.1\" r=\"0.13\" fill=\"#fff\" opacity=\"0.86\"/><circle cx=\"42.3\" cy=\"55.3\" r=\"0.19\" fill=\"#fff\" opacity=\"0.70\"/><circle cx=\"33.5\" cy=\"26.0\" r=\"0.14\" fill=\"#fff\" opacity=\"0.57\"/><circle cx=\"2.6\" cy=\"62.1\" r=\"0.14\" fill=\"#fff\" opacity=\"0.85\"/><circle cx=\"42.2\" cy=\"67.7\" r=\"0.23\" fill=\"#fff\" opacity=\"0.90\"/><circle cx=\"33.8\" cy=\"43.6\" r=\"0.20\" fill=\"#fff\" opacity=\"0.84\"/><circle cx=\"33.3\" cy=\"13.0\" r=\"0.23\" fill=\"#fff\" opacity=\"0.84\"/><circle cx=\"7.2\" cy=\"58.7\" r=\"0.13\" fill=\"#fff\" opacity=\"0.82\"/><circle cx=\"98.6\" cy=\"33.2\" r=\"0.12\" fill=\"#fff\" opacity=\"0.61\"/><circle cx=\"8.9\" cy=\"44.1\" r=\"0.24\" fill=\"#fff\" opacity=\"0.41\"/><circle cx=\"36.2\" cy=\"1.0\" r=\"0.15\" fill=\"#fff\" opacity=\"0.91\"/><circle cx=\"91.6\" cy=\"23.3\" r=\"0.16\" fill=\"#fff\" opacity=\"0.75\"/><circle cx=\"68.4\" cy=\"30.5\" r=\"0.21\" fill=\"#fff\" opacity=\"0.69\"/><circle cx=\"27.4\" cy=\"84.2\" r=\"0.23\" fill=\"#fff\" opacity=\"0.80\"/><circle cx=\"30.3\" cy=\"14.8\" r=\"0.33\" fill=\"#fff\" opacity=\"0.90\"/><circle cx=\"75.3\" cy=\"1.6\" r=\"0.23\" fill=\"#fff\" opacity=\"0.84\"/><circle cx=\"31.3\" cy=\"18.8\" r=\"0.20\" fill=\"#fff\" opacity=\"0.72\"/><circle cx=\"60.0\" cy=\"44.8\" r=\"0.24\" fill=\"#fff\" opacity=\"0.64\"/><path d=\"M87.0849733085917,36.88982656698127 L87.42157503950183,37.899631759711674 L88.43138023223224,38.23623349062181 L87.42157503950183,38.57283522153194 L87.0849733085917,39.58264041426234 L86.74837157768157,38.57283522153194 L85.73856638495116,38.23623349062181 L86.74837157768157,37.899631759711674Z\" fill=\"#ffcc4d\" opacity=\".9\"/><path d=\"M91.11105615871121,58.17661598765855 L91.45235560778674,59.20051433488514 L92.47625395501332,59.54181378396067 L91.45235560778674,59.8831132330362 L91.11105615871121,60.90701158026279 L90.76975670963567,59.8831132330362 L89.7458583624091,59.54181378396067 L90.76975670963567,59.20051433488514Z\" fill=\"#ffcc4d\" opacity=\".9\"/><path d=\"M54.73859309458855,79.98121683457246 L55.01130711253939,80.79935888842499 L55.82944916639191,81.07207290637582 L55.01130711253939,81.34478692432666 L54.73859309458855,82.16292897817918 L54.46587907663771,81.34478692432666 L53.64773702278519,81.07207290637582 L54.46587907663771,80.79935888842499Z\" fill=\"#ffcc4d\" opacity=\".9\"/><path d=\"M40.84587398126558,89.59502265728051 L41.14491151103291,90.49213524658248 L42.04202410033487,90.7911727763498 L41.14491151103291,91.09021030611711 L40.84587398126558,91.98732289541908 L40.54683645149826,91.09021030611711 L39.649723862196296,90.7911727763498 L40.54683645149826,90.49213524658248Z\" fill=\"#ffcc4d\" opacity=\".9\"/><path d=\"M75.5379568484412,7.462270815042234 L75.8673434521479,8.450430626162358 L76.85550326326803,8.779817229869067 L75.8673434521479,9.109203833575776 L75.5379568484412,10.097363644695902 L75.20857024473449,9.109203833575776 L74.22041043361436,8.779817229869067 L75.20857024473449,8.450430626162358Z\" fill=\"#ffcc4d\" opacity=\".9\"/><path d=\"M40.54599695408676,19.774334214132764 L40.766140793954264,20.434765733735286 L41.42657231355679,20.654909573602794 L40.766140793954264,20.8750534134703 L40.54599695408676,21.535484933072823 L40.32585311421926,20.8750534134703 L39.66542159461673,20.654909573602794 L40.32585311421926,20.434765733735286Z\" fill=\"#ffcc4d\" opacity=\".9\"/><line x1=\"85.25\" y1=\"17.00\" x2=\"95.00\" y2=\"17.00\" stroke=\"#ff3d8b\" stroke-width=\"0.55\" stroke-linecap=\"round\"/><circle cx=\"97.21\" cy=\"17.00\" r=\"0.44\" fill=\"#ff3d8b\"/><line x1=\"85.00\" y1=\"18.24\" x2=\"94.01\" y2=\"21.97\" stroke=\"#ff3d8b\" stroke-width=\"0.55\" stroke-linecap=\"round\"/><circle cx=\"96.05\" cy=\"22.82\" r=\"0.44\" fill=\"#ff3d8b\"/><line x1=\"84.30\" y1=\"19.30\" x2=\"91.19\" y2=\"26.19\" stroke=\"#ff3d8b\" stroke-width=\"0.55\" stroke-linecap=\"round\"/><circle cx=\"92.76\" cy=\"27.76\" r=\"0.44\" fill=\"#ff3d8b\"/><line x1=\"83.24\" y1=\"20.00\" x2=\"86.97\" y2=\"29.01\" stroke=\"#ff3d8b\" stroke-width=\"0.55\" stroke-linecap=\"round\"/><circle cx=\"87.82\" cy=\"31.05\" r=\"0.44\" fill=\"#ff3d8b\"/><line x1=\"82.00\" y1=\"20.25\" x2=\"82.00\" y2=\"30.00\" stroke=\"#ff3d8b\" stroke-width=\"0.55\" stroke-linecap=\"round\"/><circle cx=\"82.00\" cy=\"32.21\" r=\"0.44\" fill=\"#ff3d8b\"/><line x1=\"80.76\" y1=\"20.00\" x2=\"77.03\" y2=\"29.01\" stroke=\"#ff3d8b\" stroke-width=\"0.55\" stroke-linecap=\"round\"/><circle cx=\"76.18\" cy=\"31.05\" r=\"0.44\" fill=\"#ff3d8b\"/><line x1=\"79.70\" y1=\"19.30\" x2=\"72.81\" y2=\"26.19\" stroke=\"#ff3d8b\" stroke-width=\"0.55\" stroke-linecap=\"round\"/><circle cx=\"71.24\" cy=\"27.76\" r=\"0.44\" fill=\"#ff3d8b\"/><line x1=\"79.00\" y1=\"18.24\" x2=\"69.99\" y2=\"21.97\" stroke=\"#ff3d8b\" stroke-width=\"0.55\" stroke-linecap=\"round\"/><circle cx=\"67.95\" cy=\"22.82\" r=\"0.44\" fill=\"#ff3d8b\"/><line x1=\"78.75\" y1=\"17.00\" x2=\"69.00\" y2=\"17.00\" stroke=\"#ff3d8b\" stroke-width=\"0.55\" stroke-linecap=\"round\"/><circle cx=\"66.79\" cy=\"17.00\" r=\"0.44\" fill=\"#ff3d8b\"/><line x1=\"79.00\" y1=\"15.76\" x2=\"69.99\" y2=\"12.03\" stroke=\"#ff3d8b\" stroke-width=\"0.55\" stroke-linecap=\"round\"/><circle cx=\"67.95\" cy=\"11.18\" r=\"0.44\" fill=\"#ff3d8b\"/><line x1=\"79.70\" y1=\"14.70\" x2=\"72.81\" y2=\"7.81\" stroke=\"#ff3d8b\" stroke-width=\"0.55\" stroke-linecap=\"round\"/><circle cx=\"71.24\" cy=\"6.24\" r=\"0.44\" fill=\"#ff3d8b\"/><line x1=\"80.76\" y1=\"14.00\" x2=\"77.03\" y2=\"4.99\" stroke=\"#ff3d8b\" stroke-width=\"0.55\" stroke-linecap=\"round\"/><circle cx=\"76.18\" cy=\"2.95\" r=\"0.44\" fill=\"#ff3d8b\"/><line x1=\"82.00\" y1=\"13.75\" x2=\"82.00\" y2=\"4.00\" stroke=\"#ff3d8b\" stroke-width=\"0.55\" stroke-linecap=\"round\"/><circle cx=\"82.00\" cy=\"1.79\" r=\"0.44\" fill=\"#ff3d8b\"/><line x1=\"83.24\" y1=\"14.00\" x2=\"86.97\" y2=\"4.99\" stroke=\"#ff3d8b\" stroke-width=\"0.55\" stroke-linecap=\"round\"/><circle cx=\"87.82\" cy=\"2.95\" r=\"0.44\" fill=\"#ff3d8b\"/><line x1=\"84.30\" y1=\"14.70\" x2=\"91.19\" y2=\"7.81\" stroke=\"#ff3d8b\" stroke-width=\"0.55\" stroke-linecap=\"round\"/><circle cx=\"92.76\" cy=\"6.24\" r=\"0.44\" fill=\"#ff3d8b\"/><line x1=\"85.00\" y1=\"15.76\" x2=\"94.01\" y2=\"12.03\" stroke=\"#ff3d8b\" stroke-width=\"0.55\" stroke-linecap=\"round\"/><circle cx=\"96.05\" cy=\"11.18\" r=\"0.44\" fill=\"#ff3d8b\"/><line x1=\"83.75\" y1=\"17.00\" x2=\"89.00\" y2=\"17.00\" stroke=\"#ffcc4d\" stroke-width=\"0.45\" stroke-linecap=\"round\"/><circle cx=\"90.19\" cy=\"17.00\" r=\"0.36\" fill=\"#ffcc4d\"/><line x1=\"83.42\" y1=\"18.03\" x2=\"87.66\" y2=\"21.11\" stroke=\"#ffcc4d\" stroke-width=\"0.45\" stroke-linecap=\"round\"/><circle cx=\"88.63\" cy=\"21.81\" r=\"0.36\" fill=\"#ffcc4d\"/><line x1=\"82.54\" y1=\"18.66\" x2=\"84.16\" y2=\"23.66\" stroke=\"#ffcc4d\" stroke-width=\"0.45\" stroke-linecap=\"round\"/><circle cx=\"84.53\" cy=\"24.79\" r=\"0.36\" fill=\"#ffcc4d\"/><line x1=\"81.46\" y1=\"18.66\" x2=\"79.84\" y2=\"23.66\" stroke=\"#ffcc4d\" stroke-width=\"0.45\" stroke-linecap=\"round\"/><circle cx=\"79.47\" cy=\"24.79\" r=\"0.36\" fill=\"#ffcc4d\"/><line x1=\"80.58\" y1=\"18.03\" x2=\"76.34\" y2=\"21.11\" stroke=\"#ffcc4d\" stroke-width=\"0.45\" stroke-linecap=\"round\"/><circle cx=\"75.37\" cy=\"21.81\" r=\"0.36\" fill=\"#ffcc4d\"/><line x1=\"80.25\" y1=\"17.00\" x2=\"75.00\" y2=\"17.00\" stroke=\"#ffcc4d\" stroke-width=\"0.45\" stroke-linecap=\"round\"/><circle cx=\"73.81\" cy=\"17.00\" r=\"0.36\" fill=\"#ffcc4d\"/><line x1=\"80.58\" y1=\"15.97\" x2=\"76.34\" y2=\"12.89\" stroke=\"#ffcc4d\" stroke-width=\"0.45\" stroke-linecap=\"round\"/><circle cx=\"75.37\" cy=\"12.19\" r=\"0.36\" fill=\"#ffcc4d\"/><line x1=\"81.46\" y1=\"15.34\" x2=\"79.84\" y2=\"10.34\" stroke=\"#ffcc4d\" stroke-width=\"0.45\" stroke-linecap=\"round\"/><circle cx=\"79.47\" cy=\"9.21\" r=\"0.36\" fill=\"#ffcc4d\"/><line x1=\"82.54\" y1=\"15.34\" x2=\"84.16\" y2=\"10.34\" stroke=\"#ffcc4d\" stroke-width=\"0.45\" stroke-linecap=\"round\"/><circle cx=\"84.53\" cy=\"9.21\" r=\"0.36\" fill=\"#ffcc4d\"/><line x1=\"83.42\" y1=\"15.97\" x2=\"87.66\" y2=\"12.89\" stroke=\"#ffcc4d\" stroke-width=\"0.45\" stroke-linecap=\"round\"/><circle cx=\"88.63\" cy=\"12.19\" r=\"0.36\" fill=\"#ffcc4d\"/><line x1=\"65.50\" y1=\"9.00\" x2=\"70.00\" y2=\"9.00\" stroke=\"#ffffff\" stroke-width=\"0.35\" stroke-linecap=\"round\"/><circle cx=\"71.02\" cy=\"9.00\" r=\"0.28\" fill=\"#ffffff\"/><line x1=\"65.30\" y1=\"9.75\" x2=\"69.20\" y2=\"12.00\" stroke=\"#ffffff\" stroke-width=\"0.35\" stroke-linecap=\"round\"/><circle cx=\"70.08\" cy=\"12.51\" r=\"0.28\" fill=\"#ffffff\"/><line x1=\"64.75\" y1=\"10.30\" x2=\"67.00\" y2=\"14.20\" stroke=\"#ffffff\" stroke-width=\"0.35\" stroke-linecap=\"round\"/><circle cx=\"67.51\" cy=\"15.08\" r=\"0.28\" fill=\"#ffffff\"/><line x1=\"64.00\" y1=\"10.50\" x2=\"64.00\" y2=\"15.00\" stroke=\"#ffffff\" stroke-width=\"0.35\" stroke-linecap=\"round\"/><circle cx=\"64.00\" cy=\"16.02\" r=\"0.28\" fill=\"#ffffff\"/><line x1=\"63.25\" y1=\"10.30\" x2=\"61.00\" y2=\"14.20\" stroke=\"#ffffff\" stroke-width=\"0.35\" stroke-linecap=\"round\"/><circle cx=\"60.49\" cy=\"15.08\" r=\"0.28\" fill=\"#ffffff\"/><line x1=\"62.70\" y1=\"9.75\" x2=\"58.80\" y2=\"12.00\" stroke=\"#ffffff\" stroke-width=\"0.35\" stroke-linecap=\"round\"/><circle cx=\"57.92\" cy=\"12.51\" r=\"0.28\" fill=\"#ffffff\"/><line x1=\"62.50\" y1=\"9.00\" x2=\"58.00\" y2=\"9.00\" stroke=\"#ffffff\" stroke-width=\"0.35\" stroke-linecap=\"round\"/><circle cx=\"56.98\" cy=\"9.00\" r=\"0.28\" fill=\"#ffffff\"/><line x1=\"62.70\" y1=\"8.25\" x2=\"58.80\" y2=\"6.00\" stroke=\"#ffffff\" stroke-width=\"0.35\" stroke-linecap=\"round\"/><circle cx=\"57.92\" cy=\"5.49\" r=\"0.28\" fill=\"#ffffff\"/><line x1=\"63.25\" y1=\"7.70\" x2=\"61.00\" y2=\"3.80\" stroke=\"#ffffff\" stroke-width=\"0.35\" stroke-linecap=\"round\"/><circle cx=\"60.49\" cy=\"2.92\" r=\"0.28\" fill=\"#ffffff\"/><line x1=\"64.00\" y1=\"7.50\" x2=\"64.00\" y2=\"3.00\" stroke=\"#ffffff\" stroke-width=\"0.35\" stroke-linecap=\"round\"/><circle cx=\"64.00\" cy=\"1.98\" r=\"0.28\" fill=\"#ffffff\"/><line x1=\"64.75\" y1=\"7.70\" x2=\"67.00\" y2=\"3.80\" stroke=\"#ffffff\" stroke-width=\"0.35\" stroke-linecap=\"round\"/><circle cx=\"67.51\" cy=\"2.92\" r=\"0.28\" fill=\"#ffffff\"/><line x1=\"65.30\" y1=\"8.25\" x2=\"69.20\" y2=\"6.00\" stroke=\"#ffffff\" stroke-width=\"0.35\" stroke-linecap=\"round\"/><circle cx=\"70.08\" cy=\"5.49\" r=\"0.28\" fill=\"#ffffff\"/><line x1=\"94.50\" y1=\"40.00\" x2=\"99.00\" y2=\"40.00\" stroke=\"#3fd8ec\" stroke-width=\"0.4\" stroke-linecap=\"round\"/><circle cx=\"100.02\" cy=\"40.00\" r=\"0.32\" fill=\"#3fd8ec\"/><line x1=\"94.21\" y1=\"40.88\" x2=\"97.85\" y2=\"43.53\" stroke=\"#3fd8ec\" stroke-width=\"0.4\" stroke-linecap=\"round\"/><circle cx=\"98.68\" cy=\"44.13\" r=\"0.32\" fill=\"#3fd8ec\"/><line x1=\"93.46\" y1=\"41.43\" x2=\"94.85\" y2=\"45.71\" stroke=\"#3fd8ec\" stroke-width=\"0.4\" stroke-linecap=\"round\"/><circle cx=\"95.17\" cy=\"46.68\" r=\"0.32\" fill=\"#3fd8ec\"/><line x1=\"92.54\" y1=\"41.43\" x2=\"91.15\" y2=\"45.71\" stroke=\"#3fd8ec\" stroke-width=\"0.4\" stroke-linecap=\"round\"/><circle cx=\"90.83\" cy=\"46.68\" r=\"0.32\" fill=\"#3fd8ec\"/><line x1=\"91.79\" y1=\"40.88\" x2=\"88.15\" y2=\"43.53\" stroke=\"#3fd8ec\" stroke-width=\"0.4\" stroke-linecap=\"round\"/><circle cx=\"87.32\" cy=\"44.13\" r=\"0.32\" fill=\"#3fd8ec\"/><line x1=\"91.50\" y1=\"40.00\" x2=\"87.00\" y2=\"40.00\" stroke=\"#3fd8ec\" stroke-width=\"0.4\" stroke-linecap=\"round\"/><circle cx=\"85.98\" cy=\"40.00\" r=\"0.32\" fill=\"#3fd8ec\"/><line x1=\"91.79\" y1=\"39.12\" x2=\"88.15\" y2=\"36.47\" stroke=\"#3fd8ec\" stroke-width=\"0.4\" stroke-linecap=\"round\"/><circle cx=\"87.32\" cy=\"35.87\" r=\"0.32\" fill=\"#3fd8ec\"/><line x1=\"92.54\" y1=\"38.57\" x2=\"91.15\" y2=\"34.29\" stroke=\"#3fd8ec\" stroke-width=\"0.4\" stroke-linecap=\"round\"/><circle cx=\"90.83\" cy=\"33.32\" r=\"0.32\" fill=\"#3fd8ec\"/><line x1=\"93.46\" y1=\"38.57\" x2=\"94.85\" y2=\"34.29\" stroke=\"#3fd8ec\" stroke-width=\"0.4\" stroke-linecap=\"round\"/><circle cx=\"95.17\" cy=\"33.32\" r=\"0.32\" fill=\"#3fd8ec\"/><line x1=\"94.21\" y1=\"39.12\" x2=\"97.85\" y2=\"36.47\" stroke=\"#3fd8ec\" stroke-width=\"0.4\" stroke-linecap=\"round\"/><circle cx=\"98.68\" cy=\"35.87\" r=\"0.32\" fill=\"#3fd8ec\"/><line x1=\"13.25\" y1=\"44.00\" x2=\"17.00\" y2=\"44.00\" stroke=\"#b9a8ff\" stroke-width=\"0.35\" stroke-linecap=\"round\"/><circle cx=\"17.85\" cy=\"44.00\" r=\"0.28\" fill=\"#b9a8ff\"/><line x1=\"13.01\" y1=\"44.73\" x2=\"16.05\" y2=\"46.94\" stroke=\"#b9a8ff\" stroke-width=\"0.35\" stroke-linecap=\"round\"/><circle cx=\"16.73\" cy=\"47.44\" r=\"0.28\" fill=\"#b9a8ff\"/><line x1=\"12.39\" y1=\"45.19\" x2=\"13.55\" y2=\"48.76\" stroke=\"#b9a8ff\" stroke-width=\"0.35\" stroke-linecap=\"round\"/><circle cx=\"13.81\" cy=\"49.56\" r=\"0.28\" fill=\"#b9a8ff\"/><line x1=\"11.61\" y1=\"45.19\" x2=\"10.45\" y2=\"48.76\" stroke=\"#b9a8ff\" stroke-width=\"0.35\" stroke-linecap=\"round\"/><circle cx=\"10.19\" cy=\"49.56\" r=\"0.28\" fill=\"#b9a8ff\"/><line x1=\"10.99\" y1=\"44.73\" x2=\"7.95\" y2=\"46.94\" stroke=\"#b9a8ff\" stroke-width=\"0.35\" stroke-linecap=\"round\"/><circle cx=\"7.27\" cy=\"47.44\" r=\"0.28\" fill=\"#b9a8ff\"/><line x1=\"10.75\" y1=\"44.00\" x2=\"7.00\" y2=\"44.00\" stroke=\"#b9a8ff\" stroke-width=\"0.35\" stroke-linecap=\"round\"/><circle cx=\"6.15\" cy=\"44.00\" r=\"0.28\" fill=\"#b9a8ff\"/><line x1=\"10.99\" y1=\"43.27\" x2=\"7.95\" y2=\"41.06\" stroke=\"#b9a8ff\" stroke-width=\"0.35\" stroke-linecap=\"round\"/><circle cx=\"7.27\" cy=\"40.56\" r=\"0.28\" fill=\"#b9a8ff\"/><line x1=\"11.61\" y1=\"42.81\" x2=\"10.45\" y2=\"39.24\" stroke=\"#b9a8ff\" stroke-width=\"0.35\" stroke-linecap=\"round\"/><circle cx=\"10.19\" cy=\"38.44\" r=\"0.28\" fill=\"#b9a8ff\"/><line x1=\"12.39\" y1=\"42.81\" x2=\"13.55\" y2=\"39.24\" stroke=\"#b9a8ff\" stroke-width=\"0.35\" stroke-linecap=\"round\"/><circle cx=\"13.81\" cy=\"38.44\" r=\"0.28\" fill=\"#b9a8ff\"/><line x1=\"13.01\" y1=\"43.27\" x2=\"16.05\" y2=\"41.06\" stroke=\"#b9a8ff\" stroke-width=\"0.35\" stroke-linecap=\"round\"/><circle cx=\"16.73\" cy=\"40.56\" r=\"0.28\" fill=\"#b9a8ff\"/><line x1=\"48.88\" y1=\"40.00\" x2=\"51.50\" y2=\"40.00\" stroke=\"#ffcc4d\" stroke-width=\"0.3\" stroke-linecap=\"round\"/><circle cx=\"52.09\" cy=\"40.00\" r=\"0.24\" fill=\"#ffcc4d\"/><line x1=\"48.62\" y1=\"40.62\" x2=\"50.47\" y2=\"42.47\" stroke=\"#ffcc4d\" stroke-width=\"0.3\" stroke-linecap=\"round\"/><circle cx=\"50.90\" cy=\"42.90\" r=\"0.24\" fill=\"#ffcc4d\"/><line x1=\"48.00\" y1=\"40.88\" x2=\"48.00\" y2=\"43.50\" stroke=\"#ffcc4d\" stroke-width=\"0.3\" stroke-linecap=\"round\"/><circle cx=\"48.00\" cy=\"44.09\" r=\"0.24\" fill=\"#ffcc4d\"/><line x1=\"47.38\" y1=\"40.62\" x2=\"45.53\" y2=\"42.47\" stroke=\"#ffcc4d\" stroke-width=\"0.3\" stroke-linecap=\"round\"/><circle cx=\"45.10\" cy=\"42.90\" r=\"0.24\" fill=\"#ffcc4d\"/><line x1=\"47.12\" y1=\"40.00\" x2=\"44.50\" y2=\"40.00\" stroke=\"#ffcc4d\" stroke-width=\"0.3\" stroke-linecap=\"round\"/><circle cx=\"43.91\" cy=\"40.00\" r=\"0.24\" fill=\"#ffcc4d\"/><line x1=\"47.38\" y1=\"39.38\" x2=\"45.53\" y2=\"37.53\" stroke=\"#ffcc4d\" stroke-width=\"0.3\" stroke-linecap=\"round\"/><circle cx=\"45.10\" cy=\"37.10\" r=\"0.24\" fill=\"#ffcc4d\"/><line x1=\"48.00\" y1=\"39.12\" x2=\"48.00\" y2=\"36.50\" stroke=\"#ffcc4d\" stroke-width=\"0.3\" stroke-linecap=\"round\"/><circle cx=\"48.00\" cy=\"35.91\" r=\"0.24\" fill=\"#ffcc4d\"/><line x1=\"48.62\" y1=\"39.38\" x2=\"50.47\" y2=\"37.53\" stroke=\"#ffcc4d\" stroke-width=\"0.3\" stroke-linecap=\"round\"/><circle cx=\"50.90\" cy=\"37.10\" r=\"0.24\" fill=\"#ffcc4d\"/><path d=\"M104,30 C80,46 92,58 66,66 S40,64 30,84 S8,96 -4,104\" stroke=\"#ff3d8b\" stroke-width=\"0.8\" fill=\"none\" stroke-linecap=\"round\"/><path d=\"M104,36 C84,50 96,62 70,71 S44,70 34,90 S12,100 -4,110\" stroke=\"#ffcc4d\" stroke-width=\"0.6\" fill=\"none\" stroke-linecap=\"round\"/><path d=\"M-4,58 C10,52 18,64 30,58\" stroke=\"#3fd8ec\" stroke-width=\"0.55\" fill=\"none\" stroke-linecap=\"round\"/><rect x=\"79.8\" y=\"105.4\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#ffffff\" transform=\"rotate(139 79.8 105.4)\"/><rect x=\"78.8\" y=\"6.3\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#ff3d8b\" transform=\"rotate(161 78.8 6.3)\"/><rect x=\"87.4\" y=\"97.8\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#b9a8ff\" transform=\"rotate(143 87.4 97.8)\"/><rect x=\"71.3\" y=\"65.5\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#ff3d8b\" transform=\"rotate(75 71.3 65.5)\"/><rect x=\"77.2\" y=\"15.6\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#ffffff\" transform=\"rotate(24 77.2 15.6)\"/><rect x=\"74.2\" y=\"66.9\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#ffffff\" transform=\"rotate(96 74.2 66.9)\"/><rect x=\"15.1\" y=\"83.2\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#ffcc4d\" transform=\"rotate(37 15.1 83.2)\"/><rect x=\"91.6\" y=\"16.1\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#ff3d8b\" transform=\"rotate(15 91.6 16.1)\"/><rect x=\"27.0\" y=\"77.4\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#ffcc4d\" transform=\"rotate(160 27.0 77.4)\"/><rect x=\"69.4\" y=\"8.9\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#ffffff\" transform=\"rotate(98 69.4 8.9)\"/><rect x=\"50.6\" y=\"2.1\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#ff3d8b\" transform=\"rotate(75 50.6 2.1)\"/><rect x=\"91.7\" y=\"9.8\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#b9a8ff\" transform=\"rotate(38 91.7 9.8)\"/><rect x=\"54.3\" y=\"56.8\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#ff3d8b\" transform=\"rotate(170 54.3 56.8)\"/><rect x=\"96.4\" y=\"34.1\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#b9a8ff\" transform=\"rotate(14 96.4 34.1)\"/><rect x=\"30.6\" y=\"50.5\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#ffcc4d\" transform=\"rotate(65 30.6 50.5)\"/><rect x=\"68.7\" y=\"11.4\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#b9a8ff\" transform=\"rotate(122 68.7 11.4)\"/><rect x=\"74.7\" y=\"84.7\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#ffcc4d\" transform=\"rotate(118 74.7 84.7)\"/><rect x=\"1.2\" y=\"40.7\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#b9a8ff\" transform=\"rotate(43 1.2 40.7)\"/><rect x=\"56.4\" y=\"49.5\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#ffcc4d\" transform=\"rotate(154 56.4 49.5)\"/><rect x=\"84.5\" y=\"77.7\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#ffffff\" transform=\"rotate(27 84.5 77.7)\"/><rect x=\"62.8\" y=\"101.2\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#3fd8ec\" transform=\"rotate(172 62.8 101.2)\"/><rect x=\"75.5\" y=\"60.0\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#ffcc4d\" transform=\"rotate(46 75.5 60.0)\"/><rect x=\"20.0\" y=\"79.0\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#3fd8ec\" transform=\"rotate(56 20.0 79.0)\"/><rect x=\"27.4\" y=\"50.7\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#3fd8ec\" transform=\"rotate(80 27.4 50.7)\"/><rect x=\"38.2\" y=\"11.0\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#ffffff\" transform=\"rotate(17 38.2 11.0)\"/><rect x=\"67.8\" y=\"76.5\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#ff3d8b\" transform=\"rotate(35 67.8 76.5)\"/><rect x=\"3.6\" y=\"50.0\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#ffcc4d\" transform=\"rotate(18 3.6 50.0)\"/><rect x=\"3.2\" y=\"106.6\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#b9a8ff\" transform=\"rotate(73 3.2 106.6)\"/><rect x=\"7.3\" y=\"99.4\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#b9a8ff\" transform=\"rotate(167 7.3 99.4)\"/><rect x=\"13.9\" y=\"22.2\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#ff3d8b\" transform=\"rotate(148 13.9 22.2)\"/><rect x=\"38.6\" y=\"35.8\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#b9a8ff\" transform=\"rotate(112 38.6 35.8)\"/><rect x=\"72.7\" y=\"66.2\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#3fd8ec\" transform=\"rotate(177 72.7 66.2)\"/><rect x=\"79.0\" y=\"71.3\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#ffffff\" transform=\"rotate(95 79.0 71.3)\"/><rect x=\"26.1\" y=\"20.4\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#3fd8ec\" transform=\"rotate(117 26.1 20.4)\"/><rect x=\"10.6\" y=\"40.8\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#ffffff\" transform=\"rotate(60 10.6 40.8)\"/><rect x=\"29.3\" y=\"11.1\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#ff3d8b\" transform=\"rotate(46 29.3 11.1)\"/><rect x=\"53.9\" y=\"32.2\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#ff3d8b\" transform=\"rotate(63 53.9 32.2)\"/><rect x=\"50.0\" y=\"15.3\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#ff3d8b\" transform=\"rotate(178 50.0 15.3)\"/><rect x=\"51.6\" y=\"77.3\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#ff3d8b\" transform=\"rotate(102 51.6 77.3)\"/><rect x=\"2.7\" y=\"71.2\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#ffcc4d\" transform=\"rotate(25 2.7 71.2)\"/><rect x=\"47.8\" y=\"45.1\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#3fd8ec\" transform=\"rotate(59 47.8 45.1)\"/><rect x=\"92.9\" y=\"39.0\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#b9a8ff\" transform=\"rotate(159 92.9 39.0)\"/><rect x=\"45.2\" y=\"78.8\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#ff3d8b\" transform=\"rotate(163 45.2 78.8)\"/><rect x=\"54.3\" y=\"60.6\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#ffffff\" transform=\"rotate(165 54.3 60.6)\"/><rect x=\"16.9\" y=\"80.5\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#3fd8ec\" transform=\"rotate(108 16.9 80.5)\"/><rect x=\"12.3\" y=\"89.1\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#3fd8ec\" transform=\"rotate(123 12.3 89.1)\"/><rect x=\"36.4\" y=\"81.9\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#3fd8ec\" transform=\"rotate(150 36.4 81.9)\"/><rect x=\"18.6\" y=\"59.2\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#ffcc4d\" transform=\"rotate(82 18.6 59.2)\"/><rect x=\"40.3\" y=\"84.5\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#ff3d8b\" transform=\"rotate(55 40.3 84.5)\"/><rect x=\"67.1\" y=\"79.7\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#b9a8ff\" transform=\"rotate(111 67.1 79.7)\"/><rect x=\"64.0\" y=\"82.4\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#ff3d8b\" transform=\"rotate(36 64.0 82.4)\"/><rect x=\"46.8\" y=\"15.4\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#b9a8ff\" transform=\"rotate(21 46.8 15.4)\"/><rect x=\"40.6\" y=\"36.3\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#ff3d8b\" transform=\"rotate(47 40.6 36.3)\"/><rect x=\"56.8\" y=\"35.9\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#ffcc4d\" transform=\"rotate(130 56.8 35.9)\"/><rect x=\"78.8\" y=\"43.5\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#b9a8ff\" transform=\"rotate(108 78.8 43.5)\"/><rect x=\"47.0\" y=\"44.4\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#ffffff\" transform=\"rotate(164 47.0 44.4)\"/><rect x=\"56.5\" y=\"44.0\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#3fd8ec\" transform=\"rotate(87 56.5 44.0)\"/><rect x=\"99.5\" y=\"90.5\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#b9a8ff\" transform=\"rotate(149 99.5 90.5)\"/><rect x=\"11.7\" y=\"12.4\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#ffffff\" transform=\"rotate(59 11.7 12.4)\"/><rect x=\"52.1\" y=\"45.4\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#ffcc4d\" transform=\"rotate(58 52.1 45.4)\"/><rect x=\"5.5\" y=\"78.4\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#b9a8ff\" transform=\"rotate(132 5.5 78.4)\"/><rect x=\"59.8\" y=\"81.2\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#3fd8ec\" transform=\"rotate(159 59.8 81.2)\"/><rect x=\"87.7\" y=\"26.4\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#b9a8ff\" transform=\"rotate(44 87.7 26.4)\"/><rect x=\"87.3\" y=\"105.0\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#b9a8ff\" transform=\"rotate(125 87.3 105.0)\"/><rect x=\"52.6\" y=\"25.8\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#3fd8ec\" transform=\"rotate(118 52.6 25.8)\"/><rect x=\"94.0\" y=\"95.0\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#3fd8ec\" transform=\"rotate(156 94.0 95.0)\"/><rect x=\"42.1\" y=\"87.0\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#ff3d8b\" transform=\"rotate(117 42.1 87.0)\"/><rect x=\"42.2\" y=\"13.2\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#ffcc4d\" transform=\"rotate(18 42.2 13.2)\"/><rect x=\"79.2\" y=\"13.4\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#ffffff\" transform=\"rotate(104 79.2 13.4)\"/><rect x=\"45.3\" y=\"32.0\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#3fd8ec\" transform=\"rotate(4 45.3 32.0)\"/><path d=\"M6,64.88 q2,7.699999999999999 -1.2,14.3 t1.6,7.699999999999999\" stroke=\"#d9defc\" stroke-width=\".25\" fill=\"none\"/><ellipse cx=\"6\" cy=\"60\" rx=\"4\" ry=\"4.88\" fill=\"#ff3d8b\"/><path d=\"M5.2,64.67999999999999 l.8,1.4 l.8,-1.4z\" fill=\"#ff3d8b\"/><ellipse cx=\"4.48\" cy=\"57.9504\" rx=\"0.8\" ry=\"1.464\" fill=\"#fff\" opacity=\".5\" transform=\"rotate(-25 4.48 57.9504)\"/><path d=\"M94,62.88 q-2,7.699999999999999 1.2,14.3 t-1.6,7.699999999999999\" stroke=\"#d9defc\" stroke-width=\".25\" fill=\"none\"/><ellipse cx=\"94\" cy=\"58\" rx=\"4\" ry=\"4.88\" fill=\"#3fd8ec\"/><path d=\"M93.2,62.68 l.8,1.4 l.8,-1.4z\" fill=\"#3fd8ec\"/><ellipse cx=\"92.48\" cy=\"55.9504\" rx=\"0.8\" ry=\"1.464\" fill=\"#fff\" opacity=\".5\" transform=\"rotate(-25 92.48 55.9504)\"/></svg>", "wave": "<svg class=\"wave\" viewBox=\"0 0 100 24\" preserveAspectRatio=\"none\" aria-hidden=\"true\"><path d=\"M0,8 C18,0 30,14 50,7 S82,0 100,6 L100,24 L0,24Z\" fill=\"#fff\"/><path d=\"M0,8 C18,0 30,14 50,7 S82,0 100,6\" stroke=\"#ffcc4d\" stroke-width=\".7\" fill=\"none\"/></svg>", "skyHstSq": "<svg class=\"sky\" viewBox=\"0 0 100 100\" preserveAspectRatio=\"none\" aria-hidden=\"true\"><defs><radialGradient id=\"g1\" cx=\"78%\" cy=\"12%\" r=\"60%\"><stop offset=\"0\" stop-color=\"#5b3fc4\"/><stop offset=\"1\" stop-color=\"#5b3fc4\" stop-opacity=\"0\"/></radialGradient></defs><rect width=\"100\" height=\"100\" fill=\"url(#g1)\"/><circle cx=\"45.2\" cy=\"53.2\" r=\"0.33\" fill=\"#fff\" opacity=\"0.66\"/><circle cx=\"50.8\" cy=\"55.8\" r=\"0.16\" fill=\"#fff\" opacity=\"0.68\"/><circle cx=\"63.0\" cy=\"75.3\" r=\"0.14\" fill=\"#fff\" opacity=\"0.57\"/><circle cx=\"9.1\" cy=\"76.9\" r=\"0.28\" fill=\"#fff\" opacity=\"0.42\"/><circle cx=\"98.2\" cy=\"91.7\" r=\"0.27\" fill=\"#fff\" opacity=\"0.74\"/><circle cx=\"15.7\" cy=\"1.4\" r=\"0.24\" fill=\"#fff\" opacity=\"0.43\"/><circle cx=\"19.0\" cy=\"23.0\" r=\"0.13\" fill=\"#fff\" opacity=\"0.66\"/><circle cx=\"44.1\" cy=\"80.0\" r=\"0.24\" fill=\"#fff\" opacity=\"0.75\"/><circle cx=\"50.0\" cy=\"62.9\" r=\"0.23\" fill=\"#fff\" opacity=\"0.55\"/><circle cx=\"99.8\" cy=\"94.6\" r=\"0.31\" fill=\"#fff\" opacity=\"0.79\"/><circle cx=\"31.5\" cy=\"21.8\" r=\"0.19\" fill=\"#fff\" opacity=\"0.44\"/><circle cx=\"76.6\" cy=\"38.0\" r=\"0.31\" fill=\"#fff\" opacity=\"0.61\"/><circle cx=\"95.8\" cy=\"80.5\" r=\"0.12\" fill=\"#fff\" opacity=\"0.52\"/><circle cx=\"91.0\" cy=\"44.6\" r=\"0.35\" fill=\"#fff\" opacity=\"0.62\"/><circle cx=\"7.3\" cy=\"59.8\" r=\"0.30\" fill=\"#fff\" opacity=\"0.55\"/><circle cx=\"8.7\" cy=\"31.6\" r=\"0.34\" fill=\"#fff\" opacity=\"0.82\"/><circle cx=\"11.8\" cy=\"23.4\" r=\"0.14\" fill=\"#fff\" opacity=\"0.43\"/><circle cx=\"79.7\" cy=\"16.9\" r=\"0.25\" fill=\"#fff\" opacity=\"0.65\"/><circle cx=\"19.1\" cy=\"69.5\" r=\"0.15\" fill=\"#fff\" opacity=\"0.75\"/><circle cx=\"11.7\" cy=\"40.0\" r=\"0.17\" fill=\"#fff\" opacity=\"0.55\"/><circle cx=\"97.1\" cy=\"76.3\" r=\"0.19\" fill=\"#fff\" opacity=\"0.89\"/><circle cx=\"21.1\" cy=\"37.5\" r=\"0.32\" fill=\"#fff\" opacity=\"0.75\"/><circle cx=\"10.0\" cy=\"94.0\" r=\"0.17\" fill=\"#fff\" opacity=\"0.54\"/><circle cx=\"77.3\" cy=\"31.3\" r=\"0.19\" fill=\"#fff\" opacity=\"0.44\"/><circle cx=\"9.0\" cy=\"55.4\" r=\"0.18\" fill=\"#fff\" opacity=\"0.73\"/><circle cx=\"37.2\" cy=\"43.1\" r=\"0.34\" fill=\"#fff\" opacity=\"0.67\"/><circle cx=\"57.5\" cy=\"82.3\" r=\"0.16\" fill=\"#fff\" opacity=\"0.48\"/><circle cx=\"90.8\" cy=\"77.7\" r=\"0.18\" fill=\"#fff\" opacity=\"0.50\"/><circle cx=\"73.9\" cy=\"89.3\" r=\"0.17\" fill=\"#fff\" opacity=\"0.92\"/><circle cx=\"88.2\" cy=\"57.3\" r=\"0.22\" fill=\"#fff\" opacity=\"0.46\"/><circle cx=\"3.9\" cy=\"91.5\" r=\"0.17\" fill=\"#fff\" opacity=\"0.79\"/><circle cx=\"25.7\" cy=\"78.3\" r=\"0.26\" fill=\"#fff\" opacity=\"0.56\"/><circle cx=\"17.5\" cy=\"68.4\" r=\"0.14\" fill=\"#fff\" opacity=\"0.53\"/><circle cx=\"55.9\" cy=\"81.0\" r=\"0.26\" fill=\"#fff\" opacity=\"0.55\"/><circle cx=\"91.7\" cy=\"19.4\" r=\"0.12\" fill=\"#fff\" opacity=\"0.55\"/><circle cx=\"44.6\" cy=\"5.7\" r=\"0.16\" fill=\"#fff\" opacity=\"0.60\"/><circle cx=\"57.2\" cy=\"12.5\" r=\"0.20\" fill=\"#fff\" opacity=\"0.89\"/><circle cx=\"98.0\" cy=\"62.4\" r=\"0.28\" fill=\"#fff\" opacity=\"0.72\"/><circle cx=\"14.0\" cy=\"3.3\" r=\"0.12\" fill=\"#fff\" opacity=\"0.90\"/><circle cx=\"70.1\" cy=\"91.5\" r=\"0.12\" fill=\"#fff\" opacity=\"0.75\"/><circle cx=\"48.2\" cy=\"69.4\" r=\"0.19\" fill=\"#fff\" opacity=\"0.95\"/><circle cx=\"7.5\" cy=\"51.9\" r=\"0.29\" fill=\"#fff\" opacity=\"0.90\"/><circle cx=\"73.7\" cy=\"66.9\" r=\"0.30\" fill=\"#fff\" opacity=\"0.90\"/><circle cx=\"35.2\" cy=\"65.1\" r=\"0.33\" fill=\"#fff\" opacity=\"0.88\"/><circle cx=\"41.7\" cy=\"75.1\" r=\"0.32\" fill=\"#fff\" opacity=\"0.72\"/><circle cx=\"62.5\" cy=\"36.3\" r=\"0.25\" fill=\"#fff\" opacity=\"0.73\"/><circle cx=\"8.0\" cy=\"60.7\" r=\"0.35\" fill=\"#fff\" opacity=\"0.88\"/><circle cx=\"72.8\" cy=\"36.9\" r=\"0.29\" fill=\"#fff\" opacity=\"0.72\"/><circle cx=\"44.1\" cy=\"79.6\" r=\"0.14\" fill=\"#fff\" opacity=\"0.81\"/><circle cx=\"3.0\" cy=\"57.1\" r=\"0.23\" fill=\"#fff\" opacity=\"0.53\"/><circle cx=\"69.8\" cy=\"47.2\" r=\"0.26\" fill=\"#fff\" opacity=\"0.91\"/><circle cx=\"25.6\" cy=\"1.1\" r=\"0.19\" fill=\"#fff\" opacity=\"0.77\"/><circle cx=\"20.3\" cy=\"16.1\" r=\"0.33\" fill=\"#fff\" opacity=\"0.76\"/><circle cx=\"44.2\" cy=\"84.7\" r=\"0.20\" fill=\"#fff\" opacity=\"0.77\"/><circle cx=\"19.9\" cy=\"40.9\" r=\"0.31\" fill=\"#fff\" opacity=\"0.90\"/><circle cx=\"88.0\" cy=\"36.5\" r=\"0.25\" fill=\"#fff\" opacity=\"0.57\"/><circle cx=\"13.6\" cy=\"47.2\" r=\"0.31\" fill=\"#fff\" opacity=\"0.87\"/><circle cx=\"71.1\" cy=\"90.3\" r=\"0.18\" fill=\"#fff\" opacity=\"0.49\"/><circle cx=\"45.1\" cy=\"26.1\" r=\"0.17\" fill=\"#fff\" opacity=\"0.63\"/><circle cx=\"62.6\" cy=\"46.9\" r=\"0.19\" fill=\"#fff\" opacity=\"0.86\"/><path d=\"M95.3114315474702,42.140539609906476 L95.52263343001368,42.77414525753692 L96.15623907764413,42.98534714008041 L95.52263343001368,43.19654902262389 L95.3114315474702,43.83015467025434 L95.10022966492673,43.19654902262389 L94.46662401729628,42.98534714008041 L95.10022966492673,42.77414525753692Z\" fill=\"#ffcc4d\" opacity=\".9\"/><path d=\"M5.959662915346238,82.09386712395198 L6.165886175225426,82.71253690358954 L6.784555954862991,82.91876016346873 L6.165886175225426,83.12498342334793 L5.959662915346238,83.74365320298548 L5.75343965546705,83.12498342334793 L5.134769875829485,82.91876016346873 L5.75343965546705,82.71253690358954Z\" fill=\"#ffcc4d\" opacity=\".9\"/><path d=\"M69.61130732611278,53.21986802116651 L69.85766187882427,53.958931679300996 L70.59672553695876,54.20528623201249 L69.85766187882427,54.451640784723985 L69.61130732611278,55.19070444285847 L69.36495277340128,54.451640784723985 L68.6258891152668,54.20528623201249 L69.36495277340128,53.958931679300996Z\" fill=\"#ffcc4d\" opacity=\".9\"/><path d=\"M77.40227103993047,0.9343027118631619 L77.6226532137427,1.5954492332998464 L78.28379973517939,1.8158314071120745 L77.6226532137427,2.0362135809243025 L77.40227103993047,2.697360102360987 L77.18188886611824,2.0362135809243025 L76.52074234468155,1.8158314071120745 L77.18188886611824,1.5954492332998464Z\" fill=\"#ffcc4d\" opacity=\".9\"/><path d=\"M45.75424688944472,1.051217230524118 L46.07869715461358,2.024568026030697 L47.05204795012016,2.3490182911995565 L46.07869715461358,2.673468556368416 L45.75424688944472,3.6468193518749947 L45.429796624275866,2.673468556368416 L44.45644582876928,2.3490182911995565 L45.429796624275866,2.024568026030697Z\" fill=\"#ffcc4d\" opacity=\".9\"/><path d=\"M25.316446835174425,12.55491441719299 L25.523488220553872,13.176038573331333 L26.144612376692216,13.38307995871078 L25.523488220553872,13.590121344090228 L25.316446835174425,14.211245500228571 L25.109405449794977,13.590121344090228 L24.488281293656634,13.38307995871078 L25.109405449794977,13.176038573331333Z\" fill=\"#ffcc4d\" opacity=\".9\"/><line x1=\"85.25\" y1=\"17.00\" x2=\"95.00\" y2=\"17.00\" stroke=\"#ff3d8b\" stroke-width=\"0.55\" stroke-linecap=\"round\"/><circle cx=\"97.21\" cy=\"17.00\" r=\"0.44\" fill=\"#ff3d8b\"/><line x1=\"85.00\" y1=\"18.24\" x2=\"94.01\" y2=\"21.97\" stroke=\"#ff3d8b\" stroke-width=\"0.55\" stroke-linecap=\"round\"/><circle cx=\"96.05\" cy=\"22.82\" r=\"0.44\" fill=\"#ff3d8b\"/><line x1=\"84.30\" y1=\"19.30\" x2=\"91.19\" y2=\"26.19\" stroke=\"#ff3d8b\" stroke-width=\"0.55\" stroke-linecap=\"round\"/><circle cx=\"92.76\" cy=\"27.76\" r=\"0.44\" fill=\"#ff3d8b\"/><line x1=\"83.24\" y1=\"20.00\" x2=\"86.97\" y2=\"29.01\" stroke=\"#ff3d8b\" stroke-width=\"0.55\" stroke-linecap=\"round\"/><circle cx=\"87.82\" cy=\"31.05\" r=\"0.44\" fill=\"#ff3d8b\"/><line x1=\"82.00\" y1=\"20.25\" x2=\"82.00\" y2=\"30.00\" stroke=\"#ff3d8b\" stroke-width=\"0.55\" stroke-linecap=\"round\"/><circle cx=\"82.00\" cy=\"32.21\" r=\"0.44\" fill=\"#ff3d8b\"/><line x1=\"80.76\" y1=\"20.00\" x2=\"77.03\" y2=\"29.01\" stroke=\"#ff3d8b\" stroke-width=\"0.55\" stroke-linecap=\"round\"/><circle cx=\"76.18\" cy=\"31.05\" r=\"0.44\" fill=\"#ff3d8b\"/><line x1=\"79.70\" y1=\"19.30\" x2=\"72.81\" y2=\"26.19\" stroke=\"#ff3d8b\" stroke-width=\"0.55\" stroke-linecap=\"round\"/><circle cx=\"71.24\" cy=\"27.76\" r=\"0.44\" fill=\"#ff3d8b\"/><line x1=\"79.00\" y1=\"18.24\" x2=\"69.99\" y2=\"21.97\" stroke=\"#ff3d8b\" stroke-width=\"0.55\" stroke-linecap=\"round\"/><circle cx=\"67.95\" cy=\"22.82\" r=\"0.44\" fill=\"#ff3d8b\"/><line x1=\"78.75\" y1=\"17.00\" x2=\"69.00\" y2=\"17.00\" stroke=\"#ff3d8b\" stroke-width=\"0.55\" stroke-linecap=\"round\"/><circle cx=\"66.79\" cy=\"17.00\" r=\"0.44\" fill=\"#ff3d8b\"/><line x1=\"79.00\" y1=\"15.76\" x2=\"69.99\" y2=\"12.03\" stroke=\"#ff3d8b\" stroke-width=\"0.55\" stroke-linecap=\"round\"/><circle cx=\"67.95\" cy=\"11.18\" r=\"0.44\" fill=\"#ff3d8b\"/><line x1=\"79.70\" y1=\"14.70\" x2=\"72.81\" y2=\"7.81\" stroke=\"#ff3d8b\" stroke-width=\"0.55\" stroke-linecap=\"round\"/><circle cx=\"71.24\" cy=\"6.24\" r=\"0.44\" fill=\"#ff3d8b\"/><line x1=\"80.76\" y1=\"14.00\" x2=\"77.03\" y2=\"4.99\" stroke=\"#ff3d8b\" stroke-width=\"0.55\" stroke-linecap=\"round\"/><circle cx=\"76.18\" cy=\"2.95\" r=\"0.44\" fill=\"#ff3d8b\"/><line x1=\"82.00\" y1=\"13.75\" x2=\"82.00\" y2=\"4.00\" stroke=\"#ff3d8b\" stroke-width=\"0.55\" stroke-linecap=\"round\"/><circle cx=\"82.00\" cy=\"1.79\" r=\"0.44\" fill=\"#ff3d8b\"/><line x1=\"83.24\" y1=\"14.00\" x2=\"86.97\" y2=\"4.99\" stroke=\"#ff3d8b\" stroke-width=\"0.55\" stroke-linecap=\"round\"/><circle cx=\"87.82\" cy=\"2.95\" r=\"0.44\" fill=\"#ff3d8b\"/><line x1=\"84.30\" y1=\"14.70\" x2=\"91.19\" y2=\"7.81\" stroke=\"#ff3d8b\" stroke-width=\"0.55\" stroke-linecap=\"round\"/><circle cx=\"92.76\" cy=\"6.24\" r=\"0.44\" fill=\"#ff3d8b\"/><line x1=\"85.00\" y1=\"15.76\" x2=\"94.01\" y2=\"12.03\" stroke=\"#ff3d8b\" stroke-width=\"0.55\" stroke-linecap=\"round\"/><circle cx=\"96.05\" cy=\"11.18\" r=\"0.44\" fill=\"#ff3d8b\"/><line x1=\"83.75\" y1=\"17.00\" x2=\"89.00\" y2=\"17.00\" stroke=\"#ffcc4d\" stroke-width=\"0.45\" stroke-linecap=\"round\"/><circle cx=\"90.19\" cy=\"17.00\" r=\"0.36\" fill=\"#ffcc4d\"/><line x1=\"83.42\" y1=\"18.03\" x2=\"87.66\" y2=\"21.11\" stroke=\"#ffcc4d\" stroke-width=\"0.45\" stroke-linecap=\"round\"/><circle cx=\"88.63\" cy=\"21.81\" r=\"0.36\" fill=\"#ffcc4d\"/><line x1=\"82.54\" y1=\"18.66\" x2=\"84.16\" y2=\"23.66\" stroke=\"#ffcc4d\" stroke-width=\"0.45\" stroke-linecap=\"round\"/><circle cx=\"84.53\" cy=\"24.79\" r=\"0.36\" fill=\"#ffcc4d\"/><line x1=\"81.46\" y1=\"18.66\" x2=\"79.84\" y2=\"23.66\" stroke=\"#ffcc4d\" stroke-width=\"0.45\" stroke-linecap=\"round\"/><circle cx=\"79.47\" cy=\"24.79\" r=\"0.36\" fill=\"#ffcc4d\"/><line x1=\"80.58\" y1=\"18.03\" x2=\"76.34\" y2=\"21.11\" stroke=\"#ffcc4d\" stroke-width=\"0.45\" stroke-linecap=\"round\"/><circle cx=\"75.37\" cy=\"21.81\" r=\"0.36\" fill=\"#ffcc4d\"/><line x1=\"80.25\" y1=\"17.00\" x2=\"75.00\" y2=\"17.00\" stroke=\"#ffcc4d\" stroke-width=\"0.45\" stroke-linecap=\"round\"/><circle cx=\"73.81\" cy=\"17.00\" r=\"0.36\" fill=\"#ffcc4d\"/><line x1=\"80.58\" y1=\"15.97\" x2=\"76.34\" y2=\"12.89\" stroke=\"#ffcc4d\" stroke-width=\"0.45\" stroke-linecap=\"round\"/><circle cx=\"75.37\" cy=\"12.19\" r=\"0.36\" fill=\"#ffcc4d\"/><line x1=\"81.46\" y1=\"15.34\" x2=\"79.84\" y2=\"10.34\" stroke=\"#ffcc4d\" stroke-width=\"0.45\" stroke-linecap=\"round\"/><circle cx=\"79.47\" cy=\"9.21\" r=\"0.36\" fill=\"#ffcc4d\"/><line x1=\"82.54\" y1=\"15.34\" x2=\"84.16\" y2=\"10.34\" stroke=\"#ffcc4d\" stroke-width=\"0.45\" stroke-linecap=\"round\"/><circle cx=\"84.53\" cy=\"9.21\" r=\"0.36\" fill=\"#ffcc4d\"/><line x1=\"83.42\" y1=\"15.97\" x2=\"87.66\" y2=\"12.89\" stroke=\"#ffcc4d\" stroke-width=\"0.45\" stroke-linecap=\"round\"/><circle cx=\"88.63\" cy=\"12.19\" r=\"0.36\" fill=\"#ffcc4d\"/><line x1=\"65.50\" y1=\"9.00\" x2=\"70.00\" y2=\"9.00\" stroke=\"#ffffff\" stroke-width=\"0.35\" stroke-linecap=\"round\"/><circle cx=\"71.02\" cy=\"9.00\" r=\"0.28\" fill=\"#ffffff\"/><line x1=\"65.30\" y1=\"9.75\" x2=\"69.20\" y2=\"12.00\" stroke=\"#ffffff\" stroke-width=\"0.35\" stroke-linecap=\"round\"/><circle cx=\"70.08\" cy=\"12.51\" r=\"0.28\" fill=\"#ffffff\"/><line x1=\"64.75\" y1=\"10.30\" x2=\"67.00\" y2=\"14.20\" stroke=\"#ffffff\" stroke-width=\"0.35\" stroke-linecap=\"round\"/><circle cx=\"67.51\" cy=\"15.08\" r=\"0.28\" fill=\"#ffffff\"/><line x1=\"64.00\" y1=\"10.50\" x2=\"64.00\" y2=\"15.00\" stroke=\"#ffffff\" stroke-width=\"0.35\" stroke-linecap=\"round\"/><circle cx=\"64.00\" cy=\"16.02\" r=\"0.28\" fill=\"#ffffff\"/><line x1=\"63.25\" y1=\"10.30\" x2=\"61.00\" y2=\"14.20\" stroke=\"#ffffff\" stroke-width=\"0.35\" stroke-linecap=\"round\"/><circle cx=\"60.49\" cy=\"15.08\" r=\"0.28\" fill=\"#ffffff\"/><line x1=\"62.70\" y1=\"9.75\" x2=\"58.80\" y2=\"12.00\" stroke=\"#ffffff\" stroke-width=\"0.35\" stroke-linecap=\"round\"/><circle cx=\"57.92\" cy=\"12.51\" r=\"0.28\" fill=\"#ffffff\"/><line x1=\"62.50\" y1=\"9.00\" x2=\"58.00\" y2=\"9.00\" stroke=\"#ffffff\" stroke-width=\"0.35\" stroke-linecap=\"round\"/><circle cx=\"56.98\" cy=\"9.00\" r=\"0.28\" fill=\"#ffffff\"/><line x1=\"62.70\" y1=\"8.25\" x2=\"58.80\" y2=\"6.00\" stroke=\"#ffffff\" stroke-width=\"0.35\" stroke-linecap=\"round\"/><circle cx=\"57.92\" cy=\"5.49\" r=\"0.28\" fill=\"#ffffff\"/><line x1=\"63.25\" y1=\"7.70\" x2=\"61.00\" y2=\"3.80\" stroke=\"#ffffff\" stroke-width=\"0.35\" stroke-linecap=\"round\"/><circle cx=\"60.49\" cy=\"2.92\" r=\"0.28\" fill=\"#ffffff\"/><line x1=\"64.00\" y1=\"7.50\" x2=\"64.00\" y2=\"3.00\" stroke=\"#ffffff\" stroke-width=\"0.35\" stroke-linecap=\"round\"/><circle cx=\"64.00\" cy=\"1.98\" r=\"0.28\" fill=\"#ffffff\"/><line x1=\"64.75\" y1=\"7.70\" x2=\"67.00\" y2=\"3.80\" stroke=\"#ffffff\" stroke-width=\"0.35\" stroke-linecap=\"round\"/><circle cx=\"67.51\" cy=\"2.92\" r=\"0.28\" fill=\"#ffffff\"/><line x1=\"65.30\" y1=\"8.25\" x2=\"69.20\" y2=\"6.00\" stroke=\"#ffffff\" stroke-width=\"0.35\" stroke-linecap=\"round\"/><circle cx=\"70.08\" cy=\"5.49\" r=\"0.28\" fill=\"#ffffff\"/><line x1=\"94.50\" y1=\"40.00\" x2=\"99.00\" y2=\"40.00\" stroke=\"#3fd8ec\" stroke-width=\"0.4\" stroke-linecap=\"round\"/><circle cx=\"100.02\" cy=\"40.00\" r=\"0.32\" fill=\"#3fd8ec\"/><line x1=\"94.21\" y1=\"40.88\" x2=\"97.85\" y2=\"43.53\" stroke=\"#3fd8ec\" stroke-width=\"0.4\" stroke-linecap=\"round\"/><circle cx=\"98.68\" cy=\"44.13\" r=\"0.32\" fill=\"#3fd8ec\"/><line x1=\"93.46\" y1=\"41.43\" x2=\"94.85\" y2=\"45.71\" stroke=\"#3fd8ec\" stroke-width=\"0.4\" stroke-linecap=\"round\"/><circle cx=\"95.17\" cy=\"46.68\" r=\"0.32\" fill=\"#3fd8ec\"/><line x1=\"92.54\" y1=\"41.43\" x2=\"91.15\" y2=\"45.71\" stroke=\"#3fd8ec\" stroke-width=\"0.4\" stroke-linecap=\"round\"/><circle cx=\"90.83\" cy=\"46.68\" r=\"0.32\" fill=\"#3fd8ec\"/><line x1=\"91.79\" y1=\"40.88\" x2=\"88.15\" y2=\"43.53\" stroke=\"#3fd8ec\" stroke-width=\"0.4\" stroke-linecap=\"round\"/><circle cx=\"87.32\" cy=\"44.13\" r=\"0.32\" fill=\"#3fd8ec\"/><line x1=\"91.50\" y1=\"40.00\" x2=\"87.00\" y2=\"40.00\" stroke=\"#3fd8ec\" stroke-width=\"0.4\" stroke-linecap=\"round\"/><circle cx=\"85.98\" cy=\"40.00\" r=\"0.32\" fill=\"#3fd8ec\"/><line x1=\"91.79\" y1=\"39.12\" x2=\"88.15\" y2=\"36.47\" stroke=\"#3fd8ec\" stroke-width=\"0.4\" stroke-linecap=\"round\"/><circle cx=\"87.32\" cy=\"35.87\" r=\"0.32\" fill=\"#3fd8ec\"/><line x1=\"92.54\" y1=\"38.57\" x2=\"91.15\" y2=\"34.29\" stroke=\"#3fd8ec\" stroke-width=\"0.4\" stroke-linecap=\"round\"/><circle cx=\"90.83\" cy=\"33.32\" r=\"0.32\" fill=\"#3fd8ec\"/><line x1=\"93.46\" y1=\"38.57\" x2=\"94.85\" y2=\"34.29\" stroke=\"#3fd8ec\" stroke-width=\"0.4\" stroke-linecap=\"round\"/><circle cx=\"95.17\" cy=\"33.32\" r=\"0.32\" fill=\"#3fd8ec\"/><line x1=\"94.21\" y1=\"39.12\" x2=\"97.85\" y2=\"36.47\" stroke=\"#3fd8ec\" stroke-width=\"0.4\" stroke-linecap=\"round\"/><circle cx=\"98.68\" cy=\"35.87\" r=\"0.32\" fill=\"#3fd8ec\"/><line x1=\"13.25\" y1=\"44.00\" x2=\"17.00\" y2=\"44.00\" stroke=\"#b9a8ff\" stroke-width=\"0.35\" stroke-linecap=\"round\"/><circle cx=\"17.85\" cy=\"44.00\" r=\"0.28\" fill=\"#b9a8ff\"/><line x1=\"13.01\" y1=\"44.73\" x2=\"16.05\" y2=\"46.94\" stroke=\"#b9a8ff\" stroke-width=\"0.35\" stroke-linecap=\"round\"/><circle cx=\"16.73\" cy=\"47.44\" r=\"0.28\" fill=\"#b9a8ff\"/><line x1=\"12.39\" y1=\"45.19\" x2=\"13.55\" y2=\"48.76\" stroke=\"#b9a8ff\" stroke-width=\"0.35\" stroke-linecap=\"round\"/><circle cx=\"13.81\" cy=\"49.56\" r=\"0.28\" fill=\"#b9a8ff\"/><line x1=\"11.61\" y1=\"45.19\" x2=\"10.45\" y2=\"48.76\" stroke=\"#b9a8ff\" stroke-width=\"0.35\" stroke-linecap=\"round\"/><circle cx=\"10.19\" cy=\"49.56\" r=\"0.28\" fill=\"#b9a8ff\"/><line x1=\"10.99\" y1=\"44.73\" x2=\"7.95\" y2=\"46.94\" stroke=\"#b9a8ff\" stroke-width=\"0.35\" stroke-linecap=\"round\"/><circle cx=\"7.27\" cy=\"47.44\" r=\"0.28\" fill=\"#b9a8ff\"/><line x1=\"10.75\" y1=\"44.00\" x2=\"7.00\" y2=\"44.00\" stroke=\"#b9a8ff\" stroke-width=\"0.35\" stroke-linecap=\"round\"/><circle cx=\"6.15\" cy=\"44.00\" r=\"0.28\" fill=\"#b9a8ff\"/><line x1=\"10.99\" y1=\"43.27\" x2=\"7.95\" y2=\"41.06\" stroke=\"#b9a8ff\" stroke-width=\"0.35\" stroke-linecap=\"round\"/><circle cx=\"7.27\" cy=\"40.56\" r=\"0.28\" fill=\"#b9a8ff\"/><line x1=\"11.61\" y1=\"42.81\" x2=\"10.45\" y2=\"39.24\" stroke=\"#b9a8ff\" stroke-width=\"0.35\" stroke-linecap=\"round\"/><circle cx=\"10.19\" cy=\"38.44\" r=\"0.28\" fill=\"#b9a8ff\"/><line x1=\"12.39\" y1=\"42.81\" x2=\"13.55\" y2=\"39.24\" stroke=\"#b9a8ff\" stroke-width=\"0.35\" stroke-linecap=\"round\"/><circle cx=\"13.81\" cy=\"38.44\" r=\"0.28\" fill=\"#b9a8ff\"/><line x1=\"13.01\" y1=\"43.27\" x2=\"16.05\" y2=\"41.06\" stroke=\"#b9a8ff\" stroke-width=\"0.35\" stroke-linecap=\"round\"/><circle cx=\"16.73\" cy=\"40.56\" r=\"0.28\" fill=\"#b9a8ff\"/><line x1=\"48.88\" y1=\"40.00\" x2=\"51.50\" y2=\"40.00\" stroke=\"#ffcc4d\" stroke-width=\"0.3\" stroke-linecap=\"round\"/><circle cx=\"52.09\" cy=\"40.00\" r=\"0.24\" fill=\"#ffcc4d\"/><line x1=\"48.62\" y1=\"40.62\" x2=\"50.47\" y2=\"42.47\" stroke=\"#ffcc4d\" stroke-width=\"0.3\" stroke-linecap=\"round\"/><circle cx=\"50.90\" cy=\"42.90\" r=\"0.24\" fill=\"#ffcc4d\"/><line x1=\"48.00\" y1=\"40.88\" x2=\"48.00\" y2=\"43.50\" stroke=\"#ffcc4d\" stroke-width=\"0.3\" stroke-linecap=\"round\"/><circle cx=\"48.00\" cy=\"44.09\" r=\"0.24\" fill=\"#ffcc4d\"/><line x1=\"47.38\" y1=\"40.62\" x2=\"45.53\" y2=\"42.47\" stroke=\"#ffcc4d\" stroke-width=\"0.3\" stroke-linecap=\"round\"/><circle cx=\"45.10\" cy=\"42.90\" r=\"0.24\" fill=\"#ffcc4d\"/><line x1=\"47.12\" y1=\"40.00\" x2=\"44.50\" y2=\"40.00\" stroke=\"#ffcc4d\" stroke-width=\"0.3\" stroke-linecap=\"round\"/><circle cx=\"43.91\" cy=\"40.00\" r=\"0.24\" fill=\"#ffcc4d\"/><line x1=\"47.38\" y1=\"39.38\" x2=\"45.53\" y2=\"37.53\" stroke=\"#ffcc4d\" stroke-width=\"0.3\" stroke-linecap=\"round\"/><circle cx=\"45.10\" cy=\"37.10\" r=\"0.24\" fill=\"#ffcc4d\"/><line x1=\"48.00\" y1=\"39.12\" x2=\"48.00\" y2=\"36.50\" stroke=\"#ffcc4d\" stroke-width=\"0.3\" stroke-linecap=\"round\"/><circle cx=\"48.00\" cy=\"35.91\" r=\"0.24\" fill=\"#ffcc4d\"/><line x1=\"48.62\" y1=\"39.38\" x2=\"50.47\" y2=\"37.53\" stroke=\"#ffcc4d\" stroke-width=\"0.3\" stroke-linecap=\"round\"/><circle cx=\"50.90\" cy=\"37.10\" r=\"0.24\" fill=\"#ffcc4d\"/><path d=\"M104,30 C80,46 92,58 66,66 S40,64 30,84 S8,96 -4,104\" stroke=\"#ff3d8b\" stroke-width=\"0.8\" fill=\"none\" stroke-linecap=\"round\"/><path d=\"M104,36 C84,50 96,62 70,71 S44,70 34,90 S12,100 -4,110\" stroke=\"#ffcc4d\" stroke-width=\"0.6\" fill=\"none\" stroke-linecap=\"round\"/><path d=\"M-4,58 C10,52 18,64 30,58\" stroke=\"#3fd8ec\" stroke-width=\"0.55\" fill=\"none\" stroke-linecap=\"round\"/><rect x=\"62.9\" y=\"48.2\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#ffffff\" transform=\"rotate(118 62.9 48.2)\"/><rect x=\"80.7\" y=\"103.5\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#ff3d8b\" transform=\"rotate(36 80.7 103.5)\"/><rect x=\"47.5\" y=\"19.3\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#ffcc4d\" transform=\"rotate(136 47.5 19.3)\"/><rect x=\"53.5\" y=\"3.9\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#ff3d8b\" transform=\"rotate(49 53.5 3.9)\"/><rect x=\"34.6\" y=\"75.3\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#ffffff\" transform=\"rotate(90 34.6 75.3)\"/><rect x=\"99.7\" y=\"17.2\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#ff3d8b\" transform=\"rotate(16 99.7 17.2)\"/><rect x=\"93.3\" y=\"78.0\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#ff3d8b\" transform=\"rotate(81 93.3 78.0)\"/><rect x=\"19.7\" y=\"95.8\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#ffcc4d\" transform=\"rotate(68 19.7 95.8)\"/><rect x=\"56.9\" y=\"95.0\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#3fd8ec\" transform=\"rotate(83 56.9 95.0)\"/><rect x=\"65.1\" y=\"22.1\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#ffcc4d\" transform=\"rotate(38 65.1 22.1)\"/><rect x=\"90.0\" y=\"105.9\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#3fd8ec\" transform=\"rotate(97 90.0 105.9)\"/><rect x=\"79.1\" y=\"34.6\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#ffcc4d\" transform=\"rotate(63 79.1 34.6)\"/><rect x=\"8.3\" y=\"47.6\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#ffffff\" transform=\"rotate(76 8.3 47.6)\"/><rect x=\"27.5\" y=\"99.3\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#ff3d8b\" transform=\"rotate(146 27.5 99.3)\"/><rect x=\"6.4\" y=\"86.4\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#ff3d8b\" transform=\"rotate(96 6.4 86.4)\"/><rect x=\"68.7\" y=\"98.9\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#b9a8ff\" transform=\"rotate(27 68.7 98.9)\"/><rect x=\"51.7\" y=\"78.1\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#b9a8ff\" transform=\"rotate(170 51.7 78.1)\"/><rect x=\"49.3\" y=\"102.5\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#ffcc4d\" transform=\"rotate(136 49.3 102.5)\"/><rect x=\"43.9\" y=\"60.3\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#ffffff\" transform=\"rotate(115 43.9 60.3)\"/><rect x=\"52.3\" y=\"91.1\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#ffffff\" transform=\"rotate(46 52.3 91.1)\"/><rect x=\"67.1\" y=\"103.1\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#ffffff\" transform=\"rotate(37 67.1 103.1)\"/><rect x=\"85.1\" y=\"104.6\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#ffffff\" transform=\"rotate(49 85.1 104.6)\"/><rect x=\"49.8\" y=\"44.4\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#ffcc4d\" transform=\"rotate(91 49.8 44.4)\"/><rect x=\"60.5\" y=\"3.0\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#ffcc4d\" transform=\"rotate(93 60.5 3.0)\"/><rect x=\"40.1\" y=\"86.5\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#ffffff\" transform=\"rotate(22 40.1 86.5)\"/><rect x=\"9.3\" y=\"18.0\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#ffffff\" transform=\"rotate(83 9.3 18.0)\"/><rect x=\"92.1\" y=\"86.4\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#b9a8ff\" transform=\"rotate(48 92.1 86.4)\"/><rect x=\"47.3\" y=\"13.7\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#b9a8ff\" transform=\"rotate(162 47.3 13.7)\"/><rect x=\"93.6\" y=\"99.4\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#ffffff\" transform=\"rotate(57 93.6 99.4)\"/><rect x=\"19.1\" y=\"66.7\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#3fd8ec\" transform=\"rotate(23 19.1 66.7)\"/><rect x=\"77.9\" y=\"2.5\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#ff3d8b\" transform=\"rotate(28 77.9 2.5)\"/><rect x=\"1.2\" y=\"30.7\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#3fd8ec\" transform=\"rotate(44 1.2 30.7)\"/><rect x=\"49.9\" y=\"54.0\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#ffffff\" transform=\"rotate(22 49.9 54.0)\"/><rect x=\"51.0\" y=\"27.1\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#ff3d8b\" transform=\"rotate(126 51.0 27.1)\"/><rect x=\"87.9\" y=\"2.5\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#b9a8ff\" transform=\"rotate(149 87.9 2.5)\"/><rect x=\"61.6\" y=\"58.1\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#ffffff\" transform=\"rotate(115 61.6 58.1)\"/><rect x=\"53.0\" y=\"91.9\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#ffffff\" transform=\"rotate(106 53.0 91.9)\"/><rect x=\"13.6\" y=\"98.8\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#3fd8ec\" transform=\"rotate(162 13.6 98.8)\"/><rect x=\"31.6\" y=\"34.0\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#ff3d8b\" transform=\"rotate(39 31.6 34.0)\"/><rect x=\"99.8\" y=\"95.9\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#ff3d8b\" transform=\"rotate(160 99.8 95.9)\"/><rect x=\"13.3\" y=\"9.5\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#b9a8ff\" transform=\"rotate(17 13.3 9.5)\"/><rect x=\"83.2\" y=\"45.5\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#ff3d8b\" transform=\"rotate(36 83.2 45.5)\"/><rect x=\"62.8\" y=\"86.3\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#ffcc4d\" transform=\"rotate(36 62.8 86.3)\"/><rect x=\"68.2\" y=\"98.4\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#3fd8ec\" transform=\"rotate(21 68.2 98.4)\"/><rect x=\"50.6\" y=\"81.9\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#ffffff\" transform=\"rotate(180 50.6 81.9)\"/><rect x=\"83.3\" y=\"86.7\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#b9a8ff\" transform=\"rotate(19 83.3 86.7)\"/><rect x=\"3.7\" y=\"59.6\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#ffffff\" transform=\"rotate(163 3.7 59.6)\"/><rect x=\"48.1\" y=\"20.5\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#ffcc4d\" transform=\"rotate(37 48.1 20.5)\"/><rect x=\"84.0\" y=\"107.0\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#ffcc4d\" transform=\"rotate(104 84.0 107.0)\"/><rect x=\"13.4\" y=\"73.5\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#ffcc4d\" transform=\"rotate(138 13.4 73.5)\"/><rect x=\"32.7\" y=\"50.4\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#ffffff\" transform=\"rotate(64 32.7 50.4)\"/><rect x=\"21.0\" y=\"40.3\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#ffcc4d\" transform=\"rotate(152 21.0 40.3)\"/><rect x=\"18.1\" y=\"49.0\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#3fd8ec\" transform=\"rotate(73 18.1 49.0)\"/><rect x=\"19.5\" y=\"17.8\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#ffffff\" transform=\"rotate(143 19.5 17.8)\"/><rect x=\"32.4\" y=\"9.2\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#b9a8ff\" transform=\"rotate(103 32.4 9.2)\"/><rect x=\"19.1\" y=\"63.1\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#3fd8ec\" transform=\"rotate(145 19.1 63.1)\"/><rect x=\"25.8\" y=\"98.4\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#ff3d8b\" transform=\"rotate(147 25.8 98.4)\"/><rect x=\"40.6\" y=\"96.8\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#ffffff\" transform=\"rotate(125 40.6 96.8)\"/><rect x=\"76.7\" y=\"82.6\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#b9a8ff\" transform=\"rotate(37 76.7 82.6)\"/><rect x=\"18.5\" y=\"86.1\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#3fd8ec\" transform=\"rotate(84 18.5 86.1)\"/><rect x=\"1.1\" y=\"38.4\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#ffffff\" transform=\"rotate(9 1.1 38.4)\"/><rect x=\"27.3\" y=\"103.8\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#3fd8ec\" transform=\"rotate(61 27.3 103.8)\"/><rect x=\"66.0\" y=\"61.5\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#ffffff\" transform=\"rotate(14 66.0 61.5)\"/><rect x=\"51.5\" y=\"53.7\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#ff3d8b\" transform=\"rotate(126 51.5 53.7)\"/><rect x=\"76.2\" y=\"105.8\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#ffcc4d\" transform=\"rotate(21 76.2 105.8)\"/><rect x=\"10.8\" y=\"25.6\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#b9a8ff\" transform=\"rotate(72 10.8 25.6)\"/><rect x=\"5.0\" y=\"21.1\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#b9a8ff\" transform=\"rotate(2 5.0 21.1)\"/><rect x=\"25.9\" y=\"29.8\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#3fd8ec\" transform=\"rotate(99 25.9 29.8)\"/><rect x=\"50.8\" y=\"104.5\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#ffffff\" transform=\"rotate(152 50.8 104.5)\"/><rect x=\"10.0\" y=\"48.0\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#ffcc4d\" transform=\"rotate(99 10.0 48.0)\"/><path d=\"M8,69.612 q2,9.1 -1.2,16.900000000000002 t1.6,9.1\" stroke=\"#d9defc\" stroke-width=\".25\" fill=\"none\"/><ellipse cx=\"8\" cy=\"64\" rx=\"4.6\" ry=\"5.611999999999999\" fill=\"#ff3d8b\"/><path d=\"M7.2,69.41199999999999 l.8,1.4 l.8,-1.4z\" fill=\"#ff3d8b\"/><ellipse cx=\"6.252000000000001\" cy=\"61.64296\" rx=\"0.9199999999999999\" ry=\"1.6835999999999998\" fill=\"#fff\" opacity=\".5\" transform=\"rotate(-25 6.252000000000001 61.64296)\"/><path d=\"M15.5,65.636 q-1.5,9.799999999999999 0.8999999999999999,18.2 t-1.2000000000000002,9.799999999999999\" stroke=\"#d9defc\" stroke-width=\".25\" fill=\"none\"/><ellipse cx=\"15.5\" cy=\"61\" rx=\"3.8\" ry=\"4.636\" fill=\"#ffcc4d\"/><path d=\"M14.7,65.43599999999999 l.8,1.4 l.8,-1.4z\" fill=\"#ffcc4d\"/><ellipse cx=\"14.056000000000001\" cy=\"59.05288\" rx=\"0.76\" ry=\"1.3908\" fill=\"#fff\" opacity=\".5\" transform=\"rotate(-25 14.056000000000001 59.05288)\"/><path d=\"M91,87.368 q-2,8.399999999999999 1.2,15.600000000000001 t-1.6,8.399999999999999\" stroke=\"#d9defc\" stroke-width=\".25\" fill=\"none\"/><ellipse cx=\"91\" cy=\"82\" rx=\"4.4\" ry=\"5.368\" fill=\"#3fd8ec\"/><path d=\"M90.2,87.16799999999999 l.8,1.4 l.8,-1.4z\" fill=\"#3fd8ec\"/><ellipse cx=\"89.328\" cy=\"79.74544\" rx=\"0.8800000000000001\" ry=\"1.6104\" fill=\"#fff\" opacity=\".5\" transform=\"rotate(-25 89.328 79.74544)\"/><path d=\"M97,82.148 q2,9.1 -1.2,16.900000000000002 t1.6,9.1\" stroke=\"#d9defc\" stroke-width=\".25\" fill=\"none\"/><ellipse cx=\"97\" cy=\"78\" rx=\"3.4\" ry=\"4.148\" fill=\"#b9a8ff\"/><path d=\"M96.2,81.948 l.8,1.4 l.8,-1.4z\" fill=\"#b9a8ff\"/><ellipse cx=\"95.708\" cy=\"76.25784\" rx=\"0.68\" ry=\"1.2444\" fill=\"#fff\" opacity=\".5\" transform=\"rotate(-25 95.708 76.25784)\"/></svg>", "skyPartnerSq": "<svg class=\"sky\" viewBox=\"0 0 100 100\" preserveAspectRatio=\"none\" aria-hidden=\"true\"><defs><radialGradient id=\"g1\" cx=\"78%\" cy=\"12%\" r=\"60%\"><stop offset=\"0\" stop-color=\"#5b3fc4\"/><stop offset=\"1\" stop-color=\"#5b3fc4\" stop-opacity=\"0\"/></radialGradient></defs><rect width=\"100\" height=\"100\" fill=\"url(#g1)\"/><circle cx=\"66.8\" cy=\"90.8\" r=\"0.21\" fill=\"#fff\" opacity=\"0.92\"/><circle cx=\"38.6\" cy=\"92.2\" r=\"0.32\" fill=\"#fff\" opacity=\"0.70\"/><circle cx=\"59.7\" cy=\"40.8\" r=\"0.23\" fill=\"#fff\" opacity=\"0.56\"/><circle cx=\"39.9\" cy=\"29.7\" r=\"0.24\" fill=\"#fff\" opacity=\"0.67\"/><circle cx=\"27.0\" cy=\"88.3\" r=\"0.27\" fill=\"#fff\" opacity=\"0.81\"/><circle cx=\"2.7\" cy=\"73.4\" r=\"0.25\" fill=\"#fff\" opacity=\"0.75\"/><circle cx=\"40.9\" cy=\"65.0\" r=\"0.13\" fill=\"#fff\" opacity=\"0.57\"/><circle cx=\"39.8\" cy=\"55.3\" r=\"0.29\" fill=\"#fff\" opacity=\"0.58\"/><circle cx=\"79.8\" cy=\"21.3\" r=\"0.29\" fill=\"#fff\" opacity=\"0.54\"/><circle cx=\"75.5\" cy=\"4.3\" r=\"0.14\" fill=\"#fff\" opacity=\"0.85\"/><circle cx=\"90.9\" cy=\"13.7\" r=\"0.34\" fill=\"#fff\" opacity=\"0.53\"/><circle cx=\"70.6\" cy=\"4.8\" r=\"0.22\" fill=\"#fff\" opacity=\"0.46\"/><circle cx=\"86.1\" cy=\"33.9\" r=\"0.16\" fill=\"#fff\" opacity=\"0.60\"/><circle cx=\"14.0\" cy=\"39.6\" r=\"0.26\" fill=\"#fff\" opacity=\"0.75\"/><circle cx=\"68.2\" cy=\"34.6\" r=\"0.29\" fill=\"#fff\" opacity=\"0.85\"/><circle cx=\"13.7\" cy=\"27.6\" r=\"0.15\" fill=\"#fff\" opacity=\"0.66\"/><circle cx=\"50.3\" cy=\"29.3\" r=\"0.24\" fill=\"#fff\" opacity=\"0.87\"/><circle cx=\"27.5\" cy=\"57.9\" r=\"0.29\" fill=\"#fff\" opacity=\"0.78\"/><circle cx=\"19.0\" cy=\"26.5\" r=\"0.18\" fill=\"#fff\" opacity=\"0.92\"/><circle cx=\"50.2\" cy=\"62.0\" r=\"0.17\" fill=\"#fff\" opacity=\"0.78\"/><circle cx=\"62.8\" cy=\"0.9\" r=\"0.18\" fill=\"#fff\" opacity=\"0.41\"/><circle cx=\"3.8\" cy=\"21.1\" r=\"0.18\" fill=\"#fff\" opacity=\"0.82\"/><circle cx=\"91.3\" cy=\"15.3\" r=\"0.17\" fill=\"#fff\" opacity=\"0.94\"/><circle cx=\"48.4\" cy=\"33.6\" r=\"0.20\" fill=\"#fff\" opacity=\"0.67\"/><circle cx=\"13.3\" cy=\"82.6\" r=\"0.30\" fill=\"#fff\" opacity=\"0.65\"/><circle cx=\"82.2\" cy=\"79.6\" r=\"0.30\" fill=\"#fff\" opacity=\"0.64\"/><circle cx=\"74.7\" cy=\"37.1\" r=\"0.15\" fill=\"#fff\" opacity=\"0.48\"/><circle cx=\"83.6\" cy=\"56.7\" r=\"0.19\" fill=\"#fff\" opacity=\"0.82\"/><circle cx=\"82.6\" cy=\"17.5\" r=\"0.27\" fill=\"#fff\" opacity=\"0.72\"/><circle cx=\"46.2\" cy=\"30.8\" r=\"0.25\" fill=\"#fff\" opacity=\"0.64\"/><circle cx=\"56.8\" cy=\"77.5\" r=\"0.23\" fill=\"#fff\" opacity=\"0.85\"/><circle cx=\"0.9\" cy=\"29.5\" r=\"0.33\" fill=\"#fff\" opacity=\"0.73\"/><circle cx=\"69.5\" cy=\"47.0\" r=\"0.30\" fill=\"#fff\" opacity=\"0.58\"/><circle cx=\"88.2\" cy=\"20.8\" r=\"0.27\" fill=\"#fff\" opacity=\"0.58\"/><circle cx=\"90.6\" cy=\"30.6\" r=\"0.22\" fill=\"#fff\" opacity=\"0.73\"/><circle cx=\"90.2\" cy=\"65.3\" r=\"0.18\" fill=\"#fff\" opacity=\"0.69\"/><circle cx=\"99.2\" cy=\"43.5\" r=\"0.17\" fill=\"#fff\" opacity=\"0.93\"/><circle cx=\"73.0\" cy=\"49.0\" r=\"0.14\" fill=\"#fff\" opacity=\"0.86\"/><circle cx=\"2.4\" cy=\"64.3\" r=\"0.25\" fill=\"#fff\" opacity=\"0.84\"/><circle cx=\"73.9\" cy=\"35.0\" r=\"0.21\" fill=\"#fff\" opacity=\"0.49\"/><circle cx=\"59.1\" cy=\"16.8\" r=\"0.14\" fill=\"#fff\" opacity=\"0.65\"/><circle cx=\"85.5\" cy=\"77.1\" r=\"0.17\" fill=\"#fff\" opacity=\"0.43\"/><circle cx=\"15.9\" cy=\"28.1\" r=\"0.13\" fill=\"#fff\" opacity=\"0.86\"/><circle cx=\"42.3\" cy=\"55.3\" r=\"0.19\" fill=\"#fff\" opacity=\"0.70\"/><circle cx=\"33.5\" cy=\"26.0\" r=\"0.14\" fill=\"#fff\" opacity=\"0.57\"/><circle cx=\"2.6\" cy=\"62.1\" r=\"0.14\" fill=\"#fff\" opacity=\"0.85\"/><circle cx=\"42.2\" cy=\"67.7\" r=\"0.23\" fill=\"#fff\" opacity=\"0.90\"/><circle cx=\"33.8\" cy=\"43.6\" r=\"0.20\" fill=\"#fff\" opacity=\"0.84\"/><circle cx=\"33.3\" cy=\"13.0\" r=\"0.23\" fill=\"#fff\" opacity=\"0.84\"/><circle cx=\"7.2\" cy=\"58.7\" r=\"0.13\" fill=\"#fff\" opacity=\"0.82\"/><circle cx=\"98.6\" cy=\"33.2\" r=\"0.12\" fill=\"#fff\" opacity=\"0.61\"/><circle cx=\"8.9\" cy=\"44.1\" r=\"0.24\" fill=\"#fff\" opacity=\"0.41\"/><circle cx=\"36.2\" cy=\"1.0\" r=\"0.15\" fill=\"#fff\" opacity=\"0.91\"/><circle cx=\"91.6\" cy=\"23.3\" r=\"0.16\" fill=\"#fff\" opacity=\"0.75\"/><circle cx=\"68.4\" cy=\"30.5\" r=\"0.21\" fill=\"#fff\" opacity=\"0.69\"/><circle cx=\"27.4\" cy=\"84.2\" r=\"0.23\" fill=\"#fff\" opacity=\"0.80\"/><circle cx=\"30.3\" cy=\"14.8\" r=\"0.33\" fill=\"#fff\" opacity=\"0.90\"/><circle cx=\"75.3\" cy=\"1.6\" r=\"0.23\" fill=\"#fff\" opacity=\"0.84\"/><circle cx=\"31.3\" cy=\"18.8\" r=\"0.20\" fill=\"#fff\" opacity=\"0.72\"/><circle cx=\"60.0\" cy=\"44.8\" r=\"0.24\" fill=\"#fff\" opacity=\"0.64\"/><path d=\"M87.0849733085917,36.88982656698127 L87.42157503950183,37.899631759711674 L88.43138023223224,38.23623349062181 L87.42157503950183,38.57283522153194 L87.0849733085917,39.58264041426234 L86.74837157768157,38.57283522153194 L85.73856638495116,38.23623349062181 L86.74837157768157,37.899631759711674Z\" fill=\"#ffcc4d\" opacity=\".9\"/><path d=\"M91.11105615871121,58.17661598765855 L91.45235560778674,59.20051433488514 L92.47625395501332,59.54181378396067 L91.45235560778674,59.8831132330362 L91.11105615871121,60.90701158026279 L90.76975670963567,59.8831132330362 L89.7458583624091,59.54181378396067 L90.76975670963567,59.20051433488514Z\" fill=\"#ffcc4d\" opacity=\".9\"/><path d=\"M54.73859309458855,79.98121683457246 L55.01130711253939,80.79935888842499 L55.82944916639191,81.07207290637582 L55.01130711253939,81.34478692432666 L54.73859309458855,82.16292897817918 L54.46587907663771,81.34478692432666 L53.64773702278519,81.07207290637582 L54.46587907663771,80.79935888842499Z\" fill=\"#ffcc4d\" opacity=\".9\"/><path d=\"M40.84587398126558,89.59502265728051 L41.14491151103291,90.49213524658248 L42.04202410033487,90.7911727763498 L41.14491151103291,91.09021030611711 L40.84587398126558,91.98732289541908 L40.54683645149826,91.09021030611711 L39.649723862196296,90.7911727763498 L40.54683645149826,90.49213524658248Z\" fill=\"#ffcc4d\" opacity=\".9\"/><path d=\"M75.5379568484412,7.462270815042234 L75.8673434521479,8.450430626162358 L76.85550326326803,8.779817229869067 L75.8673434521479,9.109203833575776 L75.5379568484412,10.097363644695902 L75.20857024473449,9.109203833575776 L74.22041043361436,8.779817229869067 L75.20857024473449,8.450430626162358Z\" fill=\"#ffcc4d\" opacity=\".9\"/><path d=\"M40.54599695408676,19.774334214132764 L40.766140793954264,20.434765733735286 L41.42657231355679,20.654909573602794 L40.766140793954264,20.8750534134703 L40.54599695408676,21.535484933072823 L40.32585311421926,20.8750534134703 L39.66542159461673,20.654909573602794 L40.32585311421926,20.434765733735286Z\" fill=\"#ffcc4d\" opacity=\".9\"/><line x1=\"85.25\" y1=\"17.00\" x2=\"95.00\" y2=\"17.00\" stroke=\"#ff3d8b\" stroke-width=\"0.55\" stroke-linecap=\"round\"/><circle cx=\"97.21\" cy=\"17.00\" r=\"0.44\" fill=\"#ff3d8b\"/><line x1=\"85.00\" y1=\"18.24\" x2=\"94.01\" y2=\"21.97\" stroke=\"#ff3d8b\" stroke-width=\"0.55\" stroke-linecap=\"round\"/><circle cx=\"96.05\" cy=\"22.82\" r=\"0.44\" fill=\"#ff3d8b\"/><line x1=\"84.30\" y1=\"19.30\" x2=\"91.19\" y2=\"26.19\" stroke=\"#ff3d8b\" stroke-width=\"0.55\" stroke-linecap=\"round\"/><circle cx=\"92.76\" cy=\"27.76\" r=\"0.44\" fill=\"#ff3d8b\"/><line x1=\"83.24\" y1=\"20.00\" x2=\"86.97\" y2=\"29.01\" stroke=\"#ff3d8b\" stroke-width=\"0.55\" stroke-linecap=\"round\"/><circle cx=\"87.82\" cy=\"31.05\" r=\"0.44\" fill=\"#ff3d8b\"/><line x1=\"82.00\" y1=\"20.25\" x2=\"82.00\" y2=\"30.00\" stroke=\"#ff3d8b\" stroke-width=\"0.55\" stroke-linecap=\"round\"/><circle cx=\"82.00\" cy=\"32.21\" r=\"0.44\" fill=\"#ff3d8b\"/><line x1=\"80.76\" y1=\"20.00\" x2=\"77.03\" y2=\"29.01\" stroke=\"#ff3d8b\" stroke-width=\"0.55\" stroke-linecap=\"round\"/><circle cx=\"76.18\" cy=\"31.05\" r=\"0.44\" fill=\"#ff3d8b\"/><line x1=\"79.70\" y1=\"19.30\" x2=\"72.81\" y2=\"26.19\" stroke=\"#ff3d8b\" stroke-width=\"0.55\" stroke-linecap=\"round\"/><circle cx=\"71.24\" cy=\"27.76\" r=\"0.44\" fill=\"#ff3d8b\"/><line x1=\"79.00\" y1=\"18.24\" x2=\"69.99\" y2=\"21.97\" stroke=\"#ff3d8b\" stroke-width=\"0.55\" stroke-linecap=\"round\"/><circle cx=\"67.95\" cy=\"22.82\" r=\"0.44\" fill=\"#ff3d8b\"/><line x1=\"78.75\" y1=\"17.00\" x2=\"69.00\" y2=\"17.00\" stroke=\"#ff3d8b\" stroke-width=\"0.55\" stroke-linecap=\"round\"/><circle cx=\"66.79\" cy=\"17.00\" r=\"0.44\" fill=\"#ff3d8b\"/><line x1=\"79.00\" y1=\"15.76\" x2=\"69.99\" y2=\"12.03\" stroke=\"#ff3d8b\" stroke-width=\"0.55\" stroke-linecap=\"round\"/><circle cx=\"67.95\" cy=\"11.18\" r=\"0.44\" fill=\"#ff3d8b\"/><line x1=\"79.70\" y1=\"14.70\" x2=\"72.81\" y2=\"7.81\" stroke=\"#ff3d8b\" stroke-width=\"0.55\" stroke-linecap=\"round\"/><circle cx=\"71.24\" cy=\"6.24\" r=\"0.44\" fill=\"#ff3d8b\"/><line x1=\"80.76\" y1=\"14.00\" x2=\"77.03\" y2=\"4.99\" stroke=\"#ff3d8b\" stroke-width=\"0.55\" stroke-linecap=\"round\"/><circle cx=\"76.18\" cy=\"2.95\" r=\"0.44\" fill=\"#ff3d8b\"/><line x1=\"82.00\" y1=\"13.75\" x2=\"82.00\" y2=\"4.00\" stroke=\"#ff3d8b\" stroke-width=\"0.55\" stroke-linecap=\"round\"/><circle cx=\"82.00\" cy=\"1.79\" r=\"0.44\" fill=\"#ff3d8b\"/><line x1=\"83.24\" y1=\"14.00\" x2=\"86.97\" y2=\"4.99\" stroke=\"#ff3d8b\" stroke-width=\"0.55\" stroke-linecap=\"round\"/><circle cx=\"87.82\" cy=\"2.95\" r=\"0.44\" fill=\"#ff3d8b\"/><line x1=\"84.30\" y1=\"14.70\" x2=\"91.19\" y2=\"7.81\" stroke=\"#ff3d8b\" stroke-width=\"0.55\" stroke-linecap=\"round\"/><circle cx=\"92.76\" cy=\"6.24\" r=\"0.44\" fill=\"#ff3d8b\"/><line x1=\"85.00\" y1=\"15.76\" x2=\"94.01\" y2=\"12.03\" stroke=\"#ff3d8b\" stroke-width=\"0.55\" stroke-linecap=\"round\"/><circle cx=\"96.05\" cy=\"11.18\" r=\"0.44\" fill=\"#ff3d8b\"/><line x1=\"83.75\" y1=\"17.00\" x2=\"89.00\" y2=\"17.00\" stroke=\"#ffcc4d\" stroke-width=\"0.45\" stroke-linecap=\"round\"/><circle cx=\"90.19\" cy=\"17.00\" r=\"0.36\" fill=\"#ffcc4d\"/><line x1=\"83.42\" y1=\"18.03\" x2=\"87.66\" y2=\"21.11\" stroke=\"#ffcc4d\" stroke-width=\"0.45\" stroke-linecap=\"round\"/><circle cx=\"88.63\" cy=\"21.81\" r=\"0.36\" fill=\"#ffcc4d\"/><line x1=\"82.54\" y1=\"18.66\" x2=\"84.16\" y2=\"23.66\" stroke=\"#ffcc4d\" stroke-width=\"0.45\" stroke-linecap=\"round\"/><circle cx=\"84.53\" cy=\"24.79\" r=\"0.36\" fill=\"#ffcc4d\"/><line x1=\"81.46\" y1=\"18.66\" x2=\"79.84\" y2=\"23.66\" stroke=\"#ffcc4d\" stroke-width=\"0.45\" stroke-linecap=\"round\"/><circle cx=\"79.47\" cy=\"24.79\" r=\"0.36\" fill=\"#ffcc4d\"/><line x1=\"80.58\" y1=\"18.03\" x2=\"76.34\" y2=\"21.11\" stroke=\"#ffcc4d\" stroke-width=\"0.45\" stroke-linecap=\"round\"/><circle cx=\"75.37\" cy=\"21.81\" r=\"0.36\" fill=\"#ffcc4d\"/><line x1=\"80.25\" y1=\"17.00\" x2=\"75.00\" y2=\"17.00\" stroke=\"#ffcc4d\" stroke-width=\"0.45\" stroke-linecap=\"round\"/><circle cx=\"73.81\" cy=\"17.00\" r=\"0.36\" fill=\"#ffcc4d\"/><line x1=\"80.58\" y1=\"15.97\" x2=\"76.34\" y2=\"12.89\" stroke=\"#ffcc4d\" stroke-width=\"0.45\" stroke-linecap=\"round\"/><circle cx=\"75.37\" cy=\"12.19\" r=\"0.36\" fill=\"#ffcc4d\"/><line x1=\"81.46\" y1=\"15.34\" x2=\"79.84\" y2=\"10.34\" stroke=\"#ffcc4d\" stroke-width=\"0.45\" stroke-linecap=\"round\"/><circle cx=\"79.47\" cy=\"9.21\" r=\"0.36\" fill=\"#ffcc4d\"/><line x1=\"82.54\" y1=\"15.34\" x2=\"84.16\" y2=\"10.34\" stroke=\"#ffcc4d\" stroke-width=\"0.45\" stroke-linecap=\"round\"/><circle cx=\"84.53\" cy=\"9.21\" r=\"0.36\" fill=\"#ffcc4d\"/><line x1=\"83.42\" y1=\"15.97\" x2=\"87.66\" y2=\"12.89\" stroke=\"#ffcc4d\" stroke-width=\"0.45\" stroke-linecap=\"round\"/><circle cx=\"88.63\" cy=\"12.19\" r=\"0.36\" fill=\"#ffcc4d\"/><line x1=\"65.50\" y1=\"9.00\" x2=\"70.00\" y2=\"9.00\" stroke=\"#ffffff\" stroke-width=\"0.35\" stroke-linecap=\"round\"/><circle cx=\"71.02\" cy=\"9.00\" r=\"0.28\" fill=\"#ffffff\"/><line x1=\"65.30\" y1=\"9.75\" x2=\"69.20\" y2=\"12.00\" stroke=\"#ffffff\" stroke-width=\"0.35\" stroke-linecap=\"round\"/><circle cx=\"70.08\" cy=\"12.51\" r=\"0.28\" fill=\"#ffffff\"/><line x1=\"64.75\" y1=\"10.30\" x2=\"67.00\" y2=\"14.20\" stroke=\"#ffffff\" stroke-width=\"0.35\" stroke-linecap=\"round\"/><circle cx=\"67.51\" cy=\"15.08\" r=\"0.28\" fill=\"#ffffff\"/><line x1=\"64.00\" y1=\"10.50\" x2=\"64.00\" y2=\"15.00\" stroke=\"#ffffff\" stroke-width=\"0.35\" stroke-linecap=\"round\"/><circle cx=\"64.00\" cy=\"16.02\" r=\"0.28\" fill=\"#ffffff\"/><line x1=\"63.25\" y1=\"10.30\" x2=\"61.00\" y2=\"14.20\" stroke=\"#ffffff\" stroke-width=\"0.35\" stroke-linecap=\"round\"/><circle cx=\"60.49\" cy=\"15.08\" r=\"0.28\" fill=\"#ffffff\"/><line x1=\"62.70\" y1=\"9.75\" x2=\"58.80\" y2=\"12.00\" stroke=\"#ffffff\" stroke-width=\"0.35\" stroke-linecap=\"round\"/><circle cx=\"57.92\" cy=\"12.51\" r=\"0.28\" fill=\"#ffffff\"/><line x1=\"62.50\" y1=\"9.00\" x2=\"58.00\" y2=\"9.00\" stroke=\"#ffffff\" stroke-width=\"0.35\" stroke-linecap=\"round\"/><circle cx=\"56.98\" cy=\"9.00\" r=\"0.28\" fill=\"#ffffff\"/><line x1=\"62.70\" y1=\"8.25\" x2=\"58.80\" y2=\"6.00\" stroke=\"#ffffff\" stroke-width=\"0.35\" stroke-linecap=\"round\"/><circle cx=\"57.92\" cy=\"5.49\" r=\"0.28\" fill=\"#ffffff\"/><line x1=\"63.25\" y1=\"7.70\" x2=\"61.00\" y2=\"3.80\" stroke=\"#ffffff\" stroke-width=\"0.35\" stroke-linecap=\"round\"/><circle cx=\"60.49\" cy=\"2.92\" r=\"0.28\" fill=\"#ffffff\"/><line x1=\"64.00\" y1=\"7.50\" x2=\"64.00\" y2=\"3.00\" stroke=\"#ffffff\" stroke-width=\"0.35\" stroke-linecap=\"round\"/><circle cx=\"64.00\" cy=\"1.98\" r=\"0.28\" fill=\"#ffffff\"/><line x1=\"64.75\" y1=\"7.70\" x2=\"67.00\" y2=\"3.80\" stroke=\"#ffffff\" stroke-width=\"0.35\" stroke-linecap=\"round\"/><circle cx=\"67.51\" cy=\"2.92\" r=\"0.28\" fill=\"#ffffff\"/><line x1=\"65.30\" y1=\"8.25\" x2=\"69.20\" y2=\"6.00\" stroke=\"#ffffff\" stroke-width=\"0.35\" stroke-linecap=\"round\"/><circle cx=\"70.08\" cy=\"5.49\" r=\"0.28\" fill=\"#ffffff\"/><line x1=\"94.50\" y1=\"40.00\" x2=\"99.00\" y2=\"40.00\" stroke=\"#3fd8ec\" stroke-width=\"0.4\" stroke-linecap=\"round\"/><circle cx=\"100.02\" cy=\"40.00\" r=\"0.32\" fill=\"#3fd8ec\"/><line x1=\"94.21\" y1=\"40.88\" x2=\"97.85\" y2=\"43.53\" stroke=\"#3fd8ec\" stroke-width=\"0.4\" stroke-linecap=\"round\"/><circle cx=\"98.68\" cy=\"44.13\" r=\"0.32\" fill=\"#3fd8ec\"/><line x1=\"93.46\" y1=\"41.43\" x2=\"94.85\" y2=\"45.71\" stroke=\"#3fd8ec\" stroke-width=\"0.4\" stroke-linecap=\"round\"/><circle cx=\"95.17\" cy=\"46.68\" r=\"0.32\" fill=\"#3fd8ec\"/><line x1=\"92.54\" y1=\"41.43\" x2=\"91.15\" y2=\"45.71\" stroke=\"#3fd8ec\" stroke-width=\"0.4\" stroke-linecap=\"round\"/><circle cx=\"90.83\" cy=\"46.68\" r=\"0.32\" fill=\"#3fd8ec\"/><line x1=\"91.79\" y1=\"40.88\" x2=\"88.15\" y2=\"43.53\" stroke=\"#3fd8ec\" stroke-width=\"0.4\" stroke-linecap=\"round\"/><circle cx=\"87.32\" cy=\"44.13\" r=\"0.32\" fill=\"#3fd8ec\"/><line x1=\"91.50\" y1=\"40.00\" x2=\"87.00\" y2=\"40.00\" stroke=\"#3fd8ec\" stroke-width=\"0.4\" stroke-linecap=\"round\"/><circle cx=\"85.98\" cy=\"40.00\" r=\"0.32\" fill=\"#3fd8ec\"/><line x1=\"91.79\" y1=\"39.12\" x2=\"88.15\" y2=\"36.47\" stroke=\"#3fd8ec\" stroke-width=\"0.4\" stroke-linecap=\"round\"/><circle cx=\"87.32\" cy=\"35.87\" r=\"0.32\" fill=\"#3fd8ec\"/><line x1=\"92.54\" y1=\"38.57\" x2=\"91.15\" y2=\"34.29\" stroke=\"#3fd8ec\" stroke-width=\"0.4\" stroke-linecap=\"round\"/><circle cx=\"90.83\" cy=\"33.32\" r=\"0.32\" fill=\"#3fd8ec\"/><line x1=\"93.46\" y1=\"38.57\" x2=\"94.85\" y2=\"34.29\" stroke=\"#3fd8ec\" stroke-width=\"0.4\" stroke-linecap=\"round\"/><circle cx=\"95.17\" cy=\"33.32\" r=\"0.32\" fill=\"#3fd8ec\"/><line x1=\"94.21\" y1=\"39.12\" x2=\"97.85\" y2=\"36.47\" stroke=\"#3fd8ec\" stroke-width=\"0.4\" stroke-linecap=\"round\"/><circle cx=\"98.68\" cy=\"35.87\" r=\"0.32\" fill=\"#3fd8ec\"/><line x1=\"13.25\" y1=\"44.00\" x2=\"17.00\" y2=\"44.00\" stroke=\"#b9a8ff\" stroke-width=\"0.35\" stroke-linecap=\"round\"/><circle cx=\"17.85\" cy=\"44.00\" r=\"0.28\" fill=\"#b9a8ff\"/><line x1=\"13.01\" y1=\"44.73\" x2=\"16.05\" y2=\"46.94\" stroke=\"#b9a8ff\" stroke-width=\"0.35\" stroke-linecap=\"round\"/><circle cx=\"16.73\" cy=\"47.44\" r=\"0.28\" fill=\"#b9a8ff\"/><line x1=\"12.39\" y1=\"45.19\" x2=\"13.55\" y2=\"48.76\" stroke=\"#b9a8ff\" stroke-width=\"0.35\" stroke-linecap=\"round\"/><circle cx=\"13.81\" cy=\"49.56\" r=\"0.28\" fill=\"#b9a8ff\"/><line x1=\"11.61\" y1=\"45.19\" x2=\"10.45\" y2=\"48.76\" stroke=\"#b9a8ff\" stroke-width=\"0.35\" stroke-linecap=\"round\"/><circle cx=\"10.19\" cy=\"49.56\" r=\"0.28\" fill=\"#b9a8ff\"/><line x1=\"10.99\" y1=\"44.73\" x2=\"7.95\" y2=\"46.94\" stroke=\"#b9a8ff\" stroke-width=\"0.35\" stroke-linecap=\"round\"/><circle cx=\"7.27\" cy=\"47.44\" r=\"0.28\" fill=\"#b9a8ff\"/><line x1=\"10.75\" y1=\"44.00\" x2=\"7.00\" y2=\"44.00\" stroke=\"#b9a8ff\" stroke-width=\"0.35\" stroke-linecap=\"round\"/><circle cx=\"6.15\" cy=\"44.00\" r=\"0.28\" fill=\"#b9a8ff\"/><line x1=\"10.99\" y1=\"43.27\" x2=\"7.95\" y2=\"41.06\" stroke=\"#b9a8ff\" stroke-width=\"0.35\" stroke-linecap=\"round\"/><circle cx=\"7.27\" cy=\"40.56\" r=\"0.28\" fill=\"#b9a8ff\"/><line x1=\"11.61\" y1=\"42.81\" x2=\"10.45\" y2=\"39.24\" stroke=\"#b9a8ff\" stroke-width=\"0.35\" stroke-linecap=\"round\"/><circle cx=\"10.19\" cy=\"38.44\" r=\"0.28\" fill=\"#b9a8ff\"/><line x1=\"12.39\" y1=\"42.81\" x2=\"13.55\" y2=\"39.24\" stroke=\"#b9a8ff\" stroke-width=\"0.35\" stroke-linecap=\"round\"/><circle cx=\"13.81\" cy=\"38.44\" r=\"0.28\" fill=\"#b9a8ff\"/><line x1=\"13.01\" y1=\"43.27\" x2=\"16.05\" y2=\"41.06\" stroke=\"#b9a8ff\" stroke-width=\"0.35\" stroke-linecap=\"round\"/><circle cx=\"16.73\" cy=\"40.56\" r=\"0.28\" fill=\"#b9a8ff\"/><line x1=\"48.88\" y1=\"40.00\" x2=\"51.50\" y2=\"40.00\" stroke=\"#ffcc4d\" stroke-width=\"0.3\" stroke-linecap=\"round\"/><circle cx=\"52.09\" cy=\"40.00\" r=\"0.24\" fill=\"#ffcc4d\"/><line x1=\"48.62\" y1=\"40.62\" x2=\"50.47\" y2=\"42.47\" stroke=\"#ffcc4d\" stroke-width=\"0.3\" stroke-linecap=\"round\"/><circle cx=\"50.90\" cy=\"42.90\" r=\"0.24\" fill=\"#ffcc4d\"/><line x1=\"48.00\" y1=\"40.88\" x2=\"48.00\" y2=\"43.50\" stroke=\"#ffcc4d\" stroke-width=\"0.3\" stroke-linecap=\"round\"/><circle cx=\"48.00\" cy=\"44.09\" r=\"0.24\" fill=\"#ffcc4d\"/><line x1=\"47.38\" y1=\"40.62\" x2=\"45.53\" y2=\"42.47\" stroke=\"#ffcc4d\" stroke-width=\"0.3\" stroke-linecap=\"round\"/><circle cx=\"45.10\" cy=\"42.90\" r=\"0.24\" fill=\"#ffcc4d\"/><line x1=\"47.12\" y1=\"40.00\" x2=\"44.50\" y2=\"40.00\" stroke=\"#ffcc4d\" stroke-width=\"0.3\" stroke-linecap=\"round\"/><circle cx=\"43.91\" cy=\"40.00\" r=\"0.24\" fill=\"#ffcc4d\"/><line x1=\"47.38\" y1=\"39.38\" x2=\"45.53\" y2=\"37.53\" stroke=\"#ffcc4d\" stroke-width=\"0.3\" stroke-linecap=\"round\"/><circle cx=\"45.10\" cy=\"37.10\" r=\"0.24\" fill=\"#ffcc4d\"/><line x1=\"48.00\" y1=\"39.12\" x2=\"48.00\" y2=\"36.50\" stroke=\"#ffcc4d\" stroke-width=\"0.3\" stroke-linecap=\"round\"/><circle cx=\"48.00\" cy=\"35.91\" r=\"0.24\" fill=\"#ffcc4d\"/><line x1=\"48.62\" y1=\"39.38\" x2=\"50.47\" y2=\"37.53\" stroke=\"#ffcc4d\" stroke-width=\"0.3\" stroke-linecap=\"round\"/><circle cx=\"50.90\" cy=\"37.10\" r=\"0.24\" fill=\"#ffcc4d\"/><path d=\"M104,30 C80,46 92,58 66,66 S40,64 30,84 S8,96 -4,104\" stroke=\"#ff3d8b\" stroke-width=\"0.8\" fill=\"none\" stroke-linecap=\"round\"/><path d=\"M104,36 C84,50 96,62 70,71 S44,70 34,90 S12,100 -4,110\" stroke=\"#ffcc4d\" stroke-width=\"0.6\" fill=\"none\" stroke-linecap=\"round\"/><path d=\"M-4,58 C10,52 18,64 30,58\" stroke=\"#3fd8ec\" stroke-width=\"0.55\" fill=\"none\" stroke-linecap=\"round\"/><rect x=\"79.8\" y=\"105.4\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#ffffff\" transform=\"rotate(139 79.8 105.4)\"/><rect x=\"78.8\" y=\"6.3\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#ff3d8b\" transform=\"rotate(161 78.8 6.3)\"/><rect x=\"87.4\" y=\"97.8\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#b9a8ff\" transform=\"rotate(143 87.4 97.8)\"/><rect x=\"71.3\" y=\"65.5\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#ff3d8b\" transform=\"rotate(75 71.3 65.5)\"/><rect x=\"77.2\" y=\"15.6\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#ffffff\" transform=\"rotate(24 77.2 15.6)\"/><rect x=\"74.2\" y=\"66.9\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#ffffff\" transform=\"rotate(96 74.2 66.9)\"/><rect x=\"15.1\" y=\"83.2\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#ffcc4d\" transform=\"rotate(37 15.1 83.2)\"/><rect x=\"91.6\" y=\"16.1\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#ff3d8b\" transform=\"rotate(15 91.6 16.1)\"/><rect x=\"27.0\" y=\"77.4\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#ffcc4d\" transform=\"rotate(160 27.0 77.4)\"/><rect x=\"69.4\" y=\"8.9\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#ffffff\" transform=\"rotate(98 69.4 8.9)\"/><rect x=\"50.6\" y=\"2.1\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#ff3d8b\" transform=\"rotate(75 50.6 2.1)\"/><rect x=\"91.7\" y=\"9.8\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#b9a8ff\" transform=\"rotate(38 91.7 9.8)\"/><rect x=\"54.3\" y=\"56.8\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#ff3d8b\" transform=\"rotate(170 54.3 56.8)\"/><rect x=\"96.4\" y=\"34.1\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#b9a8ff\" transform=\"rotate(14 96.4 34.1)\"/><rect x=\"30.6\" y=\"50.5\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#ffcc4d\" transform=\"rotate(65 30.6 50.5)\"/><rect x=\"68.7\" y=\"11.4\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#b9a8ff\" transform=\"rotate(122 68.7 11.4)\"/><rect x=\"74.7\" y=\"84.7\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#ffcc4d\" transform=\"rotate(118 74.7 84.7)\"/><rect x=\"1.2\" y=\"40.7\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#b9a8ff\" transform=\"rotate(43 1.2 40.7)\"/><rect x=\"56.4\" y=\"49.5\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#ffcc4d\" transform=\"rotate(154 56.4 49.5)\"/><rect x=\"84.5\" y=\"77.7\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#ffffff\" transform=\"rotate(27 84.5 77.7)\"/><rect x=\"62.8\" y=\"101.2\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#3fd8ec\" transform=\"rotate(172 62.8 101.2)\"/><rect x=\"75.5\" y=\"60.0\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#ffcc4d\" transform=\"rotate(46 75.5 60.0)\"/><rect x=\"20.0\" y=\"79.0\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#3fd8ec\" transform=\"rotate(56 20.0 79.0)\"/><rect x=\"27.4\" y=\"50.7\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#3fd8ec\" transform=\"rotate(80 27.4 50.7)\"/><rect x=\"38.2\" y=\"11.0\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#ffffff\" transform=\"rotate(17 38.2 11.0)\"/><rect x=\"67.8\" y=\"76.5\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#ff3d8b\" transform=\"rotate(35 67.8 76.5)\"/><rect x=\"3.6\" y=\"50.0\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#ffcc4d\" transform=\"rotate(18 3.6 50.0)\"/><rect x=\"3.2\" y=\"106.6\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#b9a8ff\" transform=\"rotate(73 3.2 106.6)\"/><rect x=\"7.3\" y=\"99.4\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#b9a8ff\" transform=\"rotate(167 7.3 99.4)\"/><rect x=\"13.9\" y=\"22.2\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#ff3d8b\" transform=\"rotate(148 13.9 22.2)\"/><rect x=\"38.6\" y=\"35.8\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#b9a8ff\" transform=\"rotate(112 38.6 35.8)\"/><rect x=\"72.7\" y=\"66.2\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#3fd8ec\" transform=\"rotate(177 72.7 66.2)\"/><rect x=\"79.0\" y=\"71.3\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#ffffff\" transform=\"rotate(95 79.0 71.3)\"/><rect x=\"26.1\" y=\"20.4\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#3fd8ec\" transform=\"rotate(117 26.1 20.4)\"/><rect x=\"10.6\" y=\"40.8\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#ffffff\" transform=\"rotate(60 10.6 40.8)\"/><rect x=\"29.3\" y=\"11.1\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#ff3d8b\" transform=\"rotate(46 29.3 11.1)\"/><rect x=\"53.9\" y=\"32.2\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#ff3d8b\" transform=\"rotate(63 53.9 32.2)\"/><rect x=\"50.0\" y=\"15.3\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#ff3d8b\" transform=\"rotate(178 50.0 15.3)\"/><rect x=\"51.6\" y=\"77.3\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#ff3d8b\" transform=\"rotate(102 51.6 77.3)\"/><rect x=\"2.7\" y=\"71.2\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#ffcc4d\" transform=\"rotate(25 2.7 71.2)\"/><rect x=\"47.8\" y=\"45.1\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#3fd8ec\" transform=\"rotate(59 47.8 45.1)\"/><rect x=\"92.9\" y=\"39.0\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#b9a8ff\" transform=\"rotate(159 92.9 39.0)\"/><rect x=\"45.2\" y=\"78.8\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#ff3d8b\" transform=\"rotate(163 45.2 78.8)\"/><rect x=\"54.3\" y=\"60.6\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#ffffff\" transform=\"rotate(165 54.3 60.6)\"/><rect x=\"16.9\" y=\"80.5\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#3fd8ec\" transform=\"rotate(108 16.9 80.5)\"/><rect x=\"12.3\" y=\"89.1\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#3fd8ec\" transform=\"rotate(123 12.3 89.1)\"/><rect x=\"36.4\" y=\"81.9\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#3fd8ec\" transform=\"rotate(150 36.4 81.9)\"/><rect x=\"18.6\" y=\"59.2\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#ffcc4d\" transform=\"rotate(82 18.6 59.2)\"/><rect x=\"40.3\" y=\"84.5\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#ff3d8b\" transform=\"rotate(55 40.3 84.5)\"/><rect x=\"67.1\" y=\"79.7\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#b9a8ff\" transform=\"rotate(111 67.1 79.7)\"/><rect x=\"64.0\" y=\"82.4\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#ff3d8b\" transform=\"rotate(36 64.0 82.4)\"/><rect x=\"46.8\" y=\"15.4\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#b9a8ff\" transform=\"rotate(21 46.8 15.4)\"/><rect x=\"40.6\" y=\"36.3\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#ff3d8b\" transform=\"rotate(47 40.6 36.3)\"/><rect x=\"56.8\" y=\"35.9\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#ffcc4d\" transform=\"rotate(130 56.8 35.9)\"/><rect x=\"78.8\" y=\"43.5\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#b9a8ff\" transform=\"rotate(108 78.8 43.5)\"/><rect x=\"47.0\" y=\"44.4\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#ffffff\" transform=\"rotate(164 47.0 44.4)\"/><rect x=\"56.5\" y=\"44.0\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#3fd8ec\" transform=\"rotate(87 56.5 44.0)\"/><rect x=\"99.5\" y=\"90.5\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#b9a8ff\" transform=\"rotate(149 99.5 90.5)\"/><rect x=\"11.7\" y=\"12.4\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#ffffff\" transform=\"rotate(59 11.7 12.4)\"/><rect x=\"52.1\" y=\"45.4\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#ffcc4d\" transform=\"rotate(58 52.1 45.4)\"/><rect x=\"5.5\" y=\"78.4\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#b9a8ff\" transform=\"rotate(132 5.5 78.4)\"/><rect x=\"59.8\" y=\"81.2\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#3fd8ec\" transform=\"rotate(159 59.8 81.2)\"/><rect x=\"87.7\" y=\"26.4\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#b9a8ff\" transform=\"rotate(44 87.7 26.4)\"/><rect x=\"87.3\" y=\"105.0\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#b9a8ff\" transform=\"rotate(125 87.3 105.0)\"/><rect x=\"52.6\" y=\"25.8\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#3fd8ec\" transform=\"rotate(118 52.6 25.8)\"/><rect x=\"94.0\" y=\"95.0\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#3fd8ec\" transform=\"rotate(156 94.0 95.0)\"/><rect x=\"42.1\" y=\"87.0\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#ff3d8b\" transform=\"rotate(117 42.1 87.0)\"/><rect x=\"42.2\" y=\"13.2\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#ffcc4d\" transform=\"rotate(18 42.2 13.2)\"/><rect x=\"79.2\" y=\"13.4\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#ffffff\" transform=\"rotate(104 79.2 13.4)\"/><rect x=\"45.3\" y=\"32.0\" width=\"1.3\" height=\".6\" rx=\".2\" fill=\"#3fd8ec\" transform=\"rotate(4 45.3 32.0)\"/><path d=\"M6,64.88 q2,7.699999999999999 -1.2,14.3 t1.6,7.699999999999999\" stroke=\"#d9defc\" stroke-width=\".25\" fill=\"none\"/><ellipse cx=\"6\" cy=\"60\" rx=\"4\" ry=\"4.88\" fill=\"#ff3d8b\"/><path d=\"M5.2,64.67999999999999 l.8,1.4 l.8,-1.4z\" fill=\"#ff3d8b\"/><ellipse cx=\"4.48\" cy=\"57.9504\" rx=\"0.8\" ry=\"1.464\" fill=\"#fff\" opacity=\".5\" transform=\"rotate(-25 4.48 57.9504)\"/><path d=\"M94,62.88 q-2,7.699999999999999 1.2,14.3 t-1.6,7.699999999999999\" stroke=\"#d9defc\" stroke-width=\".25\" fill=\"none\"/><ellipse cx=\"94\" cy=\"58\" rx=\"4\" ry=\"4.88\" fill=\"#3fd8ec\"/><path d=\"M93.2,62.68 l.8,1.4 l.8,-1.4z\" fill=\"#3fd8ec\"/><ellipse cx=\"92.48\" cy=\"55.9504\" rx=\"0.8\" ry=\"1.464\" fill=\"#fff\" opacity=\".5\" transform=\"rotate(-25 92.48 55.9504)\"/></svg>"}, "feb": {"css": ".fb{container-type:inline-size;aspect-ratio:8.5/11;position:relative;overflow:hidden;border-radius:4px;box-shadow:0 10px 30px rgba(201,24,74,.25);background:radial-gradient(circle at 50% 30%,#fff7f9 0%,#ffe3ea 55%,#ffc9d7 100%);font-family:'DM Sans',Poppins,sans-serif;color:#5a1029}\n.fb::before{content:\"\";position:absolute;inset:1.6cqw;border:1.1cqw dotted #fff;border-radius:2cqw;z-index:1;pointer-events:none}\n.fb::after{content:\"\";position:absolute;inset:3.2cqw;border:.35cqw solid #e8457a;border-radius:1.4cqw;z-index:1;pointer-events:none;opacity:.55}\n.fb .fb-ov{position:absolute;inset:0;width:100%;height:100%;z-index:2;pointer-events:none}\n.fb .fb-ribbon{pointer-events:auto}\n.fb .fb-doily{position:absolute;z-index:5;left:5cqw;top:5cqw;width:16cqw;height:16cqw;border-radius:50%;background:#fff;display:grid;place-items:center;box-shadow:0 0 0 1cqw #fff,0 0 0 1.4cqw #ffb3c7,0 1cqw 2cqw rgba(201,24,74,.25);outline:.5cqw dashed #ff8fb1;outline-offset:1.6cqw}\n.fb .fb-doily img{width:12cqw}\n.fb .fb-doily.pip{border-radius:2.5cqw;width:22cqw;height:13cqw}\n.fb .fb-doily.pip img{width:20cqw}\n.fb .fb-heart{position:absolute;z-index:3;background-size:100% 100%;filter:drop-shadow(0 1.4cqw 2cqw rgba(201,24,74,.35));text-align:center;color:#fff}\n.fb .fb-heart .k{font-size:1.75cqw;letter-spacing:.3em;font-weight:700;opacity:.9}\n.fb .fb-heart .t{font:italic 800 8.6cqw/1 'Playfair Display',serif;margin:1cqw 0 .4cqw}\n.fb .fb-heart .m{font:400 9cqw/1 'Great Vibes',cursive;color:#ffe066}\n.fb .fb-heart .y{font-weight:800;letter-spacing:.5em;font-size:2.3cqw;margin-top:.8cqw}\n.fb .fb-heart .sub{font-size:2.3cqw;margin-top:1.4cqw;font-weight:700;color:#fff;text-shadow:0 .3cqw .6cqw rgba(122,15,51,.45)}\n.fb .ch{position:absolute;z-index:4;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;background-size:100% 100%;padding-bottom:2.6cqw;color:#c9184a;font-weight:800;text-transform:uppercase;line-height:1.05;filter:drop-shadow(0 .6cqw .8cqw rgba(90,16,41,.2))}\n.fb .ch.w{font-size:2cqw;letter-spacing:.04em}\n.fb .env{position:absolute;z-index:4;width:46cqw;height:27cqw}\n.fb .env .back{position:absolute;inset:0;background:#f48fb1;border-radius:1cqw}\n.fb .env .letter{position:absolute;left:3cqw;right:3cqw;top:-15cqw;height:34cqw;background:#fffdf7;border-radius:.8cqw;padding:2.4cqw 2.6cqw;box-shadow:0 .4cqw 1cqw rgba(90,16,41,.2);background-image:repeating-linear-gradient(#fffdf7 0 3.6cqw,#ffe3ea 3.6cqw 3.75cqw)}\n.fb .env .front{position:absolute;inset:0;background:linear-gradient(160deg,#ff8fb1,#e8457a);clip-path:polygon(0 34%,50% 70%,100% 34%,100% 100%,0 100%);border-radius:1cqw}\n.fb .env .seal{position:absolute;left:50%;top:58%;width:8cqw;height:8cqw;margin-left:-4cqw;border-radius:50%;background:radial-gradient(circle at 35% 35%,#e0354f,#9d0f2b);display:grid;place-items:center;box-shadow:0 .5cqw 1cqw rgba(0,0,0,.3)}\n.fb .env .seal::after{content:\"\";width:3.8cqw;height:3.4cqw;background:url(\"data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20viewBox%3D%22-3%20-3%20106%2096%22%3E%3Cpath%20d%3D%22M50%2088%20C20%2066%200%2048%200%2026%20C0%2011%2012%200%2026%200%20C37%200%2045%206%2050%2015%20C55%206%2063%200%2074%200%20C88%200%20100%2011%20100%2026%20C100%2048%2080%2066%2050%2088Z%22%20fill%3D%22%23ffe066%22%20stroke%3D%22none%22%20stroke-width%3D%223%22/%3E%3C/svg%3E\") center/contain no-repeat}\n.fb .env .to{font:400 4.4cqw/1 'Great Vibes',cursive;color:#e8457a}\n.fb .env .dd{font:italic 800 4.4cqw/1.05 'Playfair Display',serif;color:#5a1029;margin-top:.6cqw}\n.fb .env .tm{font-weight:700;font-size:2.5cqw;color:#c9184a;margin:.5cqw 0 .8cqw}\n.fb .env .ti{font-weight:800;font-size:3.3cqw;line-height:1.1;color:#7a0f33}\n.fb .e1{left:5cqw;top:74cqw;transform:rotate(-6deg)}\n.fb .e2{right:5cqw;top:81.5cqw;transform:rotate(5deg)}\n.fb .fb-band{position:absolute;left:0;right:0;bottom:0;height:15.5cqw;z-index:3;background:#fff7f9;border-top:.5cqw solid #ffb3c7;display:flex;align-items:center;gap:3cqw;padding:2.5cqw 6cqw 0}\n.fb .fb-band .rg{flex:1;font-size:2.25cqw;line-height:1.35;color:#5a1029}\n.fb .fb-ribbon{position:absolute;z-index:6;left:50%;transform:translateX(-50%);bottom:12.8cqw;background:#c9184a;color:#fff;font-weight:800;font-size:2.6cqw;letter-spacing:.12em;padding:1.3cqw 5cqw;white-space:nowrap;box-shadow:0 .6cqw 1.2cqw rgba(90,16,41,.3)}\n.fb .fb-ribbon::before,.fb .fb-ribbon::after{content:\"\";position:absolute;top:.9cqw;border:2.6cqw solid #9d0f2b;z-index:-1}\n.fb .fb-ribbon::before{left:-3.6cqw;border-left-color:transparent}\n.fb .fb-ribbon::after{right:-3.6cqw;border-right-color:transparent}\n.fb .fb-ribbon span{color:#ffe066}\n.fb .fb-qr{width:11cqw;height:11cqw;border:.7cqw solid #5a1029;border-radius:1cqw;background:repeating-linear-gradient(90deg,#5a1029 0 .9cqw,#fff .9cqw 1.8cqw);display:grid;place-items:center;flex:none}\n.fb .fb-qr span{background:#fff;font-size:1.8cqw;font-weight:800;padding:0 .6cqw}\n.fb .fb-lg{display:flex;flex-direction:column;gap:1cqw}\n.fb .fb-lg span{border:1.5px solid #ffb3c7;border-radius:1cqw;font-size:1.7cqw;font-weight:700;padding:.6cqw 1.2cqw;color:#7a0f33;text-align:center;background:#fff}\n.fb .fb-script{position:absolute;z-index:4;left:0;right:0;text-align:center;font:400 6cqw/1.15 'Great Vibes',cursive;color:#c9184a}\n.fb .fb-cap{position:absolute;z-index:4;left:0;right:0;text-align:center;font-size:2cqw;letter-spacing:.22em;font-weight:700;color:#e8457a}\n.fb .ch.tz .i{font-size:2.05cqw;letter-spacing:.02em}\n.fb .ch.tz .d{font-size:1.55cqw;font-weight:700;color:#7a0f33;text-transform:none;margin:.3cqw 0}\n.fb .ch.tz .t{font-size:2.7cqw}", "ovHst": "<svg class=\"fb-ov\" viewBox=\"0 0 100 129.4\" preserveAspectRatio=\"none\" aria-hidden=\"true\"><path transform=\"translate(23.8 70.4) scale(0.017) rotate(6 50 45)\" d=\"M50 88 C20 66 0 48 0 26 C0 11 12 0 26 0 C37 0 45 6 50 15 C55 6 63 0 74 0 C88 0 100 11 100 26 C100 48 80 66 50 88Z\" fill=\"#ffffff\" opacity=\"0.38\"/><path transform=\"translate(1.3 108.4) scale(0.016) rotate(-15 50 45)\" d=\"M50 88 C20 66 0 48 0 26 C0 11 12 0 26 0 C37 0 45 6 50 15 C55 6 63 0 74 0 C88 0 100 11 100 26 C100 48 80 66 50 88Z\" fill=\"#ffc2d4\" opacity=\"0.67\"/><path transform=\"translate(54.1 71.1) scale(0.018) rotate(-13 50 45)\" d=\"M50 88 C20 66 0 48 0 26 C0 11 12 0 26 0 C37 0 45 6 50 15 C55 6 63 0 74 0 C88 0 100 11 100 26 C100 48 80 66 50 88Z\" fill=\"#ffc2d4\" opacity=\"0.42\"/><path transform=\"translate(92.6 50.5) scale(0.012) rotate(-17 50 45)\" d=\"M50 88 C20 66 0 48 0 26 C0 11 12 0 26 0 C37 0 45 6 50 15 C55 6 63 0 74 0 C88 0 100 11 100 26 C100 48 80 66 50 88Z\" fill=\"#ff8fb1\" opacity=\"0.78\"/><path transform=\"translate(4.3 100.9) scale(0.024) rotate(-1 50 45)\" d=\"M50 88 C20 66 0 48 0 26 C0 11 12 0 26 0 C37 0 45 6 50 15 C55 6 63 0 74 0 C88 0 100 11 100 26 C100 48 80 66 50 88Z\" fill=\"#e8457a\" opacity=\"0.67\"/><path transform=\"translate(87.9 92.4) scale(0.025) rotate(11 50 45)\" d=\"M50 88 C20 66 0 48 0 26 C0 11 12 0 26 0 C37 0 45 6 50 15 C55 6 63 0 74 0 C88 0 100 11 100 26 C100 48 80 66 50 88Z\" fill=\"#ffffff\" opacity=\"0.61\"/><path transform=\"translate(96.4 17.4) scale(0.017) rotate(-18 50 45)\" d=\"M50 88 C20 66 0 48 0 26 C0 11 12 0 26 0 C37 0 45 6 50 15 C55 6 63 0 74 0 C88 0 100 11 100 26 C100 48 80 66 50 88Z\" fill=\"#ff8fb1\" opacity=\"0.45\"/><path transform=\"translate(96.5 56.4) scale(0.021) rotate(-4 50 45)\" d=\"M50 88 C20 66 0 48 0 26 C0 11 12 0 26 0 C37 0 45 6 50 15 C55 6 63 0 74 0 C88 0 100 11 100 26 C100 48 80 66 50 88Z\" fill=\"#e8457a\" opacity=\"0.73\"/><path transform=\"translate(57.4 69.1) scale(0.018) rotate(20 50 45)\" d=\"M50 88 C20 66 0 48 0 26 C0 11 12 0 26 0 C37 0 45 6 50 15 C55 6 63 0 74 0 C88 0 100 11 100 26 C100 48 80 66 50 88Z\" fill=\"#ffc2d4\" opacity=\"0.66\"/><path transform=\"translate(92.9 110.8) scale(0.026) rotate(10 50 45)\" d=\"M50 88 C20 66 0 48 0 26 C0 11 12 0 26 0 C37 0 45 6 50 15 C55 6 63 0 74 0 C88 0 100 11 100 26 C100 48 80 66 50 88Z\" fill=\"#ffc2d4\" opacity=\"0.50\"/><path transform=\"translate(54.2 74.0) scale(0.013) rotate(7 50 45)\" d=\"M50 88 C20 66 0 48 0 26 C0 11 12 0 26 0 C37 0 45 6 50 15 C55 6 63 0 74 0 C88 0 100 11 100 26 C100 48 80 66 50 88Z\" fill=\"#ffc2d4\" opacity=\"0.79\"/><path transform=\"translate(26.7 16.1) scale(0.019) rotate(-21 50 45)\" d=\"M50 88 C20 66 0 48 0 26 C0 11 12 0 26 0 C37 0 45 6 50 15 C55 6 63 0 74 0 C88 0 100 11 100 26 C100 48 80 66 50 88Z\" fill=\"#ffffff\" opacity=\"0.71\"/><path transform=\"translate(41.0 19.5) scale(0.016) rotate(19 50 45)\" d=\"M50 88 C20 66 0 48 0 26 C0 11 12 0 26 0 C37 0 45 6 50 15 C55 6 63 0 74 0 C88 0 100 11 100 26 C100 48 80 66 50 88Z\" fill=\"#ffffff\" opacity=\"0.37\"/><path transform=\"translate(61.5 5.8) scale(0.022) rotate(3 50 45)\" d=\"M50 88 C20 66 0 48 0 26 C0 11 12 0 26 0 C37 0 45 6 50 15 C55 6 63 0 74 0 C88 0 100 11 100 26 C100 48 80 66 50 88Z\" fill=\"#e8457a\" opacity=\"0.76\"/><path transform=\"translate(27.9 30.5) scale(0.013) rotate(-21 50 45)\" d=\"M50 88 C20 66 0 48 0 26 C0 11 12 0 26 0 C37 0 45 6 50 15 C55 6 63 0 74 0 C88 0 100 11 100 26 C100 48 80 66 50 88Z\" fill=\"#ff8fb1\" opacity=\"0.62\"/><path transform=\"translate(3.1 25.5) scale(0.018) rotate(-17 50 45)\" d=\"M50 88 C20 66 0 48 0 26 C0 11 12 0 26 0 C37 0 45 6 50 15 C55 6 63 0 74 0 C88 0 100 11 100 26 C100 48 80 66 50 88Z\" fill=\"#e8457a\" opacity=\"0.37\"/><path transform=\"translate(86.8 40.6) scale(0.025) rotate(-6 50 45)\" d=\"M50 88 C20 66 0 48 0 26 C0 11 12 0 26 0 C37 0 45 6 50 15 C55 6 63 0 74 0 C88 0 100 11 100 26 C100 48 80 66 50 88Z\" fill=\"#ffffff\" opacity=\"0.74\"/><path transform=\"translate(38.6 112.2) scale(0.022) rotate(6 50 45)\" d=\"M50 88 C20 66 0 48 0 26 C0 11 12 0 26 0 C37 0 45 6 50 15 C55 6 63 0 74 0 C88 0 100 11 100 26 C100 48 80 66 50 88Z\" fill=\"#ff8fb1\" opacity=\"0.77\"/><path transform=\"translate(50.7 55.8) scale(0.022) rotate(22 50 45)\" d=\"M50 88 C20 66 0 48 0 26 C0 11 12 0 26 0 C37 0 45 6 50 15 C55 6 63 0 74 0 C88 0 100 11 100 26 C100 48 80 66 50 88Z\" fill=\"#ffc2d4\" opacity=\"0.55\"/><path transform=\"translate(25.8 39.2) scale(0.017) rotate(24 50 45)\" d=\"M50 88 C20 66 0 48 0 26 C0 11 12 0 26 0 C37 0 45 6 50 15 C55 6 63 0 74 0 C88 0 100 11 100 26 C100 48 80 66 50 88Z\" fill=\"#ffffff\" opacity=\"0.49\"/><path transform=\"translate(37.7 76.2) scale(0.014) rotate(-2 50 45)\" d=\"M50 88 C20 66 0 48 0 26 C0 11 12 0 26 0 C37 0 45 6 50 15 C55 6 63 0 74 0 C88 0 100 11 100 26 C100 48 80 66 50 88Z\" fill=\"#e8457a\" opacity=\"0.66\"/><path transform=\"translate(35.3 91.5) scale(0.022) rotate(4 50 45)\" d=\"M50 88 C20 66 0 48 0 26 C0 11 12 0 26 0 C37 0 45 6 50 15 C55 6 63 0 74 0 C88 0 100 11 100 26 C100 48 80 66 50 88Z\" fill=\"#ff8fb1\" opacity=\"0.78\"/><path transform=\"translate(2.1 47.8) scale(0.021) rotate(5 50 45)\" d=\"M50 88 C20 66 0 48 0 26 C0 11 12 0 26 0 C37 0 45 6 50 15 C55 6 63 0 74 0 C88 0 100 11 100 26 C100 48 80 66 50 88Z\" fill=\"#e8457a\" opacity=\"0.49\"/><path transform=\"translate(36.4 40.5) scale(0.017) rotate(-10 50 45)\" d=\"M50 88 C20 66 0 48 0 26 C0 11 12 0 26 0 C37 0 45 6 50 15 C55 6 63 0 74 0 C88 0 100 11 100 26 C100 48 80 66 50 88Z\" fill=\"#e8457a\" opacity=\"0.52\"/><path transform=\"translate(77.2 3.5) scale(0.020) rotate(-9 50 45)\" d=\"M50 88 C20 66 0 48 0 26 C0 11 12 0 26 0 C37 0 45 6 50 15 C55 6 63 0 74 0 C88 0 100 11 100 26 C100 48 80 66 50 88Z\" fill=\"#ffc2d4\" opacity=\"0.45\"/><path transform=\"translate(80.4 30.9) scale(0.015) rotate(7 50 45)\" d=\"M50 88 C20 66 0 48 0 26 C0 11 12 0 26 0 C37 0 45 6 50 15 C55 6 63 0 74 0 C88 0 100 11 100 26 C100 48 80 66 50 88Z\" fill=\"#ffffff\" opacity=\"0.39\"/><path transform=\"translate(60.1 122.8) scale(0.021) rotate(-3 50 45)\" d=\"M50 88 C20 66 0 48 0 26 C0 11 12 0 26 0 C37 0 45 6 50 15 C55 6 63 0 74 0 C88 0 100 11 100 26 C100 48 80 66 50 88Z\" fill=\"#ffc2d4\" opacity=\"0.73\"/><path transform=\"translate(16.9 43.6) scale(0.021) rotate(-11 50 45)\" d=\"M50 88 C20 66 0 48 0 26 C0 11 12 0 26 0 C37 0 45 6 50 15 C55 6 63 0 74 0 C88 0 100 11 100 26 C100 48 80 66 50 88Z\" fill=\"#ffffff\" opacity=\"0.70\"/><path transform=\"translate(3.4 123.9) scale(0.016) rotate(18 50 45)\" d=\"M50 88 C20 66 0 48 0 26 C0 11 12 0 26 0 C37 0 45 6 50 15 C55 6 63 0 74 0 C88 0 100 11 100 26 C100 48 80 66 50 88Z\" fill=\"#ffc2d4\" opacity=\"0.50\"/><path transform=\"translate(82.8 11.1) scale(0.021) rotate(-4 50 45)\" d=\"M50 88 C20 66 0 48 0 26 C0 11 12 0 26 0 C37 0 45 6 50 15 C55 6 63 0 74 0 C88 0 100 11 100 26 C100 48 80 66 50 88Z\" fill=\"#ffc2d4\" opacity=\"0.58\"/><path transform=\"translate(85.0 60.1) scale(0.021) rotate(-4 50 45)\" d=\"M50 88 C20 66 0 48 0 26 C0 11 12 0 26 0 C37 0 45 6 50 15 C55 6 63 0 74 0 C88 0 100 11 100 26 C100 48 80 66 50 88Z\" fill=\"#e8457a\" opacity=\"0.53\"/><path transform=\"translate(92.1 20.2) scale(0.012) rotate(3 50 45)\" d=\"M50 88 C20 66 0 48 0 26 C0 11 12 0 26 0 C37 0 45 6 50 15 C55 6 63 0 74 0 C88 0 100 11 100 26 C100 48 80 66 50 88Z\" fill=\"#ffffff\" opacity=\"0.79\"/><path transform=\"translate(71.7 4.2) scale(0.018) rotate(2 50 45)\" d=\"M50 88 C20 66 0 48 0 26 C0 11 12 0 26 0 C37 0 45 6 50 15 C55 6 63 0 74 0 C88 0 100 11 100 26 C100 48 80 66 50 88Z\" fill=\"#e8457a\" opacity=\"0.75\"/><path transform=\"translate(86.2 111.0) scale(0.026) rotate(16 50 45)\" d=\"M50 88 C20 66 0 48 0 26 C0 11 12 0 26 0 C37 0 45 6 50 15 C55 6 63 0 74 0 C88 0 100 11 100 26 C100 48 80 66 50 88Z\" fill=\"#ff8fb1\" opacity=\"0.37\"/><path transform=\"translate(90.4 89.8) scale(0.025) rotate(4 50 45)\" d=\"M50 88 C20 66 0 48 0 26 C0 11 12 0 26 0 C37 0 45 6 50 15 C55 6 63 0 74 0 C88 0 100 11 100 26 C100 48 80 66 50 88Z\" fill=\"#ffffff\" opacity=\"0.36\"/><path transform=\"translate(74.5 22.2) scale(0.016) rotate(1 50 45)\" d=\"M50 88 C20 66 0 48 0 26 C0 11 12 0 26 0 C37 0 45 6 50 15 C55 6 63 0 74 0 C88 0 100 11 100 26 C100 48 80 66 50 88Z\" fill=\"#ff8fb1\" opacity=\"0.54\"/><path transform=\"translate(93.9 79.2) scale(0.017) rotate(24 50 45)\" d=\"M50 88 C20 66 0 48 0 26 C0 11 12 0 26 0 C37 0 45 6 50 15 C55 6 63 0 74 0 C88 0 100 11 100 26 C100 48 80 66 50 88Z\" fill=\"#e8457a\" opacity=\"0.59\"/><path transform=\"translate(81.2 7.9) scale(0.015) rotate(2 50 45)\" d=\"M50 88 C20 66 0 48 0 26 C0 11 12 0 26 0 C37 0 45 6 50 15 C55 6 63 0 74 0 C88 0 100 11 100 26 C100 48 80 66 50 88Z\" fill=\"#ff8fb1\" opacity=\"0.72\"/><path transform=\"translate(17.1 102.4) scale(0.025) rotate(16 50 45)\" d=\"M50 88 C20 66 0 48 0 26 C0 11 12 0 26 0 C37 0 45 6 50 15 C55 6 63 0 74 0 C88 0 100 11 100 26 C100 48 80 66 50 88Z\" fill=\"#ffc2d4\" opacity=\"0.35\"/><path transform=\"translate(62.9 111.6) scale(0.013) rotate(-13 50 45)\" d=\"M50 88 C20 66 0 48 0 26 C0 11 12 0 26 0 C37 0 45 6 50 15 C55 6 63 0 74 0 C88 0 100 11 100 26 C100 48 80 66 50 88Z\" fill=\"#e8457a\" opacity=\"0.63\"/><path transform=\"translate(52.0 6.6) scale(0.017) rotate(18 50 45)\" d=\"M50 88 C20 66 0 48 0 26 C0 11 12 0 26 0 C37 0 45 6 50 15 C55 6 63 0 74 0 C88 0 100 11 100 26 C100 48 80 66 50 88Z\" fill=\"#ff8fb1\" opacity=\"0.70\"/><path transform=\"translate(4.6 6.4) scale(0.019) rotate(18 50 45)\" d=\"M50 88 C20 66 0 48 0 26 C0 11 12 0 26 0 C37 0 45 6 50 15 C55 6 63 0 74 0 C88 0 100 11 100 26 C100 48 80 66 50 88Z\" fill=\"#ff8fb1\" opacity=\"0.39\"/><path transform=\"translate(50.2 40.9) scale(0.016) rotate(-6 50 45)\" d=\"M50 88 C20 66 0 48 0 26 C0 11 12 0 26 0 C37 0 45 6 50 15 C55 6 63 0 74 0 C88 0 100 11 100 26 C100 48 80 66 50 88Z\" fill=\"#e8457a\" opacity=\"0.53\"/><path transform=\"translate(30.4 34.3) scale(0.026) rotate(-19 50 45)\" d=\"M50 88 C20 66 0 48 0 26 C0 11 12 0 26 0 C37 0 45 6 50 15 C55 6 63 0 74 0 C88 0 100 11 100 26 C100 48 80 66 50 88Z\" fill=\"#ffffff\" opacity=\"0.60\"/><path transform=\"translate(71.6 49.2) scale(0.013) rotate(-23 50 45)\" d=\"M50 88 C20 66 0 48 0 26 C0 11 12 0 26 0 C37 0 45 6 50 15 C55 6 63 0 74 0 C88 0 100 11 100 26 C100 48 80 66 50 88Z\" fill=\"#ffc2d4\" opacity=\"0.56\"/><path transform=\"translate(65.0 70.0) scale(0.021) rotate(6 50 45)\" d=\"M50 88 C20 66 0 48 0 26 C0 11 12 0 26 0 C37 0 45 6 50 15 C55 6 63 0 74 0 C88 0 100 11 100 26 C100 48 80 66 50 88Z\" fill=\"#ff8fb1\" opacity=\"0.54\"/><line x1=\"10\" y1=\"60\" x2=\"92\" y2=\"14\" stroke=\"#b8862f\" stroke-width=\".7\" stroke-linecap=\"round\"/><g transform=\"translate(92 14) rotate(-29.3)\"><path d=\"M0,0 L-4.5,-2.2 L-3.4,0 L-4.5,2.2Z\" fill=\"#c9184a\"/></g><g transform=\"translate(10 60) rotate(-29.3)\"><path d=\"M0,0 l3.5,-2 l1.2,0 l-3,2 l3,2 l-1.2,0z M2.2,0 l3.5,-2 l1.2,0 l-3,2 l3,2 l-1.2,0z\" fill=\"#ff5c8a\"/></g></svg>", "ovPartner": "<svg class=\"fb-ov\" viewBox=\"0 0 100 129.4\" preserveAspectRatio=\"none\" aria-hidden=\"true\"><path transform=\"translate(37.2 64.2) scale(0.022) rotate(23 50 45)\" d=\"M50 88 C20 66 0 48 0 26 C0 11 12 0 26 0 C37 0 45 6 50 15 C55 6 63 0 74 0 C88 0 100 11 100 26 C100 48 80 66 50 88Z\" fill=\"#ffffff\" opacity=\"0.54\"/><path transform=\"translate(1.8 28.3) scale(0.016) rotate(15 50 45)\" d=\"M50 88 C20 66 0 48 0 26 C0 11 12 0 26 0 C37 0 45 6 50 15 C55 6 63 0 74 0 C88 0 100 11 100 26 C100 48 80 66 50 88Z\" fill=\"#ff8fb1\" opacity=\"0.45\"/><path transform=\"translate(13.0 3.6) scale(0.017) rotate(-19 50 45)\" d=\"M50 88 C20 66 0 48 0 26 C0 11 12 0 26 0 C37 0 45 6 50 15 C55 6 63 0 74 0 C88 0 100 11 100 26 C100 48 80 66 50 88Z\" fill=\"#e8457a\" opacity=\"0.66\"/><path transform=\"translate(93.9 94.7) scale(0.024) rotate(8 50 45)\" d=\"M50 88 C20 66 0 48 0 26 C0 11 12 0 26 0 C37 0 45 6 50 15 C55 6 63 0 74 0 C88 0 100 11 100 26 C100 48 80 66 50 88Z\" fill=\"#ffffff\" opacity=\"0.68\"/><path transform=\"translate(56.4 13.3) scale(0.020) rotate(-1 50 45)\" d=\"M50 88 C20 66 0 48 0 26 C0 11 12 0 26 0 C37 0 45 6 50 15 C55 6 63 0 74 0 C88 0 100 11 100 26 C100 48 80 66 50 88Z\" fill=\"#ff8fb1\" opacity=\"0.46\"/><path transform=\"translate(38.9 68.2) scale(0.020) rotate(-16 50 45)\" d=\"M50 88 C20 66 0 48 0 26 C0 11 12 0 26 0 C37 0 45 6 50 15 C55 6 63 0 74 0 C88 0 100 11 100 26 C100 48 80 66 50 88Z\" fill=\"#ffffff\" opacity=\"0.36\"/><path transform=\"translate(84.2 15.7) scale(0.024) rotate(17 50 45)\" d=\"M50 88 C20 66 0 48 0 26 C0 11 12 0 26 0 C37 0 45 6 50 15 C55 6 63 0 74 0 C88 0 100 11 100 26 C100 48 80 66 50 88Z\" fill=\"#ffffff\" opacity=\"0.78\"/><path transform=\"translate(57.9 103.4) scale(0.013) rotate(-20 50 45)\" d=\"M50 88 C20 66 0 48 0 26 C0 11 12 0 26 0 C37 0 45 6 50 15 C55 6 63 0 74 0 C88 0 100 11 100 26 C100 48 80 66 50 88Z\" fill=\"#ffc2d4\" opacity=\"0.69\"/><path transform=\"translate(93.5 7.9) scale(0.017) rotate(16 50 45)\" d=\"M50 88 C20 66 0 48 0 26 C0 11 12 0 26 0 C37 0 45 6 50 15 C55 6 63 0 74 0 C88 0 100 11 100 26 C100 48 80 66 50 88Z\" fill=\"#ffc2d4\" opacity=\"0.46\"/><path transform=\"translate(18.0 32.3) scale(0.021) rotate(-12 50 45)\" d=\"M50 88 C20 66 0 48 0 26 C0 11 12 0 26 0 C37 0 45 6 50 15 C55 6 63 0 74 0 C88 0 100 11 100 26 C100 48 80 66 50 88Z\" fill=\"#ffffff\" opacity=\"0.62\"/><path transform=\"translate(93.9 72.0) scale(0.026) rotate(0 50 45)\" d=\"M50 88 C20 66 0 48 0 26 C0 11 12 0 26 0 C37 0 45 6 50 15 C55 6 63 0 74 0 C88 0 100 11 100 26 C100 48 80 66 50 88Z\" fill=\"#ffffff\" opacity=\"0.79\"/><path transform=\"translate(41.3 96.7) scale(0.014) rotate(-17 50 45)\" d=\"M50 88 C20 66 0 48 0 26 C0 11 12 0 26 0 C37 0 45 6 50 15 C55 6 63 0 74 0 C88 0 100 11 100 26 C100 48 80 66 50 88Z\" fill=\"#ffffff\" opacity=\"0.53\"/><path transform=\"translate(88.8 21.0) scale(0.019) rotate(21 50 45)\" d=\"M50 88 C20 66 0 48 0 26 C0 11 12 0 26 0 C37 0 45 6 50 15 C55 6 63 0 74 0 C88 0 100 11 100 26 C100 48 80 66 50 88Z\" fill=\"#ffffff\" opacity=\"0.58\"/><path transform=\"translate(44.3 93.0) scale(0.015) rotate(13 50 45)\" d=\"M50 88 C20 66 0 48 0 26 C0 11 12 0 26 0 C37 0 45 6 50 15 C55 6 63 0 74 0 C88 0 100 11 100 26 C100 48 80 66 50 88Z\" fill=\"#e8457a\" opacity=\"0.42\"/><path transform=\"translate(51.6 121.0) scale(0.024) rotate(9 50 45)\" d=\"M50 88 C20 66 0 48 0 26 C0 11 12 0 26 0 C37 0 45 6 50 15 C55 6 63 0 74 0 C88 0 100 11 100 26 C100 48 80 66 50 88Z\" fill=\"#e8457a\" opacity=\"0.73\"/><path transform=\"translate(59.5 75.6) scale(0.026) rotate(-10 50 45)\" d=\"M50 88 C20 66 0 48 0 26 C0 11 12 0 26 0 C37 0 45 6 50 15 C55 6 63 0 74 0 C88 0 100 11 100 26 C100 48 80 66 50 88Z\" fill=\"#ffc2d4\" opacity=\"0.47\"/><path transform=\"translate(80.4 26.0) scale(0.020) rotate(-9 50 45)\" d=\"M50 88 C20 66 0 48 0 26 C0 11 12 0 26 0 C37 0 45 6 50 15 C55 6 63 0 74 0 C88 0 100 11 100 26 C100 48 80 66 50 88Z\" fill=\"#ffc2d4\" opacity=\"0.70\"/><path transform=\"translate(14.4 128.3) scale(0.019) rotate(-2 50 45)\" d=\"M50 88 C20 66 0 48 0 26 C0 11 12 0 26 0 C37 0 45 6 50 15 C55 6 63 0 74 0 C88 0 100 11 100 26 C100 48 80 66 50 88Z\" fill=\"#ffc2d4\" opacity=\"0.73\"/><path transform=\"translate(82.2 72.1) scale(0.019) rotate(18 50 45)\" d=\"M50 88 C20 66 0 48 0 26 C0 11 12 0 26 0 C37 0 45 6 50 15 C55 6 63 0 74 0 C88 0 100 11 100 26 C100 48 80 66 50 88Z\" fill=\"#ff8fb1\" opacity=\"0.53\"/><path transform=\"translate(73.4 124.3) scale(0.019) rotate(20 50 45)\" d=\"M50 88 C20 66 0 48 0 26 C0 11 12 0 26 0 C37 0 45 6 50 15 C55 6 63 0 74 0 C88 0 100 11 100 26 C100 48 80 66 50 88Z\" fill=\"#ffc2d4\" opacity=\"0.64\"/><path transform=\"translate(77.7 9.0) scale(0.015) rotate(-13 50 45)\" d=\"M50 88 C20 66 0 48 0 26 C0 11 12 0 26 0 C37 0 45 6 50 15 C55 6 63 0 74 0 C88 0 100 11 100 26 C100 48 80 66 50 88Z\" fill=\"#e8457a\" opacity=\"0.44\"/><path transform=\"translate(25.9 24.2) scale(0.022) rotate(20 50 45)\" d=\"M50 88 C20 66 0 48 0 26 C0 11 12 0 26 0 C37 0 45 6 50 15 C55 6 63 0 74 0 C88 0 100 11 100 26 C100 48 80 66 50 88Z\" fill=\"#ff8fb1\" opacity=\"0.46\"/><path transform=\"translate(86.5 40.6) scale(0.018) rotate(-19 50 45)\" d=\"M50 88 C20 66 0 48 0 26 C0 11 12 0 26 0 C37 0 45 6 50 15 C55 6 63 0 74 0 C88 0 100 11 100 26 C100 48 80 66 50 88Z\" fill=\"#ff8fb1\" opacity=\"0.47\"/><path transform=\"translate(91.4 4.7) scale(0.018) rotate(-25 50 45)\" d=\"M50 88 C20 66 0 48 0 26 C0 11 12 0 26 0 C37 0 45 6 50 15 C55 6 63 0 74 0 C88 0 100 11 100 26 C100 48 80 66 50 88Z\" fill=\"#e8457a\" opacity=\"0.50\"/><path transform=\"translate(43.6 62.9) scale(0.015) rotate(-5 50 45)\" d=\"M50 88 C20 66 0 48 0 26 C0 11 12 0 26 0 C37 0 45 6 50 15 C55 6 63 0 74 0 C88 0 100 11 100 26 C100 48 80 66 50 88Z\" fill=\"#ffffff\" opacity=\"0.59\"/><path transform=\"translate(11.9 35.6) scale(0.021) rotate(-3 50 45)\" d=\"M50 88 C20 66 0 48 0 26 C0 11 12 0 26 0 C37 0 45 6 50 15 C55 6 63 0 74 0 C88 0 100 11 100 26 C100 48 80 66 50 88Z\" fill=\"#ff8fb1\" opacity=\"0.59\"/><path transform=\"translate(25.1 68.3) scale(0.022) rotate(13 50 45)\" d=\"M50 88 C20 66 0 48 0 26 C0 11 12 0 26 0 C37 0 45 6 50 15 C55 6 63 0 74 0 C88 0 100 11 100 26 C100 48 80 66 50 88Z\" fill=\"#e8457a\" opacity=\"0.48\"/><path transform=\"translate(67.6 84.6) scale(0.023) rotate(-20 50 45)\" d=\"M50 88 C20 66 0 48 0 26 C0 11 12 0 26 0 C37 0 45 6 50 15 C55 6 63 0 74 0 C88 0 100 11 100 26 C100 48 80 66 50 88Z\" fill=\"#e8457a\" opacity=\"0.78\"/><path transform=\"translate(33.9 73.2) scale(0.019) rotate(0 50 45)\" d=\"M50 88 C20 66 0 48 0 26 C0 11 12 0 26 0 C37 0 45 6 50 15 C55 6 63 0 74 0 C88 0 100 11 100 26 C100 48 80 66 50 88Z\" fill=\"#ffffff\" opacity=\"0.38\"/><path transform=\"translate(29.4 94.2) scale(0.022) rotate(-16 50 45)\" d=\"M50 88 C20 66 0 48 0 26 C0 11 12 0 26 0 C37 0 45 6 50 15 C55 6 63 0 74 0 C88 0 100 11 100 26 C100 48 80 66 50 88Z\" fill=\"#ffc2d4\" opacity=\"0.75\"/><path transform=\"translate(65.5 15.9) scale(0.025) rotate(21 50 45)\" d=\"M50 88 C20 66 0 48 0 26 C0 11 12 0 26 0 C37 0 45 6 50 15 C55 6 63 0 74 0 C88 0 100 11 100 26 C100 48 80 66 50 88Z\" fill=\"#ffc2d4\" opacity=\"0.64\"/><path transform=\"translate(65.0 54.4) scale(0.016) rotate(-2 50 45)\" d=\"M50 88 C20 66 0 48 0 26 C0 11 12 0 26 0 C37 0 45 6 50 15 C55 6 63 0 74 0 C88 0 100 11 100 26 C100 48 80 66 50 88Z\" fill=\"#ffc2d4\" opacity=\"0.49\"/><path transform=\"translate(17.6 8.9) scale(0.022) rotate(-7 50 45)\" d=\"M50 88 C20 66 0 48 0 26 C0 11 12 0 26 0 C37 0 45 6 50 15 C55 6 63 0 74 0 C88 0 100 11 100 26 C100 48 80 66 50 88Z\" fill=\"#ffffff\" opacity=\"0.47\"/><path transform=\"translate(38.3 112.9) scale(0.013) rotate(-13 50 45)\" d=\"M50 88 C20 66 0 48 0 26 C0 11 12 0 26 0 C37 0 45 6 50 15 C55 6 63 0 74 0 C88 0 100 11 100 26 C100 48 80 66 50 88Z\" fill=\"#e8457a\" opacity=\"0.70\"/><path transform=\"translate(35.4 43.1) scale(0.018) rotate(-7 50 45)\" d=\"M50 88 C20 66 0 48 0 26 C0 11 12 0 26 0 C37 0 45 6 50 15 C55 6 63 0 74 0 C88 0 100 11 100 26 C100 48 80 66 50 88Z\" fill=\"#ff8fb1\" opacity=\"0.73\"/><path transform=\"translate(11.2 35.0) scale(0.013) rotate(3 50 45)\" d=\"M50 88 C20 66 0 48 0 26 C0 11 12 0 26 0 C37 0 45 6 50 15 C55 6 63 0 74 0 C88 0 100 11 100 26 C100 48 80 66 50 88Z\" fill=\"#ff8fb1\" opacity=\"0.76\"/><path transform=\"translate(11.2 90.3) scale(0.020) rotate(16 50 45)\" d=\"M50 88 C20 66 0 48 0 26 C0 11 12 0 26 0 C37 0 45 6 50 15 C55 6 63 0 74 0 C88 0 100 11 100 26 C100 48 80 66 50 88Z\" fill=\"#ffffff\" opacity=\"0.69\"/><path transform=\"translate(59.2 19.0) scale(0.018) rotate(2 50 45)\" d=\"M50 88 C20 66 0 48 0 26 C0 11 12 0 26 0 C37 0 45 6 50 15 C55 6 63 0 74 0 C88 0 100 11 100 26 C100 48 80 66 50 88Z\" fill=\"#ffc2d4\" opacity=\"0.43\"/><path transform=\"translate(17.9 112.4) scale(0.017) rotate(-23 50 45)\" d=\"M50 88 C20 66 0 48 0 26 C0 11 12 0 26 0 C37 0 45 6 50 15 C55 6 63 0 74 0 C88 0 100 11 100 26 C100 48 80 66 50 88Z\" fill=\"#e8457a\" opacity=\"0.71\"/><path transform=\"translate(89.1 122.8) scale(0.017) rotate(7 50 45)\" d=\"M50 88 C20 66 0 48 0 26 C0 11 12 0 26 0 C37 0 45 6 50 15 C55 6 63 0 74 0 C88 0 100 11 100 26 C100 48 80 66 50 88Z\" fill=\"#e8457a\" opacity=\"0.79\"/><path transform=\"translate(68.7 38.7) scale(0.024) rotate(-23 50 45)\" d=\"M50 88 C20 66 0 48 0 26 C0 11 12 0 26 0 C37 0 45 6 50 15 C55 6 63 0 74 0 C88 0 100 11 100 26 C100 48 80 66 50 88Z\" fill=\"#ffffff\" opacity=\"0.44\"/><path transform=\"translate(63.4 13.9) scale(0.023) rotate(-0 50 45)\" d=\"M50 88 C20 66 0 48 0 26 C0 11 12 0 26 0 C37 0 45 6 50 15 C55 6 63 0 74 0 C88 0 100 11 100 26 C100 48 80 66 50 88Z\" fill=\"#ffc2d4\" opacity=\"0.59\"/><path transform=\"translate(46.1 25.0) scale(0.019) rotate(16 50 45)\" d=\"M50 88 C20 66 0 48 0 26 C0 11 12 0 26 0 C37 0 45 6 50 15 C55 6 63 0 74 0 C88 0 100 11 100 26 C100 48 80 66 50 88Z\" fill=\"#ff8fb1\" opacity=\"0.77\"/><path transform=\"translate(94.7 14.4) scale(0.016) rotate(-18 50 45)\" d=\"M50 88 C20 66 0 48 0 26 C0 11 12 0 26 0 C37 0 45 6 50 15 C55 6 63 0 74 0 C88 0 100 11 100 26 C100 48 80 66 50 88Z\" fill=\"#ffc2d4\" opacity=\"0.71\"/><path transform=\"translate(62.3 6.5) scale(0.017) rotate(0 50 45)\" d=\"M50 88 C20 66 0 48 0 26 C0 11 12 0 26 0 C37 0 45 6 50 15 C55 6 63 0 74 0 C88 0 100 11 100 26 C100 48 80 66 50 88Z\" fill=\"#ffc2d4\" opacity=\"0.57\"/><path transform=\"translate(1.9 43.9) scale(0.017) rotate(10 50 45)\" d=\"M50 88 C20 66 0 48 0 26 C0 11 12 0 26 0 C37 0 45 6 50 15 C55 6 63 0 74 0 C88 0 100 11 100 26 C100 48 80 66 50 88Z\" fill=\"#e8457a\" opacity=\"0.41\"/><line x1=\"8\" y1=\"58\" x2=\"94\" y2=\"14\" stroke=\"#b8862f\" stroke-width=\".7\" stroke-linecap=\"round\"/><g transform=\"translate(94 14) rotate(-27.1)\"><path d=\"M0,0 L-4.5,-2.2 L-3.4,0 L-4.5,2.2Z\" fill=\"#c9184a\"/></g><g transform=\"translate(8 58) rotate(-27.1)\"><path d=\"M0,0 l3.5,-2 l1.2,0 l-3,2 l3,2 l-1.2,0z M2.2,0 l3.5,-2 l1.2,0 l-3,2 l3,2 l-1.2,0z\" fill=\"#ff5c8a\"/></g></svg>", "heartPink": "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20viewBox%3D%22-3%20-3%20106%2096%22%3E%3Cpath%20d%3D%22M50%2088%20C20%2066%200%2048%200%2026%20C0%2011%2012%200%2026%200%20C37%200%2045%206%2050%2015%20C55%206%2063%200%2074%200%20C88%200%20100%2011%20100%2026%20C100%2048%2080%2066%2050%2088Z%22%20fill%3D%22%23e8457a%22%20stroke%3D%22none%22%20stroke-width%3D%223%22/%3E%3C/svg%3E", "candy": ["data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20viewBox%3D%22-3%20-3%20106%2096%22%3E%3Cpath%20d%3D%22M50%2088%20C20%2066%200%2048%200%2026%20C0%2011%2012%200%2026%200%20C37%200%2045%206%2050%2015%20C55%206%2063%200%2074%200%20C88%200%20100%2011%20100%2026%20C100%2048%2080%2066%2050%2088Z%22%20fill%3D%22%23bff0d9%22%20stroke%3D%22none%22%20stroke-width%3D%223%22/%3E%3C/svg%3E", "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20viewBox%3D%22-3%20-3%20106%2096%22%3E%3Cpath%20d%3D%22M50%2088%20C20%2066%200%2048%200%2026%20C0%2011%2012%200%2026%200%20C37%200%2045%206%2050%2015%20C55%206%2063%200%2074%200%20C88%200%20100%2011%20100%2026%20C100%2048%2080%2066%2050%2088Z%22%20fill%3D%22%23e3d4ff%22%20stroke%3D%22none%22%20stroke-width%3D%223%22/%3E%3C/svg%3E", "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20viewBox%3D%22-3%20-3%20106%2096%22%3E%3Cpath%20d%3D%22M50%2088%20C20%2066%200%2048%200%2026%20C0%2011%2012%200%2026%200%20C37%200%2045%206%2050%2015%20C55%206%2063%200%2074%200%20C88%200%20100%2011%20100%2026%20C100%2048%2080%2066%2050%2088Z%22%20fill%3D%22%23fff1a8%22%20stroke%3D%22none%22%20stroke-width%3D%223%22/%3E%3C/svg%3E", "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20viewBox%3D%22-3%20-3%20106%2096%22%3E%3Cpath%20d%3D%22M50%2088%20C20%2066%200%2048%200%2026%20C0%2011%2012%200%2026%200%20C37%200%2045%206%2050%2015%20C55%206%2063%200%2074%200%20C88%200%20100%2011%20100%2026%20C100%2048%2080%2066%2050%2088Z%22%20fill%3D%22%23ffd0dc%22%20stroke%3D%22none%22%20stroke-width%3D%223%22/%3E%3C/svg%3E", "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20viewBox%3D%22-3%20-3%20106%2096%22%3E%3Cpath%20d%3D%22M50%2088%20C20%2066%200%2048%200%2026%20C0%2011%2012%200%2026%200%20C37%200%2045%206%2050%2015%20C55%206%2063%200%2074%200%20C88%200%20100%2011%20100%2026%20C100%2048%2080%2066%2050%2088Z%22%20fill%3D%22%23ffe0c2%22%20stroke%3D%22none%22%20stroke-width%3D%223%22/%3E%3C/svg%3E", "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20viewBox%3D%22-3%20-3%20106%2096%22%3E%3Cpath%20d%3D%22M50%2088%20C20%2066%200%2048%200%2026%20C0%2011%2012%200%2026%200%20C37%200%2045%206%2050%2015%20C55%206%2063%200%2074%200%20C88%200%20100%2011%20100%2026%20C100%2048%2080%2066%2050%2088Z%22%20fill%3D%22%23cdeeff%22%20stroke%3D%22none%22%20stroke-width%3D%223%22/%3E%3C/svg%3E", "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20viewBox%3D%22-3%20-3%20106%2096%22%3E%3Cpath%20d%3D%22M50%2088%20C20%2066%200%2048%200%2026%20C0%2011%2012%200%2026%200%20C37%200%2045%206%2050%2015%20C55%206%2063%200%2074%200%20C88%200%20100%2011%20100%2026%20C100%2048%2080%2066%2050%2088Z%22%20fill%3D%22%23ffc7e6%22%20stroke%3D%22none%22%20stroke-width%3D%223%22/%3E%3C/svg%3E"], "ovHstSq": "<svg class=\"fb-ov\" viewBox=\"0 0 100 100\" preserveAspectRatio=\"none\" aria-hidden=\"true\"><path transform=\"translate(23.8 54.4) scale(0.017) rotate(6 50 45)\" d=\"M50 88 C20 66 0 48 0 26 C0 11 12 0 26 0 C37 0 45 6 50 15 C55 6 63 0 74 0 C88 0 100 11 100 26 C100 48 80 66 50 88Z\" fill=\"#ffffff\" opacity=\"0.38\"/><path transform=\"translate(1.3 83.7) scale(0.016) rotate(-15 50 45)\" d=\"M50 88 C20 66 0 48 0 26 C0 11 12 0 26 0 C37 0 45 6 50 15 C55 6 63 0 74 0 C88 0 100 11 100 26 C100 48 80 66 50 88Z\" fill=\"#ffc2d4\" opacity=\"0.67\"/><path transform=\"translate(54.1 55.0) scale(0.018) rotate(-13 50 45)\" d=\"M50 88 C20 66 0 48 0 26 C0 11 12 0 26 0 C37 0 45 6 50 15 C55 6 63 0 74 0 C88 0 100 11 100 26 C100 48 80 66 50 88Z\" fill=\"#ffc2d4\" opacity=\"0.42\"/><path transform=\"translate(92.6 39.0) scale(0.012) rotate(-17 50 45)\" d=\"M50 88 C20 66 0 48 0 26 C0 11 12 0 26 0 C37 0 45 6 50 15 C55 6 63 0 74 0 C88 0 100 11 100 26 C100 48 80 66 50 88Z\" fill=\"#ff8fb1\" opacity=\"0.78\"/><path transform=\"translate(4.3 78.0) scale(0.024) rotate(-1 50 45)\" d=\"M50 88 C20 66 0 48 0 26 C0 11 12 0 26 0 C37 0 45 6 50 15 C55 6 63 0 74 0 C88 0 100 11 100 26 C100 48 80 66 50 88Z\" fill=\"#e8457a\" opacity=\"0.67\"/><path transform=\"translate(87.9 71.4) scale(0.025) rotate(11 50 45)\" d=\"M50 88 C20 66 0 48 0 26 C0 11 12 0 26 0 C37 0 45 6 50 15 C55 6 63 0 74 0 C88 0 100 11 100 26 C100 48 80 66 50 88Z\" fill=\"#ffffff\" opacity=\"0.61\"/><path transform=\"translate(96.4 13.4) scale(0.017) rotate(-18 50 45)\" d=\"M50 88 C20 66 0 48 0 26 C0 11 12 0 26 0 C37 0 45 6 50 15 C55 6 63 0 74 0 C88 0 100 11 100 26 C100 48 80 66 50 88Z\" fill=\"#ff8fb1\" opacity=\"0.45\"/><path transform=\"translate(96.5 43.6) scale(0.021) rotate(-4 50 45)\" d=\"M50 88 C20 66 0 48 0 26 C0 11 12 0 26 0 C37 0 45 6 50 15 C55 6 63 0 74 0 C88 0 100 11 100 26 C100 48 80 66 50 88Z\" fill=\"#e8457a\" opacity=\"0.73\"/><path transform=\"translate(57.4 53.4) scale(0.018) rotate(20 50 45)\" d=\"M50 88 C20 66 0 48 0 26 C0 11 12 0 26 0 C37 0 45 6 50 15 C55 6 63 0 74 0 C88 0 100 11 100 26 C100 48 80 66 50 88Z\" fill=\"#ffc2d4\" opacity=\"0.66\"/><path transform=\"translate(92.9 85.6) scale(0.026) rotate(10 50 45)\" d=\"M50 88 C20 66 0 48 0 26 C0 11 12 0 26 0 C37 0 45 6 50 15 C55 6 63 0 74 0 C88 0 100 11 100 26 C100 48 80 66 50 88Z\" fill=\"#ffc2d4\" opacity=\"0.50\"/><path transform=\"translate(54.2 57.2) scale(0.013) rotate(7 50 45)\" d=\"M50 88 C20 66 0 48 0 26 C0 11 12 0 26 0 C37 0 45 6 50 15 C55 6 63 0 74 0 C88 0 100 11 100 26 C100 48 80 66 50 88Z\" fill=\"#ffc2d4\" opacity=\"0.79\"/><path transform=\"translate(26.7 12.4) scale(0.019) rotate(-21 50 45)\" d=\"M50 88 C20 66 0 48 0 26 C0 11 12 0 26 0 C37 0 45 6 50 15 C55 6 63 0 74 0 C88 0 100 11 100 26 C100 48 80 66 50 88Z\" fill=\"#ffffff\" opacity=\"0.71\"/><path transform=\"translate(41.0 15.1) scale(0.016) rotate(19 50 45)\" d=\"M50 88 C20 66 0 48 0 26 C0 11 12 0 26 0 C37 0 45 6 50 15 C55 6 63 0 74 0 C88 0 100 11 100 26 C100 48 80 66 50 88Z\" fill=\"#ffffff\" opacity=\"0.37\"/><path transform=\"translate(61.5 4.5) scale(0.022) rotate(3 50 45)\" d=\"M50 88 C20 66 0 48 0 26 C0 11 12 0 26 0 C37 0 45 6 50 15 C55 6 63 0 74 0 C88 0 100 11 100 26 C100 48 80 66 50 88Z\" fill=\"#e8457a\" opacity=\"0.76\"/><path transform=\"translate(27.9 23.6) scale(0.013) rotate(-21 50 45)\" d=\"M50 88 C20 66 0 48 0 26 C0 11 12 0 26 0 C37 0 45 6 50 15 C55 6 63 0 74 0 C88 0 100 11 100 26 C100 48 80 66 50 88Z\" fill=\"#ff8fb1\" opacity=\"0.62\"/><path transform=\"translate(3.1 19.7) scale(0.018) rotate(-17 50 45)\" d=\"M50 88 C20 66 0 48 0 26 C0 11 12 0 26 0 C37 0 45 6 50 15 C55 6 63 0 74 0 C88 0 100 11 100 26 C100 48 80 66 50 88Z\" fill=\"#e8457a\" opacity=\"0.37\"/><path transform=\"translate(86.8 31.4) scale(0.025) rotate(-6 50 45)\" d=\"M50 88 C20 66 0 48 0 26 C0 11 12 0 26 0 C37 0 45 6 50 15 C55 6 63 0 74 0 C88 0 100 11 100 26 C100 48 80 66 50 88Z\" fill=\"#ffffff\" opacity=\"0.74\"/><path transform=\"translate(38.6 86.7) scale(0.022) rotate(6 50 45)\" d=\"M50 88 C20 66 0 48 0 26 C0 11 12 0 26 0 C37 0 45 6 50 15 C55 6 63 0 74 0 C88 0 100 11 100 26 C100 48 80 66 50 88Z\" fill=\"#ff8fb1\" opacity=\"0.77\"/><path transform=\"translate(50.7 43.1) scale(0.022) rotate(22 50 45)\" d=\"M50 88 C20 66 0 48 0 26 C0 11 12 0 26 0 C37 0 45 6 50 15 C55 6 63 0 74 0 C88 0 100 11 100 26 C100 48 80 66 50 88Z\" fill=\"#ffc2d4\" opacity=\"0.55\"/><path transform=\"translate(25.8 30.3) scale(0.017) rotate(24 50 45)\" d=\"M50 88 C20 66 0 48 0 26 C0 11 12 0 26 0 C37 0 45 6 50 15 C55 6 63 0 74 0 C88 0 100 11 100 26 C100 48 80 66 50 88Z\" fill=\"#ffffff\" opacity=\"0.49\"/><path transform=\"translate(37.7 58.9) scale(0.014) rotate(-2 50 45)\" d=\"M50 88 C20 66 0 48 0 26 C0 11 12 0 26 0 C37 0 45 6 50 15 C55 6 63 0 74 0 C88 0 100 11 100 26 C100 48 80 66 50 88Z\" fill=\"#e8457a\" opacity=\"0.66\"/><path transform=\"translate(35.3 70.7) scale(0.022) rotate(4 50 45)\" d=\"M50 88 C20 66 0 48 0 26 C0 11 12 0 26 0 C37 0 45 6 50 15 C55 6 63 0 74 0 C88 0 100 11 100 26 C100 48 80 66 50 88Z\" fill=\"#ff8fb1\" opacity=\"0.78\"/><path transform=\"translate(2.1 36.9) scale(0.021) rotate(5 50 45)\" d=\"M50 88 C20 66 0 48 0 26 C0 11 12 0 26 0 C37 0 45 6 50 15 C55 6 63 0 74 0 C88 0 100 11 100 26 C100 48 80 66 50 88Z\" fill=\"#e8457a\" opacity=\"0.49\"/><path transform=\"translate(36.4 31.3) scale(0.017) rotate(-10 50 45)\" d=\"M50 88 C20 66 0 48 0 26 C0 11 12 0 26 0 C37 0 45 6 50 15 C55 6 63 0 74 0 C88 0 100 11 100 26 C100 48 80 66 50 88Z\" fill=\"#e8457a\" opacity=\"0.52\"/><path transform=\"translate(77.2 2.7) scale(0.020) rotate(-9 50 45)\" d=\"M50 88 C20 66 0 48 0 26 C0 11 12 0 26 0 C37 0 45 6 50 15 C55 6 63 0 74 0 C88 0 100 11 100 26 C100 48 80 66 50 88Z\" fill=\"#ffc2d4\" opacity=\"0.45\"/><path transform=\"translate(80.4 23.9) scale(0.015) rotate(7 50 45)\" d=\"M50 88 C20 66 0 48 0 26 C0 11 12 0 26 0 C37 0 45 6 50 15 C55 6 63 0 74 0 C88 0 100 11 100 26 C100 48 80 66 50 88Z\" fill=\"#ffffff\" opacity=\"0.39\"/><path transform=\"translate(60.1 94.9) scale(0.021) rotate(-3 50 45)\" d=\"M50 88 C20 66 0 48 0 26 C0 11 12 0 26 0 C37 0 45 6 50 15 C55 6 63 0 74 0 C88 0 100 11 100 26 C100 48 80 66 50 88Z\" fill=\"#ffc2d4\" opacity=\"0.73\"/><path transform=\"translate(16.9 33.7) scale(0.021) rotate(-11 50 45)\" d=\"M50 88 C20 66 0 48 0 26 C0 11 12 0 26 0 C37 0 45 6 50 15 C55 6 63 0 74 0 C88 0 100 11 100 26 C100 48 80 66 50 88Z\" fill=\"#ffffff\" opacity=\"0.70\"/><path transform=\"translate(3.4 95.8) scale(0.016) rotate(18 50 45)\" d=\"M50 88 C20 66 0 48 0 26 C0 11 12 0 26 0 C37 0 45 6 50 15 C55 6 63 0 74 0 C88 0 100 11 100 26 C100 48 80 66 50 88Z\" fill=\"#ffc2d4\" opacity=\"0.50\"/><path transform=\"translate(82.8 8.6) scale(0.021) rotate(-4 50 45)\" d=\"M50 88 C20 66 0 48 0 26 C0 11 12 0 26 0 C37 0 45 6 50 15 C55 6 63 0 74 0 C88 0 100 11 100 26 C100 48 80 66 50 88Z\" fill=\"#ffc2d4\" opacity=\"0.58\"/><path transform=\"translate(85.0 46.5) scale(0.021) rotate(-4 50 45)\" d=\"M50 88 C20 66 0 48 0 26 C0 11 12 0 26 0 C37 0 45 6 50 15 C55 6 63 0 74 0 C88 0 100 11 100 26 C100 48 80 66 50 88Z\" fill=\"#e8457a\" opacity=\"0.53\"/><path transform=\"translate(92.1 15.6) scale(0.012) rotate(3 50 45)\" d=\"M50 88 C20 66 0 48 0 26 C0 11 12 0 26 0 C37 0 45 6 50 15 C55 6 63 0 74 0 C88 0 100 11 100 26 C100 48 80 66 50 88Z\" fill=\"#ffffff\" opacity=\"0.79\"/><path transform=\"translate(71.7 3.2) scale(0.018) rotate(2 50 45)\" d=\"M50 88 C20 66 0 48 0 26 C0 11 12 0 26 0 C37 0 45 6 50 15 C55 6 63 0 74 0 C88 0 100 11 100 26 C100 48 80 66 50 88Z\" fill=\"#e8457a\" opacity=\"0.75\"/><path transform=\"translate(86.2 85.8) scale(0.026) rotate(16 50 45)\" d=\"M50 88 C20 66 0 48 0 26 C0 11 12 0 26 0 C37 0 45 6 50 15 C55 6 63 0 74 0 C88 0 100 11 100 26 C100 48 80 66 50 88Z\" fill=\"#ff8fb1\" opacity=\"0.37\"/><path transform=\"translate(90.4 69.4) scale(0.025) rotate(4 50 45)\" d=\"M50 88 C20 66 0 48 0 26 C0 11 12 0 26 0 C37 0 45 6 50 15 C55 6 63 0 74 0 C88 0 100 11 100 26 C100 48 80 66 50 88Z\" fill=\"#ffffff\" opacity=\"0.36\"/><path transform=\"translate(74.5 17.2) scale(0.016) rotate(1 50 45)\" d=\"M50 88 C20 66 0 48 0 26 C0 11 12 0 26 0 C37 0 45 6 50 15 C55 6 63 0 74 0 C88 0 100 11 100 26 C100 48 80 66 50 88Z\" fill=\"#ff8fb1\" opacity=\"0.54\"/><path transform=\"translate(93.9 61.2) scale(0.017) rotate(24 50 45)\" d=\"M50 88 C20 66 0 48 0 26 C0 11 12 0 26 0 C37 0 45 6 50 15 C55 6 63 0 74 0 C88 0 100 11 100 26 C100 48 80 66 50 88Z\" fill=\"#e8457a\" opacity=\"0.59\"/><path transform=\"translate(81.2 6.1) scale(0.015) rotate(2 50 45)\" d=\"M50 88 C20 66 0 48 0 26 C0 11 12 0 26 0 C37 0 45 6 50 15 C55 6 63 0 74 0 C88 0 100 11 100 26 C100 48 80 66 50 88Z\" fill=\"#ff8fb1\" opacity=\"0.72\"/><path transform=\"translate(17.1 79.2) scale(0.025) rotate(16 50 45)\" d=\"M50 88 C20 66 0 48 0 26 C0 11 12 0 26 0 C37 0 45 6 50 15 C55 6 63 0 74 0 C88 0 100 11 100 26 C100 48 80 66 50 88Z\" fill=\"#ffc2d4\" opacity=\"0.35\"/><path transform=\"translate(62.9 86.3) scale(0.013) rotate(-13 50 45)\" d=\"M50 88 C20 66 0 48 0 26 C0 11 12 0 26 0 C37 0 45 6 50 15 C55 6 63 0 74 0 C88 0 100 11 100 26 C100 48 80 66 50 88Z\" fill=\"#e8457a\" opacity=\"0.63\"/><path transform=\"translate(52.0 5.1) scale(0.017) rotate(18 50 45)\" d=\"M50 88 C20 66 0 48 0 26 C0 11 12 0 26 0 C37 0 45 6 50 15 C55 6 63 0 74 0 C88 0 100 11 100 26 C100 48 80 66 50 88Z\" fill=\"#ff8fb1\" opacity=\"0.70\"/><path transform=\"translate(4.6 5.0) scale(0.019) rotate(18 50 45)\" d=\"M50 88 C20 66 0 48 0 26 C0 11 12 0 26 0 C37 0 45 6 50 15 C55 6 63 0 74 0 C88 0 100 11 100 26 C100 48 80 66 50 88Z\" fill=\"#ff8fb1\" opacity=\"0.39\"/><path transform=\"translate(50.2 31.6) scale(0.016) rotate(-6 50 45)\" d=\"M50 88 C20 66 0 48 0 26 C0 11 12 0 26 0 C37 0 45 6 50 15 C55 6 63 0 74 0 C88 0 100 11 100 26 C100 48 80 66 50 88Z\" fill=\"#e8457a\" opacity=\"0.53\"/><path transform=\"translate(30.4 26.5) scale(0.026) rotate(-19 50 45)\" d=\"M50 88 C20 66 0 48 0 26 C0 11 12 0 26 0 C37 0 45 6 50 15 C55 6 63 0 74 0 C88 0 100 11 100 26 C100 48 80 66 50 88Z\" fill=\"#ffffff\" opacity=\"0.60\"/><path transform=\"translate(71.6 38.0) scale(0.013) rotate(-23 50 45)\" d=\"M50 88 C20 66 0 48 0 26 C0 11 12 0 26 0 C37 0 45 6 50 15 C55 6 63 0 74 0 C88 0 100 11 100 26 C100 48 80 66 50 88Z\" fill=\"#ffc2d4\" opacity=\"0.56\"/><path transform=\"translate(65.0 54.1) scale(0.021) rotate(6 50 45)\" d=\"M50 88 C20 66 0 48 0 26 C0 11 12 0 26 0 C37 0 45 6 50 15 C55 6 63 0 74 0 C88 0 100 11 100 26 C100 48 80 66 50 88Z\" fill=\"#ff8fb1\" opacity=\"0.54\"/><line x1=\"6\" y1=\"62\" x2=\"60\" y2=\"18\" stroke=\"#b8862f\" stroke-width=\".7\" stroke-linecap=\"round\"/><g transform=\"translate(60 18) rotate(-39.2)\"><path d=\"M0,0 L-4.5,-2.2 L-3.4,0 L-4.5,2.2Z\" fill=\"#c9184a\"/></g><g transform=\"translate(6 62) rotate(-39.2)\"><path d=\"M0,0 l3.5,-2 l1.2,0 l-3,2 l3,2 l-1.2,0z M2.2,0 l3.5,-2 l1.2,0 l-3,2 l3,2 l-1.2,0z\" fill=\"#ff5c8a\"/></g></svg>", "ovPartnerSq": "<svg class=\"fb-ov\" viewBox=\"0 0 100 100\" preserveAspectRatio=\"none\" aria-hidden=\"true\"><path transform=\"translate(37.2 49.6) scale(0.022) rotate(23 50 45)\" d=\"M50 88 C20 66 0 48 0 26 C0 11 12 0 26 0 C37 0 45 6 50 15 C55 6 63 0 74 0 C88 0 100 11 100 26 C100 48 80 66 50 88Z\" fill=\"#ffffff\" opacity=\"0.54\"/><path transform=\"translate(1.8 21.9) scale(0.016) rotate(15 50 45)\" d=\"M50 88 C20 66 0 48 0 26 C0 11 12 0 26 0 C37 0 45 6 50 15 C55 6 63 0 74 0 C88 0 100 11 100 26 C100 48 80 66 50 88Z\" fill=\"#ff8fb1\" opacity=\"0.45\"/><path transform=\"translate(13.0 2.8) scale(0.017) rotate(-19 50 45)\" d=\"M50 88 C20 66 0 48 0 26 C0 11 12 0 26 0 C37 0 45 6 50 15 C55 6 63 0 74 0 C88 0 100 11 100 26 C100 48 80 66 50 88Z\" fill=\"#e8457a\" opacity=\"0.66\"/><path transform=\"translate(93.9 73.2) scale(0.024) rotate(8 50 45)\" d=\"M50 88 C20 66 0 48 0 26 C0 11 12 0 26 0 C37 0 45 6 50 15 C55 6 63 0 74 0 C88 0 100 11 100 26 C100 48 80 66 50 88Z\" fill=\"#ffffff\" opacity=\"0.68\"/><path transform=\"translate(56.4 10.3) scale(0.020) rotate(-1 50 45)\" d=\"M50 88 C20 66 0 48 0 26 C0 11 12 0 26 0 C37 0 45 6 50 15 C55 6 63 0 74 0 C88 0 100 11 100 26 C100 48 80 66 50 88Z\" fill=\"#ff8fb1\" opacity=\"0.46\"/><path transform=\"translate(38.9 52.7) scale(0.020) rotate(-16 50 45)\" d=\"M50 88 C20 66 0 48 0 26 C0 11 12 0 26 0 C37 0 45 6 50 15 C55 6 63 0 74 0 C88 0 100 11 100 26 C100 48 80 66 50 88Z\" fill=\"#ffffff\" opacity=\"0.36\"/><path transform=\"translate(84.2 12.1) scale(0.024) rotate(17 50 45)\" d=\"M50 88 C20 66 0 48 0 26 C0 11 12 0 26 0 C37 0 45 6 50 15 C55 6 63 0 74 0 C88 0 100 11 100 26 C100 48 80 66 50 88Z\" fill=\"#ffffff\" opacity=\"0.78\"/><path transform=\"translate(57.9 79.9) scale(0.013) rotate(-20 50 45)\" d=\"M50 88 C20 66 0 48 0 26 C0 11 12 0 26 0 C37 0 45 6 50 15 C55 6 63 0 74 0 C88 0 100 11 100 26 C100 48 80 66 50 88Z\" fill=\"#ffc2d4\" opacity=\"0.69\"/><path transform=\"translate(93.5 6.1) scale(0.017) rotate(16 50 45)\" d=\"M50 88 C20 66 0 48 0 26 C0 11 12 0 26 0 C37 0 45 6 50 15 C55 6 63 0 74 0 C88 0 100 11 100 26 C100 48 80 66 50 88Z\" fill=\"#ffc2d4\" opacity=\"0.46\"/><path transform=\"translate(18.0 25.0) scale(0.021) rotate(-12 50 45)\" d=\"M50 88 C20 66 0 48 0 26 C0 11 12 0 26 0 C37 0 45 6 50 15 C55 6 63 0 74 0 C88 0 100 11 100 26 C100 48 80 66 50 88Z\" fill=\"#ffffff\" opacity=\"0.62\"/><path transform=\"translate(93.9 55.7) scale(0.026) rotate(0 50 45)\" d=\"M50 88 C20 66 0 48 0 26 C0 11 12 0 26 0 C37 0 45 6 50 15 C55 6 63 0 74 0 C88 0 100 11 100 26 C100 48 80 66 50 88Z\" fill=\"#ffffff\" opacity=\"0.79\"/><path transform=\"translate(41.3 74.7) scale(0.014) rotate(-17 50 45)\" d=\"M50 88 C20 66 0 48 0 26 C0 11 12 0 26 0 C37 0 45 6 50 15 C55 6 63 0 74 0 C88 0 100 11 100 26 C100 48 80 66 50 88Z\" fill=\"#ffffff\" opacity=\"0.53\"/><path transform=\"translate(88.8 16.3) scale(0.019) rotate(21 50 45)\" d=\"M50 88 C20 66 0 48 0 26 C0 11 12 0 26 0 C37 0 45 6 50 15 C55 6 63 0 74 0 C88 0 100 11 100 26 C100 48 80 66 50 88Z\" fill=\"#ffffff\" opacity=\"0.58\"/><path transform=\"translate(44.3 71.9) scale(0.015) rotate(13 50 45)\" d=\"M50 88 C20 66 0 48 0 26 C0 11 12 0 26 0 C37 0 45 6 50 15 C55 6 63 0 74 0 C88 0 100 11 100 26 C100 48 80 66 50 88Z\" fill=\"#e8457a\" opacity=\"0.42\"/><path transform=\"translate(51.6 93.5) scale(0.024) rotate(9 50 45)\" d=\"M50 88 C20 66 0 48 0 26 C0 11 12 0 26 0 C37 0 45 6 50 15 C55 6 63 0 74 0 C88 0 100 11 100 26 C100 48 80 66 50 88Z\" fill=\"#e8457a\" opacity=\"0.73\"/><path transform=\"translate(59.5 58.5) scale(0.026) rotate(-10 50 45)\" d=\"M50 88 C20 66 0 48 0 26 C0 11 12 0 26 0 C37 0 45 6 50 15 C55 6 63 0 74 0 C88 0 100 11 100 26 C100 48 80 66 50 88Z\" fill=\"#ffc2d4\" opacity=\"0.47\"/><path transform=\"translate(80.4 20.1) scale(0.020) rotate(-9 50 45)\" d=\"M50 88 C20 66 0 48 0 26 C0 11 12 0 26 0 C37 0 45 6 50 15 C55 6 63 0 74 0 C88 0 100 11 100 26 C100 48 80 66 50 88Z\" fill=\"#ffc2d4\" opacity=\"0.70\"/><path transform=\"translate(14.4 99.1) scale(0.019) rotate(-2 50 45)\" d=\"M50 88 C20 66 0 48 0 26 C0 11 12 0 26 0 C37 0 45 6 50 15 C55 6 63 0 74 0 C88 0 100 11 100 26 C100 48 80 66 50 88Z\" fill=\"#ffc2d4\" opacity=\"0.73\"/><path transform=\"translate(82.2 55.7) scale(0.019) rotate(18 50 45)\" d=\"M50 88 C20 66 0 48 0 26 C0 11 12 0 26 0 C37 0 45 6 50 15 C55 6 63 0 74 0 C88 0 100 11 100 26 C100 48 80 66 50 88Z\" fill=\"#ff8fb1\" opacity=\"0.53\"/><path transform=\"translate(73.4 96.0) scale(0.019) rotate(20 50 45)\" d=\"M50 88 C20 66 0 48 0 26 C0 11 12 0 26 0 C37 0 45 6 50 15 C55 6 63 0 74 0 C88 0 100 11 100 26 C100 48 80 66 50 88Z\" fill=\"#ffc2d4\" opacity=\"0.64\"/><path transform=\"translate(77.7 6.9) scale(0.015) rotate(-13 50 45)\" d=\"M50 88 C20 66 0 48 0 26 C0 11 12 0 26 0 C37 0 45 6 50 15 C55 6 63 0 74 0 C88 0 100 11 100 26 C100 48 80 66 50 88Z\" fill=\"#e8457a\" opacity=\"0.44\"/><path transform=\"translate(25.9 18.7) scale(0.022) rotate(20 50 45)\" d=\"M50 88 C20 66 0 48 0 26 C0 11 12 0 26 0 C37 0 45 6 50 15 C55 6 63 0 74 0 C88 0 100 11 100 26 C100 48 80 66 50 88Z\" fill=\"#ff8fb1\" opacity=\"0.46\"/><path transform=\"translate(86.5 31.3) scale(0.018) rotate(-19 50 45)\" d=\"M50 88 C20 66 0 48 0 26 C0 11 12 0 26 0 C37 0 45 6 50 15 C55 6 63 0 74 0 C88 0 100 11 100 26 C100 48 80 66 50 88Z\" fill=\"#ff8fb1\" opacity=\"0.47\"/><path transform=\"translate(91.4 3.6) scale(0.018) rotate(-25 50 45)\" d=\"M50 88 C20 66 0 48 0 26 C0 11 12 0 26 0 C37 0 45 6 50 15 C55 6 63 0 74 0 C88 0 100 11 100 26 C100 48 80 66 50 88Z\" fill=\"#e8457a\" opacity=\"0.50\"/><path transform=\"translate(43.6 48.6) scale(0.015) rotate(-5 50 45)\" d=\"M50 88 C20 66 0 48 0 26 C0 11 12 0 26 0 C37 0 45 6 50 15 C55 6 63 0 74 0 C88 0 100 11 100 26 C100 48 80 66 50 88Z\" fill=\"#ffffff\" opacity=\"0.59\"/><path transform=\"translate(11.9 27.5) scale(0.021) rotate(-3 50 45)\" d=\"M50 88 C20 66 0 48 0 26 C0 11 12 0 26 0 C37 0 45 6 50 15 C55 6 63 0 74 0 C88 0 100 11 100 26 C100 48 80 66 50 88Z\" fill=\"#ff8fb1\" opacity=\"0.59\"/><path transform=\"translate(25.1 52.8) scale(0.022) rotate(13 50 45)\" d=\"M50 88 C20 66 0 48 0 26 C0 11 12 0 26 0 C37 0 45 6 50 15 C55 6 63 0 74 0 C88 0 100 11 100 26 C100 48 80 66 50 88Z\" fill=\"#e8457a\" opacity=\"0.48\"/><path transform=\"translate(67.6 65.4) scale(0.023) rotate(-20 50 45)\" d=\"M50 88 C20 66 0 48 0 26 C0 11 12 0 26 0 C37 0 45 6 50 15 C55 6 63 0 74 0 C88 0 100 11 100 26 C100 48 80 66 50 88Z\" fill=\"#e8457a\" opacity=\"0.78\"/><path transform=\"translate(33.9 56.6) scale(0.019) rotate(0 50 45)\" d=\"M50 88 C20 66 0 48 0 26 C0 11 12 0 26 0 C37 0 45 6 50 15 C55 6 63 0 74 0 C88 0 100 11 100 26 C100 48 80 66 50 88Z\" fill=\"#ffffff\" opacity=\"0.38\"/><path transform=\"translate(29.4 72.8) scale(0.022) rotate(-16 50 45)\" d=\"M50 88 C20 66 0 48 0 26 C0 11 12 0 26 0 C37 0 45 6 50 15 C55 6 63 0 74 0 C88 0 100 11 100 26 C100 48 80 66 50 88Z\" fill=\"#ffc2d4\" opacity=\"0.75\"/><path transform=\"translate(65.5 12.3) scale(0.025) rotate(21 50 45)\" d=\"M50 88 C20 66 0 48 0 26 C0 11 12 0 26 0 C37 0 45 6 50 15 C55 6 63 0 74 0 C88 0 100 11 100 26 C100 48 80 66 50 88Z\" fill=\"#ffc2d4\" opacity=\"0.64\"/><path transform=\"translate(65.0 42.0) scale(0.016) rotate(-2 50 45)\" d=\"M50 88 C20 66 0 48 0 26 C0 11 12 0 26 0 C37 0 45 6 50 15 C55 6 63 0 74 0 C88 0 100 11 100 26 C100 48 80 66 50 88Z\" fill=\"#ffc2d4\" opacity=\"0.49\"/><path transform=\"translate(17.6 6.9) scale(0.022) rotate(-7 50 45)\" d=\"M50 88 C20 66 0 48 0 26 C0 11 12 0 26 0 C37 0 45 6 50 15 C55 6 63 0 74 0 C88 0 100 11 100 26 C100 48 80 66 50 88Z\" fill=\"#ffffff\" opacity=\"0.47\"/><path transform=\"translate(38.3 87.3) scale(0.013) rotate(-13 50 45)\" d=\"M50 88 C20 66 0 48 0 26 C0 11 12 0 26 0 C37 0 45 6 50 15 C55 6 63 0 74 0 C88 0 100 11 100 26 C100 48 80 66 50 88Z\" fill=\"#e8457a\" opacity=\"0.70\"/><path transform=\"translate(35.4 33.3) scale(0.018) rotate(-7 50 45)\" d=\"M50 88 C20 66 0 48 0 26 C0 11 12 0 26 0 C37 0 45 6 50 15 C55 6 63 0 74 0 C88 0 100 11 100 26 C100 48 80 66 50 88Z\" fill=\"#ff8fb1\" opacity=\"0.73\"/><path transform=\"translate(11.2 27.0) scale(0.013) rotate(3 50 45)\" d=\"M50 88 C20 66 0 48 0 26 C0 11 12 0 26 0 C37 0 45 6 50 15 C55 6 63 0 74 0 C88 0 100 11 100 26 C100 48 80 66 50 88Z\" fill=\"#ff8fb1\" opacity=\"0.76\"/><path transform=\"translate(11.2 69.8) scale(0.020) rotate(16 50 45)\" d=\"M50 88 C20 66 0 48 0 26 C0 11 12 0 26 0 C37 0 45 6 50 15 C55 6 63 0 74 0 C88 0 100 11 100 26 C100 48 80 66 50 88Z\" fill=\"#ffffff\" opacity=\"0.69\"/><path transform=\"translate(59.2 14.6) scale(0.018) rotate(2 50 45)\" d=\"M50 88 C20 66 0 48 0 26 C0 11 12 0 26 0 C37 0 45 6 50 15 C55 6 63 0 74 0 C88 0 100 11 100 26 C100 48 80 66 50 88Z\" fill=\"#ffc2d4\" opacity=\"0.43\"/><path transform=\"translate(17.9 86.9) scale(0.017) rotate(-23 50 45)\" d=\"M50 88 C20 66 0 48 0 26 C0 11 12 0 26 0 C37 0 45 6 50 15 C55 6 63 0 74 0 C88 0 100 11 100 26 C100 48 80 66 50 88Z\" fill=\"#e8457a\" opacity=\"0.71\"/><path transform=\"translate(89.1 94.9) scale(0.017) rotate(7 50 45)\" d=\"M50 88 C20 66 0 48 0 26 C0 11 12 0 26 0 C37 0 45 6 50 15 C55 6 63 0 74 0 C88 0 100 11 100 26 C100 48 80 66 50 88Z\" fill=\"#e8457a\" opacity=\"0.79\"/><path transform=\"translate(68.7 29.9) scale(0.024) rotate(-23 50 45)\" d=\"M50 88 C20 66 0 48 0 26 C0 11 12 0 26 0 C37 0 45 6 50 15 C55 6 63 0 74 0 C88 0 100 11 100 26 C100 48 80 66 50 88Z\" fill=\"#ffffff\" opacity=\"0.44\"/><path transform=\"translate(63.4 10.7) scale(0.023) rotate(-0 50 45)\" d=\"M50 88 C20 66 0 48 0 26 C0 11 12 0 26 0 C37 0 45 6 50 15 C55 6 63 0 74 0 C88 0 100 11 100 26 C100 48 80 66 50 88Z\" fill=\"#ffc2d4\" opacity=\"0.59\"/><path transform=\"translate(46.1 19.3) scale(0.019) rotate(16 50 45)\" d=\"M50 88 C20 66 0 48 0 26 C0 11 12 0 26 0 C37 0 45 6 50 15 C55 6 63 0 74 0 C88 0 100 11 100 26 C100 48 80 66 50 88Z\" fill=\"#ff8fb1\" opacity=\"0.77\"/><path transform=\"translate(94.7 11.2) scale(0.016) rotate(-18 50 45)\" d=\"M50 88 C20 66 0 48 0 26 C0 11 12 0 26 0 C37 0 45 6 50 15 C55 6 63 0 74 0 C88 0 100 11 100 26 C100 48 80 66 50 88Z\" fill=\"#ffc2d4\" opacity=\"0.71\"/><path transform=\"translate(62.3 5.1) scale(0.017) rotate(0 50 45)\" d=\"M50 88 C20 66 0 48 0 26 C0 11 12 0 26 0 C37 0 45 6 50 15 C55 6 63 0 74 0 C88 0 100 11 100 26 C100 48 80 66 50 88Z\" fill=\"#ffc2d4\" opacity=\"0.57\"/><path transform=\"translate(1.9 34.0) scale(0.017) rotate(10 50 45)\" d=\"M50 88 C20 66 0 48 0 26 C0 11 12 0 26 0 C37 0 45 6 50 15 C55 6 63 0 74 0 C88 0 100 11 100 26 C100 48 80 66 50 88Z\" fill=\"#e8457a\" opacity=\"0.41\"/><line x1=\"4\" y1=\"40\" x2=\"58\" y2=\"8\" stroke=\"#b8862f\" stroke-width=\".7\" stroke-linecap=\"round\"/><g transform=\"translate(58 8) rotate(-30.7)\"><path d=\"M0,0 L-4.5,-2.2 L-3.4,0 L-4.5,2.2Z\" fill=\"#c9184a\"/></g><g transform=\"translate(4 40) rotate(-30.7)\"><path d=\"M0,0 l3.5,-2 l1.2,0 l-3,2 l3,2 l-1.2,0z M2.2,0 l3.5,-2 l1.2,0 l-3,2 l3,2 l-1.2,0z\" fill=\"#ff5c8a\"/></g></svg>"}, "mar": {"css": ".fm{container-type:inline-size;aspect-ratio:8.5/11;position:relative;overflow:hidden;border-radius:4px;box-shadow:0 10px 30px rgba(31,122,61,.25);background:linear-gradient(180deg,#9fdcff 0%,#d8f3ff 45%,#f2fbff 70%);font-family:Fredoka,Poppins,sans-serif;color:#1d4d2b}\n.fm .fm-sky{position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:1}\n.fm .fm-logo{position:absolute;z-index:4;left:4.5cqw;top:4cqw;width:15cqw;height:15cqw;border-radius:50%;background:#fff;display:grid;place-items:center;box-shadow:0 0 0 .8cqw #3fbf5f,0 1cqw 2cqw rgba(0,0,0,.15)}\n.fm .fm-logo img{width:11.5cqw}\n.fm .fm-logo.pip{border-radius:2.4cqw;width:21cqw;height:12.5cqw}\n.fm .fm-logo.pip img{width:19cqw}\n.fm .fm-sun{position:absolute;z-index:4;right:4cqw;top:3.5cqw;width:16cqw;height:16cqw;border-radius:50%;background:radial-gradient(circle,#ffe14d 0 55%,#ffc300 56%);display:grid;place-items:center;text-align:center;font-weight:700;font-size:2.3cqw;line-height:1.05;color:#7a4b00;box-shadow:0 0 0 1.4cqw rgba(255,214,10,.35),0 0 0 2.8cqw rgba(255,214,10,.18)}\n.fm .fm-title{position:absolute;z-index:4;left:0;right:0;top:24cqw;text-align:center}\n.fm .fm-title .k{font-size:1.9cqw;letter-spacing:.32em;font-weight:600;color:#1f7a3d}\n.fm .fm-title .t{font:700 9.4cqw/1 Fredoka,sans-serif;color:#1f7a3d;margin:1.2cqw 0 .4cqw;text-shadow:0 .5cqw 0 #fff}\n.fm .fm-title .m{font:700 6.6cqw/1.1 Caveat,cursive;color:#ff4d6d}\n.fm .fm-title .m b{color:#ff9f1c}\n.fm .pk{position:absolute;z-index:5;width:40cqw;background:#fffaf0;border-radius:1.4cqw;box-shadow:0 1.2cqw 2.5cqw rgba(29,77,43,.3);overflow:hidden;border:.5cqw solid #fff}\n.fm .pk .top{background:repeating-linear-gradient(90deg,#3fbf5f 0 3cqw,#2fa84f 3cqw 6cqw);color:#fff;text-align:center;font-weight:700;font-size:2.1cqw;letter-spacing:.28em;padding:1cqw 0}\n.fm .pk .win{height:9cqw;margin:2cqw 2.4cqw 0;border-radius:1cqw;background:linear-gradient(180deg,#c9f0ff,#e8fbe0);position:relative;overflow:hidden}\n.fm .pk .win svg{position:absolute;inset:0;width:100%;height:100%}\n.fm .pk .bd{padding:1.6cqw 2.6cqw 2.4cqw}\n.fm .pk .dd{font:700 4.6cqw/1 Caveat,cursive;color:#ff4d6d}\n.fm .pk .tm{font-weight:600;font-size:2.5cqw;color:#1f7a3d;margin:.4cqw 0 .9cqw}\n.fm .pk .ti{font-weight:700;font-size:3.6cqw;line-height:1.08;color:#1d4d2b}\n.fm .pk .grow{font-size:2cqw;color:#5b7a63;margin-top:.8cqw}\n.fm .p1{left:6cqw;top:47cqw;transform:rotate(-4deg)}\n.fm .p2{right:6cqw;top:55cqw;transform:rotate(4deg)}\n.fm .fm-plank{position:absolute;z-index:6;left:5cqw;right:5cqw;bottom:3.5cqw;height:14cqw;border-radius:1.4cqw;background:repeating-linear-gradient(0deg,#9b6a3c 0 3.4cqw,#8a5c31 3.4cqw 3.6cqw);box-shadow:0 1cqw 2cqw rgba(0,0,0,.3),inset 0 0 0 .5cqw #7a4f28;display:flex;align-items:center;gap:2.6cqw;padding:0 3cqw;color:#fff6dc}\n.fm .fm-plank .rg{flex:1;font-size:2.2cqw;line-height:1.3}\n.fm .fm-plank .rg b{display:block;font-size:3.2cqw;color:#ffe14d}\n.fm .fm-qr{width:10cqw;height:10cqw;border:.6cqw solid #1d2a24;border-radius:1cqw;background:repeating-linear-gradient(90deg,#1d2a24 0 .9cqw,#fff .9cqw 1.8cqw);display:grid;place-items:center;flex:none}\n.fm .fm-qr span{background:#fff;font-size:1.7cqw;font-weight:700;padding:0 .6cqw;color:#1d2a24}\n.fm .fm-lg{display:flex;flex-direction:column;gap:.8cqw}\n.fm .fm-lg span{background:#fff6dc;color:#5a3a1a;border-radius:.8cqw;font-size:1.6cqw;font-weight:700;padding:.5cqw 1.1cqw;text-align:center}\n.fm .fm-tag{position:absolute;z-index:6;left:0;right:0;bottom:18.6cqw;text-align:center;font-weight:600;font-size:2.15cqw;color:#fff;text-shadow:0 .3cqw .5cqw rgba(0,0,0,.35)}\n.fm .stake{position:absolute;z-index:5;width:40cqw}\n.fm .stake .bd2{background:#fff6dc;border:.6cqw solid #9b6a3c;border-radius:1.2cqw;padding:1.6cqw 2.4cqw;box-shadow:0 1cqw 2cqw rgba(0,0,0,.2)}\n.fm .stake .n{font-weight:700;font-size:2cqw;letter-spacing:.2em;color:#ff4d6d}\n.fm .stake .ti{font-weight:700;font-size:3.2cqw;line-height:1.08;color:#1d4d2b;margin-top:.4cqw}\n.fm .stake .pole{width:1.6cqw;height:2.6cqw;background:#9b6a3c;margin:0 auto;border-radius:0 0 .6cqw .6cqw}\n.fm .s1{left:7cqw;top:45cqw;transform:rotate(-3deg)}\n.fm .s2{right:7cqw;top:46cqw;transform:rotate(3deg)}\n.fm .fm-h{position:absolute;z-index:5;left:0;right:0;text-align:center;font:700 5.4cqw/1.15 Caveat,cursive;color:#1f7a3d}\n.fm .fm-c{position:absolute;z-index:5;left:0;right:0;text-align:center;font-size:2cqw;letter-spacing:.24em;font-weight:600;color:#1f7a3d}\n.fm .coin{position:absolute;z-index:5;width:18cqw;height:18cqw;border-radius:50%;background:radial-gradient(circle at 35% 30%,#ffe27a 0 18%,#f5b700 45%,#d99a00 100%);box-shadow:inset 0 0 0 .9cqw #c98a00,inset 0 0 0 1.6cqw #ffd84d,0 .8cqw 1.4cqw rgba(0,0,0,.25);display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;color:#4a2e00;padding:1.4cqw}\n.fm .coin.h{background:radial-gradient(circle at 35% 30%,#fff3b0 0 18%,#ffd60a 45%,#f5b700 100%);box-shadow:inset 0 0 0 .9cqw #ff4d6d,inset 0 0 0 1.6cqw #fff3b0,0 .8cqw 1.4cqw rgba(0,0,0,.25)}\n.fm .coin .i{font-weight:700;font-size:2.1cqw;line-height:1.05}\n.fm .coin .d{font-size:1.6cqw;font-weight:500;margin:.3cqw 0}\n.fm .coin .t{font-weight:700;font-size:2.7cqw;color:#7a1f00}", "sceneHst": "<svg class=\"fm-sky\" viewBox=\"0 0 100 129.4\" preserveAspectRatio=\"none\" aria-hidden=\"true\"><path d=\"M2.0,58 A48.0,48.0 0 0 1 98.0,58\" stroke=\"#ff4d4d\" stroke-width=\"2.5\" fill=\"none\"/><path d=\"M4.399999999999999,58 A45.6,45.6 0 0 1 95.6,58\" stroke=\"#ff9f1c\" stroke-width=\"2.5\" fill=\"none\"/><path d=\"M6.799999999999997,58 A43.2,43.2 0 0 1 93.2,58\" stroke=\"#ffd60a\" stroke-width=\"2.5\" fill=\"none\"/><path d=\"M9.200000000000003,58 A40.8,40.8 0 0 1 90.8,58\" stroke=\"#3fbf5f\" stroke-width=\"2.5\" fill=\"none\"/><path d=\"M11.600000000000001,58 A38.4,38.4 0 0 1 88.4,58\" stroke=\"#2ec4f1\" stroke-width=\"2.5\" fill=\"none\"/><path d=\"M14.0,58 A36.0,36.0 0 0 1 86.0,58\" stroke=\"#4a6cf7\" stroke-width=\"2.5\" fill=\"none\"/><path d=\"M16.4,58 A33.6,33.6 0 0 1 83.6,58\" stroke=\"#9b5de5\" stroke-width=\"2.5\" fill=\"none\"/><circle cx=\"0.96\" cy=\"57.08\" r=\"3.60\" fill=\"#fff\"/><circle cx=\"6.00\" cy=\"54.56\" r=\"4.86\" fill=\"#fff\"/><circle cx=\"11.04\" cy=\"56.90\" r=\"3.78\" fill=\"#fff\"/><circle cx=\"8.16\" cy=\"58.16\" r=\"3.24\" fill=\"#fff\"/><circle cx=\"3.84\" cy=\"58.34\" r=\"3.24\" fill=\"#fff\"/><circle cx=\"88.96\" cy=\"57.08\" r=\"3.60\" fill=\"#fff\"/><circle cx=\"94.00\" cy=\"54.56\" r=\"4.86\" fill=\"#fff\"/><circle cx=\"99.04\" cy=\"56.90\" r=\"3.78\" fill=\"#fff\"/><circle cx=\"96.16\" cy=\"58.16\" r=\"3.24\" fill=\"#fff\"/><circle cx=\"91.84\" cy=\"58.34\" r=\"3.24\" fill=\"#fff\"/><circle cx=\"27.48\" cy=\"9.54\" r=\"1.80\" fill=\"#fff\"/><circle cx=\"30.00\" cy=\"8.28\" r=\"2.43\" fill=\"#fff\"/><circle cx=\"32.52\" cy=\"9.45\" r=\"1.89\" fill=\"#fff\"/><circle cx=\"31.08\" cy=\"10.08\" r=\"1.62\" fill=\"#fff\"/><circle cx=\"28.92\" cy=\"10.17\" r=\"1.62\" fill=\"#fff\"/><circle cx=\"75.90\" cy=\"6.45\" r=\"1.50\" fill=\"#fff\"/><circle cx=\"78.00\" cy=\"5.40\" r=\"2.03\" fill=\"#fff\"/><circle cx=\"80.10\" cy=\"6.38\" r=\"1.58\" fill=\"#fff\"/><circle cx=\"78.90\" cy=\"6.90\" r=\"1.35\" fill=\"#fff\"/><circle cx=\"77.10\" cy=\"6.97\" r=\"1.35\" fill=\"#fff\"/><g transform=\"rotate(-20 3 66)\"><circle cx=\"3.00\" cy=\"65.06\" r=\"0.85\" fill=\"#2fa84f\"/><circle cx=\"3.81\" cy=\"66.47\" r=\"0.85\" fill=\"#2fa84f\"/><circle cx=\"2.19\" cy=\"66.47\" r=\"0.85\" fill=\"#2fa84f\"/><path d=\"M3,66 q0.51,1.87 1.53,2.38\" stroke=\"#2fa84f\" stroke-width=\"0.37\" fill=\"none\" stroke-linecap=\"round\"/></g><g transform=\"rotate(10 50 90)\"><circle cx=\"50.00\" cy=\"89.17\" r=\"0.75\" fill=\"#2fa84f\"/><circle cx=\"50.71\" cy=\"90.41\" r=\"0.75\" fill=\"#2fa84f\"/><circle cx=\"49.29\" cy=\"90.41\" r=\"0.75\" fill=\"#2fa84f\"/><path d=\"M50,90 q0.44999999999999996,1.6500000000000001 1.35,2.0999999999999996\" stroke=\"#2fa84f\" stroke-width=\"0.33\" fill=\"none\" stroke-linecap=\"round\"/></g><g transform=\"rotate(20 96 94)\"><circle cx=\"96.00\" cy=\"93.12\" r=\"0.80\" fill=\"#2fa84f\"/><circle cx=\"96.76\" cy=\"94.44\" r=\"0.80\" fill=\"#2fa84f\"/><circle cx=\"95.24\" cy=\"94.44\" r=\"0.80\" fill=\"#2fa84f\"/><path d=\"M96,94 q0.48,1.7600000000000002 1.4400000000000002,2.2399999999999998\" stroke=\"#2fa84f\" stroke-width=\"0.35\" fill=\"none\" stroke-linecap=\"round\"/></g><g transform=\"rotate(-10 30 97)\"><circle cx=\"30.00\" cy=\"96.28\" r=\"0.65\" fill=\"#2fa84f\"/><circle cx=\"30.62\" cy=\"97.36\" r=\"0.65\" fill=\"#2fa84f\"/><circle cx=\"29.38\" cy=\"97.36\" r=\"0.65\" fill=\"#2fa84f\"/><path d=\"M30,97 q0.39,1.4300000000000002 1.1700000000000002,1.8199999999999998\" stroke=\"#2fa84f\" stroke-width=\"0.29\" fill=\"none\" stroke-linecap=\"round\"/></g><g transform=\"rotate(15 72 99)\"><circle cx=\"72.00\" cy=\"98.23\" r=\"0.70\" fill=\"#2fa84f\"/><circle cx=\"72.67\" cy=\"99.39\" r=\"0.70\" fill=\"#2fa84f\"/><circle cx=\"71.33\" cy=\"99.39\" r=\"0.70\" fill=\"#2fa84f\"/><path d=\"M72,99 q0.42,1.54 1.26,1.9599999999999997\" stroke=\"#2fa84f\" stroke-width=\"0.31\" fill=\"none\" stroke-linecap=\"round\"/></g><path d=\"M0,107.4 C20,99.4 38,105.4 55,101.4 S88,96.4 100,103.4 V129.4 H0Z\" fill=\"#7cc95b\"/><path d=\"M0,112.4 C25,105.4 45,113.4 62,108.4 S90,104.4 100,110.4 V129.4 H0Z\" fill=\"#4fae3f\"/><path d=\"M6,103.76870508466911 v3.5200000000000005\" stroke=\"#2f8a3e\" stroke-width=\"0.31\"/><circle cx=\"6.66\" cy=\"103.77\" r=\"0.50\" fill=\"#ff8fab\"/><circle cx=\"6.20\" cy=\"104.40\" r=\"0.50\" fill=\"#ff8fab\"/><circle cx=\"5.47\" cy=\"104.16\" r=\"0.50\" fill=\"#ff8fab\"/><circle cx=\"5.47\" cy=\"103.38\" r=\"0.50\" fill=\"#ff8fab\"/><circle cx=\"6.20\" cy=\"103.14\" r=\"0.50\" fill=\"#ff8fab\"/><circle cx=\"6\" cy=\"103.76870508466911\" r=\"0.42\" fill=\"#ffd60a\"/><path d=\"M12,104.1253609677822 v3.5200000000000005\" stroke=\"#2f8a3e\" stroke-width=\"0.31\"/><circle cx=\"12.66\" cy=\"104.13\" r=\"0.50\" fill=\"#ffffff\"/><circle cx=\"12.20\" cy=\"104.75\" r=\"0.50\" fill=\"#ffffff\"/><circle cx=\"11.47\" cy=\"104.51\" r=\"0.50\" fill=\"#ffffff\"/><circle cx=\"11.47\" cy=\"103.74\" r=\"0.50\" fill=\"#ffffff\"/><circle cx=\"12.20\" cy=\"103.50\" r=\"0.50\" fill=\"#ffffff\"/><circle cx=\"12\" cy=\"104.1253609677822\" r=\"0.42\" fill=\"#ffd60a\"/><path d=\"M88,104.2855806966971 v3.5200000000000005\" stroke=\"#2f8a3e\" stroke-width=\"0.31\"/><circle cx=\"88.66\" cy=\"104.29\" r=\"0.50\" fill=\"#b8a1ff\"/><circle cx=\"88.20\" cy=\"104.91\" r=\"0.50\" fill=\"#b8a1ff\"/><circle cx=\"87.47\" cy=\"104.67\" r=\"0.50\" fill=\"#b8a1ff\"/><circle cx=\"87.47\" cy=\"103.90\" r=\"0.50\" fill=\"#b8a1ff\"/><circle cx=\"88.20\" cy=\"103.66\" r=\"0.50\" fill=\"#b8a1ff\"/><circle cx=\"88\" cy=\"104.2855806966971\" r=\"0.42\" fill=\"#ffd60a\"/><path d=\"M95,104.72735085133115 v3.5200000000000005\" stroke=\"#2f8a3e\" stroke-width=\"0.31\"/><circle cx=\"95.66\" cy=\"104.73\" r=\"0.50\" fill=\"#ff8fab\"/><circle cx=\"95.20\" cy=\"105.36\" r=\"0.50\" fill=\"#ff8fab\"/><circle cx=\"94.47\" cy=\"105.12\" r=\"0.50\" fill=\"#ff8fab\"/><circle cx=\"94.47\" cy=\"104.34\" r=\"0.50\" fill=\"#ff8fab\"/><circle cx=\"95.20\" cy=\"104.10\" r=\"0.50\" fill=\"#ff8fab\"/><circle cx=\"95\" cy=\"104.72735085133115\" r=\"0.42\" fill=\"#ffd60a\"/><path d=\"M50,104.1196957242198 v3.5200000000000005\" stroke=\"#2f8a3e\" stroke-width=\"0.31\"/><circle cx=\"50.66\" cy=\"104.12\" r=\"0.50\" fill=\"#ffffff\"/><circle cx=\"50.20\" cy=\"104.75\" r=\"0.50\" fill=\"#ffffff\"/><circle cx=\"49.47\" cy=\"104.51\" r=\"0.50\" fill=\"#ffffff\"/><circle cx=\"49.47\" cy=\"103.73\" r=\"0.50\" fill=\"#ffffff\"/><circle cx=\"50.20\" cy=\"103.49\" r=\"0.50\" fill=\"#ffffff\"/><circle cx=\"50\" cy=\"104.1196957242198\" r=\"0.42\" fill=\"#ffd60a\"/><circle cx=\"85.44\" cy=\"45.56\" r=\"1.7600000000000002\" fill=\"#f5b700\" stroke=\"#c98a00\" stroke-width=\"0.32\"/><circle cx=\"85.44\" cy=\"45.56\" r=\"0.9680000000000002\" fill=\"none\" stroke=\"#ffe27a\" stroke-width=\"0.21\"/><circle cx=\"88.0\" cy=\"44.44\" r=\"1.7600000000000002\" fill=\"#f5b700\" stroke=\"#c98a00\" stroke-width=\"0.32\"/><circle cx=\"88.0\" cy=\"44.44\" r=\"0.9680000000000002\" fill=\"none\" stroke=\"#ffe27a\" stroke-width=\"0.21\"/><circle cx=\"90.56\" cy=\"45.72\" r=\"1.7600000000000002\" fill=\"#f5b700\" stroke=\"#c98a00\" stroke-width=\"0.32\"/><circle cx=\"90.56\" cy=\"45.72\" r=\"0.9680000000000002\" fill=\"none\" stroke=\"#ffe27a\" stroke-width=\"0.21\"/><circle cx=\"87.04\" cy=\"43.96\" r=\"1.7600000000000002\" fill=\"#f5b700\" stroke=\"#c98a00\" stroke-width=\"0.32\"/><circle cx=\"87.04\" cy=\"43.96\" r=\"0.9680000000000002\" fill=\"none\" stroke=\"#ffe27a\" stroke-width=\"0.21\"/><circle cx=\"89.28\" cy=\"43.64\" r=\"1.7600000000000002\" fill=\"#f5b700\" stroke=\"#c98a00\" stroke-width=\"0.32\"/><circle cx=\"89.28\" cy=\"43.64\" r=\"0.9680000000000002\" fill=\"none\" stroke=\"#ffe27a\" stroke-width=\"0.21\"/><path d=\"M82.24,46.04 h11.520000000000001 q-.2,0.8 -0.96,1.2800000000000002 q2.2399999999999998,3.5200000000000005 -0.6400000000000001,6.720000000000001 h-8.959999999999999 q-2.8800000000000003,-3.2 -0.6400000000000001,-6.720000000000001 q-0.6400000000000001,-0.48 -0.96,-1.2800000000000002z\" fill=\"#1d2a24\"/><rect x=\"81.76\" y=\"45.24\" width=\"12.48\" height=\"1.92\" rx=\"0.8\" fill=\"#2b3b33\"/></svg>", "scenePartner": "<svg class=\"fm-sky\" viewBox=\"0 0 100 129.4\" preserveAspectRatio=\"none\" aria-hidden=\"true\"><path d=\"M2.0,58 A48.0,48.0 0 0 1 98.0,58\" stroke=\"#ff4d4d\" stroke-width=\"2.5\" fill=\"none\"/><path d=\"M4.399999999999999,58 A45.6,45.6 0 0 1 95.6,58\" stroke=\"#ff9f1c\" stroke-width=\"2.5\" fill=\"none\"/><path d=\"M6.799999999999997,58 A43.2,43.2 0 0 1 93.2,58\" stroke=\"#ffd60a\" stroke-width=\"2.5\" fill=\"none\"/><path d=\"M9.200000000000003,58 A40.8,40.8 0 0 1 90.8,58\" stroke=\"#3fbf5f\" stroke-width=\"2.5\" fill=\"none\"/><path d=\"M11.600000000000001,58 A38.4,38.4 0 0 1 88.4,58\" stroke=\"#2ec4f1\" stroke-width=\"2.5\" fill=\"none\"/><path d=\"M14.0,58 A36.0,36.0 0 0 1 86.0,58\" stroke=\"#4a6cf7\" stroke-width=\"2.5\" fill=\"none\"/><path d=\"M16.4,58 A33.6,33.6 0 0 1 83.6,58\" stroke=\"#9b5de5\" stroke-width=\"2.5\" fill=\"none\"/><circle cx=\"0.96\" cy=\"57.08\" r=\"3.60\" fill=\"#fff\"/><circle cx=\"6.00\" cy=\"54.56\" r=\"4.86\" fill=\"#fff\"/><circle cx=\"11.04\" cy=\"56.90\" r=\"3.78\" fill=\"#fff\"/><circle cx=\"8.16\" cy=\"58.16\" r=\"3.24\" fill=\"#fff\"/><circle cx=\"3.84\" cy=\"58.34\" r=\"3.24\" fill=\"#fff\"/><circle cx=\"88.96\" cy=\"57.08\" r=\"3.60\" fill=\"#fff\"/><circle cx=\"94.00\" cy=\"54.56\" r=\"4.86\" fill=\"#fff\"/><circle cx=\"99.04\" cy=\"56.90\" r=\"3.78\" fill=\"#fff\"/><circle cx=\"96.16\" cy=\"58.16\" r=\"3.24\" fill=\"#fff\"/><circle cx=\"91.84\" cy=\"58.34\" r=\"3.24\" fill=\"#fff\"/><circle cx=\"27.48\" cy=\"9.54\" r=\"1.80\" fill=\"#fff\"/><circle cx=\"30.00\" cy=\"8.28\" r=\"2.43\" fill=\"#fff\"/><circle cx=\"32.52\" cy=\"9.45\" r=\"1.89\" fill=\"#fff\"/><circle cx=\"31.08\" cy=\"10.08\" r=\"1.62\" fill=\"#fff\"/><circle cx=\"28.92\" cy=\"10.17\" r=\"1.62\" fill=\"#fff\"/><circle cx=\"75.90\" cy=\"6.45\" r=\"1.50\" fill=\"#fff\"/><circle cx=\"78.00\" cy=\"5.40\" r=\"2.03\" fill=\"#fff\"/><circle cx=\"80.10\" cy=\"6.38\" r=\"1.58\" fill=\"#fff\"/><circle cx=\"78.90\" cy=\"6.90\" r=\"1.35\" fill=\"#fff\"/><circle cx=\"77.10\" cy=\"6.97\" r=\"1.35\" fill=\"#fff\"/><g transform=\"rotate(-20 4 46)\"><circle cx=\"4.00\" cy=\"45.12\" r=\"0.80\" fill=\"#2fa84f\"/><circle cx=\"4.76\" cy=\"46.44\" r=\"0.80\" fill=\"#2fa84f\"/><circle cx=\"3.24\" cy=\"46.44\" r=\"0.80\" fill=\"#2fa84f\"/><path d=\"M4,46 q0.48,1.7600000000000002 1.4400000000000002,2.2399999999999998\" stroke=\"#2fa84f\" stroke-width=\"0.35\" fill=\"none\" stroke-linecap=\"round\"/></g><g transform=\"rotate(20 96 45)\"><circle cx=\"96.00\" cy=\"44.17\" r=\"0.75\" fill=\"#2fa84f\"/><circle cx=\"96.71\" cy=\"45.41\" r=\"0.75\" fill=\"#2fa84f\"/><circle cx=\"95.29\" cy=\"45.41\" r=\"0.75\" fill=\"#2fa84f\"/><path d=\"M96,45 q0.44999999999999996,1.6500000000000001 1.35,2.0999999999999996\" stroke=\"#2fa84f\" stroke-width=\"0.33\" fill=\"none\" stroke-linecap=\"round\"/></g><g transform=\"rotate(0 50 59)\"><circle cx=\"50.00\" cy=\"58.23\" r=\"0.70\" fill=\"#2fa84f\"/><circle cx=\"50.67\" cy=\"59.38\" r=\"0.70\" fill=\"#2fa84f\"/><circle cx=\"49.33\" cy=\"59.38\" r=\"0.70\" fill=\"#2fa84f\"/><path d=\"M50,59 q0.42,1.54 1.26,1.9599999999999997\" stroke=\"#2fa84f\" stroke-width=\"0.31\" fill=\"none\" stroke-linecap=\"round\"/></g><g transform=\"rotate(10 3 104)\"><circle cx=\"3.00\" cy=\"103.17\" r=\"0.75\" fill=\"#2fa84f\"/><circle cx=\"3.71\" cy=\"104.41\" r=\"0.75\" fill=\"#2fa84f\"/><circle cx=\"2.29\" cy=\"104.41\" r=\"0.75\" fill=\"#2fa84f\"/><path d=\"M3,104 q0.44999999999999996,1.6500000000000001 1.35,2.0999999999999996\" stroke=\"#2fa84f\" stroke-width=\"0.33\" fill=\"none\" stroke-linecap=\"round\"/></g><g transform=\"rotate(-15 64 106)\"><circle cx=\"64.00\" cy=\"105.28\" r=\"0.65\" fill=\"#2fa84f\"/><circle cx=\"64.62\" cy=\"106.36\" r=\"0.65\" fill=\"#2fa84f\"/><circle cx=\"63.38\" cy=\"106.36\" r=\"0.65\" fill=\"#2fa84f\"/><path d=\"M64,106 q0.39,1.4300000000000002 1.1700000000000002,1.8199999999999998\" stroke=\"#2fa84f\" stroke-width=\"0.29\" fill=\"none\" stroke-linecap=\"round\"/></g><path d=\"M0,107.4 C20,99.4 38,105.4 55,101.4 S88,96.4 100,103.4 V129.4 H0Z\" fill=\"#7cc95b\"/><path d=\"M0,112.4 C25,105.4 45,113.4 62,108.4 S90,104.4 100,110.4 V129.4 H0Z\" fill=\"#4fae3f\"/><path d=\"M6,104.66697498999626 v3.5200000000000005\" stroke=\"#2f8a3e\" stroke-width=\"0.31\"/><circle cx=\"6.66\" cy=\"104.67\" r=\"0.50\" fill=\"#ff8fab\"/><circle cx=\"6.20\" cy=\"105.29\" r=\"0.50\" fill=\"#ff8fab\"/><circle cx=\"5.47\" cy=\"105.05\" r=\"0.50\" fill=\"#ff8fab\"/><circle cx=\"5.47\" cy=\"104.28\" r=\"0.50\" fill=\"#ff8fab\"/><circle cx=\"6.20\" cy=\"104.04\" r=\"0.50\" fill=\"#ff8fab\"/><circle cx=\"6\" cy=\"104.66697498999626\" r=\"0.42\" fill=\"#ffd60a\"/><path d=\"M12,101.98701568485085 v3.5200000000000005\" stroke=\"#2f8a3e\" stroke-width=\"0.31\"/><circle cx=\"12.66\" cy=\"101.99\" r=\"0.50\" fill=\"#ffffff\"/><circle cx=\"12.20\" cy=\"102.61\" r=\"0.50\" fill=\"#ffffff\"/><circle cx=\"11.47\" cy=\"102.37\" r=\"0.50\" fill=\"#ffffff\"/><circle cx=\"11.47\" cy=\"101.60\" r=\"0.50\" fill=\"#ffffff\"/><circle cx=\"12.20\" cy=\"101.36\" r=\"0.50\" fill=\"#ffffff\"/><circle cx=\"12\" cy=\"101.98701568485085\" r=\"0.42\" fill=\"#ffd60a\"/><path d=\"M88,103.29686796313432 v3.5200000000000005\" stroke=\"#2f8a3e\" stroke-width=\"0.31\"/><circle cx=\"88.66\" cy=\"103.30\" r=\"0.50\" fill=\"#b8a1ff\"/><circle cx=\"88.20\" cy=\"103.92\" r=\"0.50\" fill=\"#b8a1ff\"/><circle cx=\"87.47\" cy=\"103.68\" r=\"0.50\" fill=\"#b8a1ff\"/><circle cx=\"87.47\" cy=\"102.91\" r=\"0.50\" fill=\"#b8a1ff\"/><circle cx=\"88.20\" cy=\"102.67\" r=\"0.50\" fill=\"#b8a1ff\"/><circle cx=\"88\" cy=\"103.29686796313432\" r=\"0.42\" fill=\"#ffd60a\"/><path d=\"M95,104.73007015099495 v3.5200000000000005\" stroke=\"#2f8a3e\" stroke-width=\"0.31\"/><circle cx=\"95.66\" cy=\"104.73\" r=\"0.50\" fill=\"#ff8fab\"/><circle cx=\"95.20\" cy=\"105.36\" r=\"0.50\" fill=\"#ff8fab\"/><circle cx=\"94.47\" cy=\"105.12\" r=\"0.50\" fill=\"#ff8fab\"/><circle cx=\"94.47\" cy=\"104.34\" r=\"0.50\" fill=\"#ff8fab\"/><circle cx=\"95.20\" cy=\"104.10\" r=\"0.50\" fill=\"#ff8fab\"/><circle cx=\"95\" cy=\"104.73007015099495\" r=\"0.42\" fill=\"#ffd60a\"/><path d=\"M50,103.84692365941078 v3.5200000000000005\" stroke=\"#2f8a3e\" stroke-width=\"0.31\"/><circle cx=\"50.66\" cy=\"103.85\" r=\"0.50\" fill=\"#ffffff\"/><circle cx=\"50.20\" cy=\"104.47\" r=\"0.50\" fill=\"#ffffff\"/><circle cx=\"49.47\" cy=\"104.23\" r=\"0.50\" fill=\"#ffffff\"/><circle cx=\"49.47\" cy=\"103.46\" r=\"0.50\" fill=\"#ffffff\"/><circle cx=\"50.20\" cy=\"103.22\" r=\"0.50\" fill=\"#ffffff\"/><circle cx=\"50\" cy=\"103.84692365941078\" r=\"0.42\" fill=\"#ffd60a\"/><circle cx=\"87.6\" cy=\"94.65\" r=\"1.6500000000000001\" fill=\"#f5b700\" stroke=\"#c98a00\" stroke-width=\"0.30\"/><circle cx=\"87.6\" cy=\"94.65\" r=\"0.9075000000000002\" fill=\"none\" stroke=\"#ffe27a\" stroke-width=\"0.20\"/><circle cx=\"90.0\" cy=\"93.6\" r=\"1.6500000000000001\" fill=\"#f5b700\" stroke=\"#c98a00\" stroke-width=\"0.30\"/><circle cx=\"90.0\" cy=\"93.6\" r=\"0.9075000000000002\" fill=\"none\" stroke=\"#ffe27a\" stroke-width=\"0.20\"/><circle cx=\"92.4\" cy=\"94.8\" r=\"1.6500000000000001\" fill=\"#f5b700\" stroke=\"#c98a00\" stroke-width=\"0.30\"/><circle cx=\"92.4\" cy=\"94.8\" r=\"0.9075000000000002\" fill=\"none\" stroke=\"#ffe27a\" stroke-width=\"0.20\"/><circle cx=\"89.1\" cy=\"93.15\" r=\"1.6500000000000001\" fill=\"#f5b700\" stroke=\"#c98a00\" stroke-width=\"0.30\"/><circle cx=\"89.1\" cy=\"93.15\" r=\"0.9075000000000002\" fill=\"none\" stroke=\"#ffe27a\" stroke-width=\"0.20\"/><circle cx=\"91.2\" cy=\"92.85\" r=\"1.6500000000000001\" fill=\"#f5b700\" stroke=\"#c98a00\" stroke-width=\"0.30\"/><circle cx=\"91.2\" cy=\"92.85\" r=\"0.9075000000000002\" fill=\"none\" stroke=\"#ffe27a\" stroke-width=\"0.20\"/><path d=\"M84.6,95.1 h10.8 q-.2,0.75 -0.8999999999999999,1.2000000000000002 q2.0999999999999996,3.3000000000000003 -0.6000000000000001,6.300000000000001 h-8.399999999999999 q-2.7,-3.0 -0.6000000000000001,-6.300000000000001 q-0.6000000000000001,-0.44999999999999996 -0.8999999999999999,-1.2000000000000002z\" fill=\"#1d2a24\"/><rect x=\"84.15\" y=\"94.35\" width=\"11.7\" height=\"1.7999999999999998\" rx=\"0.75\" fill=\"#2b3b33\"/></svg>", "win": "<svg viewBox=\"0 0 40 9\" preserveAspectRatio=\"xMidYMax slice\"><path d=\"M0,9 V7 C10,5 20,7.5 40,6 V9Z\" fill=\"#7cc95b\"/><path d=\"M10,3.2 v3.2\" stroke=\"#2f8a3e\" stroke-width=\"0.28\"/><circle cx=\"10.60\" cy=\"3.20\" r=\"0.45\" fill=\"#ff8fab\"/><circle cx=\"10.19\" cy=\"3.77\" r=\"0.45\" fill=\"#ff8fab\"/><circle cx=\"9.51\" cy=\"3.55\" r=\"0.45\" fill=\"#ff8fab\"/><circle cx=\"9.51\" cy=\"2.85\" r=\"0.45\" fill=\"#ff8fab\"/><circle cx=\"10.19\" cy=\"2.63\" r=\"0.45\" fill=\"#ff8fab\"/><circle cx=\"10\" cy=\"3.2\" r=\"0.38\" fill=\"#ffd60a\"/><path d=\"M20,2.6 v3.5200000000000005\" stroke=\"#2f8a3e\" stroke-width=\"0.31\"/><circle cx=\"20.66\" cy=\"2.60\" r=\"0.50\" fill=\"#b8a1ff\"/><circle cx=\"20.20\" cy=\"3.23\" r=\"0.50\" fill=\"#b8a1ff\"/><circle cx=\"19.47\" cy=\"2.99\" r=\"0.50\" fill=\"#b8a1ff\"/><circle cx=\"19.47\" cy=\"2.21\" r=\"0.50\" fill=\"#b8a1ff\"/><circle cx=\"20.20\" cy=\"1.97\" r=\"0.50\" fill=\"#b8a1ff\"/><circle cx=\"20\" cy=\"2.6\" r=\"0.42\" fill=\"#ffd60a\"/><path d=\"M30,3.4 v3.2\" stroke=\"#2f8a3e\" stroke-width=\"0.28\"/><circle cx=\"30.60\" cy=\"3.40\" r=\"0.45\" fill=\"#ffffff\"/><circle cx=\"30.19\" cy=\"3.97\" r=\"0.45\" fill=\"#ffffff\"/><circle cx=\"29.51\" cy=\"3.75\" r=\"0.45\" fill=\"#ffffff\"/><circle cx=\"29.51\" cy=\"3.05\" r=\"0.45\" fill=\"#ffffff\"/><circle cx=\"30.19\" cy=\"2.83\" r=\"0.45\" fill=\"#ffffff\"/><circle cx=\"30\" cy=\"3.4\" r=\"0.38\" fill=\"#ffd60a\"/><g transform=\"rotate(0 4 4.5)\"><circle cx=\"4.00\" cy=\"3.95\" r=\"0.50\" fill=\"#2fa84f\"/><circle cx=\"4.48\" cy=\"4.78\" r=\"0.50\" fill=\"#2fa84f\"/><circle cx=\"3.52\" cy=\"4.78\" r=\"0.50\" fill=\"#2fa84f\"/><path d=\"M4,4.5 q0.3,1.1 0.9,1.4\" stroke=\"#2fa84f\" stroke-width=\"0.22\" fill=\"none\" stroke-linecap=\"round\"/></g><g transform=\"rotate(0 36 4)\"><circle cx=\"36.00\" cy=\"3.45\" r=\"0.50\" fill=\"#2fa84f\"/><circle cx=\"36.48\" cy=\"4.28\" r=\"0.50\" fill=\"#2fa84f\"/><circle cx=\"35.52\" cy=\"4.28\" r=\"0.50\" fill=\"#2fa84f\"/><path d=\"M36,4 q0.3,1.1 0.9,1.4\" stroke=\"#2fa84f\" stroke-width=\"0.22\" fill=\"none\" stroke-linecap=\"round\"/></g></svg>", "sceneHstSq": "<svg class=\"fm-sky\" viewBox=\"0 0 100 100\" preserveAspectRatio=\"none\" aria-hidden=\"true\"><path d=\"M2.0,58 A48.0,48.0 0 0 1 98.0,58\" stroke=\"#ff4d4d\" stroke-width=\"2.5\" fill=\"none\"/><path d=\"M4.399999999999999,58 A45.6,45.6 0 0 1 95.6,58\" stroke=\"#ff9f1c\" stroke-width=\"2.5\" fill=\"none\"/><path d=\"M6.799999999999997,58 A43.2,43.2 0 0 1 93.2,58\" stroke=\"#ffd60a\" stroke-width=\"2.5\" fill=\"none\"/><path d=\"M9.200000000000003,58 A40.8,40.8 0 0 1 90.8,58\" stroke=\"#3fbf5f\" stroke-width=\"2.5\" fill=\"none\"/><path d=\"M11.600000000000001,58 A38.4,38.4 0 0 1 88.4,58\" stroke=\"#2ec4f1\" stroke-width=\"2.5\" fill=\"none\"/><path d=\"M14.0,58 A36.0,36.0 0 0 1 86.0,58\" stroke=\"#4a6cf7\" stroke-width=\"2.5\" fill=\"none\"/><path d=\"M16.4,58 A33.6,33.6 0 0 1 83.6,58\" stroke=\"#9b5de5\" stroke-width=\"2.5\" fill=\"none\"/><circle cx=\"0.96\" cy=\"57.08\" r=\"3.60\" fill=\"#fff\"/><circle cx=\"6.00\" cy=\"54.56\" r=\"4.86\" fill=\"#fff\"/><circle cx=\"11.04\" cy=\"56.90\" r=\"3.78\" fill=\"#fff\"/><circle cx=\"8.16\" cy=\"58.16\" r=\"3.24\" fill=\"#fff\"/><circle cx=\"3.84\" cy=\"58.34\" r=\"3.24\" fill=\"#fff\"/><circle cx=\"88.96\" cy=\"57.08\" r=\"3.60\" fill=\"#fff\"/><circle cx=\"94.00\" cy=\"54.56\" r=\"4.86\" fill=\"#fff\"/><circle cx=\"99.04\" cy=\"56.90\" r=\"3.78\" fill=\"#fff\"/><circle cx=\"96.16\" cy=\"58.16\" r=\"3.24\" fill=\"#fff\"/><circle cx=\"91.84\" cy=\"58.34\" r=\"3.24\" fill=\"#fff\"/><circle cx=\"27.48\" cy=\"9.54\" r=\"1.80\" fill=\"#fff\"/><circle cx=\"30.00\" cy=\"8.28\" r=\"2.43\" fill=\"#fff\"/><circle cx=\"32.52\" cy=\"9.45\" r=\"1.89\" fill=\"#fff\"/><circle cx=\"31.08\" cy=\"10.08\" r=\"1.62\" fill=\"#fff\"/><circle cx=\"28.92\" cy=\"10.17\" r=\"1.62\" fill=\"#fff\"/><circle cx=\"75.90\" cy=\"6.45\" r=\"1.50\" fill=\"#fff\"/><circle cx=\"78.00\" cy=\"5.40\" r=\"2.03\" fill=\"#fff\"/><circle cx=\"80.10\" cy=\"6.38\" r=\"1.58\" fill=\"#fff\"/><circle cx=\"78.90\" cy=\"6.90\" r=\"1.35\" fill=\"#fff\"/><circle cx=\"77.10\" cy=\"6.97\" r=\"1.35\" fill=\"#fff\"/><g transform=\"rotate(-20 3 66)\"><circle cx=\"3.00\" cy=\"65.06\" r=\"0.85\" fill=\"#2fa84f\"/><circle cx=\"3.81\" cy=\"66.47\" r=\"0.85\" fill=\"#2fa84f\"/><circle cx=\"2.19\" cy=\"66.47\" r=\"0.85\" fill=\"#2fa84f\"/><path d=\"M3,66 q0.51,1.87 1.53,2.38\" stroke=\"#2fa84f\" stroke-width=\"0.37\" fill=\"none\" stroke-linecap=\"round\"/></g><g transform=\"rotate(10 50 90)\"><circle cx=\"50.00\" cy=\"89.17\" r=\"0.75\" fill=\"#2fa84f\"/><circle cx=\"50.71\" cy=\"90.41\" r=\"0.75\" fill=\"#2fa84f\"/><circle cx=\"49.29\" cy=\"90.41\" r=\"0.75\" fill=\"#2fa84f\"/><path d=\"M50,90 q0.44999999999999996,1.6500000000000001 1.35,2.0999999999999996\" stroke=\"#2fa84f\" stroke-width=\"0.33\" fill=\"none\" stroke-linecap=\"round\"/></g><g transform=\"rotate(20 96 94)\"><circle cx=\"96.00\" cy=\"93.12\" r=\"0.80\" fill=\"#2fa84f\"/><circle cx=\"96.76\" cy=\"94.44\" r=\"0.80\" fill=\"#2fa84f\"/><circle cx=\"95.24\" cy=\"94.44\" r=\"0.80\" fill=\"#2fa84f\"/><path d=\"M96,94 q0.48,1.7600000000000002 1.4400000000000002,2.2399999999999998\" stroke=\"#2fa84f\" stroke-width=\"0.35\" fill=\"none\" stroke-linecap=\"round\"/></g><g transform=\"rotate(-10 30 97)\"><circle cx=\"30.00\" cy=\"96.28\" r=\"0.65\" fill=\"#2fa84f\"/><circle cx=\"30.62\" cy=\"97.36\" r=\"0.65\" fill=\"#2fa84f\"/><circle cx=\"29.38\" cy=\"97.36\" r=\"0.65\" fill=\"#2fa84f\"/><path d=\"M30,97 q0.39,1.4300000000000002 1.1700000000000002,1.8199999999999998\" stroke=\"#2fa84f\" stroke-width=\"0.29\" fill=\"none\" stroke-linecap=\"round\"/></g><g transform=\"rotate(15 72 99)\"><circle cx=\"72.00\" cy=\"98.23\" r=\"0.70\" fill=\"#2fa84f\"/><circle cx=\"72.67\" cy=\"99.39\" r=\"0.70\" fill=\"#2fa84f\"/><circle cx=\"71.33\" cy=\"99.39\" r=\"0.70\" fill=\"#2fa84f\"/><path d=\"M72,99 q0.42,1.54 1.26,1.9599999999999997\" stroke=\"#2fa84f\" stroke-width=\"0.31\" fill=\"none\" stroke-linecap=\"round\"/></g><path d=\"M0,78 C20,70 38,76 55,72 S88,67 100,74 V100 H0Z\" fill=\"#7cc95b\"/><path d=\"M0,83 C25,76 45,84 62,79 S90,75 100,81 V100 H0Z\" fill=\"#4fae3f\"/><path d=\"M6,74.3687050846691 v3.5200000000000005\" stroke=\"#2f8a3e\" stroke-width=\"0.31\"/><circle cx=\"6.66\" cy=\"74.37\" r=\"0.50\" fill=\"#ff8fab\"/><circle cx=\"6.20\" cy=\"75.00\" r=\"0.50\" fill=\"#ff8fab\"/><circle cx=\"5.47\" cy=\"74.76\" r=\"0.50\" fill=\"#ff8fab\"/><circle cx=\"5.47\" cy=\"73.98\" r=\"0.50\" fill=\"#ff8fab\"/><circle cx=\"6.20\" cy=\"73.74\" r=\"0.50\" fill=\"#ff8fab\"/><circle cx=\"6\" cy=\"74.3687050846691\" r=\"0.42\" fill=\"#ffd60a\"/><path d=\"M12,74.7253609677822 v3.5200000000000005\" stroke=\"#2f8a3e\" stroke-width=\"0.31\"/><circle cx=\"12.66\" cy=\"74.73\" r=\"0.50\" fill=\"#ffffff\"/><circle cx=\"12.20\" cy=\"75.35\" r=\"0.50\" fill=\"#ffffff\"/><circle cx=\"11.47\" cy=\"75.11\" r=\"0.50\" fill=\"#ffffff\"/><circle cx=\"11.47\" cy=\"74.34\" r=\"0.50\" fill=\"#ffffff\"/><circle cx=\"12.20\" cy=\"74.10\" r=\"0.50\" fill=\"#ffffff\"/><circle cx=\"12\" cy=\"74.7253609677822\" r=\"0.42\" fill=\"#ffd60a\"/><path d=\"M88,74.88558069669709 v3.5200000000000005\" stroke=\"#2f8a3e\" stroke-width=\"0.31\"/><circle cx=\"88.66\" cy=\"74.89\" r=\"0.50\" fill=\"#b8a1ff\"/><circle cx=\"88.20\" cy=\"75.51\" r=\"0.50\" fill=\"#b8a1ff\"/><circle cx=\"87.47\" cy=\"75.27\" r=\"0.50\" fill=\"#b8a1ff\"/><circle cx=\"87.47\" cy=\"74.50\" r=\"0.50\" fill=\"#b8a1ff\"/><circle cx=\"88.20\" cy=\"74.26\" r=\"0.50\" fill=\"#b8a1ff\"/><circle cx=\"88\" cy=\"74.88558069669709\" r=\"0.42\" fill=\"#ffd60a\"/><path d=\"M95,75.32735085133115 v3.5200000000000005\" stroke=\"#2f8a3e\" stroke-width=\"0.31\"/><circle cx=\"95.66\" cy=\"75.33\" r=\"0.50\" fill=\"#ff8fab\"/><circle cx=\"95.20\" cy=\"75.96\" r=\"0.50\" fill=\"#ff8fab\"/><circle cx=\"94.47\" cy=\"75.72\" r=\"0.50\" fill=\"#ff8fab\"/><circle cx=\"94.47\" cy=\"74.94\" r=\"0.50\" fill=\"#ff8fab\"/><circle cx=\"95.20\" cy=\"74.70\" r=\"0.50\" fill=\"#ff8fab\"/><circle cx=\"95\" cy=\"75.32735085133115\" r=\"0.42\" fill=\"#ffd60a\"/><path d=\"M50,74.71969572421979 v3.5200000000000005\" stroke=\"#2f8a3e\" stroke-width=\"0.31\"/><circle cx=\"50.66\" cy=\"74.72\" r=\"0.50\" fill=\"#ffffff\"/><circle cx=\"50.20\" cy=\"75.35\" r=\"0.50\" fill=\"#ffffff\"/><circle cx=\"49.47\" cy=\"75.11\" r=\"0.50\" fill=\"#ffffff\"/><circle cx=\"49.47\" cy=\"74.33\" r=\"0.50\" fill=\"#ffffff\"/><circle cx=\"50.20\" cy=\"74.09\" r=\"0.50\" fill=\"#ffffff\"/><circle cx=\"50\" cy=\"74.71969572421979\" r=\"0.42\" fill=\"#ffd60a\"/><circle cx=\"85.44\" cy=\"45.56\" r=\"1.7600000000000002\" fill=\"#f5b700\" stroke=\"#c98a00\" stroke-width=\"0.32\"/><circle cx=\"85.44\" cy=\"45.56\" r=\"0.9680000000000002\" fill=\"none\" stroke=\"#ffe27a\" stroke-width=\"0.21\"/><circle cx=\"88.0\" cy=\"44.44\" r=\"1.7600000000000002\" fill=\"#f5b700\" stroke=\"#c98a00\" stroke-width=\"0.32\"/><circle cx=\"88.0\" cy=\"44.44\" r=\"0.9680000000000002\" fill=\"none\" stroke=\"#ffe27a\" stroke-width=\"0.21\"/><circle cx=\"90.56\" cy=\"45.72\" r=\"1.7600000000000002\" fill=\"#f5b700\" stroke=\"#c98a00\" stroke-width=\"0.32\"/><circle cx=\"90.56\" cy=\"45.72\" r=\"0.9680000000000002\" fill=\"none\" stroke=\"#ffe27a\" stroke-width=\"0.21\"/><circle cx=\"87.04\" cy=\"43.96\" r=\"1.7600000000000002\" fill=\"#f5b700\" stroke=\"#c98a00\" stroke-width=\"0.32\"/><circle cx=\"87.04\" cy=\"43.96\" r=\"0.9680000000000002\" fill=\"none\" stroke=\"#ffe27a\" stroke-width=\"0.21\"/><circle cx=\"89.28\" cy=\"43.64\" r=\"1.7600000000000002\" fill=\"#f5b700\" stroke=\"#c98a00\" stroke-width=\"0.32\"/><circle cx=\"89.28\" cy=\"43.64\" r=\"0.9680000000000002\" fill=\"none\" stroke=\"#ffe27a\" stroke-width=\"0.21\"/><path d=\"M82.24,46.04 h11.520000000000001 q-.2,0.8 -0.96,1.2800000000000002 q2.2399999999999998,3.5200000000000005 -0.6400000000000001,6.720000000000001 h-8.959999999999999 q-2.8800000000000003,-3.2 -0.6400000000000001,-6.720000000000001 q-0.6400000000000001,-0.48 -0.96,-1.2800000000000002z\" fill=\"#1d2a24\"/><rect x=\"81.76\" y=\"45.24\" width=\"12.48\" height=\"1.92\" rx=\"0.8\" fill=\"#2b3b33\"/></svg>", "scenePartnerSq": "<svg class=\"fm-sky\" viewBox=\"0 0 100 100\" preserveAspectRatio=\"none\" aria-hidden=\"true\"><path d=\"M2.0,58 A48.0,48.0 0 0 1 98.0,58\" stroke=\"#ff4d4d\" stroke-width=\"2.5\" fill=\"none\"/><path d=\"M4.399999999999999,58 A45.6,45.6 0 0 1 95.6,58\" stroke=\"#ff9f1c\" stroke-width=\"2.5\" fill=\"none\"/><path d=\"M6.799999999999997,58 A43.2,43.2 0 0 1 93.2,58\" stroke=\"#ffd60a\" stroke-width=\"2.5\" fill=\"none\"/><path d=\"M9.200000000000003,58 A40.8,40.8 0 0 1 90.8,58\" stroke=\"#3fbf5f\" stroke-width=\"2.5\" fill=\"none\"/><path d=\"M11.600000000000001,58 A38.4,38.4 0 0 1 88.4,58\" stroke=\"#2ec4f1\" stroke-width=\"2.5\" fill=\"none\"/><path d=\"M14.0,58 A36.0,36.0 0 0 1 86.0,58\" stroke=\"#4a6cf7\" stroke-width=\"2.5\" fill=\"none\"/><path d=\"M16.4,58 A33.6,33.6 0 0 1 83.6,58\" stroke=\"#9b5de5\" stroke-width=\"2.5\" fill=\"none\"/><circle cx=\"0.96\" cy=\"57.08\" r=\"3.60\" fill=\"#fff\"/><circle cx=\"6.00\" cy=\"54.56\" r=\"4.86\" fill=\"#fff\"/><circle cx=\"11.04\" cy=\"56.90\" r=\"3.78\" fill=\"#fff\"/><circle cx=\"8.16\" cy=\"58.16\" r=\"3.24\" fill=\"#fff\"/><circle cx=\"3.84\" cy=\"58.34\" r=\"3.24\" fill=\"#fff\"/><circle cx=\"88.96\" cy=\"57.08\" r=\"3.60\" fill=\"#fff\"/><circle cx=\"94.00\" cy=\"54.56\" r=\"4.86\" fill=\"#fff\"/><circle cx=\"99.04\" cy=\"56.90\" r=\"3.78\" fill=\"#fff\"/><circle cx=\"96.16\" cy=\"58.16\" r=\"3.24\" fill=\"#fff\"/><circle cx=\"91.84\" cy=\"58.34\" r=\"3.24\" fill=\"#fff\"/><circle cx=\"27.48\" cy=\"9.54\" r=\"1.80\" fill=\"#fff\"/><circle cx=\"30.00\" cy=\"8.28\" r=\"2.43\" fill=\"#fff\"/><circle cx=\"32.52\" cy=\"9.45\" r=\"1.89\" fill=\"#fff\"/><circle cx=\"31.08\" cy=\"10.08\" r=\"1.62\" fill=\"#fff\"/><circle cx=\"28.92\" cy=\"10.17\" r=\"1.62\" fill=\"#fff\"/><circle cx=\"75.90\" cy=\"6.45\" r=\"1.50\" fill=\"#fff\"/><circle cx=\"78.00\" cy=\"5.40\" r=\"2.03\" fill=\"#fff\"/><circle cx=\"80.10\" cy=\"6.38\" r=\"1.58\" fill=\"#fff\"/><circle cx=\"78.90\" cy=\"6.90\" r=\"1.35\" fill=\"#fff\"/><circle cx=\"77.10\" cy=\"6.97\" r=\"1.35\" fill=\"#fff\"/><g transform=\"rotate(-20 4 46)\"><circle cx=\"4.00\" cy=\"45.12\" r=\"0.80\" fill=\"#2fa84f\"/><circle cx=\"4.76\" cy=\"46.44\" r=\"0.80\" fill=\"#2fa84f\"/><circle cx=\"3.24\" cy=\"46.44\" r=\"0.80\" fill=\"#2fa84f\"/><path d=\"M4,46 q0.48,1.7600000000000002 1.4400000000000002,2.2399999999999998\" stroke=\"#2fa84f\" stroke-width=\"0.35\" fill=\"none\" stroke-linecap=\"round\"/></g><g transform=\"rotate(20 96 45)\"><circle cx=\"96.00\" cy=\"44.17\" r=\"0.75\" fill=\"#2fa84f\"/><circle cx=\"96.71\" cy=\"45.41\" r=\"0.75\" fill=\"#2fa84f\"/><circle cx=\"95.29\" cy=\"45.41\" r=\"0.75\" fill=\"#2fa84f\"/><path d=\"M96,45 q0.44999999999999996,1.6500000000000001 1.35,2.0999999999999996\" stroke=\"#2fa84f\" stroke-width=\"0.33\" fill=\"none\" stroke-linecap=\"round\"/></g><g transform=\"rotate(0 50 59)\"><circle cx=\"50.00\" cy=\"58.23\" r=\"0.70\" fill=\"#2fa84f\"/><circle cx=\"50.67\" cy=\"59.38\" r=\"0.70\" fill=\"#2fa84f\"/><circle cx=\"49.33\" cy=\"59.38\" r=\"0.70\" fill=\"#2fa84f\"/><path d=\"M50,59 q0.42,1.54 1.26,1.9599999999999997\" stroke=\"#2fa84f\" stroke-width=\"0.31\" fill=\"none\" stroke-linecap=\"round\"/></g><g transform=\"rotate(10 3 104)\"><circle cx=\"3.00\" cy=\"103.17\" r=\"0.75\" fill=\"#2fa84f\"/><circle cx=\"3.71\" cy=\"104.41\" r=\"0.75\" fill=\"#2fa84f\"/><circle cx=\"2.29\" cy=\"104.41\" r=\"0.75\" fill=\"#2fa84f\"/><path d=\"M3,104 q0.44999999999999996,1.6500000000000001 1.35,2.0999999999999996\" stroke=\"#2fa84f\" stroke-width=\"0.33\" fill=\"none\" stroke-linecap=\"round\"/></g><g transform=\"rotate(-15 64 106)\"><circle cx=\"64.00\" cy=\"105.28\" r=\"0.65\" fill=\"#2fa84f\"/><circle cx=\"64.62\" cy=\"106.36\" r=\"0.65\" fill=\"#2fa84f\"/><circle cx=\"63.38\" cy=\"106.36\" r=\"0.65\" fill=\"#2fa84f\"/><path d=\"M64,106 q0.39,1.4300000000000002 1.1700000000000002,1.8199999999999998\" stroke=\"#2fa84f\" stroke-width=\"0.29\" fill=\"none\" stroke-linecap=\"round\"/></g><path d=\"M0,78 C20,70 38,76 55,72 S88,67 100,74 V100 H0Z\" fill=\"#7cc95b\"/><path d=\"M0,83 C25,76 45,84 62,79 S90,75 100,81 V100 H0Z\" fill=\"#4fae3f\"/><path d=\"M6,75.26697498999626 v3.5200000000000005\" stroke=\"#2f8a3e\" stroke-width=\"0.31\"/><circle cx=\"6.66\" cy=\"75.27\" r=\"0.50\" fill=\"#ff8fab\"/><circle cx=\"6.20\" cy=\"75.89\" r=\"0.50\" fill=\"#ff8fab\"/><circle cx=\"5.47\" cy=\"75.65\" r=\"0.50\" fill=\"#ff8fab\"/><circle cx=\"5.47\" cy=\"74.88\" r=\"0.50\" fill=\"#ff8fab\"/><circle cx=\"6.20\" cy=\"74.64\" r=\"0.50\" fill=\"#ff8fab\"/><circle cx=\"6\" cy=\"75.26697498999626\" r=\"0.42\" fill=\"#ffd60a\"/><path d=\"M12,72.58701568485084 v3.5200000000000005\" stroke=\"#2f8a3e\" stroke-width=\"0.31\"/><circle cx=\"12.66\" cy=\"72.59\" r=\"0.50\" fill=\"#ffffff\"/><circle cx=\"12.20\" cy=\"73.21\" r=\"0.50\" fill=\"#ffffff\"/><circle cx=\"11.47\" cy=\"72.97\" r=\"0.50\" fill=\"#ffffff\"/><circle cx=\"11.47\" cy=\"72.20\" r=\"0.50\" fill=\"#ffffff\"/><circle cx=\"12.20\" cy=\"71.96\" r=\"0.50\" fill=\"#ffffff\"/><circle cx=\"12\" cy=\"72.58701568485084\" r=\"0.42\" fill=\"#ffd60a\"/><path d=\"M88,73.89686796313431 v3.5200000000000005\" stroke=\"#2f8a3e\" stroke-width=\"0.31\"/><circle cx=\"88.66\" cy=\"73.90\" r=\"0.50\" fill=\"#b8a1ff\"/><circle cx=\"88.20\" cy=\"74.52\" r=\"0.50\" fill=\"#b8a1ff\"/><circle cx=\"87.47\" cy=\"74.28\" r=\"0.50\" fill=\"#b8a1ff\"/><circle cx=\"87.47\" cy=\"73.51\" r=\"0.50\" fill=\"#b8a1ff\"/><circle cx=\"88.20\" cy=\"73.27\" r=\"0.50\" fill=\"#b8a1ff\"/><circle cx=\"88\" cy=\"73.89686796313431\" r=\"0.42\" fill=\"#ffd60a\"/><path d=\"M95,75.33007015099494 v3.5200000000000005\" stroke=\"#2f8a3e\" stroke-width=\"0.31\"/><circle cx=\"95.66\" cy=\"75.33\" r=\"0.50\" fill=\"#ff8fab\"/><circle cx=\"95.20\" cy=\"75.96\" r=\"0.50\" fill=\"#ff8fab\"/><circle cx=\"94.47\" cy=\"75.72\" r=\"0.50\" fill=\"#ff8fab\"/><circle cx=\"94.47\" cy=\"74.94\" r=\"0.50\" fill=\"#ff8fab\"/><circle cx=\"95.20\" cy=\"74.70\" r=\"0.50\" fill=\"#ff8fab\"/><circle cx=\"95\" cy=\"75.33007015099494\" r=\"0.42\" fill=\"#ffd60a\"/><path d=\"M50,74.44692365941077 v3.5200000000000005\" stroke=\"#2f8a3e\" stroke-width=\"0.31\"/><circle cx=\"50.66\" cy=\"74.45\" r=\"0.50\" fill=\"#ffffff\"/><circle cx=\"50.20\" cy=\"75.07\" r=\"0.50\" fill=\"#ffffff\"/><circle cx=\"49.47\" cy=\"74.83\" r=\"0.50\" fill=\"#ffffff\"/><circle cx=\"49.47\" cy=\"74.06\" r=\"0.50\" fill=\"#ffffff\"/><circle cx=\"50.20\" cy=\"73.82\" r=\"0.50\" fill=\"#ffffff\"/><circle cx=\"50\" cy=\"74.44692365941077\" r=\"0.42\" fill=\"#ffd60a\"/><circle cx=\"87.6\" cy=\"94.65\" r=\"1.6500000000000001\" fill=\"#f5b700\" stroke=\"#c98a00\" stroke-width=\"0.30\"/><circle cx=\"87.6\" cy=\"94.65\" r=\"0.9075000000000002\" fill=\"none\" stroke=\"#ffe27a\" stroke-width=\"0.20\"/><circle cx=\"90.0\" cy=\"93.6\" r=\"1.6500000000000001\" fill=\"#f5b700\" stroke=\"#c98a00\" stroke-width=\"0.30\"/><circle cx=\"90.0\" cy=\"93.6\" r=\"0.9075000000000002\" fill=\"none\" stroke=\"#ffe27a\" stroke-width=\"0.20\"/><circle cx=\"92.4\" cy=\"94.8\" r=\"1.6500000000000001\" fill=\"#f5b700\" stroke=\"#c98a00\" stroke-width=\"0.30\"/><circle cx=\"92.4\" cy=\"94.8\" r=\"0.9075000000000002\" fill=\"none\" stroke=\"#ffe27a\" stroke-width=\"0.20\"/><circle cx=\"89.1\" cy=\"93.15\" r=\"1.6500000000000001\" fill=\"#f5b700\" stroke=\"#c98a00\" stroke-width=\"0.30\"/><circle cx=\"89.1\" cy=\"93.15\" r=\"0.9075000000000002\" fill=\"none\" stroke=\"#ffe27a\" stroke-width=\"0.20\"/><circle cx=\"91.2\" cy=\"92.85\" r=\"1.6500000000000001\" fill=\"#f5b700\" stroke=\"#c98a00\" stroke-width=\"0.30\"/><circle cx=\"91.2\" cy=\"92.85\" r=\"0.9075000000000002\" fill=\"none\" stroke=\"#ffe27a\" stroke-width=\"0.20\"/><path d=\"M84.6,95.1 h10.8 q-.2,0.75 -0.8999999999999999,1.2000000000000002 q2.0999999999999996,3.3000000000000003 -0.6000000000000001,6.300000000000001 h-8.399999999999999 q-2.7,-3.0 -0.6000000000000001,-6.300000000000001 q-0.6000000000000001,-0.44999999999999996 -0.8999999999999999,-1.2000000000000002z\" fill=\"#1d2a24\"/><rect x=\"84.15\" y=\"94.35\" width=\"11.7\" height=\"1.7999999999999998\" rx=\"0.75\" fill=\"#2b3b33\"/></svg>"}};
  var MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  var MON3 = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var DOW = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  var ZONES = [
    { label: 'American Samoa', off: -11 }, { label: 'Hawaiʻi', off: -10, home: true }, { label: 'Palau', off: 9 },
    { label: 'Guam &amp; CNMI', off: 10 }, { label: 'Yap &amp; Chuuk', off: 10 }, { label: 'Pohnpei &amp; Kosrae', off: 11 },
    { label: 'Marshall Islands', off: 12 }
  ];
  function esc(s) { return String(s == null ? '' : s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
  // A session instant in a zone: build the HST wall time as UTC then shift.
  function zoned(dateStr, hhmm, off) {
    var p = dateStr.split('-').map(Number), t = hhmm.split(':').map(Number);
    var ms = Date.UTC(p[0], p[1]-1, p[2], t[0], t[1]) + 10*3600e3 + off*3600e3;
    return new Date(ms);
  }
  function hm(d) { var h = d.getUTCHours(), m = d.getUTCMinutes(); return { h: h, m: m, ap: h >= 12 ? 'PM' : 'AM', h12: (h % 12) || 12 }; }
  function clock(x, withMin) { return x.h12 + ((withMin || x.m) ? ':' + String(x.m).padStart(2,'0') : ''); }
  function range(a, b, full) { // "5:00–6:00 PM" (full) or "5–6 PM"
    var A1 = hm(a), B1 = hm(b);
    if (A1.ap === B1.ap) return clock(A1, full) + '–' + clock(B1, full) + ' ' + B1.ap;
    return clock(A1, full) + ' ' + A1.ap + '–' + clock(B1, full) + ' ' + B1.ap;
  }
  function zoneRows(sessions) {
    return ZONES.map(function (z) {
      var st = sessions.map(function (s) { return zoned(s.date, s.start, z.off); });
      var en = sessions.map(function (s) { return zoned(s.date, s.end, z.off); });
      var sameDow = st.every(function (d) { return d.getUTCDay() === st[0].getUTCDay(); });
      var md = st.map(function (d) { return (d.getUTCMonth()+1) + '/' + d.getUTCDate(); });
      var days = sameDow ? DOW[st[0].getUTCDay()] + ' ' + md.join(' &amp; ') : st.map(function (d, i) { return DOW[d.getUTCDay()] + ' ' + md[i]; }).join(' &amp; ');
      var times = st.map(function (d, i) { return range(d, en[i], false); });
      var same = times.every(function (t) { return t === times[0]; });
      return { label: z.label, home: !!z.home, days: days, time: same ? times[0] : times.join(' / ') };
    });
  }
  function sessInfo(s) {
    var a = zoned(s.date, s.start, -10), b = zoned(s.date, s.end, -10);
    return { dow: DOW[a.getUTCDay()], mon: MON3[a.getUTCMonth()], monFull: MONTHS[a.getUTCMonth()], day: a.getUTCDate(),
             time: range(a, b, true) + ' HST', lesson: esc(s.lesson), desc: esc(s.desc || '') };
  }
  function seriesTitle(series) { var w = esc(series || 'Learning Labs').split(' '); var last = w.pop(); return (w.length ? w.join(' ') + ' ' : '') + '<span>' + last + '</span>'; }
  function badges(spec, partner) {
    var b = (spec.sponsors || []).slice(); if (partner && b.indexOf('Pacific Island Partners') < 0) b.push('Pacific Island Partners');
    if (!partner && b.indexOf('Zoom') < 0) b.push('Zoom');
    return b.slice(0, 3).map(function (x) { return '<span>' + esc(x) + '</span>'; }).join('');
  }
  function qrImg(spec, partner) { var u = partner ? spec.qrPartner : spec.qrHst; return u ? '<img src="' + u + '" alt="QR">' : '<span>QR</span>'; }
  function phone(partner) { return partner ? '+1 808-536-9684' : '808-536-9684'; }

  /* ---------------- January: midnight New Year's Eve ---------------- */
  function jan(spec, partner, sq) {
    var S = spec.sessions.map(sessInfo), yr = String(spec.year), mon = MONTHS[spec.month-1].toUpperCase();
    var logo = partner ? '<div class="fl-logo pip"><img src="' + spec.pipUrl + '" alt=""></div>' : '<div class="fl-logo"><img src="' + spec.logoUrl + '" alt=""></div>';
    var sky = sq ? (partner ? A.jan.skyPartnerSq : A.jan.skyHstSq) : (partner ? A.jan.skyPartner : A.jan.skyHst);
    var head = sky + logo + '<div class="fl-kick">' + (partner ? 'FOR FAMILIES ACROSS THE PACIFIC' : 'PARENT TRAINING &amp; INFORMATION CENTER') + '</div>'
      + '<div class="fl-ll">' + seriesTitle(spec.series) + '</div>';
    var foot = A.jan.wave + '<div class="fl-foot"><div class="rg"><b>REGISTER at <span>LDAHawaii.org</span></b>Get your Zoom link, scan the QR code, or call ' + phone(partner) + '</div><div class="fl-qr">' + qrImg(spec, partner) + '</div><div class="fl-lg">' + badges(spec, partner) + '</div></div>';
    if (!partner) {
      var t = S.map(function (s, i) {
        return '<div class="tix t' + (i+1) + (S.length === 1 ? ' solo' : '') + (s.lesson.length > 26 ? ' long' : '') + '"><span class="tab">TICKET ' + (i+1) + '</span><div class="dd">' + s.dow + '., ' + s.mon + ' ' + s.day + '</div><div class="tt2">' + s.time + '</div><div class="ti">' + s.lesson + '</div>' + (s.desc ? '<div class="bl"><b>✦</b> ' + s.desc + '</div>' : '') + '</div>';
      }).join('');
      return '<div class="flyer' + (sq ? ' sq' : '') + '">' + head + '<div class="fl-happy">Happy New Year!</div><div class="fl-year">' + yr.slice(0,2) + '<i>' + yr.slice(2) + '</i></div>'
        + '<div class="fl-month">' + mon + ' · FOR PARENTS</div><div class="stick s-hst">ALL ON<br>ZOOM!<br><small>Level up</small></div>' + t
        + (sq ? '' : '<div class="fl-tag">New year, new skills. Building Leaders in Parents creates a community of voices.</div>') + foot + '</div>';
    }
    var tags = S.map(function (s, i) { return '<div class="ltag l' + (i+1) + (S.length === 1 ? ' solo' : '') + (s.lesson.length > 26 ? ' long' : '') + '"><div class="n">LESSON ' + (i+1) + '</div><div class="ti">' + s.lesson + '</div>' + (s.desc ? '<div class="bl">' + s.desc + '</div>' : '') + '</div>'; }).join('');
    var pos = sq ? [[6,54.5],[29,56],[52,54.5],[75,56],[17.5,69],[40.5,70.5],[63.5,69]] : [[6,76.5],[29.5,78],[53,76.5],[76.5,78],[17.75,93.5],[41.5,94.5],[65.25,93.5]];
    var hand = '<svg class="hand" viewBox="0 0 20 20"><circle cx="10" cy="10" r="8.5" fill="none" stroke="#3fd8ec" stroke-width="2"/><path d="M10 10 V4.5 M10 10 L14 12" stroke="#1b1f5e" stroke-width="2" stroke-linecap="round"/></svg>';
    var clocks = zoneRows(spec.sessions).map(function (r, i) { return '<div class="clk' + (r.home ? ' h' : '') + '" style="left:' + pos[i][0] + 'cqw;top:' + pos[i][1] + 'cqw">' + hand + '<div class="i">' + r.label + '</div><div class="d">' + r.days + '</div><div class="t">' + r.time + '</div></div>'; }).join('');
    return '<div class="flyer' + (sq ? ' sq' : '') + ' partner">' + head + '<div class="fl-happy p-happy">Happy New Year!</div><div class="fl-year p-year">' + yr.slice(0,2) + '<i>' + yr.slice(2) + '</i></div>'
      + '<div class="fl-month p-month">' + mon + ' · ON ZOOM</div>' + tags
      + '<div class="clk-h">What time is it where you are?</div>' + (sq ? '' : '<div class="clk-s">' + (S.length > 1 ? 'BOTH LESSONS' : 'LESSON') + ' · YOUR LOCAL TIME</div>') + clocks + foot + '</div>';
  }

  /* ---------------- February: Valentine card ---------------- */
  function feb(spec, partner, sq) {
    var S = spec.sessions.map(sessInfo), F = A.feb;
    var ov = sq ? (partner ? F.ovPartnerSq : F.ovHstSq) : (partner ? F.ovPartner : F.ovHst);
    function ch(x, y, w, uri, inner, cls, rot) { return '<div class="ch ' + cls + '" style="left:' + x + 'cqw;top:' + y + 'cqw;width:' + w + 'cqw;height:' + (w*.9).toFixed(1) + 'cqw;background-image:url(&quot;' + uri + '&quot;);transform:rotate(' + rot + 'deg)">' + inner + '</div>'; }
    var band = '<div class="fb-ribbon">REGISTER at <span>LDAHawaii.org</span></div><div class="fb-band"><div class="rg"><b>Get your Zoom link</b>, scan the QR code,<br>or call ' + phone(partner) + '</div><div class="fb-qr">' + qrImg(spec, partner) + '</div><div class="fb-lg">' + badges(spec, partner) + '</div></div>';
    var doily = partner ? '<div class="fb-doily pip"><img src="' + spec.pipUrl + '" alt=""></div>' : '<div class="fb-doily"><img src="' + spec.logoUrl + '" alt=""></div>';
    var month = MONTHS[spec.month-1];
    if (!partner) {
      var heart = '<div class="fb-heart hh" style="background-image:url(&quot;' + F.heartPink + '&quot;)"><div class="hin"><div class="k">PARENT TRAINING &amp; INFORMATION CENTER</div><div class="t">' + esc(spec.series || 'Learning Labs') + '</div><div class="m">' + month + '</div><div class="y">' + spec.year + '</div><div class="sub">Leadership training for parents</div></div></div>';
      var cpos = sq ? [[64,30,15,0,'BE<br>HEARD',-10],[82,34,14,1,'ZOOM<br>IN',10],[62,6,15,5,'KNOW<br>YOUR<br>RIGHTS',-4]] : [[3,43,17,0,'BE<br>HEARD',-12],[81,44,16,1,'ZOOM<br>IN',10],[84,9,13,2,'XO<br>IEP',14],[2.5,24,18,5,'KNOW<br>YOUR<br>RIGHTS',-6]];
      var candies = cpos.map(function (c) { return ch(c[0], c[1], c[2], F.candy[c[3]], c[4], 'w', c[5]); }).join('');
      var envs = S.map(function (s, i) { return '<div class="env e' + (i+1) + (S.length === 1 ? ' solo' : '') + '"><div class="back"></div><div class="letter"><div class="to">You\'re invited!</div><div class="dd">' + s.dow + '., ' + s.mon + ' ' + s.day + '</div><div class="tm">' + s.time + '</div><div class="ti">' + s.lesson + '</div></div><div class="front"></div><div class="seal"></div></div>'; }).join('');
      return '<div class="fb' + (sq ? ' sq' : '') + '">' + ov + doily + heart + candies + envs + band + '</div>';
    }
    var lessons = S.map(function (s, i) { return '<b style="color:#ffe066">' + (i+1) + '</b> ' + s.lesson; }).join('<br>');
    var heart2 = '<div class="fb-heart hp" style="background-image:url(&quot;' + F.heartPink + '&quot;)"><div class="hin"><div class="k">FOR FAMILIES ACROSS THE PACIFIC</div><div class="t">' + esc(spec.series || 'Learning Labs') + '</div><div class="m">' + month + '</div><div class="y">' + spec.year + ' · ON ZOOM</div><div class="sub">' + lessons + '</div></div></div>';
    var pos = sq ? [[3,47,22,-8],[26.5,45,22,5],[50,47,22,-4],[73.5,45,22,8],[14.5,65,22,6],[38,66.5,22,-6],[61.5,65,22,4]]
                 : [[5,73.5,21,-8],[28,71.5,21,5],[51,73.5,21,-4],[74,71.5,21,8],[16.5,89,21,6],[39.5,90.5,21,-6],[62.5,89,21,4]];
    var cols = [0,3,1,4,5,2,6];
    var hearts = zoneRows(spec.sessions).map(function (r, i) { var p = pos[i]; return ch(p[0], p[1], p[2], r.home ? F.candy[3] : F.candy[cols[i]], '<div class="i">' + r.label + '</div><div class="d">' + r.days + '</div><div class="t">' + r.time + '</div>', 'tz', p[3]); }).join('');
    return '<div class="fb' + (sq ? ' sq' : '') + ' partner">' + ov + doily + heart2 + '<div class="fb-script">Your sweetheart time</div>' + (sq ? '' : '<div class="fb-cap">' + (S.length > 1 ? 'BOTH LESSONS' : 'LESSON') + ' · LOCAL TIME FOR EACH ISLAND</div>') + hearts + band + '</div>';
  }

  /* ---------------- March: spring rainbow + St. Patrick's ---------------- */
  function mar(spec, partner, sq) {
    var S = spec.sessions.map(sessInfo), M = A.mar, month = MONTHS[spec.month-1];
    var scene = sq ? (partner ? M.scenePartnerSq : M.sceneHstSq) : (partner ? M.scenePartner : M.sceneHst);
    var logo = partner ? '<div class="fm-logo pip"><img src="' + spec.pipUrl + '" alt=""></div>' : '<div class="fm-logo"><img src="' + spec.logoUrl + '" alt=""></div>';
    var title = '<div class="fm-title"><div class="k">' + (partner ? 'FOR FAMILIES ACROSS THE PACIFIC' : 'PARENT TRAINING &amp; INFORMATION CENTER') + '</div><div class="t">' + esc(spec.series || 'Learning Labs') + '</div><div class="m">Spring into <b>' + month + '</b> ' + spec.year + '!</div></div>';
    var plank = '<div class="fm-plank"><div class="rg"><b>REGISTER at LDAHawaii.org</b>Get your Zoom link, scan the QR code,<br>or call ' + phone(partner) + '</div><div class="fm-qr">' + qrImg(spec, partner) + '</div><div class="fm-lg">' + badges(spec, partner) + '</div></div>';
    var root = '<div class="fm' + (sq ? ' sq' : '') + (partner ? ' partner' : '') + '">' + scene + logo + '<div class="fm-sun">ALL ON<br>ZOOM</div>' + title;
    if (!partner) {
      var pk = S.map(function (s, i) { return '<div class="pk p' + (i+1) + (S.length === 1 ? ' solo' : '') + '"><div class="top">LDAH SEEDS</div><div class="win">' + M.win + '</div><div class="bd"><div class="dd">' + s.dow + '., ' + s.monFull + ' ' + s.day + '</div><div class="tm">' + s.time + '</div><div class="ti">' + s.lesson + '</div>' + (s.desc ? '<div class="grow">Grows: ' + s.desc + '</div>' : '') + '</div></div>'; }).join('');
      return root + pk + (sq ? '' : '<div class="fm-tag">Plant the seed. Building Leaders in Parents creates a community of voices.</div>') + plank + '</div>';
    }
    var st = S.map(function (s, i) { return '<div class="stake s' + (i+1) + (S.length === 1 ? ' solo' : '') + '"><div class="bd2"><div class="n">LESSON ' + (i+1) + '</div><div class="ti">' + s.lesson + '</div></div><div class="pole"></div></div>'; }).join('');
    var pos = sq ? [[6,60],[29,61.5],[52,60],[75,61.5],[17.5,73],[40.5,74.5],[63.5,73]] : [[5,72],[28.5,74],[52,72],[75.5,74],[13,91],[36.5,93],[60,91]];
    var coins = zoneRows(spec.sessions).map(function (r, i) { return '<div class="coin' + (r.home ? ' h' : '') + '" style="left:' + pos[i][0] + 'cqw;top:' + pos[i][1] + 'cqw"><div class="i">' + r.label + '</div><div class="d">' + r.days + '</div><div class="t">' + r.time + '</div></div>'; }).join('');
    return root + st + '<div class="fm-h">Find your pot-of-gold time</div>' + (sq ? '' : '<div class="fm-c">' + (S.length > 1 ? 'BOTH LESSONS' : 'LESSON') + ' · LOCAL TIME FOR EACH ISLAND</div>') + coins + plank + '</div>';
  }

  var EXTRA = [
    /* shared: real QR images, single-session centering */
    '.flyer .fl-qr img,.fb .fb-qr img,.fm .fm-qr img{width:100%;height:100%;display:block}',
    '.flyer .fl-qr:has(img),.fb .fb-qr:has(img),.fm .fm-qr:has(img){background:#fff;padding:.4cqw}',
    '.flyer .tix.solo{left:27cqw!important;right:auto!important}.flyer .ltag.solo{left:29.5cqw!important;right:auto!important}.fb .env.solo{left:27cqw!important;right:auto!important}.fm .pk.solo{left:30cqw!important;right:auto!important}.fm .stake.solo{left:30cqw!important;right:auto!important}',
    /* Feb positions that the mockup set inline */
    '.fb .fb-heart.hh{left:21cqw;top:4cqw;width:66cqw;height:59.4cqw}.fb .fb-heart.hh .hin{padding-top:10.5cqw}',
    '.fb .fb-heart.hp{left:22cqw;top:3.5cqw;width:66cqw;height:59.4cqw}.fb .fb-heart.hp .hin{padding-top:8.8cqw}.fb .fb-heart.hp .t,.fb .fb-heart.hp .m{font-size:7cqw}.fb .fb-heart.hp .sub{font-size:2.35cqw;line-height:1.5}',
    '.fb .fb-script{top:61.5cqw}.fb .fb-cap{top:69cqw}',
    '.flyer.partner:not(.sq) .fl-kick,.flyer.partner:not(.sq) .fl-ll{left:30cqw}',
    /* Mar positions that the mockup set inline */
    '.fm.partner .fm-title{top:22cqw}.fm .fm-h{top:61cqw}.fm .fm-c{top:68cqw}',
    /* ---- squares (1:1) ---- */
    '.flyer .tix.long .ti{font-size:3.2cqw}.flyer .ltag.long .ti{font-size:2.6cqw}.flyer:not(.sq) .t1{width:44cqw}',
    '.flyer.sq,.fb.sq,.fm.sq{aspect-ratio:1/1!important}',
    /* Jan HST square */
    '.flyer.sq .fl-logo{left:4cqw;top:4cqw;width:12cqw;height:12cqw}.flyer.sq .fl-logo img{width:9cqw}',
    '.flyer.sq .fl-ll{left:19cqw;top:4.5cqw;font-size:6cqw}.flyer.sq .fl-kick{left:19cqw;top:12.5cqw;font-size:1.55cqw}',
    '.flyer.sq .fl-happy{left:5cqw;top:19cqw;font-size:4.6cqw}.flyer.sq .fl-year{left:4cqw;top:25.5cqw;font-size:18cqw}',
    '.flyer.sq .fl-month{left:5cqw;top:46.5cqw;font-size:2.1cqw;padding:.9cqw 2.4cqw}.flyer.sq .s-hst{left:12cqw;right:auto;top:57cqw;width:15cqw;height:15cqw;font-size:2cqw}',
    '.flyer.sq .tix{padding:2cqw 2.6cqw 1.8cqw}.flyer.sq .tix .tab{font-size:1.9cqw;margin-bottom:1cqw}.flyer.sq .tix .dd{font-size:4cqw}.flyer.sq .tix .tt2{font-size:2.4cqw;margin:.5cqw 0 1cqw}.flyer.sq .tix .ti{font-size:3.3cqw}.flyer.sq .tix .bl{font-size:1.9cqw}',
    '.flyer.sq .t1{left:auto;right:5cqw;top:22cqw;width:42cqw;transform:rotate(3deg)}.flyer.sq .t2{right:auto;left:46cqw;top:50cqw;width:46cqw;transform:rotate(-3deg)}',
    '.flyer.sq .tix.solo{left:48cqw!important;top:28cqw}.flyer.sq .t2{top:54cqw}.flyer.sq .tix.long .ti{font-size:2.7cqw}.flyer.sq .ltag .bl{display:none}.flyer.sq .ltag.long .ti{font-size:2.3cqw}',
    '.flyer.sq .wave{bottom:11.5cqw;height:7cqw}.flyer.sq .fl-foot{height:12cqw}.flyer.sq .fl-foot .rg{font-size:2cqw}.flyer.sq .fl-foot .rg b{font-size:2.8cqw}.flyer.sq .fl-qr{width:9.5cqw;height:9.5cqw}',
    /* Jan partner square */
    '.flyer.sq.partner .fl-logo.pip{width:18cqw;height:10.7cqw}.flyer.sq.partner .fl-logo.pip img{width:16cqw}.flyer.sq.partner .fl-ll{left:25cqw}.flyer.sq.partner .fl-kick{left:25cqw}',
    '.flyer.sq .p-happy{left:6cqw;top:16.5cqw;font-size:4.8cqw}.flyer.sq .p-year{left:62cqw;top:14cqw;font-size:12cqw}.flyer.sq .p-month{left:6cqw;top:27cqw}',
    '.flyer.sq .ltag{width:43cqw;padding:1.4cqw 2.2cqw}.flyer.sq .ltag .ti{font-size:2.7cqw}.flyer.sq .ltag .bl{font-size:1.7cqw}.flyer.sq .l1{left:4cqw;top:34cqw}.flyer.sq .l2{right:4cqw;top:34.5cqw}.flyer.sq .ltag.solo{left:28.5cqw!important}',
    '.flyer.sq .clk-h{top:47.5cqw;font-size:3.4cqw}.flyer.sq .clk{width:14cqw;height:14cqw;padding:.6cqw}.flyer.sq .clk .i{font-size:1.75cqw}.flyer.sq .clk .d{font-size:1.4cqw}.flyer.sq .clk .t{font-size:2.2cqw}.flyer.sq .clk .hand{width:2.4cqw;height:2.4cqw}',
    /* Feb HST square */
    '.fb.sq .fb-doily{left:auto;right:5cqw;top:5cqw;width:13cqw;height:13cqw}.fb.sq .fb-doily img{width:10cqw}',
    '.fb.sq .fb-heart.hh{left:4cqw;top:4cqw;width:56cqw;height:50.4cqw}.fb.sq .fb-heart.hh .hin{padding-top:8.5cqw}.fb.sq .fb-heart .k{font-size:1.45cqw}.fb.sq .fb-heart .t{font-size:7cqw}.fb.sq .fb-heart .m{font-size:7.4cqw}.fb.sq .fb-heart .y{font-size:2cqw}.fb.sq .fb-heart .sub{font-size:1.9cqw}',
    '.fb.sq .env{width:42cqw;height:22cqw}.fb.sq .env .letter{top:-12.5cqw;height:28cqw;padding:2cqw 2.2cqw}.fb.sq .env .to{font-size:3.6cqw}.fb.sq .env .dd{font-size:3.8cqw}.fb.sq .env .tm{font-size:2.1cqw}.fb.sq .env .ti{font-size:2.8cqw}.fb.sq .env .seal{width:6.5cqw;height:6.5cqw;margin-left:-3.25cqw}',
    '.fb.sq .e1{left:6cqw;top:63cqw}.fb.sq .e2{right:6cqw;top:62cqw}.fb.sq .env.solo{left:29cqw!important}',
    '.fb.sq .fb-band{height:12cqw;padding:2cqw 5cqw 0}.fb.sq .fb-band .rg{font-size:1.9cqw}.fb.sq .fb-ribbon{bottom:9.8cqw;font-size:2.2cqw;padding:1.1cqw 4cqw}.fb.sq .fb-qr{width:9cqw;height:9cqw}',
    /* Feb partner square */
    '.fb.sq.partner .fb-doily.pip{right:4cqw;left:auto;top:4cqw;width:18cqw;height:10.7cqw}.fb.sq.partner .fb-doily.pip img{width:16cqw}',
    '.fb.sq .fb-heart.hp{left:4cqw;top:3cqw;width:50cqw;height:45cqw}.fb.sq .fb-heart.hp .hin{padding-top:6.6cqw}.fb.sq .fb-heart.hp .t,.fb.sq .fb-heart.hp .m{font-size:5.4cqw}.fb.sq .fb-heart.hp .sub{font-size:1.8cqw;line-height:1.4}',
    '.fb.sq .fb-script{left:54cqw;right:2cqw;top:22cqw;font-size:4.6cqw}.fb.sq .ch.tz .i{font-size:1.85cqw}.fb.sq .ch.tz .d{font-size:1.4cqw}.fb.sq .ch.tz .t{font-size:2.4cqw}',
    /* Mar HST square */
    '.fm.sq .fm-logo{width:12cqw;height:12cqw;left:4cqw;top:4cqw}.fm.sq .fm-logo img{width:9cqw}.fm.sq .fm-sun{width:13cqw;height:13cqw;font-size:1.9cqw}',
    '.fm.sq .fm-title{top:20cqw}.fm.sq .fm-title .t{font-size:7.4cqw}.fm.sq .fm-title .m{font-size:5cqw}.fm.sq .fm-title .k{font-size:1.6cqw}',
    '.fm.sq .pk .win{display:none}.fm.sq .pk{width:40cqw}.fm.sq .pk .dd{font-size:4cqw}.fm.sq .pk .ti{font-size:3.1cqw}.fm.sq .p1{top:44cqw}.fm.sq .p2{top:48cqw}.fm.sq .pk.solo{left:30cqw!important}',
    '.fm.sq .fm-plank{height:11cqw;bottom:2.5cqw}.fm.sq .fm-plank .rg{font-size:1.9cqw}.fm.sq .fm-plank .rg b{font-size:2.7cqw}.fm.sq .fm-qr{width:8.5cqw;height:8.5cqw}',
    /* Mar partner square */
    '.fm.sq.partner .fm-logo.pip{width:18cqw;height:10.7cqw}.fm.sq.partner .fm-logo.pip img{width:16cqw}.fm.sq.partner .fm-title{top:18cqw}',
    '.fm.sq .stake{width:38cqw}.fm.sq .stake .ti{font-size:2.7cqw}.fm.sq .stake .bd2{padding:1.2cqw 2cqw}.fm.sq .s1{left:6cqw;top:39cqw}.fm.sq .s2{right:6cqw;top:39.5cqw}.fm.sq .stake.solo{left:31cqw!important}',
    '.fm.sq .fm-h{top:52cqw;font-size:4.4cqw}.fm.sq .coin{width:13cqw;height:13cqw;padding:.8cqw}.fm.sq .coin .i{font-size:1.6cqw}.fm.sq .coin .d{font-size:1.25cqw}.fm.sq .coin .t{font-size:2.1cqw}'
  ].join('\n');

  var PTC_WHERE = 'Recorded and posted on Facebook @ Parent Talk Café';
  var helpers = { PTC_WHERE: PTC_WHERE, esc: esc, sessInfo: sessInfo, zoneRows: zoneRows, seriesTitle: seriesTitle, badges: badges, qrImg: qrImg, phone: phone, MONTHS: MONTHS, MON3: MON3, DOW: DOW };
  window.VEBFlyers = {
    themes: { 1: { name: 'New Year (midnight sky, fireworks)', fn: jan }, 2: { name: 'Valentine card (hearts, love letters)', fn: feb }, 3: { name: 'Spring + St. Patrick\'s (rainbow, seed packets)', fn: mar } },
    css: A.jan.css + '\n' + A.feb.css + '\n' + A.mar.css + '\n' + EXTRA,
    fontsHref: 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&family=Pacifico&family=Playfair+Display:ital,wght@1,800&family=Great+Vibes&family=DM+Sans:wght@400;500;700;800&family=Fredoka:wght@500;600;700&family=Caveat:wght@700&display=swap',
    sizes: { letter: { w: 1275, h: 1650 }, square: { w: 1080, h: 1080 } },
    helpers: helpers,
    zoneRows: zoneRows,
    /* A month file calls this: registerTheme(4, { name, css, fonts: 'family=Foo:wght@400;700&family=Bar', fn: function (spec, partner, sq, H) { return html; } }) */
    /* series: omit for Learning Labs; 'ptc' for Parent Talk Café designs (kept apart from LL). */
    registerTheme: function (month, t, series) {
      var self = this, key = series === 'ptc' ? 'ptc' + month : month;
      this.themes[key] = { name: t.name, fn: function (spec, partner, sq) { return t.fn(spec, partner, sq, helpers); } };
      if (t.css) this.css += '\n' + t.css;
      if (t.fonts) t.fonts.split('&').forEach(function (f) { if (f && self.fontsHref.indexOf(f.split(':')[0]) < 0) self.fontsHref = self.fontsHref.replace('&display=swap', '&' + f + '&display=swap'); });
    },
    themeFor: function (series, month) { return series === 'Parent Talk Café' ? this.themes['ptc' + month] : this.themes[month]; },
    build: function (spec, variant) { // variant: hst|partner|hstSq|partnerSq
      var t = this.themeFor(spec.series, spec.month); if (!t) return null;
      return t.fn(spec, variant.indexOf('partner') === 0, /Sq$/.test(variant));
    }
  };
})();

/* ---- LL month 04 ---- */
VEBFlyers.registerTheme(4, (function () {
  /* April: "April showers" - a yellow umbrella holds the title, sessions are big raindrops dripping off it,
     a rain-cloud footer carries the registration. All geometry in flyer units (1 unit = 1cqw). */
  function seeded(seed) { return function () { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; }; }
  function f(n) { return (Math.round(n * 100) / 100).toString(); }
  function box(cls, x, y, w, h, inner, extra) {
    return '<div class="' + cls + '" style="left:' + f(x) + 'cqw;top:' + f(y) + 'cqw;width:' + f(w) + 'cqw;' + (h != null ? 'height:' + f(h) + 'cqw;' : '') + (extra || '') + '">' + inner + '</div>';
  }
  /* ---- SVG pieces ---- */
  function umbrella(cx, rim, rx, ry) {
    var n = 8, ribs = [], k, j, out = '';
    for (k = 0; k <= n; k++) {
      var s = Math.sin(-Math.PI / 2 + k * Math.PI / n), pts = [];
      for (j = 0; j <= 14; j++) { var ph = j / 14 * Math.PI / 2; pts.push([cx + rx * s * Math.sin(ph), rim - ry * Math.cos(ph)]); }
      ribs.push(pts);
    }
    var cols = ['#ffd23f', '#ffc61a'];
    for (k = 0; k < n; k++) {
      var a = ribs[k], b = ribs[k + 1], ta = a[a.length - 1], tb = b[b.length - 1], gap = tb[0] - ta[0];
      var dep = Math.min(gap * 0.22, 2.6);
      var d = 'M' + a.map(function (p) { return f(p[0]) + ' ' + f(p[1]); }).join(' L') + ' Q' + f((ta[0] + tb[0]) / 2) + ' ' + f(rim - dep * 2) + ' ' + f(tb[0]) + ' ' + f(tb[1]) + ' L' + b.slice().reverse().map(function (p) { return f(p[0]) + ' ' + f(p[1]); }).join(' L') + 'Z';
      out += '<path d="' + d + '" fill="' + cols[k % 2] + '" stroke="#e8a300" stroke-width=".22" stroke-linejoin="round"/>';
    }
    for (k = 0; k <= n; k++) { var t = ribs[k][14]; out += '<circle cx="' + f(t[0]) + '" cy="' + f(t[1]) + '" r=".75" fill="#ff6f9c"/>'; }
    out += '<path d="M' + f(cx) + ' ' + f(rim - ry) + ' v-3" stroke="#1d3557" stroke-width=".8" stroke-linecap="round"/><circle cx="' + f(cx) + '" cy="' + f(rim - ry - 3.2) + '" r=".7" fill="#ff6f9c"/>';
    return out;
  }
  function handle(cx, top, len) {
    var y = top + len;
    return '<path d="M' + f(cx) + ' ' + f(top - 0.5) + ' V' + f(y) + ' A2 2 0 0 0 ' + f(cx + 4) + ' ' + f(y) + ' V' + f(y - 1.2) + '" fill="none" stroke="#a0522d" stroke-width="1" stroke-linecap="round"/>';
  }
  function dropPath(cx, cy, r, tip) {
    var t = cy - tip;
    return 'M' + f(cx) + ' ' + f(t) + ' C' + f(cx + r * 0.18) + ' ' + f(t + tip * 0.35) + ' ' + f(cx + r) + ' ' + f(cy - r * 0.62) + ' ' + f(cx + r) + ' ' + f(cy)
      + ' A' + f(r) + ' ' + f(r) + ' 0 0 1 ' + f(cx - r) + ' ' + f(cy) + ' C' + f(cx - r) + ' ' + f(cy - r * 0.62) + ' ' + f(cx - r * 0.18) + ' ' + f(t + tip * 0.35) + ' ' + f(cx) + ' ' + f(t) + 'Z';
  }
  function bigDrop(cx, cy, r, tip, fill, id) {
    return '<path d="' + dropPath(cx, cy + 0.6, r, tip) + '" fill="rgba(29,53,87,.18)"/>'
      + '<path d="' + dropPath(cx, cy, r, tip) + '" fill="url(#' + id + ')" stroke="#fff" stroke-width="' + f(r * 0.04) + '"/>'
      + (r < 12 ? '' : '<path d="M' + f(cx - r * 0.72) + ' ' + f(cy - r * 0.05) + ' Q' + f(cx - r * 0.66) + ' ' + f(cy - r * 0.42) + ' ' + f(cx - r * 0.42) + ' ' + f(cy - r * 0.66) + '" fill="none" stroke="rgba(255,255,255,.75)" stroke-width="' + f(r * 0.07) + '" stroke-linecap="round"/>');
  }
  function smallDrop(x, y, s, c) { return '<path d="' + dropPath(x, y, s, s * 1.7) + '" fill="' + c + '"/>'; }
  function cloud(x, y, w, c1, c2) {
    var h = w * 0.42;
    return '<g><ellipse cx="' + f(x + w * 0.5) + '" cy="' + f(y + h * 0.78) + '" rx="' + f(w * 0.5) + '" ry="' + f(h * 0.22) + '" fill="' + c2 + '"/>'
      + '<circle cx="' + f(x + w * 0.28) + '" cy="' + f(y + h * 0.6) + '" r="' + f(w * 0.2) + '" fill="' + c1 + '"/><circle cx="' + f(x + w * 0.55) + '" cy="' + f(y + h * 0.45) + '" r="' + f(w * 0.26) + '" fill="' + c1 + '"/>'
      + '<circle cx="' + f(x + w * 0.8) + '" cy="' + f(y + h * 0.66) + '" r="' + f(w * 0.17) + '" fill="' + c1 + '"/><rect x="' + f(x + w * 0.1) + '" y="' + f(y + h * 0.6) + '" width="' + f(w * 0.8) + '" height="' + f(h * 0.4) + '" rx="' + f(h * 0.2) + '" fill="' + c1 + '"/></g>';
  }
  function blossom(x, y, r, rot, petal, mid) {
    var o = '<g transform="translate(' + f(x) + ' ' + f(y) + ') rotate(' + rot + ')">';
    for (var i = 0; i < 5; i++) o += '<ellipse cx="0" cy="' + f(-r * 0.55) + '" rx="' + f(r * 0.38) + '" ry="' + f(r * 0.55) + '" fill="' + petal + '" transform="rotate(' + (i * 72) + ')"/>';
    o += '<circle r="' + f(r * 0.24) + '" fill="' + mid + '"/>';
    for (i = 0; i < 5; i++) { var a = (i * 72 + 36) * Math.PI / 180; o += '<circle cx="' + f(Math.sin(a) * r * 0.32) + '" cy="' + f(-Math.cos(a) * r * 0.32) + '" r="' + f(r * 0.06) + '" fill="#ffd23f"/>'; }
    return o + '</g>';
  }
  function boots(x, y, s) { // pair of rain boots standing in a puddle; s = boot height
    function one(bx, c, d) {
      var w = s * 0.5;
      return '<path d="M' + f(bx) + ' ' + f(y) + ' H' + f(bx + w) + ' V' + f(y + s * 0.62) + ' Q' + f(bx + w) + ' ' + f(y + s * 0.7) + ' ' + f(bx + w + s * 0.12) + ' ' + f(y + s * 0.72) + ' L' + f(bx + w + s * 0.3) + ' ' + f(y + s * 0.78) + ' Q' + f(bx + w + s * 0.42) + ' ' + f(y + s * 0.82) + ' ' + f(bx + w + s * 0.42) + ' ' + f(y + s * 0.92) + ' V' + f(y + s) + ' H' + f(bx) + 'Z" fill="' + c + '"/>'
        + '<rect x="' + f(bx - s * 0.03) + '" y="' + f(y - s * 0.02) + '" width="' + f(w + s * 0.06) + '" height="' + f(s * 0.12) + '" rx="' + f(s * 0.03) + '" fill="' + d + '"/>'
        + '<rect x="' + f(bx) + '" y="' + f(y + s * 0.92) + '" width="' + f(w + s * 0.42) + '" height="' + f(s * 0.08) + '" fill="' + d + '"/>';
    }
    return '<ellipse cx="' + f(x + s * 0.95) + '" cy="' + f(y + s * 1.0) + '" rx="' + f(s * 1.15) + '" ry="' + f(s * 0.16) + '" fill="#9ed8ef"/>'
      + '<ellipse cx="' + f(x + s * 0.8) + '" cy="' + f(y + s * 1.0) + '" rx="' + f(s * 0.5) + '" ry="' + f(s * 0.06) + '" fill="#d8f2fb"/>'
      + one(x, '#ffc61a', '#e09a00') + one(x + s * 0.75, '#ffd23f', '#e09a00');
  }
  function footCloud(x, y, w, h) {
    var c = '#56789b', o = '<rect x="' + f(x) + '" y="' + f(y) + '" width="' + f(w) + '" height="' + f(h) + '" rx="' + f(Math.min(h * 0.45, 7)) + '" fill="' + c + '"/>';
    [[0.1, 2.6], [0.24, 3.6], [0.4, 2.8], [0.58, 3.9], [0.75, 2.7], [0.9, 3.3]].forEach(function (b) { o += '<circle cx="' + f(x + w * b[0]) + '" cy="' + f(y + 1.6) + '" r="' + f(b[1]) + '" fill="' + c + '"/>'; });
    return '<g filter="url(#apsh)">' + o + '</g>';
  }
  function rain(rects, n, rnd) {
    var o = '';
    for (var i = 0; i < n; i++) { var R = rects[i % rects.length]; o += smallDrop(R[0] + rnd() * (R[2] - R[0]), R[1] + rnd() * (R[3] - R[1]), 0.45 + rnd() * 0.45, rnd() < 0.5 ? '#38b6c8' : '#7cc7e8'); }
    return o;
  }

  /* ---- layouts (letter height 129.41) ---- */
  var L = {
    lh: { H: 129.41, logo: [3.5, 3, 14, 14], umb: [50, 46, 45, 33], kick: 20, kickF: 1.55, title: 22.3, titleF: 8.6, month: 31.6, monthF: 4.4, zoom: 37.6, handle: 6,
          drops2: [[27, 76, 20, 26], [73, 76, 20, 26]], drop1: [[50, 75.6, 21.4, 23]], tw: 31, th: 32,
          tag: [10, 98.4, 80], foot: [4, 109, 92, 17.6], clouds: [[64, 1.2, 33], [26, 2.4, 18]],
          rain: [[86, 11, 99, 25], [0.5, 19, 5, 42], [1, 56, 5, 92], [95, 56, 99.5, 92], [36, 3, 64, 10]],
          blos: [[3, 50, 2.4, 10], [97, 50, 2.2, 40], [50, 91, 2.3, 20], [97, 99, 3, 0], [91, 103, 2.2, 30], [86, 98, 1.8, 50]], boots: [5, 94.5, 9] },
    lp: { H: 129.41, logo: [3, 3, 21, 12.5], umb: [50, 44, 45, 32], kick: 19.6, kickF: 1.6, title: 22.2, titleF: 8.6, month: 31.4, monthF: 4.4, zoom: 37.2, handle: 5,
          les: [8, 51.2, 84], head: 58.6, headF: 3.8,
          zr: [[14, 78.6], [38, 78.6], [62, 78.6], [86, 78.6], [26, 99.6], [50, 99.6], [74, 99.6]], zrR: 10.2, zrTip: 14.6, zw: 16.5,
          foot: [4, 113, 92, 14.4], clouds: [[64, 1.2, 33], [28, 2.2, 17]],
          rain: [[86, 11, 99, 25], [0.5, 18, 5, 40], [1, 66, 3, 108], [97, 66, 99.5, 108], [36, 3, 64, 10]],
          blos: [[3, 49, 2.2, 10], [97, 49, 2.2, 40], [4, 64, 2, 70], [96, 64, 2, 20], [11, 103, 2.4, 30], [89, 103, 2.4, 0]] },
    sh: { H: 100, logo: [3, 3, 12, 12], umb: [32, 47, 30, 28], kick: 26.6, kickF: 1.22, title: 28.8, titleF: 5.3, month: 35, monthF: 3, zoom: 40.3, handle: 5,
          drops2: [[80, 23, 15, 18], [80, 63.5, 15, 19]], drop1: [[80, 48, 17, 24]], tw: 22.5, th: 23.5,
          tag: [5, 55.5, 54], foot: [3, 87.2, 94, 11.3], clouds: [[24, 3, 20], [50, 7, 11]],
          rain: [[18, 2, 30, 14], [46, 2, 60, 16], [2, 20, 8, 40], [3, 58, 9, 80], [56, 52, 62, 82]],
          blos: [[56, 76, 2.2, 20], [6, 57, 2, 50], [62, 58, 1.8, 10], [97, 44, 1.8, 30]], boots: [21, 69.5, 9] },
    sp: { H: 100, logo: [2.5, 2.5, 16, 9.5], umb: [50, 31, 46, 25], kick: 12.2, kickF: 1.3, title: 14.3, titleF: 5.6, month: 20.6, monthF: 3, handle: 4,
          les: [10, 37, 80], head: 43.6, headF: 2.4,
          zr: [[13, 57.2], [37, 57.2], [63, 57.2], [87, 57.2], [25, 76.6], [50, 76.6], [75, 76.6]], zrR: 9.2, zrTip: 11.5, zw: 15,
          foot: [3, 88.2, 94, 10.3], clouds: [[78, 1.5, 19]],
          rain: [[1, 15, 4, 32], [96, 15, 99, 32], [1, 47, 3, 84], [97, 47, 99, 84], [22, 2, 38, 7]],
          blos: [[4, 36, 2, 10], [96, 36, 2, 30], [50, 84.2, 1.4, 0]] }
  };

  var css = [
    '.ap{container-type:inline-size;aspect-ratio:8.5/11;position:relative;overflow:hidden;border-radius:4px;box-shadow:0 10px 30px rgba(29,53,87,.25);background:linear-gradient(180deg,#b9e3fb 0%,#d9f0fd 42%,#eef9ff 70%,#e3f5ec 100%);font-family:Nunito,Poppins,sans-serif;color:#1d3557}',
    '.ap.sq{aspect-ratio:1/1}',
    '.ap>svg.ap-bg{position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:1}',
    '.ap .ap-logo,.ap .ap-k,.ap .ap-t,.ap .ap-m,.ap .ap-z,.ap .ap-s,.ap .ap-zr,.ap .ap-les,.ap .ap-h,.ap .ap-tag,.ap .ap-f{position:absolute;z-index:3}',
    '.ap .ap-logo{background:#fff;border-radius:50%;display:grid;place-items:center;box-shadow:0 0 0 .7cqw #ff8fb1,0 .8cqw 1.6cqw rgba(29,53,87,.2)}',
    '.ap .ap-logo img{width:76%}.ap .ap-logo.ap-pip{border-radius:2cqw}.ap .ap-logo.ap-pip img{width:90%}',
    '.ap .ap-k{z-index:4;text-align:center;font-weight:800;letter-spacing:.16em;color:#0e6b78;line-height:1.1}',
    '.ap .ap-t{text-align:center;font-family:"Baloo 2",Fredoka,sans-serif;font-weight:800;line-height:1;color:#1d3557;letter-spacing:-.01em}',
    '.ap .ap-t span{color:#c2185b}',
    '.ap .ap-m{text-align:center;font-family:"Baloo 2",Fredoka,sans-serif;font-weight:700;line-height:1;color:#1d3557}',
    '.ap .ap-m b{color:#c2185b;font-weight:800}',
    '.ap .ap-z{z-index:4;text-align:center;font-weight:900;letter-spacing:.14em;color:#fff;background:#1d3557;border-radius:9cqw;line-height:1;padding:.75cqw 0}',
    '.ap .ap-s{display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;color:#fff}',
    '.ap .ap-s .ap-d,.ap .ap-s .ap-tm,.ap .ap-s .ap-ds,.ap .ap-zr .ap-i,.ap .ap-zr .ap-dy{position:relative;z-index:1}',
    '.ap .ap-s .ap-d{font-weight:900;letter-spacing:.1em;background:#ffd23f;color:#1d3557;border-radius:6cqw;padding:.45em 1em .35em;line-height:1}',
    '.ap .ap-s .ap-tm{font-weight:800;margin:.5em 0 .45em;line-height:1.1}',
    '.ap .ap-s .ap-ti{font-family:"Baloo 2",Fredoka,sans-serif;font-weight:800;line-height:1.02;text-shadow:0 .25cqw .4cqw rgba(13,60,90,.35)}',
    '.ap .ap-s .ap-ds{font-weight:700;line-height:1.15;margin-top:.55em;color:#e3fbff}',
    '.ap .ap-zr{display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;color:#fff;line-height:1.1}',
    '.ap .ap-zr .ap-i{font-weight:900}.ap .ap-zr .ap-dy{font-weight:700;color:#e3fbff;margin:.25em 0 .15em}.ap .ap-zr .ap-zt{font-family:"Baloo 2",Fredoka,sans-serif;font-weight:800;line-height:1}',
    '.ap .ap-zr.ap-home{color:#1d3557}.ap .ap-zr.ap-home .ap-dy{color:#5b4300}',
    '.ap .ap-les{z-index:4;text-align:center;font-weight:700;line-height:1.3;color:#1d3557}',
    '.ap .ap-les b{display:inline-block;background:#2bb3c0;color:#fff;border-radius:3cqw;padding:.1em .6em;margin-right:.45em;font-size:.78em;letter-spacing:.08em;vertical-align:.1em}',
    '.ap .ap-h{text-align:center;font-family:"Baloo 2",Fredoka,sans-serif;font-weight:800;line-height:1;color:#0e6b78}',
    '.ap .ap-tag{text-align:center;font-family:"Baloo 2",Fredoka,sans-serif;font-weight:700;line-height:1.05;color:#0e6b78}',
    '.ap .ap-tag b{color:#c2185b}',
    '.ap .ap-f{display:flex;align-items:center;gap:2.4cqw;color:#fff}',
    '.ap .ap-f .ap-rg{flex:1;line-height:1.3}',
    '.ap .ap-f .ap-rg b{display:block;font-family:"Baloo 2",Fredoka,sans-serif;font-weight:800;line-height:1.05;color:#fff}',
    '.ap .ap-f .ap-rg b i{font-style:normal;color:#ffd23f}',
    '.ap .ap-qr{flex:none;background:#fff;border-radius:1cqw;padding:.5cqw;display:grid;place-items:center;color:#1d3557;font-weight:800}',
    '.ap .ap-qr img{width:100%;height:100%;display:block}',
    '.ap .ap-bd{flex:none;display:flex;flex-direction:column;gap:.7cqw;align-items:stretch}',
    '.ap .ap-bd span{background:#fff;color:#1d3557;border-radius:5cqw;font-weight:800;text-align:center;padding:.5em .9em;line-height:1;white-space:nowrap}'
  ].join('\n');

  function fn(spec, partner, sq, H) {
    var V = L[(sq ? 's' : 'l') + (partner ? 'p' : 'h')], S = spec.sessions.map(H.sessInfo), mon = H.MONTHS[spec.month - 1];
    var rnd = seeded(spec.month * 97 + (sq ? 7 : 3) + (partner ? 11 : 0));
    var u = V.umb, svg = '', html = '', W = 100;
    svg += '<defs><linearGradient id="apg1" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4fc3d6"/><stop offset="1" stop-color="#1b8fa6"/></linearGradient>'
      + '<linearGradient id="apg2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6aa9e6"/><stop offset="1" stop-color="#3a72c2"/></linearGradient>'
      + '<linearGradient id="apg3" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffe17a"/><stop offset="1" stop-color="#ffc61a"/></linearGradient>'
      + '<linearGradient id="apg4" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f59ab8"/><stop offset="1" stop-color="#d9578a"/></linearGradient>'
      + '<filter id="apsh" x="-10%" y="-30%" width="120%" height="160%"><feDropShadow dx="0" dy=".6" stdDeviation=".6" flood-color="#1d3557" flood-opacity=".25"/></filter></defs>';
    (V.clouds || []).forEach(function (c) { svg += cloud(c[0], c[1], c[2], '#f4f8fc', '#c9d7e6'); });
    svg += rain(V.rain, sq ? 26 : 38, rnd);
    svg += umbrella(u[0], u[1], u[2], u[3]) + handle(u[0], u[1], V.handle);
    var tips = [0.383, 0.707].map(function (s) { return [u[0] - u[2] * s, u[0] + u[2] * s]; });
    tips.forEach(function (p, i) { p.forEach(function (x) { svg += smallDrop(x, u[1] + 2.4 + i * 1.2, 0.55, '#38b6c8'); }); });
    (V.blos || []).forEach(function (b, i) { svg += blossom(b[0], b[1], b[2], b[3], i % 2 ? '#ffc2d4' : '#ff9fbf', '#e2557f'); });
    if (V.boots) svg += boots(V.boots[0], V.boots[1], V.boots[2]);
    svg += footCloud(V.foot[0], V.foot[1], V.foot[2], V.foot[3]);

    // logo + title on the canopy
    var lg = V.logo;
    html += box('ap-logo' + (partner ? ' ap-pip' : ''), lg[0], lg[1], lg[2], lg[3], '<img src="' + (partner ? spec.pipUrl : spec.logoUrl) + '" alt="">');
    var tw = u[2] * 1.5;
    html += box('ap-k', u[0] - tw / 2, V.kick, tw, null, partner ? 'FOR FAMILIES ACROSS THE PACIFIC' : 'PARENT TRAINING &amp; INFORMATION CENTER', 'font-size:' + V.kickF + 'cqw');
    html += box('ap-t', u[0] - u[2] * 0.85, V.title, u[2] * 1.7, null, H.seriesTitle ? H.seriesTitle(spec.series) : H.esc(spec.series), 'font-size:' + V.titleF + 'cqw');
    if (V.zoom) {
      html += box('ap-m', u[0] - tw / 2, V.month, tw, null, '<b>' + mon + '</b> ' + spec.year, 'font-size:' + V.monthF + 'cqw');
      var zw = sq ? 17 : 21;
      html += box('ap-z', u[0] - zw / 2, V.zoom, zw, null, 'ALL ON ZOOM', 'font-size:' + (sq ? 1.3 : 1.6) + 'cqw');
    } else {
      html += box('ap-m', u[0] - tw / 2, V.month, tw, null, '<b>' + mon + '</b> ' + spec.year + ' · on Zoom', 'font-size:' + V.monthF + 'cqw');
    }

    if (!partner) {
      var D = S.length > 1 ? V.drops2 : V.drop1, k = sq ? 0.74 : 1, solo = S.length === 1 ? 1.04 : 1;
      S.forEach(function (s, i) {
        var d = D[i];
        svg += bigDrop(d[0], d[1], d[2], d[3], '', i % 2 ? 'apg2' : 'apg1');
        var w = V.tw * (solo > 1 ? 1.03 : 1), h = V.th * (solo > 1 ? 1.03 : 1);
        html += box('ap-s', d[0] - w / 2, d[1] - h / 2 + (sq ? 0.4 : 0.8), w, h,
          '<div class="ap-d" style="font-size:' + f(1.9 * k * solo) + 'cqw">' + s.dow.toUpperCase() + ' · ' + s.monFull.toUpperCase() + ' ' + s.day + '</div>'
          + '<div class="ap-tm" style="font-size:' + f(2.45 * k * solo) + 'cqw">' + s.time + '</div>'
          + '<div class="ap-ti" style="font-size:' + f(3.85 * k * solo) + 'cqw">' + s.lesson + '</div>'
          + (s.desc && !sq ? '<div class="ap-ds" style="font-size:' + f(1.85 * solo) + 'cqw">' + s.desc + '</div>' : ''));
      });
      var tg = V.tag;
      html += box('ap-tag', tg[0], tg[1], tg[2], null, sq ? 'April showers<br>bring <b>new skills</b>' : 'April showers bring <b>new skills</b>', 'font-size:' + (sq ? 4.4 : 3.3) + 'cqw');
    } else {
      var le = V.les;
      html += box('ap-les', le[0], le[1], le[2], null, S.map(function (s, i) { return '<div><b>LESSON ' + (i + 1) + '</b>' + s.lesson + '</div>'; }).join(''), 'font-size:' + (sq ? 2 : 2.45) + 'cqw');
      html += box('ap-h', 5, V.head, 90, null, sq ? 'LOCAL TIME ON YOUR ISLAND' : 'Catch the time on your island', 'font-size:' + V.headF + 'cqw' + (sq ? ';font-family:Nunito,sans-serif;font-weight:900;letter-spacing:.14em' : ''));
      var cols = ['apg1', 'apg3', 'apg2', 'apg1', 'apg4', 'apg2', 'apg1'];
      H.zoneRows(spec.sessions).forEach(function (r, i) {
        var p = V.zr[i], R = V.zrR, g = r.home ? 'apg3' : cols[i];
        svg += bigDrop(p[0], p[1], R, V.zrTip, '', g);
        var zw2 = V.zw, zf = sq ? 0.9 : 1;
        html += box('ap-zr' + (r.home ? ' ap-home' : ''), p[0] - zw2 / 2, p[1] - R * 0.78, zw2, R * 1.6,
          '<div class="ap-i" style="font-size:' + f(1.7 * zf) + 'cqw">' + r.label + '</div><div class="ap-dy" style="font-size:' + f(1.42 * zf) + 'cqw">' + r.days + '</div><div class="ap-zt" style="font-size:' + f(2.5 * zf) + 'cqw">' + r.time + '</div>');
      });
    }

    var ft = V.foot, fs = sq ? 0.78 : 1;
    html += box('ap-f', ft[0] + 3, ft[1] + 0.9, ft[2] - 6, ft[3] - 1.8,
      '<div class="ap-rg" style="font-size:' + f(2 * fs) + 'cqw"><b style="font-size:' + f(3.5 * fs) + 'cqw">REGISTER at <i>LDAHawaii.org</i></b>Get your Zoom link, scan the QR code,' + (sq ? ' ' : '<br>') + 'or call ' + H.phone(partner) + '</div>'
      + '<div class="ap-qr" style="width:' + (sq ? 9.4 : 11) + 'cqw;height:' + (sq ? 9.4 : 11) + 'cqw">' + H.qrImg(spec, partner) + '</div>'
      + '<div class="ap-bd" style="font-size:' + f(1.5 * fs) + 'cqw">' + H.badges(spec, partner) + '</div>');

    return '<div class="ap' + (sq ? ' sq' : '') + (partner ? ' partner' : '') + '"><svg class="ap-bg" viewBox="0 0 ' + W + ' ' + V.H + '">' + svg + '</svg>' + html + '</div>';
  }

  return { name: 'April showers (umbrella, raindrops, spring blossoms)', fonts: 'family=Baloo+2:wght@500;700;800&family=Nunito:wght@600;700;800;900', css: css, fn: fn };
})());

/* ---- LL month 05 ---- */
VEBFlyers.registerTheme(5, (function () {
  /* May: "May flowers" - a round flower lei frames the title, sessions are hand-tied gift tags hanging from the lei's bow,
     partner times sit in the centers of blossoms on a garland vine, footer is a leaf-green band edged with plumeria. */
  function f(n) { return (Math.round(n * 100) / 100).toString(); }
  function box(cls, x, y, w, h, inner, extra) {
    return '<div class="' + cls + '" style="left:' + f(x) + 'cqw;top:' + f(y) + 'cqw;width:' + f(w) + 'cqw;' + (h != null ? 'height:' + f(h) + 'cqw;' : '') + (extra || '') + '">' + inner + '</div>';
  }
  function petals(n, r, rx, ry, off, fill, extra) {
    var o = '';
    for (var i = 0; i < n; i++) o += '<ellipse cx="0" cy="' + f(-r * off) + '" rx="' + f(r * rx) + '" ry="' + f(r * ry) + '" fill="' + fill + '"' + (extra || '') + ' transform="rotate(' + f(i * 360 / n) + ')"/>';
    return o;
  }
  function plumeria(x, y, r, rot) {
    var o = '<g transform="translate(' + f(x) + ' ' + f(y) + ') rotate(' + f(rot) + ')">';
    for (var i = 0; i < 5; i++) o += '<path d="M0 0 C' + f(r * 0.55) + ' ' + f(-r * 0.15) + ' ' + f(r * 0.62) + ' ' + f(-r * 0.95) + ' ' + f(r * 0.05) + ' ' + f(-r) + ' C' + f(-r * 0.35) + ' ' + f(-r * 0.9) + ' ' + f(-r * 0.3) + ' ' + f(-r * 0.3) + ' 0 0Z" fill="url(#myplu)" stroke="#efdcb8" stroke-width="' + f(r * 0.03) + '" transform="rotate(' + (i * 72) + ')"/>';
    return o + '<circle r="' + f(r * 0.16) + '" fill="#f6b73c"/></g>';
  }
  function hibiscus(x, y, r, rot, c1, c2) {
    var o = '<g transform="translate(' + f(x) + ' ' + f(y) + ') rotate(' + f(rot) + ')">' + petals(5, r, 0.48, 0.56, 0.5, c1);
    o += petals(5, r, 0.16, 0.3, 0.3, c2) + '<circle r="' + f(r * 0.2) + '" fill="' + c2 + '"/>';
    o += '<path d="M0 0 L' + f(r * 0.35) + ' ' + f(-r * 0.85) + '" stroke="#ffd166" stroke-width="' + f(r * 0.07) + '" stroke-linecap="round"/><circle cx="' + f(r * 0.37) + '" cy="' + f(-r * 0.9) + '" r="' + f(r * 0.09) + '" fill="#ffd166"/>';
    return o + '</g>';
  }
  function orchid(x, y, r, rot) {
    var o = '<g transform="translate(' + f(x) + ' ' + f(y) + ') rotate(' + f(rot) + ')">';
    [0, 120, 240].forEach(function (a) { o += '<ellipse cx="0" cy="' + f(-r * 0.55) + '" rx="' + f(r * 0.24) + '" ry="' + f(r * 0.5) + '" fill="#c89be8" transform="rotate(' + a + ')"/>'; });
    [60, 300].forEach(function (a) { o += '<ellipse cx="0" cy="' + f(-r * 0.5) + '" rx="' + f(r * 0.4) + '" ry="' + f(r * 0.48) + '" fill="#a66ad6" transform="rotate(' + a + ')"/>'; });
    return o + '<ellipse cx="0" cy="' + f(r * 0.3) + '" rx="' + f(r * 0.28) + '" ry="' + f(r * 0.32) + '" fill="#6a2c91"/><circle r="' + f(r * 0.14) + '" fill="#ffd166"/></g>';
  }
  function leaf(x, y, len, ang, c) {
    return '<g transform="translate(' + f(x) + ' ' + f(y) + ') rotate(' + f(ang) + ')"><path d="M0 0 Q' + f(len * 0.5) + ' ' + f(-len * 0.32) + ' ' + f(len) + ' 0 Q' + f(len * 0.5) + ' ' + f(len * 0.32) + ' 0 0Z" fill="' + c + '"/><path d="M' + f(len * 0.08) + ' 0 L' + f(len * 0.9) + ' 0" stroke="rgba(255,255,255,.35)" stroke-width="' + f(len * 0.03) + '"/></g>';
  }
  function flower(t, x, y, r, rot) {
    if (t === 0) return hibiscus(x, y, r, rot, '#ff6b5b', '#c2243b');
    if (t === 1) return plumeria(x, y, r, rot);
    if (t === 2) return orchid(x, y, r, rot);
    if (t === 3) return hibiscus(x, y, r, rot, '#ff9eb5', '#d6336c');
    return plumeria(x, y, r, rot);
  }
  function lei(cx, cy, R, fr) {
    var n = Math.round(2 * Math.PI * R / (fr * 1.9)), o = '', i, a, x, y;
    for (i = 0; i < n * 2; i++) {
      a = (i + 0.5) * Math.PI / n; x = cx + Math.cos(a) * R; y = cy + Math.sin(a) * R;
      o += leaf(x, y, fr * 1.5, a * 180 / Math.PI + 90 + (i % 2 ? 35 : -35) + (i % 4 < 2 ? 180 : 0), i % 3 ? '#3f9e5a' : '#2e7d4f');
    }
    var seq = [0, 1, 2, 1, 3, 1, 2, 1];
    for (i = 0; i < n; i++) {
      a = i * 2 * Math.PI / n - Math.PI / 2; x = cx + Math.cos(a) * R; y = cy + Math.sin(a) * R;
      o += flower(seq[i % seq.length], x, y, fr * (seq[i % seq.length] === 1 ? 0.95 : 1.02), i * 37);
    }
    return o;
  }
  function bow(x, y, s) {
    return '<g transform="translate(' + f(x) + ' ' + f(y) + ')"><path d="M0 0 L' + f(-s * 0.7) + ' ' + f(s * 1.5) + ' L' + f(-s * 0.35) + ' ' + f(s * 1.35) + ' L' + f(-s * 0.25) + ' ' + f(s * 1.6) + 'Z" fill="#d9465a"/><path d="M0 0 L' + f(s * 0.7) + ' ' + f(s * 1.5) + ' L' + f(s * 0.35) + ' ' + f(s * 1.35) + ' L' + f(s * 0.25) + ' ' + f(s * 1.6) + 'Z" fill="#d9465a"/>'
      + '<ellipse cx="' + f(-s * 0.6) + '" cy="0" rx="' + f(s * 0.62) + '" ry="' + f(s * 0.36) + '" fill="#ff6b5b" transform="rotate(-12)"/><ellipse cx="' + f(s * 0.6) + '" cy="0" rx="' + f(s * 0.62) + '" ry="' + f(s * 0.36) + '" fill="#ff6b5b" transform="rotate(12)"/>'
      + '<circle r="' + f(s * 0.24) + '" fill="#d9465a"/></g>';
  }
  function tagShape(cx, cy, w, h, rot, edge, id) {
    var x0 = cx - w / 2, x1 = cx + w / 2, y0 = cy - h / 2, y1 = cy + h / 2, c = w * 0.2, r = 1.6;
    function p(i) { var a = x0 + i, b = x1 - i, t = y0 + i, u = y1 - i, cc = c - i * 0.4; return 'M' + f(a + cc) + ' ' + f(t) + ' L' + f(b - cc) + ' ' + f(t) + ' L' + f(b) + ' ' + f(t + cc) + ' L' + f(b) + ' ' + f(u - r) + ' Q' + f(b) + ' ' + f(u) + ' ' + f(b - r) + ' ' + f(u) + ' L' + f(a + r) + ' ' + f(u) + ' Q' + f(a) + ' ' + f(u) + ' ' + f(a) + ' ' + f(u - r) + ' L' + f(a) + ' ' + f(t + cc) + 'Z'; }
    return '<g transform="rotate(' + rot + ' ' + f(cx) + ' ' + f(cy) + ')"><path d="' + p(0) + '" fill="rgba(74,25,66,.16)" transform="translate(.5 .9)"/><path d="' + p(0) + '" fill="' + edge + '"/><path d="' + p(1.1) + '" fill="url(#mypap)"/>'
      + '<path d="' + p(2.1) + '" fill="none" stroke="' + edge + '" stroke-width=".22" stroke-dasharray=".9 .7" opacity=".7"/>'
      + '<circle cx="' + f(cx) + '" cy="' + f(y0 + c * 0.62) + '" r="1.35" fill="' + edge + '"/><circle cx="' + f(cx) + '" cy="' + f(y0 + c * 0.62) + '" r=".7" fill="#fff6e6"/></g>';
  }
  function holePos(cx, cy, w, h, rot) { // rotated hole centre
    var hx = 0, hy = -h / 2 + w * 0.2 * 0.62, a = rot * Math.PI / 180;
    return [cx + hx * Math.cos(a) - hy * Math.sin(a), cy + hx * Math.sin(a) + hy * Math.cos(a)];
  }
  function garland(x0, x1, y, step, s) { // plumeria + leaves along the top of the footer
    var o = '';
    for (var x = x0, i = 0; x <= x1 + 0.01; x += step, i++) {
      o += leaf(x + step * 0.1, y + 0.4, s * 1.7, i % 2 ? -150 : -30, '#2e7d4f') + leaf(x - step * 0.1, y + 0.4, s * 1.5, i % 2 ? 160 : 20, '#3f9e5a');
    }
    for (x = x0, i = 0; x <= x1 + 0.01; x += step, i++) o += (i % 3 === 1 ? hibiscus(x, y, s, i * 40, '#ff6b5b', '#c2243b') : plumeria(x, y, s, i * 29));
    return o;
  }
  function vine(pts) {
    var d = 'M' + f(pts[0][0]) + ' ' + f(pts[0][1]);
    for (var i = 1; i < pts.length; i++) { var a = pts[i - 1], b = pts[i]; d += ' Q' + f((a[0] + b[0]) / 2) + ' ' + f(Math.max(a[1], b[1]) + 5) + ' ' + f(b[0]) + ' ' + f(b[1]); }
    return '<path d="' + d + '" fill="none" stroke="#2e7d4f" stroke-width=".7" stroke-linecap="round"/>';
  }

  var L = {
    lh: { H: 129.41, logo: [4, 4, 15, 15], lei: [50, 34, 25.5, 4.4], inR: 19.8, kick: 16.3, kickF: 1.45, title: 22.4, titleMax: 6.8, month: 37.2, monthF: 6, zoom: 45, corner: [69, 4.5, 29],
          tags2: [[27.5, 84, 43, 38, -4], [72.5, 85.4, 43, 38, 4]], tag1: [[50, 84.5, 48, 39, -2]], knot: [50, 60.5],
          foot: 109, fsc: 1, deco: [[6, 46, 2.6, 1], [11, 54, 2.2, 0], [93, 46, 2.6, 2], [89, 55, 2.2, 1], [4, 100, 2.4, 3], [96, 101, 2.4, 1], [50, 104.5, 2, 1]] },
    lp: { H: 129.41, logo: [3.5, 4, 21, 12.5], lei: [50, 31.5, 23, 4.1], inR: 17.6, kick: 15.4, kickF: 1.32, title: 20.6, titleMax: 6.2, month: 33.6, monthF: 5.4, zoom: 40.6, corner: [70, 4.5, 28],
          les: [6, 60.3, 88], head: 66.9, headF: 4.6, knot: [50, 55],
          bl: [[14, 82.6], [38, 82.6], [62, 82.6], [86, 82.6], [26, 100.6], [50, 100.6], [74, 100.6]], blR: 10.2, disc: 7.6,
          foot: 112.6, fsc: 0.95, deco: [[5, 46, 2.4, 1], [95, 46, 2.4, 2], [8, 54, 2, 0], [92, 54, 2, 3]] },
    sh: { H: 100, logo: [3, 3, 12, 12], lei: [29, 45.5, 21, 3.7], inR: 16.2, kick: 32.3, kickF: 1.12, title: 36.2, titleMax: 5.2, month: 47.6, monthF: 4.4, zoom: 53.6, corner: [17, 4.5, 38],
          tags2: [[77, 24, 39, 33, 3], [77, 63, 39, 33, -3]], tag1: [[77, 44, 41, 40, 2]], knot: null,
          tag: [3, 74, 52], foot: 84.6, fsc: 0.78, deco: [[54, 22, 2, 1], [55, 82, 1.8, 0], [4, 72, 1.8, 3]] },
    sp: { H: 100, logo: [52, 3.5, 18, 10.7], lei: [25, 27, 18.5, 3.4], inR: 14.2, title: 16.6, titleMax: 4.4, month: 26.9, monthF: 3.8, zoom: 32.4, corner: [72, 4.6, 26],
          kickR: [52, 17.4, 45], les: [52, 21.8, 45], head: 39.2, headF: 4,
          bl: [[13, 60.6], [37, 60.6], [63, 60.6], [87, 60.6], [25, 76.4], [50, 76.4], [75, 76.4]], blR: 9.4, disc: 7.1,
          foot: 87.4, fsc: 0.74, deco: [[50, 48, 1.8, 1], [97, 47, 1.6, 0]] }
  };

  var css = [
    '.my{container-type:inline-size;aspect-ratio:8.5/11;position:relative;overflow:hidden;border-radius:4px;box-shadow:0 10px 30px rgba(74,25,66,.22);background:radial-gradient(circle at 50% 22%,#fffdf7 0%,#fff6e6 45%,#ffeedd 80%,#fde3d6 100%);font-family:Quicksand,Poppins,sans-serif;color:#4a1942}',
    '.my.sq{aspect-ratio:1/1}',
    '.my>svg.my-bg{position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:1}',
    '.my .my-logo,.my .my-k,.my .my-t,.my .my-m,.my .my-z,.my .my-c,.my .my-s,.my .my-b,.my .my-les,.my .my-h,.my .my-tag,.my .my-f{position:absolute;z-index:3}',
    '.my .my-k,.my .my-z,.my .my-c,.my .my-les{z-index:4}',
    '.my .my-logo{background:#fff;border-radius:50%;display:grid;place-items:center;box-shadow:0 0 0 .6cqw #ff9eb5,0 .8cqw 1.6cqw rgba(74,25,66,.18)}',
    '.my .my-logo img{width:76%}.my .my-logo.my-pip{border-radius:2cqw}.my .my-logo.my-pip img{width:90%}',
    '.my .my-k{text-align:center;font-weight:700;letter-spacing:.14em;color:#2e7d4f;line-height:1.25}',
    '.my .my-t{text-align:center;font-family:Fraunces,"Playfair Display",serif;font-weight:800;line-height:1.02;color:#4a1942}',
    '.my .my-t span{display:block;color:#e8505b}',
    '.my .my-m{text-align:center;font-family:"Dancing Script",cursive;font-weight:700;line-height:1;color:#7b3fa8}',
    '.my .my-m b{color:#4a1942;font-family:Quicksand,sans-serif;font-weight:700;font-size:.62em;letter-spacing:.06em}',
    '.my .my-z{text-align:center;font-weight:700;letter-spacing:.16em;color:#fff;background:#2e7d4f;border-radius:9cqw;line-height:1;padding:.7cqw 0}',
    '.my .my-c{text-align:center;line-height:1}',
    '.my .my-c .my-ca{display:block;font-family:"Dancing Script",cursive;font-weight:700;color:#e8505b}',
    '.my .my-c .my-cb{display:block;font-weight:700;letter-spacing:.16em;color:#2e7d4f;margin-top:.5em}',
    '.my .my-s{display:flex;flex-direction:column;align-items:center;justify-content:flex-start;text-align:center}',
    '.my .my-s .my-d{font-family:"Dancing Script",cursive;font-weight:700;line-height:1;color:#e8505b;position:relative;z-index:1}',
    '.my .my-s .my-tm{font-weight:700;letter-spacing:.04em;color:#2e7d4f;margin:.35em 0 .55em;line-height:1.1;position:relative;z-index:1}',
    '.my .my-s .my-ti{font-family:Fraunces,"Playfair Display",serif;font-weight:800;line-height:1.06;color:#4a1942}',
    '.my .my-s .my-ds{font-weight:600;line-height:1.2;margin-top:.6em;color:#7a5a6e;position:relative;z-index:1}',
    '.my .my-b{display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;line-height:1.1}',
    '.my .my-b .my-i{font-weight:700;color:#4a1942;position:relative;z-index:1}.my .my-b .my-dy{font-weight:600;color:#7a5a6e;margin:.2em 0 .15em;position:relative;z-index:1}',
    '.my .my-b .my-zt{font-family:Fraunces,serif;font-weight:800;color:#c2243b;line-height:1.05}',
    '.my .my-les{text-align:center;font-weight:700;line-height:1.35;color:#4a1942}',
    '.my .my-les b{color:#e8505b;font-weight:700;letter-spacing:.1em;font-size:.8em;margin-right:.5em}',
    '.my .my-h{text-align:center;font-family:"Dancing Script",cursive;font-weight:700;line-height:1;color:#7b3fa8}',
    '.my .my-tag{text-align:center;font-family:"Dancing Script",cursive;font-weight:700;line-height:1.1;color:#7b3fa8}',
    '.my .my-f{display:flex;align-items:center;gap:2.4cqw;color:#fff}',
    '.my .my-f .my-rg{flex:1;line-height:1.3;font-weight:600}',
    '.my .my-f .my-rg b{display:block;font-family:Fraunces,serif;font-weight:800;line-height:1.1;color:#fff;margin-bottom:.15em}',
    '.my .my-f .my-rg b i{font-style:normal;color:#ffd166}',
    '.my .my-qr{flex:none;background:#fff;border-radius:1cqw;padding:.5cqw;display:grid;place-items:center;color:#2e7d4f;font-weight:700}',
    '.my .my-qr img{width:100%;height:100%;display:block}',
    '.my .my-bd{flex:none;display:flex;flex-direction:column;gap:.7cqw}',
    '.my .my-bd span{background:#fff6e6;color:#2e5d3f;border-radius:5cqw;font-weight:700;text-align:center;padding:.5em .9em;line-height:1;white-space:nowrap}'
  ].join('\n');

  function titleHtml(series, H) {
    var w = H.esc(series || 'Learning Labs').split(' '), last = w.pop();
    return { html: (w.length ? w.join(' ') : '') + '<span>' + last + '</span>', chars: Math.max(w.join(' ').length, last.length) };
  }

  function fn(spec, partner, sq, H) {
    var V = L[(sq ? 's' : 'l') + (partner ? 'p' : 'h')], S = spec.sessions.map(H.sessInfo), mon = H.MONTHS[spec.month - 1];
    var svg = '<defs><radialGradient id="myplu"><stop offset="0" stop-color="#ffd166"/><stop offset=".45" stop-color="#fff3c4"/><stop offset="1" stop-color="#fffdf6"/></radialGradient>'
      + '<linearGradient id="mypap" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fffdf6"/><stop offset="1" stop-color="#fff3e0"/></linearGradient>'
      + '<linearGradient id="mygrn" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2f8a55"/><stop offset="1" stop-color="#1f6440"/></linearGradient></defs>';
    var html = '', l = V.lei;
    // footer band first (under everything), garland on its top edge
    svg += '<rect x="0" y="' + f(V.foot) + '" width="100" height="' + f(V.H - V.foot + 1) + '" fill="url(#mygrn)"/>';
    // corner sprigs
    (V.deco || []).forEach(function (d, i) { svg += leaf(d[0], d[1], d[2] * 1.8, i * 70 + 20, '#3f9e5a') + flower(d[3], d[0], d[1], d[2], i * 50); });
    svg += lei(l[0], l[1], l[2], l[3]);

    var lg = V.logo;
    html += box('my-logo' + (partner ? ' my-pip' : ''), lg[0], lg[1], lg[2], lg[3], '<img src="' + (partner ? spec.pipUrl : spec.logoUrl) + '" alt="">');
    var c = V.corner;
    html += box('my-c', c[0], c[1], c[2], null, partner ? '<span class="my-ca" style="font-size:' + (sq ? 4.4 : 5) + 'cqw">May flowers</span><span class="my-cb" style="font-size:' + (sq ? 1.15 : 1.3) + 'cqw">&amp; HAPPY MOTHER\'S DAY</span>'
      : '<span class="my-ca" style="font-size:' + (sq ? 4.8 : 5) + 'cqw">Happy Lei Day</span><span class="my-cb" style="font-size:' + (sq ? 1.2 : 1.3) + 'cqw">&amp; HAPPY MOTHER\'S DAY</span>');

    var inW = V.inR * 2, T = titleHtml(spec.series, H), tf = Math.min(V.titleMax, (inW * 0.94) / (T.chars * 0.6));
    if (V.kick) html += box('my-k', l[0] - inW * 0.38, V.kick, inW * 0.76, null, partner ? 'FOR FAMILIES<br>ACROSS THE PACIFIC' : 'PARENT TRAINING &amp;<br>INFORMATION CENTER', 'font-size:' + V.kickF + 'cqw');
    html += box('my-t', l[0] - inW / 2, V.title, inW, null, T.html, 'font-size:' + f(tf) + 'cqw');
    html += box('my-m', l[0] - inW / 2, V.month, inW, null, mon + ' <b>' + spec.year + '</b>', 'font-size:' + V.monthF + 'cqw');
    var zw = sq ? 15 : 18;
    html += box('my-z', l[0] - zw / 2, V.zoom, zw, null, 'ON ZOOM', 'font-size:' + (sq ? 1.2 : 1.45) + 'cqw');

    if (!partner) {
      var D = S.length > 1 ? V.tags2 : V.tag1, k = sq ? 0.8 : 1;
      D.forEach(function (t, i) {
        if (i >= S.length) return;
        var hp = holePos(t[0], t[1], t[2], t[3], t[4]), from = V.knot ? V.knot : [t[0] + (i ? 3 : -3), -1];
        svg += '<path d="M' + f(from[0]) + ' ' + f(from[1]) + ' Q' + f((from[0] + hp[0]) / 2 + (V.knot ? 0 : 2)) + ' ' + f(Math.max(from[1], hp[1]) + 2) + ' ' + f(hp[0]) + ' ' + f(hp[1]) + '" fill="none" stroke="#b07a4f" stroke-width=".45"/>';
      });
      if (V.knot) svg += bow(V.knot[0], V.knot[1] - 1, 2.6);
      S.forEach(function (s, i) {
        var t = D[i], edge = i % 2 ? '#a66ad6' : '#ff6b5b';
        svg += tagShape(t[0], t[1], t[2], t[3], t[4], edge);
        var hp = holePos(t[0], t[1], t[2], t[3], t[4]);
        svg += plumeria(hp[0] + 2.2, hp[1] - 0.6, sq ? 2 : 2.4, 20 + i * 30);
        var top = t[2] * 0.2 + 2.2, w = t[2] - 6, solo = S.length === 1 ? 1.06 : 1;
        html += box('my-s', t[0] - w / 2, t[1] - t[3] / 2 + top, w, t[3] - top - 1.8,
          '<div class="my-d" style="font-size:' + f(4.6 * k * solo) + 'cqw">' + s.dow + ', ' + s.monFull + ' ' + s.day + '</div>'
          + '<div class="my-tm" style="font-size:' + f(2.3 * k * solo) + 'cqw">' + s.time + '</div>'
          + '<div class="my-ti" style="font-size:' + f(3.35 * k * solo) + 'cqw">' + s.lesson + '</div>'
          + (s.desc && !sq ? '<div class="my-ds" style="font-size:' + f(1.8 * solo) + 'cqw">' + s.desc + '</div>' : ''),
          'transform:rotate(' + t[4] + 'deg)');
      });
      if (V.tag) html += box('my-tag', V.tag[0], V.tag[1], V.tag[2], null, 'Celebrating moms &amp; every caregiver', 'font-size:3.6cqw');
    } else {
      if (V.kickR) html += box('my-k', V.kickR[0], V.kickR[1], V.kickR[2], null, 'FOR FAMILIES ACROSS THE PACIFIC', 'font-size:1.45cqw;text-align:left');
      var le = V.les;
      html += box('my-les', le[0], le[1], le[2], null, S.map(function (s, i) { return '<div><b>LESSON ' + (i + 1) + '</b>' + s.lesson + '</div>'; }).join(''), 'font-size:' + (sq ? 2.2 : 2.45) + 'cqw' + (sq ? ';text-align:left' : ''));
      html += box('my-h', sq ? 52 : 5, V.head, sq ? 45 : 90, null, 'Find your local time', 'font-size:' + V.headF + 'cqw' + (sq ? ';text-align:left' : ''));
      var rows = H.zoneRows(spec.sessions), P = V.bl;
      svg += vine([[-2, P[0][1] - 4]].concat(P.slice(0, 4)).concat([[102, P[0][1] - 4]])) + vine([[-2, P[4][1] - 6]].concat(P.slice(4)).concat([[102, P[4][1] - 6]]));
      var kinds = [0, 2, 3, 0, 2, 3, 0];
      rows.forEach(function (r, i) {
        var p = P[i], R = V.blR, kd = r.home ? 4 : kinds[i];
        svg += leaf(p[0] + R * 0.5, p[1] + R * 0.6, R * 0.9, 40, '#2e7d4f') + leaf(p[0] - R * 0.5, p[1] + R * 0.6, R * 0.9, 140, '#3f9e5a');
        if (kd === 4) svg += plumeria(p[0], p[1], R, 18);
        else if (kd === 2) { svg += '<g transform="translate(' + f(p[0]) + ' ' + f(p[1]) + ')">' + petals(5, R, 0.46, 0.56, 0.48, '#b07cd8') + '</g>'; }
        else svg += '<g transform="translate(' + f(p[0]) + ' ' + f(p[1]) + ') rotate(' + (i * 20) + ')">' + petals(5, R, 0.48, 0.56, 0.5, kd === 3 ? '#ff9eb5' : '#ff6b5b') + '</g>';
        svg += '<circle cx="' + f(p[0]) + '" cy="' + f(p[1]) + '" r="' + f(V.disc) + '" fill="' + (r.home ? '#ffe08a' : '#fffaf0') + '" stroke="' + (r.home ? '#f6b73c' : '#f3dcc0') + '" stroke-width=".3"/>';
        var w = V.disc * 1.86, zf = sq ? 0.88 : 1;
        html += box('my-b', p[0] - w / 2, p[1] - V.disc * 0.8, w, V.disc * 1.6,
          '<div class="my-i" style="font-size:' + f(1.6 * zf) + 'cqw">' + r.label + '</div><div class="my-dy" style="font-size:' + f(1.32 * zf) + 'cqw">' + r.days + '</div><div class="my-zt" style="font-size:' + f(2.25 * zf) + 'cqw">' + r.time + '</div>');
      });
    }

    svg += garland(4, 96, V.foot, sq ? 8 : 7.6, sq ? 1.9 : 2.2);
    var fs = V.fsc, fy = V.foot + (sq ? 2.6 : 3.4), fh = V.H - fy - (sq ? 1.2 : 2);
    html += box('my-f', 5, fy, 90, fh,
      '<div class="my-rg" style="font-size:' + f(2 * fs) + 'cqw"><b style="font-size:' + f(3.3 * fs) + 'cqw">REGISTER at <i>LDAHawaii.org</i></b>Get your Zoom link, scan the QR code,' + (sq ? ' ' : '<br>') + 'or call ' + H.phone(partner) + '</div>'
      + '<div class="my-qr" style="width:' + (sq ? 9 : 11) + 'cqw;height:' + (sq ? 9 : 11) + 'cqw">' + H.qrImg(spec, partner) + '</div>'
      + '<div class="my-bd" style="font-size:' + f(1.5 * fs) + 'cqw">' + H.badges(spec, partner) + '</div>');

    return '<div class="my' + (sq ? ' sq' : '') + (partner ? ' partner' : '') + '"><svg class="my-bg" viewBox="0 0 100 ' + V.H + '">' + svg + '</svg>' + html + '</div>';
  }

  return { name: 'May flowers (flower lei, hand-tied tags, blossom garland)', fonts: 'family=Fraunces:wght@600;800&family=Dancing+Script:wght@700&family=Quicksand:wght@500;600;700', css: css, fn: fn };
})());

/* ---- LL month 06 ---- */
VEBFlyers.registerTheme(6, (function () {
  /* June: "Summer at the beach" - sky + sun, rolling surf, sessions written on tall surfboards standing in the sand,
     partner times on beach balls along the shoreline, footer is a striped beach towel. */
  var uid = 0;
  function f(n) { return (Math.round(n * 100) / 100).toString(); }
  function box(cls, x, y, w, h, inner, extra) {
    return '<div class="' + cls + '" style="left:' + f(x) + 'cqw;top:' + f(y) + 'cqw;width:' + f(w) + 'cqw;' + (h != null ? 'height:' + f(h) + 'cqw;' : '') + (extra || '') + '">' + inner + '</div>';
  }
  function sun(cx, cy, r) {
    var o = '<g>';
    for (var i = 0; i < 16; i++) { var a = i * Math.PI / 8; o += '<path d="M' + f(cx + Math.cos(a - 0.09) * r * 1.18) + ' ' + f(cy + Math.sin(a - 0.09) * r * 1.18) + ' L' + f(cx + Math.cos(a) * r * (i % 2 ? 1.5 : 1.72)) + ' ' + f(cy + Math.sin(a) * r * (i % 2 ? 1.5 : 1.72)) + ' L' + f(cx + Math.cos(a + 0.09) * r * 1.18) + ' ' + f(cy + Math.sin(a + 0.09) * r * 1.18) + 'Z" fill="#ffc93c"/>'; }
    return o + '<circle cx="' + f(cx) + '" cy="' + f(cy) + '" r="' + f(r * 1.08) + '" fill="#ffe27a" opacity=".6"/><circle cx="' + f(cx) + '" cy="' + f(cy) + '" r="' + f(r) + '" fill="url(#jnsun)"/></g>';
  }
  function puff(x, y, w) {
    return '<g fill="#fff" opacity=".92"><ellipse cx="' + f(x + w * 0.5) + '" cy="' + f(y + w * 0.2) + '" rx="' + f(w * 0.5) + '" ry="' + f(w * 0.1) + '"/><circle cx="' + f(x + w * 0.35) + '" cy="' + f(y + w * 0.12) + '" r="' + f(w * 0.15) + '"/><circle cx="' + f(x + w * 0.6) + '" cy="' + f(y + w * 0.08) + '" r="' + f(w * 0.19) + '"/></g>';
  }
  function gull(x, y, s) { return '<path d="M' + f(x - s) + ' ' + f(y) + ' Q' + f(x - s * 0.5) + ' ' + f(y - s * 0.6) + ' ' + f(x) + ' ' + f(y) + ' Q' + f(x + s * 0.5) + ' ' + f(y - s * 0.6) + ' ' + f(x + s) + ' ' + f(y) + '" fill="none" stroke="#0b3954" stroke-width=".35" stroke-linecap="round"/>'; }
  function wavyLine(x0, x1, y, amp, len) {
    var d = 'M' + f(x0) + ' ' + f(y), x = x0, up = true;
    while (x < x1) { d += ' Q' + f(x + len / 2) + ' ' + f(y + (up ? -amp : amp)) + ' ' + f(x + len) + ' ' + f(y); x += len; up = !up; }
    return d;
  }
  function sea(top, shore, Hh) {
    var o = '<rect x="0" y="' + f(top) + '" width="100" height="' + f(shore - top + 4) + '" fill="url(#jnsea)"/>';
    var n = 4;
    for (var i = 0; i < n; i++) { var y = top + 1.6 + i * (shore - top - 2) / n; o += '<path d="' + wavyLine(-3 + (i % 2) * 3, 104, y, 0.7, 6) + '" fill="none" stroke="rgba(255,255,255,' + (0.45 + i * 0.1) + ')" stroke-width="' + f(0.35 + i * 0.1) + '" stroke-linecap="round"/>'; }
    // sand with foamy scalloped edge
    var d = 'M-2 ' + f(Hh + 2) + ' L-2 ' + f(shore), x = -2;
    while (x < 102) { d += ' Q' + f(x + 2.5) + ' ' + f(shore + 1.6) + ' ' + f(x + 5) + ' ' + f(shore); x += 5; }
    d += ' L102 ' + f(Hh + 2) + 'Z';
    o += '<path d="' + d.replace(/ L-2 ([\d.]+)/, function (m, a) { return ' L-2 ' + f(+a - 1.3); }) + '" fill="#ffffff" opacity=".85" transform="translate(0 -1.2)"/>';
    o += '<path d="' + d + '" fill="url(#jnsand)"/>';
    return o;
  }
  function boardPath(L, w) {
    var h = L / 2;
    return 'M0 ' + f(-h) + ' C' + f(w * 0.36) + ' ' + f(-h + L * 0.05) + ' ' + f(w / 2) + ' ' + f(-L * 0.22) + ' ' + f(w / 2) + ' ' + f(L * 0.02) + ' C' + f(w / 2) + ' ' + f(L * 0.26) + ' ' + f(w * 0.36) + ' ' + f(h - L * 0.04) + ' ' + f(w * 0.2) + ' ' + f(h)
      + ' L' + f(-w * 0.2) + ' ' + f(h) + ' C' + f(-w * 0.36) + ' ' + f(h - L * 0.04) + ' ' + f(-w / 2) + ' ' + f(L * 0.26) + ' ' + f(-w / 2) + ' ' + f(L * 0.02) + ' C' + f(-w / 2) + ' ' + f(-L * 0.22) + ' ' + f(-w * 0.36) + ' ' + f(-h + L * 0.05) + ' 0 ' + f(-h) + 'Z';
  }
  function board(cx, cy, L, w, rot, base, s1, s2) {
    var id = 'jnb' + (++uid), p = boardPath(L, w), h = L / 2;
    var o = '<g transform="translate(' + f(cx) + ' ' + f(cy) + ') rotate(' + rot + ')"><clipPath id="' + id + '"><path d="' + p + '"/></clipPath>'
      + '<path d="' + p + '" fill="rgba(11,57,84,.22)" transform="translate(.9 .8)"/><path d="' + p + '" fill="' + base + '"/>'
      + '<g clip-path="url(#' + id + ')">'
      + '<rect x="' + f(-w) + '" y="' + f(-h + L * 0.1) + '" width="' + f(w * 2) + '" height="' + f(L * 0.035) + '" fill="' + s1 + '"/>'
      + '<rect x="' + f(-w) + '" y="' + f(-h + L * 0.16) + '" width="' + f(w * 2) + '" height="' + f(L * 0.018) + '" fill="' + s2 + '"/>'
      + '<rect x="' + f(-w) + '" y="' + f(h - L * 0.2) + '" width="' + f(w * 2) + '" height="' + f(L * 0.018) + '" fill="' + s2 + '"/>'
      + '<rect x="' + f(-w) + '" y="' + f(h - L * 0.165) + '" width="' + f(w * 2) + '" height="' + f(L * 0.2) + '" fill="' + s1 + '"/>'
      + '<path d="M0 ' + f(-h) + ' V' + f(-h + L * 0.1) + ' M0 ' + f(h - L * 0.165) + ' V' + f(h) + '" stroke="rgba(11,57,84,.25)" stroke-width=".3"/>'
      + '<ellipse cx="' + f(-w * 0.22) + '" cy="' + f(-L * 0.05) + '" rx="' + f(w * 0.06) + '" ry="' + f(L * 0.2) + '" fill="rgba(255,255,255,.28)"/></g>'
      + '<path d="' + p + '" fill="none" stroke="rgba(11,57,84,.35)" stroke-width=".3"/></g>';
    return o;
  }
  function mound(cx, y, w) {
    var d = 'M' + f(cx - w) + ' ' + f(y) + ' C' + f(cx - w * 0.6) + ' ' + f(y - w * 0.05) + ' ' + f(cx - w * 0.55) + ' ' + f(y - w * 0.36) + ' ' + f(cx) + ' ' + f(y - w * 0.38) + ' C' + f(cx + w * 0.55) + ' ' + f(y - w * 0.36) + ' ' + f(cx + w * 0.6) + ' ' + f(y - w * 0.05) + ' ' + f(cx + w) + ' ' + f(y) + 'Z';
    return '<path d="' + d + '" fill="#e2b56b" transform="translate(0 .5)"/><path d="' + d + '" fill="url(#jnsand)"/>'
      + '<path d="M' + f(cx - w * 0.5) + ' ' + f(y - w * 0.12) + ' q1 -.5 2 0 M' + f(cx + w * 0.2) + ' ' + f(y - w * 0.22) + ' q1 -.5 2 0" fill="none" stroke="#d9a85a" stroke-width=".3" stroke-linecap="round"/>';
  }
  function seashell(cx, cy, r, c1, c2) { // scallop shell: fan of 9 ribs, scalloped rim, hinge ears below
    var n = 9, a0 = -150, a1 = -30, hy = cy + r * 0.55, R = r * 1.25, d = '', i, o = '';
    for (i = 0; i <= n; i++) {
      var a = (a0 + (a1 - a0) * i / n) * Math.PI / 180, x = cx + Math.cos(a) * R, y = hy + Math.sin(a) * R;
      if (!i) d = 'M' + f(cx) + ' ' + f(hy) + ' L' + f(x) + ' ' + f(y);
      else { var am = (a0 + (a1 - a0) * (i - 0.5) / n) * Math.PI / 180; d += ' Q' + f(cx + Math.cos(am) * R * 1.09) + ' ' + f(hy + Math.sin(am) * R * 1.09) + ' ' + f(x) + ' ' + f(y); }
    }
    d += 'Z';
    o += '<path d="' + d + '" fill="rgba(140,95,30,.2)" transform="translate(.5 .7)"/><path d="' + d + '" fill="' + c1 + '" stroke="' + c2 + '" stroke-width=".35" stroke-linejoin="round"/>';
    for (i = 1; i < n; i++) { var b = (a0 + (a1 - a0) * i / n) * Math.PI / 180; o += '<path d="M' + f(cx + Math.cos(b) * R * 0.78) + ' ' + f(hy + Math.sin(b) * R * 0.78) + ' L' + f(cx + Math.cos(b) * R * 1.0) + ' ' + f(hy + Math.sin(b) * R * 1.0) + '" stroke="' + c2 + '" stroke-width=".35" stroke-linecap="round"/>'; }
    o += '<path d="M' + f(cx - r * 0.36) + ' ' + f(hy - r * 0.2) + ' L' + f(cx + r * 0.36) + ' ' + f(hy - r * 0.2) + ' L' + f(cx + r * 0.2) + ' ' + f(hy + r * 0.08) + ' L' + f(cx - r * 0.2) + ' ' + f(hy + r * 0.08) + 'Z" fill="' + c2 + '"/>';
    return o;
  }
  function ball(cx, cy, r, rot, discFill, shadow) {
    var cols = ['#ff5a4e', '#ffffff', '#ffc93c', '#ffffff', '#1fa6c9', '#ffffff'], o = shadow ? '<ellipse cx="' + f(cx + r * 0.25) + '" cy="' + f(cy + r * 0.92) + '" rx="' + f(r * 0.85) + '" ry="' + f(r * 0.2) + '" fill="rgba(140,95,30,.25)"/>' : '';
    for (var i = 0; i < 6; i++) {
      var a0 = (rot + i * 60) * Math.PI / 180, a1 = (rot + (i + 1) * 60) * Math.PI / 180;
      o += '<path d="M' + f(cx) + ' ' + f(cy) + ' L' + f(cx + Math.cos(a0) * r) + ' ' + f(cy + Math.sin(a0) * r) + ' A' + f(r) + ' ' + f(r) + ' 0 0 1 ' + f(cx + Math.cos(a1) * r) + ' ' + f(cy + Math.sin(a1) * r) + 'Z" fill="' + cols[i] + '"/>';
    }
    o += '<circle cx="' + f(cx) + '" cy="' + f(cy) + '" r="' + f(r) + '" fill="none" stroke="rgba(11,57,84,.3)" stroke-width=".3"/>';
    if (discFill) o += '<circle cx="' + f(cx) + '" cy="' + f(cy) + '" r="' + f(r * 0.7) + '" fill="' + discFill + '" stroke="rgba(11,57,84,.18)" stroke-width=".3"/>';
    else o += '<circle cx="' + f(cx - r * 0.1) + '" cy="' + f(cy - r * 0.1) + '" r="' + f(r * 0.2) + '" fill="#fff"/>';
    return o;
  }
  function starfish(x, y, r, rot) {
    var d = '';
    for (var i = 0; i < 10; i++) { var a = (rot + i * 36 - 90) * Math.PI / 180, rr = i % 2 ? r * 0.45 : r; d += (i ? ' L' : 'M') + f(x + Math.cos(a) * rr) + ' ' + f(y + Math.sin(a) * rr); }
    return '<path d="' + d + 'Z" fill="#ff8a5b" stroke="#ff8a5b" stroke-width="' + f(r * 0.25) + '" stroke-linejoin="round"/><circle cx="' + f(x) + '" cy="' + f(y) + '" r="' + f(r * 0.12) + '" fill="#ffd0b8"/>';
  }
  function shell(x, y, s, rot) {
    var o = '<g transform="translate(' + f(x) + ' ' + f(y) + ') rotate(' + rot + ')"><path d="M0 ' + f(s * 0.45) + ' L' + f(-s * 0.55) + ' ' + f(-s * 0.15) + ' Q0 ' + f(-s * 0.75) + ' ' + f(s * 0.55) + ' ' + f(-s * 0.15) + 'Z" fill="#ffd9c7" stroke="#f0a989" stroke-width="' + f(s * 0.05) + '" stroke-linejoin="round"/>';
    for (var i = -2; i <= 2; i++) o += '<path d="M0 ' + f(s * 0.42) + ' L' + f(i * s * 0.2) + ' ' + f(-s * 0.4 + Math.abs(i) * s * 0.08) + '" stroke="#f0a989" stroke-width="' + f(s * 0.04) + '"/>';
    return o + '<rect x="' + f(-s * 0.15) + '" y="' + f(s * 0.38) + '" width="' + f(s * 0.3) + '" height="' + f(s * 0.14) + '" fill="#f0a989"/></g>';
  }
  function gradCap(x, y, s, rot) {
    return '<g transform="translate(' + f(x) + ' ' + f(y) + ') rotate(' + rot + ')"><path d="M' + f(-s * 0.5) + ' ' + f(s * 0.05) + ' Q0 ' + f(s * 0.55) + ' ' + f(s * 0.5) + ' ' + f(s * 0.05) + ' V' + f(-s * 0.05) + ' H' + f(-s * 0.5) + 'Z" fill="#163a5f"/>'
      + '<path d="M0 ' + f(-s * 0.5) + ' L' + f(s) + ' ' + f(-s * 0.15) + ' L0 ' + f(s * 0.2) + ' L' + f(-s) + ' ' + f(-s * 0.15) + 'Z" fill="#0b2540"/>'
      + '<path d="M0 ' + f(-s * 0.15) + ' L' + f(s * 0.75) + ' ' + f(-s * 0.05) + ' V' + f(s * 0.55) + '" fill="none" stroke="#ffc93c" stroke-width="' + f(s * 0.08) + '"/><circle cx="0" cy="' + f(-s * 0.15) + '" r="' + f(s * 0.08) + '" fill="#ffc93c"/>'
      + '<rect x="' + f(s * 0.68) + '" y="' + f(s * 0.5) + '" width="' + f(s * 0.15) + '" height="' + f(s * 0.3) + '" fill="#ffc93c"/></g>';
  }
  function towel(x, y, w, h) {
    var o = '<g filter="url(#jnsh)"><rect x="' + f(x) + '" y="' + f(y) + '" width="' + f(w) + '" height="' + f(h) + '" rx="1" fill="#1597a8"/></g>';
    var bands = [['#ffffff', 1.4], ['#ff5a4e', 1.6], ['#ffffff', 0.9], ['#ffc93c', 1.6], ['#ffffff', 0.9]];
    [0, 1].forEach(function (side) {
      var cx = side ? x + w - 1.2 : x + 1.2;
      bands.forEach(function (b) { var bw = b[1]; o += '<rect x="' + f(side ? cx - bw : cx) + '" y="' + f(y) + '" width="' + f(bw) + '" height="' + f(h) + '" fill="' + b[0] + '"/>'; cx += side ? -bw : bw; });
      for (var t = y + 0.8; t < y + h - 0.4; t += 1.3) { var fx = side ? x + w : x; o += '<path d="M' + f(fx) + ' ' + f(t) + ' h' + (side ? 1.4 : -1.4) + '" stroke="#f5f5f5" stroke-width=".4" stroke-linecap="round"/>'; }
    });
    return o;
  }

  var L = {
    lh: { H: 129.41, logo: [4, 4, 14, 14], kick: [21, 6.6, 50, 1.6], sum: [21, 9.8, 52, 4.2], sun: [86, 11, 7.2], title: [4, 22.4, 92, 11.2], month: [4, 35.4, 92, 4.6], seaTop: 44, shore: 63,
          boards2: [[29.5, 72, 66, 27, -6, '#fffaf0', '#ff5a4e', '#1fa6c9'], [70.5, 73, 66, 27, 6, '#fff3c4', '#1fa6c9', '#ff5a4e']], boards1: [[50, 72.5, 66, 29, -4, '#fffaf0', '#ff5a4e', '#1fa6c9']],
          tag: [10, 105.4, 80], towel: [5, 110, 90, 17], gulls: [[60, 9, 1.6], [66, 14, 1.2]], puffs: [[34, 17, 14]],
          deco: function (sv, n) { return starfish(8, 96, 3, 10) + shell(93, 97, 4.2, -15) + ball(9.5, 76, 4.6, 20, null, true) + (n > 1 ? '' : shell(80, 92, 3.6, 12)); }, cap: true },
    lp: { H: 129.41, logo: [4, 4, 21, 12.5], kick: [28, 6.8, 46, 1.55], sum: [28, 10, 48, 4.2], sun: [86, 11, 7.2], title: [4, 21.4, 92, 11], month: [4, 34.2, 92, 4.6], les: [6, 41.6, 88], seaTop: 49.5, shore: 61,
          head: [5, 63.4, 90, 4.4], balls: [[14, 77.6], [38, 77.6], [62, 77.6], [86, 77.6], [26, 96.4], [50, 96.4], [74, 96.4]], bR: 10.7, disc: 0.7,
          towel: [5, 110.6, 90, 16.6], gulls: [[62, 9, 1.6], [68, 14, 1.2]], puffs: [[36, 16.5, 12]],
          deco: function () { return starfish(6.5, 104.5, 2.6, 15) + shell(94, 104.2, 3.4, -20); } },
    sh: { H: 100, logo: [3, 3, 11, 11], kick: [16.5, 4.6, 52, 1.3], sum: [16.5, 7.4, 52, 3.3], sun: [89, 9, 5.6], title: [4, 16.6, 92, 8.2], month: [4, 26, 92, 3.6], seaTop: 33, shore: 44,
          boards2: [[29, 59, 50, 30, -6, '#fffaf0', '#ff5a4e', '#1fa6c9'], [71, 60, 50, 30, 6, '#fff3c4', '#1fa6c9', '#ff5a4e']], boards1: [[50, 59, 50, 32, -4, '#fffaf0', '#ff5a4e', '#1fa6c9']],
          towel: [4, 87, 92, 11.6], gulls: [[70, 6, 1.3]], puffs: [],
          deco: function (sv, n) { return starfish(6.5, 78, 2.6, 10) + shell(94, 79, 3.4, -15) + (n > 1 ? ball(50, 76, 3.8, 20, null, true) : ball(16, 72, 4, 20, null, true) + shell(84, 72, 3, 10)); } },
    sp: { H: 100, logo: [3, 3, 16, 9.5], kick: [22, 4.2, 50, 1.25], sum: [22, 6.8, 50, 3.2], sun: [89, 9, 5.6], title: [4, 14.4, 92, 7.4], month: [4, 22.6, 92, 3.3], les: [8, 27.6, 84], seaTop: 35.5, shore: 43,
          head: [5, 45.4, 90, 3.4], balls: [[13, 59.6], [37, 59.6], [63, 59.6], [87, 59.6], [25, 76.4], [50, 76.4], [75, 76.4]], bR: 9.6, disc: 0.71,
          towel: [4, 87.6, 92, 11], gulls: [], puffs: [],
          deco: function () { return starfish(5, 82, 2, 15) + shell(95, 82, 2.6, -20); } }
  };

  var css = [
    '.jn{container-type:inline-size;aspect-ratio:8.5/11;position:relative;overflow:hidden;border-radius:4px;box-shadow:0 10px 30px rgba(11,57,84,.25);background:linear-gradient(180deg,#5fd0ea 0%,#a6e8f5 30%,#e6fbff 48%);font-family:Nunito,Poppins,sans-serif;color:#0b3954}',
    '.jn.sq{aspect-ratio:1/1}',
    '.jn>svg.jn-bg{position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:1}',
    '.jn .jn-logo,.jn .jn-k,.jn .jn-u,.jn .jn-t,.jn .jn-m,.jn .jn-s,.jn .jn-b,.jn .jn-les,.jn .jn-h,.jn .jn-tag,.jn .jn-f{position:absolute;z-index:3}',
    '.jn .jn-k,.jn .jn-m,.jn .jn-les,.jn .jn-u{z-index:4}',
    '.jn .jn-logo{background:#fff;border-radius:50%;display:grid;place-items:center;box-shadow:0 0 0 .7cqw #ffc93c,0 .8cqw 1.6cqw rgba(11,57,84,.2)}',
    '.jn .jn-logo img{width:76%}.jn .jn-logo.jn-pip{border-radius:2cqw}.jn .jn-logo.jn-pip img{width:90%}',
    '.jn .jn-k{font-weight:900;letter-spacing:.16em;color:#0b3954;line-height:1.1}',
    '.jn .jn-u{font-family:Pacifico,cursive;line-height:1.25;color:#ff5a4e}',
    '.jn .jn-t{white-space:nowrap;text-align:center;font-family:"Luckiest Guy",Fredoka,sans-serif;line-height:1;color:#fff;letter-spacing:.02em;-webkit-text-stroke:.16cqw #0b3954;paint-order:stroke fill;text-shadow:0 .7cqw 0 #0b3954}',
    '.jn .jn-t span{color:#ffc93c}',
    '.jn .jn-m{text-align:center;font-weight:900;letter-spacing:.22em;color:#0b3954;line-height:1}',
    '.jn .jn-m b{color:#ff5a4e}',
    '.jn .jn-s{display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center}',
    '.jn .jn-s .jn-d{font-family:"Luckiest Guy",Fredoka,sans-serif;line-height:1;color:#ff5a4e;letter-spacing:.04em}',
    '.jn .jn-s .jn-tm{font-weight:900;color:#1586a0;margin:.45em 0 .6em;line-height:1.1}',
    '.jn .jn-s .jn-ti{font-weight:900;line-height:1.1;color:#0b3954}',
    '.jn .jn-s .jn-ds{font-weight:700;line-height:1.2;margin-top:.6em;color:#55707e}',
    '.jn .jn-b{display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;line-height:1.1}',
    '.jn .jn-b .jn-i{font-weight:900}.jn .jn-b .jn-dy{font-weight:700;color:#55707e;margin:.2em 0 .15em}.jn .jn-b .jn-zt{font-family:"Luckiest Guy",Fredoka,sans-serif;color:#ff5a4e;letter-spacing:.03em}',
    '.jn .jn-les{text-align:center;font-weight:800;line-height:1.35;color:#0b3954}',
    '.jn .jn-les b{display:inline-block;background:#ff5a4e;color:#fff;border-radius:3cqw;padding:.12em .6em;margin-right:.5em;font-size:.76em;letter-spacing:.08em;vertical-align:.1em}',
    '.jn .jn-h{text-align:center;font-family:Pacifico,cursive;line-height:1.2;color:#0b3954}',
    '.jn .jn-tag{text-align:center;font-family:Pacifico,cursive;line-height:1.2;color:#c2571a}',
    '.jn .jn-f{display:flex;align-items:center;gap:2.2cqw;color:#fff}',
    '.jn .jn-f .jn-rg{flex:1;line-height:1.3;font-weight:700}',
    '.jn .jn-f .jn-rg b{display:block;font-weight:900;line-height:1.1;color:#fff;margin-bottom:.1em}',
    '.jn .jn-f .jn-rg b i{font-style:normal;color:#ffe27a}',
    '.jn .jn-qr{flex:none;background:#fff;border-radius:1cqw;padding:.5cqw;display:grid;place-items:center;color:#0b3954;font-weight:900}',
    '.jn .jn-qr img{width:100%;height:100%;display:block}',
    '.jn .jn-bd{flex:none;display:flex;flex-direction:column;gap:.7cqw}',
    '.jn .jn-bd span{background:#fff;color:#0b3954;border-radius:5cqw;font-weight:800;text-align:center;padding:.5em .9em;line-height:1;white-space:nowrap}'
  ].join('\n');

  function fn(spec, partner, sq, H) {
    var V = L[(sq ? 's' : 'l') + (partner ? 'p' : 'h')], S = spec.sessions.map(H.sessInfo), mon = H.MONTHS[spec.month - 1];
    var svg = '<defs><radialGradient id="jnsun"><stop offset="0" stop-color="#fff3a8"/><stop offset=".7" stop-color="#ffd23f"/><stop offset="1" stop-color="#ffb81c"/></radialGradient>'
      + '<linearGradient id="jnsea" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0e8fb0"/><stop offset=".5" stop-color="#19b5c9"/><stop offset="1" stop-color="#5fd6d6"/></linearGradient>'
      + '<linearGradient id="jnsand" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fbe7bd"/><stop offset="1" stop-color="#efcf92"/></linearGradient>'
      + '<filter id="jnsh" x="-5%" y="-20%" width="110%" height="150%"><feDropShadow dx="0" dy=".7" stdDeviation=".7" flood-color="#6b4a14" flood-opacity=".3"/></filter></defs>';
    var html = '';
    svg += sun(V.sun[0], V.sun[1], V.sun[2]);
    V.puffs.forEach(function (p) { svg += puff(p[0], p[1], p[2]); });
    V.gulls.forEach(function (g) { svg += gull(g[0], g[1], g[2]); });
    svg += sea(V.seaTop, V.shore, V.H);
    svg += V.deco(svg, S.length);

    var lg = V.logo;
    html += box('jn-logo' + (partner ? ' jn-pip' : ''), lg[0], lg[1], lg[2], lg[3], '<img src="' + (partner ? spec.pipUrl : spec.logoUrl) + '" alt="">');
    html += box('jn-k', V.kick[0], V.kick[1], V.kick[2], null, partner ? 'FOR FAMILIES ACROSS THE PACIFIC' : 'PARENT TRAINING &amp; INFORMATION CENTER', 'font-size:' + V.kick[3] + 'cqw');
    html += box('jn-u', V.sum[0], V.sum[1], V.sum[2], null, 'Summer on Zoom!', 'font-size:' + V.sum[3] + 'cqw');
    var ser = H.esc(spec.series || 'Learning Labs'), chars = ser.replace(/&[a-z]+;/g, 'x').length;
    var tf = Math.min(V.title[3], V.title[2] * 0.96 / (chars * 0.6));
    html += box('jn-t', V.title[0], V.title[1] + (V.title[3] - tf) * 0.5, V.title[2], null, H.seriesTitle(spec.series), 'font-size:' + f(tf) + 'cqw');
    html += box('jn-m', V.month[0], V.month[1], V.month[2], null, '<b>' + mon.toUpperCase() + '</b> ' + spec.year + ' &nbsp;·&nbsp; ON ZOOM', 'font-size:' + V.month[3] + 'cqw');

    if (!partner) {
      var B = S.length > 1 ? V.boards2 : V.boards1, k = sq ? 0.78 : 1;
      S.forEach(function (s, i) {
        var b = B[i];
        svg += board(b[0], b[1], b[2], b[3], b[4], b[5], b[6], b[7]);
        if (V.cap && S.length > 1 && i === 1) {
          var a = b[4] * Math.PI / 180, nx = b[0] + Math.sin(a) * b[2] * 0.47, ny = b[1] - Math.cos(a) * b[2] * 0.47;
          svg += gradCap(nx + 0.4, ny - 1.6, 3.4, 10);
        }
      });
      S.forEach(function (s, i) { var b = B[i]; svg += mound(b[0] + Math.sin(b[4] * Math.PI / 180) * b[2] * 0.47, b[1] + b[2] * 0.5 + 1.2, b[3] * 0.66); });
      S.forEach(function (s, i) {
        var b = B[i], w = b[3] * 0.84, h = b[2] * 0.56, solo = S.length === 1 ? 1.05 : 1;
        html += box('jn-s', b[0] - w / 2, b[1] - h / 2 - b[2] * 0.02, w, h,
          '<div class="jn-d" style="font-size:' + f(3.3 * k * solo) + 'cqw">' + s.dow + ' ' + s.mon + ' ' + s.day + '</div>'
          + '<div class="jn-tm" style="font-size:' + f(2.15 * k * solo) + 'cqw">' + s.time + '</div>'
          + '<div class="jn-ti" style="font-size:' + f(3.25 * k * solo) + 'cqw">' + s.lesson + '</div>'
          + (s.desc && !sq ? '<div class="jn-ds" style="font-size:' + f(1.8 * solo) + 'cqw">' + s.desc + '</div>' : ''),
          'transform:rotate(' + b[4] + 'deg)');
      });
      if (V.tag && false) html += box('jn-tag', V.tag[0], V.tag[1], V.tag[2], null, 'Sun, sand &amp; new skills for parents', 'font-size:2.9cqw');
    } else {
      var le = V.les;
      html += box('jn-les', le[0], le[1], le[2], null, S.map(function (s, i) { return '<div><b>LESSON ' + (i + 1) + '</b>' + s.lesson + '</div>'; }).join(''), 'font-size:' + (sq ? 2 : 2.4) + 'cqw');
      html += box('jn-h', V.head[0], V.head[1], V.head[2], null, 'Catch your local time', 'font-size:' + V.head[3] + 'cqw');
      var SH = [['#ffe1d3', '#f0a989'], ['#ffd6e4', '#e98aa9'], ['#e9e0ff', '#a993d8'], ['#d9f4ef', '#7cc4b5']];
      H.zoneRows(spec.sessions).forEach(function (r, i) {
        var p = V.balls[i], R = V.bR;
        var sc = r.home ? ['#ffe27a', '#e9a92a'] : SH[i % SH.length];
        svg += seashell(p[0], p[1], R, sc[0], sc[1]);
        var w = R * 1.62, zf = sq ? 0.9 : 1;
        html += box('jn-b', p[0] - w / 2, p[1] - R * 0.72, w, R * 1.1,
          '<div class="jn-i" style="font-size:' + f(1.62 * zf) + 'cqw">' + r.label + '</div><div class="jn-dy" style="font-size:' + f(1.35 * zf) + 'cqw">' + r.days + '</div><div class="jn-zt" style="font-size:' + f(2.35 * zf) + 'cqw">' + r.time + '</div>');
      });
    }

    var t = V.towel, fs = sq ? 0.8 : 1;
    svg += towel(t[0], t[1], t[2], t[3]);
    html += box('jn-f', t[0] + 10.5, t[1] + 1, t[2] - 21, t[3] - 2,
      '<div class="jn-rg" style="font-size:' + f(1.95 * fs) + 'cqw"><b style="font-size:' + f(3.4 * fs) + 'cqw">REGISTER at <i>LDAHawaii.org</i></b>Get your Zoom link, scan the QR code,' + (sq ? ' ' : '<br>') + 'or call <span style="white-space:nowrap">' + H.phone(partner) + '</span></div>'
      + '<div class="jn-qr" style="width:' + (sq ? 9 : 11) + 'cqw;height:' + (sq ? 9 : 11) + 'cqw">' + H.qrImg(spec, partner) + '</div>'
      + '<div class="jn-bd" style="font-size:' + f(1.45 * fs) + 'cqw">' + H.badges(spec, partner) + '</div>');

    return '<div class="jn' + (sq ? ' sq' : '') + (partner ? ' partner' : '') + '"><svg class="jn-bg" viewBox="0 0 100 ' + V.H + '">' + svg + '</svg>' + html + '</div>';
  }

  return { name: 'Summer at the beach (surfboards, beach balls, towel)', fonts: 'family=Luckiest+Guy&family=Nunito:wght@600;700;800;900', css: css, fn: fn };
})());

/* ---- LL month 07 ---- */
VEBFlyers.registerTheme(7, {
  name: 'Summer picnic + Fourth of July (bunting, gingham blanket, picnic baskets, star constellation)',
  fonts: 'family=Alfa+Slab+One&family=Yellowtail&family=Nunito:wght@600;700;800;900',
  css: [
    '.jl{container-type:inline-size;aspect-ratio:8.5/11;position:relative;overflow:hidden;border-radius:4px;box-shadow:0 10px 30px rgba(19,37,79,.3);background:linear-gradient(180deg,#4fb0ec 0%,#8fd0f7 30%,#cdeeff 52%,#f4fbff 70%,#fff 100%);font-family:Nunito,Poppins,sans-serif;color:#13254f}',
    '.jl.sq{aspect-ratio:1/1}','.jl *,.jl *:before,.jl *:after{box-sizing:border-box}',
    '.jl .jl-bg{position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:0}',
    '.jl .jl-blanket{position:absolute;left:-6cqw;right:-6cqw;top:62cqw;height:52cqw;z-index:1;pointer-events:none;clip-path:polygon(14% 0,86% 0,100% 100%,0 100%);background-color:#fff;background-image:linear-gradient(90deg,rgba(214,40,57,.5) 50%,transparent 50%),linear-gradient(0deg,rgba(214,40,57,.5) 50%,transparent 50%);background-size:5.4cqw 5.4cqw}',
    '.jl .jl-logo{position:absolute;z-index:4;left:4cqw;top:15cqw;width:16cqw;height:16cqw;border-radius:50%;background:#fff;border:.8cqw solid #13254f;box-shadow:0 0 0 .6cqw #fff,0 .8cqw 1.6cqw rgba(19,37,79,.3);display:flex;align-items:center;justify-content:center}',
    '.jl .jl-logo img{width:12cqw;height:auto;display:block}',
    '.jl .jl-logo.pip{width:21cqw;height:12.5cqw;border-radius:2cqw;border-width:.6cqw}.jl .jl-logo.pip img{width:19cqw}',
    '.jl .jl-kick{position:absolute;z-index:4;left:24cqw;top:18.6cqw;font-weight:900;font-size:1.65cqw;letter-spacing:.16em;color:#13254f;background:rgba(255,255,255,.85);padding:.5cqw 1.4cqw;border-radius:5cqw;white-space:nowrap}',
    '.jl .jl-hello{position:absolute;z-index:4;left:24.5cqw;top:22.6cqw;font-family:Yellowtail,cursive;font-size:6cqw;line-height:1.1;color:#d62839;white-space:nowrap;text-shadow:0 .25cqw 0 #fff}',
    '.jl .jl-title{position:absolute;z-index:4;left:3cqw;right:3cqw;top:33cqw;text-align:center;font-family:"Alfa Slab One",serif;line-height:1;color:#13254f;white-space:nowrap;text-shadow:.35cqw .35cqw 0 #fff,.7cqw .7cqw 0 rgba(214,40,57,.85)}',
    '.jl .jl-title span{color:#d62839;text-shadow:.35cqw .35cqw 0 #fff,.7cqw .7cqw 0 rgba(19,37,79,.85)}',
    '.jl .jl-rib{position:absolute;z-index:4;left:50%;transform:translateX(-50%);top:47.5cqw;background:#d62839;color:#fff;font-family:"Alfa Slab One",serif;font-size:3.6cqw;letter-spacing:.08em;padding:1cqw 5cqw;white-space:nowrap;box-shadow:0 .6cqw 0 #9c1626}',
    '.jl .jl-rib:before,.jl .jl-rib:after{content:"";position:absolute;top:1.2cqw;width:4cqw;height:100%;background:#1d3a8a;z-index:-1}',
    '.jl .jl-rib:before{left:-3cqw;clip-path:polygon(0 0,100% 0,100% 100%,0 100%,35% 50%)}.jl .jl-rib:after{right:-3cqw;clip-path:polygon(0 0,100% 0,65% 50%,100% 100%,0 100%)}',
    '.jl .jl-zoom{position:absolute;z-index:5;width:17cqw;height:17cqw;right:4cqw;top:40cqw;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;color:#fff;font-weight:900;font-size:2cqw;line-height:1.05;padding-top:1.4cqw;transform:rotate(10deg)}',
    '.jl .jl-zoom svg{position:absolute;inset:0;width:100%;height:100%;z-index:-1;pointer-events:none}',
    '.jl .jl-zoom b{font-family:"Alfa Slab One",serif;font-weight:400;font-size:2.6cqw;color:#ffd23f}',
    /* picnic baskets */
    '.jl .jl-bk{position:absolute;z-index:5;width:43cqw;top:66cqw}',
    '.jl .jl-bk.jl-b1{left:5cqw}.jl .jl-bk.jl-b2{left:52cqw;top:68cqw}.jl .jl-bk.solo{left:28.5cqw}',
    '.jl .jl-hd{position:absolute;left:14%;width:72%;top:-8cqw;height:16cqw;border:1.5cqw solid #9a5b25;border-bottom:none;border-radius:50% 50% 0 0/100% 100% 0 0;z-index:-1;box-shadow:inset 0 .5cqw 0 rgba(255,255,255,.25)}',
    '.jl .jl-cl{height:3.4cqw;margin:0 3cqw -.6cqw;border-radius:1.6cqw 1.6cqw 0 0;background-color:#fff;background-image:linear-gradient(90deg,rgba(214,40,57,.55) 50%,transparent 50%),linear-gradient(0deg,rgba(214,40,57,.55) 50%,transparent 50%);background-size:2.4cqw 2.4cqw;position:relative;z-index:1}',
    '.jl .jl-bd{position:relative;z-index:2;padding:2.2cqw 2.4cqw 4.6cqw;border-radius:1.4cqw 1.4cqw 3cqw 3cqw;background-color:#c98a45;background-image:repeating-linear-gradient(0deg,rgba(90,45,10,.28) 0 .35cqw,transparent .35cqw 2.3cqw),repeating-linear-gradient(90deg,#b8763a 0 1.7cqw,#dfa05c 1.7cqw 3.4cqw);box-shadow:0 1.2cqw 1.6cqw rgba(19,37,79,.3)}',
    '.jl .jl-lb{background:#fffaf0;border:.45cqw solid #13254f;border-radius:1.4cqw;padding:1.8cqw 2cqw 2cqw;text-align:center;position:relative}',
    '.jl .jl-lb .n{display:inline-block;font-weight:900;font-size:1.55cqw;letter-spacing:.18em;color:#fff;background:#1d3a8a;border-radius:3cqw;padding:.35cqw 1.6cqw;margin-bottom:1cqw}',
    '.jl .jl-lb .dd{font-family:"Alfa Slab One",serif;font-size:3.7cqw;line-height:1.1;color:#13254f}',
    '.jl .jl-lb .tm{font-weight:900;font-size:2.3cqw;color:#d62839;margin:.4cqw 0 1.2cqw}',
    '.jl .jl-lb .ti{font-weight:900;font-size:2.85cqw;line-height:1.18;color:#13254f}',
    '.jl .jl-lb .ds{font-weight:700;font-style:italic;font-size:1.85cqw;color:#5a6788;margin-top:.9cqw}',
    /* pennant lesson banners (partner) */
    '.jl .jl-pn{position:absolute;z-index:5;width:44cqw;top:50cqw;padding:1.6cqw 7cqw 1.8cqw 3cqw;color:#fff;clip-path:polygon(0 0,100% 0,90% 50%,100% 100%,0 100%);min-height:11cqw;display:flex;flex-direction:column;justify-content:center}',
    '.jl .jl-pn.jl-p1{left:4cqw;background:#d62839}.jl .jl-pn.jl-p2{left:52cqw;background:#1d3a8a;top:51cqw}.jl .jl-pn.solo{left:28cqw}',
    '.jl .jl-pn .n{font-weight:900;font-size:1.5cqw;letter-spacing:.18em;color:#ffd23f}',
    '.jl .jl-pn .ti{font-weight:900;font-size:2.45cqw;line-height:1.15}',
    '.jl .jl-pole{position:absolute;z-index:4;width:1cqw;border-radius:.5cqw;background:linear-gradient(90deg,#b98a4a,#e9c48a,#9a6b30)}',
    '.jl .jl-h{position:absolute;z-index:4;left:0;right:0;top:61.6cqw;text-align:center;font-family:Yellowtail,cursive;font-size:5.4cqw;line-height:1.1;color:#d62839;text-shadow:0 .25cqw 0 #fff}',
    '.jl .jl-c{position:absolute;z-index:4;left:0;right:0;top:68cqw;text-align:center;font-weight:900;font-size:1.55cqw;letter-spacing:.18em;color:#13254f}',
    /* constellation stars (partner) */
    '.jl .jl-st{position:absolute;z-index:5;width:23cqw;height:23cqw;margin:-11.5cqw 0 0 -11.5cqw;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding-top:2.6cqw;color:#fff;pointer-events:none}',
    '.jl .jl-st>div{pointer-events:auto}',
    '.jl .jl-st svg{position:absolute;inset:0;width:100%;height:100%;z-index:-1;pointer-events:none;overflow:visible}',
    '.jl .jl-st .i{font-weight:900;font-size:1.55cqw;line-height:1.08;max-width:12.5cqw}',
    '.jl .jl-st .d{font-weight:700;font-size:1.28cqw;margin-top:.3cqw;white-space:nowrap}',
    '.jl .jl-st .t{font-family:"Alfa Slab One",serif;font-size:1.95cqw;margin-top:.2cqw;white-space:nowrap}',
    '.jl .jl-st.w{color:#13254f}.jl .jl-st.w .t{color:#d62839}',
    '.jl .jl-st.h{color:#13254f}.jl .jl-st.h .t{color:#13254f}',
    /* footer */
    '.jl .jl-ft{position:absolute;z-index:6;left:0;right:0;bottom:0;height:17cqw;background:#13254f;color:#fff;display:flex;align-items:center;gap:3cqw;padding:2.2cqw 4cqw 0}',
    '.jl .jl-ft:before{content:"";position:absolute;left:0;right:0;top:0;height:1.8cqw;background:repeating-linear-gradient(90deg,#d62839 0 3cqw,#fff 3cqw 6cqw)}',
    '.jl .jl-ft .rg{flex:1;font-size:1.9cqw;line-height:1.35;font-weight:700;color:#d8e2ff}',
    '.jl .jl-ft .rg b{display:block;font-family:"Alfa Slab One",serif;font-weight:400;font-size:3.3cqw;color:#fff;letter-spacing:.02em;margin-bottom:.4cqw}',
    '.jl .jl-ft .rg b span{color:#ffd23f}',
    '.jl .jl-qr{width:11cqw;height:11cqw;background:#fff;padding:.5cqw;border-radius:.8cqw;flex:none;display:flex;align-items:center;justify-content:center;color:#13254f;font-weight:900;font-size:2cqw}',
    '.jl .jl-qr img{width:100%;height:100%;display:block}',
    '.jl .jl-lg{display:flex;flex-direction:column;gap:.8cqw;flex:none;width:21cqw}',
    '.jl .jl-lg span{background:#fff;color:#13254f;border-radius:5cqw;font-weight:900;font-size:1.45cqw;text-align:center;padding:.6cqw 1cqw;white-space:nowrap}',
    /* ---- square ---- */
    '.jl.sq .jl-logo{left:4cqw;top:11.5cqw;width:13cqw;height:13cqw;border-width:.6cqw}.jl.sq .jl-logo img{width:9.6cqw}',
    '.jl.sq .jl-logo.pip{width:19cqw;height:11.3cqw}.jl.sq .jl-logo.pip img{width:17cqw}',
    '.jl.partner .jl-kick{left:28cqw;top:19.5cqw}.jl.partner:not(.sq) .jl-title{top:27.5cqw}.jl.partner:not(.sq) .jl-rib{top:41.5cqw}.jl.sq .jl-kick{left:20.5cqw;top:12.5cqw;font-size:1.45cqw}.jl.sq.partner .jl-kick{left:26cqw}',
    '.jl.sq .jl-title{left:20.5cqw;right:auto;top:16.6cqw;text-align:left}.jl.sq.partner .jl-title{left:26cqw}',
    '.jl.sq .jl-rib{left:21.5cqw;transform:none;top:27.2cqw;font-size:2.5cqw;padding:.8cqw 3.4cqw}.jl.sq.partner .jl-rib{left:27cqw}',
    '.jl.sq .jl-rib:before,.jl.sq .jl-rib:after{top:.9cqw;width:3cqw}.jl.sq .jl-rib:before{left:-2.2cqw}.jl.sq .jl-rib:after{right:-2.2cqw}',
    '.jl.sq .jl-zoom{width:14cqw;height:14cqw;right:4cqw;top:19cqw;font-size:1.6cqw}.jl.sq .jl-zoom b{font-size:2.1cqw}',
    '.jl.sq .jl-blanket{top:44cqw;height:46cqw}',
    '.jl.sq .jl-bk{width:41cqw;top:43.5cqw}.jl.sq .jl-bk.jl-b1{left:6cqw}.jl.sq .jl-bk.jl-b2{left:53cqw;top:44.5cqw}.jl.sq .jl-bk.solo{left:29.5cqw}',
    '.jl.sq .jl-hd{top:-6.5cqw;height:13cqw;border-width:1.2cqw}',
    '.jl.sq .jl-bd{padding:1.6cqw 2cqw 3cqw}.jl.sq .jl-lb{padding:1.2cqw 1.6cqw 1.4cqw}',
    '.jl.sq .jl-lb .n{font-size:1.3cqw;margin-bottom:.6cqw}.jl.sq .jl-lb .dd{font-size:3.2cqw}.jl.sq .jl-lb .tm{font-size:2.05cqw;margin:.2cqw 0 .7cqw}.jl.sq .jl-lb .ti{font-size:2.5cqw}.jl.sq .jl-lb .ds{display:none}',
    '.jl.sq .jl-pn{top:35cqw;min-height:9cqw;padding:1.1cqw 6cqw 1.2cqw 2.6cqw}.jl.sq .jl-pn.jl-p2{top:35.5cqw}.jl.sq .jl-pn .n{font-size:1.25cqw}.jl.sq .jl-pn .ti{font-size:2.1cqw}',
    '.jl.sq .jl-st{width:19.5cqw;height:19.5cqw;margin:-9.75cqw 0 0 -9.75cqw;padding-top:2cqw}',
    '.jl.sq .jl-st .i{font-size:1.4cqw;max-width:10.5cqw}.jl.sq .jl-st .d{font-size:1.12cqw}.jl.sq .jl-st .t{font-size:1.7cqw}',
    '.jl.sq .jl-ft{height:13.5cqw;padding:1.8cqw 4cqw 0;gap:2.4cqw}.jl.sq .jl-ft:before{height:1.4cqw}',
    '.jl.sq .jl-ft .rg{font-size:1.65cqw}.jl.sq .jl-ft .rg b{font-size:2.8cqw}.jl.sq .jl-qr{width:9.6cqw;height:9.6cqw}.jl.sq .jl-lg{width:19cqw}.jl.sq .jl-lg span{font-size:1.3cqw}'
  ].join('\n'),
  fn: function (spec, partner, sq, H) {
    var S = spec.sessions.map(H.sessInfo), HH = sq ? 100 : 129.41, solo = S.length === 1;
    var seed = 7 + (partner ? 3 : 0) + (sq ? 5 : 0);
    function rnd() { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; }
    function f(n) { return (+n).toFixed(2); }
    function starPath(cx, cy, R, r) {
      var p = [];
      for (var k = 0; k < 10; k++) { var a = -Math.PI / 2 + k * Math.PI / 5, rr = k % 2 ? r : R; p.push(f(cx + rr * Math.cos(a)) + ' ' + f(cy + rr * Math.sin(a))); }
      return 'M' + p.join('L') + 'Z';
    }
    function star(fill, stroke, sw) { return '<svg viewBox="0 0 100 100"><path d="' + starPath(50, 54, 49, 30) + '" fill="' + fill + '" stroke="' + stroke + '" stroke-width="' + sw + '" stroke-linejoin="round"/></svg>'; }
    /* ---- decoration: sun, clouds, bunting ---- */
    var g = '';
    var sx = sq ? 92 : 90, sy = sq ? 5 : 8, sr = sq ? 9 : 11;
    for (var i = 0; i < 16; i++) {
      var a = i * Math.PI / 8;
      g += '<path d="M' + f(sx + Math.cos(a) * (sr + 2)) + ' ' + f(sy + Math.sin(a) * (sr + 2)) + 'L' + f(sx + Math.cos(a + .1) * (sr + 7)) + ' ' + f(sy + Math.sin(a + .1) * (sr + 7)) + 'L' + f(sx + Math.cos(a - .1) * (sr + 7)) + ' ' + f(sy + Math.sin(a - .1) * (sr + 7)) + 'Z" fill="#ffb703" opacity=".85"/>';
    }
    g += '<circle cx="' + sx + '" cy="' + sy + '" r="' + (sr + 1) + '" fill="#ffe27a" opacity=".6"/><circle cx="' + sx + '" cy="' + sy + '" r="' + sr + '" fill="#ffd23f"/>';
    function cloud(x, y, s) { return '<g fill="#fff" opacity=".9"><ellipse cx="' + x + '" cy="' + y + '" rx="' + 7 * s + '" ry="' + 2.6 * s + '"/><circle cx="' + (x - 2.5 * s) + '" cy="' + (y - 1.6 * s) + '" r="' + 2.8 * s + '"/><circle cx="' + (x + 1.8 * s) + '" cy="' + (y - 2.4 * s) + '" r="' + 3.4 * s + '"/></g>'; }
    g += sq ? cloud(10, 33, .8) + cloud(88, 38, .7) : cloud(12, 44, 1) + cloud(70, 28, .8) + cloud(90, 60, .9);
    var y0 = sq ? 1.5 : 2, sag = sq ? 7 : 10, pw = sq ? 6 : 7, ph = sq ? 6.5 : 8;
    function by(x) { var t = (x + 2) / 104; return (1 - t) * (1 - t) * y0 + 2 * t * (1 - t) * (y0 + sag * 2) + t * t * y0; }
    g += '<path d="M-2 ' + y0 + ' Q50 ' + (y0 + sag * 2) + ' 102 ' + y0 + '" fill="none" stroke="#7a5230" stroke-width=".45"/>';
    var cols = ['#d62839', '#fff', '#1d3a8a'], n = Math.ceil(104 / pw);
    for (var j = 0; j < n; j++) {
      var x1 = -2 + j * pw + .3, x2 = x1 + pw - .6, xm = (x1 + x2) / 2, c = cols[j % 3];
      var ya = by(x1), yb = by(x2), ym = (ya + yb) / 2 + ph;
      g += '<path d="M' + f(x1) + ' ' + f(ya) + 'L' + f(x2) + ' ' + f(yb) + 'L' + f(xm) + ' ' + f(ym) + 'Z" fill="' + c + '"' + (c === '#fff' ? ' stroke="#c9d3ea" stroke-width=".2"' : '') + '/>';
      if (c === '#1d3a8a') g += '<path d="' + starPath(xm, (ya + yb) / 2 + ph * .36, ph * .2, ph * .08) + '" fill="#fff"/>';
    }
    /* little stars in the sky */
    var spots = sq ? [[3, 30], [96, 30], [16, 39], [84, 41]] : partner ? [[4, 37], [96, 33], [95, 46], [6, 45.5]] : [[4, 37], [96, 33], [7, 56], [94, 58], [30, 57], [70, 56]];
    spots.forEach(function (p, k) { g += '<path d="' + starPath(p[0], p[1], 1.6 + (k % 2) * .6, .7 + (k % 2) * .25) + '" fill="' + (k % 2 ? '#d62839' : '#fff') + '" opacity=".95"/>'; });
    var series = H.esc(spec.series || 'Learning Labs'), words = series.split(' '), last = words.pop();
    var tlen = (spec.series || 'Learning Labs').length;
    var tfs = sq ? Math.min(7.6, (partner ? 70 : 74) / (tlen * .64)) : Math.min(11.5, 90 / (tlen * .64));
    var month = H.MONTHS[spec.month - 1];
    var logo = partner ? '<div class="jl-logo pip"><img src="' + spec.pipUrl + '" alt=""></div>' : '<div class="jl-logo"><img src="' + spec.logoUrl + '" alt=""></div>';
    var head = logo + '<div class="jl-kick">' + (partner ? 'FOR FAMILIES ACROSS THE PACIFIC' : 'PARENT TRAINING &amp; INFORMATION CENTER') + '</div>'
      + (sq || partner ? '' : '<div class="jl-hello">Let\'s picnic &amp; learn!</div>')
      + '<div class="jl-title" style="font-size:' + f(tfs) + 'cqw">' + (words.length ? words.join(' ') + ' ' : '') + '<span>' + last + '</span></div>'
      + '<div class="jl-rib">' + month.toUpperCase() + ' ' + spec.year + (partner ? ' · ON ZOOM' : '') + '</div>';
    var foot = '<div class="jl-ft"><div class="rg"><b>REGISTER at <span>LDAHawaii.org</span></b>Get your Zoom link, scan the QR code,<br>or call ' + H.phone(partner) + '</div><div class="jl-qr">' + H.qrImg(spec, partner) + '</div><div class="jl-lg">' + H.badges(spec, partner) + '</div></div>';
    var root = '<div class="jl' + (sq ? ' sq' : '') + (partner ? ' partner' : '') + '">';
    if (!partner) {
      var bks = S.map(function (s, i) {
        return '<div class="jl-bk jl-b' + (i + 1) + (solo ? ' solo' : '') + '"><div class="jl-hd"></div><div class="jl-cl"></div><div class="jl-bd"><div class="jl-lb"><div class="n">BASKET ' + (i + 1) + '</div><div class="dd">' + s.dow + '., ' + s.mon + ' ' + s.day + '</div><div class="tm">' + s.time + '</div><div class="ti">' + s.lesson + '</div>' + (s.desc ? '<div class="ds">' + s.desc + '</div>' : '') + '</div></div></div>';
      }).join('');
      var zoom = '<div class="jl-zoom">' + star('#1d3a8a', '#fff', 3) + 'ALL ON<b>ZOOM</b></div>';
      return root + '<svg class="jl-bg" viewBox="0 0 100 ' + HH + '" preserveAspectRatio="none">' + g + '</svg><div class="jl-blanket"></div>' + head + zoom + bks + foot + '</div>';
    }
    var pns = S.map(function (s, i) { return '<div class="jl-pn jl-p' + (i + 1) + (solo ? ' solo' : '') + '"><div class="n">LESSON ' + (i + 1) + '</div><div class="ti">' + s.lesson + '</div></div>'; }).join('');
    var rows = H.zoneRows(spec.sessions);
    var pos = sq ? [[13, 55.5], [37.5, 59], [62.5, 55], [87, 58.5], [25, 74.5], [50, 76.5], [75, 74]]
                 : [[13, 82], [37.5, 85], [62.5, 81.5], [87, 84.5], [25, 100], [50, 101], [75, 99.5]];
    /* constellation lines */
    var order = [0, 4, 1, 5, 2, 6, 3], ln = '';
    for (var q = 0; q < order.length - 1; q++) { var A = pos[order[q]], B = pos[order[q + 1]]; ln += '<line x1="' + A[0] + '" y1="' + A[1] + '" x2="' + B[0] + '" y2="' + B[1] + '" stroke="#13254f" stroke-width=".35" stroke-dasharray="1 1.2" opacity=".55"/>'; }
    var fills = [['#d62839', '#fff', ''], ['#ffd23f', '#d62839', 'h'], ['#1d3a8a', '#fff', ''], ['#fff', '#d62839', 'w'], ['#d62839', '#fff', ''], ['#1d3a8a', '#fff', ''], ['#fff', '#1d3a8a', 'w']];
    var stars = rows.map(function (r, i) {
      var c = r.home ? fills[1] : fills[i === 1 ? 0 : i];
      return '<div class="jl-st ' + c[2] + (r.home ? ' h' : '') + '" style="left:' + pos[i][0] + 'cqw;top:' + pos[i][1] + 'cqw">' + star(c[0], c[1], r.home ? 3.5 : 2.5) + '<div class="i">' + r.label + '</div><div class="d">' + r.days + '</div><div class="t">' + r.time + '</div></div>';
    }).join('');
    var poles = S.map(function (s, i) { var L = solo ? 27 : (i ? 51 : 3); return '<div class="jl-pole" style="left:' + L + 'cqw;top:' + (sq ? 34 : 49) + 'cqw;height:' + (sq ? 12 : 15) + 'cqw"></div>'; }).join('');
    return root + '<svg class="jl-bg" viewBox="0 0 100 ' + HH + '" preserveAspectRatio="none">' + g + ln + '</svg>' + head + poles + pns
      + (sq ? '' : '<div class="jl-h">Find your star time</div><div class="jl-c">' + (S.length > 1 ? 'BOTH LESSONS' : 'LESSON') + ' · LOCAL TIME FOR EACH ISLAND</div>') + stars + foot + '</div>';
  }
});

/* ---- LL month 08 ---- */
VEBFlyers.registerTheme(8, {
  name: 'Back to school (chalkboard, notebook pages, pencils, apple tree)',
  fonts: 'family=Cabin+Sketch:wght@700&family=Schoolbell&family=Lexend:wght@400;600;700;800',
  css: [
    '.au{container-type:inline-size;aspect-ratio:8.5/11;position:relative;overflow:hidden;border-radius:4px;box-shadow:0 10px 30px rgba(40,30,0,.3);background:radial-gradient(circle at 50% 75%,#ffd84a 0%,#ffc914 55%,#f5b800 100%);font-family:Lexend,Poppins,sans-serif;color:#24304f}',
    '.au.sq{aspect-ratio:1/1}',
    '.au *,.au *:before,.au *:after{box-sizing:border-box}',
    '.au .au-bg{position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:0}',
    /* logo card held by a magnet */
    '.au .au-logo{position:absolute;z-index:4;left:8cqw;top:9cqw;width:15cqw;height:15cqw;background:#fff;border-radius:.6cqw;box-shadow:.4cqw .6cqw 0 rgba(0,0,0,.3);display:flex;align-items:center;justify-content:center;transform:rotate(-4deg)}',
    '.au .au-logo img{width:12.4cqw;height:auto;display:block}',
    '.au .au-logo:before{content:"";position:absolute;top:-1.6cqw;left:50%;margin-left:-1.6cqw;width:3.2cqw;height:3.2cqw;border-radius:50%;background:radial-gradient(circle at 35% 35%,#ff8a80,#e23d3d 55%,#a51d1d);box-shadow:0 .3cqw .4cqw rgba(0,0,0,.35)}',
    '.au .au-logo.pip{width:22cqw;height:13cqw;left:7cqw;top:8.5cqw}.au .au-logo.pip img{width:20cqw}',
    '.au .au-kick{position:absolute;z-index:4;left:27cqw;top:10.6cqw;font-weight:700;font-size:1.62cqw;letter-spacing:.17em;color:#ffe27a;white-space:nowrap}',
    '.au .au-hi{position:absolute;z-index:4;left:27cqw;top:13.6cqw;font-family:Schoolbell,cursive;font-size:5.6cqw;line-height:1.15;color:#fff;white-space:nowrap;text-shadow:0 0 .35cqw rgba(255,255,255,.4)}',
    '.au .au-title{position:absolute;z-index:4;left:6cqw;right:6cqw;top:27cqw;text-align:center;font-family:"Cabin Sketch",cursive;font-weight:700;line-height:1;color:#fbfbf4;white-space:nowrap;text-shadow:0 0 .4cqw rgba(255,255,255,.35)}',
    '.au .au-title span{color:#ffe27a}',
    '.au .au-mo{position:absolute;z-index:4;left:6cqw;right:6cqw;top:43.5cqw;text-align:center;font-family:Schoolbell,cursive;font-size:6cqw;line-height:1.1;color:#ffe27a;white-space:nowrap;text-shadow:0 0 .35cqw rgba(255,226,122,.35)}',
    '.au .au-zm{position:absolute;z-index:4;right:7.5cqw;top:41.5cqw;width:15cqw;height:11cqw;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;font-family:Schoolbell,cursive;font-size:2.3cqw;line-height:1;color:#fff}',
    '.au .au-zm b{font-family:"Cabin Sketch",cursive;font-size:3.3cqw;color:#ffb3c7}',
    '.au .au-zm svg{position:absolute;inset:-1cqw;width:calc(100% + 2cqw);height:calc(100% + 2cqw);pointer-events:none;z-index:-1;overflow:visible}',
    /* notebook pages */
    '.au .au-nb{position:absolute;z-index:5;width:42cqw;top:58cqw;background-color:#fffef8;background-image:linear-gradient(90deg,transparent 4.4cqw,#f08c8c 4.4cqw 4.7cqw,transparent 4.7cqw),repeating-linear-gradient(180deg,transparent 0 3.3cqw,#dfe9f7 3.3cqw 3.48cqw);background-position:0 0,0 4.2cqw;border-radius:.6cqw;box-shadow:.5cqw .9cqw 0 rgba(90,60,0,.28);padding:5.6cqw 2.6cqw 3cqw 6.4cqw}',
    '.au .au-nb.au-n1{left:5cqw;transform:rotate(-2.5deg)}.au .au-nb.au-n2{left:53cqw;top:59cqw;transform:rotate(2deg)}.au .au-nb.solo{left:29cqw;transform:rotate(-1.5deg)}',
    '.au .au-coil{position:absolute;left:0;right:0;top:-1.9cqw;height:5cqw;width:100%;pointer-events:none}',
    '.au .au-nb .n{font-family:Schoolbell,cursive;font-size:2.7cqw;line-height:1.1;color:#d7263d}',
    '.au .au-nb .dd{font-weight:800;font-size:3.6cqw;line-height:1.15;color:#1f4a35;margin-top:.4cqw}',
    '.au .au-nb .tm{display:inline-block;font-weight:700;font-size:2.25cqw;color:#24304f;background:linear-gradient(180deg,transparent 45%,#fff07a 45%,#ffe94d 92%,transparent 92%);padding:0 .5cqw;margin:.3cqw 0 1.2cqw -.5cqw}',
    '.au .au-nb .ti{font-weight:700;font-size:2.8cqw;line-height:1.2;color:#24304f}',
    '.au .au-nb .ds{font-family:Schoolbell,cursive;font-size:2.35cqw;line-height:1.15;color:#2f6db5;margin-top:1cqw}',
    /* pencil lesson banners (partner) */
    '.au .au-pc{position:absolute;z-index:5;width:45cqw;top:44cqw;display:flex;align-items:stretch;filter:drop-shadow(.4cqw .6cqw 0 rgba(90,60,0,.3))}',
    '.au .au-pc.au-c1{left:3.5cqw}.au .au-pc.au-c2{left:51.5cqw}.au .au-pc.solo{left:27.5cqw}',
    '.au .au-pc .er{flex:none;width:3.6cqw;background:linear-gradient(180deg,#ff9fb5,#f06e8f);border-radius:1.4cqw 0 0 1.4cqw}',
    '.au .au-pc .fe{flex:none;width:2.8cqw;background:repeating-linear-gradient(90deg,#c9ccd2 0 .5cqw,#8d939c .5cqw .7cqw),#c9ccd2}',
    '.au .au-pc .bd{flex:1;min-height:10cqw;background:linear-gradient(180deg,#e9a800 0 16%,#ffd23f 16% 84%,#e09f00 84%);padding:1.5cqw 1.4cqw 1.5cqw 1.6cqw;display:flex;flex-direction:column;justify-content:center}',
    '.au .au-pc .tp{flex:none;width:6.4cqw;background:linear-gradient(90deg,#f3d29c 0 68%,#3a3a3a 68%);clip-path:polygon(0 0,100% 50%,0 100%)}',
    '.au .au-pc .n{font-weight:800;font-size:1.4cqw;letter-spacing:.16em;color:#9a3d00}',
    '.au .au-pc .ti{font-weight:700;font-size:2.2cqw;line-height:1.15;color:#2b1d05}',
    '.au .au-h{position:absolute;z-index:4;left:0;right:0;top:55.4cqw;text-align:center;font-family:Schoolbell,cursive;font-size:5.2cqw;line-height:1.1;color:#1f4a35}',
    '.au .au-c{position:absolute;z-index:4;left:0;right:0;top:61.6cqw;text-align:center;font-weight:800;font-size:1.5cqw;letter-spacing:.18em;color:#5a3b00}',
    /* apples */
    '.au .au-ap{position:absolute;z-index:5;width:20cqw;height:20cqw;margin:-10cqw 0 0 -10cqw;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding-top:3cqw;color:#fff;pointer-events:none}',
    '.au .au-ap>div{pointer-events:auto}',
    '.au .au-ap svg{position:absolute;inset:0;width:100%;height:100%;z-index:-1;pointer-events:none;overflow:visible}',
    '.au .au-ap .i{font-weight:800;font-size:1.5cqw;line-height:1.08;max-width:14.5cqw}',
    '.au .au-ap .d{font-weight:600;font-size:1.22cqw;margin-top:.25cqw;white-space:nowrap}',
    '.au .au-ap .t{font-weight:800;font-size:2cqw;margin-top:.15cqw;white-space:nowrap}',
    '.au .au-ap.g{color:#183d0c}.au .au-ap.h{color:#3b2a00}',
    /* ruler footer */
    '.au .au-ft{position:absolute;z-index:6;left:0;right:0;bottom:0;height:17cqw;background-color:#f4d08a;background-image:linear-gradient(90deg,rgba(0,0,0,.55) 0 .22cqw,transparent .22cqw),linear-gradient(90deg,rgba(0,0,0,.55) 0 .2cqw,transparent .2cqw),linear-gradient(90deg,rgba(0,0,0,.4) 0 .15cqw,transparent .15cqw),linear-gradient(180deg,#f7dca2,#ecc26f);background-size:10cqw 3cqw,5cqw 2cqw,1cqw 1.2cqw,100% 100%;background-repeat:repeat-x,repeat-x,repeat-x,no-repeat;background-position:2cqw 0,2cqw 0,2cqw 0,0 0;border-top:.4cqw solid #b98a3a;display:flex;align-items:center;gap:3cqw;padding:3.4cqw 4cqw .4cqw;color:#3b2a10}',
    '.au .au-ft .rg{flex:1;font-size:1.85cqw;line-height:1.35;font-weight:600}',
    '.au .au-ft .rg b{display:block;font-weight:800;font-size:3.2cqw;color:#1f4a35;margin-bottom:.3cqw}',
    '.au .au-ft .rg b span{color:#d7263d}',
    '.au .au-qr{width:11cqw;height:11cqw;background:#fff;padding:.5cqw;border-radius:.6cqw;flex:none;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:2cqw;color:#1f4a35;box-shadow:0 0 0 .3cqw #1f4a35}',
    '.au .au-qr img{width:100%;height:100%;display:block}',
    '.au .au-lg{display:flex;flex-direction:column;gap:.8cqw;flex:none;width:21cqw}',
    '.au .au-lg span{background:#1f4a35;color:#fff;border-radius:.6cqw;font-weight:700;font-size:1.4cqw;text-align:center;padding:.65cqw 1cqw;white-space:nowrap}',
    '.au.partner:not(.sq) .au-kick{left:32cqw;top:9.6cqw}.au.partner:not(.sq) .au-hi{left:32cqw;top:12.4cqw;font-size:4.8cqw}.au.partner:not(.sq) .au-title{top:21.6cqw}.au.partner:not(.sq) .au-mo{top:31.2cqw;font-size:4.6cqw}',
    /* ---- square ---- */
    '.au.sq .au-logo{left:7cqw;top:7.5cqw;width:12.5cqw;height:12.5cqw}.au.sq .au-logo img{width:10.2cqw}',
    '.au.sq .au-logo.pip{left:6.5cqw;top:7.5cqw;width:19cqw;height:11.3cqw}.au.sq .au-logo.pip img{width:17cqw}',
    '.au.sq .au-kick{left:23cqw;top:7.4cqw;font-size:1.4cqw}.au.sq .au-hi{left:23cqw;top:9.6cqw;font-size:4.4cqw}',
    '.au.sq .au-title{top:20.5cqw}.au.sq .au-mo{top:32cqw;font-size:4.8cqw}',
    '.au.sq .au-zm{right:7cqw;top:30cqw;width:12.5cqw;height:9.5cqw;font-size:1.9cqw}.au.sq .au-zm b{font-size:2.7cqw}',
    '.au.sq .au-nb{top:47.5cqw;width:41cqw;padding:4.6cqw 2.2cqw 2.4cqw 5.6cqw;background-image:linear-gradient(90deg,transparent 3.8cqw,#f08c8c 3.8cqw 4.1cqw,transparent 4.1cqw),repeating-linear-gradient(180deg,transparent 0 3cqw,#dfe9f7 3cqw 3.16cqw)}',
    '.au.sq .au-nb.au-n1{left:5.5cqw}.au.sq .au-nb.au-n2{left:53.5cqw;top:48cqw}.au.sq .au-nb.solo{left:29.5cqw}',
    '.au.sq .au-nb .n{font-size:2.3cqw}.au.sq .au-nb .dd{font-size:3.2cqw}.au.sq .au-nb .tm{font-size:2cqw;margin-bottom:.8cqw}.au.sq .au-nb .ti{font-size:2.45cqw}.au.sq .au-nb .ds{display:none}',
    '.au.sq.partner .au-kick,.au.sq.partner .au-title,.au.sq.partner .au-mo{left:29cqw;right:auto;text-align:left}',
    '.au.sq.partner .au-kick{top:7cqw}.au.sq.partner .au-title{top:10.4cqw}.au.sq.partner .au-mo{top:20.5cqw;font-size:4.2cqw}',
    '.au.sq .au-pc{top:36cqw;width:45cqw}.au.sq .au-pc .bd{min-height:8.4cqw;padding:1.1cqw 1.2cqw}.au.sq .au-pc .n{font-size:1.2cqw}.au.sq .au-pc .ti{font-size:1.95cqw}.au.sq .au-pc .tp{width:5.4cqw}',
    '.au.sq .au-ap{width:17cqw;height:17cqw;margin:-8.5cqw 0 0 -8.5cqw;padding-top:2.6cqw}',
    '.au.sq .au-ap .i{font-size:1.32cqw;max-width:12.5cqw}.au.sq .au-ap .d{font-size:1.08cqw}.au.sq .au-ap .t{font-size:1.7cqw}',
    '.au.sq .au-ft{height:13.6cqw;padding:2.9cqw 4cqw .3cqw;gap:2.4cqw}',
    '.au.sq .au-ft .rg{font-size:1.6cqw}.au.sq .au-ft .rg b{font-size:2.7cqw}.au.sq .au-qr{width:9.2cqw;height:9.2cqw}.au.sq .au-lg{width:19cqw}.au.sq .au-lg span{font-size:1.25cqw}'
  ].join('\n'),
  fn: function (spec, partner, sq, H) {
    var S = spec.sessions.map(H.sessInfo), HH = sq ? 100 : 129.41, solo = S.length === 1;
    var seed = 8 + (partner ? 3 : 0) + (sq ? 5 : 0);
    function rnd() { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; }
    function f(n) { return (+n).toFixed(2); }
    /* ---- board geometry ---- */
    var bt = 3, bb = sq ? (partner ? 33 : 45) : (partner ? 40 : 56);
    var g = '<defs><linearGradient id="auW' + (sq ? 's' : 'l') + (partner ? 'p' : 'h') + '" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#b9783a"/><stop offset="1" stop-color="#8a5422"/></linearGradient>'
      + '<radialGradient id="auB' + (sq ? 's' : 'l') + (partner ? 'p' : 'h') + '" cx=".5" cy=".4" r=".75"><stop offset="0" stop-color="#3c6e52"/><stop offset="1" stop-color="#244a37"/></radialGradient></defs>';
    var wid = 'auW' + (sq ? 's' : 'l') + (partner ? 'p' : 'h'), bid = 'auB' + (sq ? 's' : 'l') + (partner ? 'p' : 'h');
    g += '<rect x="2.6" y="' + (bt + .6) + '" width="95" height="' + (bb - bt) + '" rx="1.2" fill="rgba(80,50,0,.3)"/>';
    g += '<rect x="2.2" y="' + bt + '" width="95.6" height="' + (bb - bt) + '" rx="1.2" fill="url(#' + wid + ')"/>';
    g += '<rect x="4.4" y="' + (bt + 2.2) + '" width="91.2" height="' + (bb - bt - 4.4) + '" fill="url(#' + bid + ')"/>';
    for (var i = 0; i < 14; i++) g += '<ellipse cx="' + f(8 + rnd() * 84) + '" cy="' + f(bt + 5 + rnd() * (bb - bt - 10)) + '" rx="' + f(4 + rnd() * 9) + '" ry="' + f(1.2 + rnd() * 2.4) + '" fill="#fff" opacity="' + f(.025 + rnd() * .035) + '" transform="rotate(' + f(-20 + rnd() * 40) + ')" transform-origin="50 50"/>';
    /* tray + chalk + eraser */
    g += '<rect x="5" y="' + (bb - 2.4) + '" width="90" height="2.8" rx=".6" fill="#9a6230"/><rect x="5" y="' + (bb - 2.4) + '" width="90" height=".7" fill="#c48a4f"/>';
    var cx0 = sq ? 64 : 66;
    [['#fff', 0], ['#ffe27a', 6], ['#ffb3c7', 10.5]].forEach(function (c) { g += '<rect x="' + (cx0 + c[1]) + '" y="' + (bb - 3.6) + '" width="4.6" height="1.25" rx=".6" fill="' + c[0] + '"/>'; });
    g += '<rect x="' + (sq ? 82 : 84) + '" y="' + (bb - 5) + '" width="8" height="2.7" rx=".5" fill="#2f3b63"/><rect x="' + (sq ? 82 : 84) + '" y="' + (bb - 3.2) + '" width="8" height=".9" fill="#e8e1d0"/>';
    /* chalk doodles in empty corners */
    function chalkStar(x, y, r) { var p = []; for (var k = 0; k < 10; k++) { var a = -Math.PI / 2 + k * Math.PI / 5, rr = k % 2 ? r * .45 : r; p.push(f(x + rr * Math.cos(a)) + ' ' + f(y + rr * Math.sin(a))); } return '<path d="M' + p.join('L') + 'Z" fill="none" stroke="#fff" stroke-width=".35" stroke-linejoin="round" opacity=".7"/>'; }
    function chalkApple(x, y, s) { return '<g transform="translate(' + x + ' ' + y + ') scale(' + s + ')" fill="none" stroke="#ffb3b3" stroke-width=".5" opacity=".75" stroke-linecap="round"><path d="M0 -2.2 C-1.6 -3.6 -4.6 -3.2 -4.6 0 C-4.6 3.2 -2.2 5.2 0 4.6 C2.2 5.2 4.6 3.2 4.6 0 C4.6 -3.2 1.6 -3.6 0 -2.2Z"/><path d="M0 -2.2 C0 -3.4 .4 -4.4 1 -5" stroke="#d7b98c"/><path d="M1 -4.3 C2.4 -5.4 3.4 -4.8 3.6 -4.2 C2.6 -3.6 1.6 -3.8 1 -4.3Z" stroke="#9be08a"/></g>'; }
    if (!sq) {
      g += chalkStar(90, bt + 6.5, 2.2) + chalkStar(85.5, bt + 10.5, 1.2);
      if (!partner) g += chalkApple(13, 47, 1.1) + '<path d="M18 ' + 41.6 + ' Q35 39.6 50 41.2 T82 40.6" fill="none" stroke="#fff" stroke-width=".4" opacity=".55" stroke-linecap="round"/>';
      else g += chalkApple(91, bt + 26, .8);
    } else {
      g += chalkStar(91.5, 8.5, 1.8);
      if (!partner) g += chalkApple(12, 36, .9);
    }
    /* below the board */
    function pencil(x, y, len, rot, col) {
      return '<g transform="translate(' + x + ' ' + y + ') rotate(' + rot + ')"><rect x="0" y="-1.3" width="2.4" height="2.6" rx=".9" fill="#f37a9a"/><rect x="2.2" y="-1.3" width="1.8" height="2.6" fill="#b8bcc4"/><rect x="4" y="-1.3" width="' + len + '" height="2.6" fill="' + col + '"/><rect x="4" y="-1.3" width="' + len + '" height=".7" fill="rgba(0,0,0,.12)"/><path d="M' + (4 + len) + ' -1.3 L' + (4 + len + 4.2) + ' 0 L' + (4 + len) + ' 1.3Z" fill="#f3d29c"/><path d="M' + (4 + len + 2.9) + ' -.4 L' + (4 + len + 4.2) + ' 0 L' + (4 + len + 2.9) + ' .4Z" fill="#333"/></g>';
    }
    function crayon(x, y, rot, col) {
      return '<g transform="translate(' + x + ' ' + y + ') rotate(' + rot + ')"><rect x="0" y="-1.2" width="11" height="2.4" rx=".5" fill="' + col + '"/><rect x="2" y="-1.2" width="6" height="2.4" fill="rgba(255,255,255,.3)"/><rect x="2.6" y="-.4" width="4.8" height=".8" fill="rgba(0,0,0,.25)"/><path d="M11 -1 L13.6 -.35 L13.6 .35 L11 1Z" fill="' + col + '"/></g>';
    }
    if (!partner && !sq) {
      g += pencil(5, 106.5, 46, -2, '#ffd23f');
      g += crayon(66, 104, -12, '#d7263d') + crayon(70, 107.5, -4, '#2f6db5') + crayon(76, 110, 6, '#3aa655') + crayon(83, 103.5, -18, '#8e44ad');
    }
    if (partner) {
      /* apple tree canopy + trunk */
      var t0 = sq ? 47 : 65, t1 = sq ? 84 : 111;
      var tx = 50;
      g += '<path d="M' + (tx - 4) + ' ' + (t1 + 2) + ' L' + (tx - 2.6) + ' ' + (t1 - 10) + ' L' + (tx + 2.6) + ' ' + (t1 - 10) + ' L' + (tx + 4) + ' ' + (t1 + 2) + 'Z" fill="#7a4a1e"/>';
      var blobs = [];
      for (var b = 0; b < 30; b++) { var br = 6.5 + rnd() * 6; blobs.push([4 + rnd() * 92, t0 + br + rnd() * Math.max(1, t1 - t0 - 2 * br - 6), br]); }
      blobs.forEach(function (c) { g += '<circle cx="' + f(c[0]) + '" cy="' + f(c[1]) + '" r="' + f(c[2]) + '" fill="#2e7d32"/>'; });
      blobs.forEach(function (c) { g += '<circle cx="' + f(c[0] - c[2] * .25) + '" cy="' + f(c[1] - c[2] * .3) + '" r="' + f(c[2] * .62) + '" fill="#43a047" opacity=".75"/>'; });
      for (var l = 0; l < 30; l++) { var lx = 6 + rnd() * 88, ly = t0 + 5 + rnd() * (t1 - t0 - 14); g += '<ellipse cx="' + f(lx) + '" cy="' + f(ly) + '" rx="1.1" ry=".5" fill="#7cc576" opacity=".8" transform="rotate(' + f(rnd() * 180) + ' ' + f(lx) + ' ' + f(ly) + ')"/>'; }
      g += '<rect x="0" y="' + (t1 + 1) + '" width="100" height="6" fill="#8bc34a"/>';
    }
    var series = H.esc(spec.series || 'Learning Labs'), words = series.split(' '), last = words.pop();
    var tlen = (spec.series || 'Learning Labs').length;
    var tfs = sq ? (partner ? Math.min(8, 62 / (tlen * .56)) : Math.min(9.5, 82 / (tlen * .56))) : (partner ? Math.min(10.5, 84 / (tlen * .56)) : Math.min(12.5, 84 / (tlen * .56)));
    var month = H.MONTHS[spec.month - 1];
    var logo = partner ? '<div class="au-logo pip"><img src="' + spec.pipUrl + '" alt=""></div>' : '<div class="au-logo"><img src="' + spec.logoUrl + '" alt=""></div>';
    var head = logo + '<div class="au-kick">' + (partner ? 'FOR FAMILIES ACROSS THE PACIFIC' : 'PARENT TRAINING &amp; INFORMATION CENTER') + '</div>'
      + (sq && partner ? '' : '<div class="au-hi">Back to school!</div>')
      + '<div class="au-title" style="font-size:' + f(tfs) + 'cqw">' + (words.length ? words.join(' ') + ' ' : '') + '<span>' + last + '</span></div>';
    var foot = '<div class="au-ft"><div class="rg"><b>REGISTER at <span>LDAHawaii.org</span></b>Get your Zoom link, scan the QR code,<br>or call ' + H.phone(partner) + '</div><div class="au-qr">' + H.qrImg(spec, partner) + '</div><div class="au-lg">' + H.badges(spec, partner) + '</div></div>';
    var root = '<div class="au' + (sq ? ' sq' : '') + (partner ? ' partner' : '') + '"><svg class="au-bg" viewBox="0 0 100 ' + HH + '" preserveAspectRatio="none">' + g + '</svg>';
    if (!partner) {
      var coil = '<svg class="au-coil" viewBox="0 0 42 5" preserveAspectRatio="none">';
      for (var c = 0; c < 11; c++) { var x = 3.2 + c * 3.6; coil += '<circle cx="' + f(x) + '" cy="3.4" r=".75" fill="#c9b98f"/><path d="M' + f(x - .3) + ' 3.6 C' + f(x - .9) + ' 1.2 ' + f(x + .9) + ' -.2 ' + f(x + .9) + ' 2" fill="none" stroke="#7d8591" stroke-width=".5" stroke-linecap="round"/>'; }
      coil += '</svg>';
      var nbs = S.map(function (s, i) {
        return '<div class="au-nb au-n' + (i + 1) + (solo ? ' solo' : '') + '">' + coil + '<div class="n">Session ' + (i + 1) + '</div><div class="dd">' + s.dow + '., ' + s.mon + ' ' + s.day + '</div><div class="tm">' + s.time + '</div><div class="ti">' + s.lesson + '</div>' + (s.desc ? '<div class="ds">' + s.desc + '</div>' : '') + '</div>';
      }).join('');
      var zsvg = '<svg viewBox="0 0 100 100" preserveAspectRatio="none"><ellipse cx="50" cy="50" rx="47" ry="45" fill="none" stroke="#fff" stroke-width="2.2" opacity=".75"/><ellipse cx="51" cy="49" rx="45" ry="47" fill="none" stroke="#fff" stroke-width="1.4" opacity=".45" transform="rotate(-6 50 50)"/></svg>';
      return root + head + '<div class="au-mo">' + month + ' ' + spec.year + '</div><div class="au-zm">' + zsvg + 'all on<b>ZOOM</b></div>' + nbs + foot + '</div>';
    }
    var pcs = S.map(function (s, i) { return '<div class="au-pc au-c' + (i + 1) + (solo ? ' solo' : '') + '"><div class="er"></div><div class="fe"></div><div class="bd"><div class="n">LESSON ' + (i + 1) + '</div><div class="ti">' + s.lesson + '</div></div><div class="tp"></div></div>'; }).join('');
    var rows = H.zoneRows(spec.sessions);
    var pos = sq ? [[13.5, 57], [37.8, 59], [62.2, 56.5], [86.5, 58.5], [25.5, 75], [50, 76.5], [74.5, 74.5]]
                 : [[31, 73.5], [14.5, 87.5], [69, 73], [50, 88], [85.5, 87], [31, 101.5], [69, 101]];
    function apple(fill, ring) {
      return '<svg viewBox="0 0 100 100"><path d="M50 28 C50 18 53 10 58 4" fill="none" stroke="#6b3e17" stroke-width="5" stroke-linecap="round"/><path d="M57 11 C66 1 80 3 84 9 C76 17 64 17 57 11Z" fill="#3aa655" stroke="#1f6b2f" stroke-width="1.5"/>'
        + '<path d="M50 26 C34 14 6 17 6 50 C6 80 30 101 50 94 C70 101 94 80 94 50 C94 17 66 14 50 26Z" fill="' + fill + '" stroke="' + ring + '" stroke-width="' + (ring === '#fff' ? 4 : 2) + '"/>'
        + '<ellipse cx="22" cy="44" rx="4" ry="9" fill="#fff" opacity=".28" transform="rotate(20 22 44)"/></svg>';
    }
    var apples = rows.map(function (r, i) {
      var kind = r.home ? 'h' : (i === 2 || i === 5 ? 'g' : 'r');
      var art = kind === 'h' ? apple('#ffc914', '#fff') : kind === 'g' ? apple('#9ccc4a', '#5d8a1f') : apple('#e23d3d', '#a51d1d');
      return '<div class="au-ap ' + kind + '" style="left:' + pos[i][0] + 'cqw;top:' + pos[i][1] + 'cqw">' + art + '<div class="i">' + r.label + '</div><div class="d">' + r.days + '</div><div class="t">' + r.time + '</div></div>';
    }).join('');
    return root + head + '<div class="au-mo">' + month + ' ' + spec.year + ' · on Zoom</div>' + pcs
      + (sq ? '' : '<div class="au-h">Pick your apple time</div><div class="au-c">' + (S.length > 1 ? 'BOTH LESSONS' : 'LESSON') + ' · LOCAL TIME FOR EACH ISLAND</div>') + apples + foot + '</div>';
  }
});

/* ---- LL month 09 ---- */
VEBFlyers.registerTheme(9, {
  name: 'Bulletin board / new routines (cork board, taped poster, polaroids, sticky notes)',
  fonts: 'family=Permanent+Marker&family=Kalam:wght@400;700&family=Outfit:wght@500;600;700;800;900',
  css: [
    '.se{container-type:inline-size;aspect-ratio:8.5/11;position:relative;overflow:hidden;border-radius:4px;box-shadow:0 10px 30px rgba(60,35,10,.35);font-family:Outfit,Poppins,sans-serif;color:#1d2b53;background-color:#c8935a;'
      + 'background-image:radial-gradient(circle at 20% 30%,rgba(92,52,20,.38) 0 .1cqw,transparent .15cqw),radial-gradient(circle at 70% 65%,rgba(255,232,196,.32) 0 .09cqw,transparent .14cqw),radial-gradient(circle at 45% 80%,rgba(110,62,25,.3) 0 .16cqw,transparent .22cqw),radial-gradient(circle at 85% 15%,rgba(80,45,15,.32) 0 .08cqw,transparent .12cqw),radial-gradient(circle at 10% 70%,rgba(255,240,210,.25) 0 .12cqw,transparent .17cqw),radial-gradient(ellipse at 30% 50%,rgba(140,85,40,.18) 0 .5cqw,transparent .9cqw),radial-gradient(ellipse at 50% 40%,#d39e65 0%,#c08850 70%,#b27a44 100%);'
      + 'background-size:1.13cqw 1.37cqw,1.71cqw 1.19cqw,2.33cqw 1.97cqw,.83cqw .97cqw,1.49cqw 2.11cqw,5.3cqw 4.1cqw,100% 100%}',
    '.se.sq{aspect-ratio:1/1}',
    '.se *,.se *:before,.se *:after{box-sizing:border-box}',
    '.se .se-frame{position:absolute;inset:0;z-index:1;pointer-events:none;border:2.6cqw solid #8a5a2b;border-radius:4px;box-shadow:inset 0 0 0 .35cqw #6b4320,inset .6cqw .8cqw 1.6cqw rgba(50,25,5,.45);background:linear-gradient(90deg,rgba(255,255,255,.06),transparent)}',
    '.se .se-pin{position:absolute;z-index:3;width:3cqw;height:3cqw;border-radius:50%;left:50%;top:-1cqw;margin-left:-1.5cqw;background:radial-gradient(circle at 35% 32%,rgba(255,255,255,.85) 0 12%,var(--pc,#e63946) 30%,rgba(0,0,0,.35) 100%),var(--pc,#e63946);box-shadow:.4cqw .7cqw .5cqw rgba(40,20,0,.45)}',
    '.se .se-tape{position:absolute;z-index:3;width:12cqw;height:3.4cqw;opacity:.88;box-shadow:0 .15cqw .3cqw rgba(0,0,0,.15)}',
    '.se .se-tape.ta{background:repeating-linear-gradient(90deg,#8fd3c1 0 1cqw,#c7efe4 1cqw 2cqw)}',
    '.se .se-tape.tb{background:radial-gradient(circle,#fff 0 .35cqw,transparent .4cqw) 0 0/1.4cqw 1.4cqw,#ff8fab}',
    '.se .se-tape.tc{background:linear-gradient(90deg,rgba(255,255,255,.45) 1px,transparent 1px) 0 0/1.2cqw 100%,linear-gradient(0deg,rgba(255,255,255,.45) 1px,transparent 1px) 0 0/100% 1.1cqw,#ffd166}',
    /* logo card */
    '.se .se-logo{position:absolute;z-index:4;left:6.5cqw;top:6.5cqw;width:17cqw;height:17cqw;background:#fff;box-shadow:.5cqw .8cqw 1cqw rgba(50,25,5,.35);display:flex;align-items:center;justify-content:center;transform:rotate(-4deg)}',
    '.se .se-logo img{width:13.6cqw;height:auto;display:block}',
    '.se .se-logo.pip{width:23cqw;height:14cqw}.se .se-logo.pip img{width:21cqw}',
    /* calendar page */
    '.se .se-cal{position:absolute;z-index:4;right:6.5cqw;top:5.5cqw;width:25cqw;background:#fff;text-align:center;box-shadow:.5cqw .8cqw 1cqw rgba(50,25,5,.35);transform:rotate(3deg);padding-bottom:1.2cqw}',
    '.se .se-cal .hd{background:#e63946;color:#fff;font-weight:900;font-size:2.55cqw;letter-spacing:.12em;padding:2.4cqw 0 1cqw;white-space:nowrap}',
    '.se .se-cal .yr{font-family:"Permanent Marker",cursive;font-size:8cqw;line-height:1.05;color:#1d2b53;margin-top:.6cqw}',
    '.se .se-cal .rings{position:absolute;left:0;right:0;top:-1.3cqw;height:2.6cqw;background:radial-gradient(circle at 50% 50%,#3a3a3a 0 .55cqw,transparent .62cqw) 0 0/6.25cqw 100% repeat-x}',
    /* zoom index card (HST) */
    '.se .se-idx{position:absolute;z-index:4;left:29cqw;top:9cqw;width:31cqw;padding:2.2cqw 2.4cqw 1.6cqw;background-color:#fff;background-image:linear-gradient(180deg,transparent 4.3cqw,#ef6f7d 4.3cqw 4.55cqw,transparent 4.55cqw),repeating-linear-gradient(180deg,transparent 0 3.1cqw,#cfe0f3 3.1cqw 3.25cqw);background-position:0 0,0 4.6cqw;box-shadow:.5cqw .8cqw 1cqw rgba(50,25,5,.35);transform:rotate(-2deg)}',
    '.se .se-idx .a{font-family:"Permanent Marker",cursive;font-size:3.5cqw;line-height:1.1;color:#2a7de1;white-space:nowrap}',
    '.se .se-idx .b{font-family:Kalam,cursive;font-weight:700;font-size:2.4cqw;line-height:1.3;color:#1d2b53;margin-top:.6cqw;white-space:nowrap}',
    /* poster */
    '.se .se-post{position:absolute;z-index:4;left:6cqw;right:6cqw;top:28.5cqw;background:#fffdf5;text-align:center;padding:3.4cqw 4cqw 3cqw;box-shadow:.6cqw 1cqw 1.4cqw rgba(50,25,5,.38);transform:rotate(-1deg)}',
    '.se .se-post:before{content:"";position:absolute;left:0;right:0;top:0;height:1.5cqw;background:repeating-linear-gradient(90deg,#e63946 0 6cqw,#ffbe0b 6cqw 12cqw,#2bb673 12cqw 18cqw,#2a7de1 18cqw 24cqw)}',
    '.se .se-post .k{position:relative;z-index:1;font-weight:800;font-size:1.7cqw;letter-spacing:.2em;color:#2a7de1;white-space:nowrap}',
    '.se .se-post .t{font-family:"Permanent Marker",cursive;line-height:1.08;color:#1d2b53;white-space:nowrap;margin-top:.6cqw}',
    '.se .se-post .t span{color:#e63946}',
    '.se .se-post .s{font-family:Kalam,cursive;font-weight:700;font-size:3cqw;line-height:1.2;color:#6b4320;margin-top:.2cqw}',
    '.se .se-post .s b{color:#2bb673}',
    '.se .se-post .se-tape.l{left:-4cqw;top:-.6cqw;transform:rotate(-38deg)}.se .se-post .se-tape.r{right:-4cqw;top:-.6cqw;transform:rotate(38deg)}',
    '.se .se-post .se-tape.bl{left:-4cqw;bottom:-.4cqw;transform:rotate(38deg)}.se .se-post .se-tape.br{right:-4cqw;bottom:-.4cqw;transform:rotate(-38deg)}',
    /* polaroids */
    '.se .se-pol{position:absolute;z-index:5;width:41cqw;top:61cqw;background:#fff;padding:2.4cqw 2.4cqw 2.6cqw;box-shadow:.6cqw 1cqw 1.4cqw rgba(50,25,5,.4)}',
    '.se .se-pol.se-o1{left:6.5cqw;transform:rotate(-3deg)}.se .se-pol.se-o2{left:52.5cqw;top:62.5cqw;transform:rotate(2.5deg)}.se .se-pol.solo{left:29.5cqw;transform:rotate(-2deg)}',
    '.se .se-pol .ph{height:16cqw;display:flex;flex-direction:column;align-items:center;justify-content:center;color:#fff;position:relative;overflow:hidden}',
    '.se .se-pol.se-o1 .ph,.se .se-pol.solo .ph{background:linear-gradient(135deg,#3fb6c9,#2a7de1)}.se .se-pol.se-o2 .ph{background:linear-gradient(135deg,#ffb347,#ff6f61)}',
    '.se .se-pol .ph:after{content:"";position:absolute;right:-20%;top:-60%;width:70%;height:140%;background:linear-gradient(90deg,rgba(255,255,255,0),rgba(255,255,255,.18));transform:rotate(25deg)}',
    '.se .se-pol .ph .w{font-weight:900;font-size:2.1cqw;letter-spacing:.2em}',
    '.se .se-pol .ph .dd{font-family:"Permanent Marker",cursive;font-size:6.6cqw;line-height:1}',
    '.se .se-pol .cp{padding:1.6cqw .4cqw 0;text-align:center}',
    '.se .se-pol .tm{font-weight:800;font-size:2.25cqw;color:#e63946}',
    '.se .se-pol .ti{font-family:Kalam,cursive;font-weight:700;font-size:3.05cqw;line-height:1.12;color:#1d2b53;margin-top:.6cqw}',
    '.se .se-pol .ds{font-family:Kalam,cursive;font-size:2.2cqw;line-height:1.2;color:#6b6b6b;margin-top:.5cqw}',
    /* lesson index cards (partner) */
    '.se .se-lc{position:absolute;z-index:5;width:42cqw;top:49.5cqw;padding:2.2cqw 2.4cqw 1.8cqw;background-color:#fff;background-image:linear-gradient(180deg,transparent 4.2cqw,#ef6f7d 4.2cqw 4.45cqw,transparent 4.45cqw);box-shadow:.5cqw .8cqw 1cqw rgba(50,25,5,.35)}',
    '.se .se-lc.se-l1{left:6.5cqw;transform:rotate(-1.8deg)}.se .se-lc.se-l2{left:51.5cqw;transform:rotate(1.6deg);top:50cqw}.se .se-lc.solo{left:29cqw;transform:rotate(-1.2deg)}',
    '.se .se-lc .n{font-weight:900;font-size:1.55cqw;letter-spacing:.18em;color:#e63946}',
    '.se .se-lc .ti{font-family:Kalam,cursive;font-weight:700;font-size:2.7cqw;line-height:1.12;color:#1d2b53;margin-top:1cqw}',
    '.se .se-lab{position:absolute;z-index:5;left:50%;top:63.5cqw;transform:translateX(-50%) rotate(-1.2deg);background:#1d2b53;color:#fff;font-family:"Permanent Marker",cursive;font-size:3.4cqw;line-height:1.1;padding:.9cqw 3cqw;white-space:nowrap;box-shadow:.4cqw .6cqw .8cqw rgba(50,25,5,.35)}',
    '.se .se-lab small{display:block;font-family:Outfit,sans-serif;font-weight:800;font-size:1.4cqw;letter-spacing:.16em;color:#ffd166;text-align:center}',
    /* sticky notes */
    '.se .se-nt{position:absolute;z-index:5;width:19cqw;height:19cqw;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:2.4cqw 1cqw 1cqw;box-shadow:.4cqw .9cqw 1cqw rgba(50,25,5,.38);background:var(--nc);color:#1d2b53}',
    '.se .se-nt:after{content:"";position:absolute;left:0;right:0;bottom:0;height:22%;background:linear-gradient(180deg,rgba(0,0,0,0),rgba(0,0,0,.06));pointer-events:none}',
    '.se .se-nt .i{font-weight:800;font-size:1.7cqw;line-height:1.08}',
    '.se .se-nt .d{font-weight:600;font-size:1.35cqw;margin-top:.4cqw;white-space:nowrap}',
    '.se .se-nt .t{font-family:"Permanent Marker",cursive;font-size:2.45cqw;line-height:1.1;margin-top:.35cqw;white-space:nowrap}',
    '.se .se-nt .ring{position:absolute;inset:-1.6cqw -1.8cqw;pointer-events:none;width:auto;height:auto;z-index:-1}',
    '.se .se-nt.h{outline:none}',
    /* kraft footer */
    '.se .se-ft{position:absolute;z-index:6;left:4.4cqw;right:4.4cqw;bottom:4cqw;height:15cqw;background-color:#d8b383;background-image:repeating-linear-gradient(100deg,rgba(255,255,255,.07) 0 .3cqw,transparent .3cqw 1.1cqw),repeating-linear-gradient(10deg,rgba(90,55,20,.06) 0 .2cqw,transparent .2cqw .9cqw);box-shadow:.5cqw .9cqw 1.2cqw rgba(50,25,5,.4);display:flex;align-items:center;gap:2.6cqw;padding:0 3.6cqw 0 5cqw;color:#3d2610;transform:rotate(-.4deg)}',
    '.se .se-ft .rg{flex:1;font-size:1.8cqw;line-height:1.35;font-weight:600}',
    '.se .se-ft .rg b{display:block;font-weight:900;font-size:3.1cqw;line-height:1.15;color:#1d2b53;margin-bottom:.3cqw}',
    '.se .se-ft .rg b span{color:#e63946}',
    '.se .se-ft .se-tape.l{left:-3.4cqw;top:50%;margin-top:-1.7cqw;transform:rotate(-80deg);width:9cqw}.se .se-ft .se-tape.r{right:-3.4cqw;top:50%;margin-top:-1.7cqw;transform:rotate(80deg);width:9cqw}',
    '.se .se-qr{width:10.6cqw;height:10.6cqw;background:#fff;padding:.5cqw;flex:none;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:2cqw;box-shadow:0 .3cqw .5cqw rgba(0,0,0,.2)}',
    '.se .se-qr img{width:100%;height:100%;display:block}',
    '.se .se-lg{display:flex;flex-direction:column;gap:.8cqw;flex:none;width:20cqw}',
    '.se .se-lg span{background:#fffdf5;color:#1d2b53;font-weight:800;font-size:1.4cqw;text-align:center;padding:.6cqw .8cqw;white-space:nowrap;box-shadow:0 .2cqw .3cqw rgba(0,0,0,.15)}',
    '.se.partner:not(.sq) .se-post{top:24cqw}',
    /* ---- square ---- */
    '.se.sq .se-logo{left:6cqw;top:6cqw;width:13cqw;height:13cqw}.se.sq .se-logo img{width:10.6cqw}',
    '.se.sq .se-logo.pip{width:19cqw;height:11.5cqw}.se.sq .se-logo.pip img{width:17.2cqw}',
    '.se.sq .se-cal{right:6cqw;top:5cqw;width:21cqw}.se.sq .se-cal .hd{font-size:2.15cqw;padding:2cqw 0 .8cqw}.se.sq .se-cal .yr{font-size:6cqw}.se.sq .se-cal .rings{background-size:5.25cqw 100%}',
    '.se.sq .se-idx{left:23cqw;top:7.5cqw;width:27cqw;padding:1.7cqw 2cqw 1.2cqw;background-image:linear-gradient(180deg,transparent 3.6cqw,#ef6f7d 3.6cqw 3.85cqw,transparent 3.85cqw),repeating-linear-gradient(180deg,transparent 0 2.7cqw,#cfe0f3 2.7cqw 2.85cqw)}',
    '.se.sq .se-idx .a{font-size:2.9cqw}.se.sq .se-idx .b{font-size:2cqw}',
    '.se.sq .se-post{top:24cqw;left:6.5cqw;right:6.5cqw;padding:2.6cqw 3cqw 2.2cqw}.se.sq .se-post .k{font-size:1.45cqw}.se.sq .se-post .s{font-size:2.4cqw}',
    '.se.sq .se-pol{top:48.5cqw;width:38cqw;padding:1.8cqw 1.8cqw 1.8cqw}.se.sq .se-pol.se-o1{left:8cqw}.se.sq .se-pol.se-o2{left:54cqw;top:49.5cqw}.se.sq .se-pol.solo{left:31cqw}',
    '.se.sq .se-pol .ph{height:10.5cqw}.se.sq .se-pol .ph .w{font-size:1.7cqw}.se.sq .se-pol .ph .dd{font-size:5cqw}',
    '.se.sq .se-pol .cp{padding-top:1.1cqw}.se.sq .se-pol .tm{font-size:1.95cqw}.se.sq .se-pol .ti{font-size:2.55cqw;margin-top:.3cqw}.se.sq .se-pol .ds{display:none}',
    '.se.sq.partner .se-post{top:20.5cqw}.se.sq.partner .se-post .s{font-size:2.2cqw;line-height:1.25;margin-top:.4cqw}',
    '.se.sq .se-nt{width:17cqw;height:17cqw;padding:2cqw .8cqw .8cqw}.se.sq .se-nt .i{font-size:1.5cqw}.se.sq .se-nt .d{font-size:1.18cqw}.se.sq .se-nt .t{font-size:2.15cqw}',
    '.se.sq .se-ft{height:12cqw;bottom:3.6cqw;left:4.2cqw;right:4.2cqw;gap:2.2cqw;padding:0 3.2cqw 0 4.6cqw}.se.sq .se-ft .rg{font-size:1.55cqw}.se.sq .se-ft .rg b{font-size:2.6cqw}',
    '.se.sq .se-qr{width:8.8cqw;height:8.8cqw}.se.sq .se-lg{width:18cqw}.se.sq .se-lg span{font-size:1.22cqw;padding:.45cqw .6cqw}'
  ].join('\n'),
  fn: function (spec, partner, sq, H) {
    var S = spec.sessions.map(H.sessInfo), solo = S.length === 1;
    function f(n) { return (+n).toFixed(2); }
    function pin(c, extra) { return '<span class="se-pin" style="--pc:' + c + (extra ? ';' + extra : '') + '"></span>'; }
    var series = H.esc(spec.series || 'Learning Labs'), words = series.split(' '), last = words.pop();
    var tlen = (spec.series || 'Learning Labs').length;
    var tfs = sq ? Math.min(8.6, 74 / (tlen * .62)) : Math.min(11, 80 / (tlen * .62));
    var month = H.MONTHS[spec.month - 1];
    var logo = partner ? '<div class="se-logo pip">' + pin('#2a7de1') + '<img src="' + spec.pipUrl + '" alt=""></div>' : '<div class="se-logo">' + pin('#2a7de1') + '<img src="' + spec.logoUrl + '" alt=""></div>';
    var cal = '<div class="se-cal"><div class="rings"></div><div class="hd">' + month.toUpperCase() + '</div><div class="yr">' + spec.year + '</div></div>';
    var sub;
    if (partner) {
      sub = sq ? S.map(function (s, i) { return '<b>' + (i + 1) + '</b> ' + s.lesson; }).join('<br>') : 'Fresh skills for the new season · <b>on Zoom</b>';
    } else {
      sub = sq ? 'New routines, new skills · <b>' + month + '</b>' : 'New routines, new skills for a fresh <b>' + month + '</b>';
    }
    var post = '<div class="se-post"><span class="se-tape ta l"></span><span class="se-tape tb r"></span>' + (sq ? '' : '<span class="se-tape tc bl"></span><span class="se-tape ta br"></span>')
      + '<div class="k">' + (partner ? 'FOR FAMILIES ACROSS THE PACIFIC' + (sq ? ' · ON ZOOM' : '') : 'PARENT TRAINING &amp; INFORMATION CENTER') + '</div>'
      + '<div class="t" style="font-size:' + f(tfs) + 'cqw">' + (words.length ? words.join(' ') + ' ' : '') + '<span>' + last + '</span></div>'
      + '<div class="s">' + sub + '</div></div>';
    var foot = '<div class="se-ft"><span class="se-tape tb l"></span><span class="se-tape tc r"></span><div class="rg"><b>REGISTER at <span>LDAHawaii.org</span></b>Get your Zoom link, scan the QR code,<br>or call ' + H.phone(partner) + '</div><div class="se-qr">' + H.qrImg(spec, partner) + '</div><div class="se-lg">' + H.badges(spec, partner) + '</div></div>';
    var root = '<div class="se' + (sq ? ' sq' : '') + (partner ? ' partner' : '') + '"><div class="se-frame"></div>' + logo + cal;
    if (!partner) {
      var idx = '<div class="se-idx">' + pin('#2bb673', 'top:-1.2cqw') + '<div class="a">All on Zoom!</div><div class="b">' + (sq ? 'For parents' : 'Parent training, from home') + '</div></div>';
      var pcol = ['#ffbe0b', '#e63946'];
      var pols = S.map(function (s, i) {
        return '<div class="se-pol se-o' + (i + 1) + (solo ? ' solo' : '') + '">' + pin(pcol[i]) + '<div class="ph"><div class="w">' + s.dow.toUpperCase() + ' · ' + s.mon.toUpperCase() + '</div><div class="dd">' + s.mon + ' ' + s.day + '</div></div><div class="cp"><div class="tm">' + s.time + '</div><div class="ti">' + s.lesson + '</div>' + (s.desc ? '<div class="ds">' + s.desc + '</div>' : '') + '</div></div>';
      }).join('');
      return root + idx + post + pols + foot + '</div>';
    }
    var lcs = sq ? '' : S.map(function (s, i) { return '<div class="se-lc se-l' + (i + 1) + (solo ? ' solo' : '') + '">' + pin(i ? '#ff5d8f' : '#2bb673') + '<div class="n">LESSON ' + (i + 1) + '</div><div class="ti">' + s.lesson + '</div></div>'; }).join('');
    var lab = sq ? '' : '<div class="se-lab">What time is it on your island?<small>' + (S.length > 1 ? 'BOTH LESSONS' : 'LESSON') + ' · YOUR LOCAL TIME</small></div>';
    var rows = H.zoneRows(spec.sessions);
    var pos = sq ? [[6, 45.5, -4], [28.5, 47.5, 3], [53.5, 45, -2], [76, 47, 4], [16.5, 65.5, 3], [41.5, 66.5, -3], [66, 65, 2]]
                 : [[6.5, 72.5, -4], [29, 74.5, 3], [52, 72, -2], [74.5, 74, 4], [16.5, 90.5, 3], [40.5, 91.5, -3], [64.5, 90, 2]];
    var ncol = ['#ff9fb2', '#ffe45c', '#8fd3f4', '#b8e986', '#ffc48c', '#d7b8ff', '#8ee6cf'];
    var pcs = ['#2a7de1', '#e63946', '#ffbe0b', '#e63946', '#2bb673', '#2a7de1', '#ff5d8f'];
    var notes = rows.map(function (r, i) {
      var ring = r.home ? '<svg class="ring" viewBox="0 0 100 100" preserveAspectRatio="none"><path d="M52 3 C82 2 98 22 97 52 C96 84 76 98 48 97 C18 96 3 78 3 48 C4 20 24 4 58 6" fill="none" stroke="#e63946" stroke-width="2.6" stroke-linecap="round"/></svg>' : '';
      return '<div class="se-nt' + (r.home ? ' h' : '') + '" style="--nc:' + (r.home ? '#ffe45c' : ncol[i]) + ';left:' + pos[i][0] + 'cqw;top:' + pos[i][1] + 'cqw;transform:rotate(' + pos[i][2] + 'deg)">' + ring + pin(pcs[i], 'top:-1.2cqw') + '<div class="i">' + r.label + '</div><div class="d">' + r.days + '</div><div class="t">' + r.time + '</div></div>';
    }).join('');
    return root + post + lcs + lab + notes + foot + '</div>';
  }
});

/* ---- LL month 10 ---- */
VEBFlyers.registerTheme(10, (function () {
  /* October: friendly Halloween night over a pumpkin patch. Big glowing moon holds the title,
     sessions are trick-or-treat bags, partner times are carved into smiling jack-o'-lanterns. */
  function rng(seed) { var s = seed; return function () { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; }; }
  function f(n) { return (Math.round(n * 100) / 100).toString(); }
  function at(l, t, w, h) { return 'left:' + f(l) + 'cqw;top:' + f(t) + 'cqw' + (w != null ? ';width:' + f(w) + 'cqw' : '') + (h != null ? ';height:' + f(h) + 'cqw' : ''); }

  /* one pumpkin, bottom-centre at (cx, by) */
  function pumpkin(cx, by, w, h, gold) {
    var cy = by - h / 2, a = gold ? '#ffc23d' : '#ff8a1f', b = gold ? '#f4a524' : '#ec6c16', ln = gold ? '#d98a12' : '#c9520f';
    function lobe(dx, rx, ry, fill) { return '<ellipse cx="' + f(cx + dx) + '" cy="' + f(cy) + '" rx="' + f(rx) + '" ry="' + f(ry) + '" fill="' + fill + '" stroke="' + ln + '" stroke-width="' + f(w * .012) + '"/>'; }
    return '<path d="M' + f(cx) + ' ' + f(cy - h * .4) + ' q' + f(-w * .02) + ' ' + f(-h * .22) + ' ' + f(w * .09) + ' ' + f(-h * .3) + '" stroke="#4f6b22" stroke-width="' + f(w * .075) + '" fill="none" stroke-linecap="round"/>'
      + lobe(-w * .27, w * .23, h * .46, b) + lobe(w * .27, w * .23, h * .46, b)
      + lobe(-w * .12, w * .25, h * .5, a) + lobe(w * .12, w * .25, h * .5, a) + lobe(0, w * .2, h * .5, a)
      + '<ellipse cx="' + f(cx - w * .12) + '" cy="' + f(cy - h * .22) + '" rx="' + f(w * .06) + '" ry="' + f(h * .12) + '" fill="#fff" opacity=".22"/>';
  }
  function leaf(x, y, s, rot) { return '<path transform="translate(' + f(x) + ' ' + f(y) + ') rotate(' + f(rot) + ') scale(' + f(s) + ')" d="M0 0 C2 -3 6 -3 8 0 C6 3 2 3 0 0Z" fill="#7cc242" stroke="#4f8a26" stroke-width=".3"/>'; }
  function ghost(x, y, s) {
    return '<g transform="translate(' + f(x) + ' ' + f(y) + ') scale(' + f(s) + ')"><path d="M0 9 C0 2 4 0 7 0 C10 0 14 2 14 9 L14 17 L11.7 15.4 L9.3 17 L7 15.4 L4.7 17 L2.3 15.4 L0 17Z" fill="#fbf7ff"/>'
      + '<ellipse cx="4.8" cy="7.2" rx="1" ry="1.4" fill="#2a1550"/><ellipse cx="9.2" cy="7.2" rx="1" ry="1.4" fill="#2a1550"/><path d="M5.6 10.2 Q7 11.6 8.4 10.2" stroke="#2a1550" stroke-width=".6" fill="none" stroke-linecap="round"/>'
      + '<ellipse cx="3.4" cy="9.4" rx=".9" ry=".5" fill="#ff9ec4"/><ellipse cx="10.6" cy="9.4" rx=".9" ry=".5" fill="#ff9ec4"/></g>';
  }
  function candy(x, y, s, rot) {
    return '<path transform="translate(' + f(x) + ' ' + f(y) + ') rotate(' + f(rot) + ') scale(' + f(s) + ')" d="M5 0 Q6 0 9.6 11.6 Q10 14 5 14 Q0 14 .4 11.6 Q4 0 5 0Z" fill="url(#ocCandy)"/>';
  }
  function bat(x, y, s) { // small friendly bat with smile
    return '<g transform="translate(' + f(x) + ' ' + f(y) + ') scale(' + f(s) + ')"><path d="M0 2 Q3 -1 5 2 Q6 0 7 2 L7.5 1 L8.5 1 L9 2 Q10 0 11 2 Q13 -1 16 2 Q13 2.5 12.5 5 Q11 3.5 9.5 5 Q8 6.5 6.5 5 Q5 3.5 3.5 5 Q3 2.5 0 2Z" fill="#170b2e"/>'
      + '<circle cx="7.4" cy="2.6" r=".45" fill="#ffe066"/><circle cx="8.6" cy="2.6" r=".45" fill="#ffe066"/></g>';
  }

  /* background: dusk sky, stars, moon with glow, patch with vines + pumpkins, decorations */
  function scene(H, o) {
    var r = rng(o.seed), s = '<svg class="oc-bg" viewBox="0 0 100 ' + f(H) + '" preserveAspectRatio="none"><defs>'
      + '<linearGradient id="ocSky' + o.seed + '" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#170a33"/><stop offset=".45" stop-color="#34186a"/><stop offset=".78" stop-color="#5d2c86"/><stop offset="1" stop-color="#7a3b8c"/></linearGradient>'
      + '<radialGradient id="ocGlow' + o.seed + '"><stop offset=".55" stop-color="#ffe9a6" stop-opacity=".55"/><stop offset="1" stop-color="#ffe9a6" stop-opacity="0"/></radialGradient>'
      + '<radialGradient id="ocMoon' + o.seed + '" cx=".42" cy=".38"><stop offset="0" stop-color="#fffbe8"/><stop offset=".75" stop-color="#fff0be"/><stop offset="1" stop-color="#ffe08a"/></radialGradient>'
      + '<linearGradient id="ocCandy" x1="0" y1="0" x2="0" y2="1"><stop offset=".3" stop-color="#fffaf0"/><stop offset=".3" stop-color="#ff8a1f"/><stop offset=".66" stop-color="#ff8a1f"/><stop offset=".66" stop-color="#ffd23f"/></linearGradient>'
      + '</defs><rect width="100" height="' + f(H) + '" fill="url(#ocSky' + o.seed + ')"/>';
    for (var i = 0; i < 46; i++) { var x = r() * 100, y = r() * o.ground * .9; s += '<circle cx="' + f(x) + '" cy="' + f(y) + '" r="' + f(.12 + r() * .3) + '" fill="#fff" opacity="' + f(.35 + r() * .55) + '"/>'; }
    for (i = 0; i < 4; i++) { x = 4 + r() * 92; y = 4 + r() * o.ground * .6; s += '<path d="M' + f(x) + ' ' + f(y - 1.2) + ' L' + f(x + .3) + ' ' + f(y - .3) + ' L' + f(x + 1.2) + ' ' + f(y) + ' L' + f(x + .3) + ' ' + f(y + .3) + ' L' + f(x) + ' ' + f(y + 1.2) + ' L' + f(x - .3) + ' ' + f(y + .3) + ' L' + f(x - 1.2) + ' ' + f(y) + ' L' + f(x - .3) + ' ' + f(y - .3) + 'Z" fill="#ffe9a6" opacity=".85"/>'; }
    var m = o.moon;
    s += '<circle cx="' + f(m.cx) + '" cy="' + f(m.cy) + '" r="' + f(m.r * 1.45) + '" fill="url(#ocGlow' + o.seed + ')"/>'
      + '<circle cx="' + f(m.cx) + '" cy="' + f(m.cy) + '" r="' + f(m.r) + '" fill="url(#ocMoon' + o.seed + ')"/>'
      + '<circle cx="' + f(m.cx + m.r * .72) + '" cy="' + f(m.cy - m.r * .42) + '" r="' + f(m.r * .07) + '" fill="#f3dc96" opacity=".7"/>'
      + '<circle cx="' + f(m.cx - m.r * .8) + '" cy="' + f(m.cy + m.r * .3) + '" r="' + f(m.r * .05) + '" fill="#f3dc96" opacity=".7"/>'
      + '<circle cx="' + f(m.cx + m.r * .55) + '" cy="' + f(m.cy + m.r * .7) + '" r="' + f(m.r * .06) + '" fill="#f3dc96" opacity=".6"/>';
    (o.extras || []).forEach(function (e) { s += e; });
    // fence (partner) behind lesson signs
    if (o.fence) {
      var fy = o.fence[0], fh = o.fence[1];
      s += '<rect x="0" y="' + f(fy + fh * .25) + '" width="100" height="' + f(fh * .13) + '" fill="#5a3a24"/><rect x="0" y="' + f(fy + fh * .68) + '" width="100" height="' + f(fh * .13) + '" fill="#5a3a24"/>';
      for (x = 1; x < 100; x += 6.2) s += '<path d="M' + f(x) + ' ' + f(fy + fh) + ' V' + f(fy + 1.6) + ' L' + f(x + 2) + ' ' + f(fy) + ' L' + f(x + 4) + ' ' + f(fy + 1.6) + ' V' + f(fy + fh) + 'Z" fill="#7a4f2e" stroke="#4a2c17" stroke-width=".3"/>';
    }
    // rolling hills
    var g = o.ground, ft = o.foot;
    s += '<path d="M0 ' + f(g + 3) + ' Q25 ' + f(g - 3) + ' 50 ' + f(g + 1) + ' T100 ' + f(g - 1) + ' V' + f(ft) + ' H0Z" fill="#2b1650"/>'
      + '<path d="M0 ' + f(g + 7) + ' Q30 ' + f(g + 2) + ' 60 ' + f(g + 6) + ' T100 ' + f(g + 4) + ' V' + f(ft) + ' H0Z" fill="#1d3a1f"/>';
    // vines with curls and leaves
    for (i = 0; i < 3; i++) {
      var vy = g + 6 + i * (ft - g - 6) / 3, d = 'M-2 ' + f(vy);
      for (x = 0; x <= 104; x += 13) d += ' Q' + f(x + 6.5) + ' ' + f(vy + (i % 2 ? 3 : -3) * (x % 26 ? 1 : -1)) + ' ' + f(x + 13) + ' ' + f(vy);
      s += '<path d="' + d + '" stroke="#9ad43a" stroke-width=".55" fill="none"/>';
      for (x = 4 + r() * 6; x < 98; x += 9 + r() * 6) {
        s += '<path d="M' + f(x) + ' ' + f(vy) + ' c1 -1.6 2.6 -1.2 2.2 .2 c-.3 1 -1.6 .8 -1.2 -.2" stroke="#b6ea5a" stroke-width=".35" fill="none"/>' + leaf(x - 2, vy + .4, .55 + r() * .25, -30 + r() * 60);
      }
    }
    // pumpkins in the patch
    (o.pk || []).forEach(function (p) { s += pumpkin(p[0], p[1], p[2], p[2] * .72, p[3]); });
    return s + '</svg>';
  }

  function moonText(H, spec, cls, box, fsMax, opts) {
    var words = H.esc(spec.series || 'Learning Labs').split(' '), last = words.pop(), first = words.join(' ');
    var chars = Math.max(first.length, last.length) || 1, fs = Math.min(fsMax, box.w * .9 / (chars * .62));
    return '<div class="oc-moon ' + cls + '" style="' + at(box.l, box.t, box.w, box.h) + '">'
      + (opts.hw ? '<div class="hw" style="font-size:' + f(opts.hw) + 'cqw">Happy Halloween!</div>' : '')
      + '<div class="ser" style="font-size:' + f(fs) + 'cqw">' + (first ? first + '<br>' : '') + '<b>' + last + '</b></div>'
      + '<div class="mo" style="font-size:' + f(opts.mo) + 'cqw">' + H.MONTHS[spec.month - 1].toUpperCase() + ' ' + spec.year + '</div>'
      + '<div class="zm" style="font-size:' + f(opts.zm) + 'cqw">ALL ON ZOOM</div></div>';
  }

  function footer(spec, partner, H, top, h, sq) {
    return '<div class="oc-foot' + (sq ? ' fs' : '') + '" style="top:' + f(top) + 'cqw;height:' + f(h) + 'cqw"><div class="rg"><b>REGISTER at <span>LDAHawaii.org</span></b>Get your Zoom link, scan the QR code,<br>or call ' + H.phone(partner) + '</div>'
      + '<div class="oc-qr">' + H.qrImg(spec, partner) + '</div><div class="oc-bd">' + H.badges(spec, partner) + '</div></div>';
  }

  var faceJack = '<svg class="ic" viewBox="0 0 40 20"><path d="M10 7 l3.4 -5 3.4 5z M23.2 7 l3.4 -5 3.4 5z" fill="#3a1606"/><path d="M8 11 Q20 22 32 11 Q28 13 26 12 L24.5 14 23 12.4 Q20 13 17 12.4 L15.5 14 14 12 Q12 13 8 11Z" fill="#3a1606"/></svg>';
  var faceGhost = '<svg class="ic" viewBox="0 0 40 20"><path d="M13 9 C13 3 17 1 20 1 C23 1 27 3 27 9 L27 19 L24.7 17.4 L22.3 19 L20 17.4 L17.7 19 L15.3 17.4 L13 19Z" fill="#fbf7ff"/><ellipse cx="18" cy="8" rx="1" ry="1.4" fill="#2a1550"/><ellipse cx="22" cy="8" rx="1" ry="1.4" fill="#2a1550"/><path d="M18.6 11 Q20 12.4 21.4 11" stroke="#2a1550" stroke-width=".7" fill="none"/></svg>';

  function bags(S, H, sq, top, w, gapL) {
    var solo = S.length === 1;
    return S.map(function (s, i) {
      var l = solo ? (100 - w) / 2 : (i ? 100 - gapL - w : gapL), rot = solo ? -2 : (i ? 3 : -3);
      return '<div class="oc-bag b' + (i + 1) + '" style="' + at(l, top + (i ? 1.2 : 0), w) + ';transform:rotate(' + rot + 'deg)"><div class="lb">'
        + '<div class="n">SESSION ' + (i + 1) + '</div><div class="dd">' + s.dow + '., ' + s.mon + ' ' + s.day + '</div><div class="tm">' + s.time + '</div>'
        + '<div class="ti">' + s.lesson + '</div>' + (s.desc && !sq ? '<div class="ds">' + s.desc + '</div>' : '') + '</div>' + (i ? faceGhost : faceJack) + '</div>';
    }).join('');
  }

  function signs(S, top, w, sq) {
    var solo = S.length === 1;
    return S.map(function (s, i) {
      var l = solo ? (100 - w) / 2 : (i ? 100 - 4 - w : 4);
      return '<div class="oc-sign' + (sq ? ' ss' : '') + '" style="' + at(l, top + (i ? .6 : 0), w) + ';transform:rotate(' + (solo ? -1 : (i ? 1.5 : -1.5)) + 'deg)"><div class="n">LESSON ' + (i + 1) + '</div><div class="ti">' + s.lesson + '</div></div>';
    }).join('');
  }

  function jacks(rows, pos, w, h, sq) {
    return rows.map(function (r, i) {
      var p = pos[i];
      return '<div class="oc-jk' + (r.home ? ' h' : '') + (sq ? ' js' : '') + '" style="' + at(p[0], p[1], w, h) + '"><svg viewBox="0 0 100 82" preserveAspectRatio="none">'
        + (r.home ? '<ellipse cx="50" cy="48" rx="50" ry="34" fill="#c6f26a" opacity=".45"/>' : '')
        + pumpkin(50, 80, 92, 66, r.home)
        + '<path d="M35 29 q4.5 -5 9 0 M56 29 q4.5 -5 9 0" stroke="#3a1606" stroke-width="4.6" fill="none" stroke-linecap="round"/>'
        + '<path d="M35 29 q4.5 -5 9 0 M56 29 q4.5 -5 9 0" stroke="#ffe066" stroke-width="1.8" fill="none" stroke-linecap="round"/></svg>'
        + '<div class="tx"><div class="i">' + r.label + '</div><div class="d">' + r.days + '</div><div class="t">' + r.time + '</div></div></div>';
    }).join('');
  }

  var css = [
    '.oc{container-type:inline-size;aspect-ratio:8.5/11;position:relative;overflow:hidden;border-radius:4px;box-shadow:0 10px 30px rgba(23,10,51,.4);background:#2a1550;font-family:Nunito,Poppins,sans-serif;color:#fff}',
    '.oc.sq{aspect-ratio:1/1}',
    '.oc>div{position:absolute;z-index:2}',
    '.oc .oc-bg{position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:0}',
    '.oc .oc-logo{width:14cqw;height:14cqw;border-radius:50%;background:#fff;display:flex;align-items:center;justify-content:center;box-shadow:0 0 0 .7cqw #ff8a1f,0 .6cqw 1.6cqw rgba(0,0,0,.4)}',
    '.oc .oc-logo img{width:11cqw;height:auto}',
    '.oc .oc-logo.pip{width:19cqw;height:11.3cqw;border-radius:1.6cqw}.oc .oc-logo.pip img{width:17cqw}',
    '.oc .oc-kick{font-weight:900;letter-spacing:.32cqw;font-size:1.65cqw;color:#ffd9a8;white-space:nowrap}',
    '.oc .oc-moon{display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;color:#2a1550}',
    '.oc .oc-moon .hw{font-family:"Luckiest Guy",sans-serif;color:#e8681a;letter-spacing:.15cqw;line-height:1}',
    '.oc .oc-moon .ser{font-family:"Luckiest Guy",sans-serif;line-height:.98;margin:.8cqw 0 .5cqw;letter-spacing:.1cqw}',
    '.oc .oc-moon .ser b{font-weight:400;color:#e8681a}',
    '.oc .oc-moon .mo{font-weight:900;letter-spacing:.35cqw;color:#4b2a7a;line-height:1.2}',
    '.oc .oc-moon .zm{margin-top:.9cqw;background:#2a1550;color:#c6f26a;font-weight:900;letter-spacing:.3cqw;border-radius:5cqw;padding:.55cqw 2cqw;line-height:1.2}',
    '.oc .oc-hd{font-family:"Luckiest Guy",sans-serif;color:#c6f26a;text-align:center;left:0;right:0;letter-spacing:.12cqw;line-height:1;text-shadow:0 .3cqw 0 #170a33}',
    '.oc .oc-sub{left:0;right:0;text-align:center;font-weight:900;font-size:1.5cqw;letter-spacing:.35cqw;color:#ffd9a8}',
    /* trick-or-treat bags */
    '.oc .oc-bag{border-radius:.6cqw .6cqw 2.6cqw 2.6cqw;border-top:2.2cqw solid;padding:2.2cqw 2cqw 5.8cqw;box-shadow:0 1.4cqw 2.4cqw rgba(10,4,24,.5);z-index:3}',
    '.oc .oc-bag.b1{background:linear-gradient(90deg,#ec6c16,#ff9a3a 40%,#ff8a1f 70%,#ec6c16);border-color:#c9520f}',
    '.oc .oc-bag.b2{background:linear-gradient(90deg,#7db82e,#a8e04a 40%,#9ad43a 70%,#7db82e);border-color:#5e9420}',
    '.oc .oc-bag::before{content:"";position:absolute;left:27%;width:46%;top:-8.4cqw;height:8.8cqw;border:1.1cqw solid;border-color:inherit;border-bottom:0;border-radius:50% 50% 0 0/100% 100% 0 0;box-sizing:border-box}',
    '.oc .oc-bag .lb{background:#fff8ea;border-radius:1.4cqw;padding:1.6cqw 1.8cqw 1.7cqw;color:#2a1550;text-align:center;box-shadow:inset 0 0 0 .35cqw rgba(42,21,80,.12)}',
    '.oc .oc-bag .n{font-weight:900;font-size:1.35cqw;letter-spacing:.35cqw;color:#e8681a}',
    '.oc .oc-bag.b2 .n{color:#5e9420}',
    '.oc .oc-bag .dd{font-family:"Luckiest Guy",sans-serif;font-size:3.7cqw;line-height:1.05;margin-top:.5cqw;letter-spacing:.08cqw}',
    '.oc .oc-bag .tm{font-weight:900;font-size:1.95cqw;color:#c4400f;margin:.2cqw 0 .9cqw}',
    '.oc .oc-bag .ti{font-weight:900;font-size:2.5cqw;line-height:1.15}',
    '.oc .oc-bag .ds{font-weight:700;font-size:1.55cqw;color:#6b4f8a;margin-top:.7cqw}',
    '.oc .oc-bag .ic{position:absolute;left:50%;bottom:.9cqw;width:10cqw;height:5cqw;transform:translateX(-50%)}',
    /* wooden lesson signs (partner) */
    '.oc .oc-sign{background:linear-gradient(180deg,#9a6635,#7a4c24);border:.45cqw solid #4a2c17;border-radius:1.2cqw;padding:1.2cqw 2cqw 1.4cqw;text-align:center;color:#fff4dc;box-shadow:0 1cqw 1.8cqw rgba(10,4,24,.45);z-index:3}',
    '.oc .oc-sign::before,.oc .oc-sign::after{content:"";position:absolute;top:.8cqw;width:1cqw;height:1cqw;border-radius:50%;background:#d9c7a6;box-shadow:inset -.2cqw -.2cqw 0 #8a7a5c}',
    '.oc .oc-sign::before{left:.8cqw}.oc .oc-sign::after{right:.8cqw}',
    '.oc .oc-sign .n{font-weight:900;font-size:1.35cqw;letter-spacing:.35cqw;color:#c6f26a}',
    '.oc .oc-sign .ti{font-weight:900;font-size:2.35cqw;line-height:1.15;margin-top:.3cqw}',
    '.oc .oc-sign.ss .ti{font-size:2.15cqw}',
    /* jack-o-lantern time pumpkins (partner) */
    '.oc .oc-jk svg{position:absolute;inset:0;width:100%;height:100%;pointer-events:none}',
    '.oc .oc-jk .tx{position:absolute;left:9%;right:9%;top:40%;bottom:3%;display:flex;flex-direction:column;align-items:center;text-align:center;color:#3a1606}',
    '.oc .oc-jk .i{font-weight:900;font-size:1.6cqw;line-height:1.05}',
    '.oc .oc-jk .d{font-weight:800;font-size:1.3cqw;line-height:1.2;margin-top:.15cqw}',
    '.oc .oc-jk .t{margin-top:.4cqw;background:#ffe066;color:#3a1606;font-weight:900;font-size:2.05cqw;line-height:1;padding:.5cqw 1.4cqw .8cqw;border-radius:.8cqw .8cqw 3cqw 3cqw;box-shadow:0 0 1.2cqw #ffd23f,inset 0 -.3cqw 0 #f2b81c;white-space:nowrap}',
    '.oc .oc-jk.js .tx{top:40%}.oc .oc-jk.js .i{font-size:1.45cqw}.oc .oc-jk.js .d{font-size:1.2cqw}.oc .oc-jk.js .t{font-size:1.85cqw;margin-top:.25cqw}',
    /* footer */
    '.oc .oc-foot{left:0;right:0;background:#fff6e6;color:#2a1550;display:flex;align-items:center;gap:2.4cqw;padding:0 4.5cqw;box-sizing:border-box}',
    '.oc .oc-foot::before{content:"";position:absolute;left:0;right:0;top:-1.5cqw;height:1.5cqw;background:linear-gradient(#fffaf0 0 33%,#ff8a1f 33% 66%,#ffd23f 66%)}',
    '.oc .oc-foot .rg{flex:1;font-size:1.75cqw;font-weight:700;line-height:1.35;color:#4b2a7a}',
    '.oc .oc-foot .rg b{display:block;font-family:"Luckiest Guy",sans-serif;font-weight:400;font-size:3.3cqw;color:#2a1550;letter-spacing:.1cqw;line-height:1.1;margin-bottom:.4cqw}',
    '.oc .oc-foot .rg b span{color:#e8681a}',
    '.oc .oc-qr{width:11cqw;height:11cqw;background:#fff;border-radius:1cqw;padding:.5cqw;box-sizing:border-box;box-shadow:0 0 0 .4cqw #2a1550;display:flex;align-items:center;justify-content:center;font-weight:900;font-size:2cqw;color:#2a1550}',
    '.oc .oc-qr img{width:100%;height:100%;display:block}',
    '.oc .oc-bd{display:flex;flex-direction:column;gap:.6cqw;width:20cqw}',
    '.oc .oc-bd span{display:block;text-align:center;font-weight:900;font-size:1.3cqw;padding:.55cqw .8cqw;border-radius:5cqw;background:#2a1550;color:#fff6e6}',
    '.oc .oc-bd span:nth-child(2){background:#e8681a}.oc .oc-bd span:nth-child(3){background:#5e9420}',
    '.oc .oc-foot.fs{gap:2cqw;padding:0 4cqw}.oc .oc-foot.fs .rg{font-size:1.6cqw}.oc .oc-foot.fs .rg b{font-size:3cqw}.oc .oc-foot.fs .oc-qr{width:9.6cqw;height:9.6cqw}'
  ].join('\n');

  function fn(spec, partner, sq, H) {
    var S = spec.sessions.map(H.sessInfo), rows = partner ? H.zoneRows(spec.sessions) : null;
    var logo = partner ? '<div class="oc-logo pip" style="' + at(4, 4) + '"><img src="' + spec.pipUrl + '" alt=""></div>' : '<div class="oc-logo" style="' + at(4.5, 4) + '"><img src="' + spec.logoUrl + '" alt=""></div>';
    var kick = partner ? 'FOR FAMILIES ACROSS THE PACIFIC' : 'PARENT TRAINING &amp; INFORMATION CENTER';
    var root = '<div class="oc' + (sq ? ' sq' : '') + (partner ? ' partner' : '') + '">', out;

    if (!partner && !sq) {
      var moon = { cx: 50, cy: 38, r: 27 };
      out = scene(129.4, { seed: 11, moon: moon, ground: 96, foot: 113, pk: [[8, 112, 15], [27, 113, 10], [50, 110.5, 12, 1], [73, 113, 10], [92, 112, 14], [50, 99.5, 7]],
        extras: [ghost(83.5, 47, .95), candy(6, 30, .45, -18), candy(11.5, 42, .4, 14), candy(5, 54, .42, 4), bat(80, 14, .75), bat(9, 69, .55)] })
        + logo + '<div class="oc-kick" style="' + at(21.5, 6.6) + '">' + kick + '</div>'
        + '<div class="oc-kick" style="' + at(21.5, 9.6) + ';color:#c6f26a;letter-spacing:.2cqw">FRIENDLY FUN FOR THE WHOLE FAMILY</div>'
        + moonText(H, spec, '', { l: 26, t: 14.5, w: 48, h: 47 }, 9, { hw: 3.1, mo: 2.8, zm: 1.9 })
        + bags(S, H, false, 70, 41, 5.5) + footer(spec, false, H, 114.4, 15, false);
    } else if (!partner && sq) {
      var m2 = { cx: 74, cy: 27, r: 19 };
      var words = H.esc(spec.series || 'Learning Labs').split(' '), last = words.pop(), first = words.join(' ');
      var fs = Math.min(8.6, 46 / (Math.max(first.length, last.length) * .62));
      out = scene(100, { seed: 12, moon: m2, ground: 72, foot: 87, pk: [[6, 87, 12], [50, 86, 9, 1], [94, 87, 11]],
        extras: [ghost(45, 9.5, .6), candy(92, 52, .35, 20), bat(3, 47, .6)] })
        + logo + '<div class="oc-kick" style="' + at(21, 5.3) + ';font-size:1.45cqw;letter-spacing:.25cqw">' + kick + '</div>'
        + '<div class="oc-ttl" style="' + at(5, 19.5, 50) + '"><div class="hw">Happy Halloween!</div><div class="ser" style="font-size:' + f(fs) + 'cqw">' + (first ? first + '<br>' : '') + '<b>' + last + '</b></div></div>'
        + '<div class="oc-moon" style="' + at(57, 15, 34, 24) + '"><div class="mo" style="font-size:3cqw">' + H.MONTHS[spec.month - 1].toUpperCase() + '</div><div class="hw" style="font-size:6.4cqw;color:#2a1550">' + spec.year + '</div><div class="zm" style="font-size:1.7cqw">ALL ON ZOOM</div></div>'
        + bags(S, H, true, 50, 41, 5) + footer(spec, false, H, 88, 12, true);
    } else if (!sq) {
      var m3 = { cx: 50, cy: 31.5, r: 20.5 };
      out = scene(129.4, { seed: 13, moon: m3, ground: 70, foot: 113, fence: [52, 13],
        extras: [ghost(83, 30, .85), candy(7, 28, .42, -16), candy(12, 39, .38, 12), bat(78, 9, .7), bat(10, 46, .5)] })
        + logo + '<div class="oc-kick" style="' + at(26, 6.2) + '">' + kick + '</div>'
        + moonText(H, spec, '', { l: 31, t: 13, w: 38, h: 37 }, 7.2, { hw: 2.4, mo: 2.3, zm: 1.6 })
        + signs(S, 52.5, 44, false)
        + '<div class="oc-hd" style="top:66.5cqw;font-size:3.5cqw">What time is it on your island?</div>'
        + '<div class="oc-sub" style="top:71cqw">' + (S.length > 1 ? 'BOTH LESSONS' : 'LESSON') + ' · YOUR LOCAL TIME</div>'
        + jacks(rows, [[2.5, 74.5], [26.5, 76], [50.5, 74.5], [74.5, 76], [14.5, 94], [38.5, 95], [62.5, 94]], 23, 18.4, false)
        + footer(spec, true, H, 114.4, 15, false);
    } else {
      var m4 = { cx: 76, cy: 22, r: 16 };
      var w2 = H.esc(spec.series || 'Learning Labs').split(' '), l2 = w2.pop(), f2 = w2.join(' ');
      var fs2 = Math.min(7.6, 44 / (Math.max(f2.length, l2.length) * .62));
      out = scene(100, { seed: 14, moon: m4, ground: 60, foot: 87, fence: [41.5, 10] , extras: [bat(52, 6, .5)] })
        + logo + '<div class="oc-kick" style="' + at(4, 17.2) + ';font-size:1.4cqw;letter-spacing:.22cqw">' + kick + '</div>'
        + '<div class="oc-ttl" style="' + at(4, 20.5, 52) + '"><div class="ser" style="font-size:' + f(fs2) + 'cqw">' + (f2 ? f2 + '<br>' : '') + '<b>' + l2 + '</b></div></div>'
        + '<div class="oc-moon" style="' + at(62, 11, 28, 22) + '"><div class="mo" style="font-size:2.4cqw">' + H.MONTHS[spec.month - 1].toUpperCase() + '</div><div class="hw" style="font-size:5.2cqw;color:#2a1550">' + spec.year + '</div><div class="zm" style="font-size:1.45cqw">ALL ON ZOOM</div></div>'
        + signs(S, 41.5, 44, true)
        + '<div class="oc-hd" style="top:53.2cqw;font-size:3.1cqw">What time is it on your island?</div>'
        + jacks(rows, [[2.5, 57], [26.5, 58], [50.5, 57], [74.5, 58], [14.5, 72.2], [38.5, 73], [62.5, 72.2]], 23, 15, true)
        + footer(spec, true, H, 88, 12, true);
    }
    return root + out + '</div>';
  }

  return {
    name: 'Friendly Halloween (moon, pumpkin patch, treat bags)',
    fonts: 'family=Luckiest+Guy&family=Nunito:wght@600;700;800;900',
    css: css + '\n.oc .oc-ttl .hw{font-family:"Luckiest Guy",sans-serif;color:#c6f26a;font-size:3.2cqw;letter-spacing:.15cqw}.oc .oc-ttl .ser{font-family:"Luckiest Guy",sans-serif;line-height:1;color:#fff;margin-top:.6cqw;text-shadow:0 .5cqw 0 #170a33}.oc .oc-ttl .ser b{font-weight:400;color:#ff8a1f}',
    fn: fn
  };
})());

/* ---- LL month 11 ---- */
VEBFlyers.registerTheme(11, (function () {
  /* November: Thanksgiving gratitude. Warm cream paper, a gratitude tree in harvest colors,
     sessions as handwritten recipe cards on a wooden harvest table, partner times on drifting leaves. */
  function rng(seed) { var s = seed; return function () { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; }; }
  function f(n) { return (Math.round(n * 100) / 100).toString(); }
  function at(l, t, w, h) { return 'left:' + f(l) + 'cqw;top:' + f(t) + 'cqw' + (w != null ? ';width:' + f(w) + 'cqw' : '') + (h != null ? ';height:' + f(h) + 'cqw' : ''); }
  var LEAF = ['#c8561e', '#8e1b3a', '#d9a234', '#6b7a2f', '#e07a2e', '#a8323e'];

  function leafPath(x, y, s, rot, c) { // almond leaf with stem, centred at x,y
    return '<g transform="translate(' + f(x) + ' ' + f(y) + ') rotate(' + f(rot) + ') scale(' + f(s) + ')"><path d="M-5 0 C-3 -2.6 3 -2.6 5 0 C3 2.6 -3 2.6 -5 0Z" fill="' + c + '"/><path d="M-5 0 H4 M-6.6 .5 L-5 0" stroke="rgba(255,240,215,.55)" stroke-width=".28" fill="none"/></g>';
  }
  function maple(x, y, s, rot, c) {
    return '<path transform="translate(' + f(x) + ' ' + f(y) + ') rotate(' + f(rot) + ') scale(' + f(s) + ')" d="M0 -5 L1.1 -2.6 L2.6 -3.4 L2.2 -1 L4.6 -1.6 L3.6 .2 L4.8 1 L2 1.6 L2.3 3 L.3 2.2 L.3 4.6 H-.3 L-.3 2.2 L-2.3 3 L-2 1.6 L-4.8 1 L-3.6 .2 L-4.6 -1.6 L-2.2 -1 L-2.6 -3.4 L-1.1 -2.6Z" fill="' + c + '"/>';
  }
  /* gratitude tree: trunk + branches inside box (x0..x1, y0..y1), crown of leaves */
  function tree(r, x0, x1, y0, y1) {
    var w = x1 - x0, h = y1 - y0, bx = x0 + w * .55, s = '';
    var br = [[.55, .62, .2, .3], [.55, .55, .92, .22], [.55, .42, .35, .08], [.55, .45, .75, .05], [.55, .7, .05, .5], [.55, .66, 1, .45], [.55, .35, .58, .02]];
    s += '<path d="M' + f(bx - w * .07) + ' ' + f(y1) + ' Q' + f(bx - w * .02) + ' ' + f(y0 + h * .7) + ' ' + f(bx) + ' ' + f(y0 + h * .45) + ' Q' + f(bx + w * .02) + ' ' + f(y0 + h * .7) + ' ' + f(bx + w * .07) + ' ' + f(y1) + 'Z" fill="#6b3e22"/>';
    br.forEach(function (b) {
      var sx = x0 + w * b[0], sy = y0 + h * b[1], ex = x0 + w * b[2], ey = y0 + h * b[3];
      s += '<path d="M' + f(sx) + ' ' + f(sy) + ' Q' + f((sx + ex) / 2) + ' ' + f(Math.min(sy, ey) + (sy - ey) * .1) + ' ' + f(ex) + ' ' + f(ey) + '" stroke="#6b3e22" stroke-width="' + f(w * .016) + '" fill="none" stroke-linecap="round"/>';
    });
    for (var i = 0; i < 52; i++) {
      var a = r() * Math.PI * 2, d = Math.sqrt(r()), lx = x0 + w * (.53 + Math.cos(a) * d * .47), ly = y0 + h * (.3 + Math.sin(a) * d * .3);
      s += leafPath(lx, ly, w * (.02 + r() * .01), r() * 360, LEAF[Math.floor(r() * LEAF.length)]);
    }
    return s;
  }
  function wood(y0, y1) {
    var s = '<rect x="0" y="' + f(y0) + '" width="100" height="' + f(y1 - y0) + '" fill="#8a5634"/>', n = Math.round((y1 - y0) / 7.5), ph = (y1 - y0) / n;
    for (var i = 0; i < n; i++) {
      var y = y0 + i * ph;
      s += '<rect x="0" y="' + f(y) + '" width="100" height="' + f(ph) + '" fill="' + (i % 2 ? '#94603b' : '#83502f') + '"/>'
        + '<path d="M0 ' + f(y + ph * .35) + ' C25 ' + f(y + ph * .2) + ' 45 ' + f(y + ph * .55) + ' 70 ' + f(y + ph * .38) + ' S95 ' + f(y + ph * .3) + ' 100 ' + f(y + ph * .4) + '" stroke="#5f361d" stroke-width=".18" fill="none" opacity=".55"/>'
        + '<path d="M0 ' + f(y + ph * .7) + ' C30 ' + f(y + ph * .8) + ' 55 ' + f(y + ph * .6) + ' 100 ' + f(y + ph * .72) + '" stroke="#5f361d" stroke-width=".14" fill="none" opacity=".4"/>'
        + '<rect x="0" y="' + f(y + ph - .25) + '" width="100" height=".25" fill="#4a2a15" opacity=".6"/>';
    }
    return s + '<rect x="0" y="' + f(y0) + '" width="100" height=".8" fill="#5f361d"/>';
  }
  function pie(cx, cy, r) {
    var s = '<circle cx="' + f(cx) + '" cy="' + f(cy) + '" r="' + f(r) + '" fill="#e8e2d6"/><circle cx="' + f(cx) + '" cy="' + f(cy) + '" r="' + f(r * .86) + '" fill="#d99a52"/><circle cx="' + f(cx) + '" cy="' + f(cy) + '" r="' + f(r * .74) + '" fill="#b5522a"/>';
    for (var k = -2; k <= 2; k++) {
      s += '<rect x="' + f(cx - r * .74) + '" y="' + f(cy + k * r * .28 - r * .06) + '" width="' + f(r * 1.48) + '" height="' + f(r * .12) + '" fill="#e2ae6a" rx=".3"/>'
        + '<rect y="' + f(cy - r * .74) + '" x="' + f(cx + k * r * .28 - r * .06) + '" height="' + f(r * 1.48) + '" width="' + f(r * .12) + '" fill="#e8b874" rx=".3"/>';
    }
    return s;
  }
  function gourd(cx, cy, r, c) {
    return '<circle cx="' + f(cx) + '" cy="' + f(cy) + '" r="' + f(r) + '" fill="' + c + '"/><circle cx="' + f(cx) + '" cy="' + f(cy) + '" r="' + f(r * .62) + '" fill="none" stroke="rgba(0,0,0,.12)" stroke-width="' + f(r * .08) + '"/><circle cx="' + f(cx) + '" cy="' + f(cy) + '" r="' + f(r * .18) + '" fill="#5a6a24"/>';
  }

  function scene(H, o) {
    var r = rng(o.seed), s = '<svg class="nv-bg" viewBox="0 0 100 ' + f(H) + '" preserveAspectRatio="none"><rect width="100" height="' + f(H) + '" fill="#f7efe1"/>';
    for (var i = 0; i < 90; i++) s += '<circle cx="' + f(r() * 100) + '" cy="' + f(r() * H) + '" r=".18" fill="#d8c3a2" opacity=".55"/>';
    var t = o.tree; s += tree(r, t[0], t[1], t[2], t[3]);
    (o.fall || []).forEach(function (p) { s += maple(p[0], p[1], p[2], p[3], LEAF[p[4]]); });
    if (o.wood) {
      s += wood(o.wood[0], o.wood[1]);
      (o.pies || []).forEach(function (p) { s += pie(p[0], p[1], p[2]); });
      (o.gourds || []).forEach(function (p) { s += gourd(p[0], p[1], p[2], p[3]); });
      (o.tleaves || []).forEach(function (p) { s += maple(p[0], p[1], p[2], p[3], LEAF[p[4]]); });
    }
    (o.drift || []).forEach(function (d) { s += '<path d="' + d + '" stroke="#c9a77a" stroke-width=".3" stroke-dasharray="1 1.2" fill="none"/>'; });
    return s + '</svg>';
  }

  function title(H, spec, partner, box, fsMax) {
    var words = H.esc(spec.series || 'Learning Labs').split(' '), last = words.pop();
    var first = words.join(' '), lines = first ? [first] : [], longest = Math.max(first.length, last.length);
    var fs = Math.min(fsMax, box.w / (longest * .58));
    return '<div class="nv-ttl" style="' + at(box.l, box.t, box.w) + '"><div class="k">' + (partner ? 'FOR FAMILIES ACROSS THE PACIFIC' : 'PARENT TRAINING &amp; INFORMATION CENTER') + '</div>'
      + '<div class="ser" style="font-size:' + f(fs) + 'cqw">' + (lines.length ? lines.join('<br>') + '<br>' : '') + '<i>' + last + '</i></div>'
      + (box.mo ? monthZoom(H, spec, box.mo) : '') + '</div>';
  }

  function monthZoom(H, spec, mo) { return '<div class="mo" style="font-size:' + f(mo) + 'cqw">' + H.MONTHS[spec.month - 1] + ' ' + spec.year + '</div><div class="zm">Gather with us on Zoom</div>'; }
  function cards(S, top, w, sq) {
    var solo = S.length === 1;
    return S.map(function (s, i) {
      var l = solo ? (100 - w) / 2 : (i ? 100 - 5 - w : 5), rot = solo ? -1.5 : (i ? 2 : -2);
      return '<div class="nv-card' + (sq ? ' cs' : '') + '" style="' + at(l, top + (i ? 1.4 : 0), w) + ';transform:rotate(' + rot + 'deg)"><i class="tape"></i>'
        + '<div class="hd"><span>RECIPE FOR</span><span>No. ' + (i + 1) + '</span></div><div class="ti">' + s.lesson + '</div>'
        + '<div class="row"><b>WHEN</b><span>' + s.dow + '., ' + s.monFull + ' ' + s.day + '</span></div><div class="row"><b>TIME</b><span>' + s.time + '</span></div>'
        + (s.desc && !sq ? '<div class="row"><b>NOTE</b><span>' + s.desc + '</span></div>' : '') + '</div>';
    }).join('');
  }
  function lessonCards(S, top, w, sq) {
    var solo = S.length === 1;
    return S.map(function (s, i) {
      var l = solo ? (100 - w) / 2 : (i ? 100 - 4.5 - w : 4.5);
      return '<div class="nv-card lc' + (sq ? ' cs' : '') + '" style="' + at(l, top + (i ? .8 : 0), w) + ';transform:rotate(' + (solo ? -1 : (i ? 1.5 : -1.5)) + 'deg)"><i class="tape"></i>'
        + '<div class="hd"><span>RECIPE FOR</span><span>Lesson ' + (i + 1) + '</span></div><div class="ti">' + s.lesson + '</div></div>';
    }).join('');
  }
  function leaves(rows, pos, w, h, sq) {
    var cols = [0, 2, 3, 0, 1, 3, 1], rots = [-14, 9, -6, 12, -10, 7, -12];
    return rows.map(function (r, i) {
      var c = r.home ? '#d9a234' : LEAF[cols[i]], p = pos[i];
      return '<div class="nv-leaf' + (r.home ? ' h' : '') + (sq ? ' ls' : '') + '" style="' + at(p[0], p[1], w, h) + '"><svg viewBox="0 0 100 70" preserveAspectRatio="none"><g transform="rotate(' + rots[i] + ' 50 35)">'
        + '<path d="M93 35 L99 33" stroke="#6b3e22" stroke-width="2.4" stroke-linecap="round"/>'
        + '<path d="M3 35 C18 4 70 0 94 35 C70 70 18 66 3 35Z" fill="' + c + '"' + (r.home ? ' stroke="#8e1b3a" stroke-width="1.6" stroke-dasharray="4 3"' : '') + '/>'
        + '<path d="M8 35 C10 33 12 33 14 35 M86 35 C88 33 90 34 92 35" stroke="rgba(255,240,215,.5)" stroke-width="1" fill="none"/></g></svg>'
        + '<div class="tx"><div class="i">' + r.label + '</div><div class="d">' + r.days + '</div><div class="t">' + r.time + '</div></div></div>';
    }).join('');
  }
  function footer(spec, partner, H, top, h, sq) {
    return '<div class="nv-foot' + (sq ? ' fs' : '') + '" style="top:' + f(top) + 'cqw;height:' + f(h) + 'cqw"><div class="rg"><b>REGISTER at <span>LDAHawaii.org</span></b>Get your Zoom link, scan the QR code,<br>or call ' + H.phone(partner) + '</div>'
      + '<div class="nv-qr">' + H.qrImg(spec, partner) + '</div><div class="nv-bd">' + H.badges(spec, partner) + '</div></div>';
  }

  var css = [
    '.nv{container-type:inline-size;aspect-ratio:8.5/11;position:relative;overflow:hidden;border-radius:4px;box-shadow:0 10px 30px rgba(74,42,21,.3);background:#f7efe1;font-family:Outfit,Poppins,sans-serif;color:#3a2418}',
    '.nv.sq{aspect-ratio:1/1}',
    '.nv>div{position:absolute;z-index:2}',
    '.nv .nv-bg{position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:0}',
    '.nv .nv-logo{width:14cqw;height:14cqw;border-radius:50%;background:#fff;display:flex;align-items:center;justify-content:center;box-shadow:0 0 0 .6cqw #6b7a2f,0 .5cqw 1.4cqw rgba(74,42,21,.25)}',
    '.nv .nv-logo img{width:11cqw;height:auto}',
    '.nv .nv-logo.pip{width:19cqw;height:11.3cqw;border-radius:1.6cqw}.nv .nv-logo.pip img{width:17cqw}',
    '.nv.sq.partner .nv-ttl .k{font-size:1.35cqw!important;letter-spacing:.25cqw!important}',
    '.nv .nv-ttl .k{font-weight:800;font-size:1.55cqw;letter-spacing:.32cqw;color:#8e1b3a;white-space:nowrap}',
    '.nv .nv-ttl .ser{font-family:Fraunces,serif;font-weight:900;line-height:.92;color:#3a2418;margin:1.4cqw 0 1.2cqw;letter-spacing:-.05cqw}',
    '.nv .nv-ttl .ser i{color:#c8561e;font-weight:800}',
    '.nv .nv-ttl .mo{font-family:Kalam,cursive;font-weight:700;color:#6b7a2f;line-height:1}',
    '.nv .nv-ttl .zm{display:inline-block;margin-top:1.2cqw;background:#8e1b3a;color:#fff6e8;font-weight:800;font-size:1.65cqw;letter-spacing:.2cqw;padding:.7cqw 2.2cqw;border-radius:5cqw}',
    '.nv .nv-tag{font-family:Kalam,cursive;font-weight:700;color:#8e1b3a;line-height:1.1;text-align:center}',
    /* recipe cards */
    '.nv .nv-card{background:#fffdf7;border-radius:.8cqw;padding:2.4cqw 2.4cqw 2cqw;box-shadow:0 1.2cqw 2.2cqw rgba(50,25,10,.4);z-index:3}',
    '.nv .nv-card .tape{position:absolute;left:50%;top:-1.6cqw;width:12cqw;height:3cqw;margin-left:-6cqw;background:rgba(217,162,52,.75);transform:rotate(-3deg)}',
    '.nv .nv-card .hd{display:flex;justify-content:space-between;font-weight:800;font-size:1.3cqw;letter-spacing:.3cqw;color:#8e1b3a;padding-bottom:.6cqw;border-bottom:.45cqw double #c8561e}',
    '.nv .nv-card .ti{font-family:Kalam,cursive;font-weight:700;font-size:3.1cqw;line-height:1.08;color:#2a3a6b;margin:1.1cqw 0 .9cqw}',
    '.nv .nv-card .row{display:flex;align-items:baseline;gap:1.2cqw;border-top:.2cqw solid #e6dccb;padding:.55cqw 0 .3cqw}',
    '.nv .nv-card .row b{font-weight:800;font-size:1.2cqw;letter-spacing:.25cqw;color:#6b7a2f;min-width:7cqw}',
    '.nv .nv-card .row span{font-family:Kalam,cursive;font-weight:700;font-size:2.15cqw;color:#2a3a6b;line-height:1.15}',
    '.nv .nv-card.cs{padding:2cqw 2.2cqw 1.6cqw}.nv .nv-card.cs .ti{font-size:2.8cqw;margin:.8cqw 0 .6cqw}.nv .nv-card.cs .row span{font-size:2cqw}',
    '.nv .nv-card.lc{padding:1.8cqw 2.2cqw 1.6cqw}.nv .nv-card.lc .ti{font-size:2.7cqw;margin:.8cqw 0 0}',
    '.nv .nv-card.lc.cs .ti{font-size:2.45cqw}',
    '.nv .nv-hd{font-family:Fraunces,serif;font-style:italic;font-weight:800;color:#3a2418;line-height:1}',
    '.nv .nv-sub{font-weight:800;font-size:1.45cqw;letter-spacing:.32cqw;color:#c8561e}',
    /* leaves */
    '.nv .nv-leaf svg{position:absolute;inset:0;width:100%;height:100%;pointer-events:none;overflow:visible;filter:drop-shadow(0 .5cqw .6cqw rgba(74,42,21,.3))}',
    '.nv .nv-leaf .tx{position:absolute;left:17%;right:17%;top:0;bottom:0;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;color:#fff8ec}',
    '.nv .nv-leaf .i{font-weight:800;font-size:1.6cqw;line-height:1.05}',
    '.nv .nv-leaf .d{font-weight:600;font-size:1.3cqw;line-height:1.25;opacity:.95}',
    '.nv .nv-leaf .t{font-family:Fraunces,serif;font-weight:900;font-size:2.5cqw;line-height:1.1}',
    '.nv .nv-leaf.h .tx{color:#3a2418}',
    '.nv .nv-leaf.ls .i{font-size:1.45cqw}.nv .nv-leaf.ls .d{font-size:1.2cqw}.nv .nv-leaf.ls .t{font-size:2.2cqw}',
    /* footer */
    '.nv .nv-foot{left:0;right:0;background:#59662a;color:#f7efe1;display:flex;align-items:center;gap:2.4cqw;padding:0 4.5cqw;box-sizing:border-box;border-top:.8cqw solid #d9a234}',
    '.nv .nv-foot .rg{flex:1;font-size:1.75cqw;font-weight:600;line-height:1.35}',
    '.nv .nv-foot .rg b{display:block;font-family:Fraunces,serif;font-weight:900;font-size:3.3cqw;line-height:1.1;margin-bottom:.4cqw;color:#fff}',
    '.nv .nv-foot .rg b span{color:#f2c25c;font-style:italic}',
    '.nv .nv-qr{width:11cqw;height:11cqw;background:#fff;border-radius:.8cqw;padding:.5cqw;box-sizing:border-box;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:2cqw;color:#3a2418}',
    '.nv .nv-qr img{width:100%;height:100%;display:block}',
    '.nv .nv-bd{display:flex;flex-direction:column;gap:.6cqw;width:20cqw}',
    '.nv .nv-bd span{display:block;text-align:center;font-weight:800;font-size:1.3cqw;padding:.55cqw .8cqw;border-radius:5cqw;background:#f7efe1;color:#59662a}',
    '.nv .nv-bd span:nth-child(2){background:#d9a234;color:#3a2418}.nv .nv-bd span:nth-child(3){background:#8e1b3a;color:#fff}',
    '.nv .nv-foot.fs{gap:2cqw;padding:0 4cqw}.nv .nv-foot.fs .rg{font-size:1.6cqw}.nv .nv-foot.fs .rg b{font-size:3cqw}.nv .nv-foot.fs .nv-qr{width:9.6cqw;height:9.6cqw}'
  ].join('\n');

  function fn(spec, partner, sq, H) {
    var S = spec.sessions.map(H.sessInfo), rows = partner ? H.zoneRows(spec.sessions) : null;
    var logo = partner ? '<div class="nv-logo pip" style="' + at(5, 4.5) + '"><img src="' + spec.pipUrl + '" alt=""></div>' : '<div class="nv-logo" style="' + at(5, 4.5) + '"><img src="' + spec.logoUrl + '" alt=""></div>';
    var root = '<div class="nv' + (sq ? ' sq' : '') + (partner ? ' partner' : '') + '">', out;
    if (!partner && !sq) {
      out = scene(129.4, { seed: 21, tree: [58, 100, 1, 68], wood: [68, 113], fall: [[62, 58, .7, 20, 1], [94, 52, .6, -30, 2], [70, 47, .5, 50, 0]],
        pies: [[-1, 108, 9]], gourds: [[97, 104, 4, '#d9a234'], [91, 110, 3, '#c8561e'], [50, 109, 2.6, '#f2e6cf']], tleaves: [[49, 83, .7, 30, 0], [51, 96, .6, -20, 3], [12, 69.5, .5, 10, 2]] })
        + logo + title(H, spec, false, { l: 5, t: 21.5, w: 50, mo: 5.6 }, 11)
        + '<div class="nv-tag" style="' + at(5, 59.6, 52) + ';font-size:3.1cqw;text-align:left">With gratitude, <span style="color:#c8561e">mahalo nui!</span></div>'
        + cards(S, 74, 42, false)
        + footer(spec, false, H, 113, 16.4, false);
    } else if (!partner && sq) {
      out = scene(100, { seed: 22, tree: [60, 100, 0, 46], wood: [46, 87], fall: [[58, 38, .6, 15, 0]],
        pies: [[50, 84, 5.5]], gourds: [[98, 50, 3.5, '#d9a234'], [2, 50, 3, '#c8561e']] })
        + logo + title(H, spec, false, { l: 5, t: 20.3, w: 50 }, 8.2)
        + '<div class="nv-ttl" style="' + at(22.5, 5.4, 36) + '">' + monthZoom(H, spec, 4.6) + '</div>'
        + cards(S, 50, 42, true)
        + footer(spec, false, H, 87, 13, true);
    } else if (!sq) {
      out = scene(129.4, { seed: 23, tree: [60, 100, 0, 46], fall: [[96, 50, .55, 40, 2], [64, 44, .5, -20, 1]],
        drift: ['M-2 66 C20 68 40 74 62 78 S90 85 104 87', 'M-2 88 C20 90 44 95 66 99 S92 106 104 108'] })
        + logo + title(H, spec, true, { l: 5, t: 18.5, w: 50, mo: 4.8 }, 8.6)
        + lessonCards(S, 51.5, 43, false)
        + '<div class="nv-hd" style="' + at(5, 65) + ';font-size:4.2cqw">Falling for your local time</div>'
        + '<div class="nv-sub" style="' + at(5.2, 70) + '">' + (S.length > 1 ? 'BOTH LESSONS' : 'LESSON') + ' · FOR EACH ISLAND</div>'
        + leaves(rows, [[2, 73.5], [26, 76], [50, 78.5], [74, 81], [12, 95], [37, 97], [62, 99]], 25, 14.2, false)
        + footer(spec, true, H, 114, 15.4, false);
    } else {
      out = scene(100, { seed: 24, tree: [64, 100, 0, 33],
        drift: ['M-2 52 C20 54 44 60 66 63 S92 68 104 70'] })
        + logo + title(H, spec, true, { l: 26, t: 4.2, w: 36, mo: 3.6 }, 6.4)
        + lessonCards(S, 33.5, 43, true)
        + '<div class="nv-hd" style="' + at(5, 47.6) + ';font-size:3.6cqw">Falling for your local time</div>'
        + leaves(rows, [[2, 53], [26, 55.5], [50, 58], [74, 60.5], [12, 71], [37, 73], [62, 75]], 24, 12.5, true)
        + footer(spec, true, H, 88, 12, true);
    }
    return root + out + '</div>';
  }

  return {
    name: 'Thanksgiving gratitude (tree, recipe cards, falling leaves)',
    fonts: 'family=Fraunces:ital,opsz,wght@0,9..144,800;0,9..144,900;1,9..144,800;1,9..144,900&family=Outfit:wght@400;600;800&family=Kalam:wght@700',
    css: css,
    fn: fn
  };
})());

/* ---- LL month 12 ---- */
VEBFlyers.registerTheme(12, (function () {
  /* December: Happy Holidays gift wrap. Snowy white paper, an evergreen garland across the top,
     wrapped presents with bows (one in hibiscus paper), sessions as gift tags tied to the presents,
     partner times on round ornaments hanging from the garland at different heights. */
  function rng(seed) { var s = seed; return function () { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; }; }
  function f(n) { return (Math.round(n * 100) / 100).toString(); }
  function at(l, t, w, h) { return 'left:' + f(l) + 'cqw;top:' + f(t) + 'cqw' + (w != null ? ';width:' + f(w) + 'cqw' : '') + (h != null ? ';height:' + f(h) + 'cqw' : ''); }
  var EG = '#0f4d3a', CR = '#b3243c', GD = '#e3b341';

  function swagY(x, anchors, top, dip) {
    for (var i = 0; i < anchors.length - 1; i++) { var a = anchors[i], b = anchors[i + 1]; if (x >= a && x <= b) return top + dip * Math.sin(Math.PI * (x - a) / (b - a)); }
    return top;
  }
  function garland(r, anchors, top, dip) {
    var s = '', x, y, k;
    // bead string under the greenery
    var d = '';
    for (x = 0; x <= 100; x += .5) d += (x ? ' L' : 'M') + f(x) + ' ' + f(swagY(x, anchors, top, dip) + 1.8);
    s += '<path d="' + d + '" stroke="' + GD + '" stroke-width=".35" fill="none"/>';
    for (x = 1.5; x < 100; x += 3.2) s += '<circle cx="' + f(x) + '" cy="' + f(swagY(x, anchors, top, dip) + 1.8) + '" r=".55" fill="' + GD + '"/>';
    // evergreen needles
    var greens = ['#0b3d2e', '#14583f', '#1d6b4c', '#0f4d3a'];
    for (x = -1; x <= 101; x += .55) {
      y = swagY(Math.max(0, Math.min(100, x)), anchors, top, dip);
      for (k = 0; k < 3; k++) {
        var a = r() * Math.PI * 2, len = 1.2 + r() * 1.6;
        s += '<path d="M' + f(x) + ' ' + f(y) + ' l' + f(Math.cos(a) * len) + ' ' + f(Math.sin(a) * len * .8) + '" stroke="' + greens[Math.floor(r() * 4)] + '" stroke-width=".42" stroke-linecap="round"/>';
      }
    }
    // berries and little lights
    for (x = 2; x < 100; x += 4.3 + r() * 2) {
      y = swagY(x, anchors, top, dip) + (r() - .5) * 1.4;
      s += '<circle cx="' + f(x) + '" cy="' + f(y) + '" r=".6" fill="' + CR + '"/><circle cx="' + f(x + .7) + '" cy="' + f(y + .4) + '" r=".5" fill="#d13a50"/>';
    }
    // bows (and a plumeria) at the inner anchors
    anchors.slice(1, -1).forEach(function (ax, i) { s += i % 2 ? plumeria(ax, top + .6, 1.3) : bow(ax, top + .6, 1.1, CR); });
    return s;
  }
  function bow(cx, cy, s, c) {
    return '<g transform="translate(' + f(cx) + ' ' + f(cy) + ') scale(' + f(s) + ')"><path d="M0 0 L-1.4 4.4 L-.4 4 L0 0 L.4 4 L1.4 4.4Z" fill="' + c + '"/>'
      + '<path d="M0 0 C-2.6 -2.6 -4.4 -.4 -3.4 1.1 C-2.6 2 -1 1 0 0Z M0 0 C2.6 -2.6 4.4 -.4 3.4 1.1 C2.6 2 1 1 0 0Z" fill="' + c + '" stroke="rgba(0,0,0,.18)" stroke-width=".2"/><circle r=".75" fill="' + c + '" stroke="rgba(0,0,0,.2)" stroke-width=".2"/></g>';
  }
  function plumeria(cx, cy, s) {
    var p = '';
    for (var i = 0; i < 5; i++) p += '<ellipse cx="0" cy="-1.3" rx=".85" ry="1.45" transform="rotate(' + (i * 72) + ')" fill="#fffaf0" stroke="#f1d27a" stroke-width=".15"/>';
    return '<g transform="translate(' + f(cx) + ' ' + f(cy) + ') scale(' + f(s) + ')">' + p + '<circle r=".55" fill="#f4c542"/></g>';
  }
  function flake(x, y, s, c, o) {
    var p = '';
    for (var i = 0; i < 6; i++) p += '<path d="M0 0 V-2 M0 -1.2 l-.5 -.5 M0 -1.2 l.5 -.5" transform="rotate(' + (i * 60) + ')"/>';
    return '<g transform="translate(' + f(x) + ' ' + f(y) + ') scale(' + f(s) + ')" stroke="' + c + '" stroke-width=".28" stroke-linecap="round" fill="none" opacity="' + o + '">' + p + '</g>';
  }
  /* wrapped present, bottom-left at (x, by) */
  function present(id, x, by, w, h, wrap, rib, pat) {
    var y = by - h, cx = x + w / 2, lid = h * .2, s = '';
    s += '<rect x="' + f(x) + '" y="' + f(y) + '" width="' + f(w) + '" height="' + f(h) + '" fill="' + wrap + '"/>';
    if (pat) s += '<rect x="' + f(x) + '" y="' + f(y) + '" width="' + f(w) + '" height="' + f(h) + '" fill="url(#' + pat + ')"/>';
    s += '<rect x="' + f(x - w * .04) + '" y="' + f(y) + '" width="' + f(w * 1.08) + '" height="' + f(lid) + '" fill="' + wrap + '"/>'
      + (pat ? '<rect x="' + f(x - w * .04) + '" y="' + f(y) + '" width="' + f(w * 1.08) + '" height="' + f(lid) + '" fill="url(#' + pat + ')"/>' : '')
      + '<rect x="' + f(x - w * .04) + '" y="' + f(y + lid - .3) + '" width="' + f(w * 1.08) + '" height=".6" fill="rgba(0,0,0,.18)"/>'
      + '<rect x="' + f(cx - w * .07) + '" y="' + f(y) + '" width="' + f(w * .14) + '" height="' + f(h) + '" fill="' + rib + '"/>'
      + '<rect x="' + f(x) + '" y="' + f(y + h * .55) + '" width="' + f(w) + '" height="' + f(h * .1) + '" fill="' + rib + '"/>'
      + '<rect x="' + f(x + w * .78) + '" y="' + f(y) + '" width="' + f(w * .22) + '" height="' + f(h) + '" fill="rgba(0,0,0,.1)"/>';
    return s + bow(cx, y, Math.min(w, h) * .14, rib);
  }
  function defs(id) {
    return '<defs><linearGradient id="deBg' + id + '" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fdfcf8"/><stop offset="1" stop-color="#e9f2ee"/></linearGradient>'
      + '<pattern id="deDot' + id + '" width="3" height="3" patternUnits="userSpaceOnUse"><circle cx="1.5" cy="1.5" r=".55" fill="#fff" opacity=".85"/></pattern>'
      + '<pattern id="deStr' + id + '" width="3" height="3" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="1.3" height="3" fill="#fff" opacity=".9"/></pattern>'
      + '<pattern id="deHib' + id + '" width="7" height="7" patternUnits="userSpaceOnUse">'
      + [0, 72, 144, 216, 288].map(function (a) { return '<ellipse cx="2.2" cy="1.2" rx=".75" ry="1.15" transform="rotate(' + a + ' 2.2 2.4)" fill="#ff6f61"/>'; }).join('') + '<circle cx="2.2" cy="2.4" r=".35" fill="#ffd166"/>'
      + '<path d="M4.6 5.2 q1 -1.4 2 0 q-1 1 -2 0Z" fill="#2f9e6e"/></pattern>'
      + '<pattern id="deStar' + id + '" width="4" height="4" patternUnits="userSpaceOnUse"><path d="M2 .9 L2.3 1.7 L3.1 1.7 L2.45 2.2 L2.7 3 L2 2.5 L1.3 3 L1.55 2.2 L.9 1.7 L1.7 1.7Z" fill="' + GD + '"/></pattern></defs>';
  }
  function scene(H, o) {
    var r = rng(o.seed), id = o.seed, s = '<svg class="de-bg" viewBox="0 0 100 ' + f(H) + '" preserveAspectRatio="none">' + defs(id) + '<rect width="100" height="' + f(H) + '" fill="url(#deBg' + id + ')"/>';
    (o.flakes || []).forEach(function (p) { s += flake(p[0], p[1], p[2], p[3] ? GD : '#9cc3d5', p[3] ? .9 : .7); });
    (o.dots || []).forEach(function (z) { for (var i = 0; i < z[4]; i++) s += '<circle cx="' + f(z[0] + r() * z[2]) + '" cy="' + f(z[1] + r() * z[3]) + '" r="' + f(.2 + r() * .3) + '" fill="#9cc3d5" opacity=".55"/>'; });
    if (o.snow) s += '<path d="M0 ' + f(o.snow[0]) + ' Q20 ' + f(o.snow[0] - 2.5) + ' 45 ' + f(o.snow[0] - .5) + ' T100 ' + f(o.snow[0] - 1.5) + ' V' + f(o.snow[1]) + ' H0Z" fill="#fff"/><path d="M0 ' + f(o.snow[0]) + ' Q20 ' + f(o.snow[0] - 2.5) + ' 45 ' + f(o.snow[0] - .5) + ' T100 ' + f(o.snow[0] - 1.5) + '" stroke="#d5e6ee" stroke-width=".4" fill="none"/>';
    (o.strings || []).forEach(function (d) { s += '<path d="' + d + '" stroke="' + CR + '" stroke-width=".35" fill="none" stroke-dasharray="1.2 .5"/>'; });
    (o.gifts || []).forEach(function (g) {
      var pat = g[7] ? 'de' + g[7] + id : null;
      s += present(id, g[0], g[1], g[2], g[3], g[4], g[5], pat);
      if (g[6]) s += plumeria(g[0] + g[2] / 2 + g[2] * .12, g[1] - g[3] + .2, .9);
    });
    if (o.hang) o.hang.forEach(function (h) { s += '<path d="M' + f(h[0]) + ' ' + f(h[1]) + ' V' + f(h[2]) + '" stroke="#b08a2a" stroke-width=".3"/>'; });
    if (o.garland) s += garland(r, o.garland[0], o.garland[1], o.garland[2]);
    return s + '</svg>';
  }

  function seriesFs(H, spec, w, max) { var t = H.esc(spec.series || 'Learning Labs'); return Math.min(max, w / (t.replace(/&amp;/g, '&').length * .56)); }
  function series(H, spec) { var w = H.esc(spec.series || 'Learning Labs').split(' '), last = w.pop(); return (w.length ? w.join(' ') + ' ' : '') + '<i>' + last + '</i>'; }
  function banner(H, spec) { return H.MONTHS[spec.month - 1].toUpperCase() + ' ' + spec.year + ' &nbsp;·&nbsp; ON ZOOM'; }

  function tags(S, pos, w, sq, rt) {
    return S.map(function (s, i) {
      var p = pos[S.length === 1 ? 'solo' : i];
      return '<div class="de-tag' + (sq ? ' ts' : '') + (rt ? ' rt' : '') + ' g' + (i + 1) + '" style="' + at(p[0], p[1], w) + ';transform:rotate(' + p[2] + 'deg)"><div class="in">'
        + '<div class="n">GIFT ' + (i + 1) + ' &nbsp;·&nbsp; OPEN ON</div><div class="dd">' + s.dow + '., ' + s.monFull + ' ' + s.day + '</div><div class="tm">' + s.time + '</div>'
        + '<div class="ti">' + s.lesson + '</div>' + (s.desc && !sq ? '<div class="ds">' + s.desc + '</div>' : '') + '</div></div>';
    }).join('');
  }
  function lessonTags(S, pos, w, sq) {
    return S.map(function (s, i) {
      var p = pos[S.length === 1 ? 'solo' : i];
      return '<div class="de-tag lt' + (sq ? ' ts' : '') + ' g' + (i + 1) + '" style="' + at(p[0], p[1], w) + ';transform:rotate(' + p[2] + 'deg)"><div class="in"><div class="n">LESSON ' + (i + 1) + '</div><div class="ti">' + s.lesson + '</div></div></div>';
    }).join('');
  }
  var OCOL = [['#b3243c', '#7f1427', 1], ['#17694f', '#0b3d2e', 1], ['#17694f', '#0b3d2e', 1], ['#b3243c', '#7f1427', 1], ['#2a8fa0', '#17606d', 1], ['#17694f', '#0b3d2e', 1], ['#f3f1ea', '#cfd8d3', 0]];
  function ornaments(rows, cxs, tops, d, sq) {
    return rows.map(function (r, i) {
      var c = r.home ? ['#e3b341', '#b8861b', 0] : OCOL[i], l = cxs[i] - d / 2;
      return '<div class="de-orn' + (r.home ? ' h' : '') + (c[2] ? ' dk' : '') + (sq ? ' os' : '') + '" style="' + at(l, tops[i], d, d) + '"><svg viewBox="0 0 100 100">'
        + '<defs><radialGradient id="deO' + i + (sq ? 's' : '') + (r.home ? 'h' : '') + '" cx=".38" cy=".32" r=".75"><stop offset="0" stop-color="' + c[0] + '"/><stop offset=".7" stop-color="' + c[0] + '"/><stop offset="1" stop-color="' + c[1] + '"/></radialGradient></defs>'
        + (r.home ? '<circle cx="50" cy="54" r="49" fill="none" stroke="' + CR + '" stroke-width="2.4" stroke-dasharray="5 4"/>' : '')
        + '<rect x="40" y="0" width="20" height="10" rx="2" fill="#c9a23a"/><rect x="40" y="3" width="20" height="2" fill="#a88220"/>'
        + '<circle cx="50" cy="54" r="45" fill="url(#deO' + i + (sq ? 's' : '') + (r.home ? 'h' : '') + ')"/>'
        + '<path d="M22 34 A34 34 0 0 1 40 18" stroke="#fff" stroke-width="5" stroke-linecap="round" fill="none" opacity=".55"/>'
        + (r.home ? '<g transform="translate(73 22) scale(4.2)">' + [0, 72, 144, 216, 288].map(function (a) { return '<ellipse cx="0" cy="-1.3" rx=".85" ry="1.45" transform="rotate(' + a + ')" fill="#fffaf0" stroke="#e7c35a" stroke-width=".15"/>'; }).join('') + '<circle r=".55" fill="#f4c542"/></g>' : '')
        + '</svg><div class="tx"><div class="i">' + r.label + '</div><div class="d">' + r.days + '</div><div class="t">' + r.time + '</div></div></div>';
    }).join('');
  }
  function footer(spec, partner, H, top, h, sq) {
    return '<div class="de-foot' + (sq ? ' fs' : '') + '" style="top:' + f(top) + 'cqw;height:' + f(h) + 'cqw"><div class="rg"><b>REGISTER at <span>LDAHawaii.org</span></b>Get your Zoom link, scan the QR code,<br>or call ' + H.phone(partner) + '</div>'
      + '<div class="de-qr">' + H.qrImg(spec, partner) + '</div><div class="de-bd">' + H.badges(spec, partner) + '</div></div>';
  }

  var css = [
    '.de{container-type:inline-size;aspect-ratio:8.5/11;position:relative;overflow:hidden;border-radius:4px;box-shadow:0 10px 30px rgba(15,77,58,.3);background:#fdfcf8;font-family:Mulish,Poppins,sans-serif;color:#0f4d3a}',
    '.de.sq{aspect-ratio:1/1}',
    '.de>div{position:absolute;z-index:2}',
    '.de .de-bg{position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:0}',
    '.de .de-logo{width:14cqw;height:14cqw;border-radius:50%;background:#fff;display:flex;align-items:center;justify-content:center;box-shadow:0 0 0 .55cqw #e3b341,0 0 0 1.2cqw #b3243c,0 .8cqw 1.6cqw rgba(15,77,58,.3)}',
    '.de .de-logo img{width:11cqw;height:auto}',
    '.de .de-logo.pip{width:19cqw;height:11.3cqw;border-radius:1.6cqw;box-shadow:0 0 0 .55cqw #e3b341,0 .6cqw 1.4cqw rgba(15,77,58,.25)}.de .de-logo.pip img{width:17cqw}',
    '.de .de-kick{font-weight:900;font-size:1.6cqw;letter-spacing:.34cqw;color:#b3243c;white-space:nowrap}',
    '.de .de-hh{font-family:Parisienne,cursive;color:#b3243c;line-height:1.15;white-space:nowrap}',
    '.de .de-ser{font-family:"Abril Fatface",serif;color:#0f4d3a;line-height:1.05;white-space:nowrap}',
    '.de .de-ser i{font-style:normal;color:#b3243c}',
    '.de .de-ban{background:#b3243c;color:#fff;font-weight:900;letter-spacing:.32cqw;font-size:1.9cqw;padding:.8cqw 4.2cqw;line-height:1.2;clip-path:polygon(0 0,100% 0,96.5% 50%,100% 100%,0 100%,3.5% 50%);white-space:nowrap}',
    '.de .de-c{left:0;right:0;text-align:center}',
    '.de .de-cw{left:50%;transform:translateX(-50%)}',
    /* gift tags */
    '.de .de-tag{filter:drop-shadow(0 .9cqw 1.1cqw rgba(15,50,40,.35));z-index:3}',
    '.de .de-tag .in{background:#fffaf0;padding:2cqw 2.4cqw 2cqw 7.2cqw;clip-path:polygon(5cqw 0,100% 0,100% 100%,5cqw 100%,0 50%);position:relative;border-radius:0 1cqw 1cqw 0}',
    '.de .de-tag .in::before{content:"";position:absolute;left:2.4cqw;top:50%;width:1.9cqw;height:1.9cqw;margin-top:-.95cqw;border-radius:50%;background:#e9f2ee;box-shadow:inset 0 0 0 .45cqw #e3b341}',
    '.de .de-tag .in::after{content:"";position:absolute;left:6cqw;top:1.3cqw;bottom:1.3cqw;border-left:.25cqw dashed #e3b341}',
    '.de .de-tag.rt .in{padding:2cqw 7.2cqw 2cqw 2.4cqw;clip-path:polygon(0 0,calc(100% - 5cqw) 0,100% 50%,calc(100% - 5cqw) 100%,0 100%);border-radius:1cqw 0 0 1cqw}',
    '.de .de-tag.rt .in::before{left:auto;right:2.4cqw}.de .de-tag.rt .in::after{left:auto;right:6cqw}',
    '.de .de-tag .n{font-weight:900;font-size:1.3cqw;letter-spacing:.3cqw;color:#b3243c}',
    '.de .de-tag.g2 .n{color:#17694f}',
    '.de .de-tag .dd{font-family:"Abril Fatface",serif;font-size:3.5cqw;line-height:1.1;margin-top:.4cqw;color:#0f4d3a}',
    '.de .de-tag .tm{font-weight:900;font-size:1.95cqw;color:#b3243c;margin:.15cqw 0 .8cqw}',
    '.de .de-tag .ti{font-weight:900;font-size:2.45cqw;line-height:1.15;color:#123a2e}',
    '.de .de-tag .ds{font-weight:700;font-size:1.55cqw;color:#5f7a6e;margin-top:.6cqw}',
    '.de .de-tag.ts .in{padding:1.4cqw 2cqw 1.4cqw 6.6cqw}.de .de-tag.ts.rt .in{padding:1.4cqw 6.6cqw 1.4cqw 2cqw}.de .de-tag.ts .dd{font-size:3cqw}.de .de-tag.ts .tm{font-size:1.75cqw;margin-bottom:.5cqw}.de .de-tag.ts .ti{font-size:2.2cqw}',
    '.de .de-tag.lt .in{padding:1.3cqw 2cqw 1.4cqw 6.6cqw}.de .de-tag.lt .ti{font-size:2.25cqw;margin-top:.3cqw}.de .de-tag.lt.ts .in{padding:1cqw 1.8cqw 1.1cqw 6.2cqw}.de .de-tag.lt.ts .ti{font-size:1.95cqw}',
    /* ornaments */
    '.de .de-orn svg{position:absolute;inset:0;width:100%;height:100%;pointer-events:none;overflow:visible;filter:drop-shadow(0 .5cqw .7cqw rgba(15,50,40,.3))}',
    '.de .de-orn .tx{position:absolute;left:12%;right:12%;top:18%;bottom:0;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;color:#2b2410}',
    '.de .de-orn.dk .tx{color:#fff}',
    '.de .de-orn .i{font-weight:900;font-size:1.6cqw;line-height:1.05}',
    '.de .de-orn .d{font-weight:700;font-size:1.25cqw;line-height:1.25;margin-top:.15cqw;opacity:.95}',
    '.de .de-orn .t{font-family:"Abril Fatface",serif;font-size:2.4cqw;line-height:1.15}',
    '.de .de-orn.os .i{font-size:1.38cqw}.de .de-orn.os .d{font-size:1.1cqw}.de .de-orn.os .t{font-size:2cqw}',
    '.de .de-hd{font-family:"Abril Fatface",serif;color:#0f4d3a;line-height:1.1}',
    '.de .de-sub{font-weight:900;font-size:1.45cqw;letter-spacing:.32cqw;color:#b3243c}',
    /* footer */
    '.de .de-foot{left:0;right:0;background:#0f4d3a;color:#e9f2ee;display:flex;align-items:center;gap:2.4cqw;padding:0 4.5cqw;box-sizing:border-box;border-top:1cqw solid #b3243c;box-shadow:inset 0 .6cqw 0 #e3b341}',
    '.de .de-foot .rg{flex:1;font-size:1.75cqw;font-weight:700;line-height:1.35}',
    '.de .de-foot .rg b{display:block;font-family:"Abril Fatface",serif;font-weight:400;font-size:3.4cqw;line-height:1.1;margin-bottom:.4cqw;color:#fff}',
    '.de .de-foot .rg b span{color:#f2c75a}',
    '.de .de-qr{width:11cqw;height:11cqw;background:#fff;border-radius:.8cqw;padding:.5cqw;box-sizing:border-box;display:flex;align-items:center;justify-content:center;font-weight:900;font-size:2cqw;color:#0f4d3a}',
    '.de .de-qr img{width:100%;height:100%;display:block}',
    '.de .de-bd{display:flex;flex-direction:column;gap:.6cqw;width:20cqw}',
    '.de .de-bd span{display:block;text-align:center;font-weight:900;font-size:1.3cqw;padding:.55cqw .8cqw;border-radius:5cqw;background:#fff;color:#0f4d3a}',
    '.de .de-bd span:nth-child(2){background:#e3b341;color:#2b2410}.de .de-bd span:nth-child(3){background:#b3243c;color:#fff}',
    '.de .de-foot.fs{gap:2cqw;padding:0 4cqw}.de .de-foot.fs .rg{font-size:1.6cqw}.de .de-foot.fs .rg b{font-size:3cqw}.de .de-foot.fs .de-qr{width:9.6cqw;height:9.6cqw}'
  ].join('\n');

  function fn(spec, partner, sq, H) {
    var S = spec.sessions.map(H.sessInfo), rows = partner ? H.zoneRows(spec.sessions) : null, two = S.length > 1;
    var kick = partner ? 'FOR FAMILIES ACROSS THE PACIFIC' : 'PARENT TRAINING &amp; INFORMATION CENTER';
    var root = '<div class="de' + (sq ? ' sq' : '') + (partner ? ' partner' : '') + '">', out;
    if (!partner && !sq) {
      var fs = seriesFs(H, spec, 86, 11.5);
      out = scene(129.4, { seed: 31, garland: [[0, 33.33, 66.67, 100], 1, 6.5], snow: [100, 113],
        flakes: [[6, 20, 1.3], [12, 34, .9, 1], [5, 47, 1.1], [94, 19, 1.2, 1], [88, 33, 1], [95, 47, .9], [30, 15, .8], [70, 15, .8, 1]],
        strings: two ? ['M7 75 C3 84 8 92 13.5 93.5', 'M55 76 C51 85 57 91 63 94.5'] : ['M31 75 C26 84 34 91 44 92.5'],
        gifts: [[3, 113.5, 21, 20, CR, GD, 0, 'Dot'], [25, 113.5, 14, 11, '#2a8fa0', '#fff', 0, 'Hib'], [40, 113.5, 17, 21, EG, CR, 1, 'Str'], [58, 113.5, 13, 13, GD, CR, 0, null], [72, 113.5, 25, 18, CR, '#fff', 0, 'Star']] })
        + '<div class="de-logo" style="' + at(43, 11) + '"><img src="' + spec.logoUrl + '" alt=""></div>'
        + '<div class="de-kick de-c" style="top:27.2cqw">' + kick + '</div>'
        + '<div class="de-hh de-c" style="top:29.6cqw;font-size:6.6cqw">Happy Holidays</div>'
        + '<div class="de-ser de-c" style="top:' + f(38.6 + (11.5 - fs) * .6) + 'cqw;font-size:' + f(fs) + 'cqw">' + series(H, spec) + '</div>'
        + '<div class="de-ban de-cw" style="top:53cqw">' + banner(H, spec) + '</div>'
        + tags(S, { 0: [4, 61, -3], 1: [52, 62.5, 3], solo: [28, 61.5, -2] }, 43.5, false)
        + footer(spec, false, H, 113.4, 16, false);
    } else if (!partner && sq) {
      var fs2 = seriesFs(H, spec, 56, 8.6);
      out = scene(100, { seed: 32, garland: [[0, 50, 100], .5, 5], snow: [86, 88],
        flakes: [[96, 12, 1, 1], [58, 13, .9], [57, 33, .8, 1]],
        strings: two ? ['M58 50 C62 56 66 60 70 63.5', 'M58 73 C62 71 66 67 70 64'] : ['M58 57 C62 60 66 62 70 63.5'],
        gifts: [[64, 88, 33, 21, CR, GD, 0, 'Dot'], [67, 67, 27, 16, EG, CR, 1, 'Str'], [71, 51, 19, 13, '#2a8fa0', '#fff', 0, 'Hib']] })
        + '<div class="de-logo" style="' + at(5, 9) + ';width:12cqw;height:12cqw"><img src="' + spec.logoUrl + '" alt="" style="width:9.4cqw"></div>'
        + '<div class="de-kick" style="' + at(20.5, 10.6) + ';font-size:1.4cqw;letter-spacing:.26cqw">' + kick + '</div>'
        + '<div class="de-hh" style="' + at(20.5, 12.6) + ';font-size:5cqw">Happy Holidays</div>'
        + '<div class="de-ser" style="' + at(5, 22.5 + (8.6 - fs2) * .5) + ';font-size:' + f(fs2) + 'cqw">' + series(H, spec) + '</div>'
        + '<div class="de-ban" style="' + at(5, 33.2) + ';font-size:1.7cqw">' + banner(H, spec) + '</div>'
        + tags(S, { 0: [4, 40.5, -1.5], 1: [4, 63.5, 1.5], solo: [4, 46, -1.5] }, 54, true, true)
        + footer(spec, false, H, 88, 12, true);
    } else if (!sq) {
      var anchors = [0, 25, 50, 75, 100], cx = [], tp = [], hang = [], d = 19.5;
      for (var i = 0; i < 7; i++) { cx.push(10.5 + 13.17 * i); tp.push(i % 2 ? 31 : 10.5); hang.push([cx[i], swagY(cx[i], anchors, .5, 4.5) + 1, tp[i] + .4]); }
      var fs3 = seriesFs(H, spec, 84, 10.5);
      out = scene(129.4, { seed: 33, garland: [anchors, .5, 4.5], hang: hang,
        flakes: [[5, 58, 1], [95, 58, 1, 1], [93, 72, .8], [6, 92, .8, 1], [94, 92, .9]],
        gifts: [[-3, 113.5, 9, 9, CR, GD, 0, 'Dot'], [95, 113.5, 8, 11, EG, CR, 0, 'Str']] })
        + ornaments(rows, cx, tp, d, false)
        + '<div class="de-hd de-c" style="top:52.4cqw;font-size:3.6cqw">Your local time on every island</div>'
        + '<div class="de-sub de-c" style="top:57.6cqw">' + (two ? 'BOTH LESSONS' : 'LESSON') + ' · ON ZOOM · ' + H.MONTHS[spec.month - 1].toUpperCase() + ' ' + spec.year + '</div>'
        + '<div class="de-logo pip" style="' + at(5, 63) + '"><img src="' + spec.pipUrl + '" alt=""></div>'
        + '<div class="de-kick" style="' + at(27.5, 64.2) + '">' + kick + '</div>'
        + '<div class="de-hh" style="' + at(27.5, 66.4) + ';font-size:5.6cqw">Happy Holidays</div>'
        + '<div class="de-ser de-c" style="top:' + f(76.4 + (10.5 - fs3) * .6) + 'cqw;font-size:' + f(fs3) + 'cqw">' + series(H, spec) + '</div>'
        + '<div class="de-ban de-cw" style="top:89.6cqw">' + banner(H, spec) + '</div>'
        + lessonTags(S, { 0: [4, 96.5, -1.5], 1: [51.5, 97, 1.5], solo: [27.5, 96.5, -1] }, 44.5, false)
        + footer(spec, true, H, 113.4, 16, false);
    } else {
      var an2 = [0, 33.33, 66.67, 100], cx2 = [], tp2 = [], hg2 = [], d2 = 16.2;
      for (var j = 0; j < 7; j++) { cx2.push(10 + 13.33 * j); tp2.push(j % 2 ? 24.6 : 7.6); hg2.push([cx2[j], swagY(cx2[j], an2, .3, 3.6) + 1, tp2[j] + .3]); }
      var fs4 = seriesFs(H, spec, 60, 7.4);
      out = scene(100, { seed: 34, garland: [an2, .3, 3.6], hang: hg2, flakes: [[96, 50, .8, 1], [93, 62, .7]] })
        + ornaments(rows, cx2, tp2, d2, true)
        + '<div class="de-hd de-c" style="top:42.6cqw;font-size:3.1cqw">Your local time on every island</div>'
        + '<div class="de-logo pip" style="' + at(4, 48.6) + '"><img src="' + spec.pipUrl + '" alt=""></div>'
        + '<div class="de-kick" style="' + at(26, 49.6) + ';font-size:1.4cqw;letter-spacing:.26cqw">' + kick + '</div>'
        + '<div class="de-hh" style="' + at(26, 51.6) + ';font-size:4.4cqw">Happy Holidays</div>'
        + '<div class="de-ser" style="' + at(4, 61 + (7.4 - fs4) * .5) + ';font-size:' + f(fs4) + 'cqw">' + series(H, spec) + '</div>'
        + '<div class="de-ban" style="' + at(4, 70.6) + ';font-size:1.55cqw">' + banner(H, spec) + '</div>'
        + lessonTags(S, { 0: [3.5, 76.4, -1], 1: [51, 76.8, 1], solo: [27.5, 76.4, -1] }, 45.5, true)
        + footer(spec, true, H, 88, 12, true);
    }
    return root + out + '</div>';
  }

  return {
    name: 'Happy Holidays gifts (garland, presents, gift tags, ornaments)',
    fonts: 'family=Abril+Fatface&family=Mulish:wght@600;700;800;900&family=Parisienne',
    css: css,
    fn: fn
  };
})());

/* ---- PTC month 01 ---- */
VEBFlyers.registerTheme(1, (function () {
  /* Parent Talk Café, January: "Cozy winter café". Cream walls under a teal striped awning, a chalk
     menu-board easel carries the topic, a big teal mug of cocoa with marshmallows steams beside it,
     partner times ride on the kraft sleeves of to-go cups lined up on the counter. 1 unit = 1cqw. */
  function rng(seed) { var s = seed; return function () { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; }; }
  function f(n) { return (Math.round(n * 100) / 100).toString(); }
  function at(l, t, w, h) { return 'left:' + f(l) + 'cqw;top:' + f(t) + 'cqw' + (w != null ? ';width:' + f(w) + 'cqw' : '') + (h != null ? ';height:' + f(h) + 'cqw' : ''); }
  var C = { cream: '#f7eedf', cocoa: '#4a2c1e', cocoa2: '#6b3f27', teal: '#3f8f8a', teal2: '#2d6d69', tealLt: '#a9dcd5', copper: '#c87533', copperLt: '#f0b27a', slate: '#2b3634', kraft: '#c99a68' };
  var DOW = { Sun: 'Sunday', Mon: 'Monday', Tue: 'Tuesday', Wed: 'Wednesday', Thu: 'Thursday', Fri: 'Friday', Sat: 'Saturday' };

  /* ---- shared series mark ---- */
  function badge(id, c) {
    var top = 'M16 50 A34 34 0 0 1 84 50', bot = 'M10 50 A40 40 0 0 0 90 50';
    return '<svg viewBox="0 0 100 100" style="width:100%;height:100%;display:block;overflow:visible">'
      + '<defs><path id="' + id + '-t" d="' + top + '"/><path id="' + id + '-b" d="' + bot + '"/></defs>'
      + '<circle cx="50" cy="51.5" r="48" fill="rgba(0,0,0,.18)"/>'
      + '<circle cx="50" cy="50" r="48" fill="' + c.ring + '"/>'
      + '<circle cx="50" cy="50" r="45.2" fill="none" stroke="' + c.ink + '" stroke-width=".7" stroke-dasharray="1.4 1.6" opacity=".7"/>'
      + '<circle cx="50" cy="50" r="30" fill="' + c.face + '"/>'
      + '<circle cx="50" cy="50" r="30" fill="none" stroke="' + c.accent + '" stroke-width="1.4"/>'
      + '<text font-family="Poppins,sans-serif" font-weight="800" font-size="9.4" letter-spacing="1.2" fill="' + c.ink + '" text-anchor="middle"><textPath href="#' + id + '-t" startOffset="50%">PARENT TALK</textPath></text>'
      + '<text font-family="Poppins,sans-serif" font-weight="800" font-size="9.4" letter-spacing="2.4" fill="' + c.ink + '" text-anchor="middle"><textPath href="#' + id + '-b" startOffset="50%">CAFÉ</textPath></text>'
      + '<circle cx="11.5" cy="54" r="1.6" fill="' + c.accent + '"/><circle cx="88.5" cy="54" r="1.6" fill="' + c.accent + '"/>'
      + '<g fill="none" stroke="' + c.steam + '" stroke-width="2" stroke-linecap="round">'
      + '<path d="M43 44 C40 40 46 37 43 32 C41 29 44 26 43 24"/><path d="M50 43 C47 38 53 35 50 30 C48 27 51 24 50 22"/><path d="M57 44 C54 40 60 37 57 32 C55 29 58 26 57 24"/></g>'
      + '<ellipse cx="50" cy="69" rx="19" ry="3.6" fill="' + c.cupDark + '"/><ellipse cx="50" cy="68" rx="19" ry="3.4" fill="' + c.cup + '" stroke="' + c.accent + '" stroke-width=".8"/>'
      + '<path d="M64 52 C71 51 72 61 63 63" fill="none" stroke="' + c.cup + '" stroke-width="3.2"/>'
      + '<path d="M35 47 H65 L63 60 C62 66 57 68 50 68 C43 68 38 66 37 60 Z" fill="' + c.cup + '"/>'
      + '<path d="M58 48 L60 48 L58.4 60 C57.8 64 55.6 66 53 66.6 C56 64 57 61 57.3 58Z" fill="' + c.cupDark + '" opacity=".55"/>'
      + '<ellipse cx="50" cy="47" rx="15" ry="2.6" fill="' + c.cupDark + '"/>'
      + '<ellipse cx="50" cy="47.3" rx="12.6" ry="1.8" fill="' + c.coffee + '"/>'
      + '<path d="M40 54 H60" stroke="' + c.accent + '" stroke-width="1.6" stroke-linecap="round"/>'
      + '</svg>';
  }
  var BADGE = { ring: C.cocoa, face: '#fbf4e8', ink: '#fbf4e8', cup: C.teal, cupDark: C.teal2, coffee: C.cocoa2, steam: C.copper, accent: C.copper };

  /* ---- SVG scenery ---- */
  function awning(h) { // striped café awning, scalloped edge at y=h
    var s = '<rect x="0" y="0" width="100" height="' + f(h) + '" fill="' + C.teal + '"/>', n = 12, w = 100 / n, i;
    for (i = 0; i < n; i += 2) s += '<rect x="' + f(i * w) + '" y="0" width="' + f(w) + '" height="' + f(h) + '" fill="#fbf4e8"/>';
    for (i = 0; i < n; i++) s += '<path d="M' + f(i * w) + ' ' + f(h) + ' A' + f(w / 2) + ' ' + f(w * .42) + ' 0 0 0 ' + f((i + 1) * w) + ' ' + f(h) + 'Z" fill="' + (i % 2 ? C.teal : '#fbf4e8') + '"/>';
    s += '<path d="M0 ' + f(h) + ' ' + Array.apply(null, Array(n)).map(function (_, k) { return 'A' + f(w / 2) + ' ' + f(w * .42) + ' 0 0 0 ' + f((k + 1) * w) + ' ' + f(h); }).join(' ') + '" fill="none" stroke="' + C.teal2 + '" stroke-width=".35"/>';
    s += '<rect x="0" y="0" width="100" height="1.2" fill="' + C.copper + '"/><rect x="0" y="' + f(h * .62) + '" width="100" height=".25" fill="rgba(0,0,0,.08)"/>';
    return s;
  }
  function flake(x, y, r, c, op) {
    var s = '<g transform="translate(' + f(x) + ' ' + f(y) + ')" stroke="' + c + '" stroke-width="' + f(r * .12) + '" stroke-linecap="round" opacity="' + op + '">';
    for (var k = 0; k < 6; k++) {
      s += '<g transform="rotate(' + (k * 60) + ')"><path d="M0 0 V' + f(-r) + '"/><path d="M0 ' + f(-r * .55) + ' L' + f(r * .25) + ' ' + f(-r * .8) + ' M0 ' + f(-r * .55) + ' L' + f(-r * .25) + ' ' + f(-r * .8) + '"/></g>';
    }
    return s + '</g>';
  }
  function easel(x0, y0, x1, y1, foot) { // chalkboard with wooden frame on an A-frame easel
    var cx = (x0 + x1) / 2, s = '';
    s += '<path d="M' + f(cx) + ' ' + f(y0 - 2.6) + ' L' + f(cx) + ' ' + f(foot - 1.5) + '" stroke="#7a4a2a" stroke-width="1.3" stroke-linecap="round"/>';
    s += '<path d="M' + f(cx - 1.2) + ' ' + f(y0 - 2.6) + ' L' + f(x0 + 3) + ' ' + f(foot) + ' M' + f(cx + 1.2) + ' ' + f(y0 - 2.6) + ' L' + f(x1 - 3) + ' ' + f(foot) + '" stroke="#8d5a34" stroke-width="1.7" stroke-linecap="round"/>';
    s += '<rect x="' + f(x0 - .6) + '" y="' + f(y0 - .2) + '" width="' + f(x1 - x0 + 1.2) + '" height="' + f(y1 - y0 + 1.6) + '" rx="1.4" fill="rgba(40,22,10,.25)"/>';
    s += '<rect x="' + f(x0) + '" y="' + f(y0) + '" width="' + f(x1 - x0) + '" height="' + f(y1 - y0) + '" rx="1.2" fill="#9a6338"/>';
    s += '<rect x="' + f(x0 + 1.5) + '" y="' + f(y0 + 1.5) + '" width="' + f(x1 - x0 - 3) + '" height="' + f(y1 - y0 - 3) + '" rx=".5" fill="' + C.slate + '"/>';
    s += '<rect x="' + f(x0 - 1) + '" y="' + f(y1 - .4) + '" width="' + f(x1 - x0 + 2) + '" height="1.5" rx=".5" fill="#7a4a2a"/>';
    s += '<rect x="' + f(x0 + 6) + '" y="' + f(y1 - 1.2) + '" width="3" height=".9" rx=".4" fill="#f4efe6"/><rect x="' + f(x0 + 10) + '" y="' + f(y1 - 1.1) + '" width="2.2" height=".8" rx=".4" fill="' + C.copperLt + '"/>';
    s += '<circle cx="' + f(cx) + '" cy="' + f(y0 - 2.6) + '" r=".9" fill="' + C.copper + '"/>';
    return s;
  }
  function mug(cx, top, w, h) { // big mug of cocoa; top = rim line
    var l = cx - w / 2, r = cx + w / 2, b = top + h, rx = w / 2, ry = w * .11, s = '', i;
    s += '<ellipse cx="' + f(cx + w * .08) + '" cy="' + f(b + ry * .4) + '" rx="' + f(w * .78) + '" ry="' + f(ry * 1.25) + '" fill="rgba(60,30,15,.18)"/>';
    s += '<ellipse cx="' + f(cx + w * .06) + '" cy="' + f(b) + '" rx="' + f(w * .72) + '" ry="' + f(ry * 1.05) + '" fill="#e6d6bf"/><ellipse cx="' + f(cx + w * .06) + '" cy="' + f(b - ry * .2) + '" rx="' + f(w * .55) + '" ry="' + f(ry * .7) + '" fill="#f6ecdc"/>';
    s += '<path d="M' + f(r - w * .02) + ' ' + f(top + h * .2) + ' C' + f(r + w * .34) + ' ' + f(top + h * .14) + ' ' + f(r + w * .34) + ' ' + f(top + h * .78) + ' ' + f(r - w * .04) + ' ' + f(top + h * .74) + '" fill="none" stroke="' + C.teal2 + '" stroke-width="' + f(w * .1) + '" stroke-linecap="round"/>';
    s += '<path d="M' + f(r - w * .02) + ' ' + f(top + h * .2) + ' C' + f(r + w * .3) + ' ' + f(top + h * .15) + ' ' + f(r + w * .3) + ' ' + f(top + h * .76) + ' ' + f(r - w * .04) + ' ' + f(top + h * .72) + '" fill="none" stroke="' + C.teal + '" stroke-width="' + f(w * .07) + '" stroke-linecap="round"/>';
    s += '<path d="M' + f(l) + ' ' + f(top) + ' L' + f(l + w * .03) + ' ' + f(b - ry) + ' A' + f(rx * .97) + ' ' + f(ry) + ' 0 0 0 ' + f(r - w * .03) + ' ' + f(b - ry) + ' L' + f(r) + ' ' + f(top) + 'Z" fill="' + C.teal + '"/>';
    s += '<path d="M' + f(r - w * .2) + ' ' + f(top + ry) + ' L' + f(r - w * .05) + ' ' + f(top + ry) + ' L' + f(r - w * .07) + ' ' + f(b - ry * 1.2) + ' Q' + f(r - w * .14) + ' ' + f(b - ry * .4) + ' ' + f(r - w * .26) + ' ' + f(b - ry * .25) + ' Q' + f(r - w * .17) + ' ' + f(b - h * .3) + ' ' + f(r - w * .2) + ' ' + f(top + ry) + 'Z" fill="' + C.teal2 + '" opacity=".55"/>';
    s += '<path d="M' + f(l + w * .1) + ' ' + f(top + h * .16) + ' Q' + f(l + w * .08) + ' ' + f(top + h * .5) + ' ' + f(l + w * .14) + ' ' + f(top + h * .8) + '" stroke="#fff" stroke-width="' + f(w * .035) + '" fill="none" stroke-linecap="round" opacity=".35"/>';
    /* knitted-pattern band with snowflakes */
    s += '<rect x="' + f(l + w * .03) + '" y="' + f(top + h * .42) + '" width="' + f(w * .94) + '" height="' + f(h * .2) + '" fill="#fbf4e8" opacity=".95"/>';
    for (i = 0; i < 4; i++) s += flake(l + w * (.17 + i * .22), top + h * .52, h * .07, C.teal2, 1);
    s += '<path d="M' + f(l + w * .03) + ' ' + f(top + h * .42) + ' H' + f(r - w * .03) + ' M' + f(l + w * .03) + ' ' + f(top + h * .62) + ' H' + f(r - w * .03) + '" stroke="' + C.copper + '" stroke-width="' + f(h * .02) + '"/>';
    /* rim + cocoa + marshmallows */
    s += '<ellipse cx="' + f(cx) + '" cy="' + f(top) + '" rx="' + f(rx) + '" ry="' + f(ry) + '" fill="' + C.teal2 + '"/>';
    s += '<ellipse cx="' + f(cx) + '" cy="' + f(top + ry * .1) + '" rx="' + f(rx * .88) + '" ry="' + f(ry * .78) + '" fill="#6b3a22"/>';
    s += '<ellipse cx="' + f(cx - w * .1) + '" cy="' + f(top) + '" rx="' + f(rx * .45) + '" ry="' + f(ry * .3) + '" fill="#8a5232" opacity=".7"/>';
    var mm = [[-.26, -.02, -12], [-.08, -.12, 8], [.12, -.04, -4], [.28, -.1, 14], [.02, .08, 20], [-.18, .1, -18], [.24, .08, 6]];
    mm.forEach(function (m) {
      var mx = cx + m[0] * w, my = top + m[1] * w * .3, mw = w * .13, mh = w * .1;
      s += '<g transform="rotate(' + m[2] + ' ' + f(mx) + ' ' + f(my) + ')"><rect x="' + f(mx - mw / 2) + '" y="' + f(my - mh * .8) + '" width="' + f(mw) + '" height="' + f(mh) + '" rx="' + f(mw * .3) + '" fill="#f1e2d6"/>'
        + '<rect x="' + f(mx - mw / 2) + '" y="' + f(my - mh * .8) + '" width="' + f(mw) + '" height="' + f(mh * .55) + '" rx="' + f(mw * .3) + '" fill="#fffaf4"/></g>';
    });
    return s;
  }
  function steam(cx, y0, y1, w) {
    var s = '<g fill="none" stroke="#c9a585" stroke-linecap="round" opacity=".8">', h = y0 - y1;
    [-1, 0, 1].forEach(function (k) {
      var x = cx + k * w * .28, d = 'M' + f(x) + ' ' + f(y0) + ' C' + f(x - w * .12) + ' ' + f(y0 - h * .25) + ' ' + f(x + w * .12) + ' ' + f(y0 - h * .45) + ' ' + f(x) + ' ' + f(y0 - h * .65) + ' S' + f(x + w * .06) + ' ' + f(y1 + h * .08) + ' ' + f(x - w * .02) + ' ' + f(y1 + (k ? h * .12 : 0));
      s += '<path d="' + d + '" stroke-width="' + f(w * .05) + '"/>';
    });
    return s + '</g>';
  }
  function cookies(x, y, s) { // little plate of gingerbread-ish cookies
    var o = '<ellipse cx="' + f(x) + '" cy="' + f(y + .5) + '" rx="' + f(s * 1.15) + '" ry="' + f(s * .3) + '" fill="rgba(60,30,15,.15)"/><ellipse cx="' + f(x) + '" cy="' + f(y) + '" rx="' + f(s) + '" ry="' + f(s * .26) + '" fill="#fbf4e8" stroke="' + C.copper + '" stroke-width=".3"/>';
    [[-.35, -.18], [.3, -.2], [0, -.34]].forEach(function (p) {
      var cx = x + p[0] * s, cy = y + p[1] * s;
      o += '<ellipse cx="' + f(cx) + '" cy="' + f(cy) + '" rx="' + f(s * .36) + '" ry="' + f(s * .17) + '" fill="#b06a35"/><ellipse cx="' + f(cx) + '" cy="' + f(cy - s * .02) + '" rx="' + f(s * .25) + '" ry="' + f(s * .09) + '" fill="none" stroke="#fbf4e8" stroke-width=".25" stroke-dasharray=".5 .4"/>';
    });
    return o;
  }
  function counter(y, h) {
    return '<rect x="0" y="' + f(y) + '" width="100" height="' + f(h) + '" fill="#9a6338"/><rect x="0" y="' + f(y) + '" width="100" height="' + f(h * .3) + '" fill="#b27646"/>'
      + '<path d="M0 ' + f(y + h * .65) + ' C30 ' + f(y + h * .55) + ' 60 ' + f(y + h * .8) + ' 100 ' + f(y + h * .62) + '" stroke="#7a4a2a" stroke-width=".2" fill="none"/>';
  }
  function scene(H, o) {
    var r = rng(o.seed), s = '<svg class="p01-bg" viewBox="0 0 100 ' + f(H) + '" preserveAspectRatio="none"><rect width="100" height="' + f(H) + '" fill="' + C.cream + '"/>';
    for (var i = 0; i < 70; i++) s += '<circle cx="' + f(r() * 100) + '" cy="' + f(r() * H) + '" r="' + f(.15 + r() * .2) + '" fill="#d6c3a6" opacity=".5"/>';
    (o.flakes || []).forEach(function (p) { s += flake(p[0], p[1], p[2], C.teal, .22); });
    s += awning(o.aw);
    if (o.counter) s += counter(o.counter[0], o.counter[1]);
    (o.shelves || []).forEach(function (y) { s += '<rect x="1.5" y="' + f(y + .5) + '" width="97" height="1.6" rx=".4" fill="rgba(60,30,15,.18)"/><rect x="1.5" y="' + f(y) + '" width="97" height="1.5" rx=".4" fill="#9a6338"/><rect x="1.5" y="' + f(y) + '" width="97" height=".45" rx=".2" fill="#b27646"/>'
      + '<path d="M8 ' + f(y + 1.5) + ' v2.2 h2.2 M92 ' + f(y + 1.5) + ' v2.2 h-2.2" stroke="' + C.copper + '" stroke-width=".5" fill="none"/>'; });
    if (o.easel) s += easel.apply(null, o.easel);
    if (o.cookies) s += cookies.apply(null, o.cookies);
    if (o.mug) { s += steam(o.mug[0], o.mug[1] - o.mug[2] * .16, o.mug[1] - o.mug[2] * .16 - o.steamH, o.mug[2]); s += mug.apply(null, o.mug); }
    return s + '</svg>';
  }

  /* ---- text blocks ---- */
  function head(H, spec, partner, l, t, w, fs) {
    return '<div class="p01-head" style="' + at(l, t, w) + '"><div class="k">' + (partner ? 'FOR FAMILIES ACROSS THE PACIFIC' : 'PARENT TRAINING &amp; INFORMATION CENTER') + '</div>'
      + '<div class="mo" style="font-size:' + f(fs) + 'cqw">' + H.MONTHS[spec.month - 1] + ' ' + spec.year + '</div><div class="zm">LIVE on Zoom</div></div>';
  }
  function title(H, spec, l, t, w, max) {
    var s = H.esc(spec.series || 'Parent Talk Café'), fs = Math.min(max, w / (s.length * .56));
    return '<div class="p01-title" style="' + at(l, t, w) + ';font-size:' + f(fs) + 'cqw">' + s + '</div>';
  }
  function where(H, l, t, w, fs) {
    return '<div class="p01-where" style="' + at(l, t, w) + ';font-size:' + f(fs) + 'cqw"><i></i>' + H.esc(H.PTC_WHERE) + '</div>';
  }
  function presenter(H, spec) { return spec.presenter ? '<div class="pr">Presented by <b>' + H.esc(spec.presenter) + '</b></div>' : ''; }
  function board(H, spec, S, box, opt) { // text that sits on the chalkboard
    var one = S.length === 1, html = '<div class="hd">' + (one ? 'Today\'s Special' : 'On the Menu') + '</div><i class="sw"></i>';
    S.forEach(function (s, i) {
      html += '<div class="it' + (i ? ' it2' : '') + '"><div class="tp" style="font-size:' + f(one ? opt.tp1 : opt.tp2) + 'cqw">' + s.lesson + '</div>'
        + (s.desc && opt.desc ? '<div class="ds">' + s.desc + '</div>' : '')
        + (opt.times ? (one ? '<div class="dt">' + DOW[s.dow] + ', ' + s.monFull + ' ' + s.day + '</div><div class="tm">' + s.time + '</div>'
          : '<div class="dl">' + s.dow + ', ' + s.mon + ' ' + s.day + ' <span>' + s.time + '</span></div>') : '') + '</div>';
    });
    html += presenter(H, spec);
    return '<div class="p01-board' + (opt.cls ? ' ' + opt.cls : '') + '" style="' + at(box[0], box[1], box[2], box[3]) + '">' + html + '</div>';
  }
  function cups(rows, pos, w, h, sq) {
    return rows.map(function (r, i) {
      var p = pos[i], tl = r.time.replace(/ \/ /g, '<br>'), fsT = r.time.length > 12 ? .82 : 1;
      var sleeve = r.home ? C.teal : C.kraft, sleeveDk = r.home ? C.teal2 : '#a97c4f';
      return '<div class="p01-cup' + (r.home ? ' h' : '') + (sq ? ' cs' : '') + '" style="' + at(p[0], p[1], w, h) + '"><svg viewBox="0 0 100 100" preserveAspectRatio="none">'
        + '<ellipse cx="50" cy="98" rx="42" ry="2.2" fill="rgba(60,30,15,.2)"/>'
        + '<path d="M9 13 L91 13 L81 97 Q50 100 19 97 Z" fill="#fffaf2" stroke="#e2d2bb" stroke-width="1"/>'
        + '<rect x="4" y="4" width="92" height="10" rx="4" fill="' + (r.home ? C.copper : C.cocoa) + '"/><rect x="14" y="0" width="72" height="6" rx="3" fill="' + (r.home ? C.copperLt : C.cocoa2) + '"/>'
        + '<path d="M8 22 L92 22 L85 84 L15 84 Z" fill="' + sleeve + '"/>'
        + '<path d="M8 22 L92 22 L91.4 26 L8.6 26 Z M15 84 L85 84 L85.5 80 L14.5 80 Z" fill="' + sleeveDk + '"/>'
        + '</svg><div class="tx"><div class="i">' + r.label + '</div><div class="d">' + r.days + '</div><div class="t" style="font-size:' + fsT + 'em">' + tl + '</div></div></div>';
    }).join('');
  }
  function footer(spec, partner, H, top, h, sq) {
    return '<div class="p01-foot' + (sq ? ' fs' : '') + '" style="top:' + f(top) + 'cqw;height:' + f(h) + 'cqw"><div class="rg"><b>REGISTER at <span>LDAHawaii.org</span></b>Get your Zoom link, scan the QR code,<br>or call ' + H.phone(partner) + '</div>'
      + '<div class="p01-qr">' + H.qrImg(spec, partner) + '</div><div class="p01-bd">' + H.badges(spec, partner) + '</div></div>';
  }

  var css = [
    '.p01{container-type:inline-size;aspect-ratio:8.5/11;position:relative;overflow:hidden;border-radius:4px;box-shadow:0 10px 30px rgba(74,44,30,.3);background:' + C.cream + ';font-family:Nunito,Poppins,sans-serif;color:' + C.cocoa + '}',
    '.p01.sq{aspect-ratio:1/1}',
    '.p01>div{position:absolute;z-index:2}',
    '.p01 .p01-bg{position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:0}',
    '.p01 .p01-logo{width:14cqw;height:14cqw;border-radius:50%;background:#fff;display:flex;align-items:center;justify-content:center;box-shadow:0 0 0 .6cqw ' + C.teal + ',0 .5cqw 1.4cqw rgba(74,44,30,.25)}',
    '.p01 .p01-logo img{width:11cqw;height:auto}',
    '.p01 .p01-logo.pip{width:19cqw;height:11.3cqw;border-radius:1.6cqw}.p01 .p01-logo.pip img{width:17cqw}',
    '.p01 .p01-badge{width:20cqw;height:20cqw}',
    '.p01 .p01-head .k{font-weight:900;font-size:1.5cqw;letter-spacing:.3cqw;color:' + C.teal2 + ';white-space:nowrap}',
    '.p01 .p01-head .mo{font-family:"Yeseva One",serif;color:' + C.copper + ';line-height:1.05;margin:.8cqw 0 .9cqw}',
    '.p01 .p01-head .zm{display:inline-block;background:' + C.cocoa + ';color:#fbf4e8;font-weight:900;font-size:1.6cqw;letter-spacing:.25cqw;padding:.6cqw 2.2cqw;border-radius:5cqw}',
    '.p01 .p01-title{font-family:"Yeseva One",serif;line-height:1;color:' + C.cocoa + ';white-space:nowrap;text-shadow:.35cqw .35cqw 0 rgba(200,117,51,.25)}',
    '.p01 .p01-where{font-weight:800;color:' + C.teal2 + ';display:flex;align-items:center;gap:1cqw;line-height:1.2}',
    '.p01 .p01-where i{flex:none;width:1.1em;height:1.1em;border-radius:50%;background:' + C.copper + ';position:relative}',
    '.p01 .p01-where i:after{content:"";position:absolute;left:.42em;top:.3em;border-left:.4em solid #fff;border-top:.25em solid transparent;border-bottom:.25em solid transparent}',
    /* chalkboard */
    '.p01 .p01-board{display:flex;flex-direction:column;justify-content:center;color:#f4efe6;font-family:"Patrick Hand",cursive;text-align:center}',
    '.p01 .p01-board .hd{font-family:"Cabin Sketch",cursive;font-weight:700;font-size:3cqw;color:' + C.copperLt + ';letter-spacing:.15cqw;line-height:1}',
    '.p01 .p01-board .sw{display:block;height:.9cqw;margin:.6cqw auto 1.4cqw;width:60%;border-bottom:.3cqw solid rgba(244,239,230,.55);border-radius:0 0 50% 50%}',
    '.p01 .p01-board .tp{font-family:"Cabin Sketch",cursive;font-weight:700;line-height:1.08;color:#fffaf0}',
    '.p01 .p01-board .ds{font-size:2.3cqw;color:' + C.tealLt + ';line-height:1.15;margin-top:.8cqw}',
    '.p01 .p01-board .dt{font-size:3cqw;line-height:1.1;margin-top:1.8cqw;padding-top:1.4cqw;border-top:.25cqw dashed rgba(244,239,230,.4)}',
    '.p01 .p01-board .tm{font-family:"Cabin Sketch",cursive;font-weight:700;font-size:3.3cqw;color:' + C.copperLt + ';line-height:1.15}',
    '.p01 .p01-board .dl{font-size:2.8cqw;line-height:1.15;margin-top:.6cqw}.p01 .p01-board .dl span{color:' + C.copperLt + '}',
    '.p01 .p01-board .it2{margin-top:1.4cqw;padding-top:1.4cqw;border-top:.25cqw dashed rgba(244,239,230,.4)}',
    '.p01 .p01-board .pr{font-size:2.4cqw;line-height:1.15;margin-top:1.4cqw;color:' + C.tealLt + '}.p01 .p01-board .pr b{font-weight:400;color:#fffaf0}',
    '.p01 .p01-board.bs .hd{font-size:2.4cqw}.p01 .p01-board.bs .sw{margin:.3cqw auto .8cqw}.p01 .p01-board.bs .ds{font-size:1.9cqw;margin-top:.4cqw}.p01 .p01-board.bs .dt{font-size:2.4cqw;margin-top:1cqw;padding-top:.8cqw}.p01 .p01-board.bs .tm{font-size:2.6cqw}.p01 .p01-board.bs .dl{font-size:2.3cqw;margin-top:.3cqw}.p01 .p01-board.bs .it2{margin-top:.8cqw;padding-top:.8cqw}.p01 .p01-board.bs .pr{font-size:2cqw;margin-top:.8cqw}',
    /* menu strip (partner) */
    '.p01 .p01-strip{text-align:center}',
    '.p01 .p01-strip .dot{display:none}.p01 .p01-strip .tp+.dot+.tp{margin-top:.5cqw;padding-top:.5cqw;border-top:.2cqw dashed rgba(244,239,230,.4)}',
    '.p01 .p01-hd2{font-family:"Yeseva One",serif;color:' + C.cocoa + ';line-height:1;text-align:center}',
    '.p01 .p01-sub{font-weight:900;font-size:1.35cqw;letter-spacing:.3cqw;color:' + C.copper + ';text-align:center}',
    /* to-go cups */
    '.p01 .p01-cup svg{position:absolute;inset:0;width:100%;height:100%;pointer-events:none;overflow:visible}',
    '.p01 .p01-cup .tx{position:absolute;left:14%;right:14%;top:24%;height:56%;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;color:' + C.cocoa + ';font-size:2.35cqw}',
    '.p01 .p01-cup .i{font-weight:900;font-size:.78em;line-height:1.05}',
    '.p01 .p01-cup .d{font-weight:700;font-size:.66em;line-height:1.2;margin:.15em 0}',
    '.p01 .p01-cup .t{font-family:"Yeseva One",serif;line-height:1.05}',
    '.p01 .p01-cup.h .tx{color:#fff}',
    '.p01 .p01-cup.cs .tx{font-size:1.95cqw}',
    /* footer */
    '.p01 .p01-foot{left:0;right:0;background:' + C.cocoa + ';color:#f7eedf;display:flex;align-items:center;gap:2.4cqw;padding:0 4.5cqw;box-sizing:border-box;border-top:.8cqw solid ' + C.copper + '}',
    '.p01 .p01-foot .rg{flex:1;font-size:1.75cqw;font-weight:700;line-height:1.35}',
    '.p01 .p01-foot .rg b{display:block;font-family:"Yeseva One",serif;font-weight:400;font-size:3.3cqw;line-height:1.1;margin-bottom:.4cqw;color:#fff}',
    '.p01 .p01-foot .rg b span{color:' + C.copperLt + '}',
    '.p01 .p01-qr{width:11cqw;height:11cqw;flex:none;background:#fff;border-radius:.8cqw;padding:.5cqw;box-sizing:border-box;display:flex;align-items:center;justify-content:center;font-weight:900;font-size:2cqw;color:' + C.cocoa + '}',
    '.p01 .p01-qr img{width:100%;height:100%;display:block}',
    '.p01 .p01-bd{display:flex;flex-direction:column;gap:.6cqw;width:20cqw}',
    '.p01 .p01-bd span{display:block;text-align:center;font-weight:900;font-size:1.3cqw;padding:.55cqw .8cqw;border-radius:5cqw;background:#f7eedf;color:' + C.cocoa + '}',
    '.p01 .p01-bd span:nth-child(2){background:' + C.teal + ';color:#fff}.p01 .p01-bd span:nth-child(3){background:' + C.copper + ';color:#fff}',
    '.p01 .p01-foot.fs{gap:2cqw;padding:0 4cqw}.p01 .p01-foot.fs .rg{font-size:1.55cqw}.p01 .p01-foot.fs .rg b{font-size:2.9cqw}.p01 .p01-foot.fs .p01-qr{width:9.6cqw;height:9.6cqw}'
  ].join('\n');

  function fn(spec, partner, sq, H) {
    var S = spec.sessions.map(H.sessInfo), rows = partner ? H.zoneRows(spec.sessions) : null, out;
    var logo = function (l, t) { return partner ? '<div class="p01-logo pip" style="' + at(l, t) + '"><img src="' + spec.pipUrl + '" alt=""></div>' : '<div class="p01-logo" style="' + at(l, t) + '"><img src="' + spec.logoUrl + '" alt=""></div>'; };
    var bdg = function (l, t, w) { return '<div class="p01-badge" style="' + at(l, t, w, w) + '">' + badge('p01-bdg', BADGE) + '</div>'; };
    var root = '<div class="p01' + (sq ? ' sq' : '') + (partner ? ' partner' : '') + '">';
    if (!partner && !sq) {
      out = scene(129.4, { seed: 11, aw: 8, flakes: [[62, 50, 2.4], [56, 60, 1.6], [96, 47, 1.8], [90, 58, 1.2]], counter: [100, 10], easel: [4, 48, 55, 97, 109.5],
          mug: [75.5, 72, 28, 26], steamH: 13, cookies: [91, 101.5, 5.5] })
        + logo(5, 12.5) + bdg(75, 11, 20)
        + head(H, spec, false, 22, 14, 50, 5.2)
        + title(H, spec, 5, 31, 90, 10.6)
        + where(H, 5.3, 42.6, 90, 1.95)
        + board(H, spec, S, [8, 51, 43, 43], { tp1: 4.6, tp2: 4.3, desc: true, times: true })
        + footer(spec, false, H, 110, 19.4, false);
    } else if (!partner && sq) {
      out = scene(100, { seed: 12, aw: 6.5, flakes: [[64, 40, 1.8], [94, 38, 1.4]], counter: [80, 6.5], easel: [4, 34, 57, 81.5, 85.5],
          mug: [74.5, 59, 22, 20.5], steamH: 10, cookies: [92, 81.5, 4.2] })
        + logo(4, 9.5) + bdg(80, 8.5, 16.5)
        + '<div class="p01-head" style="' + at(20.5, 10, 58) + '"><div class="k" style="font-size:1.35cqw">PARENT TRAINING &amp; INFORMATION CENTER</div></div>'
        + title(H, spec, 20.5, 13.6, 57, 6.6)
        + '<div class="p01-head" style="' + at(20.5, 21.2, 58) + '"><div class="mo" style="font-size:3.4cqw;margin:0;display:inline-block;vertical-align:middle">' + H.MONTHS[spec.month - 1] + ' ' + spec.year + '</div> <div class="zm" style="vertical-align:middle;margin-left:1.2cqw;font-size:1.35cqw">LIVE on Zoom</div></div>'
        + where(H, 20.5, 28.2, 60, 1.55)
        + board(H, spec, S, [6.8, 36.3, 47.4, 42.3], { tp1: 4.3, tp2: 3.9, desc: S.length === 1, times: true, cls: 'bs' })
        + footer(spec, false, H, 86.5, 13.5, true);
    } else if (!sq) {
      var pos = [[3.5, 72.4], [27.5, 72.4], [51.5, 72.4], [75.5, 72.4], [15.5, 92.4], [39.5, 92.4], [63.5, 92.4]];
      out = scene(129.4, { seed: 13, aw: 8, flakes: [[96, 50, 1.6], [3, 112, 1.4]], easel: [4, 48, 66, 69.5, 72.5],
          mug: [83, 57.5, 17, 13.5], steamH: 8, shelves: [90.9, 110.9] })
        + logo(5, 12.5) + bdg(75, 11, 20)
        + head(H, spec, true, 26.5, 14, 46, 5.2)
        + title(H, spec, 5, 31, 90, 10.6)
        + where(H, 5.3, 42.6, 90, 1.95)
        + board(H, spec, S, [7.5, 50.2, 55, 17.6], { tp1: 3.9, tp2: 2.9, desc: S.length === 1, times: false, cls: 'bs' })
        + cups(rows, pos, 21, 18.6, false)
        + footer(spec, true, H, 113, 16.4, false);
    } else {
      var pos2 = [[3.5, 47.2], [27.5, 47.2], [51.5, 47.2], [75.5, 47.2], [15.5, 66.2], [39.5, 66.2], [63.5, 66.2]];
      out = scene(100, { seed: 14, aw: 6.5, easel: [4, 33, 96, 46, 47], shelves: [63.6, 82.6] })
        + logo(4, 9.5) + bdg(80, 8.5, 16.5)
        + '<div class="p01-head" style="' + at(24.5, 10, 54) + '"><div class="k" style="font-size:1.35cqw">FOR FAMILIES ACROSS THE PACIFIC</div></div>'
        + title(H, spec, 24.5, 13.6, 53, 6.2)
        + '<div class="p01-head" style="' + at(24.5, 21.2, 54) + '"><div class="mo" style="font-size:3.2cqw;margin:0;display:inline-block;vertical-align:middle">' + H.MONTHS[spec.month - 1] + ' ' + spec.year + '</div> <div class="zm" style="vertical-align:middle;margin-left:1.2cqw;font-size:1.3cqw">LIVE on Zoom</div></div>'
        + where(H, 24.5, 28, 56, 1.45)
        + '<div class="p01-board bs p01-strip" style="' + at(7, 34.3, 86, 10.4) + '">' + S.map(function (s) { return '<div class="tp" style="font-size:' + (S.length > 1 ? 2.3 : 2.9) + 'cqw">' + s.lesson + '</div>'; }).join('<i class="dot">&#8226;</i>')
          + (spec.presenter ? '<div class="pr" style="margin-top:.3cqw;font-size:1.7cqw">Presented by <b>' + H.esc(spec.presenter) + '</b></div>' : '') + '</div>'
        + cups(rows, pos2, 21, 16.6, true)
        + footer(spec, true, H, 86.5, 13.5, true);
    }
    return root + out + '</div>';
  }

  return {
    name: 'PTC: Cozy winter café (cocoa mug, chalk easel, to-go cups)',
    fonts: 'family=Yeseva+One&family=Nunito:wght@600;700;800;900&family=Cabin+Sketch:wght@700&family=Patrick+Hand',
    css: css,
    fn: fn
  };
})(), 'ptc');

/* ---- PTC month 02 ---- */
VEBFlyers.registerTheme(2, (function () {
  /* Parent Talk Café, February: "Latte-art date". A deep wine café wall, a top-down latte with a heart
     poured in the foam on a saucer with a rose-gold spoon, the topic on a latte-beige menu card,
     partner local times on chocolate squares (Hawaiʻi = a white sugar cube). */
  function rng(seed) { var s = seed; return function () { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; }; }
  function f(n) { return (Math.round(n * 100) / 100).toString(); }
  function at(l, t, w, h) { return 'left:' + f(l) + 'cqw;top:' + f(t) + 'cqw' + (w != null ? ';width:' + f(w) + 'cqw' : '') + (h != null ? ';height:' + f(h) + 'cqw' : ''); }
  var DOWF = { Sun: 'Sunday', Mon: 'Monday', Tue: 'Tuesday', Wed: 'Wednesday', Thu: 'Thursday', Fri: 'Friday', Sat: 'Saturday' };

  /* Shared PTC series mark (copied verbatim from ptc-badge-snippet.js) */
  function badge(id, c) {
    var top = 'M16 50 A34 34 0 0 1 84 50', bot = 'M10 50 A40 40 0 0 0 90 50';
    return '<svg viewBox="0 0 100 100" style="width:100%;height:100%;display:block;overflow:visible">'
      + '<defs><path id="' + id + '-t" d="' + top + '"/><path id="' + id + '-b" d="' + bot + '"/></defs>'
      + '<circle cx="50" cy="51.5" r="48" fill="rgba(0,0,0,.18)"/>'
      + '<circle cx="50" cy="50" r="48" fill="' + c.ring + '"/>'
      + '<circle cx="50" cy="50" r="45.2" fill="none" stroke="' + c.ink + '" stroke-width=".7" stroke-dasharray="1.4 1.6" opacity=".7"/>'
      + '<circle cx="50" cy="50" r="30" fill="' + c.face + '"/>'
      + '<circle cx="50" cy="50" r="30" fill="none" stroke="' + c.accent + '" stroke-width="1.4"/>'
      + '<text font-family="Poppins,sans-serif" font-weight="800" font-size="9.4" letter-spacing="1.2" fill="' + c.ink + '" text-anchor="middle"><textPath href="#' + id + '-t" startOffset="50%">PARENT TALK</textPath></text>'
      + '<text font-family="Poppins,sans-serif" font-weight="800" font-size="9.4" letter-spacing="2.4" fill="' + c.ink + '" text-anchor="middle"><textPath href="#' + id + '-b" startOffset="50%">CAFÉ</textPath></text>'
      + '<circle cx="11.5" cy="54" r="1.6" fill="' + c.accent + '"/><circle cx="88.5" cy="54" r="1.6" fill="' + c.accent + '"/>'
      /* steam */
      + '<g fill="none" stroke="' + c.steam + '" stroke-width="2" stroke-linecap="round">'
      + '<path d="M43 44 C40 40 46 37 43 32 C41 29 44 26 43 24"/><path d="M50 43 C47 38 53 35 50 30 C48 27 51 24 50 22"/><path d="M57 44 C54 40 60 37 57 32 C55 29 58 26 57 24"/></g>'
      /* saucer */
      + '<ellipse cx="50" cy="69" rx="19" ry="3.6" fill="' + c.cupDark + '"/><ellipse cx="50" cy="68" rx="19" ry="3.4" fill="' + c.cup + '" stroke="' + c.accent + '" stroke-width=".8"/>'
      /* cup body + handle */
      + '<path d="M64 52 C71 51 72 61 63 63" fill="none" stroke="' + c.cup + '" stroke-width="3.2"/>'
      + '<path d="M35 47 H65 L63 60 C62 66 57 68 50 68 C43 68 38 66 37 60 Z" fill="' + c.cup + '"/>'
      + '<path d="M58 48 L60 48 L58.4 60 C57.8 64 55.6 66 53 66.6 C56 64 57 61 57.3 58Z" fill="' + c.cupDark + '" opacity=".55"/>'
      + '<ellipse cx="50" cy="47" rx="15" ry="2.6" fill="' + c.cupDark + '"/>'
      + '<ellipse cx="50" cy="47.3" rx="12.6" ry="1.8" fill="' + c.coffee + '"/>'
      + '<path d="M40 54 H60" stroke="' + c.accent + '" stroke-width="1.6" stroke-linecap="round"/>'
      + '</svg>';
  }
  var BADGE = { ring: '#6d1a36', face: '#f6e7d8', ink: '#fff3e6', cup: '#ffffff', cupDark: '#d9b8a0', coffee: '#7a4a2c', steam: '#c98a7a', accent: '#d4a07a' };
  function badgeDiv(l, t, s) { return '<div class="p02-badge" style="' + at(l, t, s, s) + '">' + badge('p02-bdg', BADGE) + '</div>'; }

  /* gradients shared by every flyer on the page (bounding-box units so identical defs are interchangeable) */
  var DEFS = '<defs>'
    + '<radialGradient id="p02-wall" cx=".62" cy=".3" r=".9"><stop offset="0" stop-color="#84243f"/><stop offset=".55" stop-color="#651631"/><stop offset="1" stop-color="#430c20"/></radialGradient>'
    + '<radialGradient id="p02-sau" cx=".45" cy=".42" r=".6"><stop offset="0" stop-color="#ffffff"/><stop offset=".62" stop-color="#f8f2eb"/><stop offset=".86" stop-color="#ebe0d4"/><stop offset="1" stop-color="#d8c7b8"/></radialGradient>'
    + '<radialGradient id="p02-cupg" cx=".4" cy=".38" r=".65"><stop offset="0" stop-color="#ffffff"/><stop offset=".7" stop-color="#f6f0e9"/><stop offset="1" stop-color="#dccfc2"/></radialGradient>'
    + '<radialGradient id="p02-cre" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#d7a774"/><stop offset=".5" stop-color="#bb7f4b"/><stop offset=".84" stop-color="#8d5129"/><stop offset="1" stop-color="#5a2f15"/></radialGradient>'
    + '<linearGradient id="p02-rg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f6d2bd"/><stop offset=".45" stop-color="#d79c80"/><stop offset=".7" stop-color="#f1c3aa"/><stop offset="1" stop-color="#b47058"/></linearGradient>'
    + '<linearGradient id="p02-choc" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#7a4a31"/><stop offset="1" stop-color="#4d2817"/></linearGradient>'
    + '<linearGradient id="p02-cube" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#eadfd3"/></linearGradient>'
    + '<filter id="p02-soft" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="1.6"/></filter>'
    + '</defs>';

  var HEART = 'M0 15 C-6 9 -19 1.5 -19 -7.5 C-19 -14.5 -13.5 -19 -7.8 -19 C-3.8 -19 -1.2 -16.8 0 -13.6 C1.2 -16.8 3.8 -19 7.8 -19 C13.5 -19 19 -14.5 19 -7.5 C19 1.5 6 9 0 15Z';

  function bean(x, y, s, rot) {
    return '<g transform="translate(' + f(x) + ' ' + f(y) + ') rotate(' + f(rot) + ') scale(' + f(s) + ')"><ellipse cx="0" cy="0" rx="5" ry="3.5" fill="#3b1f12"/><ellipse cx="-1" cy="-1" rx="3.6" ry="2.2" fill="#5c331d" opacity=".8"/>'
      + '<path d="M-4.2 .3 C-2 -1.4 1.5 1.6 4.2 -.3" stroke="#1f0f08" stroke-width=".7" fill="none" stroke-linecap="round"/></g>';
  }
  /* a top-down latte on a saucer with a rose-gold spoon; saucer radius R */
  function latte(cx, cy, R, rot) {
    var s = '<g transform="translate(' + f(cx) + ' ' + f(cy) + ') scale(' + f(R / 50) + ') rotate(' + f(rot || 0) + ')">'
      + '<circle cx="2.5" cy="4" r="50" fill="rgba(25,3,10,.45)" filter="url(#p02-soft)"/>'
      + '<circle r="50" fill="url(#p02-sau)"/>'
      + '<circle r="47" fill="none" stroke="url(#p02-rg)" stroke-width="1.5"/>'
      + '<circle r="49.4" fill="none" stroke="rgba(90,50,30,.12)" stroke-width=".8"/>'
      + '<circle r="34" fill="none" stroke="rgba(120,85,60,.13)" stroke-width="3"/>'
      /* spoon resting on the saucer */
      + '<g transform="rotate(42)"><path d="M33 3 C33 -2 41 -3 45 1 L63 1.8 L63 4.4 L45 4.4 C41 8 33 8 33 3Z" fill="rgba(60,30,20,.2)"/>'
      + '<ellipse cx="38" cy="0" rx="7.6" ry="4.9" fill="url(#p02-rg)"/><ellipse cx="37.2" cy="-.7" rx="5" ry="2.8" fill="#fbe2d3" opacity=".65"/>'
      + '<path d="M45 -.9 C50 -1.4 56 -1.9 61 -2 C63.2 -2 63.2 2 61 2 C56 1.9 50 1.4 45 .9Z" fill="url(#p02-rg)"/>'
      + '<path d="M47 -.5 L60 -1.1" stroke="#fde8da" stroke-width=".6" opacity=".85"/></g>'
      /* two beans on the saucer */
      + '<g transform="rotate(-112) translate(40 0) rotate(80) scale(.27)"><path d="' + HEART + '" fill="#3f1a10" transform="translate(1.5 2)" opacity=".35"/><path d="' + HEART + '" fill="#5a2a17"/><path d="' + HEART + '" transform="scale(.74)" fill="none" stroke="#7a4128" stroke-width="2"/><path d="M-12 -12 C-9 -15 -5 -15 -3 -12" stroke="#a8694a" stroke-width="2" fill="none" stroke-linecap="round"/></g>'
      /* cup handle */
      + '<g transform="rotate(-24)"><rect x="25" y="-5.2" width="18.5" height="10.4" rx="5.2" fill="rgba(60,30,20,.16)" transform="translate(1.2 1.6)"/>'
      + '<rect x="25" y="-5.2" width="18.5" height="10.4" rx="5.2" fill="url(#p02-cupg)" stroke="rgba(90,60,40,.18)" stroke-width=".5"/>'
      + '<rect x="30.5" y="-1.8" width="9" height="3.6" rx="1.8" fill="#e2d5c8"/></g>'
      /* cup */
      + '<circle cx="1.4" cy="2" r="30.5" fill="rgba(60,30,20,.2)" filter="url(#p02-soft)"/>'
      + '<circle r="30" fill="url(#p02-cupg)" stroke="rgba(90,60,40,.16)" stroke-width=".6"/>'
      + '<circle r="28.3" fill="none" stroke="#ffffff" stroke-width="1.1"/>'
      + '<circle r="26.6" fill="url(#p02-cre)"/>'
      + '<circle r="25" fill="none" stroke="#f3dcc0" stroke-width="2.2" opacity=".28"/>'
      + '<circle cx="-14" cy="15" r=".9" fill="#f6e6d0" opacity=".6"/><circle cx="-11.5" cy="17.5" r=".6" fill="#f6e6d0" opacity=".55"/><circle cx="16" cy="-12" r=".7" fill="#f6e6d0" opacity=".5"/><circle cx="18" cy="9" r=".55" fill="#f6e6d0" opacity=".5"/>'
      /* poured heart, stacked layers and pull-through */
      + '<g transform="rotate(-14) translate(0 1.5)">'
      + '<path d="' + HEART + '" fill="#fbf2e3"/>'
      + '<path d="' + HEART + '" transform="translate(0 -2.2) scale(.78)" fill="none" stroke="#c99a6b" stroke-width=".85" opacity=".55"/>'
      + '<path d="' + HEART + '" transform="translate(0 -4) scale(.56)" fill="none" stroke="#c99a6b" stroke-width="1" opacity=".5"/>'
      + '<path d="' + HEART + '" transform="translate(0 -5.6) scale(.34)" fill="none" stroke="#c99a6b" stroke-width="1.3" opacity=".45"/>'
      + '<path d="M0 -15.5 C.4 -6 -.4 6 0 21" stroke="#a76c3e" stroke-width="1.1" fill="none" stroke-linecap="round"/>'
      + '</g>'
      + '<path d="M-18 -16 A24 24 0 0 1 -4 -24" stroke="#ffffff" stroke-width="1.2" fill="none" opacity=".35" stroke-linecap="round"/>'
      + '<path d="M-26 -10 A28.3 28.3 0 0 1 -12 -25.6" stroke="#ffffff" stroke-width="1.8" fill="none" opacity=".9" stroke-linecap="round"/>'
      + '</g>';
    return s;
  }
  function wall(H, seed, beans) {
    var r = rng(seed), s = '<rect width="100" height="' + f(H) + '" fill="url(#p02-wall)"/>';
    /* faint wallpaper lattice */
    for (var y = -4; y < H + 8; y += 8) for (var x = (Math.round(y / 8) % 2 ? 4 : 0); x < 104; x += 8)
      s += '<path d="M' + f(x) + ' ' + f(y - 1.3) + ' L' + f(x + 1) + ' ' + f(y) + ' L' + f(x) + ' ' + f(y + 1.3) + ' L' + f(x - 1) + ' ' + f(y) + 'Z" fill="#e9b39b" opacity=".07"/>';
    (beans || []).forEach(function (b) { s += bean(b[0], b[1], b[2], b[3] != null ? b[3] : r() * 180); });
    return s;
  }
  function svg(H, inner) { return '<svg class="p02-bg" viewBox="0 0 100 ' + f(H) + '" preserveAspectRatio="none">' + DEFS + inner + '</svg>'; }

  /* chocolate square / sugar cube tile for one zone row */
  function tile(r, l, t, w, h, rot, sq) {
    var home = r.home, sv;
    if (home) {
      sv = '<rect x="2" y="3" width="96" height="94" rx="6" fill="rgba(25,3,10,.35)"/><rect x="0" y="0" width="96" height="94" rx="6" fill="url(#p02-cube)"/>'
        + '<rect x="5" y="5" width="86" height="84" rx="4" fill="none" stroke="#d9a58c" stroke-width="1.6" stroke-dasharray="3 2.5"/>';
      for (var i = 0; i < 26; i++) { var k = (i * 37) % 100; sv += '<rect x="' + f(4 + (k * 0.88)) + '" y="' + f(4 + ((i * 53) % 86)) + '" width="1.4" height="1.4" fill="#d8ccc0" opacity=".7"/>'; }
    } else {
      sv = '<rect x="2" y="3" width="96" height="94" rx="5" fill="rgba(20,3,8,.4)"/><rect x="0" y="0" width="96" height="94" rx="5" fill="url(#p02-choc)"/>'
        + '<path d="M0 5 Q0 0 5 0 H91 Q96 0 96 5 L88 10 H8Z" fill="#8f5a3c" opacity=".8"/><path d="M0 5 L8 10 V84 L0 89Z" fill="#83502f" opacity=".7"/>'
        + '<path d="M96 5 L88 10 V84 L96 89Z" fill="#3a1d10" opacity=".55"/><path d="M8 84 H88 L96 89 Q96 94 91 94 H5 Q0 94 0 89Z" fill="#33190d" opacity=".6"/>'
        + '<rect x="8" y="10" width="80" height="74" rx="2" fill="#5e3420"/>';
    }
    return '<div class="p02-tile' + (home ? ' h' : '') + (sq ? ' ts' : '') + '" style="' + at(l, t, w, h) + ';transform:rotate(' + rot + 'deg)">'
      + '<svg viewBox="0 0 100 100" preserveAspectRatio="none">' + sv + '</svg>'
      + '<div class="tx"><div class="i">' + r.label + '</div><div class="d">' + r.days + '</div><div class="t">' + r.time.replace(' / ', '<br>') + '</div></div></div>';
  }

  function header(H, spec, partner, o) {
    var logo = partner ? '<div class="p02-logo pip' + (o.sq ? ' s' : '') + '" style="' + at(o.lg[0], o.lg[1]) + '"><img src="' + spec.pipUrl + '" alt=""></div>'
      : '<div class="p02-logo' + (o.sq ? ' s' : '') + '" style="' + at(o.lg[0], o.lg[1]) + '"><img src="' + spec.logoUrl + '" alt=""></div>';
    var words = H.esc(spec.series || 'Parent Talk Café').split(' '), last = words.pop(), first = words.join(' ');
    var t = o.ttl, ser = o.oneLine
      ? '<div class="ser" style="font-size:' + f(t[3]) + 'cqw">' + (first ? first + ' ' : '') + '<i>' + last + '</i></div>'
      : '<div class="ser" style="font-size:' + f(t[3]) + 'cqw">' + (first ? first + '<br>' : '') + '<i style="font-size:' + f(t[3] * 1.38) + 'cqw">' + last + '</i></div>';
    return logo
      + '<div class="p02-ttl" style="' + at(t[0], t[1], t[2]) + '"><div class="k" style="font-size:' + f(o.kfs || 1.5) + 'cqw">' + (partner ? 'FOR FAMILIES ACROSS THE PACIFIC' : 'PARENT TRAINING &amp; INFORMATION CENTER') + '</div>' + ser + '</div>'
      + '<div class="p02-mo" style="' + at(o.mo[0], o.mo[1]) + '"><span class="m" style="font-size:' + f(o.mo[2]) + 'cqw">' + H.MONTHS[spec.month - 1] + ' ' + spec.year + '</span><span class="z">on Zoom</span></div>';
  }
  function topicSize(txt, w, max, lines) {
    var n = txt.replace(/&[a-z]+;/g, 'x').length;
    return Math.min(max, (w * lines) / (n * 0.53));
  }
  function presenter(spec, H) { return spec.presenter ? '<div class="pr">Presented by <b>' + H.esc(spec.presenter) + '</b></div>' : ''; }
  function when(s) { return DOWF[s.dow] + ', ' + s.monFull + ' ' + s.day; }

  /* the menu card that holds the topic (the star) */
  function menu(S, spec, H, o) {
    var solo = S.length === 1, inner = o.w - 2 * o.pad, h = '<div class="p02-menu' + (o.cls ? ' ' + o.cls : '') + '" style="' + at(o.l, o.t, o.w) + ';padding:' + f(o.pad * .8) + 'cqw ' + f(o.pad) + 'cqw;transform:rotate(' + o.rot + 'deg)">';
    h += '<div class="lb"><span>' + (solo ? 'ON THE MENU THIS MONTH' : 'ON THE MENU · TWO TALKS') + '</span></div>';
    S.forEach(function (s, i) {
      var fs = topicSize(s.lesson, inner, solo ? o.fs : o.fs2, solo ? (o.lines || 2) : 2);
      h += '<div class="it' + (i ? ' n2' : '') + '"><div class="tp" style="font-size:' + f(fs) + 'cqw">' + s.lesson + '</div>'
        + (s.desc && o.desc !== false ? '<div class="ds">' + s.desc + '</div>' : '')
        + (o.dates ? '<div class="dt"><b>' + when(s) + '</b><span>' + s.time + '</span></div>' : '') + '</div>';
    });
    return h + presenter(spec, H) + '</div>';
  }
  function where(H, l, t, w, fs, center) { return '<div class="p02-where" style="' + at(l, t, w) + ';font-size:' + f(fs) + 'cqw' + (center ? ';text-align:center' : '') + '">' + H.PTC_WHERE + '</div>'; }
  function footer(spec, partner, H, top, h, sq) {
    return '<div class="p02-foot' + (sq ? ' fs' : '') + '" style="top:' + f(top) + 'cqw;height:' + f(h) + 'cqw"><div class="rg"><b>REGISTER at <span>LDAHawaii.org</span></b>Get your Zoom link: scan the QR code<br>or call ' + H.phone(partner) + '</div>'
      + '<div class="p02-qr">' + H.qrImg(spec, partner) + '</div><div class="p02-bd">' + H.badges(spec, partner) + '</div></div>';
  }

  var css = [
    '.p02{container-type:inline-size;aspect-ratio:8.5/11;position:relative;overflow:hidden;border-radius:4px;box-shadow:0 10px 30px rgba(67,12,32,.4);background:#651631;font-family:Jost,Poppins,sans-serif;color:#fbefe3}',
    '.p02.sq{aspect-ratio:1/1}',
    '.p02>div{position:absolute;z-index:2}',
    '.p02 .p02-bg{position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:0}',
    '.p02 .p02-badge{z-index:2;pointer-events:none}',
    '.p02 .p02-logo{width:14cqw;height:14cqw;border-radius:50%;background:#fff;display:flex;align-items:center;justify-content:center;box-shadow:0 0 0 .55cqw #d79c80,0 .6cqw 1.6cqw rgba(30,3,12,.45)}',
    '.p02 .p02-logo img{width:11cqw;height:auto}',
    '.p02 .p02-logo.s{width:12cqw;height:12cqw}.p02 .p02-logo.s img{width:9.4cqw}',
    '.p02 .p02-logo.pip{width:19cqw;height:11.3cqw;border-radius:1.6cqw}.p02 .p02-logo.pip img{width:17cqw}',
    '.p02 .p02-logo.pip.s{width:16cqw;height:9.6cqw;border-radius:1.3cqw}.p02 .p02-logo.pip.s img{width:14.2cqw}',
    '.p02 .p02-ttl .k{font-weight:600;letter-spacing:.3cqw;color:#e8b49b;white-space:nowrap}',
    '.p02 .p02-ttl .ser{font-family:"DM Serif Display",Georgia,serif;line-height:.98;color:#fff6ec;margin-top:1.2cqw;white-space:nowrap}',
    '.p02 .p02-ttl .ser i{color:#f0bfa5;font-style:italic}',
    '.p02 .p02-mo{display:flex;align-items:center;gap:2cqw;white-space:nowrap}',
    '.p02 .p02-mo .m{font-family:"Great Vibes",cursive;color:#f6d2bd;line-height:1.15}',
    '.p02 .p02-mo .z{background:linear-gradient(135deg,#f6d2bd,#d79c80 55%,#c07c62);color:#4a0f24;font-weight:700;font-size:1.6cqw;letter-spacing:.2cqw;padding:.6cqw 2cqw;border-radius:4cqw;text-transform:uppercase}',
    '.p02 .p02-where{font-style:italic;font-weight:500;color:#f2cdb8;line-height:1.3}',
    /* menu card */
    '.p02 .p02-menu{box-sizing:border-box;background:#f3e4cf;color:#4a0f24;border-radius:1cqw;box-shadow:0 0 0 .5cqw #f3e4cf,0 0 0 .75cqw #d79c80,0 1.4cqw 2.6cqw rgba(25,3,10,.5);z-index:3}',
    '.p02 .p02-menu .lb{text-align:center;font-weight:700;font-size:1.3cqw;letter-spacing:.42cqw;color:#a8644b;display:flex;align-items:center;gap:1.4cqw}',
    '.p02 .p02-menu .lb:before,.p02 .p02-menu .lb:after{content:"";flex:1;height:.22cqw;background:#d79c80}',
    '.p02 .p02-menu .it{margin-top:1.1cqw}.p02 .p02-menu .it.n2{border-top:.25cqw dashed #d6b39f;padding-top:1.1cqw}',
    '.p02 .p02-menu .tp{font-family:"DM Serif Display",Georgia,serif;line-height:1.04;color:#5a1029;text-align:center;text-wrap:balance}',
    '.p02 .p02-menu .ds{text-align:center;font-style:italic;font-size:2cqw;color:#7b4a3a;margin-top:.6cqw}',
    '.p02 .p02-menu .dt{display:flex;justify-content:center;flex-wrap:wrap;gap:.3cqw 1.6cqw;margin-top:1cqw;font-size:2cqw;color:#4a0f24}',
    '.p02 .p02-menu .dt b{font-weight:700}.p02 .p02-menu .dt span{font-weight:500;color:#9a5540}',
    '.p02 .p02-menu .pr{margin-top:1.1cqw;text-align:center;font-size:1.85cqw;color:#7b4a3a}.p02 .p02-menu .pr b{color:#5a1029}',
    '.p02 .p02-menu.ms .lb{font-size:1.15cqw}.p02 .p02-menu.ms .ds{font-size:1.7cqw}.p02 .p02-menu.ms .dt{font-size:1.75cqw;margin-top:.7cqw}.p02 .p02-menu.ms .pr{font-size:1.6cqw;margin-top:.8cqw}.p02 .p02-menu.ms .it{margin-top:.8cqw}.p02 .p02-menu.ms .it.n2{padding-top:.8cqw}',
    '.p02 .p02-menu.ml .tp{text-align:left}.p02 .p02-menu.ml .ds{text-align:left}.p02 .p02-menu.ml .dt{justify-content:flex-start;flex-direction:column}.p02 .p02-menu.ml .pr{text-align:left}',
    /* when (HST date plate) */
    '.p02 .p02-hd{font-family:"Great Vibes",cursive;color:#f6d2bd;line-height:1.1;white-space:nowrap}',
    /* chocolate tiles */
    '.p02 .p02-tile svg{position:absolute;inset:0;width:100%;height:100%;pointer-events:none;overflow:visible}',
    '.p02 .p02-tile .tx{position:absolute;left:10%;right:10%;top:12%;bottom:12%;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;color:#fbe9d7}',
    '.p02 .p02-tile .i{font-weight:700;font-size:1.55cqw;line-height:1.1;color:#f6d2bd}',
    '.p02 .p02-tile .d{font-weight:500;font-size:1.3cqw;line-height:1.3}',
    '.p02 .p02-tile .t{font-family:"DM Serif Display",Georgia,serif;font-size:2.35cqw;line-height:1.08;margin-top:.2cqw}',
    '.p02 .p02-tile.h .tx{color:#5a1029}.p02 .p02-tile.h .i{color:#8a4436}',
    '.p02 .p02-tile.ts .i{font-size:1.4cqw}.p02 .p02-tile.ts .d{font-size:1.2cqw}.p02 .p02-tile.ts .t{font-size:2cqw}',
    /* footer */
    '.p02 .p02-foot{left:0;right:0;background:#f3e4cf;color:#4a0f24;display:flex;align-items:center;gap:2.4cqw;padding:0 4.5cqw;box-sizing:border-box;border-top:.9cqw solid #d79c80;box-shadow:0 -.4cqw 0 #f3e4cf inset}',
    '.p02 .p02-foot .rg{flex:1;font-size:1.75cqw;font-weight:500;line-height:1.35;color:#6b3a2e}',
    '.p02 .p02-foot .rg b{display:block;font-family:"DM Serif Display",Georgia,serif;font-weight:400;font-size:3.6cqw;line-height:1.1;margin-bottom:.4cqw;color:#5a1029}',
    '.p02 .p02-foot .rg b span{color:#b0664b;font-style:italic}',
    '.p02 .p02-qr{width:11cqw;height:11cqw;background:#fff;border-radius:.8cqw;padding:.5cqw;box-sizing:border-box;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:2cqw;color:#4a0f24;box-shadow:0 0 0 .3cqw #d79c80}',
    '.p02 .p02-qr img{width:100%;height:100%;display:block}',
    '.p02 .p02-bd{display:flex;flex-direction:column;gap:.6cqw;width:20cqw}',
    '.p02 .p02-bd span{display:block;text-align:center;font-weight:700;font-size:1.3cqw;padding:.55cqw .8cqw;border-radius:5cqw;background:#6d1a36;color:#fbefe3}',
    '.p02 .p02-bd span:nth-child(2){background:linear-gradient(135deg,#f6d2bd,#d79c80);color:#4a0f24}.p02 .p02-bd span:nth-child(3){background:#4a2a1c;color:#fbefe3}',
    '.p02 .p02-foot.fs{gap:2cqw;padding:0 4cqw}.p02 .p02-foot.fs .rg{font-size:1.6cqw}.p02 .p02-foot.fs .rg b{font-size:3.2cqw}.p02 .p02-foot.fs .p02-qr{width:9.8cqw;height:9.8cqw}.p02 .p02-foot.fs .p02-bd{width:18cqw}'
  ].join('\n');

  function fn(spec, partner, sq, H) {
    var S = spec.sessions.map(H.sessInfo), solo = S.length === 1, out;
    var root = '<div class="p02' + (sq ? ' sq' : '') + (partner ? ' partner' : '') + '">';
    if (!partner && !sq) {
      out = svg(129.4, wall(129.4, 11, [[90, 75, .55, 30], [94, 82, .5, 100], [4, 71, .5, 140], [52, 7, .45, 60]]) + latte(71, 40.5, 25, 0))
        + header(H, spec, false, { lg: [5, 4.5], ttl: [5, 22, 40, 7.6], mo: [5, 45.5, 5.8] })
        + badgeDiv(6.5, 54, 20)
        + where(H, 30, 71.6, 64, 2.05)
        + menu(S, spec, H, { l: 6, t: 79, w: 88, pad: 4, rot: -1.2, fs: 6.4, fs2: 4, dates: true })
        + footer(spec, false, H, 113, 16.4, false);
    } else if (!partner && sq) {
      out = svg(100, wall(100, 12, [[97, 30, .4, 80], [3, 72, .4, 140]]) + latte(76, 54, 21.5, 20))
        + header(H, spec, false, { sq: true, lg: [4.5, 4.5], ttl: [20, 5, 56, 5.6], oneLine: true, kfs: 1.3, mo: [20, 13.6, 4.2] })
        + badgeDiv(80, 3, 17)
        + menu(S, spec, H, { l: 5, t: 25.5, w: 48, pad: 3, rot: -1.2, fs: 5, fs2: 3.9, lines: 3, dates: true, desc: solo, cls: 'ms' })
        + where(H, 5, 79.2, 90, 1.8, true)
        + footer(spec, false, H, 84, 16, true);
    } else if (!sq) {
      var rows = H.zoneRows(spec.sessions), tw = 20.5, th = 14.6;
      var pos = [[5, 80.4, -3], [27.4, 81.6, 2], [49.8, 80.2, -1.5], [72.3, 81.4, 3], [16.2, 97.4, 2.5], [38.7, 98.2, -2], [61.2, 97.2, 1.5]];
      out = svg(129.4, wall(129.4, 13, [[90, 61, .5, 40], [3, 54, .45, 120], [96, 108, .5, 10], [4, 104, .45, 70]]) + latte(62, 25.5, 19, 8))
        + header(H, spec, true, { lg: [5, 4.5], ttl: [5, 18.6, 38, 6.4], kfs: 1.35, mo: [5, 39.6, 5.2] })
        + badgeDiv(80, 30.5, 18)
        + menu(S, spec, H, { l: 6, t: 51.2, w: 86, pad: 3.4, rot: -1, fs: 4.2, fs2: 3.3, dates: false, desc: solo, cls: 'ms' })
        + '<div class="p02-hd" style="' + at(5, 74.6, 90) + ';font-size:4cqw;text-align:center">Your local time, sweet and simple</div>'
        + rows.map(function (r, i) { return tile(r, pos[i][0], pos[i][1], tw, th, pos[i][2], false); }).join('')
        + footer(spec, true, H, 114.4, 15, false);
      out = out.replace('</div><div class="p02-hd"', '</div>' + where(H, 5, 47.2, 70, 1.9, false) + '<div class="p02-hd"');
    } else {
      var rws = H.zoneRows(spec.sessions), w2 = 19.5, h2 = 13.6;
      var ps = [[4, 43, -2.5], [25.4, 44.2, 2], [46.8, 42.8, -1.5], [68.2, 44, 2.5], [6, 59, 2], [27.4, 60, -2], [48.8, 58.8, 1.5]];
      out = svg(100, wall(100, 14, [[97, 78, .4, 40]]) + latte(86, 71, 12.4, -10))
        + header(H, spec, true, { sq: true, lg: [4, 4.5], ttl: [22.5, 4.6, 56, 5.4], oneLine: true, kfs: 1.25, mo: [22.5, 13, 3.8] })
        + badgeDiv(80.5, 3, 17)
        + menu(S, spec, H, { l: 5, t: 22.8, w: 90, pad: 2.6, rot: -.8, fs: 3.7, fs2: 3, lines: 1, dates: false, desc: false, cls: 'ms' })
        + rws.map(function (r, i) { return tile(r, ps[i][0], ps[i][1], w2, h2, ps[i][2], true); }).join('')
        + where(H, 4, 76.4, 66, 1.65, false)
        + footer(spec, true, H, 85, 15, true);
    }
    return root + out + '</div>';
  }

  return {
    name: 'Latte-art date (wine café wall, heart latte, chocolate squares)',
    fonts: 'family=DM+Serif+Display:ital@0;1&family=Jost:wght@400;500;600;700',
    css: css,
    fn: fn
  };
})(), 'ptc');

/* ---- PTC month 03 ---- */
VEBFlyers.registerTheme(3, (function () {
  /* Parent Talk Café, March: a matcha tea garden. Cream paper, matcha greens and soft lavender.
     The topic hangs on a painted tea-shop sign from an iron bracket, a glazed teapot pours a stream
     of tea into cups, and on the partner flyer each island's local time is a tea-bag tag on a string. */
  function f(n) { return (Math.round(n * 100) / 100).toString(); }
  function at(l, t, w, h) { return 'left:' + f(l) + 'cqw;top:' + f(t) + 'cqw' + (w != null ? ';width:' + f(w) + 'cqw' : '') + (h != null ? ';height:' + f(h) + 'cqw' : ''); }
  var C = { cream: '#f7f2e3', paper: '#fbf8ee', matcha: '#6f9a3c', deep: '#2f4f1f', tea: '#9cc05a', teaLt: '#c9df8f', lav: '#b8a4dc', lavDk: '#6e5a9e', lavLt: '#e9e1f5', wood: '#8a5a36', iron: '#3a362f' };

  /* Shared PTC series mark (copied verbatim from the series snippet). */
  function badge(id, c) {
    var top = 'M16 50 A34 34 0 0 1 84 50', bot = 'M10 50 A40 40 0 0 0 90 50';
    return '<svg viewBox="0 0 100 100" style="width:100%;height:100%;display:block;overflow:visible">'
      + '<defs><path id="' + id + '-t" d="' + top + '"/><path id="' + id + '-b" d="' + bot + '"/></defs>'
      + '<circle cx="50" cy="51.5" r="48" fill="rgba(0,0,0,.18)"/>'
      + '<circle cx="50" cy="50" r="48" fill="' + c.ring + '"/>'
      + '<circle cx="50" cy="50" r="45.2" fill="none" stroke="' + c.ink + '" stroke-width=".7" stroke-dasharray="1.4 1.6" opacity=".7"/>'
      + '<circle cx="50" cy="50" r="30" fill="' + c.face + '"/>'
      + '<circle cx="50" cy="50" r="30" fill="none" stroke="' + c.accent + '" stroke-width="1.4"/>'
      + '<text font-family="Poppins,sans-serif" font-weight="800" font-size="9.4" letter-spacing="1.2" fill="' + c.ink + '" text-anchor="middle"><textPath href="#' + id + '-t" startOffset="50%">PARENT TALK</textPath></text>'
      + '<text font-family="Poppins,sans-serif" font-weight="800" font-size="9.4" letter-spacing="2.4" fill="' + c.ink + '" text-anchor="middle"><textPath href="#' + id + '-b" startOffset="50%">CAFÉ</textPath></text>'
      + '<circle cx="11.5" cy="54" r="1.6" fill="' + c.accent + '"/><circle cx="88.5" cy="54" r="1.6" fill="' + c.accent + '"/>'
      /* steam */
      + '<g fill="none" stroke="' + c.steam + '" stroke-width="2" stroke-linecap="round">'
      + '<path d="M43 44 C40 40 46 37 43 32 C41 29 44 26 43 24"/><path d="M50 43 C47 38 53 35 50 30 C48 27 51 24 50 22"/><path d="M57 44 C54 40 60 37 57 32 C55 29 58 26 57 24"/></g>'
      /* saucer */
      + '<ellipse cx="50" cy="69" rx="19" ry="3.6" fill="' + c.cupDark + '"/><ellipse cx="50" cy="68" rx="19" ry="3.4" fill="' + c.cup + '" stroke="' + c.accent + '" stroke-width=".8"/>'
      /* cup body + handle */
      + '<path d="M64 52 C71 51 72 61 63 63" fill="none" stroke="' + c.cup + '" stroke-width="3.2"/>'
      + '<path d="M35 47 H65 L63 60 C62 66 57 68 50 68 C43 68 38 66 37 60 Z" fill="' + c.cup + '"/>'
      + '<path d="M58 48 L60 48 L58.4 60 C57.8 64 55.6 66 53 66.6 C56 64 57 61 57.3 58Z" fill="' + c.cupDark + '" opacity=".55"/>'
      + '<ellipse cx="50" cy="47" rx="15" ry="2.6" fill="' + c.cupDark + '"/>'
      + '<ellipse cx="50" cy="47.3" rx="12.6" ry="1.8" fill="' + c.coffee + '"/>'
      + '<path d="M40 54 H60" stroke="' + c.accent + '" stroke-width="1.6" stroke-linecap="round"/>'
      + '</svg>';
  }
  var BADGE = { ring: '#3f6a2a', face: '#f7f2e3', ink: '#fbf6e6', cup: '#ffffff', cupDark: '#d6cbe6', coffee: '#7fa646', steam: '#a48fcf', accent: '#b8a4dc' };

  /* ---- drawn decorations (SVG user units = cqw) ---- */
  function rot(px, py, a) { var r = a * Math.PI / 180; return [px * Math.cos(r) - py * Math.sin(r), px * Math.sin(r) + py * Math.cos(r)]; }
  /* glazed matcha teapot, body centred at x,y; returns [svg, spoutTipX, spoutTipY] */
  function teapot(x, y, s, a) {
    var g = '<g transform="translate(' + f(x) + ' ' + f(y) + ') rotate(' + f(a) + ') scale(' + f(s) + ')">'
      + '<ellipse cx="1" cy="11.6" rx="11" ry="1.6" fill="rgba(47,79,31,.18)"/>'
      + '<path d="M-11.5 -5.5 C-21 -9 -23 8.5 -10.5 7" fill="none" stroke="' + C.lavDk + '" stroke-width="2.8" stroke-linecap="round"/>'
      + '<path d="M-11.5 -5.5 C-21 -9 -23 8.5 -10.5 7" fill="none" stroke="' + C.lav + '" stroke-width="1.2" stroke-linecap="round"/>'
      + '<path d="M10 0 C15 -1 15.5 -7 20.5 -10.5 L22.6 -8.9 C18.6 -5 18.4 4.5 10.5 7 Z" fill="#5a8432"/>'
      + '<ellipse cx="21.6" cy="-9.7" rx="1.5" ry=".8" transform="rotate(-38 21.6 -9.7)" fill="#3f6a2a"/>'
      + '<ellipse cx="0" cy="0" rx="13" ry="10.8" fill="' + C.matcha + '"/>'
      + '<path d="M-13 0 A13 10.8 0 0 0 13 0 A13 7 0 0 1 -13 0Z" fill="#5a8432"/>'
      + '<path d="M-12.6 -2.6 Q0 .6 12.6 -2.6 L12.95 1.2 Q0 4.6 -12.95 1.2Z" fill="' + C.cream + '"/>'
      + [-9, -4.5, 0, 4.5, 9].map(function (dx, i) { var cy = -1 + (Math.abs(dx) < 1 ? 1.6 : Math.abs(dx) < 5 ? 1.3 : .7); return '<circle cx="' + dx + '" cy="' + f(cy) + '" r=".95" fill="' + (i % 2 ? C.matcha : C.lav) + '"/>'; }).join('')
      + '<ellipse cx="-5" cy="-5.6" rx="4" ry="1.8" transform="rotate(-20 -5 -5.6)" fill="#fff" opacity=".28"/>'
      + '<path d="M-7.4 -9.4 Q0 -15.6 7.4 -9.4Z" fill="' + C.lav + '"/><ellipse cx="0" cy="-9.4" rx="8.4" ry="1.5" fill="' + C.lavDk + '"/>'
      + '<circle cx="0" cy="-14.4" r="1.7" fill="' + C.lavDk + '"/>'
      + '<ellipse cx="0" cy="10.4" rx="7.4" ry="1.3" fill="#3f6a2a"/></g>';
    var t = rot(22, -9.6, a);
    return [g, x + t[0] * s, y + t[1] * s];
  }
  /* teacup on saucer; x = centre, y = rim; w = rim width */
  function cup(x, y, w, steam) {
    var h = w * .62, s = '';
    s += '<ellipse cx="' + f(x) + '" cy="' + f(y + h + .3) + '" rx="' + f(w * .8) + '" ry="' + f(w * .13) + '" fill="' + C.lavDk + '"/>'
      + '<ellipse cx="' + f(x) + '" cy="' + f(y + h) + '" rx="' + f(w * .8) + '" ry="' + f(w * .12) + '" fill="' + C.lav + '"/>'
      + '<ellipse cx="' + f(x) + '" cy="' + f(y + h - .1) + '" rx="' + f(w * .42) + '" ry="' + f(w * .06) + '" fill="' + C.lavDk + '" opacity=".35"/>'
      + '<path d="M' + f(x + w * .42) + ' ' + f(y + h * .22) + ' C' + f(x + w * .78) + ' ' + f(y + h * .1) + ' ' + f(x + w * .74) + ' ' + f(y + h * .72) + ' ' + f(x + w * .3) + ' ' + f(y + h * .7) + '" fill="none" stroke="#efe6d2" stroke-width="' + f(w * .085) + '"/>'
      + '<path d="M' + f(x - w / 2) + ' ' + f(y) + ' H' + f(x + w / 2) + ' C' + f(x + w / 2) + ' ' + f(y + h * .75) + ' ' + f(x + w * .3) + ' ' + f(y + h) + ' ' + f(x) + ' ' + f(y + h) + ' C' + f(x - w * .3) + ' ' + f(y + h) + ' ' + f(x - w / 2) + ' ' + f(y + h * .75) + ' ' + f(x - w / 2) + ' ' + f(y) + 'Z" fill="#fffdf6"/>'
      + '<path d="M' + f(x + w * .28) + ' ' + f(y + h * .1) + ' C' + f(x + w * .3) + ' ' + f(y + h * .6) + ' ' + f(x + w * .18) + ' ' + f(y + h * .9) + ' ' + f(x) + ' ' + f(y + h * .97) + ' C' + f(x + w * .3) + ' ' + f(y + h * .98) + ' ' + f(x + w * .47) + ' ' + f(y + h * .6) + ' ' + f(x + w * .49) + ' ' + f(y + h * .1) + 'Z" fill="#e6dcc6" opacity=".7"/>'
      + '<path d="M' + f(x - w * .47) + ' ' + f(y + h * .3) + ' Q' + f(x) + ' ' + f(y + h * .42) + ' ' + f(x + w * .47) + ' ' + f(y + h * .3) + '" stroke="' + C.matcha + '" stroke-width="' + f(w * .05) + '" fill="none"/>'
      + '<ellipse cx="' + f(x) + '" cy="' + f(y) + '" rx="' + f(w / 2) + '" ry="' + f(w * .11) + '" fill="#e9e0cb"/>'
      + '<ellipse cx="' + f(x) + '" cy="' + f(y + .15) + '" rx="' + f(w * .44) + '" ry="' + f(w * .08) + '" fill="' + C.tea + '"/>'
      + '<ellipse cx="' + f(x - w * .1) + '" cy="' + f(y + .05) + '" rx="' + f(w * .16) + '" ry="' + f(w * .03) + '" fill="' + C.teaLt + '"/>';
    if (steam) for (var k = -1; k <= 1; k++) {
      var sx = x + k * w * .22, sy = y - 1.2;
      s += '<path d="M' + f(sx) + ' ' + f(sy) + ' c-1.4 -1.6 1.4 -2.8 0 -4.4 s1.2 -2.6 0 -3.8" stroke="' + C.lav + '" stroke-width=".55" fill="none" stroke-linecap="round" opacity=".85"/>';
    }
    return s;
  }
  /* falling stream from spout tip to the cup */
  function stream(x0, y0, x1, y1) {
    var d = 'M' + f(x0) + ' ' + f(y0) + ' C' + f(x0 + 2.6) + ' ' + f(y0 + 1) + ' ' + f(x1) + ' ' + f(y0 + 4) + ' ' + f(x1) + ' ' + f(y1);
    return '<path d="' + d + '" stroke="' + C.matcha + '" stroke-width="1.1" fill="none" stroke-linecap="round"/>'
      + '<path d="' + d + '" stroke="' + C.teaLt + '" stroke-width=".35" fill="none" stroke-linecap="round" opacity=".9"/>'
      + '<circle cx="' + f(x1 - 1.4) + '" cy="' + f(y1 - .4) + '" r=".35" fill="' + C.tea + '"/><circle cx="' + f(x1 + 1.5) + '" cy="' + f(y1 - .7) + '" r=".3" fill="' + C.tea + '"/>';
  }
  /* sprig of tea leaves (sz ~ length) */
  function sprig(x, y, sz, a, col) {
    var s = '<g transform="translate(' + f(x) + ' ' + f(y) + ') rotate(' + f(a) + ') scale(' + f(sz / 10) + ')"><path d="M0 0 Q1 -5 0 -10" stroke="#5a7a2c" stroke-width=".35" fill="none"/>';
    [[-.2, -2.6, -1], [.4, -4.6, 1], [-.1, -6.6, -1], [.2, -8.4, 1]].forEach(function (p) {
      s += '<path transform="translate(' + p[0] + ' ' + p[1] + ') rotate(' + (p[2] * 52) + ')" d="M0 0 C.9 -1 2.6 -1 3.4 0 C2.6 1 .9 1 0 0Z" fill="' + col + '"/>';
    });
    return s + '<path d="M0 -10 C1 -11.4 -1 -11.4 0 -10Z" fill="' + col + '"/></g>';
  }
  /* lavender stalk */
  function lavender(x, y, len, a) {
    var s = '<g transform="translate(' + f(x) + ' ' + f(y) + ') rotate(' + f(a) + ')"><path d="M0 0 Q.4 ' + f(-len * .5) + ' 0 ' + f(-len) + '" stroke="#7d9a52" stroke-width=".3" fill="none"/>';
    for (var i = 0; i < 9; i++) {
      var yy = -len * .52 - i * len * .055, side = i % 2 ? .45 : -.45;
      s += '<ellipse cx="' + f(side) + '" cy="' + f(yy) + '" rx=".55" ry=".85" fill="' + (i % 3 ? C.lav : '#9a85c7') + '"/>';
    }
    return s + '</g>';
  }
  /* iron wall bracket along y=by from the left edge to x=x1, with chains down to the sign at cTop */
  function bracket(by, x1, chains, cTop) {
    var s = '<rect x="0" y="' + f(by - 3.4) + '" width="1.4" height="9.8" rx=".3" fill="' + C.iron + '"/>'
      + '<path d="M1 ' + f(by) + ' H' + f(x1) + '" stroke="' + C.iron + '" stroke-width=".9" stroke-linecap="round"/>'
      + '<circle cx="' + f(x1 + .6) + '" cy="' + f(by) + '" r=".95" fill="' + C.iron + '"/>'
      + '<path d="M1.2 ' + f(by + 5.8) + ' C7 ' + f(by + 5.6) + ' 12 ' + f(by + 2.6) + ' 18 ' + f(by + .2) + '" stroke="' + C.iron + '" stroke-width=".6" fill="none"/>'
      + '<path d="M9 ' + f(by + 3.6) + ' c-2.6 .2 -3.4 -2.6 -1.4 -3.2 c1.4 -.4 2 1.2 .8 1.6" stroke="' + C.iron + '" stroke-width=".45" fill="none"/>'
      + '<path d="M14 ' + f(by + 1.8) + ' c1.6 -1.4 3.6 -.4 3 1.2 c-.4 1 -1.8 .6 -1.4 -.3" stroke="' + C.iron + '" stroke-width=".45" fill="none"/>';
    chains.forEach(function (cx) {
      s += '<path d="M' + f(cx - .6) + ' ' + f(by + .2) + ' a.6 .6 0 1 0 1.2 0" stroke="' + C.iron + '" stroke-width=".35" fill="none"/>';
      for (var y = by + 1, i = 0; y < cTop - .3; y += 1.25, i++) {
        s += i % 2 ? '<rect x="' + f(cx - .12) + '" y="' + f(y) + '" width=".24" height="1.3" rx=".12" fill="' + C.iron + '"/>'
          : '<ellipse cx="' + f(cx) + '" cy="' + f(y + .65) + '" rx=".42" ry=".72" stroke="' + C.iron + '" stroke-width=".26" fill="none"/>';
      }
    });
    return s;
  }
  /* twine with tea-bag pouches; tags hang below on strings. P = [{x, tagTop}] */
  function twine(y, P) {
    var s = '<path d="M-1 ' + f(y - .6) + ' Q50 ' + f(y + 2.4) + ' 101 ' + f(y - .6) + '" stroke="#a88a60" stroke-width=".42" fill="none"/>';
    P.forEach(function (p, i) {
      var ty = y + .9 - Math.pow((p.x - 50) / 50, 2) * 1.5, px = p.x;
      s += '<path d="M' + f(px) + ' ' + f(ty + 4.8) + ' V' + f(p.tagTop + .6) + '" stroke="#bfae8c" stroke-width=".22"/>'
        + '<path d="M' + f(px - .9) + ' ' + f(ty - .2) + ' q.9 -1.1 1.8 0" stroke="#a88a60" stroke-width=".28" fill="none"/>'
        + '<path d="M' + f(px - 2) + ' ' + f(ty + .6) + ' H' + f(px + 2) + ' L' + f(px + 2.3) + ' ' + f(ty + 4.6) + ' Q' + f(px) + ' ' + f(ty + 5.2) + ' ' + f(px - 2.3) + ' ' + f(ty + 4.6) + 'Z" fill="#efe5cc" stroke="#d8c9a6" stroke-width=".15"/>'
        + '<path d="M' + f(px - 1.8) + ' ' + f(ty + 2.6) + ' Q' + f(px) + ' ' + f(ty + 3.4) + ' ' + f(px + 1.9) + ' ' + f(ty + 2.6) + ' L' + f(px + 2.05) + ' ' + f(ty + 4.4) + ' Q' + f(px) + ' ' + f(ty + 5) + ' ' + f(px - 2.05) + ' ' + f(ty + 4.4) + 'Z" fill="' + (i % 2 ? C.matcha : C.tea) + '" opacity=".8"/>'
        + '<rect x="' + f(px - 2) + '" y="' + f(ty + .3) + '" width="4" height=".7" fill="#d8c9a6"/>';
    });
    return s;
  }

  function scene(Ht, parts) { return '<svg class="p03-bg" viewBox="0 0 100 ' + f(Ht) + '" preserveAspectRatio="none">' + parts + '</svg>'; }
  function paper(Ht) {
    return '<rect width="100" height="' + f(Ht) + '" fill="' + C.cream + '"/>'
      + '<path d="M100 0 V' + f(Ht * .34) + ' C88 ' + f(Ht * .3) + ' 70 ' + f(Ht * .2) + ' 56 0Z" fill="' + C.lavLt + '" opacity=".9"/>'
      + '<path d="M0 ' + f(Ht) + ' V' + f(Ht * .78) + ' C14 ' + f(Ht * .8) + ' 30 ' + f(Ht * .9) + ' 40 ' + f(Ht) + 'Z" fill="#e6efd3" opacity=".8"/>';
  }

  /* ---- text blocks ---- */
  function title(H, spec, partner, l, t, w, fs, mo) {
    return '<div class="p03-ttl" style="' + at(l, t, w) + '"><div class="p03-k">' + (partner ? 'FOR FAMILIES ACROSS THE PACIFIC' : 'PARENT TRAINING &amp; INFORMATION CENTER') + '</div>'
      + '<div class="p03-ser" style="font-size:' + f(fs) + 'cqw">' + H.esc(spec.series || 'Parent Talk Café') + '</div>'
      + '<div class="p03-mo" style="font-size:' + f(mo) + 'cqw">' + H.MONTHS[spec.month - 1] + ' ' + spec.year + '</div></div>';
  }
  function where(H, l, t, w, sq) {
    return '<div class="p03-wh' + (sq ? ' s' : '') + '" style="' + at(l, t, w) + '"><span class="p03-zm">on Zoom</span><span class="p03-fb">' + H.PTC_WHERE + '</span></div>';
  }
  function topicFs(S, solo, base) {
    var L = Math.max.apply(null, S.map(function (s) { return s.lesson.replace(/&[a-z]+;/g, 'x').length; }));
    if (!solo) return base * (L > 30 ? .72 : .8);
    return base * (L <= 18 ? 1.2 : L <= 30 ? 1.05 : .92);
  }
  function sign(H, spec, S, l, t, w, base, opts) {
    var solo = S.length === 1, fs = topicFs(S, solo, base), pres = (spec.presenter || '').trim();
    var body = S.map(function (s, i) {
      return '<div class="p03-tp' + (i ? ' n2' : '') + '"><div class="p03-tt" style="font-size:' + f(fs) + 'cqw">' + (solo ? '' : '<b class="p03-no">' + (i + 1) + '</b>') + s.lesson + '</div>'
        + (s.desc && opts.desc ? '<div class="p03-ds">' + s.desc + '</div>' : '')
        + (opts.when ? '<div class="p03-wn">' + s.dow + '., ' + s.monFull + ' ' + s.day + ' &middot; ' + s.time + '</div>' : '') + '</div>';
    }).join('');
    return '<div class="p03-sign' + (opts.sq ? ' s' : '') + '" style="' + at(l, t, w) + '"><i class="p03-hk a"></i><i class="p03-hk b"></i><div class="p03-pan">'
      + (opts.nolb ? '' : '<div class="p03-lb"><i></i>' + (solo ? 'TODAY&#8217;S TOPIC' : 'THIS MONTH&#8217;S TOPICS') + '<i></i></div>') + body
      + (pres ? '<div class="p03-pr">Presented by <b>' + H.esc(pres) + '</b></div>' : '') + '</div></div>';
  }
  function tickets(S, l, t, w, sq) {
    var solo = S.length === 1;
    return '<div class="p03-tks' + (sq ? ' s' : '') + '" style="' + at(l, t, w) + '">' + S.map(function (s, i) {
      return '<div class="p03-tk"><div class="p03-st"><span>' + s.dow.toUpperCase() + '</span><b>' + s.day + '</b><span>' + s.mon.toUpperCase() + '</span></div>'
        + '<div class="p03-tx">' + (solo ? '' : '<em>Topic ' + (i + 1) + '</em>') + '<b>' + s.time + '</b><span>' + s.monFull + ' ' + s.day + ', ' + s.dow + '.</span></div></div>';
    }).join('') + '</div>';
  }
  function tags(rows, pos, w, h, sq) {
    return rows.map(function (r, i) {
      var p = pos[i];
      return '<div class="p03-tag' + (r.home ? ' h' : '') + (r.time.length > 12 ? ' lg' : '') + (sq ? ' s' : '') + '" style="' + at(p[0], p[1], w, h) + '"><i></i><div class="p03-i">' + r.label + '</div><div class="p03-d">' + r.days + '</div><div class="p03-t">' + r.time + '</div></div>';
    }).join('');
  }
  function footer(H, spec, partner, top, h, sq) {
    return '<div class="p03-foot' + (sq ? ' s' : '') + '" style="top:' + f(top) + 'cqw;height:' + f(h) + 'cqw"><div class="p03-rg"><b>REGISTER at <span>LDAHawaii.org</span></b>Get your Zoom link, scan the QR code,<br>or call ' + H.phone(partner) + '</div>'
      + '<div class="p03-qr">' + H.qrImg(spec, partner) + '</div><div class="p03-bd">' + H.badges(spec, partner) + '</div></div>';
  }
  function badgeDiv(l, t, w) { return '<div class="p03-badge" style="' + at(l, t, w, w) + '">' + badge('p03-bdg', BADGE) + '</div>'; }

  var css = [
    '.p03{container-type:inline-size;aspect-ratio:8.5/11;position:relative;overflow:hidden;border-radius:4px;box-shadow:0 10px 30px rgba(47,79,31,.28);background:#f7f2e3;font-family:Nunito,Poppins,sans-serif;color:#2f4f1f}',
    '.p03.sq{aspect-ratio:1/1}',
    '.p03>div{position:absolute;z-index:2}',
    '.p03 .p03-bg{position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:0}',
    '.p03 .p03-badge{z-index:3}',
    '.p03 .p03-logo{width:14cqw;height:14cqw;border-radius:50%;background:#fff;display:flex;align-items:center;justify-content:center;box-shadow:0 0 0 .6cqw #b8a4dc,0 .5cqw 1.4cqw rgba(47,79,31,.22)}',
    '.p03 .p03-logo img{width:11cqw;height:auto}',
    '.p03 .p03-logo.pip{width:19cqw;height:11.3cqw;border-radius:1.6cqw}.p03 .p03-logo.pip img{width:17cqw}',
    '.p03 .p03-k{font-weight:800;font-size:1.5cqw;letter-spacing:.3cqw;color:#6e5a9e;white-space:nowrap;position:relative;z-index:1}',
    '.p03 .p03-ser{font-family:"DM Serif Display",serif;line-height:1;color:#2f4f1f;margin:1.4cqw 0 .3cqw;white-space:nowrap}',
    '.p03 .p03-mo{font-family:Satisfy,cursive;color:#6f9a3c;line-height:1.15}',
    '.p03 .p03-wh{display:flex;align-items:center;gap:1.6cqw}',
    '.p03 .p03-zm{flex:none;background:#6e5a9e;color:#fbf8ee;font-weight:800;font-size:1.7cqw;letter-spacing:.18cqw;padding:.6cqw 2cqw;border-radius:5cqw}',
    '.p03 .p03-fb{font-weight:700;font-size:1.6cqw;line-height:1.25;color:#2f4f1f}',
    '.p03 .p03-wh.s .p03-zm{font-size:1.55cqw;padding:.5cqw 1.6cqw}.p03 .p03-wh.s .p03-fb{font-size:1.45cqw}',
    /* hanging sign */
    '.p03 .p03-sign{box-sizing:border-box;padding:1.1cqw;border-radius:1.2cqw;background:repeating-linear-gradient(180deg,#8a5a36 0 2.6cqw,#80522f 2.6cqw 2.75cqw,#94643d 2.75cqw 5.2cqw,#80522f 5.2cqw 5.35cqw);box-shadow:0 1.2cqw 2cqw rgba(47,40,20,.32),inset 0 0 0 .25cqw #6a4226;z-index:3}',
    '.p03 .p03-hk{position:absolute;top:-1.1cqw;width:1.5cqw;height:1.5cqw;border:.32cqw solid #3a362f;border-radius:50%;box-sizing:border-box}.p03 .p03-hk.a{left:5.25cqw}.p03 .p03-hk.b{right:5.25cqw}',
    '.p03 .p03-pan{background:#fbf8ee;border-radius:.8cqw;border:.35cqw solid #6f9a3c;box-shadow:inset 0 0 0 .5cqw #fbf8ee,inset 0 0 0 .65cqw #b8a4dc;padding:2cqw 3cqw 2.2cqw;text-align:center}',
    '.p03 .p03-lb{display:flex;align-items:center;justify-content:center;gap:1.2cqw;font-weight:800;font-size:1.35cqw;letter-spacing:.38cqw;color:#6e5a9e}',
    '.p03 .p03-lb i{display:block;width:4cqw;height:.25cqw;background:#b8a4dc;border-radius:1cqw}',
    '.p03 .p03-tp{margin-top:1cqw}.p03 .p03-tp.n2{margin-top:1.4cqw;padding-top:1.2cqw;border-top:.25cqw dashed #c9df8f}',
    '.p03 .p03-no{display:inline-block;vertical-align:.15em;width:1.5em;height:1.5em;line-height:1.5em;border-radius:50%;background:#6f9a3c;color:#fbf8ee;font-family:Nunito,sans-serif;font-size:.5em;font-weight:800;margin-right:.6em;text-align:center}',
    '.p03 .p03-wn{display:inline-block;margin-top:.8cqw;background:#e9e1f5;color:#3f2f6e;font-weight:800;font-size:1.65cqw;padding:.45cqw 1.6cqw;border-radius:5cqw}',
    '.p03 .p03-sign.s .p03-wn{font-size:1.45cqw;margin-top:.6cqw}',
    '.p03 .p03-tt{font-family:"DM Serif Display",serif;line-height:1.05;color:#2f4f1f}',
    '.p03 .p03-ds{font-family:Satisfy,cursive;font-size:2.5cqw;color:#6e5a9e;margin-top:.7cqw;line-height:1.15}',
    '.p03 .p03-pr{margin-top:1.3cqw;font-size:1.75cqw;font-weight:600;color:#2f4f1f;line-height:1.25}.p03 .p03-pr b{font-weight:800;color:#5a8432}',
    '.p03 .p03-sign.s .p03-pan{padding:1.5cqw 2.4cqw 1.6cqw}.p03 .p03-sign.s .p03-pr{font-size:1.6cqw;margin-top:.9cqw}.p03 .p03-sign.s .p03-ds{font-size:2.2cqw}',
    /* tea tickets */
    '.p03 .p03-tks{display:flex;flex-direction:column;gap:1.4cqw}',
    '.p03 .p03-tk{display:flex;align-items:stretch;background:#e9e1f5;border-radius:1cqw;box-shadow:0 .5cqw 1.2cqw rgba(110,90,158,.25);overflow:hidden}',
    '.p03 .p03-st{flex:none;width:9cqw;background:#6f9a3c;color:#fbf8ee;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:.8cqw 0;border-right:.35cqw dashed #fbf8ee}',
    '.p03 .p03-st span{display:block;font-weight:800;font-size:1.3cqw;letter-spacing:.2cqw;line-height:1.3}.p03 .p03-st b{font-family:"DM Serif Display",serif;font-weight:400;font-size:4.2cqw;line-height:1.05;display:block;margin:.35cqw 0 .25cqw}',
    '.p03 .p03-tx{flex:1;padding:1cqw 2.2cqw;display:flex;flex-direction:column;justify-content:center}',
    '.p03 .p03-tx b,.p03 .p03-tx span{display:block}.p03 .p03-tx em{font-style:normal;font-weight:800;font-size:1.2cqw;letter-spacing:.3cqw;color:#6e5a9e;text-transform:uppercase}',
    '.p03 .p03-tx b{font-family:"DM Serif Display",serif;font-weight:400;font-size:3.3cqw;line-height:1.1;color:#2f4f1f}',
    '.p03 .p03-tx span{font-weight:700;font-size:1.65cqw;color:#5a4a86}',
    '.p03 .p03-tks.s{gap:1cqw}.p03 .p03-tks.s .p03-st{width:7.6cqw;padding:.5cqw 0}.p03 .p03-tks.s .p03-st b{font-size:3.4cqw}.p03 .p03-tks.s .p03-tx{padding:.6cqw 1.8cqw}.p03 .p03-tks.s .p03-tx b{font-size:2.7cqw}.p03 .p03-tks.s .p03-tx span{font-size:1.45cqw}',
    /* tea-bag tags */
    '.p03 .p03-tag{box-sizing:border-box;background:#fbf8ee;border:.3cqw solid #6f9a3c;border-radius:.6cqw .6cqw 1.2cqw 1.2cqw;box-shadow:0 .5cqw 1cqw rgba(47,79,31,.22);display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:1.4cqw .8cqw .6cqw}',
    '.p03 .p03-tag>i{position:absolute;left:50%;top:.55cqw;width:1cqw;height:1cqw;margin-left:-.5cqw;border-radius:50%;background:#f7f2e3;box-shadow:inset 0 0 0 .2cqw #bfae8c}',
    '.p03 .p03-tag .p03-i{font-weight:800;font-size:1.6cqw;line-height:1.1;color:#2f4f1f}',
    '.p03 .p03-tag .p03-d{font-weight:600;font-size:1.3cqw;line-height:1.25;color:#5a4a86}',
    '.p03 .p03-tag .p03-t{font-family:"DM Serif Display",serif;font-size:2.35cqw;line-height:1.1;color:#4d7a28}',
    '.p03 .p03-tag.lg .p03-t{font-size:1.75cqw}.p03 .p03-tag.s.lg .p03-t{font-size:1.4cqw;line-height:1.05}.p03 .p03-tag.s.lg .p03-d{font-size:1.05cqw;line-height:1.15}.p03 .p03-tag.s.lg{padding-top:1.4cqw}',
    '.p03 .p03-tag.h{background:#6e5a9e;border-color:#3f2f6e}.p03 .p03-tag.h .p03-i,.p03 .p03-tag.h .p03-t{color:#fbf8ee}.p03 .p03-tag.h .p03-d{color:#e9e1f5}.p03 .p03-tag.h>i{background:#f7f2e3}',
    '.p03 .p03-tag.s{padding:1.2cqw .6cqw .5cqw}.p03 .p03-tag.s .p03-i{font-size:1.4cqw}.p03 .p03-tag.s .p03-d{font-size:1.15cqw}.p03 .p03-tag.s .p03-t{font-size:2cqw}',
    '.p03 .p03-th{font-family:"DM Serif Display",serif;color:#2f4f1f;line-height:1}.p03 .p03-th span{color:#6e5a9e;font-family:Satisfy,cursive}',
    /* footer */
    '.p03 .p03-foot{left:0;right:0;background:#3f6a2a;color:#f7f2e3;display:flex;align-items:center;gap:2.4cqw;padding:0 4.5cqw;box-sizing:border-box;border-top:.8cqw solid #b8a4dc}',
    '.p03 .p03-rg{flex:1;font-size:1.75cqw;font-weight:600;line-height:1.35}',
    '.p03 .p03-rg b{display:block;font-family:"DM Serif Display",serif;font-weight:400;font-size:3.5cqw;line-height:1.1;margin-bottom:.4cqw;color:#fff}',
    '.p03 .p03-rg b span{color:#d9ccef}',
    '.p03 .p03-qr{width:11cqw;height:11cqw;flex:none;background:#fff;border-radius:.8cqw;padding:.5cqw;box-sizing:border-box;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:2cqw;color:#2f4f1f}',
    '.p03 .p03-qr img{width:100%;height:100%;display:block}',
    '.p03 .p03-bd{display:flex;flex-direction:column;gap:.6cqw;width:20cqw}',
    '.p03 .p03-bd span{display:block;text-align:center;font-weight:800;font-size:1.3cqw;padding:.55cqw .8cqw;border-radius:5cqw;background:#f7f2e3;color:#3f6a2a}',
    '.p03 .p03-bd span:nth-child(2){background:#b8a4dc;color:#2a1f4a}.p03 .p03-bd span:nth-child(3){background:#c9df8f;color:#2f4f1f}',
    '.p03 .p03-foot.s{gap:2cqw;padding:0 4cqw}.p03 .p03-foot.s .p03-rg{font-size:1.6cqw}.p03 .p03-foot.s .p03-rg b{font-size:3.1cqw}.p03 .p03-foot.s .p03-qr{width:9.6cqw;height:9.6cqw}'
  ].join('\n');

  function fn(spec, partner, sq, H) {
    var S = spec.sessions.map(H.sessInfo), rows = partner ? H.zoneRows(spec.sessions) : null, solo = S.length === 1;
    var logo = partner ? '<div class="p03-logo pip" style="' + at(5, 4.5) + '"><img src="' + spec.pipUrl + '" alt=""></div>'
      : '<div class="p03-logo" style="' + at(5, 4.5) + '"><img src="' + spec.logoUrl + '" alt=""></div>';
    var root = '<div class="p03' + (sq ? ' sq' : '') + (partner ? ' partner' : '') + '">', out, tp, art;
    if (!partner && !sq) {
      tp = teapot(77.5, 61, .86, 18);
      art = paper(129.4) + sprig(96, 128, 14, -20, '#6f9a3c') + sprig(3, 128, 12, 25, '#7fa646') + lavender(99, 30, 13, -16) + lavender(95, 30.5, 11, -6)
        + bracket(46, 56, [10.5, 50.5], 51) + tp[0] + stream(tp[1], tp[2], 87, 94) + cup(87, 94, 13, false) + cup(69.5, 99, 11, true)
        + sprig(60, 110.5, 8, -70, '#7fa646') + lavender(99, 111, 9, -12);
      out = scene(129.4, art) + logo + badgeDiv(76, 4.5, 20)
        + title(H, spec, false, 5, 21, 66, 8.4, 5.4)
        + where(H, 5, 38.2, 66)
        + sign(H, spec, S, 4.5, 51, 52, 6, { desc: true, when: !solo })
        + (solo ? tickets(S, 6, 91, 48, false) : '')
        + footer(H, spec, false, 112, 17.4, false);
    } else if (!partner && sq) {
      tp = teapot(78, 36, .78, 22);
      art = paper(100) + bracket(28.5, 54.5, [10, 52], 33) + tp[0] + stream(tp[1], tp[2], 91, 64) + cup(91, 64, 10, false) + cup(75, 69, 8.5, true)
        + lavender(99, 86, 9, -14) + lavender(96, 86.4, 7, -5) + sprig(2.5, 85.5, 8, 35, '#7fa646');
      out = scene(100, art) + '<div class="p03-logo" style="' + at(4, 4) + ';width:12cqw;height:12cqw"><img src="' + spec.logoUrl + '" alt="" style="width:9.4cqw"></div>'
        + badgeDiv(79, 3.5, 17.5)
        + title(H, spec, false, 19.5, 4.2, 58, 6.6, 4.2)
        + where(H, 19.5, 21, 60, true)
        + sign(H, spec, S, 4, 33, 54, solo ? 5.2 : 4.6, { desc: false, sq: true, when: !solo, nolb: !solo })
        + (solo ? tickets(S, 6, 70, 50, false) : '')
        + footer(H, spec, false, 87, 13, true);
    } else if (!sq) {
      tp = teapot(81, 53, .72, 18);
      var P = [[3, 85.2], [27, 85.2], [51, 85.2], [75, 85.2], [15, 98.8], [39, 98.8], [63, 98.8]];
      art = paper(129.4) + lavender(99, 30, 12, -16) + lavender(95.4, 30.4, 10, -6)
        + bracket(40.5, 53.5, [10.5, 50.5], 45.5) + tp[0] + stream(tp[1], tp[2], 90, 66) + cup(90, 66, 10, false)
        + twine(78, P.map(function (p) { return { x: p[0] + 11, tagTop: p[1] }; }));
      out = scene(129.4, art) + logo + badgeDiv(76, 3.5, 20)
        + title(H, spec, true, 5, 18, 66, 7.8, 4.6)
        + where(H, 5, 34, 70)
        + sign(H, spec, S, 4.5, 45.5, 52, 5, { desc: true })
        + tags(rows, P, 22, 11.8, false)
        + footer(H, spec, true, 112.6, 16.8, false);
    } else {
      tp = teapot(80, 35, .66, 22);
      var Q = [[3, 62], [27, 62], [51, 62], [75, 62], [15, 75], [39, 75], [63, 75]];
      art = paper(100) + bracket(27.5, 52.5, [10, 50], 31) + tp[0] + stream(tp[1], tp[2], 91, 47.4) + cup(91, 47.4, 8, false)
        + twine(55.4, Q.map(function (p) { return { x: p[0] + 11, tagTop: p[1] }; }));
      out = scene(100, art) + '<div class="p03-logo pip" style="' + at(4, 4) + ';width:17cqw;height:10cqw"><img src="' + spec.pipUrl + '" alt="" style="width:15cqw"></div>'
        + badgeDiv(80, 3.5, 17)
        + title(H, spec, true, 23.5, 3.6, 54, 5.8, 3.6)
        + where(H, 23.5, 18.6, 54, true)
        + sign(H, spec, S, 4, 31, 52, solo ? 4.3 : 3.9, { desc: false, sq: true, nolb: !solo })
        + tags(rows, Q, 22, 10.8, true)
        + footer(H, spec, true, 87.4, 12.6, true);
    }
    return root + out + '</div>';
  }

  return {
    name: 'Matcha tea garden (hanging tea-shop sign, teapot pouring, tea-bag tags)',
    fonts: 'family=DM+Serif+Display&family=Nunito:wght@600;700;800&family=Satisfy',
    css: css,
    fn: fn
  };
})(), 'ptc');

/* ---- PTC month 04 ---- */
VEBFlyers.registerTheme(4, (function () {
  /* Parent Talk Café, April: spring blossom tea party. Blush-pink paper, cherry-blossom branches,
     a white porcelain tiered cake stand with petit fours, cupcakes and macarons on a mint lace tablecloth.
     Partner flyers: the seven local times are macarons stacked on the cake stand (Hawaiʻi on top, raspberry). */
  function rng(seed) { var s = seed; return function () { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; }; }
  function f(n) { return (Math.round(n * 100) / 100).toString(); }
  function at(l, t, w, h) { return 'left:' + f(l) + 'cqw;top:' + f(t) + 'cqw' + (w != null ? ';width:' + f(w) + 'cqw' : '') + (h != null ? ';height:' + f(h) + 'cqw' : ''); }

  /* Shared PTC series mark (verbatim from the shared snippet). */
  function badge(id, c) {
    var top = 'M16 50 A34 34 0 0 1 84 50', bot = 'M10 50 A40 40 0 0 0 90 50';
    return '<svg viewBox="0 0 100 100" style="width:100%;height:100%;display:block;overflow:visible">'
      + '<defs><path id="' + id + '-t" d="' + top + '"/><path id="' + id + '-b" d="' + bot + '"/></defs>'
      + '<circle cx="50" cy="51.5" r="48" fill="rgba(0,0,0,.18)"/>'
      + '<circle cx="50" cy="50" r="48" fill="' + c.ring + '"/>'
      + '<circle cx="50" cy="50" r="45.2" fill="none" stroke="' + c.ink + '" stroke-width=".7" stroke-dasharray="1.4 1.6" opacity=".7"/>'
      + '<circle cx="50" cy="50" r="30" fill="' + c.face + '"/>'
      + '<circle cx="50" cy="50" r="30" fill="none" stroke="' + c.accent + '" stroke-width="1.4"/>'
      + '<text font-family="Poppins,sans-serif" font-weight="800" font-size="9.4" letter-spacing="1.2" fill="' + c.ink + '" text-anchor="middle"><textPath href="#' + id + '-t" startOffset="50%">PARENT TALK</textPath></text>'
      + '<text font-family="Poppins,sans-serif" font-weight="800" font-size="9.4" letter-spacing="2.4" fill="' + c.ink + '" text-anchor="middle"><textPath href="#' + id + '-b" startOffset="50%">CAFÉ</textPath></text>'
      + '<circle cx="11.5" cy="54" r="1.6" fill="' + c.accent + '"/><circle cx="88.5" cy="54" r="1.6" fill="' + c.accent + '"/>'
      /* steam */
      + '<g fill="none" stroke="' + c.steam + '" stroke-width="2" stroke-linecap="round">'
      + '<path d="M43 44 C40 40 46 37 43 32 C41 29 44 26 43 24"/><path d="M50 43 C47 38 53 35 50 30 C48 27 51 24 50 22"/><path d="M57 44 C54 40 60 37 57 32 C55 29 58 26 57 24"/></g>'
      /* saucer */
      + '<ellipse cx="50" cy="69" rx="19" ry="3.6" fill="' + c.cupDark + '"/><ellipse cx="50" cy="68" rx="19" ry="3.4" fill="' + c.cup + '" stroke="' + c.accent + '" stroke-width=".8"/>'
      /* cup body + handle */
      + '<path d="M64 52 C71 51 72 61 63 63" fill="none" stroke="' + c.cup + '" stroke-width="3.2"/>'
      + '<path d="M35 47 H65 L63 60 C62 66 57 68 50 68 C43 68 38 66 37 60 Z" fill="' + c.cup + '"/>'
      + '<path d="M58 48 L60 48 L58.4 60 C57.8 64 55.6 66 53 66.6 C56 64 57 61 57.3 58Z" fill="' + c.cupDark + '" opacity=".55"/>'
      + '<ellipse cx="50" cy="47" rx="15" ry="2.6" fill="' + c.cupDark + '"/>'
      + '<ellipse cx="50" cy="47.3" rx="12.6" ry="1.8" fill="' + c.coffee + '"/>'
      + '<path d="M40 54 H60" stroke="' + c.accent + '" stroke-width="1.6" stroke-linecap="round"/>'
      + '</svg>';
  }
  var BADGE = { ring: '#b0245a', face: '#fde9f0', ink: '#ffffff', cup: '#ffffff', cupDark: '#f0bfd0', coffee: '#7a4a2c', steam: '#6fcaa6', accent: '#5cbf9a' };

  var PINK = '#f7a9c3', PINK2 = '#f28bb0', RASP = '#b0245a', MINT = '#7fd3b4', MINTD = '#2f8f73', GOLD = '#d6a756', BARK = '#6e3f3a';

  /* ---------- drawn decorations (SVG units = cqw) ---------- */
  function blossom(x, y, r, rot, c) {
    var s = '<g transform="translate(' + f(x) + ' ' + f(y) + ') rotate(' + f(rot) + ')">';
    for (var k = 0; k < 5; k++) {
      s += '<path transform="rotate(' + (k * 72) + ')" d="M0 0 C' + f(-r * .55) + ' ' + f(-r * .35) + ' ' + f(-r * .5) + ' ' + f(-r * 1.02) + ' ' + f(-r * .14) + ' ' + f(-r * 1.08) + ' L0 ' + f(-r * .9) + ' L' + f(r * .14) + ' ' + f(-r * 1.08) + ' C' + f(r * .5) + ' ' + f(-r * 1.02) + ' ' + f(r * .55) + ' ' + f(-r * .35) + ' 0 0Z" fill="' + (c || PINK) + '" stroke="' + PINK2 + '" stroke-width="' + f(r * .05) + '"/>';
    }
    s += '<circle r="' + f(r * .24) + '" fill="#e0568a"/>';
    for (k = 0; k < 6; k++) { var a = k * 60 * Math.PI / 180; s += '<circle cx="' + f(Math.cos(a) * r * .42) + '" cy="' + f(Math.sin(a) * r * .42) + '" r="' + f(r * .07) + '" fill="#c2185b"/>'; }
    return s + '</g>';
  }
  function bud(x, y, r, rot) {
    return '<g transform="translate(' + f(x) + ' ' + f(y) + ') rotate(' + f(rot) + ')"><ellipse rx="' + f(r * .55) + '" ry="' + f(r) + '" fill="' + PINK2 + '"/><path d="M0 ' + f(r * .5) + ' L' + f(-r * .5) + ' ' + f(r * 1.2) + ' M0 ' + f(r * .5) + ' L' + f(r * .5) + ' ' + f(r * 1.2) + '" stroke="#6aa86b" stroke-width="' + f(r * .25) + '" stroke-linecap="round"/></g>';
  }
  function petal(x, y, r, rot) {
    return '<path transform="translate(' + f(x) + ' ' + f(y) + ') rotate(' + f(rot) + ')" d="M0 0 C' + f(-r * .6) + ' ' + f(-r * .4) + ' ' + f(-r * .5) + ' ' + f(-r * 1.1) + ' 0 ' + f(-r) + ' C' + f(r * .5) + ' ' + f(-r * 1.1) + ' ' + f(r * .6) + ' ' + f(-r * .4) + ' 0 0Z" fill="' + PINK + '" opacity=".85"/>';
  }
  /* branch: main path d + width, flowers list [x,y,r,rot] */
  function branch(d, w, twigs, flowers, buds) {
    var s = '<path d="' + d + '" stroke="' + BARK + '" stroke-width="' + f(w) + '" fill="none" stroke-linecap="round"/>';
    (twigs || []).forEach(function (t) { s += '<path d="' + t + '" stroke="' + BARK + '" stroke-width="' + f(w * .45) + '" fill="none" stroke-linecap="round"/>'; });
    (buds || []).forEach(function (b) { s += bud(b[0], b[1], b[2], b[3]); });
    (flowers || []).forEach(function (b) { s += blossom(b[0], b[1], b[2], b[3], b[4]); });
    return s;
  }
  /* cake-stand plate with gold rim and scalloped porcelain underside */
  function plate(cx, y, w) {
    var s = '', n = Math.max(6, Math.round(w / 3.2)), step = w / n;
    for (var i = 0; i < n; i++) s += '<circle cx="' + f(cx - w / 2 + step * (i + .5)) + '" cy="' + f(y + .9) + '" r="' + f(step * .5) + '" fill="#fbf3f6" stroke="#ead2db" stroke-width=".15"/>';
    return s + '<ellipse cx="' + f(cx) + '" cy="' + f(y + .5) + '" rx="' + f(w / 2 + .3) + '" ry="1.2" fill="#e3c1cd"/>'
      + '<ellipse cx="' + f(cx) + '" cy="' + f(y) + '" rx="' + f(w / 2 + .3) + '" ry="1.1" fill="#ffffff" stroke="' + GOLD + '" stroke-width=".35"/>';
  }
  function standPole(cx, y0, y1, plates, finial) {
    var s = '<rect x="' + f(cx - .8) + '" y="' + f(y0) + '" width="1.6" height="' + f(y1 - y0) + '" fill="#ffffff" stroke="#e3c1cd" stroke-width=".2"/>';
    plates.forEach(function (p) { s += '<rect x="' + f(cx - 1.3) + '" y="' + f(p - 2) + '" width="2.6" height=".9" rx=".4" fill="' + GOLD + '"/>'; });
    if (finial) s += '<circle cx="' + f(cx) + '" cy="' + f(y0 - .6) + '" r="1.3" fill="' + GOLD + '"/><circle cx="' + f(cx) + '" cy="' + f(y0 - 3.2) + '" r="1.3" stroke="' + GOLD + '" stroke-width=".55" fill="none"/>';
    /* base foot */
    s += '<path d="M' + f(cx - 1.2) + ' ' + f(y1 - 1.2) + ' L' + f(cx - 6) + ' ' + f(y1) + ' H' + f(cx + 6) + ' L' + f(cx + 1.2) + ' ' + f(y1 - 1.2) + 'Z" fill="#ffffff" stroke="#e3c1cd" stroke-width=".2"/>'
      + '<ellipse cx="' + f(cx) + '" cy="' + f(y1) + '" rx="6.4" ry=".9" fill="#ffffff" stroke="' + GOLD + '" stroke-width=".3"/>';
    return s;
  }
  /* small treats sitting with their bottom at y */
  function petitFour(x, y, w, icing) {
    var h = w * .78;
    return '<rect x="' + f(x - w / 2) + '" y="' + f(y - h) + '" width="' + f(w) + '" height="' + f(h) + '" rx="' + f(w * .08) + '" fill="#fff6e6"/>'
      + '<rect x="' + f(x - w / 2) + '" y="' + f(y - h * .52) + '" width="' + f(w) + '" height="' + f(h * .12) + '" fill="#f6c7d6"/>'
      + '<path d="M' + f(x - w / 2) + ' ' + f(y - h) + ' H' + f(x + w / 2) + ' V' + f(y - h * .72) + ' Q' + f(x + w * .38) + ' ' + f(y - h * .55) + ' ' + f(x + w * .25) + ' ' + f(y - h * .72) + ' Q' + f(x + w * .12) + ' ' + f(y - h * .48) + ' ' + f(x) + ' ' + f(y - h * .72) + ' Q' + f(x - w * .15) + ' ' + f(y - h * .58) + ' ' + f(x - w * .28) + ' ' + f(y - h * .72) + ' Q' + f(x - w * .4) + ' ' + f(y - h * .5) + ' ' + f(x - w / 2) + ' ' + f(y - h * .72) + 'Z" fill="' + icing + '"/>'
      + blossom(x, y - h - w * .08, w * .2, 10);
  }
  function cupcake(x, y, w, frost) {
    var h = w * .55, s = '<path d="M' + f(x - w * .42) + ' ' + f(y - h) + ' H' + f(x + w * .42) + ' L' + f(x + w * .32) + ' ' + f(y) + ' H' + f(x - w * .32) + 'Z" fill="#ffffff" stroke="#e8b9c9" stroke-width=".15"/>';
    for (var i = -2; i <= 2; i++) s += '<path d="M' + f(x + i * w * .16) + ' ' + f(y - h) + ' L' + f(x + i * w * .125) + ' ' + f(y) + '" stroke="' + PINK + '" stroke-width="' + f(w * .05) + '"/>';
    s += '<ellipse cx="' + f(x) + '" cy="' + f(y - h - w * .08) + '" rx="' + f(w * .5) + '" ry="' + f(w * .2) + '" fill="' + frost + '"/>'
      + '<ellipse cx="' + f(x) + '" cy="' + f(y - h - w * .28) + '" rx="' + f(w * .36) + '" ry="' + f(w * .17) + '" fill="' + frost + '"/>'
      + '<ellipse cx="' + f(x) + '" cy="' + f(y - h - w * .44) + '" rx="' + f(w * .2) + '" ry="' + f(w * .13) + '" fill="' + frost + '"/>'
      + '<circle cx="' + f(x + w * .04) + '" cy="' + f(y - h - w * .62) + '" r="' + f(w * .1) + '" fill="#d7264f"/>'
      + '<path d="M' + f(x + w * .06) + ' ' + f(y - h - w * .7) + ' q' + f(w * .04) + ' ' + f(-w * .14) + ' ' + f(w * .14) + ' ' + f(-w * .18) + '" stroke="#5a8a3a" stroke-width="' + f(w * .03) + '" fill="none"/>';
    return s;
  }
  function miniMac(x, y, w, c, c2) {
    var h = w * .3;
    return '<ellipse cx="' + f(x) + '" cy="' + f(y - h * .55) + '" rx="' + f(w / 2) + '" ry="' + f(h * .55) + '" fill="' + c2 + '"/>'
      + '<rect x="' + f(x - w * .46) + '" y="' + f(y - h * 1.25) + '" width="' + f(w * .92) + '" height="' + f(h * .4) + '" rx="' + f(h * .2) + '" fill="#fffaf0"/>'
      + '<ellipse cx="' + f(x) + '" cy="' + f(y - h * 1.75) + '" rx="' + f(w / 2) + '" ry="' + f(h * .62) + '" fill="' + c + '"/>';
  }
  function teapot(x, y, s) { /* small white teapot with pink blossoms, bottom at y, width ~ 12*s */
    return '<g transform="translate(' + f(x) + ' ' + f(y) + ') scale(' + f(s) + ')">'
      + '<path d="M4.4 -5.2 C7.4 -5.6 8.2 -8.8 9.4 -9.6" stroke="#e3c1cd" stroke-width="1.5" fill="none" stroke-linecap="round"/>'
      + '<path d="M4.4 -5.2 C7.4 -5.6 8.2 -8.8 9.4 -9.6" stroke="#ffffff" stroke-width="1.1" fill="none" stroke-linecap="round"/>'
      + '<path d="M-4.6 -6.4 C-7.8 -6.8 -7.8 -2.4 -4.4 -2.6" stroke="#e3c1cd" stroke-width="1.4" fill="none"/>'
      + '<path d="M-4.6 -6.4 C-7.8 -6.8 -7.8 -2.4 -4.4 -2.6" stroke="#ffffff" stroke-width="1" fill="none"/>'
      + '<path d="M-5 0 C-6.4 -3.4 -5.4 -7.6 0 -7.8 C5.4 -7.6 6.4 -3.4 5 0Z" fill="#ffffff" stroke="#e3c1cd" stroke-width=".3"/>'
      + '<ellipse cx="0" cy="-7.8" rx="3" ry=".8" fill="' + MINT + '"/><circle cx="0" cy="-8.9" r=".8" fill="' + MINT + '"/>'
      + '<path d="M-5.6 -3.8 H5.6" stroke="' + MINT + '" stroke-width=".45"/>'
      + blossom(-1.6, -5.4, 1.2, 0) + blossom(1.7, -5.8, .9, 30) + '</g>';
  }
  function cakeStand(cx, tiers, base, finial) {
    /* tiers: [{y,w,items:[[type,dx,size,color,color2]]}] */
    var s = standPole(cx, tiers[0].y - (finial ? 4 : 1), base, tiers.map(function (t) { return t.y; }), finial);
    tiers.forEach(function (t) {
      s += plate(cx, t.y, t.w);
      (t.items || []).forEach(function (it) {
        var x = cx + it[1], y = t.y - .4;
        if (it[0] === 'pf') s += petitFour(x, y, it[2], it[3]);
        else if (it[0] === 'cc') s += cupcake(x, y, it[2], it[3]);
        else if (it[0] === 'mm') s += miniMac(x, y, it[2], it[3], it[4]);
      });
    });
    return s;
  }
  /* lace tablecloth: mint cloth with white scalloped lace edge along its top */
  function lace(y) {
    var s = '', r = 1.6;
    for (var x = r; x < 101; x += r * 2) s += '<circle cx="' + f(x) + '" cy="' + f(y + .2) + '" r="' + f(r) + '" fill="#ffffff"/><circle cx="' + f(x) + '" cy="' + f(y + .2) + '" r=".45" fill="' + MINT + '"/>';
    return s + '<rect x="0" y="' + f(y) + '" width="100" height="1.6" fill="#ffffff"/>'
      + '<path d="M0 ' + f(y + .8) + ' H100" stroke="' + MINT + '" stroke-width=".25" stroke-dasharray=".7 .7"/>';
  }
  function petals(r, n, zones) {
    var s = '';
    zones.forEach(function (z) { for (var i = 0; i < n; i++) s += petal(z[0] + r() * (z[2] - z[0]), z[1] + r() * (z[3] - z[1]), .7 + r() * .6, r() * 360); });
    return s;
  }
  function bgSvg(Hh, inner) {
    return '<svg class="p04-bg" viewBox="0 0 100 ' + f(Hh) + '" preserveAspectRatio="none">'
      + '<defs><linearGradient id="p04-g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fde3ec"/><stop offset=".55" stop-color="#fff4f7"/><stop offset="1" stop-color="#f3fbf7"/></linearGradient></defs>'
      + '<rect width="100" height="' + f(Hh) + '" fill="url(#p04-g)"/>' + inner + '</svg>';
  }

  /* ---------- HTML pieces ---------- */
  function logo(spec, partner, l, t, sq) {
    return partner ? '<div class="p04-logo p04-pip' + (sq ? ' p04-s' : '') + '" style="' + at(l, t) + '"><img src="' + spec.pipUrl + '" alt=""></div>'
      : '<div class="p04-logo' + (sq ? ' p04-s' : '') + '" style="' + at(l, t) + '"><img src="' + spec.logoUrl + '" alt=""></div>';
  }
  function head(H, spec, partner, l, t, w, fs) {
    return '<div class="p04-head" style="' + at(l, t, w) + '"><div class="p04-k">' + (partner ? 'FOR FAMILIES ACROSS THE PACIFIC' : 'PARENT TRAINING &amp; INFORMATION CENTER') + '</div>'
      + '<div class="p04-ser" style="font-size:' + f(fs) + 'cqw">' + H.esc(spec.series || 'Parent Talk Café') + '</div>'
      + '<div class="p04-mo" style="font-size:' + f(fs * .5) + 'cqw">' + H.MONTHS[spec.month - 1] + ' ' + spec.year + '<span class="p04-zm">on Zoom</span></div></div>';
  }
  function badgeDiv(l, t, w) { return '<div class="p04-badge" style="' + at(l, t, w, w) + '">' + badge('p04-bdg', BADGE) + '</div>'; }
  function longestWord(s) { return String(s).replace(/&amp;/g, '&').split(/\s+/).reduce(function (m, w) { return Math.max(m, w.length); }, 0); }
  function topicSize(lesson, w, max) { return Math.min(max, w / (longestWord(lesson) * .5)); }
  function presenter(H, spec) { var p = (spec.presenter || '').trim(); return p ? '<div class="p04-pr">Presented by <b>' + H.esc(p) + '</b></div>' : ''; }
  function when(s) { return '<div class="p04-wh"><b>' + s.dow + ', ' + s.monFull + ' ' + s.day + '</b><span>' + s.time + '</span></div>'; }
  function where(H) { return '<div class="p04-fb">' + H.PTC_WHERE + '</div>'; }

  function footer(spec, partner, H, top, h, sq) {
    return '<div class="p04-foot' + (sq ? ' p04-fs' : '') + '" style="top:' + f(top) + 'cqw;height:' + f(h) + 'cqw"><div class="p04-rg"><b>REGISTER at <span>LDAHawaii.org</span></b>Get your Zoom link, scan the QR code,<br>or call ' + H.phone(partner) + '</div>'
      + '<div class="p04-qr">' + H.qrImg(spec, partner) + '</div><div class="p04-bd">' + H.badges(spec, partner) + '</div></div>';
  }

  /* macarons for the partner local-time table */
  var SHELLS = [['#f9c6d6', '#f3b0c6'], ['#bfe8d6', '#a6dcc6'], ['#e2d4f3', '#d3c1ec'], ['#fde7a8', '#f8d987'], ['#ffd2bd', '#fbbea2'], ['#c9ecc4', '#b2e0ab']];
  function macaron(r, i, l, t, w, h, sq) {
    var c = r.home ? ['#c2185b', '#a3134b'] : SHELLS[i % SHELLS.length], long = r.time.length > 9;
    return '<div class="p04-mac' + (r.home ? ' p04-h' : '') + (sq ? ' p04-ms' : '') + '" style="' + at(l, t, w, h) + '">'
      + '<div class="p04-sh" style="background:' + c[0] + ';box-shadow:inset 0 -.5cqw 0 ' + c[1] + '"><div class="p04-i">' + r.label + '</div><div class="p04-d">' + r.days + '</div></div>'
      + '<div class="p04-fi"></div>'
      + '<div class="p04-sb" style="background:' + c[0] + ';box-shadow:inset 0 .45cqw 0 ' + c[1] + '"><div class="p04-t' + (long ? ' p04-lg' : '') + '">' + r.time + '</div></div></div>';
  }
  function order(rows) { /* Hawaiʻi first (top tier), rest keep their order */
    var home = rows.filter(function (r) { return r.home; }), rest = rows.filter(function (r) { return !r.home; });
    return home.concat(rest);
  }

  var css = [
    '.p04{container-type:inline-size;aspect-ratio:8.5/11;position:relative;overflow:hidden;border-radius:4px;box-shadow:0 10px 30px rgba(120,30,70,.25);background:#fff4f7;font-family:Nunito,Poppins,sans-serif;color:#4a1f33}',
    '.p04.sq{aspect-ratio:1/1}',
    '.p04>div{position:absolute;z-index:2}',
    '.p04 .p04-bg{position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:0}',
    '.p04 .p04-logo{width:14cqw;height:14cqw;border-radius:50%;background:#fff;display:flex;align-items:center;justify-content:center;box-shadow:0 0 0 .6cqw ' + MINT + ',0 0 0 1.1cqw #fff,0 .6cqw 1.6cqw rgba(176,36,90,.25)}',
    '.p04 .p04-logo img{width:11cqw;height:auto}',
    '.p04 .p04-logo.p04-s{width:12cqw;height:12cqw}.p04 .p04-logo.p04-s img{width:9.4cqw}',
    '.p04 .p04-logo.p04-pip{width:19cqw;height:11.3cqw;border-radius:1.8cqw}.p04 .p04-logo.p04-pip img{width:17cqw}',
    '.p04 .p04-logo.p04-pip.p04-s{width:16cqw;height:9.6cqw;border-radius:1.5cqw}.p04 .p04-logo.p04-pip.p04-s img{width:14.2cqw}',
    '.p04 .p04-head .p04-k{font-weight:800;font-size:1.45cqw;letter-spacing:.28cqw;color:' + MINTD + ';white-space:nowrap}',
    '.p04 .p04-head .p04-ser{font-family:"Dancing Script",cursive;font-weight:700;line-height:1.02;color:' + RASP + ';margin:.5cqw 0 .3cqw;white-space:nowrap}',
    '.p04 .p04-head .p04-mo{font-family:"DM Serif Display",serif;font-style:italic;color:#4a1f33;line-height:1.1;white-space:nowrap;display:flex;align-items:center;gap:1.6cqw}',
    '.p04 .p04-head .p04-zm{font-family:Nunito,sans-serif;font-style:normal;font-weight:800;font-size:1.55cqw;letter-spacing:.18cqw;background:' + MINTD + ';color:#fff;padding:.5cqw 1.8cqw;border-radius:5cqw;text-transform:uppercase}',
    '.p04.sq .p04-head .p04-k{font-size:1.3cqw;letter-spacing:.22cqw}.p04.sq .p04-head .p04-zm{font-size:1.35cqw;padding:.4cqw 1.5cqw}',
    /* main topic column */
    '.p04 .p04-main{display:flex;flex-direction:column;justify-content:center}.p04 .p04-main>*{flex-shrink:0}',
    '.p04 .p04-main .p04-lb{font-weight:800;font-size:1.45cqw;letter-spacing:.32cqw;color:' + MINTD + ';display:flex;align-items:center;gap:1cqw}',
    '.p04 .p04-main .p04-lb:after{content:"";flex:1;height:.25cqw;background:linear-gradient(90deg,' + MINT + ',transparent)}',
    '.p04 .p04-main .p04-tp{font-family:"DM Serif Display",serif;line-height:1.02;color:#4a1f33;margin:1.2cqw 0 1cqw;letter-spacing:-.02cqw}',
    '.p04 .p04-main .p04-ds{font-family:"Dancing Script",cursive;font-weight:700;font-size:3cqw;color:' + RASP + ';line-height:1.1;margin-bottom:1.2cqw}',
    '.p04 .p04-main .p04-pr{font-size:1.9cqw;color:#6b3a50;margin-bottom:1.4cqw}.p04 .p04-main .p04-pr b{color:#4a1f33;font-weight:800}',
    '.p04 .p04-main .p04-wh{display:inline-flex;flex-direction:column;align-self:flex-start;background:#fff;border:.35cqw solid ' + MINT + ';border-radius:1.4cqw;padding:1cqw 2.2cqw;box-shadow:.6cqw .6cqw 0 ' + PINK + '}',
    '.p04 .p04-main .p04-wh b{font-family:"DM Serif Display",serif;font-weight:400;font-size:3.2cqw;color:' + RASP + ';line-height:1.1}',
    '.p04 .p04-main .p04-wh span{font-weight:800;font-size:2.1cqw;color:' + MINTD + ';letter-spacing:.1cqw}',
    '.p04 .p04-main .p04-fb{margin-top:1.8cqw;font-weight:600;font-style:italic;font-size:1.6cqw;color:#7a4a60}',
    '.p04 .p04-main .p04-ses{margin-bottom:2cqw}.p04 .p04-main .p04-ses .p04-tp{margin:.6cqw 0 .8cqw}.p04 .p04-main .p04-ses .p04-ds{font-size:2.4cqw;margin:.8cqw 0 0}',
    '.p04 .p04-main .p04-ses .p04-wh{padding:.7cqw 1.8cqw}.p04 .p04-main .p04-ses .p04-wh b{font-size:2.5cqw}.p04 .p04-main .p04-ses .p04-wh span{font-size:1.75cqw}',
    '.p04 .p04-main.p04-cen{align-items:center;text-align:center}.p04 .p04-main.p04-cen .p04-lb{width:100%}.p04 .p04-main.p04-cen .p04-lb:before{content:"";flex:1;height:.25cqw;background:linear-gradient(270deg,' + MINT + ',transparent)}',
    '.p04 .p04-main .p04-sub{font-weight:800;font-size:1.5cqw;letter-spacing:.2cqw;color:' + RASP + ';margin-top:1cqw}',
    /* macarons */
    '.p04 .p04-mac{display:flex;flex-direction:column;align-items:center;filter:drop-shadow(0 .5cqw .5cqw rgba(120,30,70,.22));z-index:3}',
    '.p04 .p04-mac .p04-sh{width:100%;height:50%;border-radius:50% 50% 16% 16% / 78% 78% 22% 22%;display:flex;flex-direction:column;align-items:center;justify-content:flex-end;padding-bottom:.7cqw;box-sizing:border-box;text-align:center}',
    '.p04 .p04-mac .p04-fi{width:93%;height:11%;background:#fffaf0;border-radius:1cqw;box-shadow:inset 0 0 0 .15cqw rgba(214,167,86,.35)}',
    '.p04 .p04-mac .p04-sb{width:100%;height:39%;border-radius:16% 16% 50% 50% / 22% 22% 78% 78%;display:flex;align-items:center;justify-content:center;box-sizing:border-box;padding-bottom:.3cqw}',
    '.p04 .p04-mac .p04-i{font-weight:800;font-size:1.75cqw;line-height:1.1;color:#4a1f33;white-space:nowrap}',
    '.p04 .p04-mac .p04-d{font-weight:700;font-size:1.35cqw;line-height:1.2;color:#6b3a50;white-space:nowrap}',
    '.p04 .p04-mac .p04-t{font-family:"DM Serif Display",serif;font-size:2.6cqw;line-height:1;color:#4a1f33;white-space:nowrap}',
    '.p04 .p04-mac .p04-t.p04-lg{font-size:1.9cqw}',
    '.p04 .p04-mac.p04-h .p04-i,.p04 .p04-mac.p04-h .p04-d,.p04 .p04-mac.p04-h .p04-t{color:#fff}',
    '.p04 .p04-mac.p04-h .p04-i{font-size:2.1cqw}.p04 .p04-mac.p04-h .p04-t{font-size:3cqw}.p04 .p04-mac.p04-h .p04-t.p04-lg{font-size:2.2cqw}',
    '.p04 .p04-mac.p04-ms .p04-i{font-size:1.5cqw}.p04 .p04-mac.p04-ms .p04-d{font-size:1.2cqw}.p04 .p04-mac.p04-ms .p04-t{font-size:2.2cqw}.p04 .p04-mac.p04-ms .p04-t.p04-lg{font-size:1.6cqw}.p04 .p04-mac.p04-ms .p04-sh{padding-bottom:.5cqw}',
    '.p04 .p04-mac.p04-ms.p04-h .p04-i{font-size:1.65cqw}',
    '.p04 .p04-lt{font-family:"Dancing Script",cursive;font-weight:700;color:' + RASP + ';line-height:1.05}',
    '.p04 .p04-lt small{display:block;font-family:Nunito,sans-serif;font-weight:800;font-size:1.35cqw;letter-spacing:.22cqw;color:' + MINTD + ';margin-top:.8cqw;line-height:1.3}',
    /* footer on mint tablecloth */
    '.p04 .p04-foot{left:0;right:0;background:' + MINTD + ';color:#effaf5;display:flex;align-items:center;gap:2.4cqw;padding:0 4.5cqw;box-sizing:border-box}',
    '.p04 .p04-foot .p04-rg{flex:1;font-size:1.75cqw;font-weight:600;line-height:1.35}',
    '.p04 .p04-foot .p04-rg b{display:block;font-family:"DM Serif Display",serif;font-weight:400;font-size:3.5cqw;line-height:1.1;margin-bottom:.4cqw;color:#fff}',
    '.p04 .p04-foot .p04-rg b span{color:#ffd1e0;font-style:italic}',
    '.p04 .p04-qr{width:11cqw;height:11cqw;background:#fff;border-radius:.8cqw;padding:.5cqw;box-sizing:border-box;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:2cqw;color:#4a1f33}',
    '.p04 .p04-qr img{width:100%;height:100%;display:block}',
    '.p04 .p04-bd{display:flex;flex-direction:column;gap:.6cqw;width:20cqw}',
    '.p04 .p04-bd span{display:block;text-align:center;font-weight:800;font-size:1.3cqw;padding:.55cqw .8cqw;border-radius:5cqw;background:#fff;color:' + MINTD + '}',
    '.p04 .p04-bd span:nth-child(2){background:' + PINK + ';color:#4a1f33}.p04 .p04-bd span:nth-child(3){background:' + RASP + ';color:#fff}',
    '.p04 .p04-foot.p04-fs{gap:2cqw;padding:0 4cqw}.p04 .p04-foot.p04-fs .p04-rg{font-size:1.6cqw}.p04 .p04-foot.p04-fs .p04-rg b{font-size:3.1cqw}.p04 .p04-foot.p04-fs .p04-qr{width:10cqw;height:10cqw}'
  ].join('\n');

  function sessionsBlock(H, S, w, opts) {
    if (S.length === 1) {
      var s = S[0], fs = topicSize(s.lesson, w, opts.max);
      return '<div class="p04-lb">THIS MONTH’S TOPIC</div><div class="p04-tp" style="font-size:' + f(fs) + 'cqw">' + s.lesson + '</div>'
        + (s.desc && opts.desc ? '<div class="p04-ds">' + s.desc + '</div>' : '') + (opts.pres || '') + (opts.when ? when(s) : '');
    }
    var fs2 = Math.min.apply(null, S.map(function (x) { return topicSize(x.lesson, w, opts.max2); }));
    return '<div class="p04-lb">THIS MONTH’S TOPICS</div>' + S.map(function (x) {
      return '<div class="p04-ses"><div class="p04-tp" style="font-size:' + f(fs2) + 'cqw">' + x.lesson + '</div>' + (opts.when ? when(x) : '') + (x.desc && opts.desc ? '<div class="p04-ds">' + x.desc + '</div>' : '') + '</div>';
    }).join('') + (opts.pres || '');
  }

  function fn(spec, partner, sq, H) {
    var S = spec.sessions.map(H.sessInfo), root = '<div class="p04' + (sq ? ' sq' : '') + (partner ? ' partner' : '') + '">', out, r;
    var pres = presenter(H, spec);
    if (!partner && !sq) {
      r = rng(41);
      out = bgSvg(129.4,
        petals(r, 4, [[60, 40, 98, 46], [2, 104, 58, 110]])
        + branch('M102 44 C92 40 86 32 74 30 C68 29 64 31 60 34', 1.4, ['M86 34 C84 30 85 27 88 25', 'M74 30 C72 27 70 26 67 26'],
          [[96, 38, 2.6, 10], [89, 33.5, 2.2, 40], [80, 31, 2.8, 5], [70, 29, 2.1, 50], [62, 33.5, 1.9, 20], [87.5, 25, 1.8, 0, '#fbd3e0'], [67, 26.5, 1.6, 30, '#fbd3e0']],
          [[93, 43, 1, 30], [76, 34.5, .9, -20], [64.5, 37, .8, 10]])
        + lace(110.5)
        + cakeStand(79, [
          { y: 58, w: 22, items: [['cc', -5, 7, '#ffd1e0'], ['pf', 5, 6.4, PINK]] },
          { y: 78, w: 31, items: [['mm', -10.5, 6.4, '#bfe8d6', '#a6dcc6'], ['pf', -2.4, 6.4, '#fbd3e0'], ['cc', 6.2, 7, MINT], ['mm', 12.6, 4.6, '#f9c6d6', '#f3b0c6']] },
          { y: 98, w: 38, items: [['pf', -13.6, 6.6, MINT], ['mm', -6, 6.4, '#e2d4f3', '#d3c1ec'], ['cc', 2, 7.4, '#ffd1e0'], ['pf', 9.8, 6.4, PINK], ['mm', 15.8, 4.8, '#fde7a8', '#f8d987']] }
        ], 110.5, true))
        + logo(spec, false, 5, 4.5) + head(H, spec, false, 23, 4.6, 50, 7.4) + badgeDiv(75.5, 3.8, 20)
        + '<div class="p04-main" style="' + at(5, 28, 53, 82) + '">' + sessionsBlock(H, S, 53, { max: 8, max2: 5.4, desc: true, when: true, pres: pres }) + where(H) + '</div>'
        + footer(spec, false, H, 112.4, 17, false);
    } else if (!partner && sq) {
      r = rng(42);
      out = bgSvg(100,
        petals(r, 3, [[62, 24, 98, 28]])
        + branch('M102 30 C94 27 88 22 80 22.5 C76 23 73 25 71 27', 1.1, ['M88 24 C87 21.5 88 20.5 90 20'],
          [[96, 27, 2, 10], [86, 23.5, 2.2, 40], [77, 23, 1.8, 0], [71.5, 27, 1.5, 30, '#fbd3e0']], [[90, 20, .8, 20]])
        + lace(81)
        + cakeStand(80.5, [
          { y: 44, w: 17, items: [['cc', -3.8, 5.4, '#ffd1e0'], ['pf', 3.9, 5, PINK]] },
          { y: 60, w: 24, items: [['mm', -8, 5.2, '#bfe8d6', '#a6dcc6'], ['pf', -1.4, 5, '#fbd3e0'], ['cc', 5.6, 5.4, MINT]] },
          { y: 76, w: 30, items: [['pf', -10.4, 5.2, MINT], ['mm', -3.8, 5.2, '#e2d4f3', '#d3c1ec'], ['cc', 2.8, 5.6, '#ffd1e0'], ['mm', 9.8, 4.6, '#fde7a8', '#f8d987']] }
        ], 81, true))
        + logo(spec, false, 4.5, 4.5, true) + head(H, spec, false, 20.5, 4.4, 50, 6.4) + badgeDiv(78.5, 3.2, 17.5)
        + '<div class="p04-main" style="' + at(5, 23.5, 57, 57.5) + '">' + sessionsBlock(H, S, 57, { max: 6.6, max2: 4.8, desc: false, when: true, pres: S.length === 1 ? pres : '' }) + where(H) + '</div>'
        + footer(spec, false, H, 82.6, 17.4, true);
    } else if (!sq) {
      r = rng(43);
      var rows = order(H.zoneRows(spec.sessions)), mw = 26, mh = 13.4;
      out = bgSvg(129.4,
        petals(r, 3, [[70, 52, 96, 62], [3, 100, 8, 108]])
        + branch('M102 44 C96 40 92 34 86 31 C83 29.5 81 30 79 32', 1.1, ['M93 37 C92 34 93 32 95.5 30.5'],
          [[97.5, 40.5, 2.3, 10], [90.5, 34.5, 2.3, 40], [84, 30.6, 2, 5], [79.5, 32.5, 1.5, 30, '#fbd3e0'], [95.5, 30.5, 1.6, 0, '#fbd3e0']], [[88, 37, .9, 20]])
        + lace(110.5)
        + cakeStand(50, [{ y: 67.4, w: 34 }, { y: 85.6, w: 88 }, { y: 103.8, w: 92 }], 110.5, false)
        + teapot(84, 67.2, 1.25))
        + logo(spec, true, 5, 5) + head(H, spec, true, 27, 4.6, 46, 7.2) + badgeDiv(75.5, 3.8, 20)
        + '<div class="p04-main" style="' + at(5, 23.2, 70, 28.6) + '">' + sessionsBlock(H, S, 70, { max: 5.3, max2: 4.6, desc: S.length === 1, when: false, pres: pres }) + where(H) + '</div>'
        + '<div class="p04-lt" style="' + at(5, 55, 27) + ';font-size:4.4cqw">Pour a cup at your local time<small>' + (S.length > 1 ? 'BOTH CHATS' : 'ONE CHAT') + ', SEVEN PLACES</small></div>'
        + macaron(rows[0], 0, 50 - 15, 67.4 - 15, 30, 15, false)
        + [1, 2, 3].map(function (k, j) { return macaron(rows[k], k, 50 - 1.5 * mw - 1.6 + j * (mw + 1.6), 85.6 - mh, mw, mh, false); }).join('')
        + [4, 5, 6].map(function (k, j) { return macaron(rows[k], k, 50 - 1.5 * mw - 1.6 + j * (mw + 1.6), 103.8 - mh, mw, mh, false); }).join('')
        + footer(spec, true, H, 112.4, 17, false);
    } else {
      r = rng(44);
      var rw = H.zoneRows(spec.sessions), w2 = 21.5, h2 = 12;
      out = bgSvg(100,
        petals(r, 2, [[2, 58, 6, 62], [94, 58, 98, 62]])
        + branch('M-2 46 C3 47 8 49 11.5 53', .9, [], [[3, 47, 1.9, 10], [9, 50.5, 1.7, 40], [11.8, 54, 1.2, 0, '#fbd3e0']], [[6, 52.5, .7, 30]])
        + branch('M102 46 C97 47 92 49 88.5 53', .9, [], [[97, 47, 1.9, 20], [91, 50.5, 1.7, 50], [88.2, 54, 1.2, 0, '#fbd3e0']], [[94, 52.5, .7, -30]])
        + lace(79)
        + cakeStand(50, [{ y: 55.6, w: 72 }, { y: 73.4, w: 94 }], 79, false))
        + logo(spec, true, 4.5, 4.5, true) + head(H, spec, true, 23, 4, 52, 6.2) + badgeDiv(78.5, 3.2, 17.5)
        + '<div class="p04-main" style="' + at(5, 20.6, 72, 22) + '">' + sessionsBlock(H, S, 72, { max: 5, max2: 3.6, desc: false, when: false, pres: '' }) + where(H) + '</div>'
        + [0, 1, 2].map(function (k, j) { return macaron(rw[k], k, 50 - 1.5 * w2 - 1.4 + j * (w2 + 1.4), 55.6 - h2, w2, h2, true); }).join('')
        + [3, 4, 5, 6].map(function (k, j) { return macaron(rw[k], k, 50 - 2 * w2 - 2.1 + j * (w2 + 1.4), 73.4 - h2, w2, h2, true); }).join('')
        + footer(spec, true, H, 80.6, 19.4, true);
    }
    return root + out + '</div>';
  }

  return {
    name: 'Spring blossom tea party (cherry blossoms, tiered cake stand, macaron times)',
    fonts: 'family=DM+Serif+Display:ital@0;1&family=Dancing+Script:wght@700&family=Nunito:wght@600;700;800',
    css: css,
    fn: fn
  };
})(), 'ptc');

/* ---- PTC month 05 ---- */
VEBFlyers.registerTheme(5, (function () {
  /* PTC May: "Mother's Day brunch" - a brunch table seen from above (peach linen, sage plates, butter-yellow
     accents): pancake stack, teacup on a saucer, a little vase of daisies. The topic sits on a folded place card,
     the date on a sage-rimmed plate, partner local times on seven brunch plates. Steaming-cup PTC badge top right. */
  var P = 'p05';
  function f(n) { return (Math.round(n * 100) / 100).toString(); }
  function box(cls, x, y, w, h, inner, extra) {
    return '<div class="' + cls + '" style="left:' + f(x) + 'cqw;top:' + f(y) + 'cqw;width:' + f(w) + 'cqw;' + (h != null ? 'height:' + f(h) + 'cqw;' : '') + (extra || '') + '">' + inner + '</div>';
  }
  function fit(t, w, lines, maxF, k) { // font size (cqw) so text t wraps into <= lines in width w
    t = String(t).replace(/&amp;/g, '&').replace(/&[a-z]+;/g, 'x');
    var lw = Math.max.apply(null, t.split(/\s+/).map(function (s) { return s.length; }));
    return Math.min(maxF, w * lines / (t.length * k * 1.18), w / (lw * k * 1.1));
  }
  function rnd(seed) { var s = seed; return function () { s = (s * 9301 + 49297) % 233280; return s / 233280; }; }

  /* recurring series mark: round PARENT TALK CAFE badge with a steaming cup */
  function badge(c, b) {
    return '<svg class="' + P + '-badge" style="left:' + f(b[0]) + 'cqw;top:' + f(b[1]) + 'cqw;width:' + f(b[2]) + 'cqw;height:' + f(b[2]) + 'cqw" viewBox="0 0 100 100"><defs><path id="' + P + 'bt" d="M9 50 A41 41 0 0 1 91 50"/><path id="' + P + 'bb" d="M3.6 50 A46.4 46.4 0 0 0 96.4 50"/></defs>'
      + '<circle cx="50" cy="52" r="48.5" fill="rgba(0,0,0,.12)"/><circle cx="50" cy="50" r="49" fill="' + c.ring + '"/><circle cx="50" cy="50" r="39.5" fill="' + c.face + '"/>'
      + '<circle cx="50" cy="50" r="38" fill="none" stroke="' + c.ring + '" stroke-width=".8" stroke-dasharray="2 1.6"/>'
      + '<text font-family="Nunito,sans-serif" font-size="8.6" font-weight="900" letter-spacing="1.25" fill="' + c.ink + '" text-anchor="middle"><textPath href="#' + P + 'bt" startOffset="50%">PARENT TALK CAFÉ</textPath></text>'
      + '<text font-family="Nunito,sans-serif" font-size="6.2" font-weight="800" letter-spacing="1.4" fill="' + c.ink + '" text-anchor="middle"><textPath href="#' + P + 'bb" startOffset="50%">MONTHLY CHAT</textPath></text>'
      + '<circle cx="6" cy="50" r="1.8" fill="' + c.ink + '"/><circle cx="94" cy="50" r="1.8" fill="' + c.ink + '"/>'
      + '<ellipse cx="50" cy="76" rx="23" ry="4.6" fill="' + c.saucer + '"/><ellipse cx="50" cy="75" rx="15" ry="2.4" fill="rgba(0,0,0,.12)"/>'
      + '<path d="M67 53 q10 -1 9.5 7.5 q-.5 7.5 -12 8" fill="none" stroke="' + c.cup + '" stroke-width="3.4" stroke-linecap="round"/>'
      + '<path d="M30 50 H70 L67 64 Q64.5 75 55 75 H45 Q35.5 75 33 64 Z" fill="' + c.cup + '"/>'
      + '<ellipse cx="50" cy="50" rx="20" ry="3.8" fill="' + c.coffee + '" stroke="' + c.cup + '" stroke-width="1.4"/>'
      + '<path d="M44 60 c0 -3 6 -3 6 0 c0 -3 6 -3 6 0 c0 4 -6 7 -6 8 c0 -1 -6 -4 -6 -8z" fill="' + c.heart + '"/>'
      + ['M41 44 q-4 -5 0 -10 q4 -5 0 -10', 'M50 43 q-4 -5 0 -10 q4 -5 0 -11', 'M59 44 q-4 -5 0 -10 q4 -5 0 -10'].map(function (d) {
        return '<path d="' + d + '" fill="none" stroke="' + c.steam + '" stroke-width="2.6" stroke-linecap="round"/>'; }).join('')
      + '</svg>';
  }

  /* ---- brunch table, seen from above ---- */
  function shadowCircle(cx, cy, r) { return '<circle cx="' + f(cx + r * 0.06) + '" cy="' + f(cy + r * 0.12) + '" r="' + f(r) + '" fill="rgba(120,70,40,.16)"/>'; }
  function plate(cx, cy, r, rim, center) {
    return shadowCircle(cx, cy, r) + '<circle cx="' + f(cx) + '" cy="' + f(cy) + '" r="' + f(r) + '" fill="#fffdf8"/>'
      + '<circle cx="' + f(cx) + '" cy="' + f(cy) + '" r="' + f(r * 0.9) + '" fill="none" stroke="' + rim + '" stroke-width="' + f(r * 0.07) + '"/>'
      + '<circle cx="' + f(cx) + '" cy="' + f(cy) + '" r="' + f(r * 0.78) + '" fill="' + (center || '#fffaf2') + '" stroke="rgba(150,120,90,.18)" stroke-width="' + f(r * 0.02) + '"/>';
  }
  function pancakes(cx, cy, r) {
    var o = plate(cx, cy, r, '#8fb38c');
    var p = r * 0.62;
    o += '<circle cx="' + f(cx + p * 0.1) + '" cy="' + f(cy + p * 0.12) + '" r="' + f(p) + '" fill="#c98642"/>';
    o += '<circle cx="' + f(cx + p * 0.05) + '" cy="' + f(cy + p * 0.06) + '" r="' + f(p) + '" fill="#dc9a52"/>';
    o += '<circle cx="' + f(cx) + '" cy="' + f(cy) + '" r="' + f(p) + '" fill="#eab36a"/><circle cx="' + f(cx) + '" cy="' + f(cy) + '" r="' + f(p * 0.8) + '" fill="#f2c47e"/>';
    o += '<path d="M' + f(cx - p * 0.55) + ' ' + f(cy - p * 0.2) + ' q' + f(p * 0.3) + ' ' + f(-p * 0.5) + ' ' + f(p * 0.75) + ' ' + f(-p * 0.35) + ' q' + f(p * 0.45) + ' ' + f(p * 0.1) + ' ' + f(p * 0.5) + ' ' + f(p * 0.5) + ' q' + f(p * 0.05) + ' ' + f(p * 0.55) + ' ' + f(-p * 0.35) + ' ' + f(p * 0.62) + ' q' + f(-p * 0.55) + ' ' + f(p * 0.05) + ' ' + f(-p * 0.9) + ' ' + f(-p * 0.25) + 'z" fill="#b5651d" opacity=".55"/>';
    o += '<rect x="' + f(cx - p * 0.2) + '" y="' + f(cy - p * 0.22) + '" width="' + f(p * 0.4) + '" height="' + f(p * 0.32) + '" rx="' + f(p * 0.06) + '" fill="#fff0a3" transform="rotate(12 ' + f(cx) + ' ' + f(cy) + ')"/>';
    [[0.78, -0.6], [0.95, 0.15], [0.6, 0.85], [-0.9, 0.6], [-0.65, 0.85]].forEach(function (b, i) {
      var x = cx + b[0] * r * 0.75, y = cy + b[1] * r * 0.72;
      if (i < 3) o += '<circle cx="' + f(x) + '" cy="' + f(y) + '" r="' + f(r * 0.07) + '" fill="#41528f"/><circle cx="' + f(x - r * 0.02) + '" cy="' + f(y - r * 0.02) + '" r="' + f(r * 0.022) + '" fill="#8fa0d8"/>';
      else o += strawberry(x, y, r * 0.14, i * 50);
    });
    return o;
  }
  function strawberry(x, y, s, rot) {
    return '<g transform="translate(' + f(x) + ' ' + f(y) + ') rotate(' + rot + ')"><path d="M0 ' + f(s) + ' C' + f(-s * 1.1) + ' ' + f(s * 0.2) + ' ' + f(-s * 0.9) + ' ' + f(-s * 0.9) + ' 0 ' + f(-s * 0.7) + ' C' + f(s * 0.9) + ' ' + f(-s * 0.9) + ' ' + f(s * 1.1) + ' ' + f(s * 0.2) + ' 0 ' + f(s) + 'Z" fill="#e8605a"/>'
      + '<path d="M' + f(-s * 0.5) + ' ' + f(-s * 0.75) + ' L0 ' + f(-s * 0.45) + ' L' + f(s * 0.5) + ' ' + f(-s * 0.75) + ' L0 ' + f(-s * 1.05) + 'Z" fill="#6f9a5e"/>'
      + '<circle cx="' + f(-s * 0.3) + '" cy="0" r="' + f(s * 0.06) + '" fill="#ffe6a8"/><circle cx="' + f(s * 0.3) + '" cy="' + f(s * 0.1) + '" r="' + f(s * 0.06) + '" fill="#ffe6a8"/><circle cx="0" cy="' + f(s * 0.45) + '" r="' + f(s * 0.06) + '" fill="#ffe6a8"/></g>';
  }
  function teacup(cx, cy, r) {
    var o = shadowCircle(cx, cy, r) + '<circle cx="' + f(cx) + '" cy="' + f(cy) + '" r="' + f(r) + '" fill="#fffdf8"/><circle cx="' + f(cx) + '" cy="' + f(cy) + '" r="' + f(r * 0.88) + '" fill="none" stroke="#f3c9b0" stroke-width="' + f(r * 0.05) + '"/>';
    var c = r * 0.58;
    o += '<rect x="' + f(cx + c * 0.8) + '" y="' + f(cy - c * 0.2) + '" width="' + f(c * 0.65) + '" height="' + f(c * 0.4) + '" rx="' + f(c * 0.2) + '" fill="#fffdf8" stroke="#8fb38c" stroke-width="' + f(r * 0.04) + '"/>';
    o += '<circle cx="' + f(cx + c * 0.06) + '" cy="' + f(cy + c * 0.12) + '" r="' + f(c) + '" fill="rgba(120,70,40,.15)"/><circle cx="' + f(cx) + '" cy="' + f(cy) + '" r="' + f(c) + '" fill="#fffdf8" stroke="#8fb38c" stroke-width="' + f(r * 0.06) + '"/>';
    o += '<circle cx="' + f(cx) + '" cy="' + f(cy) + '" r="' + f(c * 0.8) + '" fill="#c98a4b"/><circle cx="' + f(cx) + '" cy="' + f(cy) + '" r="' + f(c * 0.8) + '" fill="url(#p05tea)"/>';
    o += '<ellipse cx="' + f(cx - c * 0.28) + '" cy="' + f(cy - c * 0.3) + '" rx="' + f(c * 0.24) + '" ry="' + f(c * 0.1) + '" fill="rgba(255,255,255,.45)" transform="rotate(-30 ' + f(cx) + ' ' + f(cy) + ')"/>';
    o += '<g transform="rotate(-35 ' + f(cx) + ' ' + f(cy) + ')"><ellipse cx="' + f(cx) + '" cy="' + f(cy + r * 0.78) + '" rx="' + f(r * 0.08) + '" ry="' + f(r * 0.11) + '" fill="#d7d2c8"/><rect x="' + f(cx - r * 0.025) + '" y="' + f(cy + r * 0.62) + '" width="' + f(r * 0.05) + '" height="' + f(r * 0.06) + '" fill="#d7d2c8"/></g>';
    o += '<g transform="translate(' + f(cx - r * 1.05) + ' ' + f(cy + r * 0.45) + ') rotate(-12)"><rect x="0" y="0" width="' + f(r * 0.32) + '" height="' + f(r * 0.32) + '" fill="#f7e08a" stroke="#d9b94a" stroke-width="' + f(r * 0.02) + '"/><path d="M' + f(r * 0.16) + ' 0 L' + f(r * 0.4) + ' ' + f(-r * 0.32) + '" stroke="#c9b59a" stroke-width="' + f(r * 0.02) + '"/></g>';
    return o;
  }
  function daisy(x, y, s, rot) {
    var o = '<g transform="translate(' + f(x) + ' ' + f(y) + ') rotate(' + rot + ')">';
    for (var i = 0; i < 10; i++) o += '<ellipse cx="0" cy="' + f(-s * 0.55) + '" rx="' + f(s * 0.18) + '" ry="' + f(s * 0.45) + '" fill="#fffef8" stroke="#eadfcf" stroke-width="' + f(s * 0.03) + '" transform="rotate(' + (i * 36) + ')"/>';
    return o + '<circle r="' + f(s * 0.3) + '" fill="#f6cf45"/></g>';
  }
  function rose(x, y, s) {
    return '<g transform="translate(' + f(x) + ' ' + f(y) + ')"><circle r="' + f(s) + '" fill="#f4a989"/><path d="M' + f(-s * 0.6) + ' 0 a' + f(s * 0.6) + ' ' + f(s * 0.6) + ' 0 1 1 ' + f(s * 0.6) + ' ' + f(s * 0.6) + ' a' + f(s * 0.4) + ' ' + f(s * 0.4) + ' 0 1 1 ' + f(-s * 0.3) + ' ' + f(-s * 0.7) + ' a' + f(s * 0.2) + ' ' + f(s * 0.2) + ' 0 1 1 ' + f(s * 0.25) + ' ' + f(s * 0.3) + '" fill="none" stroke="#e07e60" stroke-width="' + f(s * 0.12) + '" stroke-linecap="round"/></g>';
  }
  function leaf(x, y, len, ang, c) {
    return '<g transform="translate(' + f(x) + ' ' + f(y) + ') rotate(' + f(ang) + ')"><path d="M0 0 Q' + f(len * 0.5) + ' ' + f(-len * 0.34) + ' ' + f(len) + ' 0 Q' + f(len * 0.5) + ' ' + f(len * 0.34) + ' 0 0Z" fill="' + c + '"/><path d="M' + f(len * 0.1) + ' 0 L' + f(len * 0.85) + ' 0" stroke="rgba(255,255,255,.35)" stroke-width="' + f(len * 0.03) + '"/></g>';
  }
  function vase(cx, cy, r) {
    var o = shadowCircle(cx, cy, r * 0.62) + '<circle cx="' + f(cx) + '" cy="' + f(cy) + '" r="' + f(r * 0.6) + '" fill="#9cc2b4"/><circle cx="' + f(cx) + '" cy="' + f(cy) + '" r="' + f(r * 0.4) + '" fill="#6f9a8a"/>';
    [20, 95, 160, 230, 300].forEach(function (a) { o += leaf(cx, cy, r * 1.05, a, a % 2 ? '#7fa57c' : '#93b98f'); });
    o += daisy(cx - r * 0.42, cy - r * 0.28, r * 0.42, 10) + daisy(cx + r * 0.45, cy - r * 0.05, r * 0.38, 30) + daisy(cx - r * 0.05, cy + r * 0.45, r * 0.4, 0);
    o += rose(cx + r * 0.08, cy - r * 0.5, r * 0.22) + rose(cx - r * 0.5, cy + r * 0.3, r * 0.18);
    return o;
  }
  function cutlery(x, y, len, rot) {
    var w = len * 0.06;
    return '<g transform="translate(' + f(x) + ' ' + f(y) + ') rotate(' + rot + ')" fill="#cfc9be">'
      + '<rect x="' + f(-w / 2) + '" y="0" width="' + f(w) + '" height="' + f(len * 0.62) + '" rx="' + f(w / 2) + '"/><path d="M' + f(-w * 1.4) + ' ' + f(len * 0.62) + ' h' + f(w * 2.8) + ' v' + f(len * 0.16) + ' q0 ' + f(len * 0.07) + ' ' + f(-w * 1.4) + ' ' + f(len * 0.07) + ' q' + f(-w * 1.4) + ' 0 ' + f(-w * 1.4) + ' ' + f(-len * 0.07) + 'z"/>'
      + [-1, -0.33, 0.33, 1].map(function (k) { return '<rect x="' + f(k * w * 1.1 - w * 0.18) + '" y="' + f(len * 0.78) + '" width="' + f(w * 0.36) + '" height="' + f(len * 0.22) + '" rx="' + f(w * 0.18) + '"/>'; }).join('') + '</g>';
  }
  function petalScatter(R, x0, x1, y0, y1, n, avoid) {
    var o = '';
    for (var i = 0; i < n; i++) {
      var x = x0 + R() * (x1 - x0), y = y0 + R() * (y1 - y0), a = R() * 360;
      if (avoid && avoid(x, y)) continue;
      o += '<ellipse cx="' + f(x) + '" cy="' + f(y) + '" rx=".7" ry="1.2" fill="' + (i % 3 ? '#f7b9a0' : '#f7e08a') + '" transform="rotate(' + f(a) + ' ' + f(x) + ' ' + f(y) + ')" opacity=".85"/>';
    }
    return o;
  }

  var BADGE = { ring: '#7fa57c', face: '#fff6e6', ink: '#fffdf6', cup: '#f2a07f', coffee: '#9a5b34', saucer: '#f7e08a', heart: '#fff6e6', steam: '#a9c7a5' };

  /* layout per variant: logo [x,y,w,h], badge [x,y,size], title [x,y,w,fs], card [x,y,w,h], plates [[cx,cy,r]...], foot y */
  var L = {
    lh: { H: 129.41, logo: [4.5, 4.5, 15, 15], badge: [77.5, 3, 19.5], kick: [22, 5.6, 54, 1.4], title: [21, 9.2, 56, 8.6], mon: [21, 28.4, 56, 5],
      card: [11, 38.5, 78, 33, -1.5], plates1: [[50, 89, 15.5]], plates2: [[31, 89, 14], [69, 89, 14]],
      deco1: { pan: [16, 90, 12.5], cup: [84, 88.5, 10.5], vase: [91.5, 34, 7] }, deco2: { pan: [4, 92, 9], cup: [96, 81, 8], vase: [91.5, 34, 7] },
      where: [5, 104.3, 90, 1.75], foot: 108.6 },
    lp: { H: 129.41, logo: [4, 4.5, 22, 13], badge: [78, 3, 18.5], kick: [28, 5.4, 48, 1.3], title: [28, 8.6, 48, 7.4], mon: [28, 25.4, 48, 4.4],
      card: [9, 33.4, 82, 25.6, -1.2], head: [5, 61.6, 90, 4.4],
      zp: [[13.5, 76.4], [37.8, 76.4], [62.2, 76.4], [86.5, 76.4], [25.6, 93.6], [50, 93.6], [74.4, 93.6]], zr: 11.1,
      deco: { vase: [5, 64, 5.2], cup: [95, 63.5, 5] },
      where: [5, 106.6, 90, 1.7], foot: 111.4 },
    sh: { H: 100, logo: [3.5, 3.5, 11.5, 11.5], badge: [81, 2.5, 16.5], kick: [17, 4.4, 40, 1.15], title: [4, 17.5, 43, 7], mon: [4, 34, 43, 4],
      card: [48.5, 20.5, 47.5, 38, 1.5], plates1: [[25, 56.5, 13]], plates2: [[13.5, 56.5, 11.4], [38, 56.5, 11.4]],
      deco1: { pan: [44, 69.5, 6.2], cup: [88, 68.5, 6.5], vase: [66, 69.5, 5.5] }, deco2: { pan: [58, 69.5, 6], cup: [89, 68.5, 6], vase: [74.5, 69.5, 5] },
      where: [3, 77.6, 94, 1.45], foot: 83.4 },
    sp: { H: 100, logo: [3.5, 3.5, 18, 10.6], badge: [81, 2.5, 16.5], kick: [24, 5.2, 54, 1.15], title: [24, 8.4, 54, 5.6], mon: [24, 21.2, 54, 3.4],
      card: [5, 27.4, 90, 16.4, -0.8],
      zp: [[13, 55.2], [37.7, 55.2], [62.3, 55.2], [87, 55.2], [25.3, 69.6], [50, 69.6], [74.7, 69.6]], zr: 8.9,
      deco: {}, where: [3, 79.2, 94, 1.45], foot: 83.8 }
  };

  var css = [
    '.p05{container-type:inline-size;aspect-ratio:8.5/11;position:relative;overflow:hidden;border-radius:4px;box-shadow:0 10px 30px rgba(120,70,40,.2);background:#fde4d3;font-family:Nunito,Poppins,sans-serif;color:#3e5a45}',
    '.p05.sq{aspect-ratio:1/1}',
    '.p05>svg.p05-bg{position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:1}',
    '.p05>div,.p05>svg.p05-badge{position:absolute;z-index:3}',
    '.p05 .p05-logo{background:#fff;border-radius:50%;display:grid;place-items:center;box-shadow:0 0 0 .6cqw #a9c7a5,0 .8cqw 1.6cqw rgba(120,70,40,.18)}',
    '.p05 .p05-logo img{width:78%}.p05 .p05-logo.p05-pip{border-radius:2cqw}.p05 .p05-logo.p05-pip img{width:90%}',
    '.p05 .p05-k{text-align:center;font-weight:800;letter-spacing:.16em;color:#6f9a6c;line-height:1.3}',
    '.p05 .p05-t{text-align:center;font-family:Lora,Georgia,serif;font-weight:700;line-height:1;color:#3e5a45}',
    '.p05 .p05-t span{display:block;font-family:Satisfy,cursive;font-weight:400;color:#e07e60;font-size:1.22em;line-height:1.05;margin-top:.02em}',
    '.p05 .p05-m{display:flex;justify-content:center;align-items:center;gap:.5em;line-height:1}',
    '.p05 .p05-m b{font-family:Lora,serif;font-style:italic;font-weight:700;color:#3e5a45}',
    '.p05 .p05-m i{font-style:normal;font-weight:900;font-size:.36em;letter-spacing:.18em;background:#7fa57c;color:#fff;border-radius:2em;padding:.5em 1em .45em}',
    '.p05 .p05-card{display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;border-radius:1.2cqw;padding:0 4cqw;box-sizing:border-box;',
    'background:linear-gradient(180deg,#fffdf8 0%,#fffdf8 17%,#efe6d8 17.4%,#fffaf2 18.6%,#fffdf8 100%);box-shadow:0 1cqw 2cqw rgba(120,70,40,.2),inset 0 0 0 .35cqw #fff,inset 0 0 0 .55cqw #e9c7a8}',
    '.p05 .p05-lb{font-weight:900;letter-spacing:.2em;color:#e07e60;line-height:1;position:absolute;top:0;left:0;right:0;display:flex;align-items:center;justify-content:center;gap:.8em}',
    '.p05 .p05-lb:before,.p05 .p05-lb:after{content:"";width:3em;height:.15em;background:#f3c3a8;border-radius:1em}',
    '.p05 .p05-tp{font-family:Lora,Georgia,serif;font-weight:700;line-height:1.08;color:#3e5a45}',
    '.p05 .p05-tp em{font-style:normal;font-family:Nunito,sans-serif;font-weight:900;color:#fff;background:#e07e60;border-radius:50%;display:inline-grid;place-items:center;width:1.15em;height:1.15em;font-size:.62em;vertical-align:.25em;margin-right:.35em}',
    '.p05 .p05-ds{font-family:Lora,serif;font-style:italic;font-weight:600;color:#8a6b55;line-height:1.2;margin-top:.45em}',
    '.p05 .p05-pr{font-weight:800;color:#5f7f62;line-height:1.2;margin-top:.7em;background:#eef4e8;border-radius:2em;padding:.35em 1.1em}',
    '.p05 .p05-pr b{font-weight:900;color:#3e5a45}',
    '.p05 .p05-gap{height:.9em}',
    '.p05 .p05-dt{display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;line-height:1}',
    '.p05 .p05-dt .w{font-weight:900;letter-spacing:.24em;color:#7fa57c}',
    '.p05 .p05-dt .d{font-family:Lora,serif;font-weight:700;color:#3e5a45;margin:.12em 0 .14em}',
    '.p05 .p05-dt .t{font-weight:900;color:#e07e60;letter-spacing:.02em}',
    '.p05 .p05-dt .n{font-weight:900;color:#fff;background:#7fa57c;border-radius:2em;padding:.25em .8em;letter-spacing:.12em;margin-bottom:.4em}',
    '.p05 .p05-h{text-align:center;font-family:Satisfy,cursive;color:#e07e60;line-height:1}',
    '.p05 .p05-z{display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;line-height:1.08}',
    '.p05 .p05-z .i{font-weight:900;color:#3e5a45}.p05 .p05-z .y{font-weight:700;color:#8a6b55;margin:.25em 0 .2em}',
    '.p05 .p05-z .tm{font-family:Lora,serif;font-weight:700;color:#d0694b}',
    '.p05 .p05-w{text-align:center;font-weight:800;font-style:italic;color:#8a6b55;line-height:1.2}',
    '.p05 .p05-w b{color:#5f7f62}',
    '.p05 .p05-f{display:flex;align-items:center;gap:2.4cqw;color:#fff}',
    '.p05 .p05-rg{flex:1;line-height:1.3;font-weight:700;color:#f2f7ee}',
    '.p05 .p05-rg b{display:block;font-weight:900;color:#fff;line-height:1.1;margin-bottom:.25em}.p05 .p05-rg b i{font-style:normal;color:#fbe38b}',
    '.p05 .p05-qr{background:#fff;border-radius:1cqw;padding:.7cqw;box-sizing:border-box;display:grid;place-items:center;flex:none}',
    '.p05 .p05-qr img{width:100%;height:100%;display:block}.p05 .p05-qr span{color:#3e5a45;font-weight:900;font-size:2.4cqw}',
    '.p05 .p05-bd{display:flex;flex-direction:column;gap:.6cqw;flex:none}',
    '.p05 .p05-bd span{background:#fffaf0;color:#3e5a45;border-radius:2cqw;padding:.45em 1.1em;font-weight:800;text-align:center;white-space:nowrap}'
  ].join('\n');

  function fn(spec, partner, sq, H) {
    var V = L[(sq ? 's' : 'l') + (partner ? 'p' : 'h')], S = spec.sessions.map(H.sessInfo), n = S.length;
    var R = rnd(spec.month * 31 + (sq ? 7 : 0) + (partner ? 3 : 0) + n);
    var svg = '<defs><radialGradient id="p05tea" cx=".4" cy=".35" r=".7"><stop offset="0" stop-color="#e2a86b"/><stop offset="1" stop-color="#9a5b34"/></radialGradient>'
      + '<pattern id="p05lin" width="6" height="6" patternUnits="userSpaceOnUse"><rect width="6" height="6" fill="#fde4d3"/><path d="M0 3 H6 M3 0 V6" stroke="#fcdac6" stroke-width="1.5"/><circle cx="3" cy="3" r=".9" fill="#fff1e6"/></pattern>'
      + '<linearGradient id="p05ft" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7fa57c"/><stop offset="1" stop-color="#5f8a5f"/></linearGradient></defs>';
    svg += '<rect width="100" height="' + V.H + '" fill="url(#p05lin)"/>';
    // soft sage runner under the place card
    var c = V.card;
    svg += '<rect x="' + f(c[0] - 3) + '" y="' + f(c[1] - 2.5) + '" width="' + f(c[2] + 6) + '" height="' + f(c[3] + 5) + '" rx="2" fill="#cfe0c8" opacity=".75" transform="rotate(' + f(c[4] * -1.3) + ' 50 ' + f(c[1] + c[3] / 2) + ')"/>';
    var html = '';

    // footer: scalloped sage tablecloth edge
    var fy = V.foot, sc = '';
    for (var x = 0; x <= 100.1; x += 5) sc += '<circle cx="' + f(x) + '" cy="' + f(fy) + '" r="2.6" fill="#7fa57c"/><circle cx="' + f(x) + '" cy="' + f(fy + 0.3) + '" r=".55" fill="#fde4d3"/>';
    svg += '<rect x="0" y="' + f(fy) + '" width="100" height="' + f(V.H - fy + 1) + '" fill="url(#p05ft)"/>' + sc;

    // scattered petals (kept off the main text zones visually by being tiny and soft)
    svg += petalScatter(R, 2, 98, 2, fy - 4, sq ? 10 : 16, function (x, y) { return x > c[0] - 2 && x < c[0] + c[2] + 2 && y > c[1] - 2 && y < c[1] + c[3] + 2; });

    var lg = V.logo;
    html += box(P + '-logo' + (partner ? ' ' + P + '-pip' : ''), lg[0], lg[1], lg[2], lg[3], '<img src="' + (partner ? spec.pipUrl : spec.logoUrl) + '" alt="">');
    html += badge(BADGE, V.badge);
    var k = V.kick;
    html += box(P + '-k', k[0], k[1], k[2], null, partner ? 'FOR FAMILIES ACROSS THE PACIFIC' : 'PARENT TRAINING &amp; INFORMATION CENTER', 'font-size:' + k[3] + 'cqw');
    var t = V.title;
    html += box(P + '-t', t[0], t[1], t[2], null, H.seriesTitle(spec.series), 'font-size:' + f(fit(spec.series, t[2], 1.2, t[3], 0.52)) + 'cqw');
    var m = V.mon;
    html += box(P + '-m', m[0], m[1], m[2], null, '<b>' + H.MONTHS[spec.month - 1] + ' ' + spec.year + '</b><i>ON ZOOM</i>', 'font-size:' + m[3] + 'cqw');

    // decorations
    var D = partner ? V.deco : (n > 1 ? V.deco2 : V.deco1);
    if (D.vase) svg += vase(D.vase[0], D.vase[1], D.vase[2]);
    if (D.pan) svg += pancakes(D.pan[0], D.pan[1], D.pan[2]);
    if (D.cup) svg += teacup(D.cup[0], D.cup[1], D.cup[2]);

    // place card with the topic
    var lblF = sq ? 1.15 : 1.35, pres = spec.presenter ? '<div class="' + P + '-pr" style="font-size:' + f(sq ? 1.6 : 1.9) + 'cqw">Presented by <b>' + H.esc(spec.presenter) + '</b></div>' : '';
    var lesson = function (x) { return x.replace(/(\S+-\S+)/g, '<span style="white-space:nowrap">$1</span>'); };
    var noLb = sq && partner;
    var inner = noLb ? '' : '<div class="' + P + '-lb" style="font-size:' + lblF + 'cqw;height:' + f(c[3] * 0.17) + 'cqw">' + (n > 1 ? 'ON THE MENU THIS MONTH' : 'THIS MONTH\'S TOPIC') + '</div><div class="' + P + '-gap" style="font-size:' + f(c[3] * 0.1) + 'cqw"></div>';
    var tw = c[2] - 8;
    if (n === 1) {
      var tf = fit(S[0].lesson, tw, sq ? 4 : (partner ? 2 : 3), sq ? 4.6 : (partner ? 5 : 6.4), 0.55);
      inner += '<div class="' + P + '-tp" style="font-size:' + f(tf) + 'cqw">' + lesson(S[0].lesson) + '</div>'
        + (S[0].desc ? '<div class="' + P + '-ds" style="font-size:' + f(sq ? 1.7 : 2.1) + 'cqw">' + S[0].desc + '</div>' : '') + pres;
    } else {
      var lf = Math.min.apply(null, S.map(function (s) { return fit(s.lesson, tw - 4, sq ? 3 : 2, sq ? 3.2 : (partner ? 3.4 : 4.4), 0.55); }));
      S.forEach(function (s, i) {
        inner += '<div class="' + P + '-tp" style="font-size:' + f(lf) + 'cqw;margin-top:' + (i ? '.45em' : '0') + '"><em>' + (i + 1) + '</em>' + lesson(s.lesson) + '</div>'
          + (s.desc && !sq ? '<div class="' + P + '-ds" style="font-size:' + f(partner ? 1.7 : 1.9) + 'cqw;margin-top:.25em">' + s.desc + '</div>' : '');
      });
      inner += pres;
    }
    html += box(P + '-card', c[0], c[1], c[2], c[3], inner, 'transform:rotate(' + c[4] + 'deg);padding-top:' + f(noLb ? 0 : c[3] * 0.1) + 'cqw' + (noLb ? ';background:#fffdf8' : ''));

    if (!partner) {
      var PL = n > 1 ? V.plates2 : V.plates1;
      S.forEach(function (s, i) {
        var p = PL[i];
        svg += plate(p[0], p[1], p[2], '#8fb38c', '#fffbf3');
        svg += '<circle cx="' + f(p[0]) + '" cy="' + f(p[1]) + '" r="' + f(p[2] * 0.7) + '" fill="none" stroke="#f3c9b0" stroke-width=".25" stroke-dasharray=".8 .8"/>';
        var w = p[2] * 1.45, k2 = p[2] / 15.5;
        html += box(P + '-dt', p[0] - w / 2, p[1] - p[2] * 0.62, w, p[2] * 1.24,
          (n > 1 ? '<div class="n" style="font-size:' + f(1.25 * k2 + 0.15) + 'cqw">TOPIC ' + (i + 1) + '</div>' : '')
          + '<div class="w" style="font-size:' + f(1.7 * k2) + 'cqw">' + s.dow.toUpperCase() + '</div>'
          + '<div class="d" style="font-size:' + f(6 * k2) + 'cqw">' + s.mon + ' ' + s.day + '</div>'
          + '<div class="t" style="font-size:' + f(1.85 * k2) + 'cqw">' + s.time + '</div>');
      });
    } else {
      var hd = V.head;
      if (hd) html += box(P + '-h', hd[0], hd[1], hd[2], null, 'Find your local time', 'font-size:' + hd[3] + 'cqw');
      var rows = H.zoneRows(spec.sessions), zr = V.zr, zk = zr / 11.3;
      rows.forEach(function (r, i) {
        var p = V.zp[i];
        svg += plate(p[0], p[1], zr, r.home ? '#e9b949' : '#8fb38c', r.home ? '#fff3bf' : '#fffbf3');
        if (r.home) svg += strawberry(p[0] + zr * 0.72, p[1] - zr * 0.7, zr * 0.17, 25);
        var w = zr * 1.56, tm = r.time.split(' / ');
        html += box(P + '-z', p[0] - w / 2, p[1] - zr * 0.66, w, zr * 1.32,
          '<div class="i" style="font-size:' + f(1.5 * zk) + 'cqw">' + r.label + '</div><div class="y" style="font-size:' + f(1.25 * zk) + 'cqw">' + r.days + '</div>'
          + '<div class="tm" style="font-size:' + f((tm.length > 1 ? 1.95 : 2.55) * zk) + 'cqw">' + tm.join('<br>') + '</div>');
      });
    }

    var wh = V.where;
    html += box(P + '-w', wh[0], wh[1], wh[2], null, H.PTC_WHERE.replace('@ Parent Talk Café', '@ <b>Parent Talk Café</b>'), 'font-size:' + wh[3] + 'cqw');

    var fs = sq ? 0.8 : 1, qy = fy + (sq ? 3.2 : 4), qh = V.H - qy - (sq ? 1.8 : 2.8);
    html += box(P + '-f', 5, qy, 90, qh,
      '<div class="' + P + '-rg" style="font-size:' + f(1.95 * fs) + 'cqw"><b style="font-size:' + f(3.3 * fs) + 'cqw">REGISTER at <i>LDAHawaii.org</i></b>Get your Zoom link, scan the QR code,' + (sq ? ' ' : '<br>') + 'or call ' + H.phone(partner) + '</div>'
      + '<div class="' + P + '-qr" style="width:' + (sq ? 10 : 11) + 'cqw;height:' + (sq ? 10 : 11) + 'cqw">' + H.qrImg(spec, partner) + '</div>'
      + '<div class="' + P + '-bd" style="font-size:' + f(1.45 * fs) + 'cqw">' + H.badges(spec, partner) + '</div>');

    return '<div class="' + P + (sq ? ' sq' : '') + (partner ? ' partner' : '') + '"><svg class="' + P + '-bg" viewBox="0 0 100 ' + V.H + '" preserveAspectRatio="none">' + svg + '</svg>' + html + '</div>';
  }

  return { name: 'Mother\'s Day brunch (brunch table from above, place card, plates)', fonts: 'family=Nunito:wght@600;700;800;900&family=Lora:ital,wght@0,600;0,700;1,600;1,700&family=Satisfy', css: css, fn: fn };
})(), 'ptc');

/* ---- PTC month 06 ---- */
VEBFlyers.registerTheme(6, (function () {
  /* PTC June: "Iced coffee summer" - bright aqua, citrus orange and lime. Tall iced drinks with striped straws,
     ice cubes and lemon slices stand on a lime counter; the topic hangs from a glass on a drink-menu tag,
     the date sits on a big ice cube, partner local times on seven ice cubes (Hawaiʻi = a lemon-yellow cube). */
  var P = 'p06';
  function f(n) { return (Math.round(n * 100) / 100).toString(); }
  function box(cls, x, y, w, h, inner, extra) {
    return '<div class="' + cls + '" style="left:' + f(x) + 'cqw;top:' + f(y) + 'cqw;width:' + f(w) + 'cqw;' + (h != null ? 'height:' + f(h) + 'cqw;' : '') + (extra || '') + '">' + inner + '</div>';
  }
  function fit(t, w, lines, maxF, k) { // font size (cqw) so text t wraps into <= lines in width w
    t = String(t).replace(/&amp;/g, '&').replace(/&[a-z]+;/g, 'x');
    var lw = Math.max.apply(null, t.split(/\s+/).map(function (s) { return s.length; }));
    return Math.min(maxF, w * lines / (t.length * k * 1.18), w / (lw * k * 1.1));
  }
  function rnd(seed) { var s = seed; return function () { s = (s * 9301 + 49297) % 233280; return s / 233280; }; }

  /* recurring series mark: round PARENT TALK CAFE badge with a steaming cup */
  function badge(c, b) {
    return '<svg class="' + P + '-badge" style="left:' + f(b[0]) + 'cqw;top:' + f(b[1]) + 'cqw;width:' + f(b[2]) + 'cqw;height:' + f(b[2]) + 'cqw" viewBox="0 0 100 100"><defs><path id="' + P + 'bt" d="M9 50 A41 41 0 0 1 91 50"/><path id="' + P + 'bb" d="M3.6 50 A46.4 46.4 0 0 0 96.4 50"/></defs>'
      + '<circle cx="50" cy="52" r="48.5" fill="rgba(0,0,0,.12)"/><circle cx="50" cy="50" r="49" fill="' + c.ring + '"/><circle cx="50" cy="50" r="39.5" fill="' + c.face + '"/>'
      + '<circle cx="50" cy="50" r="38" fill="none" stroke="' + c.ring + '" stroke-width=".8" stroke-dasharray="2 1.6"/>'
      + '<text font-family="Nunito,sans-serif" font-size="8.6" font-weight="900" letter-spacing="1.25" fill="' + c.ink + '" text-anchor="middle"><textPath href="#' + P + 'bt" startOffset="50%">PARENT TALK CAFÉ</textPath></text>'
      + '<text font-family="Nunito,sans-serif" font-size="6.2" font-weight="800" letter-spacing="1.4" fill="' + c.ink + '" text-anchor="middle"><textPath href="#' + P + 'bb" startOffset="50%">MONTHLY CHAT</textPath></text>'
      + '<circle cx="6" cy="50" r="1.8" fill="' + c.ink + '"/><circle cx="94" cy="50" r="1.8" fill="' + c.ink + '"/>'
      + '<ellipse cx="50" cy="76" rx="23" ry="4.6" fill="' + c.saucer + '"/><ellipse cx="50" cy="75" rx="15" ry="2.4" fill="rgba(0,0,0,.12)"/>'
      + '<path d="M67 53 q10 -1 9.5 7.5 q-.5 7.5 -12 8" fill="none" stroke="' + c.cup + '" stroke-width="3.4" stroke-linecap="round"/>'
      + '<path d="M30 50 H70 L67 64 Q64.5 75 55 75 H45 Q35.5 75 33 64 Z" fill="' + c.cup + '"/>'
      + '<ellipse cx="50" cy="50" rx="20" ry="3.8" fill="' + c.coffee + '" stroke="' + c.cup + '" stroke-width="1.4"/>'
      + '<path d="M44 60 c0 -3 6 -3 6 0 c0 -3 6 -3 6 0 c0 4 -6 7 -6 8 c0 -1 -6 -4 -6 -8z" fill="' + c.heart + '"/>'
      + ['M41 44 q-4 -5 0 -10 q4 -5 0 -10', 'M50 43 q-4 -5 0 -10 q4 -5 0 -11', 'M59 44 q-4 -5 0 -10 q4 -5 0 -10'].map(function (d) {
        return '<path d="' + d + '" fill="none" stroke="' + c.steam + '" stroke-width="2.6" stroke-linecap="round"/>'; }).join('')
      + '</svg>';
  }


  /* ---- summer drinks ---- */
  function lemon(cx, cy, r, rot, lime) {
    var rind = lime ? '#7cc242' : '#ffcc1f', pith = lime ? '#e9f8c9' : '#fff6c8', seg = lime ? '#b5e06a' : '#ffe36b';
    var o = '<g transform="translate(' + f(cx) + ' ' + f(cy) + ') rotate(' + f(rot || 0) + ')"><circle r="' + f(r) + '" fill="' + rind + '"/><circle r="' + f(r * 0.86) + '" fill="' + pith + '"/>';
    for (var i = 0; i < 8; i++) {
      var a0 = (i * 45 + 4) * Math.PI / 180, a1 = ((i + 1) * 45 - 4) * Math.PI / 180, rr = r * 0.76, ri = r * 0.1;
      o += '<path d="M' + f(Math.cos(a0) * ri) + ' ' + f(Math.sin(a0) * ri) + ' L' + f(Math.cos(a0) * rr) + ' ' + f(Math.sin(a0) * rr) + ' A' + f(rr) + ' ' + f(rr) + ' 0 0 1 ' + f(Math.cos(a1) * rr) + ' ' + f(Math.sin(a1) * rr) + ' Z" fill="' + seg + '"/>';
    }
    return o + '<circle r="' + f(r * 0.1) + '" fill="' + pith + '"/></g>';
  }
  function cube(x, y, w, h, rot, fill, edge) { // ice cube (front face + bevel + shine)
    var cx = x + w / 2, cy = y + h / 2, rx = Math.min(w, h) * 0.18;
    return '<g transform="rotate(' + f(rot) + ' ' + f(cx) + ' ' + f(cy) + ')">'
      + '<rect x="' + f(x + 0.5) + '" y="' + f(y + 0.9) + '" width="' + f(w) + '" height="' + f(h) + '" rx="' + f(rx) + '" fill="rgba(11,85,99,.16)"/>'
      + '<rect x="' + f(x) + '" y="' + f(y) + '" width="' + f(w) + '" height="' + f(h) + '" rx="' + f(rx) + '" fill="' + (fill || 'url(#p06ice)') + '" stroke="' + (edge || '#7fd6da') + '" stroke-width=".45"/>'
      + '<rect x="' + f(x + w * 0.05) + '" y="' + f(y + h * 0.07) + '" width="' + f(w * 0.9) + '" height="' + f(h * 0.86) + '" rx="' + f(rx * 0.75) + '" fill="none" stroke="rgba(255,255,255,.9)" stroke-width=".35"/>'
      + '<path d="M' + f(x + w * 0.1) + ' ' + f(y + h * 0.42) + ' Q' + f(x + w * 0.1) + ' ' + f(y + h * 0.14) + ' ' + f(x + w * 0.3) + ' ' + f(y + h * 0.13) + '" fill="none" stroke="#fff" stroke-width=".7" stroke-linecap="round"/>'
      + '<circle cx="' + f(x + w * 0.9) + '" cy="' + f(y + h * 0.82) + '" r=".45" fill="#fff" opacity=".9"/><circle cx="' + f(x + w * 0.86) + '" cy="' + f(y + h * 0.9) + '" r=".25" fill="#fff"/></g>';
  }
  function smallCube(x, y, s, rot) {
    return '<rect x="' + f(x - s / 2) + '" y="' + f(y - s / 2) + '" width="' + f(s) + '" height="' + f(s) + '" rx="' + f(s * 0.22) + '" fill="rgba(255,255,255,.55)" stroke="rgba(255,255,255,.95)" stroke-width="' + f(s * 0.06) + '" transform="rotate(' + f(rot) + ' ' + f(x) + ' ' + f(y) + ')"/>'
      + '<path d="M' + f(x - s * 0.3) + ' ' + f(y) + ' q0 ' + f(-s * 0.3) + ' ' + f(s * 0.25) + ' ' + f(-s * 0.3) + '" stroke="#fff" stroke-width="' + f(s * 0.08) + '" fill="none" stroke-linecap="round" transform="rotate(' + f(rot) + ' ' + f(x) + ' ' + f(y) + ')"/>';
  }
  function glass(cx, by, w, h, kind, R) {
    var ty = by - h, tw = w, bw = w * 0.8;
    function hw(y) { return bw / 2 + (tw - bw) / 2 * (by - y) / h; }
    function band(y0, y1, fill, wav) {
      var d = 'M' + f(cx - hw(y1)) + ' ' + f(y1) + ' L' + f(cx - hw(y0)) + ' ' + f(y0);
      if (wav) d += ' Q' + f(cx - hw(y0) / 2) + ' ' + f(y0 - wav) + ' ' + f(cx) + ' ' + f(y0) + ' T' + f(cx + hw(y0)) + ' ' + f(y0);
      else d += ' L' + f(cx + hw(y0)) + ' ' + f(y0);
      return '<path d="' + d + ' L' + f(cx + hw(y1)) + ' ' + f(y1) + ' Z" fill="' + fill + '"/>';
    }
    var o = '<ellipse cx="' + f(cx + 0.8) + '" cy="' + f(by + 0.6) + '" rx="' + f(bw * 0.62) + '" ry="' + f(w * 0.07) + '" fill="rgba(11,85,99,.2)"/>';
    var lv = ty + h * 0.13, bot = by - w * 0.08;
    var straw = kind === 'coffee' ? ['#ff8a1f', '#fff'] : (kind === 'citrus' ? ['#7cc242', '#fff'] : ['#2ec4c9', '#fff']);
    // straw (behind the front glass wall, above the drink)
    var sx = cx + tw * 0.12, sang = kind === 'citrus' ? -14 : 12, sl = h * 0.42, sw = w * 0.13;
    o += '<g transform="rotate(' + sang + ' ' + f(sx) + ' ' + f(lv + h * 0.2) + ')">';
    for (var i = 0; i < 9; i++) o += '<rect x="' + f(sx - sw / 2) + '" y="' + f(lv + h * 0.2 - sl * (i + 1) / 6) + '" width="' + f(sw) + '" height="' + f(sl / 6 + 0.05) + '" fill="' + straw[i % 2] + '"/>';
    o += '<path d="M' + f(sx - sw / 2) + ' ' + f(lv + h * 0.2 - sl * 1.5) + ' q' + f(sw * 0.8) + ' ' + f(-sw * 2.2) + ' ' + f(sw * 3) + ' ' + f(-sw * 2.4) + '" stroke="' + straw[0] + '" stroke-width="' + f(sw) + '" fill="none" stroke-linecap="round"/></g>';
    if (kind === 'coffee') {
      o += band(lv, bot, '#8a4f2a') + band(lv + h * 0.36, bot, '#6b3a1e', 1.6) + band(lv, lv + h * 0.2, '#e8c49a') + band(lv + h * 0.16, lv + h * 0.4, '#c98b55', 1.2);
    } else if (kind === 'citrus') {
      o += band(lv, bot, '#ff8a1f') + band(lv + h * 0.38, bot, '#ff6a3d', 1.4) + band(lv, lv + h * 0.22, '#ffc94a', 0);
    } else {
      o += band(lv, bot, '#2ec4c9') + band(lv + h * 0.4, bot, '#1fa6b3', 1.4) + band(lv, lv + h * 0.2, '#9be8e4', 0);
    }
    for (i = 0; i < 4; i++) o += smallCube(cx + (R() - 0.5) * tw * 0.45, lv + h * (0.08 + i * 0.13), w * 0.3, R() * 50 - 25);
    if (kind !== 'coffee') o += lemon(cx - tw * 0.08, lv + h * 0.55, w * 0.22, 30, kind === 'aqua');
    // glass walls + shine
    o += '<path d="M' + f(cx - tw / 2) + ' ' + f(ty) + ' L' + f(cx - bw / 2) + ' ' + f(by - w * 0.1) + ' Q' + f(cx - bw / 2) + ' ' + f(by) + ' ' + f(cx - bw / 2 + w * 0.1) + ' ' + f(by) + ' L' + f(cx + bw / 2 - w * 0.1) + ' ' + f(by) + ' Q' + f(cx + bw / 2) + ' ' + f(by) + ' ' + f(cx + bw / 2) + ' ' + f(by - w * 0.1) + ' L' + f(cx + tw / 2) + ' ' + f(ty) + '" fill="rgba(255,255,255,.18)" stroke="#fff" stroke-width="' + f(w * 0.035) + '" stroke-linejoin="round"/>';
    o += '<ellipse cx="' + f(cx) + '" cy="' + f(ty) + '" rx="' + f(tw / 2) + '" ry="' + f(w * 0.07) + '" fill="none" stroke="#fff" stroke-width="' + f(w * 0.03) + '"/>';
    o += '<path d="M' + f(cx - tw * 0.36) + ' ' + f(ty + h * 0.08) + ' L' + f(cx - bw * 0.33) + ' ' + f(by - h * 0.12) + '" stroke="rgba(255,255,255,.75)" stroke-width="' + f(w * 0.06) + '" stroke-linecap="round"/>';
    for (i = 0; i < 5; i++) o += '<ellipse cx="' + f(cx + (R() - 0.2) * tw * 0.7) + '" cy="' + f(ty + h * (0.3 + R() * 0.55)) + '" rx="' + f(w * 0.025) + '" ry="' + f(w * 0.04) + '" fill="rgba(255,255,255,.7)"/>';
    o += lemon(cx + tw * 0.46, ty + w * 0.02, w * 0.26, 0, kind === 'citrus');
    return o;
  }
  function tagPath(x0, y0, w, h) {
    var x1 = x0 + w, y1 = y0 + h, c = Math.min(h * 0.32, 6), r = 1.6;
    return 'M' + f(x0) + ' ' + f(y0 + c) + ' L' + f(x0 + c) + ' ' + f(y0) + ' L' + f(x1 - r) + ' ' + f(y0) + ' Q' + f(x1) + ' ' + f(y0) + ' ' + f(x1) + ' ' + f(y0 + r)
      + ' L' + f(x1) + ' ' + f(y1 - r) + ' Q' + f(x1) + ' ' + f(y1) + ' ' + f(x1 - r) + ' ' + f(y1) + ' L' + f(x0 + c) + ' ' + f(y1) + ' L' + f(x0) + ' ' + f(y1 - c) + ' Z';
  }

  var BADGE = { ring: '#ff8a1f', face: '#effcfa', ink: '#fffdf6', cup: '#2ec4c9', coffee: '#7a4a2a', saucer: '#9bd34a', heart: '#effcfa', steam: '#ffb15e' };

  var L = {
    lh: { H: 129.41, logo: [4.5, 4.5, 15, 15], badge: [77.5, 3, 19.5], kick: [22, 5.6, 54, 1.4], title: [21, 9.2, 56, 8.6], mon: [21, 28.4, 56, 5],
      tag: [38, 38.5, 58, 37, 2.5], glasses: [[13, 106, 15.5, 52, 'coffee'], [28.5, 106, 12.5, 40, 'citrus']], hook: [33, 51],
      cubes1: [[56, 82.5, 32, 19.5, -4]], cubes2: [[37, 82.5, 28.5, 19, -4], [67, 82.5, 28.5, 19, 4]],
      counter: 106, where: [37, 102.6, 60, 1.65], foot: 110.4 },
    lp: { H: 129.41, logo: [4, 4.5, 22, 13], badge: [78, 3, 18.5], kick: [28, 5.4, 48, 1.3], title: [28, 8.6, 48, 7.4], mon: [28, 25.4, 48, 4.4],
      tag: [28, 33.2, 68, 25.5, 1.5], glasses: [[13.5, 59, 13, 25, 'citrus']], hook: [18, 36.5],
      head: [5, 61.6, 90, 4.4], zc: [[3.5, 67.4], [27.5, 67.4], [51.5, 67.4], [75.5, 67.4], [15.5, 86], [39.5, 86], [63.5, 86]], zw: 21, zh: 15.6,
      counter: 59, where: [5, 104.3, 90, 1.7], foot: 108.8 },
    sh: { H: 100, logo: [3.5, 3.5, 11.5, 11.5], badge: [81, 2.5, 16.5], kick: [17, 4.4, 62, 1.15], title: [17, 8, 62, 6.4], mon: [17, 22.2, 62, 3.6],
      tag: [33, 29.5, 63, 30, 2], glasses: [[11, 79, 12, 41, 'coffee'], [24, 79, 9.5, 31, 'citrus']], hook: [28, 46],
      cubes1: [[47, 61.5, 30, 15.5, -3]], cubes2: [[35, 61.5, 28, 15.5, -3], [66.5, 61.5, 28, 15.5, 3]],
      counter: 79, where: [33, 78.9, 64, 1.4], foot: 84 },
    sp: { H: 100, logo: [3.5, 3.5, 18, 10.6], badge: [81, 2.5, 16.5], kick: [24, 5.2, 54, 1.15], title: [24, 8.4, 54, 5.6], mon: [24, 21.2, 54, 3.4],
      tag: [5, 27.6, 90, 16.4, -0.8],
      zc: [[3.5, 47.4], [27.5, 47.4], [51.5, 47.4], [75.5, 47.4], [15.5, 63], [39.5, 63], [63.5, 63]], zw: 21, zh: 13.4,
      where: [3, 79.2, 94, 1.45], foot: 83.8 }
  };

  var css = [
    '.p06{container-type:inline-size;aspect-ratio:8.5/11;position:relative;overflow:hidden;border-radius:4px;box-shadow:0 10px 30px rgba(11,85,99,.25);background:#bff0ec;font-family:Nunito,Poppins,sans-serif;color:#0b5563}',
    '.p06.sq{aspect-ratio:1/1}',
    '.p06>svg.p06-bg{position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:1}',
    '.p06>div,.p06>svg.p06-badge{position:absolute;z-index:3}',
    '.p06 .p06-logo{background:#fff;border-radius:50%;display:grid;place-items:center;box-shadow:0 0 0 .6cqw #ff8a1f,0 .8cqw 1.6cqw rgba(11,85,99,.2)}',
    '.p06 .p06-logo img{width:78%}.p06 .p06-logo.p06-pip{border-radius:2cqw}.p06 .p06-logo.p06-pip img{width:90%}',
    '.p06 .p06-k{text-align:center;font-weight:900;letter-spacing:.16em;color:#0b8a94;line-height:1.3}',
    '.p06 .p06-t{text-align:center;font-family:"Baloo 2",Fredoka,sans-serif;font-weight:800;line-height:1.12;color:#0b5563}',
    '.p06 .p06-t span{display:block;font-family:Yellowtail,cursive;font-weight:400;color:#ff7a1a;font-size:1.25em;line-height:1.1;margin-top:-.12em}',
    '.p06 .p06-m{display:flex;justify-content:center;align-items:center;gap:.5em;line-height:1}',
    '.p06 .p06-m b{font-family:"Baloo 2",sans-serif;font-weight:800;color:#0b5563}',
    '.p06 .p06-m i{font-style:normal;font-weight:900;font-size:.36em;letter-spacing:.18em;background:#7cc242;color:#fff;border-radius:2em;padding:.5em 1em .45em}',
    '.p06 .p06-tag{display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;box-sizing:border-box}',
    '.p06 .p06-lb{font-weight:900;letter-spacing:.2em;color:#fff;background:#ff8a1f;border-radius:2em;padding:.4em 1.1em .35em;line-height:1;margin-bottom:1.3em}',
    '.p06 .p06-tp{font-family:"Baloo 2",sans-serif;font-weight:800;line-height:1.08;color:#0b5563}',
    '.p06 .p06-tp em{font-style:normal;font-weight:800;color:#fff;background:#2ec4c9;border-radius:30%;display:inline-grid;place-items:center;width:1.1em;height:1.1em;font-size:.62em;vertical-align:.2em;margin-right:.35em}',
    '.p06 .p06-ds{font-weight:700;font-style:italic;color:#d4620c;line-height:1.2;margin-top:.35em}',
    '.p06 .p06-pr{font-weight:800;color:#3d6b12;line-height:1.2;margin-top:.7em;background:#e6f6cf;border-radius:2em;padding:.35em 1.1em}',
    '.p06 .p06-pr b{font-weight:900;color:#2c520a}',
    '.p06 .p06-dt{display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;line-height:1}',
    '.p06 .p06-dt>div{flex:none}.p06 .p06-dt .w{font-weight:900;letter-spacing:.2em;color:#0b8a94;line-height:1.3;margin-bottom:.75em}',
    '.p06 .p06-dt .d{font-family:"Baloo 2",sans-serif;font-weight:800;color:#0b5563;margin:0;line-height:1}',
    '.p06 .p06-dt .t{font-weight:900;color:#e8650c;margin-top:.3em}',
    '.p06 .p06-dt .n{font-weight:900;color:#fff;background:#ff8a1f;border-radius:2em;padding:.25em .8em;letter-spacing:.12em;margin-bottom:.35em}',
    '.p06 .p06-h{text-align:center;font-family:Yellowtail,cursive;color:#e8650c;line-height:1}',
    '.p06 .p06-z{display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;line-height:1.08}',
    '.p06 .p06-z .i{font-weight:900;color:#0b5563}.p06 .p06-z .y{font-weight:700;color:#3f7c86;margin:.2em 0 .45em}',
    '.p06 .p06-z .tm{font-family:"Baloo 2",sans-serif;font-weight:800;color:#e8650c;line-height:1.15}',
    '.p06 .p06-w{text-align:center;font-weight:800;font-style:italic;color:#0b5563;line-height:1.2}',
    '.p06 .p06-w b{color:#e8650c}',
    '.p06 .p06-f{display:flex;align-items:center;gap:2.4cqw;color:#fff}',
    '.p06 .p06-rg{flex:1;line-height:1.3;font-weight:700;color:#d8f6f4}',
    '.p06 .p06-rg b{display:block;font-weight:900;color:#fff;line-height:1.1;margin-bottom:.25em}.p06 .p06-rg b i{font-style:normal;color:#ffc94a}',
    '.p06 .p06-qr{background:#fff;border-radius:1cqw;padding:.7cqw;box-sizing:border-box;display:grid;place-items:center;flex:none}',
    '.p06 .p06-qr img{width:100%;height:100%;display:block}.p06 .p06-qr span{color:#0b5563;font-weight:900;font-size:2.4cqw}',
    '.p06 .p06-bd{display:flex;flex-direction:column;gap:.6cqw;flex:none}',
    '.p06 .p06-bd span{background:#fff;color:#0b5563;border-radius:2cqw;padding:.45em 1.1em;font-weight:800;text-align:center;white-space:nowrap}'
  ].join('\n');

  function fn(spec, partner, sq, H) {
    var V = L[(sq ? 's' : 'l') + (partner ? 'p' : 'h')], S = spec.sessions.map(H.sessInfo), n = S.length;
    var R = rnd(spec.month * 37 + (sq ? 7 : 0) + (partner ? 3 : 0) + n);
    var svg = '<defs><linearGradient id="p06sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7fdcd8"/><stop offset=".45" stop-color="#c4f1ec"/><stop offset="1" stop-color="#f3fcf8"/></linearGradient>'
      + '<linearGradient id="p06ice" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset=".6" stop-color="#f1fdfc"/><stop offset="1" stop-color="#cdf3f2"/></linearGradient>'
      + '<linearGradient id="p06lem" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff7c2"/><stop offset="1" stop-color="#ffe066"/></linearGradient>'
      + '<linearGradient id="p06ft" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0b6b78"/><stop offset="1" stop-color="#0a4f5c"/></linearGradient></defs>';
    svg += '<rect width="100" height="' + V.H + '" fill="url(#p06sky)"/>';
    // condensation bubbles drifting in the sky
    for (var b = 0; b < (sq ? 12 : 18); b++) { var bx = R() * 100, by2 = R() * (V.foot - 10), br = 0.3 + R() * 0.8; svg += '<circle cx="' + f(bx) + '" cy="' + f(by2) + '" r="' + f(br) + '" fill="none" stroke="#fff" stroke-width=".25" opacity=".8"/>'; }
    var html = '', fy = V.foot;

    // corner citrus
    svg += lemon(sq ? 101 : 102, sq ? 40 : 30, sq ? 5.5 : 7, 10, false) + lemon(-2, sq ? 36 : 30, sq ? 4.6 : 6, 20, true);

    // counter (lime) under the glasses
    if (V.counter) svg += '<rect x="0" y="' + f(V.counter) + '" width="' + f(partner ? 27 : (sq ? 32 : 36)) + '" height="1.6" rx=".8" fill="#9bd34a"/><rect x="0" y="' + f(V.counter + 1.6) + '" width="' + f(partner ? 27 : (sq ? 32 : 36)) + '" height=".7" fill="#6aa82e"/>';
    (V.glasses || []).forEach(function (g) { svg += glass(g[0], g[1], g[2], g[3], g[4], R); });

    // footer: teal with a wavy lime edge
    var wv = 'M0 ' + f(fy);
    for (var x = 0; x < 100; x += 10) wv += ' q2.5 -2 5 0 t5 0';
    svg += '<path d="' + wv + ' V' + f(V.H + 1) + ' H0Z" fill="#9bd34a" transform="translate(0 -1.1)"/><path d="' + wv + ' V' + f(V.H + 1) + ' H0Z" fill="url(#p06ft)"/>';

    var lg = V.logo;
    html += box(P + '-logo' + (partner ? ' ' + P + '-pip' : ''), lg[0], lg[1], lg[2], lg[3], '<img src="' + (partner ? spec.pipUrl : spec.logoUrl) + '" alt="">');
    html += badge(BADGE, V.badge);
    var k = V.kick;
    html += box(P + '-k', k[0], k[1], k[2], null, partner ? 'FOR FAMILIES ACROSS THE PACIFIC' : 'PARENT TRAINING &amp; INFORMATION CENTER', 'font-size:' + k[3] + 'cqw');
    var t = V.title;
    html += box(P + '-t', t[0], t[1], t[2], null, H.seriesTitle(spec.series), 'font-size:' + f(fit(spec.series, t[2], 1.2, t[3], 0.5)) + 'cqw');
    var m = V.mon;
    html += box(P + '-m', m[0], m[1], m[2], null, '<b>' + H.MONTHS[spec.month - 1] + ' ' + spec.year + '</b><i>ON ZOOM</i>', 'font-size:' + m[3] + 'cqw');

    // drink-menu tag with the topic
    var g = V.tag, tx = g[0], ty = g[1], tw = g[2], th = g[3], c = Math.min(th * 0.32, 6), cx = tx + tw / 2, cy = ty + th / 2;
    var hole = [tx + c * 0.85, cy];
    if (V.hook) {
      var a = g[4] * Math.PI / 180, hx = cx + (hole[0] - cx) * Math.cos(a) - (hole[1] - cy) * Math.sin(a), hy = cy + (hole[0] - cx) * Math.sin(a) + (hole[1] - cy) * Math.cos(a);
      svg += '<path d="M' + f(V.hook[0]) + ' ' + f(V.hook[1]) + ' Q' + f((V.hook[0] + hx) / 2) + ' ' + f(Math.max(V.hook[1], hy) + 4) + ' ' + f(hx) + ' ' + f(hy) + '" fill="none" stroke="#e8650c" stroke-width=".45"/>';
    }
    svg += '<g transform="rotate(' + g[4] + ' ' + f(cx) + ' ' + f(cy) + ')"><path d="' + tagPath(tx + 0.6, ty + 1, tw, th) + '" fill="rgba(11,85,99,.18)"/><path d="' + tagPath(tx, ty, tw, th) + '" fill="#ff8a1f"/>'
      + '<path d="' + tagPath(tx + 0.9, ty + 0.9, tw - 1.8, th - 1.8) + '" fill="#fffef8"/>'
      + '<path d="' + tagPath(tx + 1.9, ty + 1.9, tw - 3.8, th - 3.8) + '" fill="none" stroke="#ffb15e" stroke-width=".25" stroke-dasharray="1 .8"/>'
      + (V.hook ? '<circle cx="' + f(hole[0]) + '" cy="' + f(hole[1]) + '" r="1.5" fill="#ff8a1f"/><circle cx="' + f(hole[0]) + '" cy="' + f(hole[1]) + '" r=".75" fill="#bff0ec"/>' : '')
      + lemon(tx + tw - 1.5, ty + 1.2, sq ? 2.6 : 3.2, 15, n > 1) + '</g>';
    var noLb = sq && partner, padL = V.hook ? c * 1.75 : 3;
    var lesson = function (x) { return x.replace(/(\S+-\S+)/g, '<span style="white-space:nowrap">$1</span>'); };
    var pres = spec.presenter ? '<div class="' + P + '-pr" style="font-size:' + f(sq ? 1.55 : 1.85) + 'cqw">Presented by <b>' + H.esc(spec.presenter) + '</b></div>' : '';
    var inner = noLb ? '' : '<div class="' + P + '-lb" style="font-size:' + (sq ? 1.1 : 1.3) + 'cqw">' + (n > 1 ? 'ON THE DRINK MENU' : 'TODAY\'S SPECIAL') + '</div>';
    var iw = tw - padL - 4;
    if (n === 1) {
      inner += '<div class="' + P + '-tp" style="font-size:' + f(fit(S[0].lesson, iw, sq ? 3 : (partner ? 2 : 3), sq ? 4.6 : (partner ? 5.2 : 6.4), 0.5)) + 'cqw">' + lesson(S[0].lesson) + '</div>'
        + (S[0].desc ? '<div class="' + P + '-ds" style="font-size:' + f(sq ? 1.65 : 2.05) + 'cqw">' + S[0].desc + '</div>' : '') + pres;
    } else {
      var lf = Math.min.apply(null, S.map(function (s) { return fit(s.lesson, iw - 4, sq ? 2 : 2, sq ? 3.4 : (partner ? 3.6 : 4.6), 0.5); }));
      S.forEach(function (s, i) {
        inner += '<div class="' + P + '-tp" style="font-size:' + f(lf) + 'cqw;margin-top:' + (i ? '.4em' : '0') + '"><em>' + (i + 1) + '</em>' + lesson(s.lesson) + '</div>'
          + (s.desc && !sq ? '<div class="' + P + '-ds" style="font-size:' + f(partner ? 1.65 : 1.85) + 'cqw;margin-top:.2em">' + s.desc + '</div>' : '');
      });
      inner += pres;
    }
    html += box(P + '-tag', tx + padL, ty + 2, tw - padL - 2.5, th - 4, inner, 'transform-origin:' + f(cx - tx - padL) + 'cqw ' + f(cy - ty - 2) + 'cqw;transform:rotate(' + g[4] + 'deg)');

    if (!partner) {
      var CB = n > 1 ? V.cubes2 : V.cubes1;
      S.forEach(function (s, i) {
        var q = CB[i], kk = q[3] / 19.5;
        svg += cube(q[0], q[1], q[2], q[3], q[4]);
        html += box(P + '-dt', q[0] + 1.5, q[1] + 1, q[2] - 3, q[3] - 2,
          (n > 1 ? '<div class="n" style="font-size:' + f(1.2 * kk) + 'cqw">TOPIC ' + (i + 1) + '</div>' : '') + ('<div class="w" style="font-size:' + f(1.6 * kk) + 'cqw">' + ({ Sun: 'SUNDAY', Mon: 'MONDAY', Tue: 'TUESDAY', Wed: 'WEDNESDAY', Thu: 'THURSDAY', Fri: 'FRIDAY', Sat: 'SATURDAY' })[s.dow] + '</div>')
          + '<div class="d" style="font-size:' + f((n > 1 ? 5 : 6.2) * kk) + 'cqw">' + s.mon + ' ' + s.day + '</div>'
          + '<div class="t" style="font-size:' + f(2.05 * kk) + 'cqw">' + s.time + '</div>', 'transform:rotate(' + q[4] + 'deg)');
      });
    } else {
      var hd = V.head;
      if (hd) html += box(P + '-h', hd[0], hd[1], hd[2], null, 'Find your local time', 'font-size:' + hd[3] + 'cqw');
      var rows = H.zoneRows(spec.sessions), zw = V.zw, zh = V.zh, zk = zh / 15.6;
      rows.forEach(function (r, i) {
        var p = V.zc[i], rot = [-3, 2, -2, 3, 2, -3, 2][i];
        svg += cube(p[0], p[1], zw, zh, rot, r.home ? 'url(#p06lem)' : null, r.home ? '#ffb11f' : null);
        if (r.home) svg += lemon(p[0] + zw - 1, p[1] + 0.5, zh * 0.2, 20, false);
        var tm = r.time.split(' / ');
        html += box(P + '-z', p[0] + 1, p[1] + 0.8, zw - 2, zh - 1.6,
          '<div class="i" style="font-size:' + f(1.5 * zk) + 'cqw">' + r.label + '</div><div class="y" style="font-size:' + f(1.25 * zk) + 'cqw">' + r.days + '</div>'
          + '<div class="tm" style="font-size:' + f((tm.length > 1 ? 2.1 : 2.9) * zk) + 'cqw">' + tm.join('<br>') + '</div>', 'transform:rotate(' + rot + 'deg)');
      });
    }

    var wh = V.where;
    html += box(P + '-w', wh[0], wh[1], wh[2], null, H.PTC_WHERE.replace('@ Parent Talk Café', '@ <b>Parent Talk Café</b>'), 'font-size:' + wh[3] + 'cqw');

    var fs = sq ? 0.8 : 1, qy = fy + (sq ? 2.6 : 3.2), qh = V.H - qy - (sq ? 1.8 : 2.6);
    html += box(P + '-f', 5, qy, 90, qh,
      '<div class="' + P + '-rg" style="font-size:' + f(1.95 * fs) + 'cqw"><b style="font-size:' + f(3.3 * fs) + 'cqw">REGISTER at <i>LDAHawaii.org</i></b>Get your Zoom link, scan the QR code,' + (sq ? ' ' : '<br>') + 'or call ' + H.phone(partner) + '</div>'
      + '<div class="' + P + '-qr" style="width:' + (sq ? 10 : 11) + 'cqw;height:' + (sq ? 10 : 11) + 'cqw">' + H.qrImg(spec, partner) + '</div>'
      + '<div class="' + P + '-bd" style="font-size:' + f(1.45 * fs) + 'cqw">' + H.badges(spec, partner) + '</div>');

    return '<div class="' + P + (sq ? ' sq' : '') + (partner ? ' partner' : '') + '"><svg class="' + P + '-bg" viewBox="0 0 100 ' + V.H + '" preserveAspectRatio="none">' + svg + '</svg>' + html + '</div>';
  }

  return { name: 'Iced coffee summer (iced drinks, drink-menu tag, ice cubes)', fonts: 'family=Nunito:wght@600;700;800;900&family=Baloo+2:wght@600;700;800&family=Yellowtail', css: css, fn: fn };
})(), 'ptc');

/* ---- PTC month 07 ---- */
VEBFlyers.registerTheme(7, (function () {
  /* PTC July: "Shave ice stand" - a white stand under a rainbow-striped scalloped awning, syrup colors
     (cherry, orange, lemon, lime, blue, grape). The topic is on the stand's hanging menu board; the date (HST)
     and the partner local times are printed on paper shave-ice cups with rainbow ice domes, lined up on shelves. */
  var P = 'p07';
  function f(n) { return (Math.round(n * 100) / 100).toString(); }
  function box(cls, x, y, w, h, inner, extra) {
    return '<div class="' + cls + '" style="left:' + f(x) + 'cqw;top:' + f(y) + 'cqw;width:' + f(w) + 'cqw;' + (h != null ? 'height:' + f(h) + 'cqw;' : '') + (extra || '') + '">' + inner + '</div>';
  }
  function fit(t, w, lines, maxF, k) { // font size (cqw) so text t wraps into <= lines in width w
    t = String(t).replace(/&amp;/g, '&').replace(/&[a-z]+;/g, 'x');
    var lw = Math.max.apply(null, t.split(/\s+/).map(function (s) { return s.length; }));
    return Math.min(maxF, w * lines / (t.length * k * 1.18), w / (lw * k * 1.1));
  }
  function rnd(seed) { var s = seed; return function () { s = (s * 9301 + 49297) % 233280; return s / 233280; }; }

  /* recurring series mark: round PARENT TALK CAFE badge with a steaming cup */
  function badge(c, b) {
    return '<svg class="' + P + '-badge" style="left:' + f(b[0]) + 'cqw;top:' + f(b[1]) + 'cqw;width:' + f(b[2]) + 'cqw;height:' + f(b[2]) + 'cqw" viewBox="0 0 100 100"><defs><path id="' + P + 'bt" d="M9 50 A41 41 0 0 1 91 50"/><path id="' + P + 'bb" d="M3.6 50 A46.4 46.4 0 0 0 96.4 50"/></defs>'
      + '<circle cx="50" cy="52" r="48.5" fill="rgba(0,0,0,.12)"/><circle cx="50" cy="50" r="49" fill="' + c.ring + '"/><circle cx="50" cy="50" r="39.5" fill="' + c.face + '"/>'
      + '<circle cx="50" cy="50" r="38" fill="none" stroke="' + c.ring + '" stroke-width=".8" stroke-dasharray="2 1.6"/>'
      + '<text font-family="Nunito,sans-serif" font-size="8.6" font-weight="900" letter-spacing="1.25" fill="' + c.ink + '" text-anchor="middle"><textPath href="#' + P + 'bt" startOffset="50%">PARENT TALK CAFÉ</textPath></text>'
      + '<text font-family="Nunito,sans-serif" font-size="6.2" font-weight="800" letter-spacing="1.4" fill="' + c.ink + '" text-anchor="middle"><textPath href="#' + P + 'bb" startOffset="50%">MONTHLY CHAT</textPath></text>'
      + '<circle cx="6" cy="50" r="1.8" fill="' + c.ink + '"/><circle cx="94" cy="50" r="1.8" fill="' + c.ink + '"/>'
      + '<ellipse cx="50" cy="76" rx="23" ry="4.6" fill="' + c.saucer + '"/><ellipse cx="50" cy="75" rx="15" ry="2.4" fill="rgba(0,0,0,.12)"/>'
      + '<path d="M67 53 q10 -1 9.5 7.5 q-.5 7.5 -12 8" fill="none" stroke="' + c.cup + '" stroke-width="3.4" stroke-linecap="round"/>'
      + '<path d="M30 50 H70 L67 64 Q64.5 75 55 75 H45 Q35.5 75 33 64 Z" fill="' + c.cup + '"/>'
      + '<ellipse cx="50" cy="50" rx="20" ry="3.8" fill="' + c.coffee + '" stroke="' + c.cup + '" stroke-width="1.4"/>'
      + '<path d="M44 60 c0 -3 6 -3 6 0 c0 -3 6 -3 6 0 c0 4 -6 7 -6 8 c0 -1 -6 -4 -6 -8z" fill="' + c.heart + '"/>'
      + ['M41 44 q-4 -5 0 -10 q4 -5 0 -10', 'M50 43 q-4 -5 0 -10 q4 -5 0 -11', 'M59 44 q-4 -5 0 -10 q4 -5 0 -10'].map(function (d) {
        return '<path d="' + d + '" fill="none" stroke="' + c.steam + '" stroke-width="2.6" stroke-linecap="round"/>'; }).join('')
      + '</svg>';
  }


  var SYR = ['#ff4f7b', '#ff9f1c', '#ffd23d', '#5cc96b', '#3fa7ff', '#9b6bff'];
  function awning(h, sc) { // stripes + scallops, top bar
    var o = '', n = 12, w = 100 / n;
    for (var i = 0; i < n; i++) {
      var col = i % 2 ? '#ffffff' : SYR[(i / 2) % 6], x = i * w;
      o += '<path d="M' + f(x) + ' 0 H' + f(x + w) + ' V' + f(h) + ' A' + f(w / 2) + ' ' + f(sc) + ' 0 0 1 ' + f(x) + ' ' + f(h) + ' Z" fill="' + col + '" stroke="rgba(91,58,158,.18)" stroke-width=".25"/>';
    }
    o += '<path d="M0 ' + f(h + sc * 0.2) + ' H100" stroke="rgba(70,41,127,.12)" stroke-width="' + f(sc * 0.5) + '"/>';
    o += '<rect x="0" y="0" width="100" height="' + f(h * 0.14) + '" fill="#5b3a9e"/><rect x="0" y="' + f(h * 0.14) + '" width="100" height="' + f(h * 0.05) + '" fill="rgba(70,41,127,.25)"/>';
    for (i = 0; i < n; i++) o += '<path d="M' + f(i * w + w * 0.15) + ' ' + f(h * 0.3) + ' V' + f(h * 0.9) + '" stroke="rgba(255,255,255,.35)" stroke-width="' + f(w * 0.08) + '" stroke-linecap="round"/>';
    return o;
  }
  function dome(cx, rimY, rx, ry, R, cols) {
    var o = '', k = cols || [SYR[0], SYR[2], SYR[4]];
    function pt(a) { a = a * Math.PI / 180; return f(cx + rx * Math.cos(a)) + ' ' + f(rimY - ry * Math.sin(a)); }
    [[180, 120], [120, 60], [60, 0]].forEach(function (s, i) {
      o += '<path d="M' + f(cx) + ' ' + f(rimY) + ' L' + pt(s[0]) + ' A' + f(rx) + ' ' + f(ry) + ' 0 0 1 ' + pt(s[1]) + ' Z" fill="' + k[i] + '"/>';
    });
    o += '<path d="M' + f(cx - rx * 0.75) + ' ' + f(rimY - ry * 0.45) + ' Q' + f(cx - rx * 0.45) + ' ' + f(rimY - ry * 0.95) + ' ' + f(cx) + ' ' + f(rimY - ry * 0.98) + '" stroke="rgba(255,255,255,.55)" stroke-width="' + f(rx * 0.1) + '" fill="none" stroke-linecap="round"/>';
    for (var i = 0; i < 9; i++) { var a = R() * Math.PI, rr = R() * 0.8; o += '<circle cx="' + f(cx + Math.cos(a) * rx * rr) + '" cy="' + f(rimY - Math.sin(a) * ry * rr - 0.2) + '" r="' + f(rx * 0.035) + '" fill="#fff" opacity=".75"/>'; }
    return o;
  }
  function cup(cx, top, w, h, R, opt) { // paper cup + rainbow dome + drips + spoon straw; text area = middle of body
    opt = opt || {};
    var bw = w * 0.76, o = '', band = opt.band || '#ff4f7b';
    var body = 'M' + f(cx - w / 2) + ' ' + f(top) + ' L' + f(cx + w / 2) + ' ' + f(top) + ' L' + f(cx + bw / 2) + ' ' + f(top + h) + ' L' + f(cx - bw / 2) + ' ' + f(top + h) + ' Z';
    var rx = w * 0.53, ry = Math.min(w * 0.42, h * 0.38);
    // spoon straw behind the dome
    var sx = cx + w * 0.18, sl = opt.sl || 1;
    o += '<path d="M' + f(sx) + ' ' + f(top - ry * 0.4) + ' L' + f(sx + w * 0.22) + ' ' + f(top - ry * 1.45 * sl) + '" stroke="' + (opt.straw || '#3fa7ff') + '" stroke-width="' + f(w * 0.05) + '" stroke-linecap="round"/>'
      + '<ellipse cx="' + f(sx + w * 0.24) + '" cy="' + f(top - ry * 1.52 * sl) + '" rx="' + f(w * 0.06) + '" ry="' + f(w * 0.035) + '" fill="' + (opt.straw || '#3fa7ff') + '" transform="rotate(-30 ' + f(sx + w * 0.24) + ' ' + f(top - ry * 1.52 * sl) + ')"/>';
    o += dome(cx, top + 0.2, rx, ry, R, opt.cols);
    o += '<path d="' + body + '" fill="rgba(70,41,127,.16)" transform="translate(.6 .8)"/><path d="' + body + '" fill="' + (opt.fill || '#ffffff') + '" stroke="#e8dff5" stroke-width=".25"/>';
    var bh = h * 0.13;
    o += '<path d="M' + f(cx - w / 2) + ' ' + f(top) + ' L' + f(cx + w / 2) + ' ' + f(top) + ' L' + f(cx + w / 2 - (w - bw) / 2 * bh / h) + ' ' + f(top + bh) + ' L' + f(cx - w / 2 + (w - bw) / 2 * bh / h) + ' ' + f(top + bh) + ' Z" fill="' + band + '"/>';
    var y2 = top + h - bh * 0.7;
    o += '<path d="M' + f(cx - w / 2 + (w - bw) / 2 * (y2 - top) / h) + ' ' + f(y2) + ' L' + f(cx + w / 2 - (w - bw) / 2 * (y2 - top) / h) + ' ' + f(y2) + ' L' + f(cx + bw / 2) + ' ' + f(top + h) + ' L' + f(cx - bw / 2) + ' ' + f(top + h) + ' Z" fill="' + band + '"/>';
    // syrup drips over the rim band only
    [-0.32, 0.05, 0.3].forEach(function (d, i) {
      var x = cx + d * w, c = (opt.cols || [SYR[0], SYR[2], SYR[4]])[i], dl = bh * (0.75 + 0.2 * i);
      o += '<path d="M' + f(x - w * 0.045) + ' ' + f(top) + ' V' + f(top + dl) + ' a' + f(w * 0.045) + ' ' + f(w * 0.045) + ' 0 0 0 ' + f(w * 0.09) + ' 0 V' + f(top) + ' Z" fill="' + c + '"/>';
    });
    return o;
  }
  function boardShape(x, y, w, h) {
    return '<rect x="' + f(x + 0.6) + '" y="' + f(y + 1) + '" width="' + f(w) + '" height="' + f(h) + '" rx="2" fill="rgba(70,41,127,.18)"/>'
      + '<rect x="' + f(x) + '" y="' + f(y) + '" width="' + f(w) + '" height="' + f(h) + '" rx="2" fill="#5b3a9e"/>'
      + '<rect x="' + f(x + 1) + '" y="' + f(y + 1) + '" width="' + f(w - 2) + '" height="' + f(h - 2) + '" rx="1.3" fill="#fffdf8"/>'
      + '<rect x="' + f(x + 2) + '" y="' + f(y + 2) + '" width="' + f(w - 4) + '" height="' + f(h - 4) + '" rx="1" fill="none" stroke="#d9cdf0" stroke-width=".3" stroke-dasharray="1.2 .8"/>';
  }

  var BADGE = { ring: '#ff4f7b', face: '#fffaf3', ink: '#fffdf6', cup: '#3fa7ff', coffee: '#7a4a2a', saucer: '#ffd23d', heart: '#fffaf3', steam: '#b49bf0' };

  var L = {
    lh: { H: 129.41, aw: [13, 3.6], logo: [4.5, 3, 15, 15], badge: [77.5, 2.5, 19.5], kick: [20, 20.6, 60, 1.4], title: [8, 23.4, 84, 9.4], mon: [10, 34.4, 80, 4.8],
      board: [9, 41.2, 82, 31.6], cups1: [[50, 0, 27, 20.2]], cups2: [[28.5, 0, 26, 20.2], [71.5, 0, 26, 20.2]], deco1: [[15, 0, 16, 13], [85, 0, 16, 13]], deco2: [[50, 0, 11, 10]],
      shelf: 101, where: [5, 103.2, 90, 1.75], foot: 107.8 },
    lp: { H: 129.41, aw: [12, 3.4], logo: [4, 2.6, 22, 13], badge: [78, 2.4, 18.5], kick: [20, 18.8, 60, 1.3], title: [8, 21.4, 84, 7.8], mon: [10, 30.6, 80, 4.2],
      board: [6, 36.2, 88, 24.6], head: [5, 61.2, 90, 4.1],
      zc: [[13.5, 71.2], [37.8, 71.2], [62.2, 71.2], [86.5, 71.2], [25.6, 92.4], [50, 92.4], [74.4, 92.4]], zw: 19.6, zh: 13.6,
      shelves: [84.8, 106], where: [5, 108.2, 90, 1.7], foot: 112.2 },
    sh: { H: 100, aw: [10.5, 2.8], logo: [3.5, 2.2, 11.5, 11.5], badge: [81, 2, 16.5], kick: [17, 15.6, 66, 1.15], title: [10, 17.8, 80, 6.6], mon: [10, 26.4, 80, 3.6],
      board: [4, 34, 56, 41], cups1: [[79, 55, 22, 18.5]], cups2: [[70.5, 55, 17, 18.5], [89.5, 55, 17, 18.5]],
      shelf: 75.2, where: [3, 78.2, 94, 1.45], foot: 83.6 },
    sp: { H: 100, aw: [10.5, 2.8], logo: [3.5, 2.2, 18, 10.6], badge: [81, 2, 16.5], kick: [22, 15.4, 56, 1.15], title: [10, 17.6, 80, 6], mon: [10, 25.4, 80, 3.4],
      board: [5, 30.8, 90, 17.2],
      zc: [[13, 54.4], [37.7, 54.4], [62.3, 54.4], [87, 54.4], [25.3, 70.4], [50, 70.4], [74.7, 70.4]], zw: 17, zh: 10.4,
      shelves: [64.8, 80.8], where: [3, 82.6, 94, 1.35], foot: 86 }
  };

  var css = [
    '.p07{container-type:inline-size;aspect-ratio:8.5/11;position:relative;overflow:hidden;border-radius:4px;box-shadow:0 10px 30px rgba(70,41,127,.25);background:#fffaf3;font-family:Nunito,Poppins,sans-serif;color:#46297f}',
    '.p07.sq{aspect-ratio:1/1}',
    '.p07>svg.p07-bg{position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:1}',
    '.p07>div,.p07>svg.p07-badge{position:absolute;z-index:3}',
    '.p07 .p07-logo{background:#fff;border-radius:50%;display:grid;place-items:center;box-shadow:0 0 0 .6cqw #5b3a9e,0 .8cqw 1.6cqw rgba(70,41,127,.22)}',
    '.p07 .p07-logo img{width:78%}.p07 .p07-logo.p07-pip{border-radius:2cqw}.p07 .p07-logo.p07-pip img{width:90%}',
    '.p07 .p07-k{text-align:center;font-weight:900;letter-spacing:.18em;color:#ff4f7b;line-height:1.3}',
    '.p07 .p07-t{text-align:center;font-family:Chewy,Fredoka,sans-serif;font-weight:400;line-height:1.1;color:#5b3a9e;white-space:nowrap;letter-spacing:.01em}',
    '.p07 .p07-t span{color:#ff4f7b}',
    '.p07 .p07-m{display:flex;justify-content:center;align-items:center;gap:.5em;line-height:1.1}',
    '.p07 .p07-m b{font-family:Fredoka,sans-serif;font-weight:700;color:#3fa7ff}',
    '.p07 .p07-m i{font-style:normal;font-weight:900;font-size:.38em;letter-spacing:.18em;background:#5cc96b;color:#fff;border-radius:2em;padding:.5em 1em .45em}',
    '.p07 .p07-bd2{display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;box-sizing:border-box}',
    '.p07 .p07-lb{font-weight:900;letter-spacing:.2em;color:#fff;background:#5b3a9e;border-radius:2em;padding:.4em 1.2em .35em;line-height:1;margin-bottom:.8em}',
    '.p07 .p07-tp{font-family:Fredoka,sans-serif;font-weight:700;line-height:1.08;color:#46297f}',
    '.p07 .p07-tp em{font-style:normal;color:#fff;border-radius:50%;display:inline-grid;place-items:center;width:1.12em;height:1.12em;font-size:.62em;vertical-align:.2em;margin-right:.35em}',
    '.p07 .p07-ds{font-weight:800;font-style:italic;color:#e0386a;line-height:1.2;margin-top:.4em}',
    '.p07 .p07-pr{font-weight:800;color:#1f6fc0;line-height:1.2;margin-top:.75em;background:#e3f1ff;border-radius:2em;padding:.35em 1.1em}',
    '.p07 .p07-pr b{font-weight:900;color:#17508c}',
    '.p07 .p07-dt{display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;line-height:1}',
    '.p07 .p07-dt>div{flex:none}',
    '.p07 .p07-dt .w{font-weight:900;letter-spacing:.2em;color:#ff4f7b;line-height:1.3}',
    '.p07 .p07-dt .d{font-family:Fredoka,sans-serif;font-weight:700;color:#46297f;line-height:1.05}',
    '.p07 .p07-dt .t{font-weight:900;color:#1f6fc0;margin-top:.35em;line-height:1.15}',
    '.p07 .p07-h{text-align:center;font-family:Chewy,cursive;color:#ff4f7b;line-height:1.1}',
    '.p07 .p07-z{display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;line-height:1.1}',
    '.p07 .p07-z>div{flex:none}',
    '.p07 .p07-z .i{font-weight:900;color:#46297f}.p07 .p07-z .y{font-weight:700;color:#7a64a8;margin:.15em 0 .3em}',
    '.p07 .p07-z .tm{font-family:Fredoka,sans-serif;font-weight:700;color:#e0386a;line-height:1.05}',
    '.p07 .p07-w{text-align:center;font-weight:800;font-style:italic;color:#5b3a9e;line-height:1.2}',
    '.p07 .p07-w b{color:#ff4f7b}',
    '.p07 .p07-f{display:flex;align-items:center;gap:2.4cqw;color:#fff}',
    '.p07 .p07-rg{flex:1;line-height:1.3;font-weight:700;color:#ece4fb}',
    '.p07 .p07-rg b{display:block;font-weight:900;color:#fff;line-height:1.1;margin-bottom:.25em}.p07 .p07-rg b i{font-style:normal;color:#ffd23d}',
    '.p07 .p07-qr{background:#fff;border-radius:1cqw;padding:.7cqw;box-sizing:border-box;display:grid;place-items:center;flex:none}',
    '.p07 .p07-qr img{width:100%;height:100%;display:block}.p07 .p07-qr span{color:#46297f;font-weight:900;font-size:2.4cqw}',
    '.p07 .p07-bd{display:flex;flex-direction:column;gap:.6cqw;flex:none}',
    '.p07 .p07-bd span{background:#fff;color:#46297f;border-radius:2cqw;padding:.45em 1.1em;font-weight:800;text-align:center;white-space:nowrap}'
  ].join('\n');

  function fn(spec, partner, sq, H) {
    var V = L[(sq ? 's' : 'l') + (partner ? 'p' : 'h')], S = spec.sessions.map(H.sessInfo), n = S.length;
    var R = rnd(spec.month * 41 + (sq ? 7 : 0) + (partner ? 3 : 0) + n);
    var svg = '<defs><linearGradient id="p07ft" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6442ad"/><stop offset="1" stop-color="#46297f"/></linearGradient>'
      + '<linearGradient id="p07wall" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff7ef"/><stop offset="1" stop-color="#fffdf9"/></linearGradient></defs>';
    svg += '<rect width="100" height="' + V.H + '" fill="url(#p07wall)"/>';
    for (var x = 10; x < 100; x += 10) svg += '<path d="M' + x + ' 0 V' + f(V.H) + '" stroke="rgba(91,58,158,.045)" stroke-width=".35"/>';
    // stand posts
    svg += '<rect x="0" y="0" width="2.2" height="' + f(V.H) + '" fill="#efe6fb"/><rect x="97.8" y="0" width="2.2" height="' + f(V.H) + '" fill="#efe6fb"/>';
    var html = '', fy = V.foot;
    var g = V.board;
    // strings from awning to menu board

    svg += boardShape(g[0], g[1], g[2], g[3]);

    svg += awning(V.aw[0], V.aw[1]);

    // shelves / counter
    function shelf(y) { return '<rect x="0" y="' + f(y + 0.5) + '" width="100" height="1.8" fill="rgba(70,41,127,.12)"/><rect x="0" y="' + f(y) + '" width="100" height="1.8" fill="#ff4f7b"/><rect x="0" y="' + f(y) + '" width="100" height=".45" fill="#ff8aa8"/>'; }

    var lg = V.logo;
    html += box(P + '-logo' + (partner ? ' ' + P + '-pip' : ''), lg[0], lg[1], lg[2], lg[3], '<img src="' + (partner ? spec.pipUrl : spec.logoUrl) + '" alt="">');
    html += badge(BADGE, V.badge);
    var k = V.kick;
    html += box(P + '-k', k[0], k[1], k[2], null, partner ? 'FOR FAMILIES ACROSS THE PACIFIC' : 'PARENT TRAINING &amp; INFORMATION CENTER', 'font-size:' + k[3] + 'cqw');
    var t = V.title;
    html += box(P + '-t', t[0], t[1], t[2], null, H.seriesTitle(spec.series), 'font-size:' + f(Math.min(t[3], t[2] / (H.esc(spec.series).length * 0.5))) + 'cqw');
    var m = V.mon;
    html += box(P + '-m', m[0], m[1], m[2], null, '<b>' + H.MONTHS[spec.month - 1] + ' ' + spec.year + '</b><i>ON ZOOM</i>', 'font-size:' + m[3] + 'cqw');

    // menu board text
    var noLb = sq && partner;
    var lesson = function (x) { return x.replace(/(\S+-\S+)/g, '<span style="white-space:nowrap">$1</span>'); };
    var pres = spec.presenter ? '<div class="' + P + '-pr" style="font-size:' + f(sq ? 1.55 : 1.85) + 'cqw">Presented by <b>' + H.esc(spec.presenter) + '</b></div>' : '';
    var inner = noLb ? '' : '<div class="' + P + '-lb" style="font-size:' + (sq ? 1.1 : 1.3) + 'cqw">' + (n > 1 ? 'ON THE MENU THIS MONTH' : 'TODAY\'S FLAVOR') + '</div>';
    var iw = g[2] - 8;
    if (n === 1) {
      inner += '<div class="' + P + '-tp" style="font-size:' + f(fit(S[0].lesson, iw, sq ? (partner ? 2 : 4) : (partner ? 2 : 3), sq ? (partner ? 3.6 : 4.6) : (partner ? 4.7 : 5.3), 0.5)) + 'cqw">' + lesson(S[0].lesson) + '</div>'
        + (S[0].desc ? '<div class="' + P + '-ds" style="font-size:' + f(sq ? 1.65 : 2.05) + 'cqw">' + S[0].desc + '</div>' : '') + pres;
    } else {
      var lf = Math.min.apply(null, S.map(function (s) { return fit(s.lesson, iw - 4, sq ? 3 : 2, sq ? 3.4 : (partner ? 3.6 : 4.6), 0.5); }));
      S.forEach(function (s, i) {
        inner += '<div class="' + P + '-tp" style="font-size:' + f(lf) + 'cqw;margin-top:' + (i ? '.45em' : '0') + '"><em style="background:' + (i ? '#3fa7ff' : '#ff4f7b') + '">' + (i + 1) + '</em>' + lesson(s.lesson) + '</div>'
          + (s.desc && !sq ? '<div class="' + P + '-ds" style="font-size:' + f(partner ? 1.65 : 1.85) + 'cqw;margin-top:.2em">' + s.desc + '</div>' : '');
      });
      inner += pres;
    }
    html += box(P + '-bd2', g[0] + 3, g[1] + 2.4, g[2] - 6, g[3] - 4.8, inner);

    var CUPC = [{ band: '#ff4f7b', straw: '#3fa7ff', cols: [SYR[0], SYR[2], SYR[4]] }, { band: '#3fa7ff', straw: '#ff9f1c', cols: [SYR[5], SYR[1], SYR[3]] },
      { band: '#5cc96b', straw: '#ff4f7b', cols: [SYR[1], SYR[0], SYR[2]] }, { band: '#9b6bff', straw: '#5cc96b', cols: [SYR[4], SYR[3], SYR[0]] },
      { band: '#ff9f1c', straw: '#9b6bff', cols: [SYR[2], SYR[5], SYR[4]] }];
    if (!partner) {
      if (V.shelf) svg += shelf(V.shelf);
      var DC = n > 1 ? V.deco2 : V.deco1;
      (DC || []).forEach(function (d, i) { svg += cup(d[0], V.shelf - d[3], d[2], d[3], R, CUPC[(i + 2) % 5]); });
      var CP = n > 1 ? V.cups2 : V.cups1;
      S.forEach(function (s, i) {
        var q = CP[i], top = V.shelf - q[3], kk = q[2] / 26;
        svg += cup(q[0], top, q[2], q[3], R, Object.assign({ sl: sq ? 1 : 0.72 }, CUPC[i]));
        var bw = q[2] * 0.82;
        html += box(P + '-dt', q[0] - bw / 2, top + q[3] * 0.15, bw, q[3] * 0.72,
          '<div class="w" style="font-size:' + f(1.5 * kk) + 'cqw">' + (n > 1 ? 'TOPIC ' + (i + 1) + ' &middot; ' : '') + s.dow.toUpperCase() + '</div>'
          + '<div class="d" style="font-size:' + f((n > 1 ? 5.4 : 5.8) * kk) + 'cqw">' + s.mon + ' ' + s.day + '</div>'
          + '<div class="t" style="font-size:' + f(1.85 * kk) + 'cqw">' + s.time + '</div>');
      });
    } else {
      var hd = V.head;
      if (hd) html += box(P + '-h', hd[0], hd[1], hd[2], null, 'Find your local time', 'font-size:' + hd[3] + 'cqw');
      V.shelves.forEach(function (y) { svg += shelf(y); });
      var rows = H.zoneRows(spec.sessions), zw = V.zw, zh = V.zh, zk = zw / 19.6;
      rows.forEach(function (r, i) {
        var p = V.zc[i], top = p[1];
        svg += cup(p[0], top, zw, zh, R, Object.assign({ sl: 0.6 }, r.home ? { band: '#ffd23d', fill: '#fff6c9', straw: '#ff4f7b', cols: [SYR[0], SYR[1], SYR[2]] } : CUPC[i % 5]));
        var tm = r.time.split(' / '), bw = zw * 0.8;
        html += box(P + '-z', p[0] - bw / 2, top + zh * 0.14, bw, zh * 0.72,
          '<div class="i" style="font-size:' + f(1.45 * zk) + 'cqw">' + r.label + '</div><div class="y" style="font-size:' + f(1.2 * zk) + 'cqw">' + r.days + '</div>'
          + '<div class="tm" style="font-size:' + f((tm.length > 1 ? 1.75 : 2.5) * zk) + 'cqw">' + tm.join('<br>') + '</div>');
      });
    }

    var wh = V.where;
    html += box(P + '-w', wh[0], wh[1], wh[2], null, H.PTC_WHERE.replace('@ Parent Talk Café', '@ <b>Parent Talk Café</b>'), 'font-size:' + wh[3] + 'cqw');

    // footer: grape stand base with a rainbow trim
    svg += '<rect x="0" y="' + f(fy) + '" width="100" height="' + f(V.H - fy + 1) + '" fill="url(#p07ft)"/>';
    SYR.forEach(function (c, i) { svg += '<rect x="' + f(i * 100 / 6) + '" y="' + f(fy) + '" width="' + f(100 / 6 + 0.1) + '" height="1" fill="' + c + '"/>'; });
    var fs = sq ? 0.8 : 1, qy = fy + (sq ? 2.6 : 3.4), qh = V.H - qy - (sq ? 1.8 : 2.6);
    html += box(P + '-f', 5, qy, 90, qh,
      '<div class="' + P + '-rg" style="font-size:' + f(1.95 * fs) + 'cqw"><b style="font-size:' + f(3.3 * fs) + 'cqw">REGISTER at <i>LDAHawaii.org</i></b>Get your Zoom link, scan the QR code,' + (sq ? ' ' : '<br>') + 'or call ' + H.phone(partner) + '</div>'
      + '<div class="' + P + '-qr" style="width:' + (sq ? 10 : 11) + 'cqw;height:' + (sq ? 10 : 11) + 'cqw">' + H.qrImg(spec, partner) + '</div>'
      + '<div class="' + P + '-bd" style="font-size:' + f(1.45 * fs) + 'cqw">' + H.badges(spec, partner) + '</div>');

    return '<div class="' + P + (sq ? ' sq' : '') + (partner ? ' partner' : '') + '"><svg class="' + P + '-bg" viewBox="0 0 100 ' + V.H + '" preserveAspectRatio="none">' + svg + '</svg>' + html + '</div>';
  }

  return { name: 'Shave ice stand (rainbow awning, menu board, shave-ice cups)', fonts: 'family=Nunito:wght@600;700;800;900&family=Chewy&family=Fredoka:wght@500;600;700', css: css, fn: fn };
})(), 'ptc');

/* ---- PTC month 08 ---- */
VEBFlyers.registerTheme(8, (function () {
  /* PTC August: "Café order ticket" - kraft paper counter, blue ballpoint ink, a coffee-ring stain. The topic is
     written on a big café receipt at a jaunty angle beside a takeaway cup; partner local times are order tickets
     hanging from a stainless ticket rail, each time stamped in blue ink (Hawaiʻi on a yellow ticket). */
  var P = 'p08';
  function f(n) { return (Math.round(n * 100) / 100).toString(); }
  function box(cls, x, y, w, h, inner, extra) {
    return '<div class="' + cls + '" style="left:' + f(x) + 'cqw;top:' + f(y) + 'cqw;width:' + f(w) + 'cqw;' + (h != null ? 'height:' + f(h) + 'cqw;' : '') + (extra || '') + '">' + inner + '</div>';
  }
  function fit(t, w, lines, maxF, k) { // font size (cqw) so text t wraps into <= lines in width w
    t = String(t).replace(/&amp;/g, '&').replace(/&[a-z]+;/g, 'x');
    var lw = Math.max.apply(null, t.split(/\s+/).map(function (s) { return s.length; }));
    return Math.min(maxF, w * lines / (t.length * k * 1.18), w / (lw * k * 1.1));
  }
  function rnd(seed) { var s = seed; return function () { s = (s * 9301 + 49297) % 233280; return s / 233280; }; }

  /* recurring series mark: round PARENT TALK CAFE badge with a steaming cup */
  function badge(c, b) {
    return '<svg class="' + P + '-badge" style="left:' + f(b[0]) + 'cqw;top:' + f(b[1]) + 'cqw;width:' + f(b[2]) + 'cqw;height:' + f(b[2]) + 'cqw" viewBox="0 0 100 100"><defs><path id="' + P + 'bt" d="M9 50 A41 41 0 0 1 91 50"/><path id="' + P + 'bb" d="M3.6 50 A46.4 46.4 0 0 0 96.4 50"/></defs>'
      + '<circle cx="50" cy="52" r="48.5" fill="rgba(0,0,0,.12)"/><circle cx="50" cy="50" r="49" fill="' + c.ring + '"/><circle cx="50" cy="50" r="39.5" fill="' + c.face + '"/>'
      + '<circle cx="50" cy="50" r="38" fill="none" stroke="' + c.ring + '" stroke-width=".8" stroke-dasharray="2 1.6"/>'
      + '<text font-family="Nunito,sans-serif" font-size="8.6" font-weight="900" letter-spacing="1.25" fill="' + c.ink + '" text-anchor="middle"><textPath href="#' + P + 'bt" startOffset="50%">PARENT TALK CAFÉ</textPath></text>'
      + '<text font-family="Nunito,sans-serif" font-size="6.2" font-weight="800" letter-spacing="1.4" fill="' + c.ink + '" text-anchor="middle"><textPath href="#' + P + 'bb" startOffset="50%">MONTHLY CHAT</textPath></text>'
      + '<circle cx="6" cy="50" r="1.8" fill="' + c.ink + '"/><circle cx="94" cy="50" r="1.8" fill="' + c.ink + '"/>'
      + '<ellipse cx="50" cy="76" rx="23" ry="4.6" fill="' + c.saucer + '"/><ellipse cx="50" cy="75" rx="15" ry="2.4" fill="rgba(0,0,0,.12)"/>'
      + '<path d="M67 53 q10 -1 9.5 7.5 q-.5 7.5 -12 8" fill="none" stroke="' + c.cup + '" stroke-width="3.4" stroke-linecap="round"/>'
      + '<path d="M30 50 H70 L67 64 Q64.5 75 55 75 H45 Q35.5 75 33 64 Z" fill="' + c.cup + '"/>'
      + '<ellipse cx="50" cy="50" rx="20" ry="3.8" fill="' + c.coffee + '" stroke="' + c.cup + '" stroke-width="1.4"/>'
      + '<path d="M44 60 c0 -3 6 -3 6 0 c0 -3 6 -3 6 0 c0 4 -6 7 -6 8 c0 -1 -6 -4 -6 -8z" fill="' + c.heart + '"/>'
      + ['M41 44 q-4 -5 0 -10 q4 -5 0 -10', 'M50 43 q-4 -5 0 -10 q4 -5 0 -11', 'M59 44 q-4 -5 0 -10 q4 -5 0 -10'].map(function (d) {
        return '<path d="' + d + '" fill="none" stroke="' + c.steam + '" stroke-width="2.6" stroke-linecap="round"/>'; }).join('')
      + '</svg>';
  }


  function zig(x0, x1, y, amp, n, down) { // zigzag edge points from x0 to x1
    var o = '', st = (x1 - x0) / n;
    for (var i = 1; i <= n; i++) o += ' L' + f(x0 + st * (i - 0.5)) + ' ' + f(y + (down ? amp : -amp)) + ' L' + f(x0 + st * i) + ' ' + f(y);
    return o;
  }
  function receiptPath(x, y, w, h, amp) {
    var n = Math.round(w / 2.2);
    return 'M' + f(x) + ' ' + f(y) + zig(x, x + w, y, amp, n, false) + ' L' + f(x + w) + ' ' + f(y + h)
      + zig(x + w, x, y + h, -amp, n, false).replace(/L/g, 'L') + ' Z';
  }
  function barcode(x, y, w, h, R) {
    var o = '', cx = x;
    while (cx < x + w) { var bw = 0.18 + R() * 0.55; if (cx + bw > x + w) break; o += '<rect x="' + f(cx) + '" y="' + f(y) + '" width="' + f(bw) + '" height="' + f(h) + '" fill="#2b2420"/>'; cx += bw + 0.2 + R() * 0.45; }
    return o;
  }
  function stain(cx, cy, r, R) {
    var o = '<g opacity=".5">';
    o += '<circle cx="' + f(cx) + '" cy="' + f(cy) + '" r="' + f(r) + '" fill="none" stroke="#8a5a2b" stroke-width="' + f(r * 0.07) + '" stroke-dasharray="' + f(r * 1.6) + ' ' + f(r * 0.25) + ' ' + f(r * 2.2) + ' ' + f(r * 0.4) + '"/>';
    o += '<circle cx="' + f(cx + r * 0.05) + '" cy="' + f(cy - r * 0.04) + '" r="' + f(r * 0.9) + '" fill="none" stroke="#a06d3a" stroke-width="' + f(r * 0.03) + '" opacity=".7"/>';
    o += '<circle cx="' + f(cx) + '" cy="' + f(cy) + '" r="' + f(r * 0.93) + '" fill="#a06d3a" opacity=".12"/>';
    o += '<circle cx="' + f(cx + r * 1.15) + '" cy="' + f(cy + r * 0.5) + '" r="' + f(r * 0.08) + '" fill="#8a5a2b"/><circle cx="' + f(cx + r * 1.3) + '" cy="' + f(cy + r * 0.62) + '" r="' + f(r * 0.04) + '" fill="#8a5a2b"/>';
    return o + '</g>';
  }
  function takeaway(cx, top, w, h) {
    var bw = w * 0.74, lidH = h * 0.11, o = '';
    var y0 = top + lidH;
    o += '<ellipse cx="' + f(cx + 1) + '" cy="' + f(top + h + 0.6) + '" rx="' + f(bw * 0.62) + '" ry="' + f(w * 0.06) + '" fill="rgba(59,42,32,.28)"/>';
    o += '<path d="M' + f(cx - w / 2) + ' ' + f(y0) + ' L' + f(cx + w / 2) + ' ' + f(y0) + ' L' + f(cx + bw / 2) + ' ' + f(top + h) + ' L' + f(cx - bw / 2) + ' ' + f(top + h) + ' Z" fill="#fbf8ef"/>';
    o += '<path d="M' + f(cx + w * 0.18) + ' ' + f(y0) + ' L' + f(cx + w / 2) + ' ' + f(y0) + ' L' + f(cx + bw / 2) + ' ' + f(top + h) + ' L' + f(cx + bw * 0.2) + ' ' + f(top + h) + ' Z" fill="rgba(59,42,32,.07)"/>';
    // sleeve
    var s0 = y0 + (h - lidH) * 0.3, s1 = y0 + (h - lidH) * 0.68;
    function hw(y) { return w / 2 - (w - bw) / 2 * (y - y0) / (top + h - y0); }
    o += '<path d="M' + f(cx - hw(s0) - 0.4) + ' ' + f(s0) + ' L' + f(cx + hw(s0) + 0.4) + ' ' + f(s0) + ' L' + f(cx + hw(s1) + 0.4) + ' ' + f(s1) + ' L' + f(cx - hw(s1) - 0.4) + ' ' + f(s1) + ' Z" fill="#b8875a"/>';
    for (var i = 1; i < 9; i++) { var yy = s0 + (s1 - s0) * i / 9; o += '<path d="M' + f(cx - hw(yy)) + ' ' + f(yy) + ' H' + f(cx + hw(yy)) + '" stroke="rgba(90,58,30,.25)" stroke-width=".2"/>'; }
    var hc = (s0 + s1) / 2, hs = w * 0.12;
    o += '<path d="M' + f(cx) + ' ' + f(hc + hs * 0.9) + ' C' + f(cx - hs * 1.6) + ' ' + f(hc - hs * 0.1) + ' ' + f(cx - hs * 0.7) + ' ' + f(hc - hs * 1.2) + ' ' + f(cx) + ' ' + f(hc - hs * 0.4) + ' C' + f(cx + hs * 0.7) + ' ' + f(hc - hs * 1.2) + ' ' + f(cx + hs * 1.6) + ' ' + f(hc - hs * 0.1) + ' ' + f(cx) + ' ' + f(hc + hs * 0.9) + 'Z" fill="#1f4fa8"/>';
    // lid
    o += '<rect x="' + f(cx - w / 2 - w * 0.04) + '" y="' + f(top + lidH * 0.45) + '" width="' + f(w * 1.08) + '" height="' + f(lidH * 0.55) + '" rx="' + f(lidH * 0.2) + '" fill="#3b2a20"/>';
    o += '<path d="M' + f(cx - w * 0.42) + ' ' + f(top + lidH * 0.5) + ' Q' + f(cx - w * 0.4) + ' ' + f(top) + ' ' + f(cx - w * 0.25) + ' ' + f(top) + ' H' + f(cx + w * 0.25) + ' Q' + f(cx + w * 0.4) + ' ' + f(top) + ' ' + f(cx + w * 0.42) + ' ' + f(top + lidH * 0.5) + ' Z" fill="#4a362a"/>';
    o += '<rect x="' + f(cx + w * 0.08) + '" y="' + f(top + lidH * 0.08) + '" width="' + f(w * 0.16) + '" height="' + f(lidH * 0.18) + '" rx=".3" fill="#2b1e17"/>';
    // steam
    [-0.2, 0.05, 0.3].forEach(function (d, i) {
      var x = cx + d * w, y = top - 1.2;
      o += '<path d="M' + f(x) + ' ' + f(y) + ' q' + f(-w * 0.1) + ' ' + f(-h * 0.08) + ' 0 ' + f(-h * 0.15) + ' q' + f(w * 0.1) + ' ' + f(-h * 0.07) + ' 0 ' + f(-h * 0.14) + '" fill="none" stroke="rgba(255,255,255,.75)" stroke-width="' + f(w * 0.05) + '" stroke-linecap="round" opacity="' + (i === 1 ? 1 : 0.8) + '"/>';
    });
    return o;
  }
  function ticket(x, y, w, h, rot, fill) {
    var cx = x + w / 2, cy = y + h / 2, n = Math.round(w / 2);
    var d = 'M' + f(x) + ' ' + f(y) + ' L' + f(x + w) + ' ' + f(y) + ' L' + f(x + w) + ' ' + f(y + h) + zig(x + w, x, y + h, -0.9, n, false) + ' Z';
    return '<g transform="rotate(' + f(rot) + ' ' + f(cx) + ' ' + f(y) + ')"><path d="' + d + '" fill="rgba(59,42,32,.22)" transform="translate(.5 .8)"/><path d="' + d + '" fill="' + fill + '"/>'
      + '<path d="M' + f(x + 1) + ' ' + f(y + h * 0.36) + ' H' + f(x + w - 1) + '" stroke="#b7ab95" stroke-width=".22" stroke-dasharray=".8 .6"/></g>';
  }
  function rail(y) {
    return '<rect x="0" y="' + f(y + 0.6) + '" width="100" height="2.4" fill="rgba(59,42,32,.25)"/><rect x="0" y="' + f(y - 1.2) + '" width="100" height="2.6" fill="url(#p08steel)"/>'
      + '<rect x="0" y="' + f(y - 1.2) + '" width="100" height=".5" fill="rgba(255,255,255,.7)"/>';
  }

  var BADGE = { ring: '#1f4fa8', face: '#fbf8ef', ink: '#fffdf6', cup: '#b8875a', coffee: '#3b2a20', saucer: '#c9a27a', heart: '#fbf8ef', steam: '#7d9bd6' };

  var L = {
    lh: { H: 129.41, logo: [4.5, 4.5, 15, 15], badge: [77.5, 3, 19.5], kick: [22, 5.6, 54, 1.4], title: [21, 9.4, 56, 7.4], mon: [21, 29, 56, 4.6],
      rc: [7, 37, 58, 64, -4], cup: [80.5, 58, 23, 38], stain: [82, 96.5, 10], where: [67, 100.6, 30, 1.6], foot: 108.2 },
    lp: { H: 129.41, logo: [4, 4.5, 22, 13], badge: [78, 3, 18.5], kick: [28, 5.4, 48, 1.3], title: [28, 8.8, 48, 6.6], mon: [28, 25.6, 48, 4.2],
      rc: [5, 31.6, 66, 29.4, -2.5], cup: [85.5, 37, 16, 25], stain: [83, 60, 6.5], head: [5, 63.2, 90, 3.6],
      r1: 68.6, r2: 88.2, tw: 21, th: 17, tk: [[14, 68], [38, 68], [62, 68], [86, 68], [26, 87.6], [50, 87.6], [74, 87.6]],
      where: [5, 106.2, 90, 1.7], foot: 110.2 },
    sh: { H: 100, logo: [3.5, 3.5, 11.5, 11.5], badge: [81, 2.5, 16.5], kick: [17, 4.4, 62, 1.15], title: [16, 7.6, 64, 6], mon: [16, 16.6, 64, 3.4], one: true,
      rc: [5, 24, 58, 56, -3.5], cup: [81, 31, 20, 33], stain: [83, 69, 8], where: [65, 74.5, 32, 1.4], foot: 84.2 },
    sp: { H: 100, logo: [3.5, 3.5, 18, 10.6], badge: [81, 2.5, 16.5], kick: [24, 4.6, 54, 1.1], title: [24, 7.8, 54, 5.2], mon: [24, 15.6, 54, 3.2], one: true,
      rc: [4, 22.4, 92, 18, -1.2], r1: 45.4, r2: 63, tw: 21, th: 14.6, tk: [[13, 44.8], [37.7, 44.8], [62.3, 44.8], [87, 44.8], [25.3, 62.4], [50, 62.4], [74.7, 62.4]],
      where: [3, 79, 94, 1.4], foot: 83.8 }
  };

  var css = [
    '.p08{container-type:inline-size;aspect-ratio:8.5/11;position:relative;overflow:hidden;border-radius:4px;box-shadow:0 10px 30px rgba(59,42,32,.3);background:#cfa77c;font-family:"Courier Prime","Courier New",monospace;color:#2b2420}',
    '.p08.sq{aspect-ratio:1/1}',
    '.p08>svg.p08-bg{position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:1}',
    '.p08>div,.p08>svg.p08-badge{position:absolute;z-index:3}',
    '.p08 .p08-logo{background:#fff;border-radius:50%;display:grid;place-items:center;box-shadow:0 0 0 .6cqw #1f4fa8,0 .8cqw 1.6cqw rgba(59,42,32,.25)}',
    '.p08 .p08-logo img{width:78%}.p08 .p08-logo.p08-pip{border-radius:2cqw}.p08 .p08-logo.p08-pip img{width:90%}',
    '.p08 .p08-k{text-align:center;font-weight:700;letter-spacing:.14em;color:#3b2a20;line-height:1.3}',
    '.p08 .p08-t{text-align:center;font-family:"Alfa Slab One",Georgia,serif;font-weight:400;line-height:1.08;color:#1f4fa8}',
    '.p08 .p08-t span{display:block;font-family:Kalam,cursive;font-weight:700;color:#3b2a20;font-size:1.25em;line-height:1.05;margin-top:-.05em}',
    '.p08.sq .p08-t span{display:inline;font-size:1.1em;margin:0;color:#1f4fa8;font-family:"Alfa Slab One",serif;font-weight:400}',
    '.p08 .p08-m{display:flex;justify-content:center;align-items:center;gap:.5em;line-height:1.15}',
    '.p08 .p08-m b{font-family:Kalam,cursive;font-weight:700;color:#2b2420}',
    '.p08 .p08-m i{font-style:normal;font-weight:700;font-size:.4em;letter-spacing:.16em;background:#1f4fa8;color:#fff;border-radius:.3em;padding:.45em .9em .4em}',
    '.p08 .p08-rc{display:flex;flex-direction:column;align-items:stretch;justify-content:center;text-align:center;box-sizing:border-box}',
    '.p08 .p08-rc>div{flex:none}',
    '.p08 .p08-hd{font-weight:700;letter-spacing:.24em;line-height:1.25;color:#2b2420}',
    '.p08 .p08-sub{letter-spacing:.06em;line-height:1.25;color:#6b5c4c}',
    '.p08 .p08-rule{border-top:.35cqw dashed #9c8f7c;margin:.8em 0}',
    '.p08 .p08-it{display:flex;justify-content:space-between;font-weight:700;letter-spacing:.06em;color:#6b5c4c;line-height:1.2;margin-bottom:.7em}',
    '.p08 .p08-tp{font-family:Kalam,cursive;font-weight:700;line-height:1.12;color:#1f4fa8}',
    '.p08 .p08-ds{font-family:Kalam,cursive;font-weight:400;color:#2f5fb8;line-height:1.15;margin-top:.15em}',
    '.p08 .p08-pr{font-weight:700;line-height:1.25;color:#2b2420;margin-top:.55em}',
    '.p08 .p08-pr b{color:#1f4fa8}',
    '.p08 .p08-dl{display:flex;flex-direction:column;align-items:center;font-weight:700;line-height:1.2;color:#2b2420}',
    '.p08 .p08-dl b{font-family:"Alfa Slab One",serif;font-weight:400;color:#1f4fa8;letter-spacing:.02em}',
    '.p08 .p08-h{text-align:center;font-family:Kalam,cursive;font-weight:700;color:#2b2420;line-height:1.1}',
    '.p08 .p08-z{display:flex;flex-direction:column;align-items:center;justify-content:flex-start;text-align:center;line-height:1.15}',
    '.p08 .p08-z>div{flex:none}',
    '.p08 .p08-z .i{font-weight:700;color:#2b2420}.p08 .p08-z .y{color:#6b5c4c;margin:.15em 0 0}',
    '.p08 .p08-z .tm{font-weight:700;color:#1f4fa8;border:.3cqw solid #1f4fa8;border-radius:.6cqw;padding:.2em .45em .15em;line-height:1.1;transform:rotate(-4deg);background:rgba(31,79,168,.06)}',
    '.p08 .p08-w{text-align:center;font-weight:700;color:#3b2a20;line-height:1.25}',
    '.p08 .p08-w b{color:#1f4fa8}',
    '.p08 .p08-f{display:flex;align-items:center;gap:2.4cqw;color:#fff;font-family:Nunito,Poppins,sans-serif}',
    '.p08 .p08-rg{flex:1;line-height:1.3;font-weight:700;color:#dbe5fb}',
    '.p08 .p08-rg b{display:block;font-weight:900;color:#fff;line-height:1.1;margin-bottom:.25em}.p08 .p08-rg b i{font-style:normal;color:#ffd77a}',
    '.p08 .p08-qr{background:#fff;border-radius:1cqw;padding:.7cqw;box-sizing:border-box;display:grid;place-items:center;flex:none}',
    '.p08 .p08-qr img{width:100%;height:100%;display:block}.p08 .p08-qr span{color:#1f4fa8;font-weight:900;font-size:2.4cqw}',
    '.p08 .p08-bd{display:flex;flex-direction:column;gap:.6cqw;flex:none}',
    '.p08 .p08-bd span{background:#fbf8ef;color:#1f4fa8;border-radius:2cqw;padding:.45em 1.1em;font-weight:800;text-align:center;white-space:nowrap}'
  ].join('\n');

  function fn(spec, partner, sq, H) {
    var V = L[(sq ? 's' : 'l') + (partner ? 'p' : 'h')], S = spec.sessions.map(H.sessInfo), n = S.length;
    var R = rnd(spec.month * 43 + (sq ? 7 : 0) + (partner ? 3 : 0) + n);
    var svg = '<defs><linearGradient id="p08steel" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#eef1f4"/><stop offset=".5" stop-color="#b9c0c8"/><stop offset="1" stop-color="#8d959e"/></linearGradient>'
      + '<radialGradient id="p08kr" cx=".5" cy=".4" r=".8"><stop offset="0" stop-color="#d8b48b"/><stop offset="1" stop-color="#c39a6e"/></radialGradient>'
      + '<linearGradient id="p08ft" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2459b8"/><stop offset="1" stop-color="#173f8a"/></linearGradient></defs>';
    svg += '<rect width="100" height="' + V.H + '" fill="url(#p08kr)"/>';
    for (var i = 0; i < (sq ? 70 : 100); i++) { // kraft fibres
      var x = R() * 100, y = R() * V.H, l = 0.6 + R() * 1.6, a = R() * 180;
      svg += '<path d="M' + f(x) + ' ' + f(y) + ' l' + f(Math.cos(a) * l) + ' ' + f(Math.sin(a) * l) + '" stroke="' + (i % 3 ? 'rgba(110,72,38,.22)' : 'rgba(255,240,215,.35)') + '" stroke-width=".18" stroke-linecap="round"/>';
    }
    var html = '', fy = V.foot;

    if (V.stain) svg += stain(V.stain[0], V.stain[1], V.stain[2], R);
    if (!sq && !partner) svg += stain(10, 31, 5.5, R);

    var lg = V.logo;
    html += box(P + '-logo' + (partner ? ' ' + P + '-pip' : ''), lg[0], lg[1], lg[2], lg[3], '<img src="' + (partner ? spec.pipUrl : spec.logoUrl) + '" alt="">');
    html += badge(BADGE, V.badge);
    var k = V.kick;
    html += box(P + '-k', k[0], k[1], k[2], null, partner ? 'FOR FAMILIES ACROSS THE PACIFIC' : 'PARENT TRAINING &amp; INFORMATION CENTER', 'font-size:' + k[3] + 'cqw');
    var t = V.title, tlen = H.esc(spec.series).length;
    html += box(P + '-t', t[0], t[1], t[2], null, H.seriesTitle(spec.series), 'font-size:' + f(V.one ? Math.min(t[3], t[2] / (tlen * 0.66)) : fit(spec.series, t[2], 1.25, t[3], 0.62)) + 'cqw');
    var m = V.mon;
    html += box(P + '-m', m[0], m[1], m[2], null, '<b>' + H.MONTHS[spec.month - 1] + ' ' + spec.year + '</b><i>ON ZOOM</i>', 'font-size:' + m[3] + 'cqw');

    // the receipt
    var g = V.rc, rx = g[0], ry = g[1], rw = g[2], rh = g[3], rcx = rx + rw / 2, rcy = ry + rh / 2, small = partner;
    var bcH = small ? 0 : (sq ? 3.2 : 4);
    svg += '<g transform="rotate(' + g[4] + ' ' + f(rcx) + ' ' + f(rcy) + ')"><path d="' + receiptPath(rx, ry, rw, rh, 0.9) + '" fill="rgba(59,42,32,.3)" transform="translate(.8 1.3)"/>'
      + '<path d="' + receiptPath(rx, ry, rw, rh, 0.9) + '" fill="#fbf8ef"/>'
      + (bcH ? barcode(rcx - rw * 0.3, ry + rh - bcH - 2, rw * 0.6, bcH, R) : '') + '</g>';
    var lesson = function (x) { return x.replace(/(\S+-\S+)/g, '<span style="white-space:nowrap">$1</span>'); };
    var base = sq ? 1.35 : (partner ? 1.45 : 1.8), iw = rw - 8;
    var on = 'ORDER No. ' + String(spec.month).padStart(2, '0') + String(S[0].day).padStart(2, '0');
    var inner = '';
    if (!small) inner += '<div class="' + P + '-hd" style="font-size:' + f(base * 1.15) + 'cqw">ORDER TICKET</div><div class="' + P + '-sub" style="font-size:' + f(base * 0.85) + 'cqw">' + on + ' &middot; FOR: ALL FAMILIES</div><div class="' + P + '-rule"></div>';
    var pres = spec.presenter ? '<div class="' + P + '-pr" style="font-size:' + f(base * 1.05) + 'cqw">Presented by <b>' + H.esc(spec.presenter) + '</b></div>' : '';
    var dline = function (s) { return partner ? '' : '<div class="' + P + '-dl" style="font-size:' + f(base * (n > 1 ? 1.05 : 1.2)) + 'cqw;margin-top:' + (n > 1 ? '.35em' : '0') + '"><b style="font-size:' + (n > 1 ? 1.4 : 1.75) + 'em">' + s.dow.toUpperCase() + ' ' + s.mon.toUpperCase() + ' ' + s.day + '</b><span>' + s.time + '</span></div>'; };
    if (n === 1) {
      var s0 = S[0];
      if (!small) inner += '<div class="' + P + '-it" style="font-size:' + f(base) + 'cqw"><span>1 x</span><span>THIS MONTH\'S TOPIC</span></div>';
      inner += '<div class="' + P + '-tp" style="font-size:' + f(fit(s0.lesson, iw, sq ? (partner ? 2 : 4) : (partner ? 2 : 4), sq ? (partner ? 3.8 : 4.4) : (partner ? 4.8 : 5.4), 0.48)) + 'cqw">' + lesson(s0.lesson) + '</div>'
        + (s0.desc ? '<div class="' + P + '-ds" style="font-size:' + f(base * 1.45) + 'cqw">' + s0.desc + '</div>' : '') + pres;
      if (!partner) inner += '<div class="' + P + '-rule"></div>' + dline(s0);
    } else {
      var lf = Math.min.apply(null, S.map(function (s) { return fit(s.lesson, iw, sq ? 2 : 2, sq ? (partner ? 3 : 3.8) : (partner ? 3.6 : 4.8), 0.48); }));
      S.forEach(function (s, i) {
        if (i) inner += '<div class="' + P + '-rule" style="margin:.6em 0"></div>';
        if (!small) inner += '<div class="' + P + '-it" style="font-size:' + f(base) + 'cqw"><span>' + (i + 1) + ' x</span><span>TOPIC ' + (i + 1) + '</span></div>';
        inner += '<div class="' + P + '-tp" style="font-size:' + f(lf) + 'cqw">' + (small ? (i + 1) + '. ' : '') + lesson(s.lesson) + '</div>'
          + (s.desc && !sq ? '<div class="' + P + '-ds" style="font-size:' + f(base * 1.3) + 'cqw">' + s.desc + '</div>' : '') + dline(s);
      });
      inner += pres;
    }
    var padX = 4, padT = small ? 2.2 : 3.4, padB = (bcH ? bcH + 3.4 : 2.2);
    html += box(P + '-rc', rx + padX, ry + padT, rw - padX * 2, rh - padT - padB, inner,
      'font-size:' + f(base) + 'cqw;transform-origin:' + f(rcx - rx - padX) + 'cqw ' + f(rcy - ry - padT) + 'cqw;transform:rotate(' + g[4] + 'deg)');

    if (V.cup) svg += takeaway(V.cup[0], V.cup[1], V.cup[2], V.cup[3]);

    if (partner) {
      var hd = V.head;
      if (hd) html += box(P + '-h', hd[0], hd[1], hd[2], null, 'Find your local time', 'font-size:' + hd[3] + 'cqw');
      var rows = H.zoneRows(spec.sessions), tw = V.tw, th = V.th, zk = th / 17;
      rows.forEach(function (r, i) {
        var p = V.tk[i], rot = [-2.5, 1.5, -1, 2.5, 1.5, -2, 2][i];
        svg += ticket(p[0] - tw / 2, p[1], tw, th, rot, r.home ? '#fff2a6' : '#fbf8ef');
        var tm = r.time.split(' / ');
        html += box(P + '-z', p[0] - tw / 2 + 0.8, p[1] + 2.4, tw - 1.6, th - 3.4,
          '<div class="i" style="font-size:' + f(1.55 * zk) + 'cqw">' + r.label + '</div><div class="y" style="font-size:' + f(1.3 * zk) + 'cqw">' + r.days + '</div>'
          + '<div class="tm" style="font-size:' + f((tm.length > 1 ? 1.75 : 2.6) * zk) + 'cqw;margin-top:' + (tm.length > 1 ? '.45em' : '.6em') + '">' + tm.join('<br>') + '</div>',
          'transform-origin:50% -' + f(2.4) + 'cqw;transform:rotate(' + rot + 'deg)');
      });
      svg += rail(V.r1) + rail(V.r2);
    }

    var wh = V.where;
    html += box(P + '-w', wh[0], wh[1], wh[2], null, H.PTC_WHERE.replace('@ Parent Talk Café', '@ <b>Parent Talk Café</b>'), 'font-size:' + wh[3] + 'cqw');

    // footer: blue ink band with a tear-off perforation
    svg += '<rect x="0" y="' + f(fy) + '" width="100" height="' + f(V.H - fy + 1) + '" fill="url(#p08ft)"/>';
    for (x = 1; x < 100; x += 2.5) svg += '<circle cx="' + f(x) + '" cy="' + f(fy + 1.1) + '" r=".45" fill="#cfa77c"/>';
    var fs = sq ? 0.8 : 1, qy = fy + (sq ? 2.8 : 3.6), qh = V.H - qy - (sq ? 1.8 : 2.6);
    html += box(P + '-f', 5, qy, 90, qh,
      '<div class="' + P + '-rg" style="font-size:' + f(1.95 * fs) + 'cqw"><b style="font-size:' + f(3.3 * fs) + 'cqw">REGISTER at <i>LDAHawaii.org</i></b>Get your Zoom link, scan the QR code,' + (sq ? ' ' : '<br>') + 'or call ' + H.phone(partner) + '</div>'
      + '<div class="' + P + '-qr" style="width:' + (sq ? 10 : 11) + 'cqw;height:' + (sq ? 10 : 11) + 'cqw">' + H.qrImg(spec, partner) + '</div>'
      + '<div class="' + P + '-bd" style="font-size:' + f(1.45 * fs) + 'cqw">' + H.badges(spec, partner) + '</div>');

    return '<div class="' + P + (sq ? ' sq' : '') + (partner ? ' partner' : '') + '"><svg class="' + P + '-bg" viewBox="0 0 100 ' + V.H + '" preserveAspectRatio="none">' + svg + '</svg>' + html + '</div>';
  }

  return { name: 'Café order ticket (kraft paper, receipt, takeaway cup, ticket rail)', fonts: 'family=Nunito:wght@600;700;800;900&family=Courier+Prime:wght@400;700&family=Kalam:wght@400;700&family=Alfa+Slab+One', css: css, fn: fn };
})(), 'ptc');

/* ---- PTC month 09 ---- */
VEBFlyers.registerTheme(9, {
  name: 'Pumpkin-spice flannel café (plaid awning, sandwich-board sign, mugs on a flannel runner)',
  fonts: 'family=Alfa+Slab+One&family=Nunito:wght@600;700;800;900&family=Caveat:wght@600;700',
  css: [
    '.p09{container-type:inline-size;aspect-ratio:8.5/11;position:relative;overflow:hidden;border-radius:4px;box-shadow:0 10px 30px rgba(74,42,23,.35);font-family:Nunito,Poppins,sans-serif;color:#4a2a17;background:#f8e9c9}',
    '.p09.sq{aspect-ratio:1/1}',
    '.p09 *,.p09 *:before,.p09 *:after{box-sizing:border-box}',
    '.p09 .p09-deco{position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:2}',
    /* wall + table + runner */
    '.p09 .p09-wall{position:absolute;inset:0;pointer-events:none;z-index:0;background:radial-gradient(ellipse at 50% 30%,#fdf4de 0%,#f6e3bd 70%,#ecd2a0 100%)}',
    '.p09 .p09-tbl{position:absolute;left:0;right:0;bottom:0;pointer-events:none;z-index:0;background:repeating-linear-gradient(178deg,rgba(255,255,255,.05) 0 .5cqw,transparent .5cqw 2.2cqw),repeating-linear-gradient(181deg,rgba(40,18,6,.18) 0 .2cqw,transparent .2cqw 3.4cqw),linear-gradient(180deg,#8a5530,#6b3d1e);box-shadow:0 -.6cqw 0 #5a3216}',
    '.p09 .p09-plaid{background-color:#b5482a;background-image:repeating-linear-gradient(90deg,transparent 0 1.25cqw,rgba(240,186,60,.75) 1.25cqw 1.55cqw,transparent 1.55cqw 6cqw),repeating-linear-gradient(0deg,transparent 0 1.25cqw,rgba(240,186,60,.75) 1.25cqw 1.55cqw,transparent 1.55cqw 6cqw),repeating-linear-gradient(90deg,rgba(58,18,6,.55) 0 3cqw,transparent 3cqw 6cqw),repeating-linear-gradient(0deg,rgba(58,18,6,.55) 0 3cqw,transparent 3cqw 6cqw)}',
    '.p09 .p09-run{position:absolute;left:-6cqw;right:-6cqw;pointer-events:none;z-index:1;transform:rotate(-2.2deg);box-shadow:0 .8cqw 1.4cqw rgba(40,15,5,.45);border-top:.5cqw dashed rgba(255,236,200,.75);border-bottom:.5cqw dashed rgba(255,236,200,.75)}',
    '.p09 .p09-awn{position:absolute;left:0;right:0;top:0;height:10cqw;pointer-events:none;z-index:1;box-shadow:inset 0 1.2cqw 0 #5a2412}',
    '.p09 .p09-scal{position:absolute;left:0;right:0;top:10cqw;height:3.6cqw;pointer-events:none;z-index:1;background:radial-gradient(circle at 50% 0,#8a3219 0 3.4cqw,#e0a526 3.4cqw 3.9cqw,transparent 4cqw) 0 0/8.33cqw 4cqw repeat-x}',
    /* header */
    '.p09 .p09-logo{position:absolute;z-index:5;left:5cqw;top:15cqw;width:15.5cqw;height:15.5cqw;border-radius:50%;background:#fff;display:flex;align-items:center;justify-content:center;box-shadow:0 0 0 .7cqw #b5482a,0 0 0 1.2cqw #e0a526,0 1cqw 2cqw rgba(74,42,23,.35)}',
    '.p09 .p09-logo img{width:11.5cqw;height:auto;display:block}',
    '.p09 .p09-logo.pip{border-radius:2cqw;width:18.5cqw;height:12cqw;top:16cqw}.p09 .p09-logo.pip img{width:16.6cqw}.p09.partner .p09-hd{left:26cqw}',
    '.p09 .p09-hd{position:absolute;z-index:5;left:24.5cqw;top:15.4cqw}',
    '.p09 .p09-hd .k{font-weight:900;font-size:1.65cqw;letter-spacing:.2em;color:#8a3219;white-space:nowrap}',
    '.p09 .p09-hd .t{font-family:"Alfa Slab One",serif;font-size:5.2cqw;line-height:1.08;color:#4a2a17;white-space:nowrap;margin-top:.5cqw}',
    '.p09 .p09-hd .t span{color:#b5482a}',
    '.p09 .p09-hd .m{display:inline-flex;align-items:center;gap:1.2cqw;margin-top:1cqw;white-space:nowrap}',
    '.p09 .p09-hd .m b{font-family:"Alfa Slab One",serif;font-weight:400;font-size:2.3cqw;letter-spacing:.08em;background:#e0a526;color:#4a2a17;padding:.55cqw 1.8cqw .45cqw;transform:rotate(-1.5deg);box-shadow:.3cqw .4cqw 0 #8a3219;display:inline-block}',
    '.p09 .p09-hd .m i{font-style:normal;font-weight:900;font-size:1.75cqw;letter-spacing:.14em;color:#fff6e3;background:#4a2a17;border-radius:3cqw;padding:.6cqw 1.6cqw}',
    '.p09 .p09-hd .w{font-family:Caveat,cursive;font-weight:700;font-size:2.75cqw;line-height:1.1;color:#8a3219;margin-top:1cqw;white-space:nowrap}',
    '.p09 .p09-badge{position:absolute;z-index:3;right:3cqw;top:2.5cqw;width:22cqw;height:22cqw;pointer-events:none;transform:rotate(8deg);filter:drop-shadow(0 .6cqw .6cqw rgba(60,20,5,.4))}',
    /* sandwich board */
    '.p09 .p09-brd{position:absolute;z-index:4;left:12cqw;right:12cqw;top:37.5cqw;background:#fffaf0;border:1.5cqw solid #7a4a24;border-radius:1.2cqw;padding:2.4cqw 3cqw 2.6cqw;text-align:center;transform:rotate(-1.4deg);box-shadow:inset 0 0 0 .35cqw #e0a526,.6cqw 1cqw 1.4cqw rgba(60,25,5,.35)}',
    '.p09 .p09-brd:before{content:"";position:absolute;left:44%;width:12%;top:-4.4cqw;height:3.4cqw;border:.7cqw solid #5a3216;border-bottom:none;border-radius:1.5cqw 1.5cqw 0 0;z-index:-1}',
    '.p09 .p09-brd:after{content:"";position:absolute;left:6%;right:6%;top:100%;height:var(--leg,11cqw);background:linear-gradient(90deg,#6b3d1e 0 2.2cqw,transparent 2.2cqw calc(100% - 2.2cqw),#6b3d1e calc(100% - 2.2cqw));z-index:-1;margin-top:1.5cqw}',
    '.p09 .p09-brd .h{display:inline-block;font-weight:900;font-size:1.75cqw;letter-spacing:.3em;color:#b5482a;white-space:nowrap;padding:0 2.4cqw;background:linear-gradient(#e0a526,#e0a526) left center/1.6cqw .3cqw no-repeat,linear-gradient(#e0a526,#e0a526) right center/1.6cqw .3cqw no-repeat}',
    '.p09 .p09-brd .t{font-family:"Alfa Slab One",serif;line-height:1.12;color:#4a2a17;margin-top:1cqw}',
    '.p09 .p09-brd .t .n{display:inline-block;width:1.45em;height:1.45em;line-height:1.45em;border-radius:50%;background:#b5482a;color:#fff6e3;font-size:.55em;vertical-align:.3em;margin-right:.4em}',
    '.p09 .p09-brd .t + .t{margin-top:1.4cqw}',
    '.p09 .p09-brd .d{font-family:Caveat,cursive;font-weight:700;font-size:3.1cqw;line-height:1.15;color:#b5482a;margin-top:.8cqw}',
    '.p09 .p09-brd .p{display:inline-block;font-weight:700;font-size:2.15cqw;color:#4a2a17;margin-top:1.2cqw;padding:.4cqw 1.6cqw;border-top:.3cqw dashed #e0a526;border-bottom:.3cqw dashed #e0a526}',
    '.p09 .p09-brd .p b{font-weight:900;color:#8a3219}',
    /* mugs */
    '.p09 .p09-mug{position:absolute;z-index:5;background:var(--mc);color:var(--mt);border-radius:.8cqw .8cqw 4.5cqw 4.5cqw;text-align:center;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:2.2cqw 1cqw 1.2cqw;box-shadow:inset -1.2cqw 0 0 rgba(0,0,0,.1),0 .8cqw 1cqw rgba(40,15,5,.35)}',
    '.p09 .p09-mug:before{content:"";position:absolute;left:0;right:0;top:0;height:1.4cqw;border-radius:.8cqw .8cqw 0 0;background:repeating-linear-gradient(90deg,var(--mb) 0 1.4cqw,transparent 1.4cqw 2.8cqw),rgba(0,0,0,.12)}',
    '.p09 .p09-mug:after{content:"";position:absolute;left:100%;top:22%;width:var(--hw,5cqw);height:44%;margin-left:-.6cqw;border:var(--hb,1.3cqw) solid var(--mc);border-left:none;border-radius:0 50% 50% 0;z-index:-1}',
    '.p09 .p09-mug .sc{position:absolute;left:-12%;right:-12%;bottom:-1.6cqw;height:2.6cqw;border-radius:50%;background:#fff6e3;box-shadow:inset 0 -.5cqw 0 #e0c79a,0 .5cqw .6cqw rgba(40,15,5,.3);z-index:-2}',
    '.p09 .p09-mug .st{position:absolute;left:15%;width:70%;bottom:100%;height:var(--sh,8cqw);pointer-events:none;overflow:visible}',
    '.p09 .p09-mug .w{position:relative;z-index:1;font-weight:900;letter-spacing:.2em;line-height:1.1;white-space:nowrap}',
    '.p09 .p09-mug .dd{font-family:"Alfa Slab One",serif;line-height:1.25;white-space:nowrap}',
    '.p09 .p09-mug .tm{font-weight:900;line-height:1.15;white-space:nowrap}',
    '.p09 .p09-mug .nn{position:absolute;left:-1.6cqw;top:-1.6cqw;width:4.4cqw;height:4.4cqw;border-radius:50%;background:#4a2a17;color:#ffd36b;font-family:"Alfa Slab One",serif;font-size:2.3cqw;line-height:4.4cqw}',
    '.p09 .p09-mug .i{font-weight:900;line-height:1.08}',
    '.p09 .p09-mug .ds{font-weight:700;line-height:1.15}',
    '.p09 .p09-mug .ti{font-family:Caveat,cursive;font-weight:700;line-height:1.05}',
    '.p09 .p09-mug.h{box-shadow:inset -1.2cqw 0 0 rgba(0,0,0,.1),0 0 0 .6cqw #fff6e3,0 0 0 1.1cqw #b5482a,0 .8cqw 1.4cqw rgba(40,15,5,.4)}',
    '.p09 .p09-mug.h .hm{position:absolute;top:-2.2cqw;left:50%;transform:translateX(-50%) rotate(-3deg);background:#b5482a;color:#fff6e3;font-weight:900;font-size:1.2cqw;letter-spacing:.18em;padding:.35cqw 1cqw;white-space:nowrap;border-radius:.4cqw}',
    '.p09 .p09-lab{position:absolute;z-index:5;left:50%;transform:translateX(-50%) rotate(1.2deg);background:#4a2a17;color:#fff6e3;font-family:"Alfa Slab One",serif;font-size:2.7cqw;padding:.9cqw 3cqw;white-space:nowrap;border-radius:.6cqw;box-shadow:.4cqw .6cqw 0 #e0a526}',
    '.p09 .p09-lab small{display:block;font-family:Nunito,sans-serif;font-weight:900;font-size:1.3cqw;letter-spacing:.2em;color:#ffd36b;text-align:center}',
    /* footer */
    '.p09 .p09-ft{position:absolute;z-index:6;left:5cqw;right:5cqw;bottom:4cqw;height:17cqw;background:#fff6e3;border-radius:1.4cqw;display:flex;align-items:center;gap:2.6cqw;padding:0 3cqw 0 4cqw;box-shadow:inset 0 0 0 .8cqw #fff6e3,inset 0 0 0 1.05cqw #b5482a,0 1cqw 1.6cqw rgba(40,15,5,.45);outline:.3cqw dashed #e0a526;outline-offset:-1.9cqw}',
    '.p09 .p09-ft .rg{flex:1;font-weight:700;font-size:1.8cqw;line-height:1.35;color:#4a2a17}',
    '.p09 .p09-ft .rg b{display:block;font-family:"Alfa Slab One",serif;font-weight:400;font-size:3.05cqw;line-height:1.15;color:#4a2a17;margin-bottom:.4cqw}',
    '.p09 .p09-ft .rg b span{color:#b5482a}',
    '.p09 .p09-qr{width:10.6cqw;height:10.6cqw;background:#fff;padding:.5cqw;flex:none;display:flex;align-items:center;justify-content:center;font-weight:900;font-size:2cqw;box-shadow:0 0 0 .3cqw #4a2a17}',
    '.p09 .p09-qr img{width:100%;height:100%;display:block}',
    '.p09 .p09-lg{display:flex;flex-direction:column;gap:.8cqw;flex:none;width:20cqw}',
    '.p09 .p09-lg span{background:#b5482a;color:#fff6e3;font-weight:900;font-size:1.4cqw;text-align:center;padding:.6cqw .8cqw;white-space:nowrap;border-radius:3cqw}',
    '.p09 .p09-lg span:nth-child(2){background:#e0a526;color:#4a2a17}.p09 .p09-lg span:nth-child(3){background:#4a2a17}',
    /* partner letter */
    '.p09:not(.sq) .p09-brd{left:7cqw;right:7cqw}.p09.partner:not(.sq) .p09-brd{top:37.5cqw;left:9cqw;right:9cqw;padding:2cqw 3cqw 2.2cqw}',
    /* square */
    '.p09.sq .p09-awn{height:7cqw}.p09.sq .p09-scal{top:7cqw;height:3cqw;background-size:6.25cqw 3cqw;background-image:radial-gradient(circle at 50% 0,#8a3219 0 2.6cqw,#e0a526 2.6cqw 3cqw,transparent 3.05cqw)}',
    '.p09.sq .p09-logo{left:4.5cqw;top:12cqw;width:12.5cqw;height:12.5cqw}.p09.sq .p09-logo img{width:9.4cqw}',
    '.p09.sq .p09-logo.pip{width:14.5cqw;height:9.5cqw;top:12.5cqw}.p09.sq .p09-logo.pip img{width:13cqw}.p09.sq.partner .p09-hd{left:21cqw}',
    '.p09.sq .p09-hd{left:20.5cqw;top:11.6cqw}.p09.sq .p09-hd .k{font-size:1.45cqw}.p09.sq .p09-hd .t{font-size:4.6cqw}',
    '.p09.sq .p09-hd .m{margin-top:.7cqw}.p09.sq .p09-hd .m b{font-size:2cqw}.p09.sq .p09-hd .m i{font-size:1.5cqw}.p09.sq .p09-hd .w{font-size:2.3cqw;margin-top:.7cqw}',
    '.p09.sq .p09-badge{width:18.5cqw;height:18.5cqw;top:2cqw;right:3cqw}',
    '.p09.sq .p09-ft{height:13cqw;bottom:3cqw;left:4cqw;right:4cqw;gap:2.2cqw;padding:0 2.6cqw 0 3.6cqw;outline-offset:-1.6cqw}',
    '.p09.sq .p09-ft .rg{font-size:1.5cqw}.p09.sq .p09-ft .rg b{font-size:2.6cqw}',
    '.p09.sq .p09-qr{width:9cqw;height:9cqw}.p09.sq .p09-lg{width:18cqw}.p09.sq .p09-lg span{font-size:1.22cqw;padding:.45cqw .6cqw}',
    '.p09.sq .p09-brd{left:5cqw;right:auto;width:56cqw;top:34cqw;padding:1.8cqw 2.4cqw 2cqw;border-width:1.2cqw}',
    '.p09.sq .p09-brd .h{font-size:1.45cqw}.p09.sq .p09-brd .d{font-size:2.5cqw}.p09.sq .p09-brd .p{font-size:1.75cqw;margin-top:.8cqw}',
    '.p09.sq.partner .p09-brd{width:auto;right:5cqw;top:32.5cqw;padding:1.4cqw 2.4cqw 1.6cqw}',
    '.p09.sq .p09-lab{font-size:2.1cqw;padding:.6cqw 2.4cqw}.p09.sq .p09-lab small{font-size:1.1cqw}'
  ].join('\n'),
  fn: function (spec, partner, sq, H) {
    var S = spec.sessions.map(H.sessInfo), solo = S.length === 1, n2 = !solo;
    var uid = 'p09u' + (partner ? 1 : 0) + (sq ? 1 : 0) + S.length;
    var HT = sq ? 100 : 129.41;
    function f(n) { return (+n).toFixed(2); }
    var seed = 9 + (partner ? 3 : 0) + (sq ? 5 : 0) + S.length;
    function rnd() { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; }
    var C = { rust: '#b5482a', drk: '#8a3219', mus: '#e0a526', cream: '#fff6e3', brn: '#4a2a17', grn: '#6f7d32' };

    /* ---------- recurring PTC badge ---------- */
    function badge(c) {
      var id = uid + 'b';
      return '<svg class="p09-badge" viewBox="0 0 100 100"><defs><path id="' + id + 't" d="M17 50 A33 33 0 0 1 83 50"/><path id="' + id + 'u" d="M14 52 A36 36 0 0 0 86 52"/></defs>'
        + '<circle cx="50" cy="50" r="48" fill="' + c.ring + '"/><circle cx="50" cy="50" r="44.5" fill="none" stroke="' + c.line + '" stroke-width="1" stroke-dasharray="2.2 1.6"/>'
        + '<circle cx="50" cy="50" r="30" fill="' + c.fill + '"/>'
        + '<text font-family="Alfa Slab One,serif" font-size="9.6" letter-spacing="1.1" fill="' + c.text + '"><textPath href="#' + id + 't" startOffset="50%" text-anchor="middle">PARENT TALK</textPath></text>'
        + '<text font-family="Alfa Slab One,serif" font-size="9.6" letter-spacing="2" fill="' + c.text + '"><textPath href="#' + id + 'u" startOffset="50%" text-anchor="middle" dominant-baseline="hanging">CAFÉ</textPath></text>'
        + '<circle cx="10.5" cy="52" r="2" fill="' + c.text + '"/><circle cx="89.5" cy="52" r="2" fill="' + c.text + '"/>'
        + '<g fill="none" stroke="' + c.steam + '" stroke-width="2.4" stroke-linecap="round"><path d="M41 44 c-3 -4 3 -6 0 -10 c-2 -3 1 -5 0 -7"/><path d="M50 42 c-3 -4 3 -6 0 -10 c-2 -3 1 -5 0 -8"/><path d="M59 44 c-3 -4 3 -6 0 -10 c-2 -3 1 -5 0 -7"/></g>'
        + '<path d="M62 52 h4 a6.5 6.5 0 0 1 0 13 h-5" fill="none" stroke="' + c.cup + '" stroke-width="3.2"/>'
        + '<path d="M35 47 h29 l-2.6 17 a6 6 0 0 1 -6 5 h-12.8 a6 6 0 0 1 -6 -5 z" fill="' + c.cup + '"/>'
        + '<path d="M35.6 51 h27.8 l-.8 4.6 h-26.2 z" fill="' + c.band + '"/>'
        + '<ellipse cx="49.5" cy="71" rx="21" ry="3.4" fill="' + c.cup + '"/><ellipse cx="49.5" cy="70.2" rx="14" ry="1.5" fill="' + c.band + '" opacity=".6"/>'
        + '</svg>';
    }

    /* ---------- drawings ---------- */
    function leaf(x, y, s, r, col) {
      return '<g transform="translate(' + f(x) + ' ' + f(y) + ') rotate(' + f(r) + ') scale(' + f(s / 100) + ') translate(-50 -50)"><path d="M50 2 L57 22 L71 13 L68 33 L90 28 L80 43 L97 51 L73 59 L77 74 L56 66 L52 86 L48 86 L44 66 L23 74 L27 59 L3 51 L20 43 L10 28 L32 33 L29 13 L43 22 Z" fill="' + col + '"/><path d="M50 30 L50 99 M50 55 L28 42 M50 55 L72 42" stroke="rgba(70,25,5,.45)" stroke-width="2.2" fill="none"/></g>';
    }
    function pumpkin(x, y, s) {
      var g = '<g transform="translate(' + f(x) + ' ' + f(y) + ') scale(' + f(s / 100) + ')">';
      g += '<ellipse cx="50" cy="96" rx="44" ry="6" fill="rgba(40,15,5,.35)"/>';
      g += '<ellipse cx="25" cy="62" rx="24" ry="32" fill="#d9662a"/><ellipse cx="75" cy="62" rx="24" ry="32" fill="#d9662a"/><ellipse cx="50" cy="62" rx="27" ry="35" fill="#ea7a33"/>';
      g += '<path d="M50 28 Q38 60 50 96 M50 28 Q62 60 50 96" stroke="#c2531f" stroke-width="2" fill="none"/>';
      g += '<path d="M48 30 Q46 16 54 8 L58 11 Q52 18 54 30 Z" fill="#5a6b2a"/><path d="M56 16 Q72 6 80 18 Q68 22 58 20 Z" fill="#7a8a35"/></g>';
      return g;
    }
    function bean(x, y, s, r) {
      return '<g transform="translate(' + f(x) + ' ' + f(y) + ') rotate(' + f(r) + ')"><ellipse rx="' + f(s) + '" ry="' + f(s * .68) + '" fill="#3a1c0c"/><path d="M' + f(-s * .8) + ' 0 Q0 ' + f(-s * .3) + ' ' + f(s * .8) + ' 0" stroke="#7a4a24" stroke-width="' + f(s * .16) + '" fill="none"/></g>';
    }
    function cinnamon(x, y, s, r) {
      return '<g transform="translate(' + f(x) + ' ' + f(y) + ') rotate(' + f(r) + ')"><rect x="0" y="0" width="' + f(s) + '" height="' + f(s * .13) + '" rx="' + f(s * .06) + '" fill="#8b4a22"/><rect x="0" y="' + f(s * .14) + '" width="' + f(s) + '" height="' + f(s * .13) + '" rx="' + f(s * .06) + '" fill="#a35a2b"/><ellipse cx="' + f(s) + '" cy="' + f(s * .135) + '" rx="' + f(s * .05) + '" ry="' + f(s * .13) + '" fill="#d08a52"/></g>';
    }
    function croissant(x, y, s, r) {
      var g = '<g transform="translate(' + f(x) + ' ' + f(y) + ') rotate(' + f(r) + ') scale(' + f(s / 100) + ')">';
      g += '<ellipse cx="50" cy="66" rx="46" ry="8" fill="rgba(40,15,5,.3)"/>';
      g += '<path d="M6 52 Q14 30 30 34 L36 60 Q18 66 6 52Z" fill="#c9832e"/><path d="M94 52 Q86 30 70 34 L64 60 Q82 66 94 52Z" fill="#c9832e"/>';
      g += '<path d="M26 34 Q50 14 74 34 L66 62 Q50 70 34 62 Z" fill="#e3a447"/><path d="M42 26 Q50 40 46 64 M58 26 Q50 40 54 64" stroke="#b8702a" stroke-width="2.4" fill="none"/></g>';
      return g;
    }
    function steam(col) { return '<svg class="st" viewBox="0 0 70 80" preserveAspectRatio="xMidYMax meet"><g fill="none" stroke="' + col + '" stroke-width="4" stroke-linecap="round" opacity=".75"><path d="M18 76 c-8 -10 8 -16 0 -28 c-6 -9 4 -14 0 -22"/><path d="M35 72 c-8 -10 8 -16 0 -28 c-6 -9 4 -14 0 -30"/><path d="M52 76 c-8 -10 8 -16 0 -28 c-6 -9 4 -14 0 -22"/></g></svg>'; }

    /* ---------- header ---------- */
    var month = H.MONTHS[spec.month - 1], series = H.esc(spec.series || 'Parent Talk Café'), sw = series.split(' '), last = sw.pop();
    var logo = partner ? '<div class="p09-logo pip"><img src="' + spec.pipUrl + '" alt=""></div>' : '<div class="p09-logo"><img src="' + spec.logoUrl + '" alt=""></div>';
    var hd = '<div class="p09-hd"><div class="k">' + (partner ? 'FOR FAMILIES ACROSS THE PACIFIC' : 'PARENT TRAINING &amp; INFORMATION CENTER') + '</div>'
      + '<div class="t">' + (sw.length ? sw.join(' ') + ' ' : '') + '<span>' + last + '</span></div>'
      + '<div class="m"><b>' + month.toUpperCase() + ' ' + spec.year + '</b><i>ON ZOOM</i></div>'
      + '<div class="w">' + H.PTC_WHERE + '</div></div>';
    var bdg = badge({ ring: C.rust, line: '#ffd36b', fill: C.cream, text: '#fff6e3', cup: C.brn, band: C.mus, steam: C.drk });

    /* ---------- board ---------- */
    var L = Math.max.apply(null, spec.sessions.map(function (s) { return String(s.lesson || '').length; }));
    var tfs;
    if (sq) tfs = partner ? (n2 ? 2.5 : 3.0) : (n2 ? 3.0 : (L > 30 ? 4.1 : 4.8));
    else tfs = partner ? (n2 ? 3.2 : (L > 30 ? 4.2 : 5.2)) : (n2 ? 4.1 : (L > 30 ? 4.5 : 6));
    var pres = spec.presenter ? '<div class="p">Presented by <b>' + H.esc(spec.presenter) + '</b></div>' : '';
    var topics = S.map(function (s, i) { return '<div class="t" style="font-size:' + f(tfs) + 'cqw">' + (n2 ? '<span class="n">' + (i + 1) + '</span>' : '') + s.lesson + '</div>'; }).join('');
    var showDesc = solo && S[0].desc && !partner;
    var brd = '<div class="p09-brd" style="--leg:' + (sq ? 8 : 12) + 'cqw"><div class="h">' + (n2 ? 'TODAY\'S TOPICS' : 'TODAY\'S TOPIC') + '</div>' + topics
      + (showDesc ? '<div class="d">~ ' + S[0].desc + ' ~</div>' : '') + pres + '</div>';

    /* ---------- decorations ---------- */
    var d = '';
    var lc = ['#c4512a', '#e0a526', '#a8401f', '#d98a2b', '#8f6a22'];
    function leaves(spots) { spots.forEach(function (p, i) { d += leaf(p[0], p[1], p[2], rnd() * 70 - 35, lc[i % lc.length]); }); }
    var tableTop, run;
    var mugs = '', lab = '';
    if (!sq && !partner) {
      tableTop = 82; run = [79, 24];
      leaves([[6, 36, 7], [94, 41, 8], [5, 63, 6], [95, 70, 6.5], [22, 33.5, 4], [91, 31, 4.5]]);
      if (solo) {
        d += pumpkin(9, 84, 20) + croissant(71, 92, 21, -8) + bean(14, 107, 1.2, 20) + bean(88, 101, 1.2, -30) + cinnamon(80, 85, 12, -18);
        mugs = mugHst(S[0], 0, 'left:34cqw;top:81.5cqw;width:32cqw;height:20cqw', 7.6, 2.3, 1.6, '#b5482a', '#fff6e3', '#e0a526');
      } else {
        d += croissant(41, 90, 18, 6) + bean(92, 101, 1.2, -30) + bean(6, 100, 1.2, 40);
        mugs = mugHst(S[0], 1, 'left:6cqw;top:81cqw;width:31cqw;height:19cqw', 6.4, 2.05, 1.45, '#b5482a', '#fff6e3', '#e0a526')
          + mugHst(S[1], 2, 'left:59cqw;top:79cqw;width:31cqw;height:19cqw', 6.4, 2.05, 1.45, '#e0a526', '#4a2a17', '#b5482a');
      }
    } else if (!sq && partner) {
      tableTop = 74; run = [74, 33];
      leaves([[5, 37, 6], [95, 39, 6.5], [4, 60, 5], [96, 62, 5], [22, 33.5, 4]]);
      d += bean(50, 100.5, 1.2, 10) + bean(20, 102, 1, -30) + bean(80, 101.5, 1.1, 50);
      lab = '<div class="p09-lab" style="top:' + (n2 ? 64.5 : 65.5) + 'cqw">What time is it on your island?<small>' + (n2 ? 'BOTH TOPICS' : 'TOPIC') + ' · YOUR LOCAL TIME</small></div>';
      mugs = zoneMugs([[6, 79], [29, 77.5], [52, 79], [75, 77.5], [17.5, 92.5], [40.5, 93.5], [63.5, 92.5]], 18.5, 12, 1.55, 1.25, 2.05);
    } else if (sq && !partner) {
      tableTop = 66; run = [66, 17];
      leaves([[94, 30, 5], [96, 56, 4.5]]);
      if (solo) {
        d += cinnamon(86, 76, 9, -14) + bean(66, 80, 1, 30);
        mugs = mugHst(S[0], 0, 'left:65cqw;top:44cqw;width:27cqw;height:22cqw', 6, 1.85, 1.3, '#b5482a', '#fff6e3', '#e0a526');
      } else {
        mugs = mugHst(S[0], 1, 'left:66cqw;top:33cqw;width:25cqw;height:15cqw', 4.6, 1.6, 1.15, '#b5482a', '#fff6e3', '#e0a526')
          + mugHst(S[1], 2, 'left:66cqw;top:58cqw;width:25cqw;height:15cqw', 4.6, 1.6, 1.15, '#e0a526', '#4a2a17', '#b5482a');
      }
    } else {
      tableTop = 56; run = [57, 26];
      leaves([[96, 27, 4]]);
      lab = '';
      mugs = zoneMugs([[6, 59], [29, 58], [52, 59], [75, 58], [17.5, 71.5], [40.5, 72], [63.5, 71.5]], 17, 10, 1.35, 1.1, 1.7);
    }
    function mugHst(s, n, pos, ddf, tmf, wf, mc, mt, mb) {
      var dd = s.mon + ' ' + s.day;
      return '<div class="p09-mug" style="' + pos + ';--mc:' + mc + ';--mt:' + mt + ';--mb:' + mb + ';--hw:' + (sq ? 4.4 : 5.6) + 'cqw;--sh:' + (sq ? 5 : 6) + 'cqw">'
        + steam(mt === '#fff6e3' ? '#b5482a' : '#8a3219') + '<span class="sc"></span>' + (n ? '<span class="nn">' + n + '</span>' : '')
        + '<div class="w" style="font-size:' + f(wf) + 'cqw">' + s.dow.toUpperCase() + '</div>'
        + '<div class="dd" style="font-size:' + f(ddf) + 'cqw">' + dd + '</div>'
        + '<div class="tm" style="font-size:' + f(tmf) + 'cqw">' + s.time + '</div></div>';
    }
    function zoneMugs(pos, w, h, lf, df, tf) {
      var rows = H.zoneRows(spec.sessions);
      var cols = [['#b5482a', '#fff6e3', '#e0a526'], ['#fff6e3', '#4a2a17', '#b5482a'], ['#e0a526', '#4a2a17', '#b5482a'], ['#4a2a17', '#fff6e3', '#e0a526'], ['#e0a526', '#4a2a17', '#4a2a17'], ['#b5482a', '#fff6e3', '#4a2a17'], ['#4a2a17', '#fff6e3', '#b5482a']];
      return rows.map(function (r, i) {
        var c = r.home ? ['#fff6e3', '#4a2a17', '#b5482a'] : cols[i];
        var tlen = String(r.time).length, tfs2 = tlen > 9 ? tf * .78 : tf;
        return '<div class="p09-mug' + (r.home ? ' h' : '') + '" style="left:' + pos[i][0] + 'cqw;top:' + pos[i][1] + 'cqw;width:' + w + 'cqw;height:' + h + 'cqw;padding:1.9cqw .6cqw 1cqw;--mc:' + c[0] + ';--mt:' + c[1] + ';--mb:' + c[2] + ';--hw:3.6cqw;--hb:1cqw">'
          + '<span class="sc"></span>' + (r.home ? '<span class="hm">HAWAIʻI TIME</span>' : '')
          + '<div class="i" style="font-size:' + f(lf) + 'cqw">' + r.label + '</div><div class="ds" style="font-size:' + f(df) + 'cqw">' + r.days + '</div><div class="ti" style="font-size:' + f(tfs2 * 1.25) + 'cqw">' + r.time + '</div></div>';
      }).join('');
    }

    var base = '<div class="p09-wall"></div><div class="p09-tbl" style="top:' + tableTop + 'cqw"></div><div class="p09-run p09-plaid" style="top:' + run[0] + 'cqw;height:' + run[1] + 'cqw"></div>'
      + '<div class="p09-awn p09-plaid"></div><div class="p09-scal"></div>';
    var svg = '<svg class="p09-deco" viewBox="0 0 100 ' + HT + '" preserveAspectRatio="none">' + d + '</svg>';
    var foot = '<div class="p09-ft"><div class="rg"><b>REGISTER at <span>LDAHawaii.org</span></b>Get your Zoom link, scan the QR code,<br>or call ' + H.phone(partner) + '</div><div class="p09-qr">' + H.qrImg(spec, partner) + '</div><div class="p09-lg">' + H.badges(spec, partner) + '</div></div>';
    return '<div class="p09' + (sq ? ' sq' : '') + (partner ? ' partner' : '') + '">' + base + svg + bdg + logo + hd + brd + lab + mugs + foot + '</div>';
  }
}, 'ptc');

/* ---- PTC month 10 ---- */
VEBFlyers.registerTheme(10, {
  name: 'Harvest-moon cider café (teal + copper, string lights, hanging lantern-lit sign, glowing lanterns)',
  fonts: 'family=Playfair+Display:wght@700;800;900&family=Josefin+Sans:wght@400;600;700&family=Dancing+Script:wght@700',
  css: [
    '.p10{container-type:inline-size;aspect-ratio:8.5/11;position:relative;overflow:hidden;border-radius:4px;box-shadow:0 10px 30px rgba(8,38,43,.45);font-family:"Josefin Sans",Poppins,sans-serif;color:#fdf0dc;background:radial-gradient(ellipse at 50% 35%,#17646a 0%,#0f4a50 45%,#0a3237 80%,#08262b 100%)}',
    '.p10.sq{aspect-ratio:1/1}',
    '.p10 *,.p10 *:before,.p10 *:after{box-sizing:border-box}',
    '.p10 .p10-deco{position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:1}',
    '.p10 .p10-top{position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:3}',
    '.p10 .p10-ledge{position:absolute;left:0;right:0;pointer-events:none;z-index:1;background:repeating-linear-gradient(179deg,rgba(255,255,255,.05) 0 .4cqw,transparent .4cqw 1.8cqw),linear-gradient(180deg,#7a4321,#4e2a14);box-shadow:0 -.5cqw 0 #c8733a,0 -1cqw 2.4cqw rgba(255,180,90,.25)}',
    /* header */
    '.p10 .p10-logo{position:absolute;z-index:5;left:5cqw;top:14cqw;width:15cqw;height:15cqw;border-radius:50%;background:#fff;display:flex;align-items:center;justify-content:center;box-shadow:0 0 0 .6cqw #c8733a,0 0 3cqw 1cqw rgba(255,190,100,.45)}',
    '.p10 .p10-logo img{width:11.2cqw;height:auto;display:block}',
    '.p10 .p10-logo.pip{border-radius:1.6cqw;width:18.5cqw;height:12cqw;top:15cqw}.p10 .p10-logo.pip img{width:16.6cqw}',
    '.p10 .p10-hd{position:absolute;z-index:5;left:23cqw;width:52cqw;top:13.4cqw;text-align:center}',
    '.p10.partner .p10-hd{left:25cqw;width:50cqw}',
    '.p10 .p10-hd .k{position:relative;z-index:1;font-weight:700;font-size:1.6cqw;letter-spacing:.2em;color:#ffc76b;white-space:nowrap}',
    '.p10 .p10-hd .t{font-family:"Playfair Display",serif;font-weight:900;font-size:5.6cqw;line-height:1.1;color:#fdf0dc;white-space:nowrap;margin-top:.4cqw;text-shadow:0 .4cqw 1.6cqw rgba(0,0,0,.35)}',
    '.p10 .p10-hd .t span{color:#e8a165;font-style:italic}',
    '.p10 .p10-hd .m{display:flex;align-items:center;justify-content:center;gap:1.4cqw;margin-top:.6cqw;white-space:nowrap}',
    '.p10 .p10-hd .m b{font-weight:700;font-size:2.3cqw;letter-spacing:.32em;color:#fdf0dc;padding:.6cqw 0 .3cqw;border-top:.25cqw solid #c8733a;border-bottom:.25cqw solid #c8733a}',
    '.p10 .p10-hd .m i{font-style:normal;font-weight:700;font-size:1.6cqw;letter-spacing:.16em;color:#08262b;background:#e8a165;border-radius:3cqw;padding:.75cqw 1.5cqw .45cqw}',
    '.p10 .p10-hd .w{font-family:"Dancing Script",cursive;font-weight:700;font-size:2.65cqw;line-height:1.1;color:#ffd99a;margin-top:.9cqw;white-space:nowrap}',
    '.p10 .p10-badge{position:absolute;z-index:4;right:3cqw;top:10cqw;width:21.5cqw;height:21.5cqw;pointer-events:none;transform:rotate(-7deg);filter:drop-shadow(0 0 2.2cqw rgba(255,190,100,.45))}',
    /* hanging sign */
    '.p10 .p10-sign{position:absolute;z-index:5;left:9cqw;right:9cqw;top:39cqw;background:radial-gradient(ellipse at 50% 40%,#fffaf0 0%,#fdf0dc 55%,#f5dcb4 100%);border-radius:1.4cqw;padding:2.6cqw 3.4cqw 2.8cqw;text-align:center;color:#0c3b41;box-shadow:0 0 0 .6cqw #c8733a,0 0 0 1.1cqw #7a4321,0 0 5cqw 1.4cqw rgba(255,190,100,.42),0 1.4cqw 2cqw rgba(0,0,0,.4);transform:rotate(1deg)}',
    '.p10 .p10-sign .h{display:inline-block;font-weight:700;font-size:1.7cqw;letter-spacing:.32em;color:#b0602c;white-space:nowrap}',
    '.p10 .p10-sign .h:before,.p10 .p10-sign .h:after{content:"";display:inline-block;width:3cqw;height:.25cqw;background:#c8733a;vertical-align:middle;margin:0 1.2cqw .4cqw}',
    '.p10 .p10-sign .t{font-family:"Playfair Display",serif;font-weight:800;line-height:1.12;color:#0c3b41;margin-top:.9cqw}',
    '.p10 .p10-sign .t .n{font-style:italic;color:#c8733a;margin-right:.3em}',
    '.p10 .p10-sign .t + .t{margin-top:1.1cqw}',
    '.p10 .p10-sign .d{font-family:"Dancing Script",cursive;font-weight:700;font-size:3.1cqw;line-height:1.15;color:#b0602c;margin-top:.7cqw}',
    '.p10 .p10-sign .p{display:inline-block;font-weight:600;font-size:2.1cqw;color:#fdf0dc;background:#0f4a50;border-radius:3cqw;margin-top:1.2cqw;padding:.85cqw 2.2cqw .55cqw}',
    '.p10 .p10-sign .p b{font-weight:700;color:#ffc76b}',
    /* cider mugs */
    '.p10 .p10-mug{position:absolute;z-index:6;border-radius:.6cqw .6cqw 2.6cqw 2.6cqw;text-align:center;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:2.2cqw .8cqw 1cqw;color:#3a1e0c;background:linear-gradient(180deg,#fff3dc 0 1.5cqw,#f9cf7f 1.5cqw,#f2ad55 60%,#e58d3a 100%);box-shadow:inset 0 0 0 .45cqw rgba(255,255,255,.55),inset 1.4cqw 0 0 rgba(255,255,255,.18),0 0 3cqw rgba(255,170,80,.4),0 .8cqw 1cqw rgba(0,0,0,.35)}',
    '.p10 .p10-mug:after{content:"";position:absolute;left:100%;top:20%;width:var(--hw,5cqw);height:50%;margin-left:-.4cqw;border:.9cqw solid rgba(255,240,215,.75);border-left:none;border-radius:0 45% 45% 0}',
    '.p10 .p10-mug .ex{position:absolute;left:-10%;width:120%;bottom:96%;height:var(--sh,9cqw);pointer-events:none;overflow:visible}',
    '.p10 .p10-mug .w{position:relative;z-index:1;font-weight:700;letter-spacing:.24em;line-height:1.1;white-space:nowrap}',
    '.p10 .p10-mug .dd{font-family:"Playfair Display",serif;font-weight:900;line-height:1.15;white-space:nowrap}',
    '.p10 .p10-mug .tm{font-weight:700;line-height:1.15;white-space:nowrap;margin-top:.2cqw}',
    '.p10 .p10-mug .nn{position:absolute;left:-1.8cqw;top:-1.6cqw;width:4.4cqw;height:4.4cqw;border-radius:50%;background:#0c3b41;color:#ffc76b;font-family:"Playfair Display",serif;font-weight:900;font-size:2.4cqw;line-height:4.3cqw;box-shadow:0 0 0 .35cqw #e8a165}',
    /* lanterns */
    '.p10 .p10-lan{position:absolute;z-index:6;text-align:center;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:.9cqw .5cqw .6cqw;color:#3a1e0c;border-radius:1cqw;background:radial-gradient(ellipse at 50% 55%,#fff6dc 0%,#ffd88d 50%,#f3a44d 100%);border:.45cqw solid #7a4321;border-left-width:.9cqw;border-right-width:.9cqw;box-shadow:0 0 3.4cqw .8cqw rgba(255,190,90,.45)}',
    '.p10 .p10-lan:before{content:"";position:absolute;left:12%;right:12%;bottom:100%;height:2.2cqw;background:#c8733a;clip-path:polygon(22% 0,78% 0,100% 100%,0 100%);margin-bottom:.45cqw}',
    '.p10 .p10-lan:after{content:"";position:absolute;left:-6%;right:-6%;top:100%;height:1.1cqw;background:#7a4321;border-radius:0 0 .6cqw .6cqw;margin-top:.45cqw}',
    '.p10 .p10-lan .i,.p10 .p10-lan .ds{position:relative;z-index:1}.p10 .p10-lan .i{font-weight:700;line-height:1.08}',
    '.p10 .p10-lan .ds{font-weight:600;line-height:1.15;margin-top:.15cqw}',
    '.p10 .p10-lan .ti{font-family:"Playfair Display",serif;font-weight:900;line-height:1.1;margin-top:.2cqw}',
    '.p10 .p10-lan.h{background:radial-gradient(ellipse at 50% 55%,#ffffff 0%,#fff0b8 50%,#ffc35e 100%);box-shadow:0 0 0 .5cqw #fdf0dc,0 0 4.4cqw 1.6cqw rgba(255,214,120,.7)}',
    '.p10 .p10-lan .hm{position:absolute;bottom:-3.6cqw;left:50%;transform:translateX(-50%);background:#0c3b41;color:#ffc76b;font-weight:700;font-size:1.15cqw;letter-spacing:.16em;padding:.45cqw .9cqw .25cqw;white-space:nowrap;border-radius:3cqw;box-shadow:0 0 0 .25cqw #e8a165;z-index:2}',
    '.p10 .p10-lab{position:absolute;z-index:5;left:50%;transform:translateX(-50%);text-align:center;white-space:nowrap}',
    '.p10 .p10-lab b{display:block;font-family:"Playfair Display",serif;font-weight:800;font-style:italic;font-size:3cqw;line-height:1.1;color:#fdf0dc}',
    '.p10 .p10-lab small{display:block;font-weight:700;font-size:1.3cqw;letter-spacing:.24em;color:#ffc76b;margin-top:.3cqw}',
    /* footer */
    '.p10 .p10-ft{position:absolute;z-index:7;left:5cqw;right:5cqw;bottom:4cqw;height:17cqw;background:linear-gradient(180deg,#0c3b41,#08262b);border-radius:1.4cqw;display:flex;align-items:center;gap:2.6cqw;padding:0 3cqw 0 4cqw;box-shadow:inset 0 0 0 .5cqw #c8733a,inset 0 0 0 .9cqw #08262b,inset 0 0 0 1.05cqw rgba(232,161,101,.6),0 1cqw 2cqw rgba(0,0,0,.45)}',
    '.p10 .p10-ft .rg{flex:1;font-weight:600;font-size:1.8cqw;line-height:1.4;color:#fdf0dc}',
    '.p10 .p10-ft .rg b{display:block;font-family:"Playfair Display",serif;font-weight:900;font-size:3.1cqw;line-height:1.15;color:#fdf0dc;margin-bottom:.4cqw}',
    '.p10 .p10-ft .rg b span{color:#ffc76b}',
    '.p10 .p10-qr{width:10.6cqw;height:10.6cqw;background:#fff;padding:.5cqw;flex:none;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:2cqw;color:#0c3b41;border-radius:.5cqw;box-shadow:0 0 0 .35cqw #e8a165}',
    '.p10 .p10-qr img{width:100%;height:100%;display:block}',
    '.p10 .p10-lg{display:flex;flex-direction:column;gap:.8cqw;flex:none;width:20cqw}',
    '.p10 .p10-lg span{background:#c8733a;color:#fff;font-weight:700;font-size:1.4cqw;text-align:center;padding:.7cqw .8cqw .45cqw;white-space:nowrap;border-radius:3cqw}',
    '.p10 .p10-lg span:nth-child(2){background:#fdf0dc;color:#0c3b41}.p10 .p10-lg span:nth-child(3){background:#ffc76b;color:#3a1e0c}',
    '.p10.partner:not(.sq) .p10-sign{top:38.5cqw;padding:2.2cqw 3cqw 2.4cqw}',
    /* square */
    '.p10.sq .p10-logo{left:4.5cqw;top:10.5cqw;width:12cqw;height:12cqw}.p10.sq .p10-logo img{width:9cqw}',
    '.p10.sq .p10-logo.pip{width:14.5cqw;height:9.5cqw;top:11.5cqw}.p10.sq .p10-logo.pip img{width:13cqw}',
    '.p10.sq .p10-hd{left:19cqw;width:57cqw;top:9.6cqw}.p10.sq .p10-hd .k{font-size:1.4cqw}.p10.sq .p10-hd .t{font-size:4.8cqw}',
    '.p10.sq .p10-hd .m{margin-top:.4cqw}.p10.sq .p10-hd .m b{font-size:1.9cqw}.p10.sq .p10-hd .m i{font-size:1.35cqw}.p10.sq .p10-hd .w{font-size:2.25cqw;margin-top:.6cqw}',
    '.p10.sq .p10-badge{width:18cqw;height:18cqw;top:8cqw;right:3cqw}',
    '.p10.sq .p10-sign{left:5.5cqw;right:auto;width:55cqw;top:35cqw;padding:2cqw 2.4cqw 2.2cqw}',
    '.p10.sq .p10-sign .h{font-size:1.4cqw}.p10.sq .p10-sign .d{font-size:2.4cqw}.p10.sq .p10-sign .p{font-size:1.7cqw;margin-top:.9cqw}',
    '.p10.sq.partner .p10-sign{width:auto;right:5.5cqw;top:32cqw;padding:1.4cqw 2.4cqw 1.6cqw}',
    '.p10.sq .p10-ft{height:13cqw;bottom:3cqw;left:4cqw;right:4cqw;gap:2.2cqw;padding:0 2.6cqw 0 3.6cqw}',
    '.p10.sq .p10-ft .rg{font-size:1.5cqw}.p10.sq .p10-ft .rg b{font-size:2.6cqw}',
    '.p10.sq .p10-qr{width:9cqw;height:9cqw}.p10.sq .p10-lg{width:18cqw}.p10.sq .p10-lg span{font-size:1.22cqw;padding:.55cqw .6cqw .35cqw}'
  ].join('\n'),
  fn: function (spec, partner, sq, H) {
    var S = spec.sessions.map(H.sessInfo), solo = S.length === 1, n2 = !solo;
    var uid = 'p10u' + (partner ? 1 : 0) + (sq ? 1 : 0) + S.length;
    var HT = sq ? 100 : 129.41;
    function f(n) { return (+n).toFixed(2); }
    var seed = 10 + (partner ? 3 : 0) + (sq ? 5 : 0) + S.length;
    function rnd() { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; }

    /* ---------- recurring PTC badge ---------- */
    function badge(c) {
      var id = uid + 'b';
      return '<svg class="p10-badge" viewBox="0 0 100 100"><defs><path id="' + id + 't" d="M17 50 A33 33 0 0 1 83 50"/><path id="' + id + 'u" d="M14 52 A36 36 0 0 0 86 52"/></defs>'
        + '<circle cx="50" cy="50" r="48" fill="' + c.ring + '"/><circle cx="50" cy="50" r="44.5" fill="none" stroke="' + c.line + '" stroke-width="1" stroke-dasharray="2.2 1.6"/>'
        + '<circle cx="50" cy="50" r="30" fill="' + c.fill + '"/>'
        + '<text font-family="Playfair Display,serif" font-weight="900" font-size="10" letter-spacing="1.2" fill="' + c.text + '"><textPath href="#' + id + 't" startOffset="50%" text-anchor="middle">PARENT TALK</textPath></text>'
        + '<text font-family="Playfair Display,serif" font-weight="900" font-size="10" letter-spacing="2.4" fill="' + c.text + '"><textPath href="#' + id + 'u" startOffset="50%" text-anchor="middle" dominant-baseline="hanging">CAFÉ</textPath></text>'
        + '<circle cx="10.5" cy="52" r="2" fill="' + c.text + '"/><circle cx="89.5" cy="52" r="2" fill="' + c.text + '"/>'
        + '<g fill="none" stroke="' + c.steam + '" stroke-width="2.4" stroke-linecap="round"><path d="M41 44 c-3 -4 3 -6 0 -10 c-2 -3 1 -5 0 -7"/><path d="M50 42 c-3 -4 3 -6 0 -10 c-2 -3 1 -5 0 -8"/><path d="M59 44 c-3 -4 3 -6 0 -10 c-2 -3 1 -5 0 -7"/></g>'
        + '<path d="M62 52 h4 a6.5 6.5 0 0 1 0 13 h-5" fill="none" stroke="' + c.cup + '" stroke-width="3.2"/>'
        + '<path d="M35 47 h29 l-2.6 17 a6 6 0 0 1 -6 5 h-12.8 a6 6 0 0 1 -6 -5 z" fill="' + c.cup + '"/>'
        + '<path d="M35.6 51 h27.8 l-.8 4.6 h-26.2 z" fill="' + c.band + '"/>'
        + '<ellipse cx="49.5" cy="71" rx="21" ry="3.4" fill="' + c.cup + '"/><ellipse cx="49.5" cy="70.2" rx="14" ry="1.5" fill="' + c.band + '" opacity=".6"/>'
        + '</svg>';
    }

    /* ---------- drawings ---------- */
    var gid = uid + 'g';
    var defs = '<defs><radialGradient id="' + gid + '"><stop offset="0" stop-color="#ffd27a" stop-opacity=".85"/><stop offset=".45" stop-color="#ffb357" stop-opacity=".3"/><stop offset="1" stop-color="#ffb357" stop-opacity="0"/></radialGradient>'
      + '<radialGradient id="' + gid + 'm" cx=".42" cy=".38"><stop offset="0" stop-color="#ffd7a0"/><stop offset=".7" stop-color="#eaa05a"/><stop offset="1" stop-color="#d5813f"/></radialGradient></defs>';
    function strand(x0, y0, cx, cy, x1, y1, n, tilt) {
      var g = '<path d="M' + f(x0) + ' ' + f(y0) + ' Q' + f(cx) + ' ' + f(cy) + ' ' + f(x1) + ' ' + f(y1) + '" fill="none" stroke="#06191c" stroke-width=".35"/>';
      var cols = ['#ffd27a', '#ffb357', '#ffe7a8', '#ff9a4d'];
      for (var i = 1; i < n; i++) {
        var t = i / n, x = (1 - t) * (1 - t) * x0 + 2 * (1 - t) * t * cx + t * t * x1, y = (1 - t) * (1 - t) * y0 + 2 * (1 - t) * t * cy + t * t * y1;
        var r = (tilt || 0) + (rnd() * 24 - 12);
        g += '<circle cx="' + f(x) + '" cy="' + f(y + 1.8) + '" r="3.4" fill="url(#' + gid + ')"/>';
        g += '<g transform="translate(' + f(x) + ' ' + f(y) + ') rotate(' + f(r) + ')"><rect x="-.55" y="-.2" width="1.1" height="1.1" fill="#2a1a10"/><ellipse cx="0" cy="1.95" rx=".9" ry="1.25" fill="' + cols[i % 4] + '"/><ellipse cx="-.25" cy="1.6" rx=".25" ry=".45" fill="#fff" opacity=".7"/></g>';
      }
      return g;
    }
    function candle(x, base, w, h) {
      var g = '<circle cx="' + f(x) + '" cy="' + f(base - h - 1.6) + '" r="' + f(w * 1.3) + '" fill="url(#' + gid + ')"/>';
      g += '<rect x="' + f(x - w / 2) + '" y="' + f(base - h) + '" width="' + f(w) + '" height="' + f(h) + '" rx="' + f(w * .12) + '" fill="#fdf0dc"/>';
      g += '<rect x="' + f(x - w / 2) + '" y="' + f(base - h) + '" width="' + f(w * .28) + '" height="' + f(h) + '" fill="#f1dbb5"/>';
      g += '<path d="M' + f(x - w * .25) + ' ' + f(base - h) + ' q0 ' + f(h * .18) + ' ' + f(w * .1) + ' ' + f(h * .22) + ' q' + f(w * .1) + ' -' + f(h * .04) + ' ' + f(w * .1) + ' -' + f(h * .22) + 'z" fill="#fff8ec"/>';
      g += '<line x1="' + f(x) + '" y1="' + f(base - h) + '" x2="' + f(x) + '" y2="' + f(base - h - .9) + '" stroke="#2a1a10" stroke-width=".3"/>';
      g += '<path d="M' + f(x) + ' ' + f(base - h - 3.6) + ' q1.2 1.6 .8 2.6 q-.3 .7 -.8 .8 q-.6 -.1 -.8 -.8 q-.4 -1 .8 -2.6z" fill="#ffc35e"/><path d="M' + f(x) + ' ' + f(base - h - 2.4) + ' q.5 .8 .3 1.3 q-.3 .3 -.6 0 q-.2 -.5 .3 -1.3z" fill="#fff6d0"/>';
      return g;
    }
    function apple(x, y, s) {
      return '<g transform="translate(' + f(x) + ' ' + f(y) + ') scale(' + f(s / 10) + ')"><path d="M0 -3 C-5 -6 -9 -1 -7 4 C-5 9 -2 9 0 8 C2 9 5 9 7 4 C9 -1 5 -6 0 -3Z" fill="#b5352a"/><path d="M-4 -2 C-5 0 -5 2 -4 4" stroke="#e86a52" stroke-width="1" fill="none"/><path d="M0 -3 L.6 -6.5" stroke="#4e2a14" stroke-width=".8"/><path d="M.6 -5.5 C3 -7.5 5 -6 5 -5.4 C3 -4.6 1.6 -4.8 .6 -5.5Z" fill="#5b7a3a"/></g>';
    }
    function rope(x0, y0, x1, y1) { return '<path d="M' + f(x0) + ' ' + f(y0) + ' L' + f(x1) + ' ' + f(y1) + '" stroke="#c9a77c" stroke-width=".45" stroke-dasharray=".9 .35"/>'; }
    function mugExtras(col) {
      return '<svg class="ex" viewBox="0 0 120 60" preserveAspectRatio="xMidYMax meet">'
        + '<g fill="none" stroke="#fdf0dc" stroke-width="3" stroke-linecap="round" opacity=".55"><path d="M52 52 c-7 -9 7 -14 0 -24 c-5 -8 3 -12 0 -20"/><path d="M68 54 c-7 -9 7 -14 0 -24 c-5 -8 3 -12 0 -18"/></g>'
        + '<g transform="translate(26 60) rotate(-24)"><rect x="-4" y="-46" width="8" height="52" rx="3" fill="#8b4a22"/><rect x="-4" y="-46" width="3.5" height="52" rx="1.5" fill="#a85e2c"/><ellipse cx="0" cy="-46" rx="4" ry="2" fill="#d08a52"/></g>'
        + '<g transform="translate(36 58) rotate(-10)"><rect x="-3.5" y="-38" width="7" height="44" rx="3" fill="#7a3f1c"/><ellipse cx="0" cy="-38" rx="3.5" ry="1.8" fill="#c27a45"/></g>'
        + '<g transform="translate(97 58)"><circle r="13" fill="#f7a23a"/><circle r="10.5" fill="#ffd37a"/><g stroke="#f7a23a" stroke-width="1.6"><path d="M0 0 L0 -10"/><path d="M0 0 L9 -5"/><path d="M0 0 L9 5"/><path d="M0 0 L0 10"/><path d="M0 0 L-9 5"/><path d="M0 0 L-9 -5"/></g></g>'
        + '</svg>';
    }

    /* ---------- header ---------- */
    var month = H.MONTHS[spec.month - 1], series = H.esc(spec.series || 'Parent Talk Café'), sw = series.split(' '), last = sw.pop();
    var logo = partner ? '<div class="p10-logo pip"><img src="' + spec.pipUrl + '" alt=""></div>' : '<div class="p10-logo"><img src="' + spec.logoUrl + '" alt=""></div>';
    var hd = '<div class="p10-hd"><div class="k">' + (partner ? 'FOR FAMILIES ACROSS THE PACIFIC' : 'PARENT TRAINING &amp; INFORMATION CENTER') + '</div>'
      + '<div class="t">' + (sw.length ? sw.join(' ') + ' ' : '') + '<span>' + last + '</span></div>'
      + '<div class="m"><b>' + month.toUpperCase() + ' ' + spec.year + '</b><i>ON ZOOM</i></div>'
      + '<div class="w">' + H.PTC_WHERE + '</div></div>';
    var bdg = badge({ ring: '#c8733a', line: '#ffd99a', fill: '#fdf0dc', text: '#fff7ea', cup: '#0c3b41', band: '#e8a165', steam: '#b0602c' });

    /* ---------- sign ---------- */
    var L = Math.max.apply(null, spec.sessions.map(function (s) { return String(s.lesson || '').length; }));
    var tfs;
    if (sq) tfs = partner ? (n2 ? 2.6 : 3.1) : (n2 ? 3.1 : (L > 30 ? 3.9 : 4.6));
    else tfs = partner ? (n2 ? 3.3 : (L > 30 ? 3.8 : 5)) : (n2 ? 4.3 : (L > 30 ? 5.1 : 6.2));
    var pres = spec.presenter ? '<div class="p">Presented by <b>' + H.esc(spec.presenter) + '</b></div>' : '';
    var topics = S.map(function (s, i) { return '<div class="t" style="font-size:' + f(tfs) + 'cqw">' + (n2 ? '<span class="n">' + (i + 1) + '.</span>' : '') + s.lesson + '</div>'; }).join('');
    var showDesc = solo && S[0].desc && !partner;
    var sign = '<div class="p10-sign"><div class="h">' + (n2 ? 'ON THE MENU' : 'TONIGHT\'S TOPIC') + '</div>' + topics + (showDesc ? '<div class="d">' + S[0].desc + '</div>' : '') + pres + '</div>';

    /* ---------- composition ---------- */
    var d = defs, top = '', items = '', lab = '', ledge = '';
    // harvest moon peeking at top-left behind the logo
    d += '<circle cx="' + (sq ? 10 : 12) + '" cy="' + (sq ? 16 : 21) + '" r="' + (sq ? 15 : 19) + '" fill="url(#' + gid + 'm)" opacity=".95"/>'
      + '<circle cx="' + (sq ? 3 : 4) + '" cy="' + (sq ? 24 : 31) + '" r="2.4" fill="#d5813f" opacity=".5"/><circle cx="' + (sq ? 20 : 24) + '" cy="' + (sq ? 26 : 34) + '" r="1.6" fill="#d5813f" opacity=".5"/>';
    // stars
    for (var k = 0; k < 18; k++) { var sx = rnd() * 100, sy = rnd() * (sq ? 30 : 36); if (sx > 18 && sx < 80 && sy > 9) continue; d += '<circle cx="' + f(sx) + '" cy="' + f(sy) + '" r="' + f(.18 + rnd() * .25) + '" fill="#fdf0dc" opacity="' + f(.4 + rnd() * .5) + '"/>'; }
    // top string of lights
    top += sq ? strand(-3, 1, 50, 13, 103, 1, 13) : strand(-3, 1, 50, 15, 103, 1, 15);
    var signTop = sq ? (partner ? 32 : 35) : (partner ? 38.5 : 39);
    if (!sq) { d += rope(22, 7.2, 14, signTop) + rope(78, 7.2, 86, signTop); }
    
    
    function mug(s, n, pos, ddf, tmf, wf, hw, sh) {
      return '<div class="p10-mug" style="' + pos + ';--hw:' + hw + 'cqw;--sh:' + sh + 'cqw">' + mugExtras() + (n ? '<span class="nn">' + n + '</span>' : '')
        + '<div class="w" style="font-size:' + f(wf) + 'cqw">' + s.dow.toUpperCase() + ' · ' + s.monFull.toUpperCase() + '</div>'
        + '<div class="dd" style="font-size:' + f(ddf) + 'cqw">' + s.mon + ' ' + s.day + '</div>'
        + '<div class="tm" style="font-size:' + f(tmf) + 'cqw">' + s.time + '</div></div>';
    }
    function lanterns(pos, w, h, lf, df, tf, hang) {
      var rows = H.zoneRows(spec.sessions);
      return rows.map(function (r, i) {
        var x = pos[i][0], y = pos[i][1], cx = x + w / 2;
        d += '<path d="M' + f(cx) + ' ' + f(hang + (i < 4 ? .3 : .3)) + ' L' + f(cx) + ' ' + f(y - 3.2) + '" stroke="#c9a77c" stroke-width=".3"/><circle cx="' + f(cx) + '" cy="' + f(y - 3.6) + '" r=".9" fill="none" stroke="#c8733a" stroke-width=".4"/>';
        var tl = String(r.time).length, tfs2 = tl > 9 ? tf * .72 : tf;
        return '<div class="p10-lan' + (r.home ? ' h' : '') + '" style="left:' + f(x) + 'cqw;top:' + f(y) + 'cqw;width:' + w + 'cqw;height:' + h + 'cqw">' + (r.home ? '<span class="hm">HAWAIʻI TIME</span>' : '')
          + '<div class="i" style="font-size:' + f(lf) + 'cqw">' + r.label + '</div><div class="ds" style="font-size:' + f(df) + 'cqw">' + r.days + '</div><div class="ti" style="font-size:' + f(tfs2) + 'cqw">' + r.time + '</div></div>';
      }).join('');
    }
    if (!sq && !partner) {
      ledge = '<div class="p10-ledge" style="top:101cqw;height:8cqw"></div>';
      if (solo) {
        items = mug(S[0], 0, 'left:33cqw;top:79.5cqw;width:34cqw;height:21.5cqw', 7, 2.4, 1.5, 5, 9);
        d += candle(14, 101.3, 5.5, 10) + candle(22, 101.3, 4.2, 6.5) + candle(86, 101.3, 5.5, 12) + apple(77, 98.5, 3.4);
      } else {
        items = mug(S[0], 1, 'left:7cqw;top:83cqw;width:29cqw;height:18cqw', 5.4, 2, 1.25, 4.2, 7)
          + mug(S[1], 2, 'left:58cqw;top:83cqw;width:29cqw;height:18cqw', 5.4, 2, 1.25, 4.2, 7);
        d += candle(47.5, 101.3, 5.5, 11) + apple(93, 98.5, 3);
      }
    } else if (!sq && partner) {
      lab = '<div class="p10-lab" style="top:' + (n2 ? 61 : 64.2) + 'cqw"><b>What time is it on your island?</b><small>' + (n2 ? 'BOTH TOPICS' : 'TOPIC') + ' · YOUR LOCAL TIME</small></div>';
      top += strand(-3, 69.5, 50, 77.5, 103, 69.5, 11);
      items = lanterns([[5, 79], [28.5, 80.5], [52, 79], [75.5, 80.5], [16.75, 94], [40.25, 95], [63.75, 94]], 19, 11, 1.5, 1.2, 2.05, 74);
    } else if (sq && !partner) {
      ledge = '<div class="p10-ledge" style="top:76cqw;height:6cqw"></div>';
      if (solo) {
        items = mug(S[0], 0, 'left:66cqw;top:50cqw;width:26cqw;height:16.5cqw', 5, 1.75, 1.1, 3.8, 7);
        d += candle(70, 76.3, 4.4, 7) + candle(90, 76.3, 3.6, 5);
      } else {
        items = mug(S[0], 1, 'left:65cqw;top:36cqw;width:27cqw;height:14cqw', 4.2, 1.6, 1.05, 3.6, 5.5)
          + mug(S[1], 2, 'left:65cqw;top:60cqw;width:27cqw;height:14cqw', 4.2, 1.6, 1.05, 3.6, 5.5);
      }
    } else {
      top += strand(-3, 47, 50, 53, 103, 47, 11);
      items = lanterns([[6, 56], [29, 57], [52, 56], [75, 57], [17.5, 70.5], [40.5, 71], [63.5, 70.5]], 18, 9.6, 1.3, 1.05, 1.75, 50);
    }
    var svg = '<svg class="p10-deco" viewBox="0 0 100 ' + HT + '" preserveAspectRatio="none">' + d + '</svg><svg class="p10-top" viewBox="0 0 100 ' + HT + '" preserveAspectRatio="none">' + top + '</svg>';
    var foot = '<div class="p10-ft"><div class="rg"><b>REGISTER at <span>LDAHawaii.org</span></b>Get your Zoom link, scan the QR code,<br>or call ' + H.phone(partner) + '</div><div class="p10-qr">' + H.qrImg(spec, partner) + '</div><div class="p10-lg">' + H.badges(spec, partner) + '</div></div>';
    return '<div class="p10' + (sq ? ' sq' : '') + (partner ? ' partner' : '') + '">' + ledge + svg + bdg + logo + hd + sign + lab + items + foot + '</div>';
  }
}, 'ptc');

/* ---- PTC month 11 ---- */
VEBFlyers.registerTheme(11, {
  name: 'Gratitude café menu board (slate board on a brick café wall, Today\'s special, hand-drawn frames + doodles)',
  fonts: 'family=Amatic+SC:wght@700&family=Patrick+Hand&family=Oswald:wght@500;600',
  css: [
    '.p11{container-type:inline-size;aspect-ratio:8.5/11;position:relative;overflow:hidden;border-radius:4px;box-shadow:0 10px 30px rgba(40,25,15,.4);font-family:"Patrick Hand",Poppins,sans-serif;color:#f3ead6;background:#8e5136}',
    '.p11.sq{aspect-ratio:1/1}',
    '.p11 *,.p11 *:before,.p11 *:after{box-sizing:border-box}',
    '.p11 .p11-wall{position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:0}',
    '.p11 .p11-deco{position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:3}',
    '.p11 .p11-brd{position:absolute;z-index:1;pointer-events:none;border:2.4cqw solid #b98a52;border-radius:.6cqw;background:radial-gradient(ellipse at 22% 30%,rgba(255,255,255,.07),transparent 40%),radial-gradient(ellipse at 78% 72%,rgba(255,255,255,.06),transparent 45%),radial-gradient(ellipse at 60% 15%,rgba(255,255,255,.04),transparent 30%),#2b3135;box-shadow:inset 0 0 0 .35cqw #8a6034,inset 0 0 3cqw rgba(0,0,0,.55),0 0 0 .35cqw #7a5028,0 1.4cqw 2.4cqw rgba(30,15,5,.55)}',
    '.p11 .p11-brd:before{content:"";position:absolute;inset:-2.4cqw;border-radius:.6cqw;background:repeating-linear-gradient(90deg,rgba(255,255,255,.07) 0 .3cqw,transparent .3cqw 1.6cqw),repeating-linear-gradient(0deg,rgba(90,55,20,.12) 0 .2cqw,transparent .2cqw 1.3cqw);-webkit-mask:linear-gradient(#000,#000) content-box,linear-gradient(#000,#000);-webkit-mask-composite:xor;mask-composite:exclude;padding:2.4cqw}',
    '.p11 .p11-rf{position:absolute;inset:0;width:100%;height:100%;pointer-events:none;overflow:visible;z-index:-1}',
    /* header */
    '.p11 .p11-logo{position:absolute;z-index:5;left:9cqw;top:12.5cqw;width:14.5cqw;height:14.5cqw;border-radius:50%;background:#fff;display:flex;align-items:center;justify-content:center;transform:rotate(-5deg);box-shadow:0 0 0 .5cqw #e6b54a,.4cqw .8cqw 1cqw rgba(0,0,0,.45)}',
    '.p11 .p11-logo img{width:11cqw;height:auto;display:block}',
    '.p11 .p11-logo.pip{border-radius:1.4cqw;width:18cqw;height:11.5cqw;top:13.5cqw;left:8.5cqw}.p11 .p11-logo.pip img{width:16.2cqw}',
    '.p11 .p11-hd{position:absolute;z-index:5;left:27cqw;top:12cqw}',
    '.p11.partner .p11-hd{left:29cqw}',
    '.p11 .p11-hd .k{position:relative;z-index:1;font-family:Oswald,sans-serif;font-weight:500;font-size:1.55cqw;letter-spacing:.24em;color:#c9d6c9;white-space:nowrap}',
    '.p11 .p11-hd .t{font-family:"Amatic SC",cursive;font-weight:700;font-size:8.2cqw;line-height:1;color:#f3ead6;white-space:nowrap;margin-top:.2cqw}',
    '.p11 .p11-hd .t span{color:#e6b54a}',
    '.p11 .p11-hd .m{position:relative;z-index:1;display:flex;align-items:center;gap:1.6cqw;white-space:nowrap;margin-top:.2cqw}',
    '.p11 .p11-hd .m b{font-family:Oswald,sans-serif;font-weight:600;font-size:2.2cqw;letter-spacing:.22em;color:#2b3135;background:#e6b54a;padding:.25cqw 1.4cqw;transform:rotate(-1.5deg);border-radius:.3cqw .9cqw .4cqw 1cqw}',
    '.p11 .p11-hd .m i{font-style:normal;font-size:2.4cqw;color:#f3ead6;border:.25cqw solid #f3ead6;border-radius:50% 45% 55% 48%;padding:.1cqw 1.6cqw}',
    '.p11 .p11-hd .w{font-size:2.45cqw;line-height:1.15;color:#c9d6c9;margin-top:.8cqw;white-space:nowrap}',
    '.p11 .p11-badge{position:absolute;z-index:6;right:2cqw;top:1.5cqw;width:22cqw;height:22cqw;pointer-events:none;transform:rotate(9deg);filter:drop-shadow(.3cqw .7cqw .6cqw rgba(30,15,5,.5))}',
    /* today\'s special */
    '.p11 .p11-sp{position:absolute;z-index:5;left:9cqw;right:9cqw;top:33cqw;padding:2.6cqw 4.4cqw 3cqw;text-align:center;transform:rotate(-1deg)}',
    '.p11 .p11-sp .h{display:inline-flex;align-items:center;gap:1.2cqw;font-family:"Amatic SC",cursive;font-weight:700;font-size:4.4cqw;line-height:1;color:#e6b54a;white-space:nowrap}',
    '.p11 .p11-sp .h svg{width:6cqw;height:4cqw;overflow:visible}',
    '.p11 .p11-sp .t{font-family:"Amatic SC",cursive;font-weight:700;line-height:1.02;color:#f3ead6;margin-top:.6cqw}',
    '.p11 .p11-sp .t .n{color:#e6b54a;margin-right:.25em}',
    '.p11 .p11-sp .t + .t{margin-top:.6cqw}',
    '.p11 .p11-sp .d{font-size:2.9cqw;line-height:1.15;color:#e6b54a;margin-top:.6cqw}',
    '.p11 .p11-sp .p{display:inline-block;font-size:2.5cqw;line-height:1.2;color:#f3ead6;margin-top:1cqw;padding:0 1cqw .5cqw;background:url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 100 6%27 preserveAspectRatio=%27none%27%3E%3Cpath d=%27M1 3 Q8 0 16 3 T32 3 T48 3 T64 3 T80 3 T99 3%27 fill=%27none%27 stroke=%27%23d9824a%27 stroke-width=%271.4%27/%3E%3C/svg%3E") bottom/100% .9cqw no-repeat}',
    '.p11 .p11-sp .p b{font-weight:400;color:#e6b54a}',
    /* date tag */
    '.p11 .p11-tag{position:absolute;z-index:5;border-radius:50%;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center}',
    '.p11 .p11-tag .w{position:relative;z-index:1;font-family:Oswald,sans-serif;font-weight:500;letter-spacing:.22em;color:#c9d6c9;line-height:1.2}',
    '.p11 .p11-tag .dd{font-family:"Amatic SC",cursive;font-weight:700;line-height:1;color:#e6b54a;white-space:nowrap}',
    '.p11 .p11-tag .tm{position:relative;z-index:1;line-height:1.15;color:#f3ead6;white-space:nowrap}',
    '.p11 .p11-tag .nn{font-family:Oswald,sans-serif;font-weight:600;letter-spacing:.18em;color:#d9824a;line-height:1.2}',
    /* island-times menu */
    '.p11 .p11-mn{position:absolute;z-index:5;padding:2cqw 3cqw}',
    '.p11 .p11-mn .mh{text-align:center;font-family:"Amatic SC",cursive;font-weight:700;line-height:1;color:#e6b54a;white-space:nowrap}',
    '.p11 .p11-mn .ms{text-align:center;font-family:Oswald,sans-serif;font-weight:500;letter-spacing:.22em;color:#c9d6c9;white-space:nowrap;margin-top:.3cqw}',
    '.p11 .p11-col{position:absolute}',
    '.p11 .p11-it{position:relative}',
    '.p11 .p11-it .r{display:flex;align-items:baseline;gap:.6cqw;white-space:nowrap}',
    '.p11 .p11-it .r .l{color:#f3ead6}',
    '.p11 .p11-it .r .dl{flex:1;min-width:1cqw;border-bottom:.3cqw dotted rgba(243,234,214,.55);transform:translateY(-.4cqw)}',
    '.p11 .p11-it .r .tm{color:#e6b54a}',
    '.p11 .p11-it .dy{color:#c9d6c9;white-space:nowrap;line-height:1.1}',
    '.p11 .p11-it.h .r .l{color:#e6b54a}',
    '.p11 .p11-it.h{margin-left:-1.2cqw;margin-right:-1.2cqw;padding:.3cqw 1.2cqw .4cqw;border:.3cqw solid #d9824a;border-radius:45% 55% 50% 48%/60% 45% 55% 40%;background:rgba(230,181,74,.1)}',
    '.p11 .p11-it .ring{position:absolute;left:-1.6cqw;top:-.7cqw;width:calc(100% + 3cqw);height:calc(100% + 1.4cqw);pointer-events:none;overflow:visible;z-index:-1}',
    /* footer */
    '.p11 .p11-ft{position:absolute;z-index:7;left:6cqw;right:6cqw;bottom:3.6cqw;height:16cqw;background:#fbf4e4;color:#2b3135;display:flex;align-items:center;gap:2.6cqw;padding:0 3cqw 0 4cqw;transform:rotate(.6deg);box-shadow:.5cqw .9cqw 1.2cqw rgba(30,15,5,.45);clip-path:polygon(0 0,2% 4%,4% 0,6% 4%,8% 0,10% 4%,12% 0,14% 4%,16% 0,18% 4%,20% 0,22% 4%,24% 0,26% 4%,28% 0,30% 4%,32% 0,34% 4%,36% 0,38% 4%,40% 0,42% 4%,44% 0,46% 4%,48% 0,50% 4%,52% 0,54% 4%,56% 0,58% 4%,60% 0,62% 4%,64% 0,66% 4%,68% 0,70% 4%,72% 0,74% 4%,76% 0,78% 4%,80% 0,82% 4%,84% 0,86% 4%,88% 0,90% 4%,92% 0,94% 4%,96% 0,98% 4%,100% 0,100% 100%,0 100%)}',
    '.p11 .p11-ft .rg{flex:1;font-size:2.1cqw;line-height:1.25}',
    '.p11 .p11-ft .rg b{display:block;font-family:"Amatic SC",cursive;font-weight:700;font-size:5cqw;line-height:1;color:#2b3135}',
    '.p11 .p11-ft .rg b span{color:#c0571f}',
    '.p11 .p11-qr{width:10.6cqw;height:10.6cqw;background:#fff;padding:.5cqw;flex:none;display:flex;align-items:center;justify-content:center;font-family:Oswald,sans-serif;font-size:2cqw;box-shadow:0 0 0 .3cqw #2b3135}',
    '.p11 .p11-qr img{width:100%;height:100%;display:block}',
    '.p11 .p11-lg{display:flex;flex-direction:column;gap:.8cqw;flex:none;width:20cqw}',
    '.p11 .p11-lg span{background:#2b3135;color:#f3ead6;font-family:Oswald,sans-serif;font-weight:500;font-size:1.4cqw;letter-spacing:.04em;text-align:center;padding:.5cqw .8cqw;white-space:nowrap;border-radius:.4cqw}',
    '.p11 .p11-lg span:nth-child(2){background:#e6b54a;color:#2b3135}.p11 .p11-lg span:nth-child(3){background:#c0571f;color:#fff}',
    '.p11.partner:not(.sq) .p11-sp{top:31cqw;padding:2.2cqw 4cqw 2.6cqw}',
    /* square */
    '.p11.sq .p11-logo{left:7cqw;top:8.5cqw;width:11.5cqw;height:11.5cqw}.p11.sq .p11-logo img{width:8.8cqw}',
    '.p11.sq .p11-logo.pip{width:14cqw;height:9cqw;top:9.5cqw;left:6.5cqw}.p11.sq .p11-logo.pip img{width:12.6cqw}',
    '.p11.sq .p11-hd{left:21.5cqw;top:7.8cqw}.p11.sq.partner .p11-hd{left:23cqw}.p11.sq .p11-hd .k{font-size:1.35cqw}.p11.sq .p11-hd .t{font-size:6.6cqw}',
    '.p11.sq .p11-hd .m b{font-size:1.85cqw}.p11.sq .p11-hd .m i{font-size:2cqw}.p11.sq .p11-hd .w{font-size:2.1cqw;margin-top:.5cqw}',
    '.p11.sq .p11-badge{width:18cqw;height:18cqw;top:1.4cqw;right:2cqw}',
    '.p11.sq .p11-sp{left:6.5cqw;right:auto;width:56cqw;top:31cqw;padding:2cqw 3cqw 2.4cqw}',
    '.p11.sq .p11-sp .h{font-size:3.6cqw}.p11.sq .p11-sp .h svg{width:4.6cqw;height:3cqw}.p11.sq .p11-sp .d{font-size:2.3cqw}.p11.sq .p11-sp .p{font-size:2cqw;margin-top:.6cqw}',
    '.p11.sq.partner .p11-sp{width:auto;right:6.5cqw;top:28cqw;padding:1cqw 3cqw 1.3cqw}',
    '.p11.sq.partner .p11-sp .h{font-size:3cqw}',
    '.p11.sq .p11-ft{height:12.5cqw;bottom:2.6cqw;left:5cqw;right:5cqw;gap:2.2cqw;padding:0 2.6cqw 0 3.4cqw}',
    '.p11.sq .p11-ft .rg{font-size:1.75cqw}.p11.sq .p11-ft .rg b{font-size:4cqw}',
    '.p11.sq .p11-qr{width:8.8cqw;height:8.8cqw}.p11.sq .p11-lg{width:18cqw}.p11.sq .p11-lg span{font-size:1.22cqw;padding:.4cqw .6cqw}'
  ].join('\n'),
  fn: function (spec, partner, sq, H) {
    var S = spec.sessions.map(H.sessInfo), solo = S.length === 1, n2 = !solo;
    var uid = 'p11u' + (partner ? 1 : 0) + (sq ? 1 : 0) + S.length;
    var HT = sq ? 100 : 129.41;
    function f(n) { return (+n).toFixed(2); }
    var seed = 11 + (partner ? 3 : 0) + (sq ? 5 : 0) + S.length;
    function rnd() { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; }
    function j(a) { return (rnd() * 2 - 1) * a; }
    var CH = '#f3ead6', MU = '#e6b54a', OR = '#d9824a', SG = '#9bb07d';

    /* ---------- recurring PTC badge ---------- */
    function badge(c) {
      var id = uid + 'b';
      return '<svg class="p11-badge" viewBox="0 0 100 100"><defs><path id="' + id + 't" d="M17 50 A33 33 0 0 1 83 50"/><path id="' + id + 'u" d="M14 52 A36 36 0 0 0 86 52"/></defs>'
        + '<circle cx="50" cy="50" r="48" fill="' + c.ring + '"/><circle cx="50" cy="50" r="44.5" fill="none" stroke="' + c.line + '" stroke-width="1" stroke-dasharray="2.2 1.6"/>'
        + '<circle cx="50" cy="50" r="30" fill="' + c.fill + '"/>'
        + '<text font-family="Oswald,sans-serif" font-weight="600" font-size="10" letter-spacing="1.6" fill="' + c.text + '"><textPath href="#' + id + 't" startOffset="50%" text-anchor="middle">PARENT TALK</textPath></text>'
        + '<text font-family="Oswald,sans-serif" font-weight="600" font-size="10" letter-spacing="2.6" fill="' + c.text + '"><textPath href="#' + id + 'u" startOffset="50%" text-anchor="middle" dominant-baseline="hanging">CAFÉ</textPath></text>'
        + '<circle cx="10.5" cy="52" r="2" fill="' + c.text + '"/><circle cx="89.5" cy="52" r="2" fill="' + c.text + '"/>'
        + '<g fill="none" stroke="' + c.steam + '" stroke-width="2.4" stroke-linecap="round"><path d="M41 44 c-3 -4 3 -6 0 -10 c-2 -3 1 -5 0 -7"/><path d="M50 42 c-3 -4 3 -6 0 -10 c-2 -3 1 -5 0 -8"/><path d="M59 44 c-3 -4 3 -6 0 -10 c-2 -3 1 -5 0 -7"/></g>'
        + '<path d="M62 52 h4 a6.5 6.5 0 0 1 0 13 h-5" fill="none" stroke="' + c.cup + '" stroke-width="3.2"/>'
        + '<path d="M35 47 h29 l-2.6 17 a6 6 0 0 1 -6 5 h-12.8 a6 6 0 0 1 -6 -5 z" fill="' + c.cup + '"/>'
        + '<path d="M35.6 51 h27.8 l-.8 4.6 h-26.2 z" fill="' + c.band + '"/>'
        + '<ellipse cx="49.5" cy="71" rx="21" ry="3.4" fill="' + c.cup + '"/><ellipse cx="49.5" cy="70.2" rx="14" ry="1.5" fill="' + c.band + '" opacity=".6"/>'
        + '</svg>';
    }

    /* ---------- hand-drawn helpers (cqw coordinates) ---------- */
    function rough(x, y, w, h, col, sw, passes) {
      var g = '';
      for (var p = 0; p < (passes || 2); p++) {
        var o = p ? .5 : 0;
        g += '<path d="M' + f(x - 1 + j(.4)) + ' ' + f(y + j(.4) + o) + ' L' + f(x + w + 1 + j(.4)) + ' ' + f(y + j(.5) - o)
          + ' M' + f(x + w + j(.4) - o) + ' ' + f(y - 1 + j(.4)) + ' L' + f(x + w + j(.5) + o) + ' ' + f(y + h + 1 + j(.4))
          + ' M' + f(x + w + 1 + j(.4)) + ' ' + f(y + h + j(.4) + o) + ' L' + f(x - 1 + j(.4)) + ' ' + f(y + h + j(.5))
          + ' M' + f(x + j(.4) + o) + ' ' + f(y + h + 1 + j(.4)) + ' L' + f(x + j(.5)) + ' ' + f(y - 1 + j(.4)) + '" fill="none" stroke="' + col + '" stroke-width="' + f(sw * (p ? .6 : 1)) + '" stroke-linecap="round" opacity="' + (p ? .6 : .95) + '"/>';
      }
      return g;
    }
    function roughCircle(cx, cy, r, col, sw) {
      var pts = [], n = 28, g = '';
      for (var p = 0; p < 2; p++) {
        var d = '', st = rnd() * 6.28;
        for (var i = 0; i <= n + 2; i++) { var a = st + i / n * 6.28, rr = r + j(.35) + (p ? .6 : 0); d += (i ? ' L' : 'M') + f(cx + Math.cos(a) * rr) + ' ' + f(cy + Math.sin(a) * rr); }
        g += '<path d="' + d + '" fill="none" stroke="' + col + '" stroke-width="' + f(sw * (p ? .6 : 1)) + '" stroke-linejoin="round" opacity="' + (p ? .6 : .95) + '"/>';
      }
      return g;
    }
    function cup(x, y, s) {
      return '<g transform="translate(' + f(x) + ' ' + f(y) + ') scale(' + f(s / 10) + ')" fill="none" stroke="' + CH + '" stroke-width=".45" stroke-linecap="round" stroke-linejoin="round">'
        + '<path d="M-4 -1 L4 -1 L3.2 4 Q3 5.5 1.5 5.5 L-1.5 5.5 Q-3 5.5 -3.2 4 Z"/><path d="M3.8 .2 Q6.3 .2 6 2.2 Q5.7 3.6 3.4 3.4"/><path d="M-6 6.4 Q0 8 6 6.4"/>'
        + '<path d="M-1.6 -2.2 q-1 -1.2 0 -2.4 q.8 -1 0 -2" stroke="' + MU + '"/><path d="M1.2 -2.2 q-1 -1.2 0 -2.4 q.8 -1 0 -2" stroke="' + MU + '"/>'
        + '<path d="M-2.4 1.6 q2.4 1.2 4.8 0" stroke="' + OR + '"/></g>';
    }
    function pie(x, y, s) {
      return '<g transform="translate(' + f(x) + ' ' + f(y) + ') scale(' + f(s / 10) + ')" fill="none" stroke-linecap="round" stroke-linejoin="round">'
        + '<path d="M-6 2 L5 -3 L6 2 Z" fill="' + OR + '" fill-opacity=".85" stroke="' + CH + '" stroke-width=".4"/><path d="M-6 2 L6 2 L6 3.6 L-6 3.6 Z" fill="#c99a5b" stroke="' + CH + '" stroke-width=".4"/>'
        + '<path d="M5 -3 Q6.6 -.6 6 2" stroke="#e8c48a" stroke-width="1"/><path d="M1 -3.6 q1 -1.2 2.2 -.4 q.6 -1.2 1.6 -.2 q-.4 1.2 -1.8 1 q-1 .6 -2 -.4z" fill="' + CH + '" stroke="none"/></g>';
    }
    function leaf(x, y, s, r, col) {
      return '<g transform="translate(' + f(x) + ' ' + f(y) + ') rotate(' + f(r) + ') scale(' + f(s / 10) + ')" fill="none" stroke="' + col + '" stroke-width=".55" stroke-linecap="round" stroke-linejoin="round">'
        + '<path d="M0 5 L0 -5 M0 -5 Q4 -3 4 1 Q2 3.4 0 5 Q-2 3.4 -4 1 Q-4 -3 0 -5 M0 -1 L2.4 -2.6 M0 1.6 L-2.4 0 M0 1.6 L2.6 .2"/></g>';
    }
    function wheat(x, y, s, r) {
      var g = '<g transform="translate(' + f(x) + ' ' + f(y) + ') rotate(' + f(r) + ') scale(' + f(s / 10) + ')" fill="none" stroke="' + MU + '" stroke-width=".45" stroke-linecap="round"><path d="M0 7 L0 -6"/>';
      for (var i = 0; i < 5; i++) { var yy = -5 + i * 2.2; g += '<path d="M0 ' + f(yy + 1.6) + ' Q-1.8 ' + f(yy + .8) + ' -1.4 ' + f(yy - .6) + ' Q-.2 ' + f(yy) + ' 0 ' + f(yy + 1.6) + 'Z M0 ' + f(yy + 1.6) + ' Q1.8 ' + f(yy + .8) + ' 1.4 ' + f(yy - .6) + ' Q.2 ' + f(yy) + ' 0 ' + f(yy + 1.6) + 'Z"/>'; }
      return g + '</g>';
    }
    function star(x, y, s, col) { return '<path d="M' + f(x) + ' ' + f(y - s) + ' L' + f(x) + ' ' + f(y + s) + ' M' + f(x - s) + ' ' + f(y) + ' L' + f(x + s) + ' ' + f(y) + ' M' + f(x - s * .6) + ' ' + f(y - s * .6) + ' L' + f(x + s * .6) + ' ' + f(y + s * .6) + ' M' + f(x - s * .6) + ' ' + f(y + s * .6) + ' L' + f(x + s * .6) + ' ' + f(y - s * .6) + '" stroke="' + col + '" stroke-width=".35" stroke-linecap="round"/>'; }
    function swirl(x, y, s, r) { return '<path transform="translate(' + f(x) + ' ' + f(y) + ') rotate(' + f(r) + ') scale(' + f(s / 10) + ')" d="M-6 0 Q-2 -4 0 0 T6 0 M4 -1.6 L6 0 L4 1.4" fill="none" stroke="' + CH + '" stroke-width=".5" stroke-linecap="round" stroke-linejoin="round" opacity=".8"/>'; }
    function laurel(flip) {
      return '<svg viewBox="0 0 30 20"' + (flip ? ' style="transform:scaleX(-1)"' : '') + '><g fill="none" stroke="' + SG + '" stroke-width="1.6" stroke-linecap="round"><path d="M28 16 Q14 18 3 8"/><path d="M8 12 q-4 -1 -4 -5 q4 1 4 5z M14 14.5 q-3 -3 -1.5 -7 q3 3 1.5 7z M20 15.6 q-3 -2 -2 -6.4 q3 2.6 2 6.4z M8 12 q-1 4 -5 4.6 q.4 -4 5 -4.6z M15 15 q-1 3.6 -5 4 q.6 -3.6 5 -4z"/></g></svg>';
    }
    function elemFrame(col, sw) {
      // a rough double frame drawn in the element's own box (percent units, non-scaling stroke)
      var a = '', b = '';
      for (var p = 0; p < 2; p++) {
        var o = p ? 1.2 : 0;
        a += '<path vector-effect="non-scaling-stroke" d="M' + f(-.6 + j(.4) + o) + ' ' + f(1 + j(.6) + o) + ' L' + f(100.8 + j(.4) - o) + ' ' + f(.6 + j(.6) + o) + ' M' + f(99.6 + j(.3) - o) + ' ' + f(-.6 + j(.5)) + ' L' + f(99.8 + j(.3) - o) + ' ' + f(100.8 + j(.5))
          + ' M' + f(100.6 + j(.4) - o) + ' ' + f(99.4 + j(.6) - o) + ' L' + f(-.8 + j(.4) + o) + ' ' + f(99.8 + j(.6) - o) + ' M' + f(.4 + j(.3) + o) + ' ' + f(100.8 + j(.5)) + ' L' + f(.2 + j(.3) + o) + ' ' + f(-.8 + j(.5)) + '" fill="none" stroke="' + col + '" stroke-width="' + (p ? sw * .55 : sw) + '" stroke-linecap="round" opacity="' + (p ? .55 : .95) + '"/>';
      }
      return '<svg class="p11-rf" viewBox="0 0 100 100" preserveAspectRatio="none">' + a + b + '</svg>';
    }

    /* ---------- wall ---------- */
    var wall = '<svg class="p11-wall" viewBox="0 0 100 ' + HT + '" preserveAspectRatio="none"><rect width="100" height="' + HT + '" fill="#d8c3a5"/>';
    var bc = ['#9a5638', '#8e4d31', '#a35f3f', '#874a2f', '#96553a'];
    for (var ry = 0, row = 0; ry < HT; ry += 4.2, row++) {
      for (var rx = (row % 2 ? -4.6 : 0); rx < 100; rx += 9.2) {
        wall += '<rect x="' + f(rx + .25) + '" y="' + f(ry + .25) + '" width="8.7" height="3.7" rx=".3" fill="' + bc[Math.floor(rnd() * bc.length)] + '"/>';
      }
    }
    wall += '<rect width="100" height="' + HT + '" fill="url(#' + uid + 'v)"/><defs><radialGradient id="' + uid + 'v" cx=".5" cy=".4" r=".75"><stop offset=".55" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#1a0d06" stop-opacity=".45"/></radialGradient></defs></svg>';
    var bb = sq ? { l: 3.5, t: 3.5, r: 3.5, b: 82 } : { l: 3.5, t: 4, r: 3.5, b: 106 };
    var board = '<div class="p11-brd" style="left:' + bb.l + 'cqw;right:' + bb.r + 'cqw;top:' + bb.t + 'cqw;height:' + f(bb.b - bb.t) + 'cqw"></div>';

    /* ---------- header ---------- */
    var month = H.MONTHS[spec.month - 1], series = H.esc(spec.series || 'Parent Talk Café'), sw = series.split(' '), last = sw.pop();
    var logo = partner ? '<div class="p11-logo pip"><img src="' + spec.pipUrl + '" alt=""></div>' : '<div class="p11-logo"><img src="' + spec.logoUrl + '" alt=""></div>';
    var hd = '<div class="p11-hd"><div class="k">' + (partner ? 'FOR FAMILIES ACROSS THE PACIFIC' : 'PARENT TRAINING &amp; INFORMATION CENTER') + '</div>'
      + '<div class="t">' + (sw.length ? sw.join(' ') + ' ' : '') + '<span>' + last + '</span></div>'
      + '<div class="m"><b>' + month.toUpperCase() + ' ' + spec.year + '</b><i>on Zoom</i></div>'
      + '<div class="w">' + H.PTC_WHERE + '</div></div>';
    var bdg = badge({ ring: '#c0571f', line: '#f7d58a', fill: '#fbf4e4', text: '#fff7ea', cup: '#2b3135', band: '#e6b54a', steam: '#c0571f' });

    /* ---------- today's special ---------- */
    var L = Math.max.apply(null, spec.sessions.map(function (s) { return String(s.lesson || '').length; }));
    var tfs;
    if (sq) tfs = partner ? (n2 ? 3.4 : 4.2) : (n2 ? 4.4 : (L > 30 ? 5.6 : 6.6));
    else tfs = partner ? (n2 ? 4.6 : (L > 30 ? 5.4 : 7)) : (n2 ? 5.8 : (L > 30 ? 7.2 : 8.6));
    var pres = spec.presenter ? '<div class="p">Presented by <b>' + H.esc(spec.presenter) + '</b></div>' : '';
    var topics = S.map(function (s, i) { return '<div class="t" style="font-size:' + f(tfs) + 'cqw">' + (n2 ? '<span class="n">' + (i + 1) + '.</span>' : '') + s.lesson + '</div>'; }).join('');
    var showDesc = solo && S[0].desc && !partner;
    var sp = '<div class="p11-sp">' + elemFrame(CH, 2.4) + '<div class="h">' + laurel(false) + (n2 ? 'Today\'s specials' : 'Today\'s special') + laurel(true) + '</div>' + topics + (showDesc ? '<div class="d">' + S[0].desc + '</div>' : '') + pres + '</div>';

    /* ---------- composition ---------- */
    var d = '', items = '';
    function tag(s, n, cx, cy, r, ddf, tmf, wf) {
      d += roughCircle(cx, cy, r, n === 2 ? OR : MU, .55) + roughCircle(cx, cy, r - 1.4, CH, .25);
      return '<div class="p11-tag" style="left:' + f(cx - r + 2) + 'cqw;top:' + f(cy - r + 2) + 'cqw;width:' + f(2 * r - 4) + 'cqw;height:' + f(2 * r - 4) + 'cqw">'
        + (n ? '<div class="nn" style="font-size:' + f(wf) + 'cqw">TOPIC ' + n + '</div>' : '')
        + '<div class="w" style="font-size:' + f(wf) + 'cqw">' + s.dow.toUpperCase() + '</div>'
        + '<div class="dd" style="font-size:' + f(ddf) + 'cqw">' + s.mon + ' ' + s.day + '</div>'
        + '<div class="tm" style="font-size:' + f(tmf) + 'cqw">' + s.time + '</div></div>';
    }
    function menu(box, cols, hf, sf, lf, tf, df, rowH) {
      var rows = H.zoneRows(spec.sessions);
      var html = '<div class="p11-mn" style="left:' + box[0] + 'cqw;top:' + box[1] + 'cqw;width:' + box[2] + 'cqw;height:' + box[3] + 'cqw;transform:rotate(.8deg)">' + elemFrame(MU, 2)
        + '<div class="mh" style="font-size:' + f(hf) + 'cqw">What time is it on your island?</div><div class="ms" style="font-size:' + f(sf) + 'cqw">' + (n2 ? 'BOTH TOPICS' : 'THE TOPIC') + ' · YOUR LOCAL TIME</div>';
      cols.forEach(function (c, ci) {
        html += '<div class="p11-col" style="left:' + c.x + 'cqw;top:' + c.y + 'cqw;width:' + c.w + 'cqw;transform:rotate(' + c.r + 'deg)">';
        c.idx.forEach(function (ri, k) {
          var r = rows[ri], tl = String(r.time).length, tfs2 = tl > 9 ? tf * .8 : tf;
          var ring = false ? '<svg class="ring" viewBox="0 0 100 100" preserveAspectRatio="none"><path vector-effect="non-scaling-stroke" d="M50 3 C85 1 99 20 98 50 C97 84 80 98 48 97 C16 96 2 80 2 50 C3 18 22 4 60 6" fill="none" stroke="' + OR + '" stroke-width="2.4" stroke-linecap="round"/></svg>' : '';
          html += '<div class="p11-it' + (r.home ? ' h' : '') + '" style="margin-top:' + (k ? rowH : 0) + 'cqw">' + ring + '<div class="r"><span class="l" style="font-size:' + f(lf) + 'cqw">' + r.label + (r.home ? ' (HST)' : '') + '</span><span class="dl"></span><span class="tm" style="font-size:' + f(tfs2) + 'cqw">' + r.time + '</span></div><div class="dy" style="font-size:' + f(df) + 'cqw">' + r.days + '</div></div>';
        });
        html += '</div>';
      });
      return html + '</div>';
    }
    if (!sq && !partner) {
      if (solo) {
        items = tag(S[0], 0, 26, 87.5, 14.5, 9, 2.5, 1.7);
        d += cup(69, 83, 16) + pie(89, 95, 9) + wheat(50, 92, 8, -18) + wheat(93, 82, 8, 16) + leaf(56, 75, 6, -30, OR) + leaf(90, 98, 5, 40, SG)
          + '<text x="67" y="100.6" font-family="Amatic SC,cursive" font-weight="700" font-size="4.4" fill="' + MU + '" text-anchor="middle">give thanks</text>' + swirl(48, 80, 5, -20);
        d += star(8, 70, .9, MU) + star(47, 99, .8, CH) + star(92, 70, .9, CH);
      } else {
        items = tag(S[0], 1, 24, 84, 13.4, 8, 2.3, 1.55) + tag(S[1], 2, 57.5, 88.5, 13.4, 8, 2.3, 1.55);
        d += cup(84, 80, 15) + pie(85, 97, 9) + leaf(41, 73, 5, -30, OR) + leaf(41, 101, 4.5, 30, SG) + wheat(8, 99, 7, -10) + star(72, 72, .9, MU) + star(8, 70, .8, CH);
      }
      d += leaf(7, 33, 4.5, -20, OR) + leaf(93, 31, 4.5, 25, MU);
    } else if (!sq && partner) {
      items = menu([7.5, 60.5, 85, 42], [{ x: 3, y: 9.6, w: 37, r: -1.2, idx: [0, 1, 2, 3] }, { x: 45, y: 9.6, w: 36, r: 1, idx: [4, 5, 6] }], 4.4, 1.3, 2.25, 2.25, 1.55, 3);
      d += cup(81, 96.5, 9) + leaf(68, 99, 4, -20, OR) + star(92, 92, .8, MU);
    } else if (sq && !partner) {
      if (solo) {
        items = tag(S[0], 0, 79, 46, 13.5, 7.2, 2.05, 1.45);
        d += cup(74, 71, 12) + pie(87, 75, 8) + leaf(66, 30, 4, -25, OR) + star(94, 64, .7, MU);
      } else {
        items = tag(S[0], 1, 80, 39, 11.5, 5.8, 1.8, 1.3) + tag(S[1], 2, 80, 64.5, 11.5, 5.8, 1.8, 1.3);
        d += cup(24, 70, 9) + pie(44, 73, 7) + wheat(10, 72, 6, -14) + leaf(57, 69, 4, 25, OR) + star(34, 66, .7, MU);
      }
    } else {
      items = menu([6.5, 49, 87, 30.2], [{ x: 2.6, y: 7.4, w: 38, r: -1, idx: [0, 1, 2, 3] }, { x: 45.5, y: 7.4, w: 36, r: .8, idx: [4, 5, 6] }], 3.4, 1.05, 1.75, 1.75, 1.2, 1.1);
      d += cup(84, 75, 6.5);
    }
    var svg = '<svg class="p11-deco" viewBox="0 0 100 ' + HT + '" preserveAspectRatio="none">' + d + '</svg>';
    var foot = '<div class="p11-ft"><div class="rg"><b>REGISTER at <span>LDAHawaii.org</span></b>Get your Zoom link, scan the QR code,<br>or call ' + H.phone(partner) + '</div><div class="p11-qr">' + H.qrImg(spec, partner) + '</div><div class="p11-lg">' + H.badges(spec, partner) + '</div></div>';
    return '<div class="p11' + (sq ? ' sq' : '') + (partner ? ' partner' : '') + '">' + wall + board + svg + bdg + logo + hd + sp + items + foot + '</div>';
  }
}, 'ptc');

/* ---- PTC month 12 ---- */
VEBFlyers.registerTheme(12, {
  name: 'Peppermint mocha holiday (big to-go cup with topic on the sleeve, candy-cane stirrer, peppermint swirl candies)',
  fonts: 'family=Lobster&family=Baloo+2:wght@500;600;700;800',
  css: [
    '.p12{container-type:inline-size;aspect-ratio:8.5/11;position:relative;overflow:hidden;border-radius:4px;box-shadow:0 10px 30px rgba(36,20,13,.45);font-family:"Baloo 2",Poppins,sans-serif;color:#fff3e3;background-color:#3b2218;background-image:radial-gradient(circle at 30% 30%,rgba(255,255,255,.05) 0 .35cqw,transparent .4cqw),radial-gradient(circle at 70% 70%,rgba(0,0,0,.18) 0 .3cqw,transparent .35cqw),radial-gradient(ellipse at 50% 45%,#5a3726 0%,#3b2218 60%,#24140d 100%);background-size:4cqw 4cqw,5cqw 5cqw,100% 100%}',
    '.p12.sq{aspect-ratio:1/1}',
    '.p12 *,.p12 *:before,.p12 *:after{box-sizing:border-box}',
    '.p12 .p12-deco{position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:2}',
    '.p12 .p12-edge{position:absolute;left:0;right:0;height:1.8cqw;pointer-events:none;z-index:1;background:repeating-linear-gradient(-45deg,#d7263d 0 1.4cqw,#fffaf5 1.4cqw 2.8cqw)}',
    /* header */
    '.p12 .p12-logo{position:absolute;z-index:5;left:5cqw;top:5cqw;width:15cqw;height:15cqw;border-radius:50%;background:#fff;display:flex;align-items:center;justify-content:center;box-shadow:0 0 0 .5cqw #fff,0 0 0 1.3cqw #d7263d,0 .8cqw 1.6cqw rgba(0,0,0,.45)}',
    '.p12 .p12-logo img{width:11.2cqw;height:auto;display:block}',
    '.p12 .p12-logo.pip{border-radius:1.6cqw;width:17.5cqw;height:11.5cqw;top:6cqw;box-shadow:0 0 0 .7cqw #d7263d,0 .8cqw 1.6cqw rgba(0,0,0,.45)}.p12 .p12-logo.pip img{width:16.2cqw}',
    '.p12 .p12-hd{position:absolute;z-index:5;left:24cqw;top:5cqw}',
    '.p12.partner .p12-hd{left:25cqw}',
    '.p12 .p12-hd .k{position:relative;z-index:1;font-weight:700;font-size:1.6cqw;letter-spacing:.2em;color:#8fd9c0;white-space:nowrap}',
    '.p12 .p12-hd .t{font-family:Lobster,cursive;font-size:6.4cqw;line-height:1.15;color:#fff3e3;white-space:nowrap;text-shadow:0 .4cqw 0 #24140d}',
    '.p12 .p12-hd .t span{color:#ff8a98}',
    '.p12 .p12-hd .m{position:relative;z-index:1;display:flex;align-items:center;gap:1.2cqw;white-space:nowrap;margin-top:.3cqw}',
    '.p12 .p12-hd .m b{font-weight:800;font-size:2.2cqw;letter-spacing:.16em;color:#fff;background:#d7263d;border-radius:3cqw;padding:.35cqw 1.8cqw .1cqw;box-shadow:inset 0 0 0 .3cqw #fffaf5}',
    '.p12 .p12-hd .m i{font-style:normal;font-weight:800;font-size:1.75cqw;letter-spacing:.12em;color:#24140d;background:#8fd9c0;border-radius:3cqw;padding:.35cqw 1.5cqw .1cqw}',
    '.p12 .p12-hd .w{position:relative;z-index:1;font-weight:600;font-size:2.3cqw;line-height:1.2;color:#f3d9c4;margin-top:.7cqw;white-space:nowrap}',
    '.p12 .p12-badge{position:absolute;z-index:4;right:3cqw;top:3cqw;width:21cqw;height:21cqw;pointer-events:none;transform:rotate(10deg);filter:drop-shadow(0 .6cqw .8cqw rgba(0,0,0,.45))}',
    /* sleeve / ribbon */
    '.p12 .p12-slv{position:absolute;z-index:5;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;color:#3b2218;background:linear-gradient(90deg,rgba(0,0,0,.07),transparent 18%,transparent 82%,rgba(0,0,0,.1)),#fff3e3;padding:2.8cqw 5cqw 2.8cqw}',
    '.p12 .p12-slv:before,.p12 .p12-slv:after{content:"";position:absolute;left:0;right:0;height:1.6cqw;background:repeating-linear-gradient(-45deg,#d7263d 0 1.2cqw,#fffaf5 1.2cqw 2.4cqw)}',
    '.p12 .p12-slv:before{top:0}.p12 .p12-slv:after{bottom:0}',
    '.p12 .p12-slv .h{position:relative;z-index:1;font-weight:800;font-size:1.7cqw;letter-spacing:.28em;color:#2f9e7e;white-space:nowrap}',
    '.p12 .p12-slv .t{font-weight:800;line-height:1.08;color:#3b2218}',
    '.p12 .p12-slv .t .n{color:#d7263d;margin-right:.25em}',
    '.p12 .p12-slv .t + .t{margin-top:.6cqw}',
    '.p12 .p12-slv .d{font-family:Lobster,cursive;font-size:2.9cqw;line-height:1.2;color:#d7263d;margin-top:.5cqw}',
    '.p12 .p12-slv .p{position:relative;z-index:1;font-weight:700;font-size:2.15cqw;line-height:1.2;color:#3b2218;margin-top:.7cqw}',
    '.p12 .p12-slv .p b{font-weight:800;color:#a8152b}',
    '.p12 .p12-rib{clip-path:polygon(0 0,100% 0,96.5% 50%,100% 100%,0 100%,3.5% 50%);padding:1.8cqw 6cqw}',
    /* candies */
    '.p12 .p12-cd{position:absolute;z-index:6;border-radius:50%;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;color:#3b2218;background:radial-gradient(circle,#fffaf5 0 59%,rgba(0,0,0,.08) 60%,transparent 61.5%),repeating-conic-gradient(from 8deg,var(--sc,#d7263d) 0 18deg,#fffaf5 18deg 36deg);box-shadow:inset 0 0 0 .35cqw rgba(255,255,255,.7),inset -.8cqw -1cqw 1.4cqw rgba(0,0,0,.18),0 .8cqw 1.2cqw rgba(0,0,0,.4)}',
    '.p12 .p12-cd:before,.p12 .p12-cd:after{content:"";position:absolute;top:50%;width:var(--tw,3cqw);height:calc(var(--tw,3cqw) * 1.5);margin-top:calc(var(--tw,3cqw) * -.75);background:linear-gradient(180deg,rgba(255,255,255,.75),rgba(220,235,235,.45));z-index:-1}',
    '.p12 .p12-cd:before{right:96%;clip-path:polygon(0 0,100% 40%,100% 60%,0 100%,22% 50%)}',
    '.p12 .p12-cd:after{left:96%;clip-path:polygon(100% 0,0 40%,0 60%,100% 100%,78% 50%)}',
    '.p12 .p12-cd .w{position:relative;z-index:1;font-weight:800;letter-spacing:.18em;color:#2f9e7e;line-height:1.1}',
    '.p12 .p12-cd .dd{font-family:Lobster,cursive;line-height:1.1;color:#d7263d;white-space:nowrap}',
    '.p12 .p12-cd .tm{position:relative;z-index:1;font-weight:800;line-height:1.1;white-space:nowrap}',
    '.p12 .p12-cd .i{position:relative;z-index:2;font-weight:800;line-height:1.02}',
    '.p12 .p12-cd .ds{position:relative;z-index:1;font-weight:600;line-height:1.05;color:#6b4a3a}',
    '.p12 .p12-cd .ti{font-weight:800;line-height:1.02;color:#a8152b}',
    '.p12 .p12-cd .nn{position:relative;z-index:2;font-weight:800;letter-spacing:.14em;color:#a8152b;line-height:1.1}',
    '.p12 .p12-cd.h{--sc:#2f9e7e}.p12 .p12-cd.h .ti{color:#1f7a60}',
    '.p12 .p12-cd .hm{position:absolute;top:-1.6cqw;left:50%;transform:translateX(-50%) rotate(-4deg);background:#2f9e7e;color:#fff;font-weight:800;font-size:1.15cqw;letter-spacing:.14em;padding:.25cqw .9cqw .05cqw;border-radius:3cqw;white-space:nowrap;z-index:2}',
    '.p12 .p12-lab{position:absolute;z-index:5;left:50%;transform:translateX(-50%) rotate(-1deg);text-align:center;white-space:nowrap;background:#2f9e7e;color:#fff;border-radius:.8cqw;padding:.5cqw 3cqw .3cqw;box-shadow:0 .5cqw 0 #1f6b55}',
    '.p12 .p12-lab b{display:block;font-family:Lobster,cursive;font-weight:400;font-size:2.8cqw;line-height:1.15}',
    '.p12 .p12-lab small{display:block;font-weight:800;font-size:1.25cqw;letter-spacing:.2em;color:#dff7ee}',
    /* footer */
    '.p12 .p12-ft{position:absolute;z-index:7;left:5cqw;right:5cqw;bottom:4cqw;height:17cqw;background:#fff3e3;color:#3b2218;border-radius:1.4cqw;display:flex;align-items:center;gap:2.6cqw;padding:1cqw 3cqw 0 4cqw;overflow:hidden;box-shadow:0 1cqw 2cqw rgba(0,0,0,.45)}',
    '.p12 .p12-ft:before{content:"";position:absolute;left:0;right:0;top:0;height:1.6cqw;background:repeating-linear-gradient(-45deg,#d7263d 0 1.2cqw,#fffaf5 1.2cqw 2.4cqw)}',
    '.p12 .p12-ft .rg{flex:1;font-weight:600;font-size:1.85cqw;line-height:1.3}',
    '.p12 .p12-ft .rg b{display:block;font-weight:800;font-size:3.3cqw;line-height:1.1;color:#3b2218;margin-bottom:.3cqw}',
    '.p12 .p12-ft .rg b span{color:#d7263d}',
    '.p12 .p12-qr{width:10.6cqw;height:10.6cqw;background:#fff;padding:.5cqw;flex:none;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:2cqw;box-shadow:0 0 0 .3cqw #3b2218;border-radius:.4cqw}',
    '.p12 .p12-qr img{width:100%;height:100%;display:block}',
    '.p12 .p12-lg{display:flex;flex-direction:column;gap:.8cqw;flex:none;width:20cqw}',
    '.p12 .p12-lg span{background:#d7263d;color:#fff;font-weight:800;font-size:1.4cqw;text-align:center;padding:.5cqw .8cqw .25cqw;white-space:nowrap;border-radius:3cqw}',
    '.p12 .p12-lg span:nth-child(2){background:#2f9e7e}.p12 .p12-lg span:nth-child(3){background:#3b2218}',
    /* square */
    '.p12.sq .p12-logo{left:4.5cqw;top:4.5cqw;width:12cqw;height:12cqw}.p12.sq .p12-logo img{width:9cqw}',
    '.p12.sq .p12-logo.pip{width:14.5cqw;height:9.5cqw;top:5cqw}.p12.sq .p12-logo.pip img{width:13cqw}',
    '.p12.sq .p12-hd{left:20cqw;top:3.8cqw}.p12.sq.partner .p12-hd{left:22cqw}.p12.sq .p12-hd .k{font-size:1.4cqw}.p12.sq .p12-hd .t{font-size:5.4cqw}',
    '.p12.sq .p12-hd .m b{font-size:1.85cqw}.p12.sq .p12-hd .m i{font-size:1.5cqw}.p12.sq .p12-hd .w{font-size:2cqw;margin-top:.5cqw}',
    '.p12.sq .p12-badge{width:17.5cqw;height:17.5cqw;top:2.5cqw;right:3cqw}',
    '.p12.sq .p12-slv{padding:2.4cqw 3.4cqw}.p12.sq .p12-slv .h{font-size:1.4cqw}.p12.sq .p12-slv .d{font-size:2.3cqw}.p12.sq .p12-slv .p{font-size:1.8cqw;margin-top:.4cqw}',
    '.p12.sq .p12-rib{padding:1.9cqw 6cqw 1.8cqw}',
    '.p12.sq .p12-ft{height:13cqw;bottom:3cqw;left:4cqw;right:4cqw;gap:2.2cqw;padding:1cqw 2.6cqw 0 3.6cqw}',
    '.p12.sq .p12-ft .rg{font-size:1.55cqw}.p12.sq .p12-ft .rg b{font-size:2.8cqw}',
    '.p12.sq .p12-qr{width:8.6cqw;height:8.6cqw}.p12.sq .p12-lg{width:18cqw}.p12.sq .p12-lg span{font-size:1.22cqw;padding:.4cqw .6cqw .2cqw}'
  ].join('\n'),
  fn: function (spec, partner, sq, H) {
    var S = spec.sessions.map(H.sessInfo), solo = S.length === 1, n2 = !solo;
    var uid = 'p12u' + (partner ? 1 : 0) + (sq ? 1 : 0) + S.length;
    var HT = sq ? 100 : 129.41;
    function f(n) { return (+n).toFixed(2); }
    var seed = 12 + (partner ? 3 : 0) + (sq ? 5 : 0) + S.length;
    function rnd() { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; }

    /* ---------- recurring PTC badge ---------- */
    function badge(c) {
      var id = uid + 'b';
      return '<svg class="p12-badge" viewBox="0 0 100 100"><defs><path id="' + id + 't" d="M17 50 A33 33 0 0 1 83 50"/><path id="' + id + 'u" d="M14 52 A36 36 0 0 0 86 52"/></defs>'
        + '<circle cx="50" cy="50" r="48" fill="' + c.ring + '"/><circle cx="50" cy="50" r="44.5" fill="none" stroke="' + c.line + '" stroke-width="1" stroke-dasharray="2.2 1.6"/>'
        + '<circle cx="50" cy="50" r="30" fill="' + c.fill + '"/>'
        + '<text font-family="Baloo 2,sans-serif" font-weight="800" font-size="10.5" letter-spacing="1.2" fill="' + c.text + '"><textPath href="#' + id + 't" startOffset="50%" text-anchor="middle">PARENT TALK</textPath></text>'
        + '<text font-family="Baloo 2,sans-serif" font-weight="800" font-size="10.5" letter-spacing="2.4" fill="' + c.text + '"><textPath href="#' + id + 'u" startOffset="50%" text-anchor="middle" dominant-baseline="hanging">CAFÉ</textPath></text>'
        + '<circle cx="10.5" cy="52" r="2" fill="' + c.text + '"/><circle cx="89.5" cy="52" r="2" fill="' + c.text + '"/>'
        + '<g fill="none" stroke="' + c.steam + '" stroke-width="2.4" stroke-linecap="round"><path d="M41 44 c-3 -4 3 -6 0 -10 c-2 -3 1 -5 0 -7"/><path d="M50 42 c-3 -4 3 -6 0 -10 c-2 -3 1 -5 0 -8"/><path d="M59 44 c-3 -4 3 -6 0 -10 c-2 -3 1 -5 0 -7"/></g>'
        + '<path d="M62 52 h4 a6.5 6.5 0 0 1 0 13 h-5" fill="none" stroke="' + c.cup + '" stroke-width="3.2"/>'
        + '<path d="M35 47 h29 l-2.6 17 a6 6 0 0 1 -6 5 h-12.8 a6 6 0 0 1 -6 -5 z" fill="' + c.cup + '"/>'
        + '<path d="M35.6 51 h27.8 l-.8 4.6 h-26.2 z" fill="' + c.band + '"/>'
        + '<ellipse cx="49.5" cy="71" rx="21" ry="3.4" fill="' + c.cup + '"/><ellipse cx="49.5" cy="70.2" rx="14" ry="1.5" fill="' + c.band + '" opacity=".6"/>'
        + '</svg>';
    }

    /* ---------- drawings ---------- */
    var cupN = 0;
    function cane(x0, y0, x1, y1, w) {
      var dx = x1 - x0, dy = y1 - y0, L = Math.sqrt(dx * dx + dy * dy), ux = dx / L, uy = dy / L, px = -uy, py = ux, r = w * 2.2;
      var p = 'M' + f(x0) + ' ' + f(y0) + ' L' + f(x1) + ' ' + f(y1) + ' A' + f(r) + ' ' + f(r) + ' 0 0 1 ' + f(x1 + px * 2 * r) + ' ' + f(y1 + py * 2 * r) + ' L' + f(x1 + px * 2 * r - ux * r * .9) + ' ' + f(y1 + py * 2 * r - uy * r * .9);
      return '<path d="' + p + '" fill="none" stroke="#fffaf5" stroke-width="' + f(w) + '" stroke-linecap="round"/><path d="' + p + '" fill="none" stroke="#d7263d" stroke-width="' + f(w) + '" stroke-dasharray="' + f(w * .7) + ' ' + f(w * .9) + '"/>';
    }
    function cup(cx, yTop, W, Wb, yBot, caneArgs, cs) {
      cs = cs || .75;
      var id = uid + 'c' + (cupN++), lidY = yTop + W * .14, bodyY = lidY + W * .07;
      var g = '<defs><clipPath id="' + id + '"><path d="M' + f(cx - W / 2) + ' ' + f(bodyY) + ' L' + f(cx + W / 2) + ' ' + f(bodyY) + ' L' + f(cx + Wb / 2) + ' ' + f(yBot) + ' L' + f(cx - Wb / 2) + ' ' + f(yBot) + 'Z"/></clipPath></defs>';
      g += '<ellipse cx="' + f(cx) + '" cy="' + f(yBot + .6) + '" rx="' + f(Wb * .62) + '" ry="' + f(W * .04) + '" fill="rgba(0,0,0,.35)"/>';
      if (caneArgs) g += cane.apply(null, caneArgs);
      g += '<g clip-path="url(#' + id + ')"><rect x="' + f(cx - W / 2) + '" y="' + f(bodyY) + '" width="' + f(W) + '" height="' + f(yBot - bodyY) + '" fill="#d7263d"/>';
      for (var k = -6; k < 16; k++) g += '<rect x="' + f(cx - W / 2 + k * W * .11) + '" y="' + f(bodyY - 4) + '" width="' + f(W * .045) + '" height="' + f(yBot - bodyY + 8) + '" fill="#fffaf5" opacity=".9" transform="rotate(-28 ' + f(cx) + ' ' + f((bodyY + yBot) / 2) + ')"/>';
      g += '<rect x="' + f(cx + W * .28) + '" y="' + f(bodyY) + '" width="' + f(W * .25) + '" height="' + f(yBot - bodyY) + '" fill="rgba(0,0,0,.14)"/><rect x="' + f(cx - W * .42) + '" y="' + f(bodyY) + '" width="' + f(W * .06) + '" height="' + f(yBot - bodyY) + '" fill="rgba(255,255,255,.25)"/></g>';
      // lid
      g += '<rect x="' + f(cx - W / 2 - W * .03) + '" y="' + f(lidY) + '" width="' + f(W * 1.06) + '" height="' + f(W * .075) + '" rx="' + f(W * .03) + '" fill="#f4ece3"/><rect x="' + f(cx - W / 2 - W * .03) + '" y="' + f(lidY + W * .05) + '" width="' + f(W * 1.06) + '" height="' + f(W * .025) + '" rx="' + f(W * .012) + '" fill="#d8cabd"/>';
      // whipped-cream swirl (three tiers + peak) with chocolate drizzle
      var tiers = [[.44, .11, 0], [.33, .1, -.12], [.21, .085, -.23]], baseY = lidY + W * .005;
      tiers.forEach(function (t) {
        var cy = baseY + t[2] * W * cs, rx = t[0] * W, ry = t[1] * W * cs;
        g += '<ellipse cx="' + f(cx) + '" cy="' + f(cy) + '" rx="' + f(rx) + '" ry="' + f(ry) + '" fill="#fffaf5"/>';
        g += '<path d="M' + f(cx - rx * .85) + ' ' + f(cy + ry * .35) + ' Q' + f(cx) + ' ' + f(cy + ry * 1.05) + ' ' + f(cx + rx * .85) + ' ' + f(cy + ry * .35) + '" fill="none" stroke="#e9dccd" stroke-width="' + f(W * .012) + '" stroke-linecap="round"/>';
      });
      var pk = baseY - .3 * W * cs;
      g += '<path d="M' + f(cx - W * .1) + ' ' + f(pk + W * .04 * cs) + ' Q' + f(cx - W * .02) + ' ' + f(pk - W * .03 * cs) + ' ' + f(cx + W * .04) + ' ' + f(pk - W * .08 * cs) + ' Q' + f(cx + W * .05) + ' ' + f(pk) + ' ' + f(cx + W * .1) + ' ' + f(pk + W * .04 * cs) + 'Z" fill="#fffaf5"/>';
      g += '<path d="M' + f(cx - W * .36) + ' ' + f(baseY - W * .02 * cs) + ' q' + f(W * .06) + ' ' + f(W * .05 * cs) + ' ' + f(W * .12) + ' 0 t' + f(W * .12) + ' 0 t' + f(W * .12) + ' 0 t' + f(W * .12) + ' 0 t' + f(W * .12) + ' 0" fill="none" stroke="#5a3726" stroke-width="' + f(W * .016) + '" stroke-linecap="round"/>';
      g += '<path d="M' + f(cx - W * .24) + ' ' + f(baseY - W * .14 * cs) + ' q' + f(W * .06) + ' ' + f(W * .045 * cs) + ' ' + f(W * .12) + ' 0 t' + f(W * .12) + ' 0 t' + f(W * .12) + ' 0 t' + f(W * .1) + ' 0" fill="none" stroke="#5a3726" stroke-width="' + f(W * .014) + '" stroke-linecap="round"/>';
      for (var s = 0; s < 10; s++) { var sx = cx + (rnd() - .5) * W * .55, sy = baseY - W * cs * (.04 + rnd() * .2); g += '<rect x="' + f(sx) + '" y="' + f(sy) + '" width="' + f(W * .028) + '" height="' + f(W * .009) + '" rx=".1" fill="' + (s % 3 ? '#d7263d' : '#2f9e7e') + '" transform="rotate(' + f(rnd() * 180) + ' ' + f(sx) + ' ' + f(sy) + ')"/>'; }
      return g;
    }
    function miniCandy(x, y, r, mint) {
      var g = '<g transform="translate(' + f(x) + ' ' + f(y) + ')"><path d="M' + f(-r * 1.9) + ' ' + f(-r * .7) + ' L' + f(-r * .8) + ' 0 L' + f(-r * 1.9) + ' ' + f(r * .7) + 'Z M' + f(r * 1.9) + ' ' + f(-r * .7) + ' L' + f(r * .8) + ' 0 L' + f(r * 1.9) + ' ' + f(r * .7) + 'Z" fill="rgba(255,255,255,.55)"/><circle r="' + f(r) + '" fill="#fffaf5"/>';
      for (var i = 0; i < 6; i++) g += '<path d="M0 0 L' + f(r * Math.cos(i * 1.047)) + ' ' + f(r * Math.sin(i * 1.047)) + ' A' + f(r) + ' ' + f(r) + ' 0 0 1 ' + f(r * Math.cos(i * 1.047 + .5)) + ' ' + f(r * Math.sin(i * 1.047 + .5)) + 'Z" fill="' + (mint ? '#2f9e7e' : '#d7263d') + '"/>';
      return g + '<circle r="' + f(r * .25) + '" fill="#fffaf5"/></g>';
    }
    function mint(x, y, s) { return '<path d="M' + f(x) + ' ' + f(y - s) + ' L' + f(x + s * .3) + ' ' + f(y - s * .3) + ' L' + f(x + s) + ' ' + f(y) + ' L' + f(x + s * .3) + ' ' + f(y + s * .3) + ' L' + f(x) + ' ' + f(y + s) + ' L' + f(x - s * .3) + ' ' + f(y + s * .3) + ' L' + f(x - s) + ' ' + f(y) + ' L' + f(x - s * .3) + ' ' + f(y - s * .3) + 'Z" fill="#8fd9c0" opacity=".85"/>'; }
    function bean(x, y, s, r) { return '<g transform="translate(' + f(x) + ' ' + f(y) + ') rotate(' + f(r) + ')"><ellipse rx="' + f(s) + '" ry="' + f(s * .68) + '" fill="#24140d"/><path d="M' + f(-s * .8) + ' 0 Q0 ' + f(-s * .3) + ' ' + f(s * .8) + ' 0" stroke="#6b4a3a" stroke-width="' + f(s * .16) + '" fill="none"/></g>'; }

    /* ---------- header ---------- */
    var month = H.MONTHS[spec.month - 1], series = H.esc(spec.series || 'Parent Talk Café'), sw = series.split(' '), last = sw.pop();
    var logo = partner ? '<div class="p12-logo pip"><img src="' + spec.pipUrl + '" alt=""></div>' : '<div class="p12-logo"><img src="' + spec.logoUrl + '" alt=""></div>';
    var hd = '<div class="p12-hd"><div class="k">' + (partner ? 'FOR FAMILIES ACROSS THE PACIFIC' : 'PARENT TRAINING &amp; INFORMATION CENTER') + '</div>'
      + '<div class="t">' + (sw.length ? sw.join(' ') + ' ' : '') + '<span>' + last + '</span></div>'
      + '<div class="m"><b>' + month.toUpperCase() + ' ' + spec.year + '</b><i>ON ZOOM</i></div>'
      + '<div class="w">' + H.PTC_WHERE + '</div></div>';
    var bdg = badge({ ring: '#d7263d', line: '#fffaf5', fill: '#fff3e3', text: '#fffaf5', cup: '#3b2218', band: '#8fd9c0', steam: '#d7263d' });

    /* ---------- sleeve text ---------- */
    var L = Math.max.apply(null, spec.sessions.map(function (s) { return String(s.lesson || '').length; }));
    var tfs;
    if (sq) tfs = partner ? (n2 ? 2.6 : 3.2) : (n2 ? 3.1 : (L > 30 ? 3.7 : 4.4));
    else tfs = partner ? (n2 ? 3.3 : (L > 30 ? 4 : 4.8)) : (n2 ? 4.2 : (L > 30 ? 4.9 : 5.8));
    var pres = spec.presenter ? '<div class="p">Presented by <b>' + H.esc(spec.presenter) + '</b></div>' : '';
    var topics = S.map(function (s, i) { return '<div class="t" style="font-size:' + f(tfs) + 'cqw">' + (n2 ? '<span class="n">' + (i + 1) + '.</span>' : '') + s.lesson + '</div>'; }).join('');
    var showDesc = solo && S[0].desc && !partner;
    function sleeve(style, cls) {
      return '<div class="p12-slv' + (cls ? ' ' + cls : '') + '" style="' + style + '"><div class="h">' + (n2 ? 'ON THE CUP THIS MONTH' : 'TODAY\'S TOPIC') + '</div>' + topics + (showDesc ? '<div class="d">' + S[0].desc + '</div>' : '') + pres + '</div>';
    }

    /* ---------- composition ---------- */
    var d = '', items = '', lab = '', slv = '';
    function candy(s, n, x, y, D, ddf, tmf, wf) {
      return '<div class="p12-cd" style="left:' + f(x) + 'cqw;top:' + f(y) + 'cqw;width:' + f(D) + 'cqw;height:' + f(D) + 'cqw;--tw:' + f(D * .16) + 'cqw">'
        + (n ? '<div class="nn" style="font-size:' + f(wf) + 'cqw">TOPIC ' + n + '</div>' : '')
        + '<div class="w" style="font-size:' + f(wf) + 'cqw">' + s.dow.toUpperCase() + '</div>'
        + '<div class="dd" style="font-size:' + f(ddf) + 'cqw">' + s.mon + ' ' + s.day + '</div>'
        + '<div class="tm" style="font-size:' + f(tmf) + 'cqw">' + s.time + '</div></div>';
    }
    function zoneCandies(pos, D, lf, df, tf) {
      var rows = H.zoneRows(spec.sessions);
      return rows.map(function (r, i) {
        var tl = String(r.time).length, long = tl > 9;
        var tt = long ? String(r.time).replace(' / ', '<br>') : r.time;
        return '<div class="p12-cd' + (r.home ? ' h' : '') + '" style="left:' + f(pos[i][0]) + 'cqw;top:' + f(pos[i][1]) + 'cqw;width:' + f(D) + 'cqw;height:' + f(D) + 'cqw;--tw:' + f(D * .12) + 'cqw;padding:0 ' + f(D * .2) + 'cqw">'
          + (r.home ? '<span class="hm">HAWAIʻI TIME</span>' : '')
          + '<div class="i" style="font-size:' + f(lf) + 'cqw">' + r.label + '</div><div class="ds" style="font-size:' + f(df) + 'cqw">' + r.days + '</div><div class="ti" style="font-size:' + f(long ? tf * .72 : tf) + 'cqw">' + tt + '</div></div>';
      }).join('');
    }
    if (!sq && !partner) {
      d += cup(50, 33, 64, 50, 104, [58, 44, 66.5, 32.5, 2.2]);
      slv = sleeve('left:19.4cqw;right:19.4cqw;top:55cqw;height:33cqw;clip-path:polygon(0 0,100% 0,96.5% 100%,3.5% 100%)');
      if (solo) {
        items = candy(S[0], 0, 69, 80.5, 26, 5.6, 1.9, 1.5);
        d += miniCandy(10, 92, 4.2, true) + miniCandy(14, 102.5, 3.2, false) + bean(6, 82, 1.3, 30) + mint(9, 70, 1.6) + mint(91, 66, 1.4) + mint(6, 40, 1.2) + mint(94, 35, 1.3);
      } else {
        items = candy(S[0], 1, 3, 78, 26, 5, 1.8, 1.35) + candy(S[1], 2, 71, 80, 26, 5, 1.8, 1.35);
        d += mint(9, 68, 1.6) + mint(91, 66, 1.4) + mint(6, 40, 1.2) + mint(94, 35, 1.3);
      }
    } else if (!sq && partner) {
      d += cup(50, 29.5, 72, 60, 67, [60, 40, 68, 30.5, 2], .55);
      slv = sleeve('left:15.2cqw;right:15.2cqw;top:43.5cqw;height:21cqw;padding:2.2cqw 4.4cqw;clip-path:polygon(0 0,100% 0,98% 100%,2% 100%)');
      lab = '<div class="p12-lab" style="top:68cqw"><b>What time is it on your island?</b><small>' + (n2 ? 'BOTH TOPICS' : 'THE TOPIC') + ' · YOUR LOCAL TIME</small></div>';
      items = zoneCandies([[4, 75.5], [28.5, 77], [53.5, 75.5], [78, 77], [16.25, 90], [41, 91.2], [65.75, 90]], 18, 1.4, 1.1, 1.85);
      d += mint(6, 40, 1.2) + mint(94, 36, 1.3) + mint(7, 62, 1.4) + mint(93, 60, 1.2);
    } else if (sq && !partner) {
      d += cup(32, 25, 52, 42, 81, [40, 34, 45.5, 25.5, 1.8], .62);
      slv = sleeve('left:7cqw;width:50cqw;top:41.5cqw;height:29cqw;clip-path:polygon(0 0,100% 0,96.5% 100%,3.5% 100%)');
      if (solo) {
        items = candy(S[0], 0, 64.5, 34, 28, 5.6, 1.85, 1.45);
        d += miniCandy(70, 72, 3.4, true) + miniCandy(86, 76, 2.8, false) + mint(94, 30, 1.2) + mint(62, 26, 1);
      } else {
        items = candy(S[0], 1, 67, 24.5, 24, 4.4, 1.6, 1.2) + candy(S[1], 2, 67, 52, 24, 4.4, 1.6, 1.2);
      }
    } else {
      slv = sleeve('left:5cqw;right:5cqw;top:24.5cqw;transform:rotate(-1deg)', 'p12-rib');
      items = zoneCandies([[6.5, 43], [29.5, 44], [53.5, 43], [76.5, 44], [18, 61], [41.5, 62], [65, 61]], 17, 1.25, 1, 1.65);
      d += cup(8, 63, 10, 8, 78.5) + cup(92, 63, 10, 8, 78.5) + mint(50, 40.5, .9);
    }
    var edges = sq ? '' : '';
    var svg = '<svg class="p12-deco" viewBox="0 0 100 ' + HT + '" preserveAspectRatio="none">' + d + '</svg>';
    var foot = '<div class="p12-ft"><div class="rg"><b>REGISTER at <span>LDAHawaii.org</span></b>Get your Zoom link, scan the QR code,<br>or call ' + H.phone(partner) + '</div><div class="p12-qr">' + H.qrImg(spec, partner) + '</div><div class="p12-lg">' + H.badges(spec, partner) + '</div></div>';
    return '<div class="p12' + (sq ? ' sq' : '') + (partner ? ' partner' : '') + '">' + edges + svg + bdg + logo + hd + slv + lab + items + foot + '</div>';
  }
}, 'ptc');
