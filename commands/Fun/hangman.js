(function(_0x18c3b4,_0x430a9e){const _0x36ca49=_0x18c3b4();function _0xe1c04d(_0xad8f75,_0xb331e2){return _0x3905(_0xb331e2-0x26,_0xad8f75);}while(!![]){try{const _0x3ed34a=-parseInt(_0xe1c04d(0x12e,0x117))/0x1+-parseInt(_0xe1c04d(0xe3,0x105))/0x2*(-parseInt(_0xe1c04d(0x119,0x114))/0x3)+parseInt(_0xe1c04d(0x145,0x13a))/0x4+parseInt(_0xe1c04d(0xf6,0x107))/0x5+-parseInt(_0xe1c04d(0x121,0x138))/0x6*(parseInt(_0xe1c04d(0x110,0x113))/0x7)+parseInt(_0xe1c04d(0x12a,0x12a))/0x8+-parseInt(_0xe1c04d(0x111,0x11f))/0x9*(-parseInt(_0xe1c04d(0xfb,0x10a))/0xa);if(_0x3ed34a===_0x430a9e)break;else _0x36ca49['push'](_0x36ca49['shift']());}catch(_0x3a046d){_0x36ca49['push'](_0x36ca49['shift']());}}}(_0x1bdd,0xe244d));const {SlashCommandBuilder,EmbedBuilder}=require(_0x44b1d7(-0x1ce,-0x1dc)),fs=require('fs'),yaml=require(_0x44b1d7(-0x202,-0x1f5)),lang=yaml[_0x44b1d7(-0x1e4,-0x1d1)](fs[_0x44b1d7(-0x1c8,-0x1df)]('./lang.yml',_0x44b1d7(-0x21d,-0x204)));function _0x3905(_0x34ea32,_0xccac7e){const _0x1bddb0=_0x1bdd();return _0x3905=function(_0x3905f0,_0x1813d6){_0x3905f0=_0x3905f0-0xd4;let _0x2aa3de=_0x1bddb0[_0x3905f0];return _0x2aa3de;},_0x3905(_0x34ea32,_0xccac7e);}function _0x44b1d7(_0x4003e5,_0xb26014){return _0x3905(_0xb26014- -0x2dc,_0x4003e5);}function _0x1bdd(){const _0x46e3b7=['floor','catch','wordToGuess','user','gameTitle','40KDSkel','#ff0000','6391765ZnZIIJ','reply','length','31160NgXXAl','setColor','delete','js-yaml','add','setDMPermission','toUpperCase','random','activeGameWarning','14987kIaTzl','5709VCOotY','Fun','embeds','582703lHVKsi','addFields','includes','{word}','stop','username','gameEndMessage','repeat','1242XhygJI','setDescription','fill','finalWord','readFileSync','has','winMessage','discord.js','exports','words','hangman','3733280ydUeWP','setFooter','{username}','content','Hangman','#00ff00','progress','load','guessesLeft','channel','gameStartMessage','end','test','hangmanMessageIDs','4974iasZOA','gameOverMessage','4285232UQMXHP','replace','error','join','#ffff00','setTitle','editReply','utf8','setName'];_0x1bdd=function(){return _0x46e3b7;};return _0x1bdd();}global[_0x44b1d7(-0x1d1,-0x1cb)]=global['hangmanMessageIDs']||new Set();const activeGames=new Set();module[_0x44b1d7(-0x1c2,-0x1db)]={'data':new SlashCommandBuilder()[_0x44b1d7(-0x1e6,-0x203)](_0x44b1d7(-0x1fa,-0x1d9))[_0x44b1d7(-0x1ed,-0x1e2)](lang['Hangman']['commandDescription'])[_0x44b1d7(-0x1da,-0x1f3)](![]),'category':_0x44b1d7(-0x1de,-0x1ed),async 'execute'(_0x3864af){if(activeGames[_0x476f1f(0x18f,0x1aa)](_0x3864af[_0x476f1f(0x16e,0x150)]['id'])){await _0x3864af[_0x476f1f(0x173,0x173)]({'content':lang[_0x476f1f(0x199,0x180)][_0x476f1f(0x17d,0x170)],'ephemeral':!![]});return;}activeGames[_0x476f1f(0x179,0x192)](_0x3864af['user']['id']);const _0x1a506f=lang[_0x476f1f(0x199,0x19a)][_0x476f1f(0x193,0x198)],_0x1588a7=_0x1a506f[Math[_0x476f1f(0x16b,0x14e)](Math[_0x476f1f(0x17c,0x196)]()*_0x1a506f[_0x476f1f(0x174,0x175)])]['toUpperCase']();let _0x5b530a=Array(_0x1588a7[_0x476f1f(0x174,0x18f)])[_0x476f1f(0x18c,0x1ae)]('⬛'),_0x31e5ce=0x0;const _0x8b216e=0xc;function _0x476f1f(_0x22754e,_0x49f8cc){return _0x44b1d7(_0x49f8cc,_0x22754e-0x36d);}const _0x33d148=new Set();await _0x3864af[_0x476f1f(0x173,0x185)]({'content':lang[_0x476f1f(0x199,0x1ad)][_0x476f1f(0x19f,0x18e)],'embeds':[createGameEmbed(_0x3864af[_0x476f1f(0x16e,0x17f)][_0x476f1f(0x187,0x17e)],_0x5b530a,_0x31e5ce,_0x8b216e)]});const _0x46205f=_0x449327=>_0x449327['author']['id']===_0x3864af[_0x476f1f(0x16e,0x17b)]['id'],_0x1368c9=_0x3864af[_0x476f1f(0x19e,0x1bf)]['createMessageCollector']({'filter':_0x46205f,'time':0xea60*0x5});_0x1368c9['on']('collect',async _0x4b24fd=>{function _0x2ba559(_0x47f3b8,_0xf7d205){return _0x476f1f(_0x47f3b8-0x245,_0xf7d205);}if(_0x4b24fd['content'][_0x2ba559(0x3b9,0x3c3)]===0x1&&/^[A-ZěščřžýáíéúůĚŠČŘŽÝÁÍÉÚŮ]$/i[_0x2ba559(0x3e6,0x3de)](_0x4b24fd['content'])){const _0xe757a1=_0x4b24fd[_0x2ba559(0x3dd,0x3ed)][_0x2ba559(0x3c0,0x3dd)]();if(!_0x33d148['has'](_0xe757a1)){_0x33d148['add'](_0xe757a1);let _0xfbbb74=![];for(let _0x430458=0x0;_0x430458<_0x1588a7[_0x2ba559(0x3b9,0x3b8)];_0x430458++){_0x1588a7[_0x430458]===_0xe757a1&&(_0x5b530a[_0x430458]=_0xe757a1,_0xfbbb74=!![]);}!_0xfbbb74&&_0x31e5ce++;if(!_0x5b530a[_0x2ba559(0x3c9,0x3eb)]('⬛'))await endGame(_0x3864af,lang['Hangman'][_0x2ba559(0x3d5,0x3c5)]['replace']('{username}',_0x3864af[_0x2ba559(0x3b3,0x3cc)][_0x2ba559(0x3cc,0x3d4)]),_0x5b530a),_0x1368c9[_0x2ba559(0x3cb,0x3c0)]();else _0x31e5ce>=_0x8b216e?(await endGame(_0x3864af,lang['Hangman'][_0x2ba559(0x3e9,0x3c8)][_0x2ba559(0x3eb,0x3f9)](_0x2ba559(0x3ca,0x3e7),_0x1588a7),_0x5b530a,!![]),_0x1368c9['stop']()):await _0x3864af[_0x2ba559(0x3ad,0x3c3)]({'content':lang[_0x2ba559(0x3de,0x3f5)]['continueMessage'],'embeds':[createGameEmbed(_0x3864af[_0x2ba559(0x3b3,0x3a3)][_0x2ba559(0x3cc,0x3c8)],_0x5b530a,_0x31e5ce,_0x8b216e)]});}global['hangmanMessageIDs']['add'](_0x4b24fd['id']),await _0x4b24fd['delete']()[_0x2ba559(0x3b1,0x3c7)](console[_0x2ba559(0x3ec,0x3db)]);}}),_0x1368c9['on'](_0x476f1f(0x1a0,0x1c0),_0x2efee1=>{function _0x475109(_0x4c566d,_0x540762){return _0x476f1f(_0x540762- -0x43d,_0x4c566d);}activeGames[_0x475109(-0x2b1,-0x2c6)](_0x3864af[_0x475109(-0x2bb,-0x2cf)]['id']);});}};function createGameEmbed(_0x55a641,_0x43f83a,_0x5d02ad,_0x39cd15){let _0x4b4e3c,_0x55d6b0='🟩',_0x1c4ed8=_0x39cd15-_0x5d02ad,_0x567874=''+_0x55d6b0[_0x5d7dff(0x18e,0x1ab)](_0x1c4ed8)+'🟥'[_0x5d7dff(0x1aa,0x1ab)](_0x5d02ad);function _0x5d7dff(_0x5e4b22,_0x2853c9){return _0x44b1d7(_0x5e4b22,_0x2853c9-0x38f);}if(_0x5d02ad/_0x39cd15<0.5)_0x4b4e3c=_0x5d7dff(0x1a7,0x1bc);else _0x5d02ad/_0x39cd15<0.75?_0x4b4e3c=_0x5d7dff(0x1a1,0x188):_0x4b4e3c='#ff0000';return new EmbedBuilder()[_0x5d7dff(0x18c,0x198)](_0x4b4e3c)[_0x5d7dff(0x1a3,0x189)](lang['Hangman'][_0x5d7dff(0x1ad,0x1a3)][_0x5d7dff(0x191,0x191)][_0x5d7dff(0x1e5,0x1c8)](_0x5d7dff(0x19e,0x1b9),_0x55a641))[_0x5d7dff(0x184,0x1a5)]({'name':lang[_0x5d7dff(0x1a2,0x1bb)][_0x5d7dff(0x194,0x1a3)][_0x5d7dff(0x18f,0x18f)],'value':'`'+_0x43f83a[_0x5d7dff(0x1a7,0x187)]('\x20')+'`','inline':!![]},{'name':lang[_0x5d7dff(0x1b2,0x1bb)][_0x5d7dff(0x185,0x1a3)][_0x5d7dff(0x19f,0x1bf)],'value':'`'+_0x1c4ed8+'/'+_0x39cd15+'`','inline':!![]},{'name':lang[_0x5d7dff(0x1b2,0x1bb)][_0x5d7dff(0x1c0,0x1a3)][_0x5d7dff(0x1b3,0x1bd)],'value':_0x567874,'inline':![]})[_0x5d7dff(0x1b5,0x1ad)](lang['Hangman'][_0x5d7dff(0x19d,0x1a3)]['useChatToGuess'])[_0x5d7dff(0x19b,0x1b8)]({'text':lang[_0x5d7dff(0x19a,0x1bb)][_0x5d7dff(0x1b4,0x1a3)]['guessFooter']});}async function endGame(_0x8a0a57,_0x3553c4,_0x2cc0e5,_0x737196=![]){const _0x28434f=new EmbedBuilder()[_0x4cde99(0x1c5,0x1c0)](_0x737196?_0x4cde99(0x1c0,0x1aa):_0x4cde99(0x1e9,0x1d6))['setTitle'](lang[_0x4cde99(0x1e8,0x1f5)]['embeds']['gameOverTitle'])[_0x4cde99(0x1da,0x1d4)](_0x3553c4)[_0x4cde99(0x1d2,0x1cb)]({'name':lang[_0x4cde99(0x1e8,0x1e3)][_0x4cde99(0x1d0,0x1e9)][_0x4cde99(0x1dc,0x1c1)],'value':'`'+_0x2cc0e5['join']('\x20')+'`'})['setFooter']({'text':lang['Hangman'][_0x4cde99(0x1d0,0x1d3)]['thanksForPlaying']});function _0x4cde99(_0x4ceed0,_0x254e32){return _0x44b1d7(_0x254e32,_0x4ceed0-0x3bc);}await _0x8a0a57[_0x4cde99(0x1b7,0x1d6)]({'content':lang[_0x4cde99(0x1e8,0x1ed)][_0x4cde99(0x1d0,0x1df)][_0x4cde99(0x1d7,0x1db)],'embeds':[_0x28434f],'components':[]})[_0x4cde99(0x1bb,0x19f)](console[_0x4cde99(0x1f6,0x1df)]),activeGames[_0x4cde99(0x1c6,0x1e7)](_0x8a0a57[_0x4cde99(0x1bd,0x1b3)]['id']);}