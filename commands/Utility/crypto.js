(function(_0x5d6656,_0x37f4e6){const _0x3f0873=_0x5d6656();function _0x11ddf1(_0x33a290,_0x35fd0d){return _0x1d79(_0x35fd0d- -0x7a,_0x33a290);}while(!![]){try{const _0x4a7c8a=parseInt(_0x11ddf1(0xb4,0xcd))/0x1+parseInt(_0x11ddf1(0xfc,0xf0))/0x2+parseInt(_0x11ddf1(0x56,0x7d))/0x3*(parseInt(_0x11ddf1(0x108,0xc9))/0x4)+-parseInt(_0x11ddf1(0xb9,0xef))/0x5+-parseInt(_0x11ddf1(0xad,0x82))/0x6*(-parseInt(_0x11ddf1(0xce,0xe0))/0x7)+parseInt(_0x11ddf1(0xaf,0xab))/0x8*(parseInt(_0x11ddf1(0x9f,0xdf))/0x9)+-parseInt(_0x11ddf1(0x123,0xf4))/0xa;if(_0x4a7c8a===_0x37f4e6)break;else _0x3f0873['push'](_0x3f0873['shift']());}catch(_0x29d0b4){_0x3f0873['push'](_0x3f0873['shift']());}}}(_0x3d89,0xbcfa5));const {SlashCommandBuilder,EmbedBuilder,ActionRowBuilder,ButtonBuilder,ButtonStyle,PermissionsBitField}=require(_0x4bfe76(-0x1e2,-0x1eb)),axios=require(_0x4bfe76(-0x1b7,-0x183)),yaml=require(_0x4bfe76(-0x216,-0x23e));function _0x4bfe76(_0x3e34bf,_0x450dd2){return _0x1d79(_0x3e34bf- -0x31a,_0x450dd2);}const fs=require('fs'),Transaction=require('../../models/Transction'),lang=yaml[_0x4bfe76(-0x1ca,-0x1c3)](fs[_0x4bfe76(-0x221,-0x211)]('./lang.yml',_0x4bfe76(-0x1c7,-0x195))),config=yaml['load'](fs[_0x4bfe76(-0x221,-0x1f0)](_0x4bfe76(-0x1c4,-0x1fd),'utf8'));function _0x3d89(){const _0x363f2f=['Dogecoin','save','show_qr_code','Bitcoin','{seller}','USD','Product\x20or\x20service\x20description','setName','Style','user','https://cryptologos.cc/logos/usd-coin-usdc-logo.png','some','Cardano','has','https://cryptologos.cc/logos/polkadot-dot-logo.png','Color','USD\x20Coin','price','https://cryptologos.cc/logos/litecoin-ltc-logo.png','Embed','{client}','1731792PldXFk','{coinType_Full}','exports','LTC','Title','addStringOption','Description','join','USDC','DOT','Invalid\x20button\x20style:\x20','BNB','Enter\x20a\x20custom\x20wallet\x20address','{currencySymbol}','Name','Utility','MATIC','BTC','{currencyAmount}','discord.js','setTitle','cache','addChoices','crypto','PASTE','SHIB','charAt','get','error','permissions','10632IAqXag','product','{walletAddress}','https://api.coinbase.com/v2/exchange-rates?currency=','419858rRUUBL','AVAX','ModerationRoles','TRX','LINK','https://cryptologos.cc/logos/dogecoin-doge-logo.png','Unsupported\x20currency\x20symbol.','Litecoin','SOL','load','Error\x20fetching\x20conversion\x20rates:','predefined_wallet','utf8','DOGE','Wallets','././config.yml','addComponents','{qrCode}','9tVjhfy','238FEWiUl','EUR','ETH','Type','XRP','Link','coin','https://cryptologos.cc/logos/solana-sol-logo.png','{coinType}','axios','substring','https://cryptologos.cc/logos/cardano-ada-logo.png','options','getString','https://cryptologos.cc/logos/tether-usdt-logo.png','3539375CFepTB','892730PDOjzP','custom_wallet','Tether','There\x20was\x20an\x20error\x20fetching\x20the\x20conversion\x20rates.\x20Please\x20try\x20again\x20later.','20935470sWZvnG','Solana','setLabel','Administrator','map','https://api.qrserver.com/v1/create-qr-code/?data=','Avalanche','Crypto','get_wallet_address','1122WLTwWc','https://cryptologos.cc/logos/shiba-inu-shib-logo.png','readFileSync','https://cryptologos.cc/logos/ethereum-eth-logo.png','Emoji','264474SQIOSS','Cryptocurrency\x20type\x20(e.g.,\x20BTC,\x20ETH)','setDescription','reply','Footer','Thumbnail','setRequired','Text','js-yaml','Binance\x20Coin','USDT','You\x20must\x20provide\x20either\x20a\x20predefined\x20or\x20custom\x20wallet\x20address.','Buttons','replace','https://cryptologos.cc/logos/avalanche-avax-logo.png','Select\x20a\x20predefined\x20wallet\x20address','https://cryptologos.cc/logos/binance-coin-bnb-logo.png','Client\x20user','&size=150x150','setURL'];_0x3d89=function(){return _0x363f2f;};return _0x3d89();}function _0x1d79(_0x30fc94,_0xa58f69){const _0x3d8921=_0x3d89();return _0x1d79=function(_0x1d79d8,_0x754b8f){_0x1d79d8=_0x1d79d8-0xf1;let _0x117bed=_0x3d8921[_0x1d79d8];return _0x117bed;},_0x1d79(_0x30fc94,_0xa58f69);}module[_0x4bfe76(-0x1f3,-0x1e4)]={'data':new SlashCommandBuilder()[_0x4bfe76(-0x203,-0x230)](_0x4bfe76(-0x1de,-0x1fe))['setDescription']('Generate\x20a\x20crypto\x20payment\x20embed')['addStringOption'](_0x1a8c99=>_0x1a8c99[_0x4bfe76(-0x203,-0x20d)](_0x4bfe76(-0x201,-0x205))['setDescription'](_0x4bfe76(-0x20d,-0x1f8))[_0x4bfe76(-0x218,-0x20d)](!![]))[_0x4bfe76(-0x1f0,-0x1d1)](_0x1e3eb8=>_0x1e3eb8['setName'](_0x4bfe76(-0x1ba,-0x1ef))['setDescription'](_0x4bfe76(-0x21d,-0x22a))['setRequired'](!![]))['addStringOption'](_0x422be7=>_0x422be7['setName'](_0x4bfe76(-0x1f9,-0x1e9))[_0x4bfe76(-0x21c,-0x22f)]('Price\x20in\x20currency\x20format\x20(e.g.,\x20$5.99,\x20£2.56,\x20€4.2)')[_0x4bfe76(-0x218,-0x20c)](!![]))['addStringOption'](_0x43bcca=>_0x43bcca[_0x4bfe76(-0x203,-0x201)]('predefined_wallet')[_0x4bfe76(-0x21c,-0x1e1)](_0x4bfe76(-0x20f,-0x217))['setRequired'](![])[_0x4bfe76(-0x1df,-0x1c6)]({'name':_0x4bfe76(-0x1e4,-0x1f3),'value':_0x4bfe76(-0x1e4,-0x1c8)},{'name':_0x4bfe76(-0x1f2,-0x1c6),'value':_0x4bfe76(-0x1f2,-0x20f)},{'name':_0x4bfe76(-0x1be,-0x183),'value':_0x4bfe76(-0x1be,-0x1f5)},{'name':_0x4bfe76(-0x214,-0x221),'value':'USDT'},{'name':_0x4bfe76(-0x1ea,-0x215),'value':_0x4bfe76(-0x1ea,-0x1b4)},{'name':_0x4bfe76(-0x1ed,-0x1bf),'value':'USDC'},{'name':_0x4bfe76(-0x1bc,-0x1c3),'value':_0x4bfe76(-0x1bc,-0x180)},{'name':'DOGE','value':_0x4bfe76(-0x1c6,-0x1ec)},{'name':_0x4bfe76(-0x1cb,-0x1a5),'value':_0x4bfe76(-0x1cb,-0x203)},{'name':_0x4bfe76(-0x1ec,-0x203),'value':_0x4bfe76(-0x1ec,-0x1e3)},{'name':_0x4bfe76(-0x1d0,-0x206),'value':_0x4bfe76(-0x1d0,-0x1f9)},{'name':'MATIC','value':_0x4bfe76(-0x1e5,-0x1e1)},{'name':_0x4bfe76(-0x1dc,-0x1cf),'value':_0x4bfe76(-0x1dc,-0x1c0)},{'name':_0x4bfe76(-0x1d2,-0x203),'value':_0x4bfe76(-0x1d2,-0x1a8)}))['addStringOption'](_0x59a26a=>_0x59a26a[_0x4bfe76(-0x203,-0x222)](_0x4bfe76(-0x1af,-0x1c2))[_0x4bfe76(-0x21c,-0x23c)](_0x4bfe76(-0x1e9,-0x1ad))['setRequired'](![]))[_0x4bfe76(-0x1f0,-0x20a)](_0xdd79b7=>_0xdd79b7[_0x4bfe76(-0x203,-0x1fb)](_0x4bfe76(-0x1d6,-0x1c3))[_0x4bfe76(-0x21c,-0x1fa)](_0x4bfe76(-0x204,-0x240))[_0x4bfe76(-0x218,-0x245)](![])),'category':_0x4bfe76(-0x1e6,-0x1dd),async 'execute'(_0xfb4874){const _0x36d7e4=config[_0x355b30(0x487,0x4a5)][_0x355b30(0x4b2,0x498)],_0x1d7f6b=_0x36d7e4[_0x355b30(0x47d,0x477)](_0x52623a=>_0xfb4874['member']['roles'][_0x355b30(0x4bb,0x496)]['has'](_0x52623a)),_0x530baa=_0xfb4874['member'][_0x355b30(0x4d8,0x49e)][_0x355b30(0x44d,0x479)](PermissionsBitField['Flags'][_0x355b30(0x465,0x44d)]);function _0x355b30(_0xb52109,_0x1a6792){return _0x4bfe76(_0x1a6792-0x676,_0xb52109);}if(!_0x1d7f6b&&!_0x530baa)return _0xfb4874[_0x355b30(0x45f,0x45b)]({'content':lang['NoPermsMessage'],'ephemeral':!![]});const _0xd21a1a=_0xfb4874[_0x355b30(0x495,0x4c2)]['getString'](_0x355b30(0x452,0x475)),_0x1dee59=_0xfb4874['options'][_0x355b30(0x4c8,0x4c3)]('coin'),_0x5ae995=_0xfb4874[_0x355b30(0x4be,0x4c2)]['getString'](_0x355b30(0x46c,0x47d)),_0x4aac93=_0xfb4874[_0x355b30(0x496,0x4c2)]['getString'](_0x355b30(0x4ab,0x4ae)),_0x284b19=_0xfb4874[_0x355b30(0x4be,0x4c2)]['getString']('custom_wallet'),_0x2f11ec=_0xfb4874[_0x355b30(0x4c6,0x4c2)][_0x355b30(0x4d6,0x4c3)]('product')||'N/A',_0x473384=_0x5ae995[_0x355b30(0x4d9,0x49b)](0x0),_0x4420ca=parseFloat(_0x5ae995[_0x355b30(0x4e1,0x4c0)](0x1));let _0x169e7e;if(_0x473384==='$')_0x169e7e=_0x355b30(0x4a0,0x471);else{if(_0x473384==='£')_0x169e7e='GBP';else{if(_0x473384==='€')_0x169e7e=_0x355b30(0x48b,0x4b7);else return _0xfb4874[_0x355b30(0x479,0x45b)]({'content':_0x355b30(0x4b4,0x4a9),'ephemeral':!![]});}}let _0x5c59bf;if(_0x4aac93)_0x5c59bf=lang[_0x355b30(0x475,0x4b1)][_0x4aac93];else{if(_0x284b19)_0x5c59bf=_0x284b19;else return _0xfb4874['reply']({'content':_0x355b30(0x47e,0x463),'ephemeral':!![]});}try{const _0x55d23d=await axios[_0x355b30(0x4bb,0x49c)](_0x355b30(0x462,0x4a2)+_0x1dee59),_0x561f7c=_0x55d23d['data']['data']['rates'],_0x2dedee=parseFloat(_0x561f7c[_0x169e7e]),_0x1a4ee9=(_0x4420ca/_0x2dedee)['toFixed'](0x8),_0x5db667={'BTC':_0x355b30(0x432,0x46f),'ETH':'Ethereum','USDT':_0x355b30(0x4db,0x4c8),'BNB':_0x355b30(0x47f,0x461),'USDC':_0x355b30(0x445,0x47c),'XRP':_0x355b30(0x48c,0x4ba),'ADA':_0x355b30(0x447,0x478),'DOGE':_0x355b30(0x4a3,0x46c),'SOL':_0x355b30(0x4f8,0x4cb),'DOT':'Polkadot','TRX':'TRON','MATIC':'Polygon','LTC':_0x355b30(0x4c6,0x4aa),'SHIB':'Shiba\x20Inu','AVAX':_0x355b30(0x458,0x450)},_0x2eba0e=_0x5db667[_0x1dee59]||_0x1dee59,_0x1172d0={'BTC':'https://cryptologos.cc/logos/bitcoin-btc-logo.png','ETH':_0x355b30(0x481,0x456),'USDT':_0x355b30(0x4ab,0x4c4),'BNB':_0x355b30(0x455,0x468),'USDC':_0x355b30(0x499,0x476),'XRP':'https://cryptologos.cc/logos/xrp-xrp-logo.png','ADA':_0x355b30(0x4a6,0x4c1),'DOGE':_0x355b30(0x4df,0x4a8),'SOL':_0x355b30(0x4ca,0x4bd),'DOT':_0x355b30(0x479,0x47a),'TRX':'https://cryptologos.cc/logos/tron-trx-logo.png','MATIC':'https://cryptologos.cc/logos/polygon-matic-logo.png','LTC':_0x355b30(0x45a,0x47e),'SHIB':_0x355b30(0x481,0x454),'AVAX':_0x355b30(0x49a,0x466)},_0x13e3e8=_0x1172d0[_0x1dee59]||'',_0xaed258=_0x355b30(0x43e,0x44f)+encodeURIComponent(_0x5c59bf)+_0x355b30(0x462,0x46a),_0x47622d=lang[_0x355b30(0x43a,0x451)]['Embed'][_0x355b30(0x43a,0x45d)]===_0x355b30(0x49a,0x4b4)?_0xaed258:_0x13e3e8,_0x5cbca1=new EmbedBuilder()[_0x355b30(0x4a8,0x495)](lang[_0x355b30(0x414,0x451)]['Embed'][_0x355b30(0x492,0x485)][_0x355b30(0x46c,0x465)](_0x355b30(0x4ce,0x4be),_0x1dee59)['replace'](_0x355b30(0x4a4,0x482),_0x2eba0e))[_0x355b30(0x428,0x45a)](lang[_0x355b30(0x447,0x451)]['Embed'][_0x355b30(0x459,0x487)][_0x355b30(0x491,0x488)]('\x0a')[_0x355b30(0x44a,0x465)](_0x355b30(0x467,0x470),_0xfb4874['user']['username'])['replace'](_0x355b30(0x451,0x480),_0xd21a1a)[_0x355b30(0x44d,0x465)]('{service}',_0x2f11ec)[_0x355b30(0x443,0x465)](_0x355b30(0x472,0x4a1),_0x5c59bf)[_0x355b30(0x4a2,0x465)]('{cryptoAmount}',_0x1a4ee9)['replace'](_0x355b30(0x498,0x48e),_0x473384)['replace'](_0x355b30(0x480,0x493),_0x4420ca))['setFooter']({'text':lang[_0x355b30(0x444,0x451)]['Embed'][_0x355b30(0x446,0x45c)][_0x355b30(0x430,0x45f)],'iconURL':lang[_0x355b30(0x43a,0x451)][_0x355b30(0x49c,0x47f)][_0x355b30(0x44b,0x45c)]['Icon']})['setColor'](lang['Crypto']['Embed'][_0x355b30(0x4af,0x47b)])['setThumbnail'](_0x47622d),_0x1b7fa1=lang[_0x355b30(0x480,0x451)]['Embed'][_0x355b30(0x489,0x464)][_0x355b30(0x445,0x44e)](_0x3f362d=>{const _0x810ed3=ButtonStyle[_0x3f362d[_0x30987f(0x1e,0x36)]];function _0x30987f(_0x3d8c8a,_0x8a935a){return _0x355b30(_0x8a935a,_0x3d8c8a- -0x456);}if(!_0x810ed3)throw new Error(_0x30987f(0x35,0x71)+_0x3f362d[_0x30987f(0x1e,0x5)]);const _0x5d4b3b=new ButtonBuilder()[_0x30987f(0x76,0x98)](_0x3f362d[_0x30987f(0x39,0x17)])['setEmoji'](_0x3f362d[_0x30987f(0x1,0x41)])['setStyle'](_0x810ed3);if(_0x3f362d[_0x30987f(0x63,0x4f)]===_0x30987f(0x51,0x1c))_0x5d4b3b[_0x30987f(0x15,0x4d)](_0x3f362d[_0x30987f(0x65,0x87)]);else{if(_0x3f362d[_0x30987f(0x63,0x6f)]===_0x30987f(0x43,0x65))_0x5d4b3b['setCustomId'](_0x30987f(-0x4,-0x12));else _0x3f362d[_0x30987f(0x63,0x23)]==='QR'&&_0x5d4b3b['setCustomId'](_0x30987f(0x18,0x14));}return _0x5d4b3b;}),_0x64714c=new ActionRowBuilder()[_0x355b30(0x4db,0x4b3)](_0x1b7fa1);await _0xfb4874[_0x355b30(0x440,0x45b)]({'embeds':[_0x5cbca1],'components':[_0x64714c],'ephemeral':![]});const _0x222822=new Transaction({'interactionId':_0xfb4874['id'],'userId':_0xfb4874['user']['id'],'address':_0x5c59bf,'qrCodeURL':_0xaed258});await _0x222822[_0x355b30(0x454,0x46d)]();}catch(_0x3ad0fb){console[_0x355b30(0x4d0,0x49d)](_0x355b30(0x4e1,0x4ad),_0x3ad0fb),await _0xfb4874[_0x355b30(0x474,0x45b)]({'content':_0x355b30(0x4cd,0x4c9),'ephemeral':!![]});}}};