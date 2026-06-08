import { useState, useCallback } from "react";

const VOCAB = [
  {id:1,word:"見る",reading:"みる",meaning:"見る・読む・会う"},
  {id:2,word:"見す",reading:"みす",meaning:"見せる・見させる（使役）"},
  {id:3,word:"見ゆ",reading:"みゆ",meaning:"見える・思われる・会う"},
  {id:4,word:"かいまみる",reading:"かいまみる",meaning:"垣間見る・こっそり見る"},
  {id:5,word:"よばふ",reading:"よばふ",meaning:"呼ぶ・求婚する"},
  {id:6,word:"好く",reading:"すく",meaning:"好む・風流を好む"},
  {id:7,word:"わたる",reading:"わたる",meaning:"渡る・通う・一面に広がる"},
  {id:8,word:"ありく",reading:"ありく",meaning:"歩き回る・動き回る"},
  {id:9,word:"おこなふ",reading:"おこなふ",meaning:"行う・仏道修行する"},
  {id:10,word:"なやむ",reading:"なやむ",meaning:"病気になる・悩む・苦しむ"},
  {id:11,word:"おこたる",reading:"おこたる",meaning:"怠る・病気が回復する"},
  {id:12,word:"おくる",reading:"おくる",meaning:"見送る・遅れる・死に遅れる"},
  {id:13,word:"ながむ",reading:"ながむ",meaning:"物思いにふける・眺める"},
  {id:14,word:"ときめく",reading:"ときめく",meaning:"時勢に乗って栄える・寵愛される"},
  {id:15,word:"かしづく",reading:"かしづく",meaning:"大切に育てる・世話をする"},
  {id:16,word:"めづ",reading:"めづ",meaning:"愛する・賞賛する・感動する"},
  {id:17,word:"おどろく",reading:"おどろく",meaning:"目が覚める・気づく・驚く"},
  {id:18,word:"こうず",reading:"こうず",meaning:"疲れ果てる・困り果てる"},
  {id:19,word:"おぼゆ",reading:"おぼゆ",meaning:"思われる・似る・自然に覚える"},
  {id:20,word:"聞こゆ",reading:"きこゆ",meaning:"聞こえる・申し上げる（謙譲）"},
  {id:21,word:"まもる",reading:"まもる",meaning:"じっと見つめる・見守る"},
  {id:22,word:"たのむ",reading:"たのむ",meaning:"頼みにする・頼みにさせる"},
  {id:23,word:"かづく",reading:"かづく",meaning:"潜る・（褒美を）もらう・かぶる"},
  {id:24,word:"ののしる",reading:"ののしる",meaning:"大声で騒ぐ・評判になる・罵る"},
  {id:25,word:"やる",reading:"やる",meaning:"行かせる・送る・（気持ちを）晴らす"},
  {id:26,word:"いらふ",reading:"いらふ",meaning:"返事をする・答える"},
  {id:27,word:"あきらむ",reading:"あきらむ",meaning:"明らかにする・諦める"},
  {id:28,word:"にほふ",reading:"にほふ",meaning:"美しく輝く・香る・映える"},
  {id:29,word:"ねんず",reading:"ねんず",meaning:"じっと念じる・こらえる"},
  {id:30,word:"まうく",reading:"まうく",meaning:"準備する・設ける"},
  {id:31,word:"ゐる",reading:"ゐる",meaning:"座る・（ある場所に）いる"},
  {id:32,word:"具す",reading:"ぐす",meaning:"連れて行く・備わる・連れる"},
  {id:33,word:"経",reading:"ふ",meaning:"年月が経つ・過ごす"},
  {id:34,word:"さる",reading:"さる",meaning:"去る・立派な・そのような"},
  {id:35,word:"ものす",reading:"ものす",meaning:"いる・行く・来る・する（万能動詞）"},
  {id:36,word:"ならふ",reading:"ならふ",meaning:"慣れる・習う・倣う"},
  {id:37,word:"しのぶ",reading:"しのぶ",meaning:"こらえる・忍ぶ・隠れる・慕う"},
  {id:38,word:"わぶ",reading:"わぶ",meaning:"つらいと思う・嘆く・困る"},
  {id:39,word:"をかし",reading:"をかし",meaning:"趣がある・おもしろい・かわいい"},
  {id:40,word:"よろし",reading:"よろし",meaning:"まあよい・悪くない・普通だ"},
  {id:41,word:"ありがたし",reading:"ありがたし",meaning:"めったにない・珍しい・難しい"},
  {id:42,word:"つきづきし",reading:"つきづきし",meaning:"似つかわしい・ふさわしい"},
  {id:43,word:"なまめかし",reading:"なまめかし",meaning:"上品で優雅だ・しとやかだ・若々しい"},
  {id:44,word:"めでたし",reading:"めでたし",meaning:"すばらしい・立派だ・おめでたい"},
  {id:45,word:"うるはし",reading:"うるはし",meaning:"美しい・端正だ・仲がよい"},
  {id:46,word:"やむごとなし",reading:"やむごとなし",meaning:"高貴だ・大切だ・やめられない"},
  {id:47,word:"おとなし",reading:"おとなし",meaning:"大人びている・思慮深い・落ち着いている"},
  {id:48,word:"ゆかし",reading:"ゆかし",meaning:"見たい・知りたい・聞きたい（慕わしい）"},
  {id:49,word:"なつかし",reading:"なつかし",meaning:"親しみやすい・慕わしい"},
  {id:50,word:"はづかし",reading:"はづかし",meaning:"恥ずかしい・こちらが恥ずかしくなるほど立派だ"},
  {id:51,word:"こころにくし",reading:"こころにくし",meaning:"奥ゆかしい・なんとなく心惹かれる"},
  {id:52,word:"うつくし",reading:"うつくし",meaning:"かわいい・愛らしい"},
  {id:53,word:"かなし",reading:"かなし",meaning:"悲しい・かわいい・愛しい"},
  {id:54,word:"らうたし",reading:"らうたし",meaning:"かわいい・いとおしい"},
  {id:55,word:"めやすし",reading:"めやすし",meaning:"見た目がよい・見苦しくない"},
  {id:56,word:"あやし",reading:"あやし",meaning:"不思議だ・身分が低い・みすぼらしい"},
  {id:57,word:"さうざうし",reading:"さうざうし",meaning:"物足りない・寂しい"},
  {id:58,word:"つれなし",reading:"つれなし",meaning:"冷淡だ・平然としている・変化がない"},
  {id:59,word:"なめし",reading:"なめし",meaning:"無礼だ・失礼だ"},
  {id:60,word:"おどろおどろし",reading:"おどろおどろし",meaning:"気味が悪い・おおげさだ"},
  {id:61,word:"うし",reading:"うし",meaning:"つらい・憂鬱だ"},
  {id:62,word:"むつかし",reading:"むつかし",meaning:"不快だ・気味が悪い・わずらわしい"},
  {id:63,word:"すさまじ",reading:"すさまじ",meaning:"興ざめだ・殺風景だ・ひどい"},
  {id:64,word:"びんなし",reading:"びんなし",meaning:"具合が悪い・気の毒だ・不都合だ"},
  {id:65,word:"いとほし",reading:"いとほし",meaning:"かわいそうだ・気の毒だ・かわいい"},
  {id:66,word:"いはけなし",reading:"いはけなし",meaning:"幼い・幼稚だ"},
  {id:67,word:"つらし",reading:"つらし",meaning:"つれない・冷たい・つらい"},
  {id:68,word:"ところせし",reading:"ところせし",meaning:"窮屈だ・大げさだ・場所をとる"},
  {id:69,word:"うしろめたし",reading:"うしろめたし",meaning:"気がかりだ・心配だ・後ろめたい"},
  {id:70,word:"かたはらいたし",reading:"かたはらいたし",meaning:"見ていられない・気の毒だ・恥ずかしい"},
  {id:71,word:"わりなし",reading:"わりなし",meaning:"道理に合わない・無理だ・とても"},
  {id:72,word:"本意なし",reading:"ほいなし",meaning:"不本意だ・残念だ"},
  {id:73,word:"あさまし",reading:"あさまし",meaning:"意外だ・あきれる・情けない"},
  {id:74,word:"めざまし",reading:"めざまし",meaning:"目が覚めるほどすばらしい・しゃくに障る"},
  {id:75,word:"いみじ",reading:"いみじ",meaning:"はなはだしい・すばらしい・ひどい"},
  {id:76,word:"ゆゆし",reading:"ゆゆし",meaning:"不吉だ・程度がひどい・おそれ多い"},
  {id:77,word:"やさし",reading:"やさし",meaning:"優雅だ・恥ずかしい・肩身が狭い"},
  {id:78,word:"しるし",reading:"しるし",meaning:"はっきりしている・明らかだ・効き目がある"},
  {id:79,word:"とし",reading:"とし",meaning:"鋭い・速い"},
  {id:80,word:"ゆくりなし",reading:"ゆくりなし",meaning:"突然だ・思いがけない"},
  {id:81,word:"おぼつかなし",reading:"おぼつかなし",meaning:"はっきりしない・気がかりだ・見えない"},
  {id:82,word:"こころもとなし",reading:"こころもとなし",meaning:"気がかりだ・待ち遠しい・もどかしい"},
  {id:83,word:"あはれなり",reading:"あはれなり",meaning:"しみじみと趣深い・かわいそうだ・感動的だ"},
  {id:84,word:"つれづれなり",reading:"つれづれなり",meaning:"退屈だ・することがない・物思いにふける"},
  {id:85,word:"すずろなり",reading:"すずろなり",meaning:"なんとなく・そうでもないのに・むやみに"},
  {id:86,word:"まめなり",reading:"まめなり",meaning:"誠実だ・実用的だ・まじめだ"},
  {id:87,word:"あだなり",reading:"あだなり",meaning:"浮気だ・むなしい・はかない"},
  {id:88,word:"いたづらなり",reading:"いたづらなり",meaning:"むなしい・無駄だ・することがない"},
  {id:89,word:"いうなり",reading:"いうなり",meaning:"優れている・上品だ"},
  {id:90,word:"あてなり",reading:"あてなり",meaning:"上品だ・高貴だ"},
  {id:91,word:"あからさまなり",reading:"あからさまなり",meaning:"ちょっとの間・一時的だ・突然だ"},
  {id:92,word:"みそかなり",reading:"みそかなり",meaning:"ひそかだ・内緒だ"},
  {id:93,word:"おろかなり",reading:"おろかなり",meaning:"おろかだ・いい加減だ・言いつくせない"},
  {id:94,word:"をこなり",reading:"をこなり",meaning:"ばかだ・愚かだ"},
  {id:95,word:"むげなり",reading:"むげなり",meaning:"まったくひどい・問題外だ"},
  {id:96,word:"なかなかなり",reading:"なかなかなり",meaning:"かえって・なまじっか・中途半端だ"},
  {id:97,word:"手",reading:"て",meaning:"文字・手紙・手筆"},
  {id:98,word:"文・書",reading:"ふみ",meaning:"手紙・漢籍・書物"},
  {id:99,word:"消息",reading:"せうそこ",meaning:"手紙・伝言・便り"},
  {id:100,word:"あそび",reading:"あそび",meaning:"管弦の遊び・音楽・詩歌の宴"},
  {id:101,word:"うへ",reading:"うへ",meaning:"天皇・主上・上の方"},
  {id:102,word:"おほやけ",reading:"おほやけ",meaning:"朝廷・公・公的なこと"},
  {id:103,word:"うち",reading:"うち",meaning:"宮中・帝・内裏"},
  {id:104,word:"御前",reading:"おまへ",meaning:"貴人の前・天皇"},
  {id:105,word:"みゆき",reading:"みゆき",meaning:"天皇のお出かけ・行幸"},
  {id:106,word:"たより",reading:"たより",meaning:"便り・機会・頼るもの"},
  {id:107,word:"物語",reading:"ものがたり",meaning:"話・語り合い・物語（作品）"},
  {id:108,word:"ためし",reading:"ためし",meaning:"例・先例・前例"},
  {id:109,word:"いそぎ",reading:"いそぎ",meaning:"急ぎ・急いで準備すること"},
  {id:110,word:"用意",reading:"ようい",meaning:"準備・心配り・配慮"},
  {id:111,word:"かたち",reading:"かたち",meaning:"容貌・顔・形"},
  {id:112,word:"かげ",reading:"かげ",meaning:"光・姿・影"},
  {id:113,word:"けしき",reading:"けしき",meaning:"様子・気配・気色"},
  {id:114,word:"こころざし",reading:"こころざし",meaning:"気持ち・愛情・志"},
  {id:115,word:"ほい",reading:"ほい",meaning:"本来の希望・本意・目的"},
  {id:116,word:"こと",reading:"こと",meaning:"事柄・言葉・特別なこと"},
  {id:117,word:"わざ",reading:"わざ",meaning:"行為・仕業・技"},
  {id:118,word:"よろづ",reading:"よろづ",meaning:"万・すべて・様々"},
  {id:119,word:"ことわり",reading:"ことわり",meaning:"道理・当然・理由"},
  {id:120,word:"ひがこと",reading:"ひがこと",meaning:"まちがい・誤り"},
  {id:121,word:"そらごと",reading:"そらごと",meaning:"嘘・作り話"},
  {id:122,word:"しるし",reading:"しるし",meaning:"効果・証拠・印"},
  {id:123,word:"料",reading:"れう",meaning:"～のため・代金・料金"},
  {id:124,word:"ろく",reading:"ろく",meaning:"禄・褒美・給与"},
  {id:125,word:"としごろ",reading:"としごろ",meaning:"数年の間・長年"},
  {id:126,word:"つとめて",reading:"つとめて",meaning:"早朝・翌朝"},
  {id:127,word:"世・世の中",reading:"よ",meaning:"世間・社会・男女の仲"},
  {id:128,word:"いかで",reading:"いかで",meaning:"なんとかして・どうして（疑問・反語）"},
  {id:129,word:"いかが",reading:"いかが",meaning:"どのように・どうして（疑問・反語）"},
  {id:130,word:"など",reading:"など",meaning:"なぜ・どうして"},
  {id:131,word:"いつしか",reading:"いつしか",meaning:"早く～してほしい・いつの間にか"},
  {id:132,word:"おのづから",reading:"おのづから",meaning:"自然に・偶然に・もしかしたら"},
  {id:133,word:"なほ",reading:"なほ",meaning:"やはり・さらに・まっすぐに"},
  {id:134,word:"いとど",reading:"いとど",meaning:"ますます・いっそう"},
  {id:135,word:"げに",reading:"げに",meaning:"なるほど・本当に"},
  {id:136,word:"かく",reading:"かく",meaning:"このように"},
  {id:137,word:"さ",reading:"さ",meaning:"そのように"},
  {id:138,word:"しか",reading:"しか",meaning:"そのように・そう"},
  {id:139,word:"やがて",reading:"やがて",meaning:"すぐに・そのまま・そのうちに"},
  {id:140,word:"すなはち",reading:"すなはち",meaning:"すぐに・その場で・すなわち"},
  {id:141,word:"やうやう",reading:"やうやう",meaning:"だんだんと・しだいに"},
  {id:142,word:"やをら",reading:"やをら",meaning:"そっと・静かに"},
  {id:143,word:"なかなか",reading:"なかなか",meaning:"かえって・なまじっか"},
  {id:144,word:"さすがに",reading:"さすがに",meaning:"そうはいっても・やはり"},
  {id:145,word:"かたみに",reading:"かたみに",meaning:"互いに"},
  {id:146,word:"うたて",reading:"うたて",meaning:"いやに・情けなく・ひどく"},
  {id:147,word:"なべて",reading:"なべて",meaning:"一般に・すべて・普通"},
  {id:148,word:"わざと",reading:"わざと",meaning:"特に・故意に・わざわざ"},
  {id:149,word:"あまた",reading:"あまた",meaning:"たくさん・多く"},
  {id:150,word:"ここら",reading:"ここら",meaning:"たくさん・多く"},
  {id:151,word:"え（打消）",reading:"え",meaning:"（打消を伴って）～できない"},
  {id:152,word:"な～そ",reading:"な～そ",meaning:"～するな（禁止）"},
  {id:153,word:"おほかた（打消）",reading:"おほかた",meaning:"（打消を伴って）まったく～ない"},
  {id:154,word:"さらに（打消）",reading:"さらに",meaning:"（打消を伴って）まったく～ない"},
  {id:155,word:"世に（打消）",reading:"よに",meaning:"（打消を伴って）まったく～ない"},
  {id:156,word:"たえて（打消）",reading:"たえて",meaning:"（打消を伴って）まったく～ない"},
  {id:157,word:"つゆ（打消）",reading:"つゆ",meaning:"（打消を伴って）まったく～ない"},
  {id:158,word:"ゆめ（打消）",reading:"ゆめ",meaning:"（打消を伴って）決して～するな"},
  {id:159,word:"つやつや（打消）",reading:"つやつや",meaning:"（打消を伴って）まったく～ない"},
  {id:160,word:"をさをさ（打消）",reading:"をさをさ",meaning:"（打消を伴って）めったに～ない"},
  {id:161,word:"よも（打消推量）",reading:"よも",meaning:"（打消推量を伴って）まさか～ないだろう"},
  {id:162,word:"あなかしこ（禁止）",reading:"あなかしこ",meaning:"（禁止を伴って）決して～するな"},
  {id:163,word:"ためらふ",reading:"ためらふ",meaning:"気持ちを落ち着ける・ためらう"},
  {id:164,word:"やすらふ",reading:"やすらふ",meaning:"ためらう・立ち止まる・休む"},
  {id:165,word:"かたらふ",reading:"かたらふ",meaning:"語り合う・仲間にする・誘う"},
  {id:166,word:"住む",reading:"すむ",meaning:"澄む・住む"},
  {id:167,word:"やむ",reading:"やむ",meaning:"やめる・病気が治る・死ぬ"},
  {id:168,word:"うつろふ",reading:"うつろふ",meaning:"（色が）褪せる・移り変わる"},
  {id:169,word:"みいだす",reading:"みいだす",meaning:"外を眺める・見出す"},
  {id:170,word:"もてなす",reading:"もてなす",meaning:"扱う・振る舞う・もてなす"},
  {id:171,word:"あつかふ",reading:"あつかふ",meaning:"世話をする・取り扱う"},
  {id:172,word:"あくがる",reading:"あくがる",meaning:"さまよい歩く・魂が体から離れる・恋い慕う"},
  {id:173,word:"あふ",reading:"あふ",meaning:"（涙などが）溢れる・会う"},
  {id:174,word:"しほたる",reading:"しほたる",meaning:"涙で濡れる・しっとり濡れる"},
  {id:175,word:"かきくらす",reading:"かきくらす",meaning:"（心が）暗くなる・空が暗くなる"},
  {id:176,word:"まどふ",reading:"まどふ",meaning:"迷う・うろたえる・乱れる"},
  {id:177,word:"たばかる",reading:"たばかる",meaning:"はかりごとをする・だます・工夫する"},
  {id:178,word:"すさぶ",reading:"すさぶ",meaning:"（心の）ままにする・慰む・荒れる"},
  {id:179,word:"すまふ",reading:"すまふ",meaning:"抵抗する・相撲をとる"},
  {id:180,word:"まねぶ",reading:"まねぶ",meaning:"まねる・そのまま伝える"},
  {id:181,word:"ねぶ",reading:"ねぶ",meaning:"眠い・ねむる"},
  {id:182,word:"おきつ",reading:"おきつ",meaning:"起きている・眠れない"},
  {id:183,word:"うれふ",reading:"うれふ",meaning:"嘆く・悲しむ・心配する"},
  {id:184,word:"むすぶ",reading:"むすぶ",meaning:"結ぶ・（手で水を）すくう"},
  {id:185,word:"とぶらふ",reading:"とぶらふ",meaning:"訪ねる・見舞う・弔う"},
  {id:186,word:"やつす",reading:"やつす",meaning:"みすぼらしくする・質素にする・出家する"},
  {id:187,word:"さはる",reading:"さはる",meaning:"障害になる・差し支える・邪魔になる"},
  {id:188,word:"かしこまる",reading:"かしこまる",meaning:"恐れ多いと思う・謹む・正座する"},
  {id:189,word:"かこつ",reading:"かこつ",meaning:"不満を言う・かこつける・なすりつける"},
  {id:190,word:"わく",reading:"わく",meaning:"区別する・分ける"},
  {id:191,word:"つつむ",reading:"つつむ",meaning:"遠慮する・包む・隠す"},
  {id:192,word:"あらまほし",reading:"あらまほし",meaning:"理想的だ・そうあってほしい"},
  {id:193,word:"らうらうじ",reading:"らうらうじ",meaning:"洗練されている・ぬかりない"},
  {id:194,word:"うるせし",reading:"うるせし",meaning:"賢い・優れている・うるさい"},
  {id:195,word:"はかばかし",reading:"はかばかし",meaning:"しっかりしている・十分だ"},
  {id:196,word:"をさをさし",reading:"をさをさし",meaning:"しっかりしている・きちんとしている"},
  {id:197,word:"さうなし",reading:"さうなし",meaning:"比べるものがない・ずば抜けている"},
  {id:198,word:"くまなし",reading:"くまなし",meaning:"隈なく・すみずみまで明るい・欠点がない"},
  {id:199,word:"ずちなし",reading:"ずちなし",meaning:"どうしようもない・仕方がない"},
  {id:200,word:"まさなし",reading:"まさなし",meaning:"よくない・不都合だ"},
  {id:201,word:"あいなし",reading:"あいなし",meaning:"つまらない・わけが分からない・気に入らない"},
  {id:202,word:"はかなし",reading:"はかなし",meaning:"はかない・たよりない・あっけない"},
  {id:203,word:"こころづきなし",reading:"こころづきなし",meaning:"気に入らない・不快だ"},
  {id:204,word:"あへなし",reading:"あへなし",meaning:"あっけない・頼りない"},
  {id:205,word:"よしなし",reading:"よしなし",meaning:"理由もない・つまらない・どうしようもない"},
  {id:206,word:"おほけなし",reading:"おほけなし",meaning:"身のほど知らずだ・おこがましい"},
  {id:207,word:"さがなし",reading:"さがなし",meaning:"意地悪だ・口が悪い・いたずらだ"},
  {id:208,word:"はしたなし",reading:"はしたなし",meaning:"中途半端だ・きまりが悪い・みっともない"},
  {id:209,word:"しどけなし",reading:"しどけなし",meaning:"だらしない・しまりがない"},
  {id:210,word:"いぎたなし",reading:"いぎたなし",meaning:"ひどく寝る・眠り過ぎる"},
  {id:211,word:"ひとわろし",reading:"ひとわろし",meaning:"他人が見て具合が悪い・みっともない"},
  {id:212,word:"いぶせし",reading:"いぶせし",meaning:"気がふさぐ・気分がよくない・うっとうしい"},
  {id:213,word:"くちをし",reading:"くちをし",meaning:"残念だ・情けない"},
  {id:214,word:"あたらし",reading:"あたらし",meaning:"惜しい・もったいない"},
  {id:215,word:"ねたし",reading:"ねたし",meaning:"ねたましい・くやしい"},
  {id:216,word:"こちたし",reading:"こちたし",meaning:"大げさだ・はなはだしい"},
  {id:217,word:"けし",reading:"けし",meaning:"変だ・普通でない"},
  {id:218,word:"わびし",reading:"わびし",meaning:"つらい・みすぼらしい・さびしい"},
  {id:219,word:"こころぐるし",reading:"こころぐるし",meaning:"気の毒だ・心が痛む"},
  {id:220,word:"まだし",reading:"まだし",meaning:"まだ早い・未熟だ・まだだ"},
  {id:221,word:"さかし",reading:"さかし",meaning:"賢い・しっかりしている"},
  {id:222,word:"まばゆし",reading:"まばゆし",meaning:"まぶしい・きらびやかで見ていられない"},
  {id:223,word:"かたじけなし",reading:"かたじけなし",meaning:"もったいない・恐れ多い・ありがたい"},
  {id:224,word:"かしこし",reading:"かしこし",meaning:"恐れ多い・賢い・すばらしい"},
  {id:225,word:"しげし",reading:"しげし",meaning:"多い・生い茂る・頻繁だ"},
  {id:226,word:"すごし",reading:"すごし",meaning:"ぞっとする・薄気味悪い・荒涼としている"},
  {id:227,word:"いたし",reading:"いたし",meaning:"程度がひどい・とても・痛い"},
  {id:228,word:"おぼろけなり",reading:"おぼろけなり",meaning:"並大抵だ・普通だ（打消で）並大抵ではない"},
  {id:229,word:"なのめなり",reading:"なのめなり",meaning:"いい加減だ・普通だ"},
  {id:230,word:"清らなり",reading:"きよらなり",meaning:"清らかに美しい・美しく輝いている"},
  {id:231,word:"まほなり",reading:"まほなり",meaning:"申し分ない・理想的だ"},
  {id:232,word:"あらはなり",reading:"あらはなり",meaning:"明らかだ・あからさまだ・丸見えだ"},
  {id:233,word:"あながちなり",reading:"あながちなり",meaning:"一方的だ・強引だ・むやみだ"},
  {id:234,word:"せちなり",reading:"せちなり",meaning:"切実だ・ひたすらだ・格別だ"},
  {id:235,word:"とみなり",reading:"とみなり",meaning:"突然だ・急だ"},
  {id:236,word:"うちつけなり",reading:"うちつけなり",meaning:"突然だ・だしぬけだ・軽率だ"},
  {id:237,word:"さらなり",reading:"さらなり",meaning:"言うまでもない・もちろんだ"},
  {id:238,word:"ねんごろなり",reading:"ねんごろなり",meaning:"親切だ・丁寧だ・親しい"},
  {id:239,word:"おいらかなり",reading:"おいらかなり",meaning:"おとなしい・穏やかだ"},
  {id:240,word:"あやにくなり",reading:"あやにくなり",meaning:"意地悪だ・あいにくだ"},
  {id:241,word:"おぼえ",reading:"おぼえ",meaning:"評判・信望・寵愛"},
  {id:242,word:"ひま",reading:"ひま",meaning:"隙間・暇・機会"},
  {id:243,word:"いとま",reading:"いとま",meaning:"暇・休み・別れ"},
  {id:244,word:"才",reading:"ざえ",meaning:"学問・才能・漢学の素養"},
  {id:245,word:"よろこび",reading:"よろこび",meaning:"お礼・任官の礼"},
  {id:246,word:"こころばへ",reading:"こころばへ",meaning:"気持ち・心遣い・性格"},
  {id:247,word:"こころづくし",reading:"こころづくし",meaning:"心を尽くすこと・悲しみ・物思い"},
  {id:248,word:"せうと",reading:"せうと",meaning:"兄弟・特に兄"},
  {id:249,word:"おとうと",reading:"おとうと",meaning:"弟・妹（年下のきょうだい）"},
  {id:250,word:"いも",reading:"いも",meaning:"妹・妻・恋人（女性）"},
  {id:251,word:"つま",reading:"つま",meaning:"妻・夫・端"},
  {id:252,word:"はらから",reading:"はらから",meaning:"同じ母から生まれた兄弟姉妹・きょうだい"},
  {id:253,word:"かたへ",reading:"かたへ",meaning:"仲間・傍ら・かたわら"},
  {id:254,word:"ほど",reading:"ほど",meaning:"程度・身分・距離・時間"},
  {id:255,word:"かぎり",reading:"かぎり",meaning:"限り・最後・すべて"},
  {id:256,word:"きは",reading:"きは",meaning:"際・境・身分"},
  {id:257,word:"ついで",reading:"ついで",meaning:"機会・ついでに・順序"},
  {id:258,word:"沙汰",reading:"さた",meaning:"指図・評判・行為"},
  {id:259,word:"とが",reading:"とが",meaning:"罪・過ち・欠点"},
  {id:260,word:"け",reading:"け",meaning:"（異常な）気配・霊気"},
  {id:261,word:"よし",reading:"よし",meaning:"理由・方法・手段・由緒"},
  {id:262,word:"やう",reading:"やう",meaning:"様子・方法・理由"},
  {id:263,word:"ちぎり",reading:"ちぎり",meaning:"約束・縁・宿縁"},
  {id:264,word:"ほだし",reading:"ほだし",meaning:"行動を縛るもの・妨げるもの"},
  {id:265,word:"あやめ",reading:"あやめ",meaning:"物事の道理・区別・筋道"},
  {id:266,word:"うつつ",reading:"うつつ",meaning:"現実・意識・正気"},
  {id:267,word:"あるじ",reading:"あるじ",meaning:"主人・食事のもてなし"},
  {id:268,word:"ふるさと",reading:"ふるさと",meaning:"古い都・故郷・旧宅"},
  {id:269,word:"さて",reading:"さて",meaning:"さて・そのまま・そうして"},
  {id:270,word:"さながら",reading:"さながら",meaning:"そのまま・全部・すっかり"},
  {id:271,word:"いま",reading:"いま",meaning:"今・もう少しで・現在"},
  {id:272,word:"せめて",reading:"せめて",meaning:"せめて・強いて・特に"},
  {id:273,word:"むべ",reading:"むべ",meaning:"なるほど・もっともなことだ"},
  {id:274,word:"かつ",reading:"かつ",meaning:"一方では・同時に"},
  {id:275,word:"ひねもす",reading:"ひねもす",meaning:"一日中"},
  {id:276,word:"かまへて（打消）",reading:"かまへて",meaning:"（打消を伴って）決して～するな"},
  {id:277,word:"あへて（打消）",reading:"あへて",meaning:"（打消を伴って）まったく～ない"},
  {id:278,word:"かけて（打消）",reading:"かけて",meaning:"（打消を伴って）少しも～ない"},
  {id:279,word:"さだめて（推量）",reading:"さだめて",meaning:"（推量を伴って）きっと～だろう"},
  {id:280,word:"のたまふ",reading:"のたまふ",meaning:"おっしゃる（尊敬語）"},
  {id:281,word:"仰す",reading:"おほす",meaning:"おっしゃる（尊敬語・最高敬語）"},
  {id:282,word:"聞こゆ（謙譲）",reading:"きこゆ",meaning:"申し上げる（謙譲語）"},
  {id:283,word:"申す",reading:"まうす",meaning:"申し上げる（謙譲語）"},
  {id:284,word:"奏す",reading:"そうす",meaning:"（天皇・上皇に）申し上げる（謙譲語）"},
  {id:285,word:"啓す",reading:"けいす",meaning:"（皇后・皇太子に）申し上げる（謙譲語）"},
  {id:286,word:"承る",reading:"うけたまはる",meaning:"お聞きする・謹んで聞く（謙譲語）"},
  {id:287,word:"給ふ",reading:"たまふ",meaning:"なさる（尊敬）・差し上げる（謙譲）"},
  {id:288,word:"たまはす",reading:"たまはす",meaning:"なさる（尊敬語・強意）"},
  {id:289,word:"たまはる",reading:"たまはる",meaning:"いただく（謙譲語）"},
  {id:290,word:"召す",reading:"めす",meaning:"お召しになる・呼び寄せる（尊敬語）"},
  {id:291,word:"思す",reading:"おぼす",meaning:"お思いになる（尊敬語）"},
  {id:292,word:"おほとのごもる",reading:"おほとのごもる",meaning:"お休みになる（尊敬語）"},
  {id:293,word:"さぶらふ",reading:"さぶらふ",meaning:"お仕えする・おります（謙譲・丁寧）"},
  {id:294,word:"はべり",reading:"はべり",meaning:"おります・ございます（丁寧語）"},
  {id:295,word:"奉る",reading:"たてまつる",meaning:"差し上げる・～申し上げる（謙譲語）"},
  {id:296,word:"参らす",reading:"まゐらす",meaning:"差し上げる（謙譲語）"},
  {id:297,word:"まゐる",reading:"まゐる",meaning:"参上する・差し上げる（謙譲語）"},
  {id:298,word:"まかる",reading:"まかる",meaning:"退出する・（貴所から）出る（謙譲語）"},
  {id:299,word:"あそばす",reading:"あそばす",meaning:"なさる（尊敬語）"},
  {id:300,word:"つかうまつる",reading:"つかうまつる",meaning:"お仕えする・～申し上げる（謙譲語）"},
  {id:301,word:"聞こし召す",reading:"きこしめす",meaning:"お聞きになる・召し上がる（尊敬語）"},
  {id:302,word:"しろしめす",reading:"しろしめす",meaning:"ご存知である・お治めになる（尊敬語）"},
  {id:303,word:"おはす",reading:"おはす",meaning:"いらっしゃる・おいでになる（尊敬語）"},
  {id:304,word:"います",reading:"います",meaning:"いらっしゃる（尊敬語）"},
  {id:305,word:"御覧ず",reading:"ごらんず",meaning:"ご覧になる（尊敬語）"},
  // 慣用句の章 316〜380
  {id:316,word:"あかず",reading:"あかず",meaning:"飽きない・名残惜しい・満足できない"},
  {id:317,word:"あからめもせず",reading:"あからめもせず",meaning:"よそ見もしない・じっと見つめる"},
  {id:318,word:"あなかま",reading:"あなかま",meaning:"ああ、やかましい・しずかにせよ"},
  {id:319,word:"あらぬ",reading:"あらぬ",meaning:"関係のない・意外な・別の"},
  {id:320,word:"ありありて",reading:"ありありて",meaning:"日が経って・月日が過ぎて"},
  {id:321,word:"ありし",reading:"ありし",meaning:"以前の・かつての・生前の"},
  {id:322,word:"ありつる",reading:"ありつる",meaning:"さっきの・先ほどの"},
  {id:323,word:"あれかにもあらず",reading:"あれかにもあらず",meaning:"我を忘れたように・茫然自失で"},
  {id:324,word:"いかがはせむ",reading:"いかがはせむ",meaning:"どうしようもない・仕方がない"},
  {id:325,word:"いさ～知らず",reading:"いさしらず",meaning:"さあ（どうか）わからない"},
  {id:326,word:"いざ（させ）給へ",reading:"いざさせたまへ",meaning:"さあ（いらっしゃい）・さあおいでください"},
  {id:327,word:"いちのひと",reading:"いちのひと",meaning:"最高位の人・摂政・関白・太政大臣"},
  {id:328,word:"いとしもなし",reading:"いとしもなし",meaning:"たいして（～ない）・それほど（～ない）"},
  {id:329,word:"いはむかたなし",reading:"いはむかたなし",meaning:"何とも言いようがない・言葉にならない"},
  {id:330,word:"いふかひなし",reading:"いふかひなし",meaning:"言っても仕方がない・どうにもならない"},
  {id:331,word:"（と）いふもおろかなり",reading:"といふもおろかなり",meaning:"（と）言っても言い足りないほどだ"},
  {id:332,word:"いふもさらなり",reading:"いふもさらなり",meaning:"言うまでもない・もちろんだ"},
  {id:333,word:"色に出づ",reading:"いろにいづ",meaning:"顔色や態度に表れる"},
  {id:334,word:"寝を寝",reading:"いをね",meaning:"眠りを眠る・ぐっすり眠る"},
  {id:335,word:"えならず",reading:"えならず",meaning:"何とも言えないほど（すばらしい）"},
  {id:336,word:"音に聞く",reading:"おとにきく",meaning:"評判に聞く・名高い"},
  {id:337,word:"数ならず",reading:"かずならず",meaning:"取るに足りない・一人前でない"},
  {id:338,word:"くるしからず",reading:"くるしからず",meaning:"かまわない・差し支えない"},
  {id:339,word:"けしきばかり",reading:"けしきばかり",meaning:"それとなく・わずかに・ほんの少し"},
  {id:340,word:"見参に入る",reading:"げざんにいる",meaning:"お目にかかる・拝謁する"},
  {id:341,word:"こころあり・なさけあり",reading:"こころあり",meaning:"思いやりがある・風流を解する"},
  {id:342,word:"心置く",reading:"こころおく",meaning:"遠慮する・気を使う・気がかりに思う"},
  {id:343,word:"心の闇",reading:"こころのやみ",meaning:"子を思う親の迷い・愛情による判断の曇り"},
  {id:344,word:"こころ（を）やる",reading:"こころをやる",meaning:"気を晴らす・慰める・思いをはせる"},
  {id:345,word:"こころゆく",reading:"こころゆく",meaning:"心が満足する・十分に楽しむ"},
  {id:346,word:"させる",reading:"させる",meaning:"（打消を伴って）たいした～ない・これといった～ない"},
  {id:347,word:"さはれ・さばれ",reading:"さはれ",meaning:"ええい、どうにでもなれ・なるようになれ"},
  {id:348,word:"さらでだに",reading:"さらでだに",meaning:"そうでなくてさえ・そうでないときでも"},
  {id:349,word:"さらぬ",reading:"さらぬ",meaning:"そうでない・避けられない（さらぬ別れ＝死の別れ）"},
  {id:350,word:"さるべき",reading:"さるべき",meaning:"然るべき・それにふさわしい・前世からの因縁の"},
  {id:351,word:"さるべきにや（ありけむ）",reading:"さるべきにやありけむ",meaning:"前世からの宿縁だったのだろうか"},
  {id:352,word:"さるものにて",reading:"さるものにて",meaning:"そういうものとして・もちろんのこととして"},
  {id:353,word:"さればよ",reading:"さればよ",meaning:"やっぱりそうだ・それだからだよ"},
  {id:354,word:"せきあへず",reading:"せきあへず",meaning:"こらえきれない・押しとどめられない"},
  {id:355,word:"そのこととなく",reading:"そのこととなく",meaning:"これといって特別なことなく・何ということなく"},
  {id:356,word:"そばめにかく",reading:"そばめにかく",meaning:"横目で見る・流し目に見る"},
  {id:357,word:"ただならずなる",reading:"ただならずなる",meaning:"懐妊する・妊娠する"},
  {id:358,word:"力なし",reading:"ちからなし",meaning:"どうしようもない・仕方がない・無力だ"},
  {id:359,word:"ときしもあれ",reading:"ときしもあれ",meaning:"よりによってこんな時に・折も折"},
  {id:360,word:"ときにあふ",reading:"ときにあふ",meaning:"時流に乗る・時勢に合う・寵愛される"},
  {id:361,word:"ところう",reading:"ところう",meaning:"場所が狭い・窮屈だ"},
  {id:362,word:"とばかり",reading:"とばかり",meaning:"とだけ・それとなく・ちょっと"},
  {id:363,word:"なでふ",reading:"なでふ",meaning:"何というわけで・どうして・なんの"},
  {id:364,word:"名に（し）負ふ",reading:"なにしおふ",meaning:"名として持つ・名高い・～として知られる"},
  {id:365,word:"何（に）か（は）せむ",reading:"なににかはせむ",meaning:"何の役に立つのか・無駄だ"},
  {id:366,word:"音を泣く",reading:"ねをなく",meaning:"声を上げて泣く・大声で泣く"},
  {id:367,word:"～のがり",reading:"のがり",meaning:"～のところへ・～のもとへ"},
  {id:368,word:"～ばこそあらめ",reading:"ばこそあらめ",meaning:"～ならともかく・～ならいざ知らず"},
  {id:369,word:"人となる",reading:"ひととなる",meaning:"成長する・一人前になる・立派になる"},
  {id:370,word:"ひとやりならず",reading:"ひとやりならず",meaning:"人のせいではない・自分のせいだ・自業自得だ"},
  {id:371,word:"またの",reading:"またの",meaning:"次の・翌～・別の"},
  {id:372,word:"～ままに",reading:"ままに",meaning:"～するにつれて・～のとおりに・思いのままに"},
  {id:373,word:"昔の人",reading:"むかしのひと",meaning:"昔の恋人・亡き人・かつて関係のあった人"},
  {id:374,word:"目もあやなり",reading:"めもあやなり",meaning:"目もくらむほど美しい・まばゆいばかりだ"},
  {id:375,word:"～やおそきと",reading:"やおそきと",meaning:"～するや否や・すぐに・待ちかねたように"},
  {id:376,word:"やらん",reading:"やらん",meaning:"どこへやら・どうやら・（行方が）わからない"},
  {id:377,word:"やるかたなし",reading:"やるかたなし",meaning:"晴らしようがない・やりきれない・気持ちの持っていきどころがない"},
  {id:378,word:"世にあり",reading:"よにあり",meaning:"世に生きている・生存している"},
  {id:379,word:"例ならず",reading:"れいならず",meaning:"いつもと違う・病気だ・普通でない"},
  {id:380,word:"例の",reading:"れいの",meaning:"いつものように・例によって"},
];

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function generateTest(rangeStart, rangeEnd, count, type) {
  const pool = VOCAB.filter(v => v.id >= rangeStart && v.id <= rangeEnd);
  const selected = shuffle(pool).slice(0, Math.min(count, pool.length));
  return selected.map((v, i) => {
    const wrongs = shuffle(VOCAB.filter(c => c.id !== v.id)).slice(0, 3);
    const allChoices = shuffle([v, ...wrongs]);
    const correctIndex = allChoices.findIndex(c => c.id === v.id);
    return {
      num: i + 1, id: v.id, word: v.word,
      question: type === "古→現" ? v.word : v.meaning,
      choices: allChoices.map(c => type === "古→現" ? c.meaning : c.word),
      correctIndex, correctNum: correctIndex + 1,
      answer: type === "古→現" ? v.meaning : v.word,
      type,
    };
  });
}

function genQuestions(rs, re, qcount, type) {
  if (type === "古→現") return generateTest(rs, re, qcount, "古→現");
  if (type === "現→古") return generateTest(rs, re, qcount, "現→古");
  const half = Math.floor(qcount / 2);
  const a = generateTest(rs, re, half, "古→現");
  const usedIds = new Set(a.map(q => q.id));
  const bPool = VOCAB.filter(v => v.id >= rs && v.id <= re && !usedIds.has(v.id));
  const bSel = shuffle(bPool).slice(0, qcount - half);
  const b = bSel.map((v) => {
    const wrongs = shuffle(VOCAB.filter(c => c.id !== v.id)).slice(0, 3);
    const allChoices = shuffle([v, ...wrongs]);
    const correctIndex = allChoices.findIndex(c => c.id === v.id);
    return { id: v.id, word: v.word, question: v.meaning, choices: allChoices.map(c => c.word), correctIndex, correctNum: correctIndex + 1, answer: v.word, type: "現→古" };
  });
  return shuffle([...a, ...b]).map((q, i) => ({ ...q, num: i + 1 }));
}

function printTest(questions, title) {
  const w = window.open("", "_blank");
  w.document.write(`<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="UTF-8">
<title>${title}</title>
<style>
  body { font-family: 'Hiragino Mincho ProN','Yu Mincho',serif; font-size: 10pt; color: #000; margin: 0; }
  @page { size: A4; margin: 15mm 18mm; }
  .page { width: 100%; page-break-after: always; }
  .page:last-child { page-break-after: auto; }
  h1 { text-align: center; font-size: 14pt; margin-bottom: 4mm; }
  .meta { display: flex; justify-content: space-between; font-size: 9pt; margin-bottom: 2mm; }
  hr { border: none; border-top: 1px solid #000; margin-bottom: 3mm; }
  .hint { font-size: 8pt; margin-bottom: 4mm; }
  .q { margin-bottom: 4mm; }
  .qline { display: flex; align-items: flex-start; gap: 3mm; font-size: 10pt; margin-bottom: 1.5mm; }
  .qnum { font-weight: bold; min-width: 11mm; }
  .qtext { flex: 1; }
  .box { border: 1px solid #333; width: 7mm; height: 5mm; display: inline-block; flex-shrink: 0; margin-left: auto; }
  .choices { display: grid; grid-template-columns: 1fr 1fr; gap: 0.5mm 8mm; padding-left: 14mm; font-size: 9pt; }
  /* 解答欄ページ */
  .ans-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 2.5mm; margin-top: 4mm; }
  .ans-cell { border: 0.5px solid #bbb; padding: 2mm 2.5mm; font-size: 8.5pt; }
  .ans-top { font-weight: bold; font-size: 9pt; }
  .ans-cor { color: #8b0000; }
  .ans-word { font-size: 7.5pt; color: #555; }
  .ans-mean { font-size: 8pt; border-top: 1px dashed #ccc; padding-top: 1mm; margin-top: 1mm; line-height: 1.4; }
</style>
</head>
<body>
<div class="page">
  <h1>${title}</h1>
  <hr>
  <div class="meta">
    <span>名前：＿＿＿＿＿＿＿＿＿＿</span>
    <span>組：＿＿　番：＿＿　点：＿＿／${questions.length}</span>
  </div>
  <div class="hint">※各問について最も適当なものを1〜4の中から一つ選び、解答欄に番号を記入しなさい。</div>
  ${questions.map(q => `
  <div class="q">
    <div class="qline">
      <span class="qnum">問${q.num}</span>
      <span class="qtext">「${q.question}」${q.type === "古→現" ? "の現代語訳として正しいものを選べ。" : "を古文で書いたものを選べ。"}</span>
      <span class="box"></span>
    </div>
    <div class="choices">
      ${q.choices.map((c, j) => `<div>${j + 1}.　${c}</div>`).join("")}
    </div>
  </div>`).join("")}
</div>

<div class="page">
  <h1>${title}【解答】</h1>
  <hr>
  <div class="ans-grid">
    ${questions.map(q => `
    <div class="ans-cell">
      <div class="ans-top">問${q.num}　<span class="ans-cor">答：${q.correctNum}</span></div>
      <div class="ans-word">${q.word}</div>
      <div class="ans-mean">${q.answer}</div>
    </div>`).join("")}
  </div>
</div>
</body>
</html>`);
  w.document.close();
  w.focus();
  setTimeout(() => w.print(), 500);
}

const inp = { width: "100%", padding: "10px 14px", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "10px", color: "#fff", fontSize: "14px", marginBottom: "15px", boxSizing: "border-box", outline: "none", fontFamily: "inherit" };
function Label({ children }) { return <div style={{ fontSize: "11px", letterSpacing: "2px", color: "#e2b96f", marginBottom: "7px", fontFamily: "sans-serif" }}>{children}</div>; }
const nb = { padding: "7px 11px", background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.14)", borderRadius: "8px", color: "#bbb", cursor: "pointer", fontSize: "12px", fontFamily: "inherit", whiteSpace: "nowrap" };

function HomeScreen({ rangeStart, setRangeStart, rangeEnd, setRangeEnd, questionCount, setQuestionCount, testType, setTestType, testTitle, setTestTitle, onGenerate }) {
  const maxId = Math.max(...VOCAB.map(v => v.id));
  const count = VOCAB.filter(v => v.id >= rangeStart && v.id <= rangeEnd).length;
  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg,#1a1a2e,#16213e,#0f3460)", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px", fontFamily: "'Hiragino Mincho ProN','Yu Mincho',serif" }}>
      <div style={{ background: "rgba(255,255,255,0.05)", backdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "24px", padding: "40px", width: "100%", maxWidth: "520px", boxShadow: "0 25px 50px rgba(0,0,0,0.5)" }}>
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <div style={{ fontSize: "11px", letterSpacing: "4px", color: "#e2b96f", marginBottom: "8px", fontFamily: "sans-serif" }}>KIRIHARA · 古文単語315</div>
          <h1 style={{ fontSize: "24px", fontWeight: "bold", color: "#fff", margin: 0, letterSpacing: "2px" }}>テスト作成ツール</h1>
          <div style={{ width: "60px", height: "2px", background: "linear-gradient(90deg,#e2b96f,#f5d78e)", margin: "10px auto 0" }} />
        </div>
        <Label>テストタイトル</Label>
        <input value={testTitle} onChange={e => setTestTitle(e.target.value)} style={inp} placeholder="古文単語315 第1回テスト" />
        <Label>出題範囲（No.1〜{maxId}）</Label>
        <div style={{ display: "flex", gap: "10px", alignItems: "center", marginBottom: "8px" }}>
          <input type="number" min={1} max={maxId} value={rangeStart} onChange={e => setRangeStart(Number(e.target.value))} style={{ ...inp, marginBottom: 0, width: "80px", textAlign: "center" }} />
          <span style={{ color: "#aaa" }}>〜</span>
          <input type="number" min={1} max={maxId} value={rangeEnd} onChange={e => setRangeEnd(Number(e.target.value))} style={{ ...inp, marginBottom: 0, width: "80px", textAlign: "center" }} />
          <span style={{ color: "#888", fontSize: "12px" }}>（{count}語）</span>
        </div>
        <div style={{ display: "flex", gap: "10px", marginBottom: "18px" }}>
          <input type="range" min={1} max={maxId} value={rangeStart} onChange={e => setRangeStart(Number(e.target.value))} style={{ flex: 1, accentColor: "#e2b96f" }} />
          <input type="range" min={1} max={maxId} value={rangeEnd} onChange={e => setRangeEnd(Number(e.target.value))} style={{ flex: 1, accentColor: "#e2b96f" }} />
        </div>
        <Label>問題数</Label>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "18px" }}>
          {[10, 15, 20, 25, 30].map(n => (
            <button key={n} onClick={() => setQuestionCount(n)} style={{ padding: "8px 13px", borderRadius: "20px", border: "1px solid", borderColor: questionCount === n ? "#e2b96f" : "rgba(255,255,255,0.18)", background: questionCount === n ? "rgba(226,185,111,0.18)" : "transparent", color: questionCount === n ? "#e2b96f" : "#aaa", cursor: "pointer", fontSize: "13px" }}>{n}問</button>
          ))}
          <input type="number" min={1} max={50} value={questionCount} onChange={e => setQuestionCount(Number(e.target.value))} style={{ ...inp, marginBottom: 0, width: "64px", textAlign: "center", padding: "8px" }} />
        </div>
        <Label>問題形式</Label>
        <div style={{ display: "flex", gap: "8px", marginBottom: "32px" }}>
          {["古→現", "現→古", "両方"].map(t => (
            <button key={t} onClick={() => setTestType(t)} style={{ flex: 1, padding: "10px", borderRadius: "12px", border: "1px solid", borderColor: testType === t ? "#e2b96f" : "rgba(255,255,255,0.18)", background: testType === t ? "rgba(226,185,111,0.18)" : "transparent", color: testType === t ? "#e2b96f" : "#aaa", cursor: "pointer", fontSize: "13px", fontFamily: "inherit" }}>
              {t === "古→現" ? "古文→現代語" : t === "現→古" ? "現代語→古文" : "両方"}
            </button>
          ))}
        </div>
        <button onClick={onGenerate} style={{ width: "100%", padding: "16px", background: "linear-gradient(135deg,#e2b96f,#f5d78e)", border: "none", borderRadius: "14px", fontSize: "16px", fontWeight: "bold", color: "#1a1a2e", cursor: "pointer", letterSpacing: "2px", fontFamily: "inherit" }}>
          テストを作成する
        </button>
        <div style={{ textAlign: "center", marginTop: "14px", color: "#555", fontSize: "11px" }}>全{maxId}語収録（慣用句の章含む）· 四択 · 印刷対応</div>
      </div>
      <div style={{ position: "fixed", bottom: "14px", right: "18px", fontSize: "11px", color: "rgba(226,185,111,0.45)", letterSpacing: "1px", fontFamily: "sans-serif", pointerEvents: "none" }}>author by Fort_Dex</div>
    </div>
  );
}

const NUMS = ["①", "②", "③", "④"];

function PreviewScreen({ questions, title, onBack, onRegenerate, onPrint }) {
  const [tab, setTab] = useState("問題");
  return (
    <div style={{ minHeight: "100vh", background: "#0d0d1a", fontFamily: "'Hiragino Mincho ProN','Yu Mincho',serif" }}>
      <div style={{ background: "rgba(15,15,35,0.98)", backdropFilter: "blur(10px)", borderBottom: "1px solid rgba(226,185,111,0.25)", padding: "10px 16px", display: "flex", alignItems: "center", gap: "10px", position: "sticky", top: 0, zIndex: 10 }}>
        <button onClick={onBack} style={nb}>← 戻る</button>
        <div style={{ flex: 1, color: "#e2b96f", fontWeight: "bold", fontSize: "13px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{title}</div>
        <button onClick={onRegenerate} style={nb}>🔀 再生成</button>
        <button onClick={onPrint} style={{ ...nb, background: "rgba(226,185,111,0.15)", borderColor: "#e2b96f", color: "#e2b96f", fontWeight: "bold" }}>🖨️ 印刷 / PDF</button>
      </div>
      <div style={{ display: "flex", background: "#111" }}>
        {["問題", "解答"].map(t => (
          <button key={t} onClick={() => setTab(t)} style={{ flex: 1, padding: "12px", border: "none", background: "transparent", color: tab === t ? "#e2b96f" : "#555", fontSize: "13px", cursor: "pointer", borderBottom: `2px solid ${tab === t ? "#e2b96f" : "transparent"}`, fontFamily: "inherit" }}>{t}プレビュー</button>
        ))}
      </div>
      <div style={{ padding: "20px", maxWidth: "720px", margin: "0 auto" }}>
        {tab === "問題" ? <QuestionPreview questions={questions} title={title} /> : <AnswerPreview questions={questions} title={title} />}
      </div>
      <div style={{ position: "fixed", bottom: "14px", right: "18px", fontSize: "11px", color: "rgba(226,185,111,0.45)", letterSpacing: "1px", fontFamily: "sans-serif", pointerEvents: "none" }}>author by Fort_Dex</div>
    </div>
  );
}

function QuestionPreview({ questions, title }) {
  return (
    <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: "11px", padding: "22px", color: "#ddd" }}>
      <div style={{ textAlign: "center", fontSize: "15px", fontWeight: "bold", marginBottom: "5px" }}>{title}</div>
      <div style={{ textAlign: "center", fontSize: "11px", color: "#777", marginBottom: "10px" }}>名前：＿＿＿＿＿＿　　組：＿＿番：＿＿　　点：＿＿／{questions.length}</div>
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.13)", marginBottom: "12px" }} />
      <div style={{ fontSize: "11px", color: "#888", marginBottom: "13px" }}>※各問について最も適当なものを1〜4の中から一つ選び、解答欄に番号を記入しなさい。</div>
      {questions.map((q, i) => (
        <div key={i} style={{ marginBottom: "14px" }}>
          <div style={{ fontSize: "12px", marginBottom: "4px", display: "flex", gap: "5px", alignItems: "flex-start" }}>
            <span style={{ color: "#e2b96f", fontWeight: "bold", minWidth: "38px" }}>問{q.num}</span>
            <span style={{ flex: 1 }}>「<b>{q.question}</b>」{q.type === "古→現" ? "の現代語訳として正しいものを選べ。" : "を古文で書いたものを選べ。"}</span>
            <span style={{ border: "1px solid #555", minWidth: "20px", height: "16px", display: "inline-block", marginLeft: "4px" }} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1px 14px", paddingLeft: "43px", fontSize: "11px", color: "#bbb" }}>
            {q.choices.map((c, j) => <div key={j}>{j + 1}.　{c}</div>)}
          </div>
        </div>
      ))}
    </div>
  );
}

function AnswerPreview({ questions, title }) {
  return (
    <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: "11px", padding: "22px", color: "#ddd" }}>
      <div style={{ textAlign: "center", fontSize: "15px", fontWeight: "bold", marginBottom: "10px" }}>{title}【解答】</div>
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.13)", marginBottom: "12px" }} />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(155px,1fr))", gap: "7px" }}>
        {questions.map((q, i) => (
          <div key={i} style={{ background: "rgba(226,185,111,0.07)", border: "1px solid rgba(226,185,111,0.18)", borderRadius: "8px", padding: "9px 11px" }}>
            <div style={{ fontWeight: "bold", fontSize: "12px", marginBottom: "2px" }}>問{q.num}　答え：<span style={{ color: "#e2b96f" }}>{q.correctNum}</span></div>
            <div style={{ fontSize: "10px", color: "#888" }}>{q.word}</div>
            <div style={{ fontSize: "11px", borderTop: "1px dashed rgba(255,255,255,0.1)", paddingTop: "3px", marginTop: "3px" }}>{q.answer}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function App() {
  const [screen, setScreen] = useState("home");
  const [rangeStart, setRangeStart] = useState(1);
  const [rangeEnd, setRangeEnd] = useState(50);
  const [questionCount, setQuestionCount] = useState(20);
  const [testType, setTestType] = useState("両方");
  const [testTitle, setTestTitle] = useState("古文単語315 テスト");
  const [questions, setQuestions] = useState([]);

  const generate = useCallback(() => {
    const pool = VOCAB.filter(v => v.id >= rangeStart && v.id <= rangeEnd);
    if (pool.length < 4) { alert("範囲内の単語が4語以上必要です"); return; }
    const qs = genQuestions(rangeStart, rangeEnd, questionCount, testType);
    setQuestions(qs);
    setScreen("preview");
  }, [rangeStart, rangeEnd, questionCount, testType]);

  const handlePrint = () => printTest(questions, testTitle);

  if (screen === "preview") {
    return <PreviewScreen questions={questions} title={testTitle} onBack={() => setScreen("home")} onRegenerate={generate} onPrint={handlePrint} />;
  }
  return <HomeScreen rangeStart={rangeStart} setRangeStart={setRangeStart} rangeEnd={rangeEnd} setRangeEnd={setRangeEnd} questionCount={questionCount} setQuestionCount={setQuestionCount} testType={testType} setTestType={setTestType} testTitle={testTitle} setTestTitle={setTestTitle} onGenerate={generate} />;
}