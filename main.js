/*global NdefPlugin, Ndef */

function writeTag(nfcEvent) {
  // ignore what's on the tag for now, just overwrite
  console.log("writeTag");
    
  var mimeType = document.forms[0].elements["mimeType"].value,
    payload = document.forms[0].elements["payload"].value,
    record = ndef.mimeMediaRecord(mimeType, nfc.stringToBytes(payload));

  nfc.write(
        [record], 
        function () {
            window.plugins.toast.showShortBottom("Wrote data to tag.");
            navigator.notification.vibrate(100);
        }, 
        function (reason) {
            navigator.notification.alert(reason, function() {}, "There was a problem");
        }
  );   
}

var ready = function () {
  
  function win() {
    console.log("Listening for NDEF tags");
  }
  
  function fail() {
    alert('Failed to register NFC Listener');
  }
  
  nfc.addTagDiscoveredListener(writeTag, win, fail);

  document.addEventListener("volumeupbutton", showSampleData, false);
  document.addEventListener("volumedownbutton", showSampleData, false);

};

document.addEventListener('deviceready', ready, false);

var data = [
    {
        mimeType: 'text/pg',
        payload: 'Hello test NFC TAG with PhoneGap'
    },
    {
        mimeType: 'text/plain',
        payload: 'Hello test NFC TAG with PhoneGap'
    },
    {
        mimeType: 'text/x-vCard',
        payload: 'BEGIN:VCARD\n' +
            'VERSION:2.1\n' +
            'N:Tonni;Simone;;;\n' +
            'FN:Simone Tonni\n' +
            'ORG:eGlue Solutions;\n' +
            'URL:http://egluesolutions.com\n' +
            'TEL;WORK:06-6228-8833\n' +
            'EMAIL;WORK:simone.tonni@egluesolutions.com\n' +
            'END:VCARD'
    },
    {
        mimeType: 'text/x-vCard',
        payload: 'BEGIN:VCARD\n' +
            'VERSION:2.1\n' +
            'N:Pievaioli;Maurizio;;;\n' +
            'FN:Maurizio Pievaioli\n' +
            'ORG:Chariot Solutions;\n' +
            'URL:http://egluesolutions.com\n' +
            'TEL;WORK:06-6228-8833\n' +
            'EMAIL;WORK:maurizio.pievaioli@egluesolutions.com\n' +
            'END:VCARD'
    },
    {
        mimeType: 'game/rockpaperscissors',
        payload: 'Rock'
    },
    {
        mimeType: '',
        payload: ''
    }
];

var index = 0;
function showSampleData(e) {

    var mimeTypeField = document.forms[0].elements["mimeType"],
      payloadField = document.forms[0].elements["payload"];

    if (e.type === 'volumedownbutton') {
        index--;
    } else {
        index++;
    }
    
    if (index >= data.length) {
        index = 0;
    } else if (index < 0) {
        index = data.length - 1;
    }

    var record = data[index];
    mimeTypeField.value = record.mimeType;
    payloadField.value = record.payload;    
}
