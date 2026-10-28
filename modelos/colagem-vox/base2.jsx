// base2.jsx: auxiliares da leva 2 (cenas 4, 6 e 7). Incluir DEPOIS de base.jsx.

// contorno tracejado vinho de um retangulo (a "vaga" onde o objeto vai pousar)
function vagaRet(m, x, y, w, h, t0, t1, tOut, nome) {
    var ly = forma(m, nome || "vaga"); var vs = grupo(ly);
    var rc = vs.addProperty("ADBE Vector Shape - Rect"); rc.property("ADBE Vector Rect Size").setValue([w, h]); rc.property("ADBE Vector Rect Roundness").setValue(26);
    var st = contorno(vs, VINHO, 5); var ds = st.property("ADBE Vector Stroke Dashes");
    ds.addProperty("ADBE Vector Stroke Dash 1").setValue(14); ds.addProperty("ADBE Vector Stroke Gap 1").setValue(12);
    colocar(ly, x, y, 10, 100);
    desenha(ly, t0, t1); flutua(ly, t0 * 3 + 1, 8, 9, 0, 0);
    if (tOut) { var o = TG(ly).property("ADBE Opacity"); o.setValueAtTime(fr(tOut), 100); o.setValueAtTime(fr(tOut + 0.35), 0); }
    return ly;
}
// retangulo 2D dentro de uma pre-comp
function ret2d(c, x, y, w, h, cor, raio, nome) {
    var ly = forma(c, nome || "ret"); var vs = grupo(ly);
    var r = vs.addProperty("ADBE Vector Shape - Rect"); r.property("ADBE Vector Rect Size").setValue([w, h]); if (raio) r.property("ADBE Vector Rect Roundness").setValue(raio);
    preench(vs, cor); ly.position.setValue([x, y]); return ly;
}
function bola2d(c, x, y, d, cor, nome) {
    var ly = forma(c, nome || "bola"); var vs = grupo(ly);
    vs.addProperty("ADBE Vector Shape - Ellipse").property("ADBE Vector Ellipse Size").setValue([d, d]);
    preench(vs, cor); ly.position.setValue([x, y]); return ly;
}
// texto dentro de pre-comp 2D (a lib cria 3D): centro em (x,y)
function texto2d(c, txt, x, y, fonte, tam, cor, de, dur, trk) {
    var o = { x: 0, y: 0, z: 0, fonte: fonte, tam: tam, cor: cor, trk: trk || 0 };
    if (de !== undefined) { o.de = de; o.dur = dur || 0.5; }
    var ly = texto(c, txt, o); ly.threeDLayer = false; ly.position.setValue([x, y]); return ly;
}
// opacidade com liga/desliga a partir do tempo t (suave em 0.12 s)
function ligaEm(ly, t, d) { var o = ly.property("ADBE Transform Group").property("ADBE Opacity"); o.setValueAtTime(0, 0); o.setValueAtTime(fr(t), 0); o.setValueAtTime(fr(t + (d || 0.12)), 100); }
