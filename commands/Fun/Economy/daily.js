function _0xf476(){const _0xeebadd=['reply','transactionLogs','#00FF00','Daily','Money','footer','13170CDnUwo','6724688hOoQdP','balance','411066kgdoHn','save','29ULlxWD','length','commandData','./config.yml','getUTCDate','Claim\x20your\x20daily\x20reward','Economy','floor','1113dpMWAE','dailyStreak','push','lastDaily','4325336czYQCb','utf8','#FF0000','setHours','baseAmount','increasePerDay','random','maxAmount','Messages','readFileSync','load','getTime','setDescription','cooldown','setColor','setName','setFooter','7580585aWsQpd','getUTCFullYear','getUTCMonth','discord.js','exports','80cbBAoh','./lang.yml','guild','user','257208BXwAVS','getHours','./Utility/helpers','setTitle','111742VhguIf','Actions','daily'];_0xf476=function(){return _0xeebadd;};return _0xf476();}function _0x4754(_0x4a9ea5,_0x80a054){const _0xf47614=_0xf476();return _0x4754=function(_0x475404,_0x203c06){_0x475404=_0x475404-0x114;let _0x111ec6=_0xf47614[_0x475404];return _0x111ec6;},_0x4754(_0x4a9ea5,_0x80a054);}(function(_0x2cfcf8,_0x2cf7cf){function _0x318248(_0x1d2fcf,_0x55a6d0){return _0x4754(_0x1d2fcf-0x223,_0x55a6d0);}const _0x2d03ab=_0x2cfcf8();while(!![]){try{const _0x3146fe=-parseInt(_0x318248(0x36a,0x361))/0x1*(-parseInt(_0x318248(0x35c,0x372))/0x2)+-parseInt(_0x318248(0x358,0x360))/0x3+-parseInt(_0x318248(0x366,0x351))/0x4+parseInt(_0x318248(0x34f,0x333))/0x5+-parseInt(_0x318248(0x365,0x380))/0x6*(parseInt(_0x318248(0x33a,0x334))/0x7)+-parseInt(_0x318248(0x33e,0x336))/0x8+parseInt(_0x318248(0x368,0x376))/0x9*(parseInt(_0x318248(0x354,0x355))/0xa);if(_0x3146fe===_0x2cf7cf)break;else _0x2d03ab['push'](_0x2d03ab['shift']());}catch(_0x2e686f){_0x2d03ab['push'](_0x2d03ab['shift']());}}}(_0xf476,0xce584));function _0x55b3a9(_0x9e254c,_0x3c0526){return _0x4754(_0x9e254c-0x23d,_0x3c0526);}const {SlashCommandBuilder,EmbedBuilder}=require(_0x55b3a9(0x36c,0x388)),User=require('../../../models/UserData'),fs=require('fs'),yaml=require('js-yaml'),config=yaml[_0x55b3a9(0x362,0x356)](fs[_0x55b3a9(0x361,0x350)](_0x55b3a9(0x387,0x38d),_0x55b3a9(0x359,0x35b))),lang=yaml['load'](fs[_0x55b3a9(0x361,0x37c)](_0x55b3a9(0x36f,0x383),_0x55b3a9(0x359,0x341))),{checkActiveBooster,replacePlaceholders}=require(_0x55b3a9(0x374,0x373));module[_0x55b3a9(0x36d,0x382)]={'data':new SlashCommandBuilder()[_0x55b3a9(0x367,0x34f)](_0x55b3a9(0x378,0x373))[_0x55b3a9(0x364,0x36a)](_0x55b3a9(0x351,0x368)),'category':'Economy',async 'execute'(_0x4c5f77){function _0x312ba9(_0x35d48e,_0x5c172f){return _0x55b3a9(_0x5c172f- -0xb,_0x35d48e);}try{let _0x5a0508=await User['findOne']({'userId':_0x4c5f77['user']['id'],'guildId':_0x4c5f77[_0x312ba9(0x36c,0x365)]['id']},{'balance':0x1,'commandData.lastDaily':0x1,'commandData.dailyStreak':0x1,'transactionLogs':0x1,'boosters':0x1});const _0x4c3d84=new Date();let _0xa1086e=config[_0x312ba9(0x354,0x347)][_0x312ba9(0x374,0x371)][_0x312ba9(0x34d,0x351)],_0x36c93c=0x1;if(_0x5a0508&&_0x5a0508[_0x312ba9(0x371,0x37b)][_0x312ba9(0x356,0x34c)]){const _0x42a798=new Date(_0x5a0508['commandData'][_0x312ba9(0x342,0x34c)]),_0x5227fd=_0x4c3d84[_0x312ba9(0x369,0x35f)]()===_0x42a798[_0x312ba9(0x36b,0x35f)]()&&_0x4c3d84[_0x312ba9(0x34c,0x360)]()===_0x42a798['getUTCMonth']()&&_0x4c3d84[_0x312ba9(0x378,0x37d)]()===_0x42a798[_0x312ba9(0x37e,0x37d)]();if(_0x5227fd){const _0x52d0ab=new Date(_0x42a798);_0x52d0ab[_0x312ba9(0x33e,0x350)](_0x52d0ab[_0x312ba9(0x384,0x368)]()+0x18);if(_0x4c3d84<_0x52d0ab){const _0x6217e1=new EmbedBuilder()[_0x312ba9(0x355,0x359)](replacePlaceholders(lang['Economy'][_0x312ba9(0x35e,0x355)][_0x312ba9(0x364,0x35a)],{'nextUse':Math[_0x312ba9(0x33e,0x348)](_0x52d0ab[_0x312ba9(0x34b,0x358)]()/0x3e8)}))['setColor'](_0x312ba9(0x359,0x34f))[_0x312ba9(0x36c,0x35d)]({'text':replacePlaceholders(lang['Economy']['Messages'][_0x312ba9(0x370,0x373)],{'balance':_0x5a0508['balance']})});return _0x4c5f77[_0x312ba9(0x374,0x36e)]({'embeds':[_0x6217e1]});}}else{const _0x162b11=_0x4c3d84[_0x312ba9(0x379,0x35f)]()===_0x42a798[_0x312ba9(0x35e,0x35f)]()&&_0x4c3d84[_0x312ba9(0x359,0x360)]()===_0x42a798[_0x312ba9(0x351,0x360)]()&&_0x4c3d84[_0x312ba9(0x397,0x37d)]()===_0x42a798[_0x312ba9(0x38c,0x37d)]()+0x1;_0x162b11?(_0x36c93c=(_0x5a0508[_0x312ba9(0x369,0x37b)][_0x312ba9(0x331,0x34a)]||0x1)+0x1,_0xa1086e=Math['min'](config[_0x312ba9(0x32d,0x347)][_0x312ba9(0x366,0x371)]['baseAmount']+_0x36c93c*config[_0x312ba9(0x357,0x347)][_0x312ba9(0x382,0x371)][_0x312ba9(0x35f,0x352)],config['Economy'][_0x312ba9(0x382,0x371)][_0x312ba9(0x33f,0x354)])):_0x36c93c=0x1;}}const _0x7f11ec=checkActiveBooster(_0x5a0508,_0x312ba9(0x383,0x372));_0xa1086e*=_0x7f11ec;!_0x5a0508?_0x5a0508=new User({'userId':_0x4c5f77[_0x312ba9(0x37f,0x366)]['id'],'guildId':_0x4c5f77['guild']['id'],'balance':_0xa1086e,'commandData':{'lastDaily':_0x4c3d84,'dailyStreak':_0x36c93c},'transactionLogs':[]}):(_0x5a0508[_0x312ba9(0x36e,0x376)]+=_0xa1086e,_0x5a0508[_0x312ba9(0x360,0x37b)][_0x312ba9(0x342,0x34c)]=_0x4c3d84,_0x5a0508[_0x312ba9(0x394,0x37b)][_0x312ba9(0x35d,0x34a)]=_0x36c93c);_0x5a0508[_0x312ba9(0x378,0x36f)][_0x312ba9(0x355,0x34b)]({'type':_0x312ba9(0x368,0x36d),'amount':_0xa1086e,'timestamp':_0x4c3d84}),await _0x5a0508[_0x312ba9(0x36b,0x378)]();const _0x4c0681={'user':'<@'+_0x4c5f77[_0x312ba9(0x362,0x366)]['id']+'>','balance':_0xa1086e,'streak':_0x36c93c},_0x1d2563=replacePlaceholders(lang[_0x312ba9(0x33d,0x347)][_0x312ba9(0x364,0x36c)][_0x312ba9(0x356,0x371)][_0x312ba9(0x36b,0x355)][Math[_0x312ba9(0x32c,0x348)](Math[_0x312ba9(0x35e,0x353)]()*lang['Economy']['Actions'][_0x312ba9(0x379,0x371)]['Messages'][_0x312ba9(0x365,0x37a)])],_0x4c0681),_0x4dafaa=new EmbedBuilder()[_0x312ba9(0x34d,0x359)](_0x1d2563)[_0x312ba9(0x36a,0x35d)]({'text':replacePlaceholders(lang[_0x312ba9(0x342,0x347)]['Messages'][_0x312ba9(0x362,0x373)],{'balance':_0x5a0508[_0x312ba9(0x37d,0x376)]})})[_0x312ba9(0x376,0x35b)](_0x312ba9(0x358,0x370)),_0x737803=lang[_0x312ba9(0x363,0x347)][_0x312ba9(0x386,0x36c)]['Daily']['Title'];return _0x737803&&_0x4dafaa[_0x312ba9(0x352,0x36a)](_0x737803),_0x4c5f77[_0x312ba9(0x35b,0x36e)]({'embeds':[_0x4dafaa]});}catch(_0x28f2ef){console['error']('Error\x20in\x20daily\x20command:\x20',_0x28f2ef),_0x4c5f77[_0x312ba9(0x363,0x36e)]({'content':lang[_0x312ba9(0x337,0x347)][_0x312ba9(0x349,0x355)]['error'],'ephemeral':!![]});}}};