// Biblioteca do reel-3d-after: cena 3D no After Effects 26.x feita por script (Classic 3D com profundidade de campo).
// Inclua no seu script com:  //@include "<caminho da skill>/scripts/ae_3d_lib.jsx"   (caminho absoluto, com barras normais)
// ANTES do include, defina estas globais (exemplo vertical 1080x1920):
//   var DIR = "C:/projetos/meu-reel/ae/"; // pasta do projeto, com img/<nome>.png (PNG recortado, transparente)
//   var FPS = 30, W = 1080, H = 1920;
//   var D = 1200;                    // distância câmera → plano de foco (= zoom). 1200 em 1080 ≈ 40 mm; 900-1050 ≈ 30-35 mm
//   var TILT = 14;                   // inclinação da câmera em graus: a base do quadro fica perto da lente e desfoca
//   var FUNDO = [239/255, 239/255, 239/255];
//   var log = new File(DIR + "log.txt"); log.encoding = "UTF-8"; log.open("w"); log.close();
//   function L(s) { log.open("a"); log.writeln(s); log.close(); }   // abre, grava e fecha a cada linha: se o After cair, a última linha fica no log
// texto(comp, txt, {x,y,z,fonte,tam,cor,trk,de,dur,sobe,blur,palavra:true}) — palavra:true entra palavra a palavra.
// camera(c, chaves, durCena, {abertura, chaves:[[t,[x,y,z]]] do FOCO, semSaida, mov:{entra,tau,sai,zoom}}).
// Funções: em, fr, img, fator, onde, colocar, imagem, texto, caixa, aparece, suave, forma/grupo/contorno/preench,
// retangulo, caminho, elipse, desenha, canto, cena(nome,dur,renderer), pose, camera, treme, voa, cacos,
// modelo, luzEstudio, lenteDeVidro.
// Convenção: (x, y) = onde a camada aparece na pose base da câmera; z > 0 = mais longe, z < 0 = mais perto.

    function ler(caminho) { var f = new File(caminho); f.encoding = "UTF-8"; f.open("r"); var s = f.read(); f.close(); return s; }

    // início (s, relativo à cena) da palavra que começa com w
    function em(c, w, n) {
        n = n || 0; var achou = 0;
        for (var i = 0; i < c.palavras.length; i++) {
            var p = c.palavras[i].w.toLowerCase().replace(/[^a-zà-ú]/g, "");
            if (p.indexOf(w) === 0) { if (achou === n) return c.palavras[i].s; achou++; }
        }
        return 0;
    }
    function fr(s) { return Math.round(s * FPS) / FPS; }

    var imgs = {};
    function img(nome) {
        if (!imgs[nome]) imgs[nome] = app.project.importFile(new ImportOptions(new File(DIR + "img/" + nome + ".png")));
        return imgs[nome];
    }

    // ---------- posição com compensação de profundidade ----------
    // (x, y) é onde a camada aparece com a câmera na pose base (alvo no centro, distância D, sem inclinação).
    function fator(z) { return (D + z) / D; }
    function onde(x, y, z) { var s = fator(z); return [W / 2 + (x - W / 2) * s, H / 2 + (y - H / 2) * s, z]; }
    function colocar(ly, x, y, z, escala) {
        ly.threeDLayer = true;
        ly.position.setValue(onde(x, y, z));
        var s = (escala || 100) * fator(z);
        ly.scale.setValue([s, s, s]);
        try { ly.motionBlur = true; } catch (x) { } // Advanced 3D não aceita motion blur
        return ly;
    }
    function imagem(comp, nome, x, y, z, largura) {
        var it = img(nome);
        var ly = comp.layers.add(it);
        return colocar(ly, x, y, z, largura / it.width * 100);
    }

    // ---------- texto com entrada letra a letra (opacidade + desfoque + sobe) ----------
    function texto(comp, txt, o) {
        var ly = comp.layers.addText(txt);
        var sp = ly.property("ADBE Text Properties").property("ADBE Text Document");
        var td = sp.value;
        td.resetCharStyle();
        td.font = o.fonte; td.fontSize = o.tam; td.fillColor = o.cor; td.applyFill = true; td.applyStroke = false;
        td.tracking = o.trk || 0;
        td.justification = o.just || ParagraphJustification.CENTER_JUSTIFY;
        sp.setValue(td);
        if (o.de !== undefined) {
            var anims = ly.property("ADBE Text Properties").property("ADBE Text Animators");
            var an = anims.addProperty("ADBE Text Animator");
            var pr = an.property("ADBE Text Animator Properties");
            pr.addProperty("ADBE Text Opacity").setValue(0);
            pr.addProperty("ADBE Text Blur").setValue([o.blur || 26, o.blur || 26]);
            pr.addProperty("ADBE Text Position 3D").setValue([0, o.sobe === undefined ? 40 : o.sobe, 0]);
            var sel = an.property("ADBE Text Selectors").addProperty("ADBE Text Selector");
            var adv = sel.property("ADBE Text Range Advanced");
            // forma quadrada + suavização: a rampa estende a seleção para fora do intervalo e deixa letra escondida no fim
            adv.property("ADBE Text Range Shape").setValue(1);
            try { adv.property("ADBE Text Selector Smoothness").setValue(100); } catch (x) { L("  sem smoothness: " + x); }
            var st = sel.property("ADBE Text Percent Start");
            var dur = o.dur || Math.max(0.25, txt.length * 0.04);
            if (o.palavra) { try { sel.property("ADBE Text Range Advanced").property("ADBE Text Range Type2").setValue(3); } catch (x) { L("  sem unidade palavra: " + x); } } // 3 = palavras
            st.setValueAtTime(fr(o.de), 0);
            st.setValueAtTime(fr(o.de + dur), 100);
        }
        // ponto de ancoragem no centro da caixa do texto
        var r = ly.sourceRectAtTime(comp.duration - 1 / FPS, false);
        ly.anchorPoint.setValue([r.left + r.width / 2, r.top + r.height / 2, 0]);
        colocar(ly, o.x, o.y, o.z || 0, 100);
        L("  texto '" + txt + "' fonte=" + sp.value.font + " caixa=" + Math.round(r.width) + "x" + Math.round(r.height) + " em " + o.x + "," + o.y + "," + (o.z || 0));
        return ly;
    }
    function caixa(comp, txt, o) { // parágrafo (verbetes e texto miúdo)
        var ly = comp.layers.addBoxText([o.w, o.h], txt);
        var sp = ly.property("ADBE Text Properties").property("ADBE Text Document");
        var td = sp.value; td.resetCharStyle();
        td.font = o.fonte; td.fontSize = o.tam; td.fillColor = o.cor; td.applyFill = true; td.applyStroke = false;
        td.leading = o.lead || o.tam * 1.1; td.tracking = o.trk || -10;
        td.justification = o.just || ParagraphJustification.LEFT_JUSTIFY;
        sp.setValue(td);
        ly.anchorPoint.setValue([-o.w / 2, -o.h / 2, 0]); // canto superior esquerdo
        colocar(ly, o.x, o.y, o.z || 0, 100);
        if (o.de !== undefined) aparece(ly, o.de, 0.3);
        return ly;
    }
    function aparece(ly, t, d) {
        var op = ly.property("ADBE Transform Group").property("ADBE Opacity");
        op.setValueAtTime(Math.max(0, fr(t)), 0); op.setValueAtTime(fr(t + (d || 0.25)), 100);
    }
    function suave(prop) { // easy ease em todas as chaves
        for (var k = 1; k <= prop.numKeys; k++) {
            var n = prop.value instanceof Array ? prop.value.length : 1;
            if (prop.propertyValueType === PropertyValueType.TwoD_SPATIAL || prop.propertyValueType === PropertyValueType.ThreeD_SPATIAL) n = 1;
            var e = []; for (var i = 0; i < n; i++) e.push(new KeyframeEase(0, 70));
            try { prop.setTemporalEaseAtKey(k, e, e); } catch (x) { }
            try { prop.setSpatialTangentsAtKey(k, [0, 0, 0], [0, 0, 0]); } catch (x) { }
        }
    }

    // ---------- formas ----------
    function forma(comp, nome) { var ly = comp.layers.addShape(); ly.name = nome; return ly; }
    function grupo(ly) { return ly.property("ADBE Root Vectors Group").addProperty("ADBE Vector Group").property("ADBE Vectors Group"); }
    function contorno(vs, cor, larg) { var s = vs.addProperty("ADBE Vector Graphic - Stroke"); s.property("ADBE Vector Stroke Color").setValue(cor); s.property("ADBE Vector Stroke Width").setValue(larg); return s; }
    function preench(vs, cor) { var f = vs.addProperty("ADBE Vector Graphic - Fill"); f.property("ADBE Vector Fill Color").setValue(cor); return f; }
    function retangulo(comp, x, y, z, w, h, cor, raio) {
        var ly = forma(comp, "ret"); var vs = grupo(ly);
        var r = vs.addProperty("ADBE Vector Shape - Rect"); r.property("ADBE Vector Rect Size").setValue([w, h]);
        if (raio) r.property("ADBE Vector Rect Roundness").setValue(raio);
        preench(vs, cor); colocar(ly, x, y, z, 100); return ly;
    }
    function caminho(comp, pts, x, y, z, cor, larg, fechado) {
        var ly = forma(comp, "traco"); var vs = grupo(ly);
        var p = vs.addProperty("ADBE Vector Shape - Group"); var sh = new Shape(); sh.vertices = pts; sh.closed = !!fechado;
        p.property("ADBE Vector Shape").setValue(sh); contorno(vs, cor, larg);
        colocar(ly, x, y, z, 100); return ly;
    }
    function elipse(comp, x, y, z, w, h, cor, larg, tracejado) {
        var ly = forma(comp, "elipse"); var vs = grupo(ly);
        vs.addProperty("ADBE Vector Shape - Ellipse").property("ADBE Vector Ellipse Size").setValue([w, h]);
        var s = contorno(vs, cor, larg);
        if (tracejado) { var ds = s.property("ADBE Vector Stroke Dashes"); ds.addProperty("ADBE Vector Stroke Dash 1").setValue(tracejado[0]); ds.addProperty("ADBE Vector Stroke Gap 1").setValue(tracejado[1]); }
        colocar(ly, x, y, z, 100); return ly;
    }
    function desenha(ly, t0, t1) { // trim paths 0 → 100
        var vs = ly.property("ADBE Root Vectors Group").property(1).property("ADBE Vectors Group");
        var tr = vs.addProperty("ADBE Vector Filter - Trim");
        var e = tr.property("ADBE Vector Trim End"); e.setValueAtTime(fr(t0), 0); e.setValueAtTime(fr(t1), 100); suave(e);
    }
    function canto(comp, x, y, z, giro, cor, tam, esp) {
        var ly = caminho(comp, [[0, tam], [0, 0], [tam, 0]], x, y, z, cor, esp, false);
        ly.property("ADBE Transform Group").property("ADBE Rotate Z").setValue(giro);
        return ly;
    }

    // ---------- câmera, foco e cena ----------
    function cena(nome, dur, renderer) {
        var c = app.project.items.addComp(nome, W, H, 1, dur, FPS);
        // padrão Classic 3D (DOF + motion blur); "ADBE Calder" (Advanced 3D) para cena com modelo 3D GLB: DOF sim, motion blur não
        c.renderer = renderer || "ADBE Advanced 3d";
        if (c.renderer !== "ADBE Calder") { c.motionBlur = true; c.shutterAngle = 180; c.shutterPhase = -90; c.motionBlurSamplesPerFrame = 16; }
        var bg = c.layers.addSolid(FUNDO, "fundo", W, H, 1, dur); // 2D: o fundo não entra na câmera
        return c;
    }
    // pose da câmera: alvo (x, y, z), distância, inclinação (graus, + = câmera abaixo olhando para cima) e giro lateral
    function pose(alvo, dist, tilt, giro) {
        var a = tilt * Math.PI / 180, b = (giro || 0) * Math.PI / 180;
        return [alvo[0] + dist * Math.cos(a) * Math.sin(b), alvo[1] + dist * Math.sin(a), alvo[2] - dist * Math.cos(a) * Math.cos(b)];
    }
    function camera(c, chaves, durCena, foco) {
        // chaves: [[t, [x,y,z], dist, tilt, giro], ...]
        var cam = c.layers.addCamera("cam", [W / 2, H / 2]);
        cam.autoOrient = AutoOrientType.CAMERA_OR_POINT_OF_INTEREST;
        var op = cam.property("ADBE Camera Options Group");
        op.property("ADBE Camera Zoom").setValue(D);
        op.property("ADBE Camera Depth of Field").setValue(1);
        op.property("ADBE Camera Aperture").setValue(foco && foco.abertura || 350); // valor real (350-420 na referência medida)
        try { op.property("ADBE Camera Blur Level").setValue(foco && foco.nivel || 100); } catch (x) { } // oculto no Advanced 3D
        var tg = cam.property("ADBE Transform Group");
        tg.property("ADBE Orientation").setValue([0, 0, 0]);
        tg.property("ADBE Rotate X").setValue(0); tg.property("ADBE Rotate Y").setValue(0); tg.property("ADBE Rotate Z").setValue(0);
        var P = tg.property("ADBE Position"), POI = tg.property("ADBE Anchor Point");
        // Movimento medido na referência (fluxo óptico): quase só deslize lateral, zoom perto de zero.
        // Entrada: a câmera chega de lado, rápida, e freia em curva exponencial (~1 s).
        // Meio: as chaves (batidas) com ease longo; a distância varia no máximo ~1/4 do pedido (sem cara de zoom).
        // Saída: acelera de novo para o mesmo lado e emenda com a próxima cena.
        var mv = foco && foco.mov || {};
        var EX = mv.entra === undefined ? 170 : mv.entra, TAU = mv.tau || 0.38, SX = mv.sai === undefined ? 150 : mv.sai, TS = 0.5; // v4: pico de velocidade ~4 px/q (ref), v3 tinha 6,6
        var ZF = mv.zoom === undefined ? 0.25 : mv.zoom;
        function ease(u) { return u < 0.5 ? 4 * u * u * u : 1 - Math.pow(-2 * u + 2, 3) / 2; }
        function lerp(a, b, u) { return a + (b - a) * u; }
        function estado(t) {
            var i = 0; while (i < chaves.length - 1 && t > chaves[i + 1][0]) i++;
            var k0 = chaves[i], k1 = chaves[Math.min(i + 1, chaves.length - 1)];
            var u = k1[0] > k0[0] ? ease(Math.max(0, Math.min(1, (t - k0[0]) / (k1[0] - k0[0])))) : 0;
            var al = [lerp(k0[1][0], k1[1][0], u), lerp(k0[1][1], k1[1][1], u), lerp(k0[1][2], k1[1][2], u)];
            var di = lerp(k0[2], k1[2], u), d0 = chaves[0][2];
            di = d0 + (di - d0) * ZF;
            var off = EX * Math.exp(-t / TAU);                                   // entrada lateral
            var ts = durCena - TS; if (t > ts) off -= SX * Math.pow((t - ts) / TS, 2); // saída acelerando
            al[0] += off;
            var gi = lerp(k0[4] || 0, k1[4] || 0, u) + off * 0.012;              // órbita leve acompanha o deslize: paralaxe
            return {alvo: al, dist: di, tilt: lerp(k0[3], k1[3], u), giro: gi};
        }
        var tempos = [], vP = [], vI = [];
        for (var q = 0; q <= Math.round(durCena * FPS); q++) {
            var t = q / FPS, e = estado(t);
            tempos.push(t); vP.push(pose(e.alvo, e.dist, e.tilt, e.giro)); vI.push(e.alvo);
        }
        P.setValuesAtTimes(tempos, vP); POI.setValuesAtTimes(tempos, vI);
        // null de foco: a distância de foco segue ele (expressão do "Link Focus Distance to Layer")
        var nf = c.layers.addNull(durCena); nf.name = "FOCO"; nf.threeDLayer = true; nf.enabled = false;
        var fp = nf.property("ADBE Transform Group").property("ADBE Position");
        var fz = foco && foco.chaves || [[0, chaves[0][1]]];
        // entra desfocado (foco longe) e sai desfocado: a troca de cena da referência
        fp.setValueAtTime(0, [fz[0][1][0], fz[0][1][1], fz[0][1][2] + 2600]);
        for (var j = 0; j < fz.length; j++) fp.setValueAtTime(Math.max(fr(fz[j][0]), 6 / FPS), fz[j][1]);
        var ult = fz[fz.length - 1][1];
        if (!(foco && foco.semSaida)) {
            fp.setValueAtTime(durCena - 6 / FPS, ult);
            fp.setValueAtTime(durCena, [ult[0], ult[1], ult[2] + 2600]);
        }
        suave(fp);
        op.property("ADBE Camera Focus Distance").expression =
            'var t = thisComp.layer("FOCO"); var v1 = t.toWorld(t.anchorPoint) - toWorld([0,0,0]); var v2 = toWorldVec([0,0,1]); dot(v1, v2);';
        return cam;
    }
    function treme(cam, t, forca) { // tranco da câmera na rachadura
        var P = cam.property("ADBE Transform Group").property("ADBE Position");
        var base = P.valueAtTime(fr(t), false);
        var seq = [[0, 0], [1, 1], [2, -0.8], [3, 0.6], [4, -0.4], [6, 0.2], [8, 0]];
        for (var i = 0; i < seq.length; i++) {
            var tt = fr(t) + seq[i][0] / FPS;
            var b = P.valueAtTime(tt, false);
            P.setValueAtTime(tt, [b[0] + forca * seq[i][1], b[1] - forca * 0.7 * seq[i][1], b[2]]);
        }
    }
    function voa(ly, t0, t1, de, ate, extra) { // posição/escala de entrada com compensação de profundidade
        var P = ly.property("ADBE Transform Group").property("ADBE Position");
        var S = ly.property("ADBE Transform Group").property("ADBE Scale");
        var s0 = S.valueAtTime(0, true)[0] / fator(P.valueAtTime(0, true)[2]); // antes das chaves: senão lê a pose de voo
        P.setValueAtTime(fr(t0), onde(de[0], de[1], de[2])); P.setValueAtTime(fr(t1), onde(ate[0], ate[1], ate[2]));
        S.setValueAtTime(fr(t0), [s0 * fator(de[2]), s0 * fator(de[2]), 100]); S.setValueAtTime(fr(t1), [s0 * fator(ate[2]), s0 * fator(ate[2]), 100]);
        suave(P); suave(S);
    }
    function cacos(c, lista, dur) {
        for (var i = 0; i < lista.length; i++) {
            var k = lista[i];
            var ly = caminho(c, [[0, k[4] * 0.1], [k[3], 0], [k[3] * 0.55, k[4]]], k[0], k[1], k[2], [0.33, 0.33, 0.33], 1.6, true);
            var vs = ly.property("ADBE Root Vectors Group").property(1).property("ADBE Vectors Group");
            preench(vs, [1, 1, 1]).property("ADBE Vector Fill Opacity").setValue(40);
            var P = ly.property("ADBE Transform Group").property("ADBE Position"), p0 = P.value;
            P.setValueAtTime(0, p0); P.setValueAtTime(dur, [p0[0] + k[5] * 60, p0[1] - k[5] * 220, p0[2]]);
            var R = ly.property("ADBE Transform Group").property("ADBE Rotate Z"); R.setValueAtTime(0, k[6]); R.setValueAtTime(dur, k[6] + k[5] * 50);
            var RY = ly.property("ADBE Transform Group").property("ADBE Rotate Y"); RY.setValueAtTime(0, 0); RY.setValueAtTime(dur, k[5] * 120);
        }
    }

    // Modelo 3D (GLB) numa cena "ADBE Calder". NÃO mexer em Material Options do modelo (derruba o After na 26.5).
    function modelo(comp, arquivo, x, y, z, escala) {
        var it = app.project.importFile(new ImportOptions(new File(arquivo)));
        var ly = comp.layers.add(it);
        ly.property("ADBE Transform Group").property("ADBE Position").setValue([x, y, z]);
        ly.property("ADBE Transform Group").property("ADBE Scale").setValue([escala, escala, escala]);
        return ly;
    }
    // Luz de estúdio para modelo 3D: ambiente + paralela com sombra; "aparador" = sólido 3D que só mostra a sombra.
    function luzEstudio(comp, dur, aparador) {
        if (comp.renderer !== "ADBE Calder") { L("  luzEstudio pulada: " + comp.name + " não é Advanced 3D (mexer em sombra no Classic 3D derruba o After)"); return; }
        var amb = comp.layers.addLight("ambiente", [W / 2, H / 2]); amb.lightType = LightType.ENVIRONMENT;
        amb.property("ADBE Light Options Group").property("ADBE Light Intensity").setValue(140);
        var sol = comp.layers.addLight("sol", [W / 2, H / 2]); sol.lightType = LightType.PARALLEL;
        sol.position.setValue([-700, 300, -1200]);
        sol.property("ADBE Light Options Group").property("ADBE Light Intensity").setValue(110);
        sol.property("ADBE Light Options Group").property("ADBE Casts Shadows").setValue(1);
        sol.property("ADBE Light Options Group").property("ADBE Light Shadow Darkness").setValue(22);
        try { sol.property("ADBE Light Options Group").property("ADBE Light Shadow Diffusion").setValue(60); } catch (x) { }
        if (aparador) { // {tipo: "parede"|"chao", pos: [x,y,z]}
            var p = comp.layers.addSolid(FUNDO, aparador.tipo, 5000, 5000, 1, dur); p.threeDLayer = true;
            p.position.setValue(aparador.pos);
            if (aparador.tipo === "chao") p.property("ADBE Transform Group").property("ADBE Rotate X").setValue(90);
            p.property("ADBE Material Options Group").property("ADBE Accepts Shadows").setValue(2);
        }
    }
    // Lente de vidro que amplia o que está atrás (lupa). Chamar ANTES de adicionar a camada da lupa
    // (a camada de ajuste precisa ficar entre o fundo e a lupa). nomeLupa = nome da camada; (cx, cy) e raio = lente em px do PNG.
    function lenteDeVidro(comp, dur, nomeLupa, cx, cy, raio, ampliacao) {
        var lente = comp.layers.addSolid([1, 1, 1], "lente", W, H, 1, dur); lente.adjustmentLayer = true;
        var exC = 'var L = thisComp.layer("' + nomeLupa + '"); L.toComp([' + cx + ', ' + cy + ', 0]);';
        var exR = 'var L = thisComp.layer("' + nomeLupa + '"); var c = L.toComp([' + cx + ', ' + cy + ', 0]); var e = L.toComp([' + (cx + raio) + ', ' + cy + ', 0]); length(c, e) * 0.94;';
        var mg = lente.property("ADBE Effect Parade").addProperty("ADBE Magnify");
        mg.property(2).expression = exC; mg.property(3).setValue(ampliacao || 150); mg.property(5).expression = exR; mg.property(6).setValue(6);
        var bj = lente.property("ADBE Effect Parade").addProperty("ADBE Bulge");
        bj.property(1).expression = exR; bj.property(2).expression = exR; bj.property(3).expression = exC; bj.property(4).setValue(0.45);
        return lente;
    }
