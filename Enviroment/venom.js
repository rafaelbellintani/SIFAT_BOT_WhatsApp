const venom = require("venom-bot");

    venom
        .create(
            'Restaurante', //Nome do token do WhatsApp WEB
            (base64Qrimg, asciiQR, attempts, urlCode) => {
              console.log('Number of attempts to read the qrcode: ', attempts);
              console.log('Terminal qrcode: ', asciiQR);
              console.log('base64 image string qrcode: ', base64Qrimg);
              console.log('urlCode (data-ref): ', urlCode);
            },
            (statusSession, session) => {
              console.log('Status Session: ', statusSession);
              console.log('Session name: ', session);
            },
            (browser, waPage) => {
                console.log("Browser PID:", browser.process().pid);
                waPage.screenshot({path: 'screenshot.png'});
              },
              )
        .then((client) => start(client))
        .catch((erro) => {
            console.log(erro);
        });
