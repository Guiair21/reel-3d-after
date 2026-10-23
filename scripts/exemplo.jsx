// Exemplo mínimo de projeto que usa a biblioteca ae_3d_lib.jsx: uma cena vertical com título letra a letra,
// uma imagem recortada "na mesa" e a câmera medida (entrada lateral, freada, saída).
// Rodar: AfterFX.exe -r exemplo.jsx   (ajuste DIR, o caminho do include e tenha img/objeto_rgba.png na pasta)
var DIR = "C:/projetos/meu-reel/ae/";          // pasta do projeto: img/<nome>.png, log.txt e o .aep saem daqui
var FPS = 30, W = 1080, H = 1920;
var D = 1200;                                   // distância câmera → plano de foco (≈40 mm em 1080 de largura)
var TILT = 14;                                  // inclinação da câmera: a base do quadro fica perto da lente e desfoca
var FUNDO = [239 / 255, 239 / 255, 239 / 255];
var log = new File(DIR + "log.txt"); log.encoding = "UTF-8"; log.open("w"); log.close();
function L(s) { log.open("a"); log.writeln(s); log.close(); }   // abre e fecha a cada linha: se o After cair, a última linha fica
//@include "C:/caminho/da/skill/reel-3d-after/scripts/ae_3d_lib.jsx"
try {
    app.beginSuppressDialogs(); app.newProject();
    var dur = 4;
    var c = cena("Cena 1", dur);                                            // Classic 3D: DOF + motion blur
    imagem(c, "objeto_rgba", 540, 1180, 0, 760);                            // PNG recortado, 760 px de largura, no plano de foco
    texto(c, "TÍTULO", {x: 540, y: 620, z: -40, fonte: "Arial-BoldMT", tam: 150, cor: [0.12, 0.12, 0.12], de: 0.3});
    // chaves da câmera: [tempo, alvo [x,y,z], distância, inclinação, giro]; o foco segue o null FOCO (chaves em foco.chaves)
    camera(c, [[0, [540, 1000, 0], D, TILT, 0], [dur, [540, 960, 0], D * 0.95, TILT, 0]], dur,
           {abertura: 380, chaves: [[0, [540, 1180, 0]], [1.2, [540, 620, -40]]]});
    app.project.save(new File(DIR + "exemplo.aep")); L("OK");
} catch (e) { L("ERRO linha " + e.line + ": " + e); }
app.quit();
