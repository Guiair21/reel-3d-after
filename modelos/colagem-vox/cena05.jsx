// Cena 5 (corrigida): mao-braco.png no lugar de mao.png + manga; lapis vinho so na ponta; mais movimento nos 0-3 s.
var P = "C:/seu-projeto/";   // pasta do projeto (troque)
var DIR = P + "after/";
var FPS = 30, W = 1920, H = 1080, D = 1200, TILT = 0, DUR = 12.4;
var FUNDO = [96 / 255, 88 / 255, 76 / 255];
var log = new File(DIR + "log-c05.txt"); log.encoding = "UTF-8"; log.open("w"); log.close();
function L(s) { log.open("a"); log.writeln(s); log.close(); }
//@include "base.jsx"

var F = eval("(" + ler(DIR + "falas-c05.json") + ")");
var C = F.cenas[0];
var tDois = em(C, "dois"), tCart = em(C, "carteiro"), tLink = em(C, "link"), tOuv = em(C, "ouvido"), tAnota = em(C, "anota"), tGraca = em(C, "de"), tEscreve = em(C, "escreve");
L("gatilhos dois=" + tDois + " carteiro=" + tCart + " link=" + tLink + " ouvido=" + tOuv + " escreve=" + tEscreve + " anota=" + tAnota + " graca=" + tGraca);

try {
    app.beginSuppressDialogs(); app.newProject();
    L("app " + app.version);
    var B = baseCena("Cena5", [["carteiro", 260, 900, 190, 34], ["orelha", 2050, 330, 170, 30]]);
    var m = B.m;
    circulo(m, 780, 450, 700, 0.15);

    // 0-3 s: duas vagas tracejadas desde o comeco, fantasmas desfocados passando em parallax
    var vaga1 = elipse(m, 500, 450, 0, 360, 600, VINHO, 5, [14, 12]); vaga1.name = "vaga1"; desenha(vaga1, 0.15, 0.85); flutua(vaga1, 1.1, 8, 9, 0, 0);
    var vaga2 = elipse(m, 1060, 450, 0, 400, 600, VINHO, 5, [14, 12]); vaga2.name = "vaga2"; desenha(vaga2, 0.4, 1.1); flutua(vaga2, 2.2, 8, 9, 0, 0);
    var o1 = TG(vaga1).property("ADBE Opacity"); o1.setValueAtTime(fr(tCart + 0.5), 100); o1.setValueAtTime(fr(tCart + 0.9), 0);
    var o2 = TG(vaga2).property("ADBE Opacity"); o2.setValueAtTime(fr(tOuv + 0.5), 100); o2.setValueAtTime(fr(tOuv + 0.9), 0);
    fantasma(m, "carteiro", -520, -300, 2250, 640, 520, 0.0, 3.9, 34, -6);
    fantasma(m, "orelha", 900, 2150, -250, 260, 460, 0.0, 4.0, 36, 4);
    fantasma(m, "folha-texto", 500, -350, 2200, 900, 560, 0.6, 4.2, 30, -3);
    fantasma(m, "carteiro", 1100, 2300, -400, 800, 300, 0.2, 3.6, 30, 0);
    L("fundo, circulo, vagas, fantasmas ok");

    // ===== carteiro =====
    var cart = imagem(m, "carteiro", 500, 450, 0, 400); cart.name = "carteiro";
    var bC = 400 / 1024 * 100;
    entrada(cart, tCart - 0.2, 0.9, [-300, 480, 160], [500, 450, 0], bC, -38, -6, 1.2);
    flutua(cart, 0.0, 4, 7, 6, 1.5);
    sombra(cart, 26, 38, 50, 20, 40);
    tingeParte(cart, "envelope-vinho", [[843, 516], [984, 468], [1008, 530], [872, 602], [895, 566], [850, 532]], 2, tLink);
    L("carteiro ok");

    // ===== mao-braco com o cartao "link" =====
    var mao = imagem(m, "mao-braco", 1343, 213, -340, 1700); mao.name = "mao";
    var bM = 1700 / 2066 * 100;
    entrada(mao, tLink - 0.8, 0.8, [2900, 150, -340], [1343, 213, -340], bM, 0, 6, 1.0);
    saida(mao, tLink + 0.3, 0.8, [1343, 213, -340], [2900, 120, -340], bM);
    flutua(mao, 3.0, 3, 5, 3, 1);
    // o cartao em branco da mao some quando ela solta (mascara subtrativa)
    mascaraPoly(mao, [[-10, -10], [2076, -10], [2076, 771], [-10, 771]], 0);
    var mk = mascaraPoly(mao, [[40, 314], [410, 238], [418, 300], [402, 312], [404, 372], [440, 372], [468, 442], [84, 526]], 0, MaskMode.SUBTRACT);
    var mo = mk.property("ADBE Mask Opacity"); mo.setValueAtTime(0, 0); mo.setValueAtTime(fr(tLink - 0.01), 0); mo.setValueAtTime(fr(tLink), 100);
    sombra(mao, 50, 90, 330, 70, 30);
    var MAO = 'thisComp.layer("mao")';
    var lc = forma(m, "linkcard"); var lvs = grupo(lc);
    var lr = lvs.addProperty("ADBE Vector Shape - Rect"); lr.property("ADBE Vector Rect Size").setValue([413, 225]); lr.property("ADBE Vector Rect Roundness").setValue(10);
    preench(lvs, [238 / 255, 233 / 255, 222 / 255]); contorno(lvs, TINTA, 3); lc.threeDLayer = true;
    var HOLD = 'Math.min(time,' + fr(tLink) + ')';
    var VOA = 'var t1 = ' + fr(tLink + 0.55) + '; var tt = Math.min(Math.max((time-t1)/0.55,0),1); var u = tt*tt*(3-2*tt);';
    TG(lc).property("ADBE Position").expression = VOA + 'var a = ' + MAO + '.toWorld([253,382,0],' + HOLD + '); var b = thisComp.layer("carteiro").toWorld([925,550,0]); a + (b-a)*u';
    TG(lc).property("ADBE Scale").expression = VOA + 'var tt = time-' + fr(tLink) + '; var k = 1; if (tt>0 && tt<0.4) k = 1 + 0.14*Math.sin(tt/0.4*Math.PI); ' + MAO + '.transform.scale.valueAtTime(' + HOLD + ') * k * (1 - 0.75*u)';
    TG(lc).property("ADBE Rotate Z").expression = MAO + '.transform.zRotation.valueAtTime(' + HOLD + ') - 10*(1-u)';
    TG(lc).property("ADBE Rotate Y").expression = MAO + '.transform.yRotation.valueAtTime(' + HOLD + ') + 5*Math.sin(time*0.8)';
    var lo = TG(lc).property("ADBE Opacity"); lo.setValueAtTime(0, 0); lo.setValueAtTime(fr(tLink - 0.01), 0); lo.setValueAtTime(fr(tLink), 100); lo.setValueAtTime(fr(tLink + 1.0), 100); lo.setValueAtTime(fr(tLink + 1.2), 0);
    var lt = texto(m, "link", { x: 0, y: 0, z: 0, fonte: MANUSCRITA, tam: 125, cor: VINHO, trk: 0, de: tLink + 0.02, dur: 0.35 });
    lt.name = "linktxt";
    TG(lt).property("ADBE Position").expression = 'thisComp.layer("linkcard").transform.position + [0,0,-6]';
    var lto = TG(lt).property("ADBE Opacity"); lto.setValueAtTime(0, 0); lto.setValueAtTime(fr(tLink - 0.01), 0); lto.setValueAtTime(fr(tLink), 100); lto.setValueAtTime(fr(tLink + 1.0), 100); lto.setValueAtTime(fr(tLink + 1.2), 0);
    TG(lt).property("ADBE Scale").expression = 'thisComp.layer("linkcard").transform.scale';
    TG(lt).property("ADBE Rotate Z").expression = 'thisComp.layer("linkcard").transform.zRotation';
    TG(lt).property("ADBE Rotate Y").expression = 'thisComp.layer("linkcard").transform.yRotation';
    sombra(lc, 50, 90, 320, 22, 48);
    L("mao e link ok");

    // ===== orelha com lapis (ponta vinho) =====
    var ore = imagem(m, "orelha", 1060, 450, -80, 427); ore.name = "orelha";
    var bO = 427 / 1024 * 100;
    entrada(ore, tOuv - 0.25, 0.95, [2300, 500, -120], [1060, 450, -80], bO, 40, 7, 1.2);
    flutua(ore, 1.6, 4, 7, 6, 1.5);
    sombra(ore, 34, 48, 60, 24, 50);
    tingeParte(ore, "lapis-ponta", [[96, 1140], [186, 1140], [172, 1200], [124, 1350], [72, 1466], [50, 1452], [72, 1300], [86, 1200]], 2, tEscreve);
    L("orelha ok");

    // ===== folha de texto =====
    var fol = imagem(m, "folha-texto", 1560, 640, -150, 400); fol.name = "folha";
    var bF = 400 / 1536 * 100;
    entrada(fol, tAnota - 0.15, 0.8, [1500, 900, -150], [1560, 640, -150], bF, -28, 9, 1.3);
    flutua(fol, 2.4, 4, 6, 7, 2);
    var mf = fol.property("ADBE Mask Parade").addProperty("ADBE Mask Atom");
    var shA = new Shape(); shA.vertices = [[-20, -20], [1560, -20], [1560, 80], [-20, 80]]; shA.closed = true;
    var shB = new Shape(); shB.vertices = [[-20, -20], [1560, -20], [1560, 1050], [-20, 1050]]; shB.closed = true;
    mf.property("ADBE Mask Shape").setValueAtTime(fr(tAnota + 0.05), shA); mf.property("ADBE Mask Shape").setValueAtTime(fr(tAnota + 1.3), shB);
    mf.property("ADBE Mask Feather").setValue([30, 30]);
    sombra(fol, 28, 42, 70, 22, 50);
    L("folha ok");

    // ===== rotulos e setas =====
    var lb1 = texto(m, "o carteiro", { x: 500, y: 805, z: 0, fonte: MANUSCRITA, tam: 70, cor: TINTA, trk: 0, de: tCart + 0.45, dur: 0.55 }); flutua(lb1, 0.7, 3, 4, 0, 0);
    var lb2 = texto(m, "o ouvido", { x: 1060, y: 805, z: -80, fonte: MANUSCRITA, tam: 70, cor: TINTA, trk: 0, de: tOuv + 0.5, dur: 0.55 }); flutua(lb2, 1.9, 3, 4, 0, 0);
    curva(m, [[420, 850], [480, 858], [540, 850], [585, 856]], VINHO, 5, tCart + 0.9, tCart + 1.25, "sublinha1", false);
    curva(m, [[990, 850], [1040, 858], [1100, 850], [1135, 856]], VINHO, 5, tOuv + 0.95, tOuv + 1.3, "sublinha2", false);
    curva(m, [[640, 792], [715, 834], [810, 846], [890, 812]], VINHO, 6, tOuv - 0.05, tOuv + 0.55, "seta1", true);
    curva(m, [[1195, 820], [1275, 856], [1385, 850], [1470, 802]], VINHO, 6, tAnota - 0.1, tAnota + 0.5, "seta2", true);
    selo(m, 1560, 270, -230, "de gra\u00e7a", tGraca);
    L("rotulos, setas, selo ok");

    particulas(m, 34);
    camera3d(m, [
        [0.0, 3.0, 260, 10, -30, 5, 0],
        [0.5, 2.1, -150, -10, -20, -5, 0.6],
        [tCart - 0.35, tCart + 0.85, -150, 10, -40, -6, 0],
        [tLink - 0.55, tLink + 0.95, 120, -15, 0, 8, 0],
        [tLink + 0.85, tLink + 2.2, 40, 0, 0, 3, 0],
        [tOuv - 0.3, tOuv + 1.1, 100, 0, -30, 6, -1.5],
        [tAnota - 0.4, tAnota + 1.0, 50, 25, 0, -4, 1.2],
        [tAnota + 1.0, tGraca - 0.3, -60, -10, 0, -2, -0.5],
        [tGraca - 0.4, DUR, -140, 0, -60, -10, 0]
    ], [[0, 1300], [0.8, 200], [tCart - 0.4, 200], [tCart + 0.3, 0], [tLink - 0.3, 0], [tLink + 0.1, -240], [tLink + 1.2, -240], [tLink + 1.8, 0], [tOuv - 0.3, 0], [tOuv + 0.4, -80], [tAnota - 0.4, -80], [tAnota + 0.1, -150], [tGraca - 0.3, -150], [tGraca + 0.2, -230], [DUR, -230]]);
    luz2d(m);
    hud(m, [tDois, tCart, tLink, tOuv, tAnota, tGraca]);
    anel(m, "carteiro", [925, 550], tLink, 150, 6);
    anel(m, "orelha", [230, 800], tEscreve, 180, 6);
    finalizar(m, B.fundoBase, "cena05.aep");
} catch (e) { L("ERRO linha " + e.line + ": " + e); }
app.quit();
