// base.jsx: partes comuns das cenas da colagem documental estilo Vox.
// Uso: o script da cena define ANTES do include:
//   P, DIR, FPS, W, H, D, TILT, DUR, FUNDO, log, L()  (igual ao cena05.jsx)
//   //@include "base.jsx"
// Depois chama: papeis -> baseCena -> circulo ... -> particulas, camera3d, luz2d, hud, finalizar.
//@include "ae_3d_lib.jsx"   // copie scripts/ae_3d_lib.jsx para a pasta do projeto

function img(nome) {
    if (!imgs[nome]) imgs[nome] = app.project.importFile(new ImportOptions(new File(P + "imagens/" + (typeof PREFIXO_IMG == "undefined" ? "" : PREFIXO_IMG) + nome + ".png")));
    return imgs[nome];
}

var VINHO = [125 / 255, 0, 1 / 255], TINTA = [42 / 255, 42 / 255, 42 / 255], SOMBRA = [53 / 255, 47 / 255, 40 / 255];
var CREME = [0.94, 0.91, 0.85], PAPEL = [218 / 255, 206 / 255, 184 / 255];
var MANUSCRITA = "InstrumentSerif-Italic", INTER = "Inter-Bold", INTER_R = "Inter-Regular", ANTON = "Anton-Regular";

var _s = 7;
function rnd() { _s = (_s * 16807) % 2147483647; return (_s - 1) / 2147483646; }
function backOut(u, c1) { c1 = c1 || 1.1; var c3 = c1 + 1; return 1 + c3 * Math.pow(u - 1, 3) + c1 * Math.pow(u - 1, 2); }
function outQ(u) { return 1 - Math.pow(1 - u, 4); }
function smooth(u) { u = Math.max(0, Math.min(1, u)); return u * u * (3 - 2 * u); }
function TG(ly) { return ly.property("ADBE Transform Group"); }

// ---------- movimentos de entrada/saida ----------
function entrada(ly, t0, dur, de, ate, base, ry0, rz0, c1) {
    var n = Math.round(dur * FPS), T = [], Pp = [], S = [], RY = [], RZ = [];
    for (var q = 0; q <= n; q++) {
        var u = q / n, e = backOut(u, c1 === undefined ? 1.1 : c1), e2 = outQ(u);
        var x = de[0] + (ate[0] - de[0]) * e, y = de[1] + (ate[1] - de[1]) * e, z = de[2] + (ate[2] - de[2]) * e;
        T.push(fr(t0) + q / FPS); Pp.push(onde(x, y, z)); var s = base * fator(z); S.push([s, s, s]);
        RY.push((ry0 || 0) * (1 - e2)); RZ.push((rz0 || 0) * (1 - e2));
    }
    var tg = TG(ly);
    tg.property("ADBE Position").setValuesAtTimes(T, Pp); tg.property("ADBE Scale").setValuesAtTimes(T, S);
    tg.property("ADBE Rotate Y").setValuesAtTimes(T, RY); tg.property("ADBE Rotate Z").setValuesAtTimes(T, RZ);
    var op = tg.property("ADBE Opacity"); op.setValueAtTime(0, 0); op.setValueAtTime(fr(t0), 0); op.setValueAtTime(fr(t0 + 0.16), 100);
}
function saida(ly, t0, dur, de, ate, base) {
    var n = Math.round(dur * FPS), T = [], Pp = [], S = [];
    for (var q = 1; q <= n; q++) {
        var u = q / n, e = u * u * u;
        var x = de[0] + (ate[0] - de[0]) * e, y = de[1] + (ate[1] - de[1]) * e, z = de[2] + (ate[2] - de[2]) * e;
        T.push(fr(t0) + q / FPS); Pp.push(onde(x, y, z)); var s = base * fator(z); S.push([s, s, s]);
    }
    var tg = TG(ly);
    tg.property("ADBE Position").setValuesAtTimes(T, Pp); tg.property("ADBE Scale").setValuesAtTimes(T, S);
}
function popEscala(ly, t0, dur, base, z, c1) {
    var n = Math.round(dur * FPS), T = [], S = [];
    for (var q = 0; q <= n; q++) { var e = Math.max(0, backOut(q / n, c1 || 1.3)); var s = base * fator(z) * e; T.push(fr(t0) + q / FPS); S.push([s, s, s]); }
    TG(ly).property("ADBE Scale").setValuesAtTimes(T, S);
}
function flutua(ly, ph, ax, ay, ry, rx) {
    var tg = TG(ly);
    tg.property("ADBE Position").expression = 'value + [Math.sin(time*1.05+' + ph + ')*' + ax + ', Math.sin(time*0.8+' + (ph * 1.7) + ')*' + ay + ', 0]';
    if (ry) tg.property("ADBE Rotate Y").expression = 'value + ' + ry + '*Math.sin(time*0.7+' + ph + ')';
    if (rx) tg.property("ADBE Rotate X").expression = 'value + ' + rx + '*Math.sin(time*0.9+' + (ph * 1.3) + ')';
}
// opacidade em degraus de um quadro (liga/desliga) a partir de uma lista [[t, valor], ...]
function opac(ly, lista) {
    var op = TG(ly).property("ADBE Opacity");
    for (var i = 0; i < lista.length; i++) op.setValueAtTime(fr(lista[i][0]), lista[i][1]);
}
function sombra(m, dx, dy, dz, blur, op) {
    var s = m.duplicate(); s.name = "sombra-" + m.name; s.moveAfter(m);
    var fx = s.property("ADBE Effect Parade");
    var f = fx.addProperty("ADBE Fill"); try { f.property(3).setValue(SOMBRA); } catch (x) { L("  fill cor: " + x); }
    var b = fx.addProperty("ADBE Gaussian Blur 2"); b.property(1).setValue(blur);
    var M = 'thisComp.layer("' + m.name + '")';
    var tg = TG(s);
    tg.property("ADBE Position").expression = 'var p = ' + M + '.transform.position; var k = (1200+p[2]+' + dz + ')/(1200+p[2]); [960+(p[0]-960)*k+' + dx + ', 540+(p[1]-540)*k+' + dy + ', p[2]+' + dz + ']';
    tg.property("ADBE Scale").expression = 'var z = ' + M + '.transform.position[2]; ' + M + '.transform.scale * ((1200+z+' + dz + ')/(1200+z))';
    tg.property("ADBE Rotate Y").expression = M + '.transform.yRotation';
    tg.property("ADBE Rotate X").expression = M + '.transform.xRotation';
    tg.property("ADBE Rotate Z").expression = M + '.transform.zRotation';
    tg.property("ADBE Opacity").expression = M + '.transform.opacity * ' + (op / 100);
    return s;
}
function mascaraPoly(ly, pts, feather, modo) {
    var mk = ly.property("ADBE Mask Parade").addProperty("ADBE Mask Atom");
    var sh = new Shape(); sh.vertices = pts; sh.closed = true;
    mk.property("ADBE Mask Shape").setValue(sh);
    if (feather) mk.property("ADBE Mask Feather").setValue([feather, feather]);
    if (modo) mk.maskMode = modo;
    return mk;
}
// tinge de vinho so uma parte (por mascara) de uma copia da camada: o detalhe vinho do recorte
function tingeParte(ly, nome, pts, feather, t0) {
    var c = ly.duplicate(); c.name = nome;
    mascaraPoly(c, pts, feather || 2);
    var tn = c.property("ADBE Effect Parade").addProperty("ADBE Tint");
    try { tn.property(1).setValue([0.07, 0, 0]); tn.property(2).setValue([0.50, 0.0, 0.01]); } catch (x) { L("tint cor " + x); }
    var a = tn.property(3); a.setValueAtTime(0, 0); a.setValueAtTime(fr(t0 - 0.02), 0); a.setValueAtTime(fr(t0 + 0.14), 100);
    return c;
}
function curva(comp, pts, cor, larg, t0, t1, nome, cabeca) {
    var ly = forma(comp, nome || "seta"); var vs = grupo(ly);
    var p = vs.addProperty("ADBE Vector Shape - Group"); var sh = new Shape();
    var pp = []; for (var i = 0; i < pts.length; i++) pp.push([pts[i][0] + (rnd() - 0.5) * 5, pts[i][1] + (rnd() - 0.5) * 5]);
    sh.vertices = pp; var it = [], ot = [];
    for (var j = 0; j < pp.length; j++) {
        var a = pp[Math.max(0, j - 1)], b = pp[Math.min(pp.length - 1, j + 1)];
        var tx = (b[0] - a[0]) / 5, ty = (b[1] - a[1]) / 5; it.push([-tx, -ty]); ot.push([tx, ty]);
    }
    sh.inTangents = it; sh.outTangents = ot; sh.closed = false;
    p.property("ADBE Vector Shape").setValue(sh);
    var st = contorno(vs, cor, larg); try { st.property("ADBE Vector Stroke Line Cap").setValue(2); } catch (x) { }
    colocar(ly, 0, 0, 0, 100);
    desenha(ly, t0, t1);
    if (cabeca) {
        var e = pp[pp.length - 1], q = pp[pp.length - 2], dx = e[0] - q[0], dy = e[1] - q[1], d = Math.sqrt(dx * dx + dy * dy), ux = dx / d, uy = dy / d, c = Math.cos(2.6), s2 = Math.sin(2.6), L2 = 26;
        var a1 = [e[0] + (ux * c - uy * s2) * L2, e[1] + (ux * s2 + uy * c) * L2], a2 = [e[0] + (ux * c + uy * s2) * L2, e[1] + (-ux * s2 + uy * c) * L2];
        var h = caminho(comp, [a1, e, a2], 0, 0, 0, cor, larg, false); h.name = (nome || "seta") + "-cabeca";
        try { h.property("ADBE Root Vectors Group").property(1).property("ADBE Vectors Group").property("ADBE Vector Graphic - Stroke").property("ADBE Vector Stroke Line Cap").setValue(2); } catch (x) { }
        desenha(h, t1 - 0.02, t1 + 0.14); flutua(h, 2.1, 3, 4, 0, 0);
    }
    flutua(ly, 1.3, 3, 4, 0, 0);
    return ly;
}
function elipsePreenchida(comp, x, y, z, w, h, cor, nome) {
    var ly = forma(comp, nome || "disco"); var vs = grupo(ly);
    vs.addProperty("ADBE Vector Shape - Ellipse").property("ADBE Vector Ellipse Size").setValue([w, h]);
    preench(vs, cor); colocar(ly, x, y, z, 100); return ly;
}
function anel(comp, alvo, pt, t0, raio, larg) {
    var ly = forma(comp, "anel-" + alvo); var vs = grupo(ly);
    vs.addProperty("ADBE Vector Shape - Ellipse").property("ADBE Vector Ellipse Size").setValue([raio * 2, raio * 2]);
    contorno(vs, VINHO, larg);
    ly.threeDLayer = false;
    ly.property("ADBE Transform Group").property("ADBE Position").expression = 'thisComp.layer("' + alvo + '").toComp([' + pt[0] + ',' + pt[1] + ',0])';
    var S = ly.property("ADBE Transform Group").property("ADBE Scale"), O = ly.property("ADBE Transform Group").property("ADBE Opacity");
    S.setValueAtTime(fr(t0), [30, 30]); S.setValueAtTime(fr(t0 + 0.7), [170, 170]);
    O.setValueAtTime(0, 0); O.setValueAtTime(fr(t0) - 0.04, 0); O.setValueAtTime(fr(t0), 100); O.setValueAtTime(fr(t0 + 0.7), 0);
    for (var k = 1; k <= S.numKeys; k++) { var e = [new KeyframeEase(0, 80), new KeyframeEase(0, 80)]; try { S.setTemporalEaseAtKey(k, e, e); } catch (x) { } }
    return ly;
}
function papel(comp, w, h, base, escuro) {
    var bg = comp.layers.addSolid(base, "base", w, h, 1, DUR);
    for (var i = 0; i < 16; i++) {
        var ly = forma(comp, "mancha"); var vs = grupo(ly);
        var tam = 160 + rnd() * 520;
        vs.addProperty("ADBE Vector Shape - Ellipse").property("ADBE Vector Ellipse Size").setValue([tam, tam * (0.5 + rnd() * 0.6)]);
        var claro = rnd() > 0.7;
        preench(vs, claro ? [base[0] + 0.05, base[1] + 0.05, base[2] + 0.05] : [base[0] - 0.09, base[1] - 0.1, base[2] - 0.1]);
        ly.position.setValue([rnd() * w, rnd() * h]); ly.opacity.setValue(25 + rnd() * 30);
        var b = ly.property("ADBE Effect Parade").addProperty("ADBE Gaussian Blur 2"); b.property(1).setValue(70);
    }
    var ru = comp.layers.addSolid([0.5, 0.5, 0.5], "ruido", w, h, 1, DUR);
    ru.property("ADBE Effect Parade").addProperty("ADBE Fractal Noise");
    ru.blendingMode = BlendingMode.OVERLAY; ru.opacity.setValue(escuro ? 26 : 20);
}
// camada de um item qualquer (imagem ou pre-comp) com largura em px na pose base
function camadaItem(comp, item, x, y, z, largura, nome) {
    var ly = comp.layers.add(item); if (nome) ly.name = nome;
    return colocar(ly, x, y, z, largura / item.width * 100);
}

// ---------- cena base: papel de fundo desfocado, cartao de papel com sombra ----------
// fantasmas: [[nome, x, y, escala%, opacidade], ...] desenhados no papel de fundo (moldura dentro de moldura)
function baseCena(nome, fantasmas) {
    var pFundo = app.project.items.addComp("papel-fundo", 2300, 1300, 1, DUR, FPS);
    papel(pFundo, 2300, 1300, [150 / 255, 138 / 255, 118 / 255], true);
    for (var i = 0; i < fantasmas.length; i++) {
        var f = fantasmas[i];
        var g = pFundo.layers.add(img(f[0])); g.position.setValue([f[1], f[2]]); g.scale.setValue([f[3], f[3]]); g.opacity.setValue(f[4]); g.blendingMode = BlendingMode.MULTIPLY;
    }
    var pCartao = app.project.items.addComp("papel-cartao", 1690, 950, 1, DUR, FPS);
    papel(pCartao, 1690, 950, PAPEL, false);
    var bd = forma(pCartao, "borda"); var bvs = grupo(bd);
    var rr = bvs.addProperty("ADBE Vector Shape - Rect"); rr.property("ADBE Vector Rect Size").setValue([1676, 936]);
    contorno(bvs, [190 / 255, 175 / 255, 150 / 255], 5); bd.threeDLayer = false; bd.position.setValue([845, 475]); bd.opacity.setValue(55);

    var m = cena(nome, DUR, "ADBE Advanced 3d");
    m.motionBlurSamplesPerFrame = 16; try { m.motionBlurAdaptiveSampleLimit = 32; } catch (x) { }
    var fundoBase = m.layer("fundo");
    var bgL = m.layers.add(pFundo); bgL.name = "fundo-desfocado"; colocar(bgL, W / 2, H / 2, 1500, 100);
    bgL.property("ADBE Effect Parade").addProperty("ADBE Gaussian Blur 2").property(1).setValue(26);
    // o papel de fundo desliza devagar o tempo todo (nada parado)
    var bp = TG(bgL).property("ADBE Position"); var b0 = bp.value;
    bp.expression = 'value + [Math.sin(time*0.35)*60, Math.sin(time*0.28+1)*24, 0]';
    var shc = forma(m, "sombra-cartao"); var svs = grupo(shc);
    svs.addProperty("ADBE Vector Shape - Rect").property("ADBE Vector Rect Size").setValue([1690, 950]);
    preench(svs, SOMBRA); colocar(shc, W / 2 + 18, H / 2 + 34, 470, 100);
    shc.property("ADBE Effect Parade").addProperty("ADBE Gaussian Blur 2").property(1).setValue(46); shc.opacity.setValue(72);
    var cartao = m.layers.add(pCartao); cartao.name = "cartao"; colocar(cartao, W / 2, H / 2, 380, 100);
    TG(cartao).property("ADBE Rotate Z").setValue(-0.3); TG(shc).property("ADBE Rotate Z").setValue(-0.3);
    flutua(cartao, 0.4, 5, 4, 0, 0);
    shc.property("ADBE Transform Group").property("ADBE Position").expression = 'var p = thisComp.layer("cartao").transform.position; [p[0]+22, p[1]+40, p[2]+90]';
    return { m: m, fundoBase: fundoBase, cartao: cartao };
}
function circulo(m, x, y, d, t0) {
    var c = elipsePreenchida(m, x, y, 200, d, d, VINHO, "circulo");
    popEscala(c, t0, 0.7, 100, 200, 1.2);
    flutua(c, 0.9, 6, 7, 0, 0);
    return c;
}
// fantasma desfocado passando em parallax (z longe = devagar e pequeno; z perto = rapido e desfocado)
function fantasma(m, nome, z, x0, x1, y, larg, t0, t1, op, rz) {
    var ly = imagem(m, nome, x0, y, z, larg); ly.name = "fantasma-" + nome;
    var tg = TG(ly), s = ly.scale.value;
    tg.property("ADBE Position").setValueAtTime(fr(t0), onde(x0, y, z)); tg.property("ADBE Position").setValueAtTime(fr(t1), onde(x1, y + 40, z));
    tg.property("ADBE Rotate Z").setValueAtTime(fr(t0), rz || 0); tg.property("ADBE Rotate Z").setValueAtTime(fr(t1), (rz || 0) + 14);
    var o = tg.property("ADBE Opacity"); o.setValueAtTime(fr(t0), 0); o.setValueAtTime(fr(t0 + 0.5), op); o.setValueAtTime(fr(t1 - 0.5), op); o.setValueAtTime(fr(t1), 0);
    try { ly.blendingMode = BlendingMode.MULTIPLY; } catch (x) { }
    ly.property("ADBE Effect Parade").addProperty("ADBE Gaussian Blur 2").property(1).setValue(z < 0 ? 14 : 6);
    return ly;
}
function particulas(m, n) {
    for (var pi = 0; pi < (n || 34); pi++) {
        var perto = pi < 12, pz = perto ? -430 - rnd() * 110 : 450 + rnd() * 450;
        var dm = perto ? 34 + rnd() * 50 : 6 + rnd() * 9;
        var pc = rnd(), pcor = perto ? (pc < 0.55 ? TINTA : CREME) : (pc < 0.5 ? CREME : [0.35, 0.32, 0.28]);
        var px = rnd() * W, py = rnd() * H;
        var pl = elipsePreenchida(m, px, py, pz, dm, dm, pcor, "particula"); pl.opacity.setValue(perto ? 24 : 50);
        var dxp = (perto ? 260 : 120) * (rnd() > 0.5 ? 1 : -1), dyp = (rnd() - 0.5) * 160;
        var pP = TG(pl).property("ADBE Position"); pP.setValueAtTime(0, onde(px, py, pz)); pP.setValueAtTime(DUR, onde(px + dxp, py + dyp, pz));
    }
}
// rotulo manuscrito com entrada letra a letra, flutuando
function rotulo(m, txt, x, y, z, t, dur, tam, cor, opcoes) {
    var o = { x: x, y: y, z: z, fonte: MANUSCRITA, tam: tam, cor: cor || TINTA, trk: 0, de: t, dur: dur };
    if (opcoes) for (var k in opcoes) o[k] = opcoes[k];
    var ly = texto(m, txt, o); flutua(ly, rnd() * 4, 3, 4, 0, 0); return ly;
}
// selo redondo vinho com texto e confete saindo dele
function selo(m, x, y, z, txt, t, tam, confete) {
    var nul = m.layers.addNull(DUR); nul.name = "selo-" + txt; nul.threeDLayer = true; nul.anchorPoint.setValue([0, 0, 0]);
    colocar(nul, x, y, z, 100);
    entrada(nul, t - 0.05, 0.6, [x, y + 150, z], [x, y, z], 100, 0, -26, 1.6);
    TG(nul).property("ADBE Position").expression = 'value + [Math.sin(time*1.2)*3, Math.sin(time*0.9+1)*5, 0]';
    TG(nul).property("ADBE Rotate Z").expression = 'value + 3*Math.sin(time*1.1)';
    var disco = elipsePreenchida(m, 0, 0, 0, 250, 250, VINHO, "selo-disco");
    var anelS = elipse(m, 0, 0, 0, 218, 218, CREME, 3, [2, 9]); anelS.name = "selo-anel";
    var selT = texto(m, txt, { x: 0, y: 0, z: 0, fonte: MANUSCRITA, tam: tam || 78, cor: CREME, trk: 0, de: t + 0.05, dur: 0.4 });
    selT.name = "selo-texto";
    var filhos = [disco, anelS, selT];
    for (var fi = 0; fi < filhos.length; fi++) {
        var fl = filhos[fi]; fl.parent = nul; fl.position.setValue([0, 0, 0]); fl.scale.setValue([100, 100, 100]); fl.property('ADBE Transform Group').property('ADBE Orientation').setValue([0, 0, 0]); fl.property('ADBE Transform Group').property('ADBE Rotate X').setValue(0); fl.property('ADBE Transform Group').property('ADBE Rotate Y').setValue(0); if (fl !== anelS) fl.property('ADBE Transform Group').property('ADBE Rotate Z').setValue(0);
        if (fl !== selT) { var fo = TG(fl).property("ADBE Opacity"); fo.setValueAtTime(0, 0); fo.setValueAtTime(fr(t - 0.05), 0); fo.setValueAtTime(fr(t + 0.12), 100); }
    }
    var rz = TG(anelS).property("ADBE Rotate Z"); rz.setValueAtTime(fr(t), 0); rz.setValueAtTime(DUR, 80);
    if (confete !== false) confeteSaindo(m, x, y, t);
    return nul;
}
function confeteSaindo(m, x, y, t) {
    for (var ci = 0; ci < 30; ci++) {
        var cz = -460 + rnd() * 1250, ang = -Math.PI * (0.1 + rnd() * 0.8), vel = 260 + rnd() * 620, sz = 7 + rnd() * 11;
        var cr = rnd(), cor = cr < 0.5 ? VINHO : (cr < 0.8 ? TINTA : [0.62, 0.58, 0.52]);
        var cl = forma(m, "confete"); var cvs = grupo(cl);
        if (rnd() > 0.5) cvs.addProperty("ADBE Vector Shape - Rect").property("ADBE Vector Rect Size").setValue([sz, sz * 0.55]);
        else cvs.addProperty("ADBE Vector Shape - Ellipse").property("ADBE Vector Ellipse Size").setValue([sz, sz]);
        preench(cvs, cor); colocar(cl, x, y, cz, 100);
        var vx = Math.cos(ang) * vel, vy = Math.sin(ang) * vel, T = [], Pp = [], R = [], t0c = t + 0.02, nc = Math.round((DUR - t0c) * FPS), rs = (rnd() - 0.5) * 540;
        for (var q = 0; q <= nc; q++) {
            var dt = q / FPS, k = 2.2, ex = (1 - Math.exp(-k * dt)) / k;
            T.push(fr(t0c) + dt); Pp.push(onde(x + vx * ex, y + vy * ex + 120 * dt * dt, cz)); R.push(rs * dt);
        }
        TG(cl).property("ADBE Position").setValuesAtTimes(T, Pp); TG(cl).property("ADBE Rotate Z").setValuesAtTimes(T, R);
        var co = TG(cl).property("ADBE Opacity"); co.setValueAtTime(0, 0); co.setValueAtTime(fr(t0c) - 0.04, 0); co.setValueAtTime(fr(t0c), 100); co.setValueAtTime(DUR - 0.25, 100); co.setValueAtTime(DUR, 40);
    }
}
// ---------- camera viva: um movimento por palavra-gatilho, sobrepostos, mais deslize e orbita continuos ----------
// passos: [t0, t1, dx, dy, ddist, dgiro, dtilt]; foco: [[t, z], ...]
function camera3d(m, passos, foco, o) {
    o = o || {};
    var X0 = o.x0 === undefined ? 890 : o.x0, Y0 = o.y0 === undefined ? 540 : o.y0, G0 = o.g0 === undefined ? -4 : o.g0, GF = o.GF || 0.65;
    var AX = o.ax === undefined ? 30 : o.ax, AY = o.ay === undefined ? 12 : o.ay, AG = o.ag === undefined ? 1.2 : o.ag;
    function estado(t) {
        var x = X0, y = Y0, dd = D + 30, g = G0, tl = 0;
        for (var i = 0; i < passos.length; i++) {
            var s = passos[i], u = smooth((t - s[0]) / (s[1] - s[0]));
            x += s[2] * u; y += s[3] * u; dd += s[4] * u; g += s[5] * GF * u; tl += s[6] * u;
        }
        x += AX * Math.sin(t * 0.9) + AX * 0.5 * Math.sin(t * 2.3 + 2); y += AY * Math.sin(t * 0.6 + 1) + AY * 0.5 * Math.sin(t * 1.9); g += AG * Math.sin(t * 0.5) + AG * 0.6 * Math.sin(t * 1.4 + 1);
        return { alvo: [x, y, 0], dist: dd, tilt: tl, giro: g };
    }
    var cam = m.layers.addCamera("cam", [W / 2, H / 2]);
    cam.autoOrient = AutoOrientType.CAMERA_OR_POINT_OF_INTEREST;
    var op = cam.property("ADBE Camera Options Group");
    op.property("ADBE Camera Zoom").setValue(D);
    op.property("ADBE Camera Depth of Field").setValue(1);
    op.property("ADBE Camera Aperture").setValue(o.abertura || 380);
    try { op.property("ADBE Camera Blur Level").setValue(100); } catch (x) { }
    var tgc = TG(cam);
    tgc.property("ADBE Orientation").setValue([0, 0, 0]);
    tgc.property("ADBE Rotate X").setValue(0); tgc.property("ADBE Rotate Y").setValue(0); tgc.property("ADBE Rotate Z").setValue(0);
    var tempos = [], vP = [], vI = [];
    for (var qq = 0; qq <= Math.round(DUR * FPS); qq++) { var tt = qq / FPS, es = estado(tt); tempos.push(tt); vP.push(pose(es.alvo, es.dist, es.tilt, es.giro)); vI.push(es.alvo); }
    tgc.property("ADBE Position").setValuesAtTimes(tempos, vP); tgc.property("ADBE Anchor Point").setValuesAtTimes(tempos, vI);
    var nf = m.layers.addNull(DUR); nf.name = "FOCO"; nf.threeDLayer = true; nf.enabled = false;
    var fp = TG(nf).property("ADBE Position");
    for (var kk = 0; kk < foco.length; kk++) fp.setValueAtTime(fr(foco[kk][0]), [960, 540, foco[kk][1]]);
    suave(fp);
    op.property("ADBE Camera Focus Distance").expression =
        'var t = thisComp.layer("FOCO"); var v1 = t.toWorld(t.anchorPoint) - toWorld([0,0,0]); var v2 = toWorldVec([0,0,1]); dot(v1, v2);';
    return cam;
}
// luz 2D motivada: calor no canto, vinheta e feixe enevoado
function luz2d(m) {
    var calor = m.layers.addSolid([1, 0.93, 0.80], "luz-calor", W, H, 1, DUR); calor.blendingMode = BlendingMode.SCREEN; calor.opacity.setValue(8);
    var mc = calor.property("ADBE Mask Parade").addProperty("ADBE Mask Atom"); var sc = new Shape();
    sc.vertices = [[-300, -200], [1300, -200], [1300, 520], [-300, 520]]; sc.closed = true; mc.property("ADBE Mask Shape").setValue(sc); mc.property("ADBE Mask Feather").setValue([520, 520]);
    var vin = m.layers.addSolid([0.12, 0.09, 0.07], "vinheta", W, H, 1, DUR); vin.opacity.setValue(46);
    var mv = vin.property("ADBE Mask Parade").addProperty("ADBE Mask Atom"); var sv = new Shape();
    sv.vertices = [[-60, 30], [1980, 30], [1980, 1050], [-60, 1050]]; sv.closed = true; mv.property("ADBE Mask Shape").setValue(sv); mv.property("ADBE Mask Feather").setValue([420, 420]); mv.inverted = true;
    var fe = m.layers.addSolid([1, 0.95, 0.85], "feixe", W, H, 1, DUR); fe.blendingMode = BlendingMode.SCREEN; fe.opacity.setValue(8);
    fe.opacity.expression = 'wiggle(1.6, 4)';
    mascaraPoly(fe, [[1180, -120], [1480, -120], [760, 1200], [430, 1200]], 140);
    var fpos = TG(fe).property("ADBE Position"); fpos.setValueAtTime(0, [960, 540]); fpos.setValueAtTime(DUR, [1060, 540]);
}
// regua do tempo em baixo (HUD 2D) com pino andando, "TESTE 01 / TRANSCREVER VIDEO" e o rotulo de IA
function hud(m, marcos) {
    function dois(ly, x, y) { ly.threeDLayer = false; ly.position.setValue([x, y]); }
    var X0 = 330, X1 = 1590, YR = 930;
    var regua = caminho(m, [[X0, YR], [X1, YR]], 0, 0, 0, TINTA, 2, false); regua.name = "regua"; dois(regua, 0, 0); desenha(regua, 0.1, 1.0);
    var prog = caminho(m, [[X0, YR], [X1, YR]], 0, 0, 0, TINTA, 5, false); prog.name = "regua-progresso"; dois(prog, 0, 0);
    var vsP = prog.property("ADBE Root Vectors Group").property(1).property("ADBE Vectors Group");
    var trim = vsP.addProperty("ADBE Vector Filter - Trim"); var te = trim.property("ADBE Vector Trim End"); te.setValueAtTime(0, 0); te.setValueAtTime(DUR, 100);
    var mm = [0].concat(marcos).concat([DUR]);
    for (var mi = 0; mi < mm.length; mi++) {
        var mx = X0 + (X1 - X0) * mm[mi] / DUR;
        var tk = caminho(m, [[mx, YR - 12], [mx, YR + 12]], 0, 0, 0, TINTA, 2, false); tk.name = "marco"; dois(tk, 0, 0); aparece(tk, 0.2 + mi * 0.08, 0.2);
    }
    var pino = forma(m, "pino"); var pvs = grupo(pino);
    pvs.addProperty("ADBE Vector Shape - Ellipse").property("ADBE Vector Ellipse Size").setValue([18, 18]); preench(pvs, VINHO);
    pino.threeDLayer = false; var pp = TG(pino).property("ADBE Position"); pp.setValueAtTime(0, [X0, YR]); pp.setValueAtTime(DUR, [X1, YR]);
    function h(txt, x, y, alinha, tam, fonte, op) {
        var ly = texto(m, txt, { x: 0, y: 0, z: 0, fonte: fonte, tam: tam, cor: TINTA, trk: alinha === "r" && tam < 18 ? 20 : 90 });
        ly.threeDLayer = false; var r = ly.sourceRectAtTime(DUR - 1 / FPS, false);
        ly.scale.setValue([100, 100]);
        ly.position.setValue([alinha === "l" ? x + r.width / 2 : x - r.width / 2, y]);
        ly.opacity.setValue(op || 100); return ly;
    }
    h("TESTE 01", X0, 968, "l", 20, INTER);
    h("TRANSCREVER V\u00cdDEO", X1, 968, "r", 20, INTER);
    h("parcialmente gerado por IA", 1800, 1047, "r", 15, INTER_R, 80);
}
function finalizar(m, fundoBase, aep) {
    fundoBase.moveToEnd();
    m.openInViewer();
    app.project.save(new File(DIR + aep));
    L("OK salvo");
}

// bilhete vinho (papel vinho com fita e texto creme) que "pousa" com pop; nul pai para mover tudo junto
function bilhete(m, x, y, z, txt, t, w, h, tam, rot, nome) {
    var nul = m.layers.addNull(DUR); nul.name = nome || ("bilhete-" + txt); nul.threeDLayer = true; nul.anchorPoint.setValue([0, 0, 0]);
    colocar(nul, x, y, z, 100);
    popEscala(nul, t, 0.5, 100, z, 1.8);
    TG(nul).property("ADBE Position").expression = 'value + [Math.sin(time*1.1)*4, Math.sin(time*0.85+1)*5, 0]';
    TG(nul).property("ADBE Rotate Z").expression = 'value + ' + rot + ' + 2.5*Math.sin(time*1.2)';
    var pp = forma(m, "bilhete-papel"); var pv = grupo(pp);
    var rr = pv.addProperty("ADBE Vector Shape - Rect"); rr.property("ADBE Vector Rect Size").setValue([w, h]); rr.property("ADBE Vector Rect Roundness").setValue(6);
    preench(pv, VINHO); pp.threeDLayer = true;
    var fita = forma(m, "bilhete-fita"); var fv = grupo(fita);
    var fr2 = fv.addProperty("ADBE Vector Shape - Rect"); fr2.property("ADBE Vector Rect Size").setValue([w * 0.34, 34]);
    preench(fv, [0.93, 0.89, 0.78]); fita.threeDLayer = true; fita.opacity.setValue(85);
    var tx = texto(m, txt, { x: 0, y: 0, z: 0, fonte: MANUSCRITA, tam: tam, cor: CREME, trk: 0, de: t + 0.12, dur: 0.35 }); tx.name = "bilhete-texto";
    var fs = [pp, fita, tx];
    for (var i = 0; i < 3; i++) {
        var c = fs[i]; c.parent = nul; c.position.setValue(i === 1 ? [0, -h / 2, -2] : (i === 2 ? [0, 0, -4] : [0, 0, 0])); c.scale.setValue([100, 100, 100]);
        c.property('ADBE Transform Group').property('ADBE Orientation').setValue([0, 0, 0]); c.property('ADBE Transform Group').property('ADBE Rotate X').setValue(0); c.property('ADBE Transform Group').property('ADBE Rotate Y').setValue(0); c.property('ADBE Transform Group').property('ADBE Rotate Z').setValue(i === 1 ? -4 : 0);
        if (i < 2) { var fo = TG(c).property("ADBE Opacity"); var vv = i === 1 ? 85 : 100; fo.setValueAtTime(0, 0); fo.setValueAtTime(fr(t - 0.02), 0); fo.setValueAtTime(fr(t + 0.1), vv); }
    }
    sombra(pp, 22, 34, 40, 14, 45);
    return nul;
}
