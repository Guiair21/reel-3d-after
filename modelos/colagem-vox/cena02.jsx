// Cena 2: loop grande. A folha de texto amassa de repente ("erro"), fundo escurece, bilhete vinho.
var P = "C:/seu-projeto/";   // pasta do projeto (troque)
var DIR = P + "after/";
var FPS = 30, W = 1920, H = 1080, D = 1200, TILT = 0, DUR = 7.76;
var FUNDO = [96 / 255, 88 / 255, 76 / 255];
var log = new File(DIR + "log-c02.txt"); log.encoding = "UTF-8"; log.open("w"); log.close();
function L(s) { log.open("a"); log.writeln(s); log.close(); }
//@include "base.jsx"

var F = eval("(" + ler(DIR + "falas-c02.json") + ")");
var C = F.cenas[0];
var tPrim = em(C, "primeira"), tTentei = em(C, "tentei"), tDeu = em(C, "deu"), tErro = em(C, "erro"), tDesist = em(C, "desistir"), tNo = em(C, "no"), tMostro = em(C, "mostro");
L("gatilhos primeira=" + tPrim + " tentei=" + tTentei + " deu=" + tDeu + " erro=" + tErro + " desistir=" + tDesist + " no=" + tNo + " mostro=" + tMostro);
var FX = 820, FY = 470;

try {
    app.beginSuppressDialogs(); app.newProject();
    L("app " + app.version);
    var B = baseCena("Cena2", [["folha-texto", 300, 880, 130, 34], ["folha-amassada", 2050, 330, 130, 30]]);
    var m = B.m;
    circulo(m, FX, FY, 740, 0.15);
    fantasma(m, "folha-texto", -520, -300, 2250, 640, 560, 0.0, 3.2, 32, -6);
    fantasma(m, "folha-amassada", 900, 2150, -250, 260, 440, 0.0, 3.4, 34, 4);
    fantasma(m, "folha-texto", 1100, 2300, -400, 820, 320, 0.2, 3.0, 28, 0);

    // fundo escurece por um instante em "erro" (plano 2D entre o fundo e os recortes)
    var esc = m.layers.addSolid([0.04, 0.035, 0.03], "escuro", W, H, 1, DUR);
    opac(esc, [[0, 0], [tErro - 0.06, 0], [tErro + 0.04, 90], [tErro + 0.5, 90], [tErro + 1.0, 34], [tDesist, 34], [tDesist + 0.9, 0]]);

    // ===== folha de texto: entra, treme antes do erro =====
    var ft = imagem(m, "folha-texto", FX, FY, 0, 920); ft.name = "folha";
    var bF = 920 / 1536 * 100;
    entrada(ft, 0.12, 0.9, [-200, 760, 160], [FX, FY, 0], bF, -30, 8, 1.1);
    flutua(ft, 2.4, 5, 7, 6, 2);
    TG(ft).property("ADBE Rotate Z").expression = 'value + ((time>' + tDeu + ' && time<' + tErro + ') ? 3.2*Math.sin(time*70)*(time-' + tDeu + ')/' + (tErro - tDeu) + ' : 0)';
    var fo = TG(ft).property("ADBE Opacity"); fo.setValueAtTime(fr(tErro - 1 / 30), 100); fo.setValueAtTime(fr(tErro), 0);
    sombra(ft, 30, 46, 70, 24, 50);

    // ===== folha amassada: troca com giro e motion blur =====
    var fa = imagem(m, "folha-amassada", FX, FY, 0, 760); fa.name = "amassada";
    var bA = 760 / 1312 * 100;
    entrada(fa, tErro, 0.6, [FX, FY, -300], [FX, FY, 0], bA, 85, -60, 1.5);
    flutua(fa, 1.1, 6, 8, 8, 3);
    sombra(fa, 30, 46, 70, 24, 52);
    L("folhas ok");

    // pedacos de papel voando no amasso
    for (var ci = 0; ci < 18; ci++) {
        var cz = -380 + rnd() * 900, ang = -Math.PI * (0.05 + rnd() * 0.9), vel = 300 + rnd() * 700, sz = 16 + rnd() * 30;
        var cl = forma(m, "pedaco"); var cvs = grupo(cl);
        var pth = cvs.addProperty("ADBE Vector Shape - Group"); var sh = new Shape();
        sh.vertices = [[-sz, -sz * 0.4], [sz * 0.3, -sz * 0.7], [sz, sz * 0.2], [-sz * 0.2, sz * 0.6]]; sh.closed = true; pth.property("ADBE Vector Shape").setValue(sh);
        preench(cvs, rnd() > 0.5 ? CREME : [0.86, 0.83, 0.77]); colocar(cl, FX, FY, cz, 100);
        var vx = Math.cos(ang) * vel, vy = Math.sin(ang) * vel, T = [], Pp = [], R = [], t0c = tErro + 0.02, nc = Math.round((DUR - t0c) * FPS), rs = (rnd() - 0.5) * 720;
        for (var q = 0; q <= nc; q++) { var dt = q / FPS, k = 2.4, ex = (1 - Math.exp(-k * dt)) / k; T.push(fr(t0c) + dt); Pp.push(onde(FX + vx * ex, FY + vy * ex + 160 * dt * dt, cz)); R.push(rs * dt); }
        TG(cl).property("ADBE Position").setValuesAtTimes(T, Pp); TG(cl).property("ADBE Rotate Z").setValuesAtTimes(T, R);
        opac(cl, [[0, 0], [tErro - 0.04, 0], [tErro, 100], [tErro + 2.2, 100], [tErro + 2.9, 0]]);
    }

    // ===== bilhete vinho "erro" =====
    bilhete(m, 1390, 290, -150, "erro", tErro + 0.02, 430, 200, 170, -7, "bilhete-erro");

    // ===== rotulos =====
    var l1 = rotulo(m, "primeira vez", 450, 215, -40, tPrim, 0.6, 72);
    var u1 = curva(m, [[340, 262], [420, 270], [520, 262], [590, 268]], VINHO, 5, tPrim + 0.6, tPrim + 0.95, "sub-primeira", false);
    var s1 = curva(m, [[570, 290], [610, 340], [640, 380], [650, 430]], VINHO, 5, tPrim + 1.0, tPrim + 1.4, "seta-primeira", true);
    var l2 = rotulo(m, "tentei", 1370, 690, -40, tTentei, 0.4, 74);
    opac(l1, [[0, 100], [tErro - 0.1, 100], [tErro + 0.05, 0]]); opac(l2, [[0, 100], [tErro - 0.1, 100], [tErro + 0.05, 0]]);
    opac(u1, [[0, 100], [tErro - 0.1, 100], [tErro + 0.05, 0]]); opac(s1, [[0, 100], [tErro - 0.1, 100], [tErro + 0.05, 0]]);
    rotulo(m, "quase desisti", 1390, 520, -60, tDesist + 0.1, 0.7, 76, TINTA);
    curva(m, [[1210, 568], [1300, 576], [1420, 568], [1560, 574]], VINHO, 5, tDesist + 0.8, tDesist + 1.15, "sub-desisti", false);
    rotulo(m, "no final eu mostro", 1390, 720, -60, tNo, 1.0, 68, TINTA);
    curva(m, [[1210, 740], [1120, 790], [1040, 800], [990, 760]], VINHO, 6, tNo + 1.0, tNo + 1.5, "seta-final", true);
    L("rotulos ok");

    particulas(m, 34);
    var cam = camera3d(m, [
        [0.0, 1.8, 220, 0, -30, 5, 0],
        [0.3, 1.4, -140, -10, -20, -5, 0.5],
        [tDeu - 0.3, tErro - 0.02, 40, 10, -110, 2, 0],
        [tErro - 0.02, tErro + 0.55, -60, -20, 170, -6, 1.2],
        [tErro + 0.5, tDesist, 120, 0, -30, 5, -1],
        [tDesist - 0.1, tNo, -100, 10, -40, -5, 0.8],
        [tNo, DUR, -90, 0, -50, -8, 0]
    ], [[0, 1300], [0.7, 200], [0.9, 0], [tErro - 0.2, 0], [tErro + 0.1, -150], [tDesist, -100], [tNo, 0], [tNo + 0.8, -60], [DUR, -60]]);
    treme(cam, tErro, 22);
    luz2d(m);
    hud(m, [tPrim, tTentei, tErro, tDesist, tNo, tMostro]);
    anel(m, "amassada", [656, 600], tMostro, 300, 6);
    finalizar(m, B.fundoBase, "cena02.aep");
} catch (e) { L("ERRO linha " + e.line + ": " + e); }
app.quit();
