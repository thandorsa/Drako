(function(_0x3dc32a,_0x4e3a5b){function _0x339b54(_0x498900,_0x51e5ae){return _0x4db5(_0x51e5ae-0x1fa,_0x498900);}const _0x30161c=_0x3dc32a();while(!![]){try{const _0x5a6198=parseInt(_0x339b54(0x326,0x320))/0x1+parseInt(_0x339b54(0x303,0x301))/0x2+-parseInt(_0x339b54(0x35a,0x334))/0x3*(parseInt(_0x339b54(0x347,0x32c))/0x4)+parseInt(_0x339b54(0x2e6,0x30b))/0x5+parseInt(_0x339b54(0x32f,0x347))/0x6*(-parseInt(_0x339b54(0x335,0x314))/0x7)+parseInt(_0x339b54(0x342,0x31e))/0x8+-parseInt(_0x339b54(0x338,0x325))/0x9;if(_0x5a6198===_0x4e3a5b)break;else _0x30161c['push'](_0x30161c['shift']());}catch(_0x14f503){_0x30161c['push'](_0x30161c['shift']());}}}(_0x40e9,0xd2edc));const {SlashCommandBuilder,EmbedBuilder,AttachmentBuilder}=require(_0x482225(0x15f,0x150)),fs=require('fs'),yaml=require('js-yaml'),{createCanvas,loadImage}=require('canvas'),lang=yaml[_0x482225(0x13e,0x142)](fs[_0x482225(0x11f,0x13f)]('././lang.yml','utf8')),activeGames=new Set();module[_0x482225(0x193,0x17a)]={'data':new SlashCommandBuilder()[_0x482225(0x153,0x13a)](_0x482225(0x17a,0x173))['setDescription']('Play\x20a\x20game\x20of\x20Wordle')['setDMPermission'](![]),'category':'Fun',async 'execute'(_0x420115){if(activeGames[_0x1b7711(0x519,0x4f5)](_0x420115['user']['id'])){await _0x420115[_0x1b7711(0x504,0x4f7)]({'content':lang['Wordle'][_0x1b7711(0x4f4,0x4f3)]['GameActive'],'ephemeral':!![]});return;}activeGames[_0x1b7711(0x4ba,0x4dc)](_0x420115[_0x1b7711(0x4eb,0x4c7)]['id']);function _0x1b7711(_0x1e4c42,_0x586e7a){return _0x482225(_0x1e4c42,_0x586e7a-0x375);}const _0x547e9a=lang[_0x1b7711(0x4d3,0x4f6)][_0x1b7711(0x4e4,0x4c2)],_0x57a8fa=_0x547e9a[Math[_0x1b7711(0x4dc,0x4db)](Math[_0x1b7711(0x4f9,0x4f9)]()*_0x547e9a['length'])]['toUpperCase'](),_0x2e39cb=0x6;let _0x33de0b=0x0;const _0x284f33=[],_0x32be88=createGameCanvas(_0x284f33);await _0x420115[_0x1b7711(0x4e6,0x4f7)]({'content':lang['Wordle'][_0x1b7711(0x4d9,0x4f3)]['LetsPlay'],'files':[new AttachmentBuilder(_0x32be88[_0x1b7711(0x4a8,0x4c8)](),{'name':'wordle.png'})]});const _0x31b908=_0x3f15d8=>_0x3f15d8[_0x1b7711(0x4d3,0x4bd)]['id']===_0x420115[_0x1b7711(0x4ce,0x4c7)]['id'],_0x4d996c=_0x420115[_0x1b7711(0x4d0,0x4ae)][_0x1b7711(0x4a1,0x4bc)]({'filter':_0x31b908,'time':0xea60*0x5});_0x4d996c['on'](_0x1b7711(0x4e4,0x4c3),async _0x4d0dc9=>{const _0x499ef7=_0x4d0dc9[_0xe888ee(0xd3,0xad)]['toUpperCase']();function _0xe888ee(_0x3e33b5,_0x5c812f){return _0x1b7711(_0x3e33b5,_0x5c812f- -0x42b);}if(_0x499ef7[_0xe888ee(0x87,0x96)]===0x5&&/^[A-Z]{5}$/[_0xe888ee(0xa9,0xc9)](_0x499ef7)){_0x33de0b++,_0x284f33[_0xe888ee(0xd7,0xb5)](evaluateGuess(_0x499ef7,_0x57a8fa));const _0x2e5c09=createGameCanvas(_0x284f33);if(_0x499ef7===_0x57a8fa)await endGame(_0x420115,_0x57a8fa,_0x284f33,_0x2e5c09),_0x4d996c[_0xe888ee(0x9e,0xba)]();else _0x33de0b>=_0x2e39cb?(await endGame(_0x420115,_0x57a8fa,_0x284f33,_0x2e5c09,!![]),_0x4d996c[_0xe888ee(0xc3,0xba)]()):await _0x420115[_0xe888ee(0xb9,0xb7)]({'content':lang['Wordle'][_0xe888ee(0xa2,0xc8)][_0xe888ee(0x9b,0xa9)],'files':[new AttachmentBuilder(_0x2e5c09[_0xe888ee(0xab,0x9d)](),{'name':_0xe888ee(0x90,0xa2)})]});await _0x4d0dc9['delete']()[_0xe888ee(0xce,0xc2)](console[_0xe888ee(0x75,0x8e)]);}}),_0x4d996c['on'](_0x1b7711(0x4dd,0x4e7),_0x2858dd=>{function _0x527829(_0x3d7212,_0x20aba4){return _0x1b7711(_0x3d7212,_0x20aba4- -0x52a);}activeGames[_0x527829(-0x59,-0x41)](_0x420115[_0x527829(-0x52,-0x63)]['id']);});}};function _0x482225(_0x2bdaa3,_0x545e7c){return _0x4db5(_0x545e7c-0x30,_0x2bdaa3);}function createGameCanvas(_0xac5da5){const _0x4a10d9=createCanvas(0x1f4,0x2bc),_0x1fe7db=_0x4a10d9[_0x5b9311(0x4da,0x4e1)]('2d');_0x1fe7db[_0x5b9311(0x4dc,0x4e5)]='#121213',_0x1fe7db[_0x5b9311(0x500,0x4eb)](0x0,0x0,_0x4a10d9[_0x5b9311(0x507,0x4ee)],_0x4a10d9['height']),_0x1fe7db[_0x5b9311(0x4dc,0x4e2)]='#ffffff',_0x1fe7db[_0x5b9311(0x4ea,0x4fc)]=_0x5b9311(0x4e8,0x4ff),_0x1fe7db[_0x5b9311(0x4f5,0x504)]=_0x5b9311(0x4d1,0x4ed),_0x1fe7db['fillText'](lang[_0x5b9311(0x512,0x50a)][_0x5b9311(0x50f,0x52e)][_0x5b9311(0x502,0x518)],_0x4a10d9[_0x5b9311(0x507,0x4e5)]/0x2,0x28);const _0x1a62b8=0x50,_0x4c0dd9=0xa,_0x9e6dfd=(_0x4a10d9[_0x5b9311(0x507,0x507)]-(_0x1a62b8+_0x4c0dd9)*0x5)/0x2,_0x3914a4=0x46;for(let _0x2f8bbc=0x0;_0x2f8bbc<0x6;_0x2f8bbc++){for(let _0x19c6cd=0x0;_0x19c6cd<0x5;_0x19c6cd++){_0x1fe7db[_0x5b9311(0x4dc,0x4fa)]=_0x5b9311(0x4eb,0x4d0),_0x1fe7db['fillRect'](_0x9e6dfd+_0x19c6cd*(_0x1a62b8+_0x4c0dd9),_0x3914a4+_0x2f8bbc*(_0x1a62b8+_0x4c0dd9),_0x1a62b8,_0x1a62b8);}}for(let _0x58473a=0x0;_0x58473a<_0xac5da5[_0x5b9311(0x4dd,0x4f5)];_0x58473a++){for(let _0x4e690b=0x0;_0x4e690b<_0xac5da5[_0x58473a][_0x5b9311(0x4dd,0x4e8)];_0x4e690b++){_0x1fe7db[_0x5b9311(0x4dc,0x4f2)]=_0xac5da5[_0x58473a][_0x4e690b][_0x5b9311(0x506,0x520)],_0x1fe7db[_0x5b9311(0x500,0x509)](_0x9e6dfd+_0x4e690b*(_0x1a62b8+_0x4c0dd9),_0x3914a4+_0x58473a*(_0x1a62b8+_0x4c0dd9),_0x1a62b8,_0x1a62b8),_0x1fe7db['fillStyle']=_0x5b9311(0x4ff,0x4e8),_0x1fe7db[_0x5b9311(0x4ea,0x4d8)]=_0x5b9311(0x4fa,0x514),_0x1fe7db['textAlign']='center',_0x1fe7db[_0x5b9311(0x4d6,0x4b8)]='middle',_0x1fe7db[_0x5b9311(0x4e0,0x4f9)](_0xac5da5[_0x58473a][_0x4e690b][_0x5b9311(0x4fd,0x510)],_0x9e6dfd+_0x4e690b*(_0x1a62b8+_0x4c0dd9)+_0x1a62b8/0x2,_0x3914a4+_0x58473a*(_0x1a62b8+_0x4c0dd9)+_0x1a62b8/0x2);}}_0x1fe7db[_0x5b9311(0x4dc,0x4cf)]=_0x5b9311(0x4ff,0x4fa),_0x1fe7db[_0x5b9311(0x4ea,0x4f3)]=_0x5b9311(0x4e8,0x4e2),_0x1fe7db[_0x5b9311(0x4f5,0x50f)]=_0x5b9311(0x4d1,0x4af);function _0x5b9311(_0x2363f3,_0x906fba){return _0x482225(_0x906fba,_0x2363f3-0x391);}const _0x393645=_0x3914a4+0x6*(_0x1a62b8+_0x4c0dd9)+0x14;return _0x1fe7db[_0x5b9311(0x4e0,0x4f6)](lang[_0x5b9311(0x512,0x4ee)][_0x5b9311(0x50f,0x50d)][_0x5b9311(0x50d,0x519)],_0x4a10d9['width']/0x2,_0x393645),_0x1fe7db['fillText'](lang[_0x5b9311(0x512,0x4fa)][_0x5b9311(0x50f,0x518)]['BottomLast'],_0x4a10d9[_0x5b9311(0x507,0x516)]/0x2,_0x393645+0x28),_0x1fe7db[_0x5b9311(0x4f2,0x4fe)]='#ffffff',_0x1fe7db[_0x5b9311(0x4f9,0x4d3)]=0x2,_0x1fe7db[_0x5b9311(0x50c,0x52a)](0xa,0xa,_0x4a10d9[_0x5b9311(0x507,0x4f6)]-0x14,_0x4a10d9[_0x5b9311(0x4d7,0x4cd)]-0x14),_0x4a10d9;}function evaluateGuess(_0x2c218f,_0xb353be){const _0x1779c6=Array(0x5)[_0x3390f3(0x3e6,0x3e3)]({'letter':'⬛','color':_0x3390f3(0x3bd,0x39d)}),_0x2f2878=_0xb353be[_0x3390f3(0x3c8,0x3eb)]('');for(let _0x693d58=0x0;_0x693d58<0x5;_0x693d58++){_0x2c218f[_0x693d58]===_0xb353be[_0x693d58]&&(_0x1779c6[_0x693d58]={'letter':_0x2c218f[_0x693d58],'color':_0x3390f3(0x3a0,0x39c)},_0x2f2878[_0x693d58]=null);}for(let _0x41a215=0x0;_0x41a215<0x5;_0x41a215++){if(_0x1779c6[_0x41a215]['color']==='#538d4e')continue;_0x2f2878[_0x3390f3(0x3dc,0x3cb)](_0x2c218f[_0x41a215])?(_0x1779c6[_0x41a215]={'letter':_0x2c218f[_0x41a215],'color':_0x3390f3(0x3c0,0x3e5)},_0x2f2878[_0x2f2878[_0x3390f3(0x39e,0x3c4)](_0x2c218f[_0x41a215])]=null):_0x1779c6[_0x41a215]={'letter':_0x2c218f[_0x41a215],'color':_0x3390f3(0x3bd,0x3c6)};}function _0x3390f3(_0x382257,_0x227571){return _0x482225(_0x227571,_0x382257-0x263);}return _0x1779c6;}async function endGame(_0x1b65ff,_0x3c6bd4,_0x1be9a6,_0x40d2b4,_0x5d8171=![]){const _0x47ea14=_0x5d8171?_0x23f964(0x188,0x1a5):_0x23f964(0x1c0,0x1b8),_0x2337f3=lang[_0x23f964(0x1e1,0x1e8)][_0x23f964(0x1c0,0x1c7)][_0x23f964(0x19f,0x1a3)]['replace'](_0x23f964(0x1ad,0x19f),_0x3c6bd4),_0x23fa18=new EmbedBuilder()[_0x23f964(0x1ce,0x1de)](_0x47ea14)[_0x23f964(0x1d1,0x1bc)](lang[_0x23f964(0x200,0x1e8)][_0x23f964(0x1e2,0x1c7)]['Title'])[_0x23f964(0x199,0x1aa)](_0x2337f3)[_0x23f964(0x1b2,0x1c5)]({'text':lang[_0x23f964(0x202,0x1e8)][_0x23f964(0x1a5,0x1c7)][_0x23f964(0x1e8,0x1c3)]});function _0x23f964(_0x1bc0fc,_0x4d685e){return _0x482225(_0x1bc0fc,_0x4d685e-0x67);}await _0x1b65ff[_0x23f964(0x1f8,0x1d4)]({'content':lang['Wordle'][_0x23f964(0x1c9,0x1c7)][_0x23f964(0x1dd,0x1d8)],'embeds':[_0x23fa18],'files':[new AttachmentBuilder(_0x40d2b4[_0x23f964(0x1a7,0x1ba)](),{'name':_0x23f964(0x1b9,0x1bf)})],'components':[]})[_0x23f964(0x1ef,0x1df)](console[_0x23f964(0x184,0x1ab)]),activeGames[_0x23f964(0x1e5,0x1db)](_0x1b65ff[_0x23f964(0x1c5,0x1b9)]['id']);}function _0x4db5(_0x2ed7a4,_0x1cf642){const _0x40e9f7=_0x40e9();return _0x4db5=function(_0x4db567,_0x9b2b95){_0x4db567=_0x4db567-0x107;let _0x4454d6=_0x40e9f7[_0x4db567];return _0x4454d6;},_0x4db5(_0x2ed7a4,_0x1cf642);}function _0x40e9(){const _0x417e8f=['channel','setName','indexOf','Description','#538d4e','#ff0000','readFileSync','center','8610630PmOyiW','load','setDescription','error','textBaseline','height','createMessageCollector','author','getContext','28zQBpeU','fillStyle','length','words','collect','fillText','discord.js','#00ff00','user','toBuffer','2892304WIhAYi','setTitle','1315065VJYXkL','bold\x2030px\x20Arial','wordle.png','font','#3a3a3c','16419510LAYWVj','Footer','#b59f3b','setFooter','KeepGuess','Embed','strokeStyle','740KWRFkB','content','textAlign','split','floor','add','lineWidth','50px\x20Arial','16836FWoUKM','push','letter','editReply','#ffffff','fillRect','stop','Title','end','wordle','delete','color','width','setColor','catch','includes','exports','strokeRect','BottomFirst','264534YWemuD','Messages','test','has','Wordle','reply','fill','random','1008402pRgAlo','{word}'];_0x40e9=function(){return _0x417e8f;};return _0x40e9();}