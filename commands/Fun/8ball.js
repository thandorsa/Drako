function _0x333603(_0x3a90bd,_0x27dc82){return _0x397f(_0x3a90bd- -0xaa,_0x27dc82);}(function(_0x32bfbf,_0x268032){const _0x13e43d=_0x32bfbf();function _0x1f1abd(_0x478d79,_0x399feb){return _0x397f(_0x399feb- -0x312,_0x478d79);}while(!![]){try{const _0x183602=parseInt(_0x1f1abd(-0x25e,-0x247))/0x1+-parseInt(_0x1f1abd(-0x256,-0x23e))/0x2*(parseInt(_0x1f1abd(-0x22c,-0x228))/0x3)+parseInt(_0x1f1abd(-0x24c,-0x244))/0x4*(parseInt(_0x1f1abd(-0x24e,-0x237))/0x5)+-parseInt(_0x1f1abd(-0x227,-0x23d))/0x6+-parseInt(_0x1f1abd(-0x262,-0x256))/0x7*(parseInt(_0x1f1abd(-0x220,-0x236))/0x8)+-parseInt(_0x1f1abd(-0x222,-0x229))/0x9*(-parseInt(_0x1f1abd(-0x243,-0x234))/0xa)+parseInt(_0x1f1abd(-0x24f,-0x255))/0xb*(parseInt(_0x1f1abd(-0x248,-0x24e))/0xc);if(_0x183602===_0x268032)break;else _0x13e43d['push'](_0x13e43d['shift']());}catch(_0x7ad003){_0x13e43d['push'](_0x13e43d['shift']());}}}(_0x4160,0x3f5a6));function _0x397f(_0x59c538,_0x2bee6c){const _0x4160b6=_0x4160();return _0x397f=function(_0x397f1b,_0x5adb4e){_0x397f1b=_0x397f1b-0xb7;let _0x4eb36b=_0x4160b6[_0x397f1b];return _0x4eb36b;},_0x397f(_0x59c538,_0x2bee6c);}function _0x4160(){const _0x1c5751=['2111157PSulVK','570999fHEagC','floor','reply','EightBallReplies','setDescription','Message','addStringOption','7RCmsRd','11glACob','./lang.yml','question','Question','EmbedColors','8ball','load','5134812NrYBve','Patterns','Magic\x20Ball','addFields','test','Answer','BlacklistWords','258925WIzoVF','discord.js','exports','336mWgxno','readFileSync','setFooter','error','Fun','setTimestamp','2EtcpWB','2407356dfMGIK','The\x20question\x20to\x20ask\x20the\x20bot','js-yaml','Ask\x20the\x20bot\x20a\x20question','Sorry,\x20there\x20was\x20an\x20error\x20processing\x20your\x20question.','Error\x20in\x208ball\x20command:\x20','23165rFDAQo','3676144VWMbqg','setName','10LBTrrv','avatarURL','getString','setTitle','options','some','replace','random','🔮\x208Ball','utf8','length'];_0x4160=function(){return _0x1c5751;};return _0x4160();}const {SlashCommandBuilder,EmbedBuilder}=require(_0x333603(0x22,0x1b)),fs=require('fs'),yaml=require(_0x333603(0x2d,0x30)),config=yaml[_0x333603(0x19,0x29)](fs[_0x333603(0x25,0x16)]('./config.yml',_0x333603(0x3d,0x2d))),lang=yaml[_0x333603(0x19,0x25)](fs[_0x333603(0x25,0x3a)](_0x333603(0x14,0x20),_0x333603(0x3d,0x45)));function convertSimplePatternToRegex(_0x126060){function _0x353342(_0x43bbf9,_0x3f1130){return _0x333603(_0x3f1130-0x2b4,_0x43bbf9);}let _0x2362db=_0x126060['replace'](/\./g,'\x5c.')[_0x353342(0x305,0x2ee)](/\*/g,'.*');return new RegExp('^'+_0x2362db+'$','i');}async function checkBlacklistWords(_0x23a755){const _0x11aeaa=config[_0x4b3422(0x311,0x31c)][_0x4b3422(0x30c,0x320)]['map'](_0x3cba69=>convertSimplePatternToRegex(_0x3cba69));function _0x4b3422(_0x11d71e,_0x1cd0fc){return _0x333603(_0x11d71e-0x2f1,_0x1cd0fc);}return _0x11aeaa[_0x4b3422(0x32a,0x340)](_0x55d5dd=>_0x55d5dd[_0x4b3422(0x30f,0x301)](_0x23a755));}module[_0x333603(0x23,0x11)]={'data':new SlashCommandBuilder()[_0x333603(0x33,0x18)](_0x333603(0x18,0x21))[_0x333603(0xf,0x14)](_0x333603(0x2e,0x17))[_0x333603(0x11,0x1a)](_0x12abd5=>_0x12abd5[_0x333603(0x33,0x40)](_0x333603(0x15,-0x2))[_0x333603(0xf,0xd)](_0x333603(0x2c,0x1b))['setRequired'](!![])),'category':_0x333603(0x28,0x19),async 'execute'(_0x16bf20,_0x1867dc){function _0x8cb052(_0xa38192,_0x1a28c6){return _0x333603(_0xa38192-0x1eb,_0x1a28c6);}try{let _0x5c213e=_0x16bf20[_0x8cb052(0x223,0x222)][_0x8cb052(0x221,0x209)](_0x8cb052(0x200,0x207));if(await checkBlacklistWords(_0x5c213e)){const _0x4438d6=lang['BlacklistWords']&&lang['BlacklistWords'][_0x8cb052(0x1fb,0x214)]?lang[_0x8cb052(0x20b,0x20e)][_0x8cb052(0x1fb,0x1fd)][_0x8cb052(0x225,0x227)](/{user}/g,''+_0x16bf20['user']):'Your\x20question\x20contains\x20blacklisted\x20words.';return _0x16bf20['reply']({'content':_0x4438d6,'ephemeral':!![]});}let _0x1935e5=lang[_0x8cb052(0x1f9,0x1f6)],_0x228620=Math[_0x8cb052(0x22c,0x226)](Math[_0x8cb052(0x226,0x225)]()*_0x1935e5[_0x8cb052(0x229,0x242)]),_0x32b547=new EmbedBuilder()['setColor'](config[_0x8cb052(0x202,0x1ee)])[_0x8cb052(0x222,0x20c)](_0x8cb052(0x227,0x230))[_0x8cb052(0x208,0x219)]([{'name':_0x8cb052(0x201,0x1e8),'value':_0x5c213e},{'name':_0x8cb052(0x20a,0x204),'value':_0x1935e5[_0x228620]}])[_0x8cb052(0x211,0x200)]({'text':_0x8cb052(0x207,0x207),'iconURL':_0x16bf20['user'][_0x8cb052(0x220,0x213)]()})[_0x8cb052(0x214,0x209)]();_0x16bf20[_0x8cb052(0x1f8,0x1ed)]({'embeds':[_0x32b547]});}catch(_0x4e4276){console[_0x8cb052(0x212,0x220)](_0x8cb052(0x21b,0x20b),_0x4e4276),_0x16bf20[_0x8cb052(0x1f8,0x1ff)]({'content':_0x8cb052(0x21a,0x228),'ephemeral':!![]});}}};