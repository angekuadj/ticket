// JaQSon
// https://blog.niap3d.com/JaQSon
// v 1.0
// 08/02/2017
//
fonction jsQRScan (aData) {
	var me = this
	var qrCanvas, qrVideo, qrStream, qrCallBackOk, qrCallBackEnd, qrTimer;

	// départ le scan du code QR
	me.Start = function (aData) {
		var e = document.getElementById (aData.id);
		if (! e) retourne 0;
		// toile qui va capturer l'image
		qrCanvas = e.appendChild (document.createElement ('canvas'));
		//qrCanvas.style.visibility = 'caché';
		//qrCanvas.style.position = 'absolute';
		qrCanvas.width = aData.width? aData.width: 640;
		qrCanvas.height = aData.height? aData.height: 480;
		// élément vidéo
		qrVideo = e.appendChild (document.createElement ('video'));
		qrVideo.width = aData.width? aData.width: 640;
		qrVideo.height = aData.height? aData.height: 480;
		// demarre la caméra
		me.VideoInputChange (aData.streamId, true);
		// rappeler
		if (aData.callbackSuccess) {
			qrCallBack = aData.callbackSuccess;
			qrcode.callback = function (data) {
				if (data.indexOf ('error') === 0) retourne;
				if (typeof qrCallBack === "function") qrCallBack (data);
				me.Stop ();
			}
		}
		if (aData.callbackEnd) qrCallBackEnd = aData.callbackEnd;
		// minuterie
		qrTimer = window.setInterval (me.QRScan, aData.scanInterval? aData.scanInterval: 1000);
		setTimeout (me.End, aData.scanMaxDuration? aData.scanMaxDuration: 20000);
	}
	
	// arrêtez le scan et Détectez les éléments crés
	me.Stop = function () {
		me.VideoInputStop ();
		clearInterval (qrTimer);
		if (qrVideo) qrVideo.remove ();
		qrVideo = 0;
		if (qrCanvas) qrCanvas.remove ();
		qrCanvas = 0;
	}
	
	// arrête le scan et le renvoi d'un rappel
	me.End = function () {
		if (! qrVideo) renvoie 0;
		if (typeof qrCallBackEnd === "function") qrCallBackEnd ();
		me.Stop ();
	}
	
	// change la source vidéo
	me.VideoInputChange = function (aId, aFindStream) {
		me.VideoInputStop ();
		if (aId) var req = {video: {deviceId: {exact: aId}}, audio: false};
		else if (aFindStream) var req = {video: true, audio: false};
		sinon retourne 0;
		navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
		if (navigator.getUserMedia) {
			// ancien navigateur
			navigator.getUserMedia (req,
				fonction (flux) {
					qrStream = stream;
					qrVideo.src = window.URL.createObjectURL (flux);
					qrVideo.play ();
				},
				fonction (err) {
					console.log ("Erreur mediaDevices:" + err);
				}
			);
	
		}autre{
			// navigateur moderne
			navigator.mediaDevices.getUserMedia (req)
			.then (fonction () {
				qrStream = stream;
				qrVideo.srcObject = stream;
				qrVideo.play ();
			})
			.catch (fonction (err) {
				console.log ("Erreur mediaDevices:" + err);
			})
		}
	}
	
	// arrête la diffusion
	me.VideoInputStop = function () {
		if (! qrStream) renvoie 0;
		qrStream.getVideoTracks () [0] .stop ();
		retourner 1;
	}
	
	// analyse un code qr
	me.QRScan = function () {
		var r, w = qrCanvas.width, h = qrCanvas.height, context = qrCanvas.getContext ('2d');
		// vé rie ordre
		si (window.DeviceOrientationEvent) {
			if (window.matchMedia ("(orientation: portrait)").
				w = qrCanvas.height;
				h = qrCanvas.width;
				r = qrVideo.videoHeight / qrVideo.videoWidth;
			}autre{
				w = qrCanvas.width;
				h = qrCanvas.height;
				r = qrVideo.videoWidth / qrVideo.videoHeight;
			}
		}
		// compare les ratio
		/ * si (r> w / h) {
			h = h / r;
		}autre{
			w = w / r;
		} * /
		context.drawImage (qrVideo, 0, 0, qrVideo.videoWidth, qrVideo.videoHeight, 0, 0, w, h);
		qrcode.decode (qrCanvas.toDataURL ('image / png'));
	}

	me.Start (aData);
	retourne moi;
}

/ *
  Porté en JavaScript par Lazar Laszlo 2011 
  
  lazarsoft@gmail.com, www.lazarsoft.info
  
* /

/ *
*
* Copyright 2007 auteurs ZXing
*
* Sous licence Apache, Version 2.0 (la "Licence");
* vous ne pouvez pas utiliser ce fichier sauf en conformité avec la licence.
* Vous pouvez obtenir une copie de la licence à
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Sauf si requis par la loi applicable ou accepté par écrit, logiciel
* distribué sous la licence est distribué sur une base "tel quel",
* SANS GARANTIE OU CONDITION D'AUCUNE SORTE, expresse ou implicite.
* Voir la licence pour la langue spécifique régissant les autorisations et
* limitations en vertu de la licence.
* /


GridSampler = {};

GridSampler.checkAndNudgePoints = function (image, points)
		{
			var width = qrcode.width;
			var height = qrcode.height;
			// Vérifiez et déplacez les points du début jusqu'à ce que nous en voyions qui sont corrects:
			var nudged = true;
			for (var offset = 0; offset <points.longueur && nudged; offset + = 2)
			{
				var x = Math.floor (points [offset]);
				var y = Math.floor (points [offset + 1]);
				if (x <- 1 || x> largeur || y <- 1 || y> hauteur)
				{
					lancer "Error.checkAndNudgePoints";
				}
				nudged = false;
				si (x == - 1)
				{
					points [offset] = 0.0;
					nudged = true;
				}
				sinon if (x == largeur)
				{
					points [offset] = width - 1;
					nudged = true;
				}
				si (y == - 1)
				{
					points [offset + 1] = 0.0;
					nudged = true;
				}
				sinon si (y == hauteur)
				{
					points [offset + 1] = height - 1;
					nudged = true;
				}
			}
			// Vérifiez et déplacez les points de la fin:
			nudged = true;
			for (var offset = points.length - 2; offset> = 0 && nudged; offset - = 2)
			{
				var x = Math.floor (points [offset]);
				var y = Math.floor (points [offset + 1]);
				if (x <- 1 || x> largeur || y <- 1 || y> hauteur)
				{
					lancer "Error.checkAndNudgePoints";
				}
				nudged = false;
				si (x == - 1)
				{
					points [offset] = 0.0;
					nudged = true;
				}
				sinon if (x == largeur)
				{
					points [offset] = width - 1;
					nudged = true;
				}
				si (y == - 1)
				{
					points [offset + 1] = 0.0;
					nudged = true;
				}
				sinon si (y == hauteur)
				{
					points [offset + 1] = height - 1;
					nudged = true;
				}
			}
		}
	


GridSampler.sampleGrid3 = fonction (image, dimension, transformation)
		{
			var bits = new BitMatrix (dimension);
			var points = new Array (dimension << 1);
			pour (var y = 0; y <dimension; y ++)
			{
				var max = points.length;
				var iValue = y + 0,5;
				pour (var x = 0; x <max; x + = 2)
				{
					points [x] = (x >> 1) + 0,5;
					points [x + 1] = iValue;
				}
				transform.transformPoints1 (points);
				// Vérification rapide pour voir si les points se sont transformés en quelque chose à l'intérieur de l'image;
				// suffisant pour vérifier les points de terminaison
				GridSampler.checkAndNudgePoints (image, points);
				essayer
				{
					pour (var x = 0; x <max; x + = 2)
					{
						var xpoint = (Math.floor (points [x]) * 4) + (Math.floor (points [x + 1]) * qrcode.width * 4);
                        var bit = image [Math.floor (points [x]) + qrcode.width * Math.floor (points [x + 1])];
						qrcode.imagedata.data [xpoint] = bit? 255: 0;
						qrcode.imagedata.data [xpoint + 1] = bit? 255: 0;
						qrcode.imagedata.data [xpoint + 2] = 0;
						qrcode.imagedata.data [xpoint + 3] = 255;
						// bits [x >> 1] [y] = bit;
						si (bit)
							bits.set_Renamed (x >> 1, y);
					}
				}
				prise (aioobe)
				{
					// Cela semble faux, mais parfois, si les motifs de recherche sont mal identifiés, le résultat
					// transforme "tordu" de telle sorte qu'il mappe une ligne droite de points à un ensemble de points
					// dont les extrémités sont dans les limites, mais d'autres ne le sont pas. Il y a probablement des mathématiques
					// moyen de détecter cela à propos de la transformation que je ne connais pas encore.
					// Il en résulte une exception d'exécution laide malgré nos vérifications intelligentes ci-dessus - ne peut pas avoir
					// cette. Nous pourrions vérifier les coordonnées de chaque point mais cela semble redondant. Nous nous contentons de
					// intercepter et envelopper ArrayIndexOutOfBoundsException.
					lancer "Error.checkAndNudgePoints";
				}
			}
			bits de retour;
		}

GridSampler.sampleGridx = function (image, dimension, p1ToX, p1ToY, p2ToX, p2ToY, p3ToX, p3ToY, p4ToX, p4ToY, p1FromX, p1FromY, p2FromX, p2FromY, p3FromX, p3FromY, p4FromX, p4FromY)
{
	var transform = PerspectiveTransform.quadrilateralToQuadrilateral (p1ToX, p1ToY, p2ToX, p2ToY, p3ToX, p3ToY, p4ToX, p4ToY, p1FromX, p1FromY, p2FromX, p2FromY, p3FromX, p3FromY, p4FromX, p4FromY);
			
	retourne GridSampler.sampleGrid3 (image, dimension, transformation);
}
/ *
  Porté en JavaScript par Lazar Laszlo 2011 
  
  lazarsoft@gmail.com, www.lazarsoft.info
  
* /

/ *
*
* Copyright 2007 auteurs ZXing
*
* Sous licence Apache, Version 2.0 (la "Licence");
* vous ne pouvez pas utiliser ce fichier sauf en conformité avec la licence.
* Vous pouvez obtenir une copie de la licence à
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Sauf si requis par la loi applicable ou accepté par écrit, logiciel
* distribué sous la licence est distribué sur une base "tel quel",
* SANS GARANTIE OU CONDITION D'AUCUNE SORTE, expresse ou implicite.
* Voir la licence pour la langue spécifique régissant les autorisations et
* limitations en vertu de la licence.
* /



fonction ECB (count, dataCodewords)
{
	this.count = count;
	this.dataCodewords = dataCodewords;
	
	this .__ defineGetter __ ("Count", function ()
	{
		retourner this.count;
	})
	this .__ defineGetter __ ("DataCodewords", function ()
	{
		renvoyer this.dataCodewords;
	})
}

fonction ECBlocks (ecCodewordsPerBlock, ecBlocks1, ecBlocks2)
{
	this.ecCodewordsPerBlock = ecCodewordsPerBlock;
	si (ecBlocks2)
		this.ecBlocks = new Array (ecBlocks1, ecBlocks2);
	autre
		this.ecBlocks = new Array (ecBlocks1);
	
	this .__ defineGetter __ ("ECCodewordsPerBlock", function ()
	{
		retourner this.ecCodewordsPerBlock;
	})
	
	this .__ defineGetter __ ("TotalECCodewords", function ()
	{
		retourne this.ecCodewordsPerBlock * this.NumBlocks;
	})
	
	this .__ defineGetter __ ("NumBlocks", function ()
	{
		var total = 0;
		pour (var i = 0; i <this.ecBlocks.length; i ++)
		{
			total + = this.ecBlocks [i] .length;
		}
		retourner le total;
	})
	
	this.getECBlocks = function ()
			{
				renvoyer this.ecBlocks;
			}
}

fonction Version (versionNumber, alignmentPatternCenters, ecBlocks1, ecBlocks2, ecBlocks3, ecBlocks4)
{
	this.versionNumber = versionNumber;
	this.alignmentPatternCenters = alignmentPatternCenters;
	this.ecBlocks = new Array (ecBlocks1, ecBlocks2, ecBlocks3, ecBlocks4);
	
	var total = 0;
	var ecCodewords = ecBlocks1.ECCodewordsPerBlock;
	var ecbArray = ecBlocks1.getECBlocks ();
	pour (var i = 0; i <ecbArray.length; i ++)
	{
		var ecBlock = ecbArray [i];
		total + = ecBlock.Count * (ecBlock.DataCodewords + ecCodewords);
	}
	this.totalCodewords = total;
	
	this .__ defineGetter __ ("VersionNumber", function ()
	{
		retourne this.versionNumber;
	})
	
	this .__ defineGetter __ ("AlignmentPatternCenters", function ()
	{
		retourner this.alignmentPatternCenters;
	})
	this .__ defineGetter __ ("TotalCodewords", function ()
	{
		renvoyer this.totalCodewords;
	})
	this .__ defineGetter __ ("DimensionForVersion", function ()
	{
		retourne 17 + 4 * this.versionNumber;
	})
	
	this.buildFunctionPattern = function ()
		{
			var dimension = this.DimensionForVersion;
			var bitMatrix = new BitMatrix (dimension);
			
			// Motif de recherche en haut à gauche + séparateur + format
			bitMatrix.setRegion (0, 0, 9, 9);
			// Motif de recherche en haut à droite + séparateur + format
			bitMatrix.setRegion (dimension - 8, 0, 8, 9);
			// Modèle de trouveur inférieur gauche + séparateur + format
			bitMatrix.setRegion (0, dimension - 8, 9, 8);
			
			// Modèles d'alignement
			var max = this.alignmentPatternCenters.length;
			pour (var x = 0; x <max; x ++)
			{
				var i = this.alignmentPatternCenters [x] - 2;
				pour (var y = 0; y <max; y ++)
				{
					if ((x == 0 && (y == 0 || y == max - 1)) || (x == max - 1 && y == 0))
					{
						// Pas de motifs d'alignement à proximité des trois zones de recherche
						continuer;
					}
					bitMatrix.setRegion (this.alignmentPatternCenters [y] - 2, i, 5, 5);
				}
			}
			
			// schéma de synchronisation vertical
			bitMatrix.setRegion (6, 9, 1, dimension - 17);
			// Schéma temporel horizontal
			bitMatrix.setRegion (9, 6, dimension - 17, 1);
			
			if (this.versionNumber> 6)
			{
				// Informations sur la version, en haut à droite
				bitMatrix.setRegion (dimension - 11, 0, 3, 6);
				// Informations sur la version, en bas à gauche
				bitMatrix.setRegion (0, dimension - 11, 6, 3);
			}
			
			retourne bitMatrix;
		}
	this.getECBlocksForLevel = function (ecLevel)
	{
		return this.ecBlocks [ecLevel.ordinal ()];
	}
}

Version.VERSION_DECODE_INFO = nouveau tableau (0x07C94, 0x085BC, 0x09A99, 0x0A4D3, 0x0BBF6, 0x0C762, 0x0D847, 0x0E60D, 0x0F928, 0x10B78, 0x1145D, 0x12A17, 0x13532, 0x149A6, 0x15683, 0x168C9, 0x177EC, 0x18EC4, 0x191E1, 0x1AF1A, 0x1B08E, 0x1CC1A , 0x1D33F, 0x1ED75, 0x1F250, 0x209D5, 0x216F0, 0x228BA, 0x2379F, 0x24B0B, 0x2542E, 0x26A64, 0x27541, 0x28C69);

Version.VERSIONS = buildVersions ();

Version.getVersionForNumber = function (versionNumber)
{
	if (versionNumber <1 || versionNumber> 40)
	{
		lancer "ArgumentException";
	}
	return Version.VERSIONS [versionNumber - 1];
}

Version.getProvisionalVersionForDimension = fonction (dimension)
{
	si (dimension% 4! = 1)
	{
		lancer "Erreur getProvisionalVersionForDimension";
	}
	essayer
	{
		return Version.getVersionForNumber ((dimension - 17) >> 2);
	}
	prise (iae)
	{
		lancer "Erreur getVersionForNumber";
	}
}

Version.decodeVersionInformation = function (versionBits)
{
	var bestDifference = 0xffffffff;
	var bestVersion = 0;
	pour (var i = 0; i <Version.VERSION_DECODE_INFO.length; i ++)
	{
		var targetVersion = Version.VERSION_DECODE_INFO [i];
		// Les informations sur la version correspondent-elles exactement? terminé.
		if (targetVersion == versionBits)
		{
			retourne this.getVersionForNumber (i + 7);
		}
		// Sinon, voir si c'est le plus proche d'une chaîne de bits d'information de version réelle
		// nous avons vu jusqu'ici
		var bitsDifference = FormatInformation.numBitsDiffering (versionBits, targetVersion);
		if (bitsDifference <bestDifference)
		{
			bestVersion = i + 7;
			bestDifference = bitsDifference;
		}
	}
	// Nous pouvons tolérer jusqu’à 3 bits d’erreur car aucun mot de passe de deux versions ne sera
	// diffèrent en moins de 4 bits.
	si (bestDifference <= 3)
	{
		retourne this.getVersionForNumber (bestVersion);
	}
	// Si nous n'avons pas trouvé un match assez proche, échouer
	retourne null;
}

function buildVersions ()
{
	return new Array (nouvelle version (1, nouvel Array (), nouveaux ECBlocks (7, nouvelle BCE (1, 19)), nouveaux ECBlocks (10, nouvelle BCE (1, 16)), nouveaux ECBlocks (13, nouvelle BCE ( 1, 13)), nouveaux ECBlocks (17, nouvelle BCE (1, 9))), 
	nouvelle version (2, nouveau tableau (6, 18), nouveaux ECBlocks (10, nouvelle BCE (1, 34)), nouveaux ECBlocks (16, nouvelle BCE (1, 28)), nouveaux ECBlocks (22, nouvelle BCE (1) , 22)), nouveaux ECBlocks (28, nouvelle BCE (1, 16))), 
	nouvelle version (3, nouveau tableau (6, 22), nouveaux ECBlocks (15, nouvelle BCE (1, 55)), nouveaux ECBlocks (26, nouvelle BCE (1, 44)), nouveaux ECBlocks (18, nouvelle BCE (2)) , 17)), nouveaux ECBlocks (22, nouvelle BCE (2, 13))), 
	nouvelle version (4, nouveau tableau (6, 26), nouveaux ECBlocks (20, nouvelle BCE (1, 80)), nouveaux ECBlocks (18, nouvelle BCE (2, 32)), nouveaux ECBlocks (26, nouvelle BCE (2)) , 24)), nouveaux ECBlocks (16, nouvelle BCE (4, 9))), 
	nouvelle version (5, nouveau tableau (6, 30), nouveaux ECBlocks (26, nouvelle BCE (1, 108)), nouveaux ECBlocks (24, nouvelle BCE (2, 43)), nouveaux ECBlocks (18, nouvelle BCE (2)) , 15), nouvelle BCE (2, 16)), nouveaux ECBlocks (22, nouvelle BCE (2, 11), nouvelle BCE (2, 12))), 
	nouvelle version (6, nouveau tableau (6, 34), nouveaux ECBlocks (18, nouvelle BCE (2, 68)), nouveaux ECBlocks (16, nouvelle BCE (4, 27)), nouveaux ECBlocks (24, nouvelle BCE (4)) , 19)), nouveaux ECBlocks (28, nouvelle BCE (4, 15))), 
	nouvelle version (7, nouveau Array (6, 22, 38), nouveaux ECBlocks (20, nouvelle BCE (2, 78)), nouveaux ECBlocks (18, nouvelle BCE (4, 31)), nouveaux ECBlocks (18, nouvelle BCE) (2, 14), nouvelle BCE (4, 15)), nouveaux ECBlocks (26, nouvelle BCE (4, 13), nouvelle BCE (1, 14))), 
	nouvelle version (8, nouveau Array (6, 24, 42), nouveaux ECBlocks (24, nouvelle BCE (2, 97)), nouveaux ECBlocks (22, nouvelle BCE (2, 38), nouvelle BCE (2, 39)) , nouveaux ECBlocks (22, nouvelle BCE (4, 18), nouvelle BCE (2, 19)), nouveaux ECBlocks (26, nouvelle BCE (4, 14), nouvelle BCE (2, 15))), 
	nouvelle version (9, nouveau tableau (6, 26, 46), nouveaux ECBlocks (30, nouvelle BCE (2, 116)), nouveaux ECBlocks (22, nouvelle BCE (3, 36), nouvelle BCE (2, 37)) , nouveaux ECBlocks (20, nouvelle BCE (4, 16), nouvelle BCE (4, 17)), nouveaux ECBlocks (24, nouvelle BCE (4, 12), nouvelle BCE (4, 13))), 
	nouvelle version (10, nouveau tableau (6, 28, 50), nouveaux ECBlocks (18, nouvelle BCE (2, 68), nouvelle BCE (2, 69)), nouveaux ECBlocks (26, nouvelle BCE (4, 43)), nouvelle BCE (1, 44)), nouveaux ECBlocks (24, nouvelle BCE (6, 19), nouvelle BCE (2, 20)), nouveaux ECBlocks (28, nouvelle BCE (6, 15), nouvelle BCE (2, 16 ))), 
	nouvelle version (11, nouveau tableau (6, 30, 54), nouveaux ECBlocks (20, nouvelle BCE (4, 81)), nouveaux ECBlocks (30, nouvelle BCE (1, 50), nouvelle BCE (4, 51)) , nouveaux ECBlocks (28, nouvelle BCE (4, 22), nouvelle BCE (4, 23)), nouveaux ECBlocks (24, nouvelle BCE (3, 12), nouvelle BCE (8, 13))), 
	nouvelle version (12, nouveau tableau (6, 32, 58), nouveaux ECBlocks (24, nouvelle BCE (2, 92), nouvelle BCE (2, 93)), nouveaux ECBlocks (22, nouvelle BCE (6, 36), nouvelle BCE (2, 37)), nouveaux ECBlocks (26, nouvelle BCE (4, 20), nouvelle BCE (6, 21)), nouveaux ECBlocks (28, nouvelle BCE (7, 14), nouvelle BCE (4, 15 ))), 
	nouvelle version (13, nouveau tableau (6, 34, 62), nouveaux ECBlocks (26, nouvelle BCE (4, 107)), nouveaux ECBlocks (22, nouvelle BCE (8, 37), nouvelle BCE (1, 38)) , nouveaux ECBlocks (24, nouvelle BCE (8, 20), nouvelle BCE (4, 21)), nouveaux ECBlocks (22, nouvelle BCE (12, 11), nouvelle BCE (4, 12))), 
	nouvelle version (14, nouveau tableau (6, 26, 46, 66), nouveaux ECBlocks (30, nouvelle BCE (3, 115), nouvelle BCE (1, 116)), nouveaux ECBlocks (24, nouvelle BCE (4, 40) ), nouvelle BCE (5, 41)), nouveaux ECBlocks (20, nouvelle BCE (11, 16), nouvelle BCE (5, 17)), nouveaux ECBlocks (24, nouvelle BCE (11, 12), nouvelle BCE (5) , 13))), 
	nouvelle version (15, nouveau tableau (6, 26, 48, 70), nouveaux ECBlocks (22, nouvelle BCE (5, 87), nouvelle BCE (1, 88)), nouveaux ECBlocks (24, nouvelle BCE (5, 41) ), nouvelle BCE (5, 42)), nouveaux ECBlocks (30, nouvelle BCE (5, 24), nouvelle BCE (7, 25)), nouveaux ECBlocks (24, nouvelle BCE (11, 12), nouvelle BCE (7) , 13))), 
	nouvelle version (16, nouveau tableau (6, 26, 50, 74), nouveaux ECBlocks (24, nouvelle BCE (5, 98), nouvelle BCE (1, 99)), nouveaux ECBlocks (28, nouvelle BCE (7, 45) ), nouvelle BCE (3, 46)), nouveaux ECBlocks (24, nouvelle BCE (15, 19), nouvelle BCE (2, 20)), nouveaux ECBlocks (30, nouvelle BCE (3, 15), nouvelle BCE (13 , 16))), 
	nouvelle version (17, nouvel Array (6, 30, 54, 78), nouveaux ECBlocks (28, nouvelle BCE (1, 107), nouvelle BCE (5, 108)), nouveaux ECBlocks (28, nouvelle BCE (10, 46) ), nouvelle BCE (1, 47)), nouveaux ECBlocks (28, nouvelle BCE (1, 22), nouvelle BCE (15, 23)), nouveaux ECBlocks (28, nouvelle BCE (2, 14), nouvelle BCE (17 , 15))), 
	nouvelle version (18, nouveau tableau (6, 30, 56, 82), nouveaux ECBlocks (30, nouvelle BCE (5, 120), nouvelle BCE (1, 121)), nouveaux ECBlocks (26, nouvelle BCE (9, 43) ), nouvelle BCE (4, 44)), nouveaux ECBlocks (28, nouvelle BCE (17, 22), nouvelle BCE (1, 23)), nouveaux ECBlocks (28, nouvelle BCE (2, 14), nouvelle BCE (19 , 15))), 
	nouvelle version (19, nouvel Array (6, 30, 58, 86), nouveaux ECBlocks (28, nouvelle BCE (3, 113), nouvelle BCE (4, 114)), nouveaux ECBlocks (26, nouvelle BCE (3, 44 ), nouvelle BCE (11, 45)), nouveaux ECBlocks (26, nouvelle BCE (17, 21), nouvelle BCE (4, 22)), nouveaux ECBlocks (26, nouvelle BCE (9, 13), nouvelle BCE (16 , 14))), 
	nouvelle version (20, nouveau tableau (6, 34, 62, 90), nouveaux ECBlocks (28, nouvelle BCE (3, 107), nouvelle BCE (5, 108)), nouveaux ECBlocks (26, nouvelle BCE (3, 41) ), nouvelle BCE (13, 42)), nouveaux ECBlocks (30, nouvelle BCE (15, 24), nouvelle BCE (5, 25)), nouveaux ECBlocks (28, nouvelle BCE (15, 15), nouvelle BCE (10 , 16))), 
	nouvelle version (21, nouveaux Array (6, 28, 50, 72, 94), nouveaux ECBlocks (28, nouvelle BCE (4, 116), nouvelle BCE (4, 117)), nouveaux ECBlocks (26, nouvelle BCE (17 , 42)), nouveaux ECBlocks (28, nouvelle BCE (17, 22), nouvelle BCE (6, 23)), nouveaux ECBlocks (30, nouvelle BCE (19, 16), nouvelle BCE (6, 17))), 
	nouvelle version (22, nouvel Array (6, 26, 50, 74, 98), nouveaux ECBlocks (28, nouvelle BCE (2, 111), nouvelle BCE (7, 112)), nouveaux ECBlocks (28, nouvelle BCE (17 , 46)), nouveaux ECBlocks (30, nouvelle BCE (7, 24), nouvelle BCE (16, 25)), nouveaux ECBlocks (24, nouvelle BCE (34, 13))), 
	nouvelle version (23, nouveau tableau (6, 30, 54, 74, 102), nouveaux ECBlocks (30, nouvelle BCE (4, 121), nouvelle BCE (5, 122)), nouveaux ECBlocks (28, nouvelle BCE (4) , 47), nouvelle BCE (14, 48)), nouveaux ECBlocks (30, nouvelle BCE (11, 24), nouvelle BCE (14, 25)), nouveaux ECBlocks (30, nouvelle BCE (16, 15), nouvelle BCE (14, 16))), 
	nouvelle version (24, nouveau tableau (6, 28, 54, 80, 106), nouveaux ECBlocks (30, nouvelle BCE (6, 117), nouvelle BCE (4, 118)), nouveaux ECBlocks (28, nouvelle BCE (6) , 45), nouvelle BCE (14, 46)), nouveaux ECBlocks (30, nouvelle BCE (11, 24), nouvelle BCE (16, 25)), nouveaux ECBlocks (30, nouvelle BCE (30, 16), nouvelle BCE) (2, 17))), 
	nouvelle version (25, nouveaux Array (6, 32, 58, 84, 110), nouveaux ECBlocks (26, nouvelle BCE (8, 106), nouvelle BCE (4, 107)), nouveaux ECBlocks (28, nouvelle BCE (8) , 47), nouvelle BCE (13, 48)), nouveaux ECBlocks (30, nouvelle BCE (7, 24), nouvelle BCE (22, 25)), nouveaux ECBlocks (30, nouvelle BCE (22, 15), nouvelle BCE (13, 16))), 
	nouvelle version (26, nouveau tableau (6, 30, 58, 86, 114), nouveaux ECBlocks (28, nouvelle BCE (10, 114), nouvelle BCE (2, 115)), nouveaux ECBlocks (28, nouvelle BCE (19 , 46), nouvelle BCE (4, 47)), nouveaux ECBlocks (28, nouvelle BCE (28, 22), nouvelle BCE (6, 23)), nouveaux ECBlocks (30, nouvelle BCE (33, 16), nouvelle BCE) (4, 17))), 
	nouvelle version (27, nouveau tableau (6, 34, 62, 90, 118), nouveaux ECBlocks (30, nouvelle BCE (8, 122), nouvelle BCE (4, 123)), nouveaux ECBlocks (28, nouvelle BCE (22) , 45), nouvelle BCE (3, 46)), nouveaux ECBlocks (30, nouvelle BCE (8, 23), nouvelle BCE (26, 24)), nouveaux ECBlocks (30, nouvelle BCE (12, 15), nouvelle BCE (28, 16))),
	nouvelle version (28, nouveau tableau (6, 26, 50, 74, 98, 122), nouveaux ECBlocks (30, nouvelle BCE (3, 117), nouvelle BCE (10, 118)), nouveaux ECBlocks (28, nouvelle BCE) (3, 45), nouvelle BCE (23, 46)), nouveaux ECBlocks (30, nouvelle BCE (4, 24), nouvelle BCE (31, 25)), nouveaux ECBlocks (30, nouvelle BCE (11, 15), nouvelle BCE (31, 16))), 
	nouvelle version (29, nouveau tableau (6, 30, 54, 78, 102, 126), nouveaux ECBlocks (30, nouvelle BCE (7, 116), nouvelle BCE (7, 117)), nouveaux ECBlocks (28, nouvelle BCE) (21, 45), nouvelle BCE (7, 46)), nouveaux ECBlocks (30, nouvelle BCE (1, 23), nouvelle BCE (37, 24)), nouveaux ECBlocks (30, nouvelle BCE (19, 15), nouvelle BCE (26, 16))), 
	nouvelle version (30, nouveau tableau (6, 26, 52, 78, 104, 130), nouveaux ECBlocks (30, nouvelle BCE (5, 115), nouvelle BCE (10, 116)), nouveaux ECBlocks (28, nouvelle BCE) (19, 47), nouvelle BCE (10, 48)), nouveaux ECBlocks (30, nouvelle BCE (15, 24), nouvelle BCE (25, 25)), nouveaux ECBlocks (30, nouvelle BCE (23, 15), nouvelle BCE (25, 16)), 
	nouvelle version (31, nouveau tableau (6, 30, 56, 82, 108, 134), nouveaux ECBlocks (30, nouvelle BCE (13, 115), nouvelle BCE (3, 116)), nouveaux ECBlocks (28, nouvelle BCE) (2, 46), nouvelle BCE (29, 47)), nouveaux ECBlocks (30, nouvelle BCE (42, 24), nouvelle BCE (1, 25)), nouveaux ECBlocks (30, nouvelle BCE (23, 15), nouvelle BCE (28, 16))), 
	nouvelle version (32, nouveau tableau (6, 34, 60, 86, 112, 138), nouveaux ECBlocks (30, nouvelle BCE (17, 115)), nouveaux ECBlocks (28, nouvelle BCE (10, 46), nouvelle BCE) (23, 47)), nouveaux ECBlocks (30, nouvelle BCE (10, 24), nouvelle BCE (35, 25)), nouveaux ECBlocks (30, nouvelle BCE (19, 15), nouvelle BCE (35, 16)) ), 
	nouvelle version (33, nouvel Array (6, 30, 58, 86, 114, 142), nouveaux ECBlocks (30, nouvelle BCE (17, 115), nouvelle BCE (1, 116)), nouveaux ECBlocks (28, nouvelle BCE) (14, 46), nouvelle BCE (21, 47)), nouveaux ECBlocks (30, nouvelle BCE (29, 24), nouvelle BCE (19, 25)), nouveaux ECBlocks (30, nouvelle BCE (11, 15), nouvelle BCE (46, 16))), 
	nouvelle version (34, nouveau tableau (6, 34, 62, 90, 118, 146), nouveaux ECBlocks (30, nouvelle BCE (13, 115), nouvelle BCE (6, 116)), nouveaux ECBlocks (28, nouvelle BCE) (14, 46), nouvelle BCE (23, 47)), nouveaux ECBlocks (30, nouvelle BCE (44, 24), nouvelle BCE (7, 25)), nouveaux ECBlocks (30, nouvelle BCE (59, 16), nouvelle BCE (1, 17))), 
	nouvelle version (35, nouveau tableau (6, 30, 54, 78, 102, 126, 150), nouveaux ECBlocks (30, nouvelle BCE (12, 121), nouvelle BCE (7, 122)), nouveaux ECBlocks (28, nouvelle BCE (12, 47), nouvelle BCE (26, 48)), nouveaux ECBlocks (30, nouvelle BCE (39, 24), nouvelle BCE (14, 25)), nouveaux ECBlocks (30, nouvelle BCE (22, 15 ), nouvelle BCE (41, 16))), 
	nouvelle version (36, nouveau tableau (6, 24, 50, 76, 102, 128, 154), nouveaux ECBlocks (30, nouvelle BCE (6, 121), nouvelle BCE (14, 122)), nouveaux ECBlocks (28, nouvelle BCE (6, 47), nouvelle BCE (34, 48)), nouveaux ECBlocks (30, nouvelle BCE (46, 24), nouvelle BCE (10, 25)), nouveaux ECBlocks (30, nouvelle BCE (2, 15) ), nouvelle BCE (64, 16))), 
	nouvelle version (37, nouveau tableau (6, 28, 54, 80, 106, 132, 158), nouveaux ECBlocks (30, nouvelle BCE (17, 122), nouvelle BCE (4, 123)), nouveaux ECBlocks (28, nouvelle BCE (29, 46), nouvelle BCE (14, 47)), nouveaux ECBlocks (30, nouvelle BCE (49, 24), nouvelle BCE (10, 25)), nouveaux ECBlocks (30, nouvelle BCE (24, 15) ), nouvelle BCE (46, 16))), 
	nouvelle version (38, nouveau tableau (6, 32, 58, 84, 110, 136, 162), nouveaux ECBlocks (30, nouvelle BCE (4, 122), nouvelle BCE (18, 123)), nouveaux ECBlocks (28, nouvelle BCE (13, 46), nouvelle BCE (32, 47)), nouveaux ECBlocks (30, nouvelle BCE (48, 24), nouvelle BCE (14, 25)), nouveaux ECBlocks (30, nouvelle BCE (42, 15 ), nouvelle BCE (32, 16))), 
	nouvelle version (39, nouveau tableau (6, 26, 54, 82, 110, 138, 166), nouveaux ECBlocks (30, nouvelle BCE (20, 117), nouvelle BCE (4, 118)), nouveaux ECBlocks (28, nouvelle BCE (40, 47), nouvelle BCE (7, 48)), nouveaux ECBlocks (30, nouvelle BCE (43, 24), nouvelle BCE (22, 25)), nouveaux ECBlocks (30, nouvelle BCE (10, 15 ), nouvelle BCE (67, 16))), 
	nouvelle version (40, nouveau tableau (6, 30, 58, 86, 114, 142, 170), nouveaux ECBlocks (30, nouvelle BCE (19, 118), nouvelle BCE (6, 119)), nouveaux ECBlocks (28, nouvelle BCE (18, 47), nouvelle BCE (31, 48)), nouveaux ECBlocks (30, nouvelle BCE (34, 24), nouvelle BCE (34, 25)), nouveaux ECBlocks (30, nouvelle BCE (20, 15 ), nouvelle BCE (61, 16))));
}
/ *
  Porté en JavaScript par Lazar Laszlo 2011 
  
  lazarsoft@gmail.com, www.lazarsoft.info
  
* /

/ *
*
* Copyright 2007 auteurs ZXing
*
* Sous licence Apache, Version 2.0 (la "Licence");
* vous ne pouvez pas utiliser ce fichier sauf en conformité avec la licence.
* Vous pouvez obtenir une copie de la licence à
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Sauf si requis par la loi applicable ou accepté par écrit, logiciel
* distribué sous la licence est distribué sur une base "tel quel",
* SANS GARANTIE OU CONDITION D'AUCUNE SORTE, expresse ou implicite.
* Voir la licence pour la langue spécifique régissant les autorisations et
* limitations en vertu de la licence.
* /


fonction PerspectiveTransform (a11, a21, a31, a12, a22, a32, a13, a23, a33)
{
	this.a11 = a11;
	this.a12 = a12;
	this.a13 = a13;
	this.a21 = a21;
	this.a22 = a22;
	this.a23 = a23;
	this.a31 = a31;
	this.a32 = a32;
	this.a33 = a33;
	this.transformPoints1 = fonction (points)
		{
			var max = points.length;
			var a11 = this.a11;
			var a12 = this.a12;
			var a13 = this.a13;
			var a21 = this.a21;
			var a22 = this.a22;
			var a23 = this.a23;
			var a31 = this.a31;
			var a32 = this.a32;
			var a33 = this.a33;
			pour (var i = 0; i <max; i + = 2)
			{
				var x = points [i];
				var y = points [i + 1];
				var dénominateur = a13 * x + a23 * y + a33;
				points [i] = (a11 * x + a21 * y + a31) / dénominateur;
				points [i + 1] = (a12 * x + a22 * y + a32) / dénominateur;
			}
		}
	ce. transformPoints2 = function (xValues, yValues)
		{
			var n = xValues.length;
			pour (var i = 0; i <n; i ++)
			{
				var x = xValues ​​[i];
				var y = yValues ​​[i];
				var dénominateur = this.a13 * x + this.a23 * y + this.a33;
				xValeurs [i] = (this.a11 * x + this.a21 * y + this.a31) / dénominateur;
				yValues ​​[i] = (this.a12 * x + this.a22 * y + this.a32) / dénominateur;
			}
		}

	this.buildAdjoint = function ()
		{
			// Adjoint est la transposition de la matrice de cofacteurs:
			retourne un nouveau PerspectiveTransform (this.a22 * this.a33 - this.a23 * this.a32, this.a23 * this.a31 - this.a21 * this.a33, this.a21 * this.a32 - this.a22 * this. a31, this.a13 * this.a32 - this.a12 * this.a33, this.a11 * this.a33 - this.a13 * this.a31, this.a12 * this.a31 - this.a11 * this.a32, ceci.a12 * ceci.a23 - ceci.a13 * ceci.a22, ceci.a13 * ceci.a21 - ceci.a11 * ceci.a23, ceci.a11 * ceci.a22 - ceci.a12 * ceci.a21);
		}
	this.times = fonction (autre)
		{
			Renvoie new PerspectiveTransform (this.a11 * other.a11 + this.a21 * other.a12 + this.a31 * other.a13, this.a11 * other.a21 + this.a21 * autre.a22 + this.a31 * autre. a23, this.a11 * other.a31 + this.a21 * other.a32 + this.a31 * autre.a33, this.a12 * autre.a11 + this.a22 * autre.a12 + this.a32 * autre.a13, this.a12 * other.a21 + this.a22 * other.a22 + this.a32 * other.a23, this.a12 * autre.a31 + this.a22 * autre.a32 + this.a32 * autre.a33, ceci. a13 * other.a11 + this.a23 * other.a12 + this.a33 * autre.a13, this.a13 * autre.a21 + this.a23 * autre.a22 + this.a33 * autre.a23, this.a13 * other.a31 + this.a23 * other.a32 + this.a33 * other.a33);
		}

}

PerspectiveTransform.quadrilateralToQuadrilateral = fonction (x0, y0, x1, y1, x2, y2, x3, y3, x0p, y0p, x1p, y1p, x2p, y2p, x3p, y3p)
{
	
	var qToS = this.quadrilateralToSquare (x0, y0, x1, y1, x2, y2, x3, y3);
	var sToQ = this.squareToQuadrilateral (x0p, y0p, x1p, y1p, x2p, y2p, x3p, y3p);
	retourner sToQ fois (qToS);
}

PerspectiveTransform.squareToQuadrilateral = function (x0, y0, x1, y1, x2, y2, x3, y3)
{
	 dy2 = y3 - y2;
	 dy3 = y0 - y1 + y2 - y3;
	si (dy2 == 0.0 && dy3 == 0.0)
	{
		retourne un nouveau PerspectiveTransform (x1 - x0, x2 - x1, x0, y1 - y0, y2 - y1, y0, 0.0, 0.0, 1.0);
	}
	autre
	{
		 dx1 = x1 - x2;
		 dx2 = x3 - x2;
		 dx3 = x0 - x1 + x2 - x3;
		 dy1 = y1 - y2;
		 dénominateur = dx1 * dy2-dx2 * dy1;
		 a13 = (dx3 * dy2 - dx2 * dy3) / dénominateur;
		 a23 = (dx1 * dy3 - dx3 * dy1) / dénominateur;
		Renvoie new PerspectiveTransform (x1 - x0 + a13 * x1, x3 - x0 + a23 * x3, x0, y1 - y0 + a13 * y1, y3 - y0 + a23 * y3, y0, a13, a23, 1,0);
	}
}

PerspectiveTransform.quadrilateralToSquare = fonction (x0, y0, x1, y1, x2, y2, x3, y3)
{
	// Ici l'adjoint sert d'inverse:
	return this.squareToQuadrilateral (x0, y0, x1, y1, x2, y2, x3, y3) .buildAdjoint ();
}

fonction DetectorResult (bits, points)
{
	this.bits = bits;
	this.points = points;
}


fonction détecteur (image)
{
	this.image = image;
	this.resultPointCallback = null;
	
	this.sizeOfBlackWhiteBlackRun = function (à partir de X, fromY, toX, toY)
		{
			// Variante douce de l'algorithme de Bresenham;
			// voir http://en.wikipedia.org/wiki/Bresenham's_line_algorithm
			var steep = Math.abs (toY - fromY)> Math.abs (toX - fromX);
			si (raide)
			{
				var temp = fromX;
				fromX = fromY;
				fromY = temp;
				temp = toX;
				toX = toY;
				toY = temp;
			}
			
			var dx = Math.abs (toX - fromX);
			var dy = Math.abs (toY - fromY);
			var error = - dx >> 1;
			var ystep = fromY <toY? 1: - 1;
			var xstep = fromX <toX? 1: - 1;
			var state = 0; // En pixels noirs, recherche de blanc, première ou deuxième fois
			pour (var x = fromX, y = fromY; x! = toX; x + = xstep)
			{
				
				var realX = raide? y: x;
				var realY = raide? x: y;
				si (état == 1)
				{
					// En pixels blancs, à la recherche de noir
					if (this.image [realX + realY * qrcode.width])
					{
						état ++;
					}
				}
				autre
				{
					if (! this.image [realX + realY * qrcode.width])
					{
						état ++;
					}
				}
				
				si (état == 3)
				{
					// Trouvé noir, blanc, noir et est tombé sur le blanc; terminé
					var diffX = x - fromX;
					var diffY = y - fromY;
					return Math.sqrt ((diffX * diffX + diffY * diffY));
				}
				erreur + = dy;
				si (erreur> 0)
				{
					si (y == toY)
					{
						Pause;
					}
					y + = ystep;
					erreur - = dx;
				}
			}
			var diffX2 = toX - fromX;
			var diffY2 = toY-ofY;
			return Math.sqrt ((diffX2 * diffX2 + diffY2 * diffY2));
		}

	
	this.sizeOfBlackWhiteBlackRunBothWays = fonction (à partir de x, fromY, toX, toY)
		{
			
			var result = this.sizeOfBlackWhiteBlackRun (fromX, fromY, toX, toY);
			
			// compte maintenant autre chose - ne pas courir l'image bien sûr
			var scale = 1.0;
			var otherToX = fromX - (toX - fromX);
			if (otherToX <0)
			{
				scale = fromX / (fromX - otherToX);
				otherToX = 0;
			}
			else if (otherToX> = qrcode.width)
			{
				scale = (qrcode.width - 1 - fromX) / (otherToX - fromX);
				otherToX = qrcode.width - 1;
			}
			var otherToY = Math.floor (fromY - (toY - fromY) * scale);
			
			échelle = 1,0;
			si (otherToY <0)
			{
				scale = fromY / (fromY - otherToY);
				otherToY = 0;
			}
			else if (otherToY> = qrcode.height)
			{
				scale = (qrcode.height - 1 - fromY) / (otherToY - fromY);
				otherToY = qrcode.height - 1;
			}
			otherToX = Math.floor (fromX + (otherToX - fromX) *) échelle);
			
			result + = this.sizeOfBlackWhiteBlackRun (fromX, fromY, otherToX, otherToY);
			résultat de retour - 1.0; // -1 parce que nous avons compté deux fois le pixel du milieu
		}
		

	
	this.calculateModuleSizeOneWay = function (pattern, otherPattern)
		{
			var moduleSizeEst1 = this.sizeOfBlackWhiteBlackRunBothWays (Math.floor (pattern.X), Math.floor (pattern.Y), Math.floor (otherPattern.X), Math.floor (otherPattern.Y));
			var moduleSizeEst2 = this.sizeOfBlackWhiteBlackRunBothWays (Math.floor (otherPattern.X), Math.floor (otherPattern.Y), Math.floor (pattern.X), Math.floor (pattern.Y));
			si (isNaN (moduleSizeEst1))
			{
				renvoyer moduleSizeEst2 / 7.0;
			}
			si (isNaN (moduleSizeEst2))
			{
				renvoyer moduleSizeEst1 / 7.0;
			}
			// les moyenne, et divise par 7 puisque nous avons compté la largeur de 3 modules noirs,
			// et 1 module blanc et 1 module noir de chaque côté. Ergo, divise la somme par 14.
			return (moduleSizeEst1 + moduleSizeEst2) / 14.0;
		}

	
	this.calculateModuleSize = function (topLeft, topRight, bottomLeft)
		{
			// Prenez la moyenne
			return (this.calculateModuleSizeOneWay (topLeft, topRight) + this.calculateModuleSizeOneWay (topLeft, bottomLeft)) / 2.0;
		}

	this.distance = function (pattern1, pattern2)
	{
		xDiff = pattern1.X - pattern2.X;
		yDiff = pattern1.Y - pattern2.Y;
		renvoyer Math.sqrt ((xDiff * xDiff + yDiff * yDiff));
	}
	this.computeDimension = function (topLeft, topRight, bottomLeft, moduleSize)
		{
			
			var tltrCentersDimension = Math.round (this.distance (topLeft, topRight) / moduleSize);
			var tlblCentersDimension = Math.round (this.distance (topLeft, bottomLeft) / moduleSize);
			var dimension = ((tltrCentersDimension + tlblCentersDimension) >> 1) + 7;
			switch (dimension & 0x03)
			{
				
				// mod 4
				cas 0: 
					dimension ++;
					Pause;
					// 1? ne fais rien
				
				cas 2: 
					dimension--;
					Pause;
				
				cas 3: 
					lancer "Erreur";
				}
			dimension de retour
		}

	this.findAlignmentInRegion = function (globalEstModuleSize, EstAlignmentX, EstAlignmentY, allocationFactor)
		{
			// Cherchez un motif d’alignement (3 modules en taille) autour
			// devrait être
			var allocation = Math.floor (allowFactor * overallEstModuleSize);
			var alignmentAreaLeftX = Math.max (0, estAlignmentX - allocation);
			var alignmentAreaRightX = Math.min (qrcode.width - 1, estAlignmentX + allocation);
			if (alignmentAreaRightX - alignmentAreaLeftX <globalEstModuleSize * 3)
			{
				lancer "Erreur";
			}
			
			var alignmentAreaTopY = Mat h.max (0, estAlignmentY - allocation);
			var alignmentAreaBottomY = Math.min (qrcode.height - 1, estAlignmentY + allocation);
			
			var alignmentFinder = new AlignmentPatternFinder (this.image, alignmentAreaLeftX, alignmentAreaTopY, alignmentAreaRightX - alignmentAreaLeftX, alignmentAreaBottomY - alignmentAreaTopY, overallEstModuleSize, this.resultPointCallback);
			renvoyer alignmentFinder.find ();
		}
		
	this.createTransform = function (topLeft, topRight, bottomLeft, alignmentPattern, dimension)
		{
			var dimMinusThree = dimension - 3.5;
			var bottomRightX;
			var bottomRightY;
			var sourceBottomRightX;
			var sourceBottomRightY;
			if (alignmentPattern! = null)
			{
				bottomRightX = alignmentPattern.X;
				bottomRightY = alignmentPattern.Y;
				sourceBottomRightX = sourceBottomRightY = dimMinusThree - 3.0;
			}
			autre
			{
				// N'a pas de motif d'alignement, fais juste le point en bas à droite
				bottomRightX = (topRight.X - topLeft.X) + bottomLeft.X;
				bottomRightY = (topRight.Y - topLeft.Y) + bottomLeft.Y;
				sourceBottomRightX = sourceBottomRightY = dimMinusThree;
			}
			
			var = PerspectiveTransform.quadrilateralToQuadrilateral transformer (3.5, 3.5, dimMinusThree, 3.5, sourceBottomRightX, sourceBottomRightY, 3.5, dimMinusThree, topLeft.X, topLeft.Y, topRight.X, topRight.Y, bottomRightX, bottomRightY, bottomLeft.X, bottomLeft.Y );
			
			retourner la transformation;
		}		
	
	this.sampleGrid = fonction (image, transformation, dimension)
		{
			
			var sampler = GridSampler;
			retourne sampler.sampleGrid3 (image, dimension, transform);
		}
	
	this.processFinderPatternInfo = fonction (info)
		{
			
			var topLeft = info.TopLeft;
			var topRight = info.TopRight;
			var bottomLeft = info.BottomLeft;
			
			var moduleSize = this.calculateModuleSize (topLeft, topRight, bottomLeft);
			if (moduleSize <1.0)
			{
				lancer "Erreur";
			}
			var dimension = this.computeDimension (topLeft, topRight, bottomLeft, moduleSize);
			var provisoireVersion = Version.getProvisionalVersionForDimension (dimension);
			var modulesBetweenFPCenters = provisoireVersion.DimensionForVersion - 7;
			
			var alignmentPattern = null;
			// Tout ce qui est au-dessus de la version 1 a un motif d'alignement
			if (provisoireVersion.AlignmentPatternCenters.length> 0)
			{
				
				// Devinez où un motif de recherche "en bas à droite" aurait été
				var bottomRightX = topRight.X - topLeft.X + bottomLeft.X;
				var bottomRightY = topRight.Y - topLeft.Y + bottomLeft.Y;
				
				// Estimer que le motif d'alignement est plus proche de 3 modules
				// de "en bas à droite" à l'emplacement supérieur gauche connu
				var correctionToTopLeft = 1,0 - 3,0 / modulesBetweenFPCenters;
				var estAlignmentX = Math.floor (topLeft.X + correctionToTopLeft * (bottomRightX - topLeft.X));
				var estAlignmentY = Math.floor (topLeft.Y + correctionToTopLeft * (bottomRightY - topLeft.Y));
				
				// Type d'arbitraire - étendre le rayon de recherche avant d'abandonner
				pour (var i = 4; i <= 16; i << = 1)
				{
					//essayer
					// {
						alignmentPattern = this.findAlignmentInRegion (moduleSize, estAlignmentX, estAlignmentY, i);
						Pause;
					//}
					// attraper (re)
					// {
						// essayer le prochain tour
					//}
				}
				// Si nous n’avons pas trouvé de motif d’alignement
			}
			
			var transform = this.createTransform (topLeft, topRight, bottomLeft, alignmentPattern, dimension);
			
			var bits = this.sampleGrid (this.image, transformer, dimension);
			
			points de var
			if (alignmentPattern == null)
			{
				points = new Array (bottomLeft, topLeft, topRight);
			}
			autre
			{
				points = new Array (bottomLeft, topLeft, topRight, alignmentPattern);
			}
			retourne le nouveau DetectorResult (bits, points);
		}
		

	
	this.detect = function ()
	{
		var info = new FinderPatternFinder (). findFinderPattern (this.image);
			
		retourne this.processFinderPatternInfo (info); 
	}
}
/ *
  Porté en JavaScript par Lazar Laszlo 2011 
  
  lazarsoft@gmail.com, www.lazarsoft.info
  
* /

/ *
*
* Copyright 2007 auteurs ZXing
*
* Sous licence Apache, Version 2.0 (la "Licence");
* vous ne pouvez pas utiliser ce fichier sauf en conformité avec la licence.
* Vous pouvez obtenir une copie de la licence à
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Sauf si requis par la loi applicable ou accepté par écrit, logiciel
* distribué sous la licence est distribué sur une base "tel quel",
* SANS GARANTIE OU CONDITION D'AUCUNE SORTE, expresse ou implicite.
* Voir la licence pour la langue spécifique régissant les autorisations et
* limitations en vertu de la licence.
* /


var FORMAT_INFO_MASK_QR = 0x5412;
var FORMAT_INFO_DECODE_LOOKUP = nouveau tableau (nouveau tableau (0x5412, 0x00), nouveau tableau (0x5125, 0x01), nouveau tableau (0x5E7C, 0x02), nouveau tableau (0x5B4B, 0x03), nouveau tableau (0x45F9, 0x04), nouveau tableau (0x40CE) , 0x05), nouveau tableau (0x4F97, 0x06), nouveau tableau (0x4AA0, 0x07), nouveau tableau (0x77C4, 0x08), nouveau tableau (0x72F3, 0x09), nouveau tableau (0x7DAA, 0x0A), nouveau tableau (0x789D, 0x0B) ), nouveau tableau (0x662F, 0x0C), nouveau tableau (0x6318, 0x0D), nouveau tableau (0x6C41, 0x0E), nouveau tableau (0x6976, 0x0F), nouveau tableau (0x1689, 0x10), nouveau tableau (0x13BE, 0x11), nouveau tableau (0x1CE7, 0x12), nouveau tableau (0x19D0, 0x13), nouveau tableau (0x0762, 0x14), nouveau tableau (0x0255, 0x15), nouveau tableau (0x0D0C, 0x16), nouveau tableau (0x083B, 0x17), nouveau tableau (0x355F, 0x18), nouveau tableau (0x3068, 0x19), nouveau tableau (0x3F31, 0x1A), nouveau tableau (0x3A06, 0x1B), nouveau tableau (0x24B4, 0x1C), nouveau tableau (0x2183, 0x1D), nouveau tableau (0x2EDA) , 0x1E), nouveau tableau (0x2BED, 0x1F));
var BITS_SET_IN_HALF_BYTE = new Array (0, 1, 1, 2, 1, 2, 2, 3, 1, 2, 2, 3, 2, 3, 4);


fonction FormatInformation (formatInfo)
{
	this.errorCorrectionLevel = ErrorCorrectionLevel.forBits ((formatInfo >> 3) & 0x03);
	this.dataMask = (formatInfo & 0x07);

	this .__ defineGetter __ ("ErrorCorrectionLevel", function ()
	{
		retourne this.errorCorrectionLevel;
	})
	this .__ defineGetter __ ("DataMask", function ()
	{
		renvoyer this.dataMask;
	})
	this.GetHashCode = function ()
	{
		return (this.errorCorrectionLevel.ordinal () << 3) | masque de données;
	}
	this.Equals = function (o)
	{
		var autre = o;
		return this.errorCorrectionLevel == other.errorCorrectionLevel && this.dataMask == other.dataMask;
	}
}

FormatInformation.numBitsDiffering = function (a, b)
{
	a ^ = b; // a maintenant un bit exactement où son bit diffère avec b
	// Nombre de bits défini rapidement avec une série de recherches:
	retourne BITS_SET_IN_HALF_BYTE [a & 0x0F] + BITS_SET_IN_HALF_BYTE [(URShift (a, 4) & 0x0F)] + BITS_SET_IN_HALF_BYTE [(URShift (a, 8) & 0x0F)] + BITS_SET_IN_HALF_BYTE [(URShift (a, 12) & 0x0F)] + BITS_SET_IN_HALF_BYTE [(URShift (a, 16) & 0x0F)] + BITS_SET_IN_HALF_BYTE [(URShift (a, 20) & 0x0F)] + BITS_SET_IN_HALF_BYTE [(URShift (a, 24) & 0x0F)] + BITS_SET_IN_HALF_BYTE [(URShift (a, 28 ) & 0x0F)];
}

FormatInformation.decodeFormatInformation = function (maskedFormatInfo)
{
	var formatInfo = FormatInformation.doDecodeFormatInformation (maskedFormatInfo);
	if (formatInfo! = null)
	{
		retourner le formatInfo;
	}
	// Doit renvoyer null, mais certains codes QR semblent
	// ne masque pas cette information. Réessayez en masquant le motif
	// premier
	retourne FormatInformation.doDecodeFormatInformation (maskedFormatInfo ^ FORMAT_INFO_MASK_QR);
}
FormatInformation.doDecodeFormatInformation = function (maskedFormatInfo)
{
	// Trouve l'int dans FORMAT_INFO_DECODE_LOOKUP avec le moins de bits différents
	var bestDifference = 0xffffffff;
	var bestFormatInfo = 0;
	pour (var i = 0; i <FORMAT_INFO_DECODE_LOOKUP.length; i ++)
	{
		var decodeInfo = FORMAT_INFO_DECODE_LOOKUP [i];
		var targetInfo = decodeInfo [0];
		if (targetInfo == maskedFormatInfo)
		{
			// Trouve une correspondance exacte
			renvoie new FormatInformation (decodeInfo [1]);
		}
		var bitsDifference = this.numBitsDiffering (maskedFormatInfo, targetInfo);
		if (bitsDifference <bestDifference)
		{
			bestFormatInfo = decodeInfo [1];
			bestDifference = bitsDifference;
		}
	}
	// La distance de Hamming des 32 codes masqués est de 7, par construction, donc <= 3 bits
	// Différent signifie que nous avons trouvé un match
	si (bestDifference <= 3)
	{
		renvoyer nouveau FormatInformation (bestFormatInfo);
	}
	retourne null;
}
/ *
  Porté en JavaScript par Lazar Laszlo 2011 
  
  lazarsoft@gmail.com, www.lazarsoft.info
  
* /

/ *
*
* Copyright 2007 auteurs ZXing
*
* Sous licence Apache, Version 2.0 (la "Licence");
* vous ne pouvez pas utiliser ce fichier sauf en conformité avec la licence.
* Vous pouvez obtenir une copie de la licence à
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Sauf si requis par la loi applicable ou accepté par écrit, logiciel
* distribué sous la licence est distribué sur une base "tel quel",
* SANS GARANTIE OU CONDITION D'AUCUNE SORTE, expresse ou implicite.
* Voir la licence pour la langue spécifique régissant les autorisations et
* limitations en vertu de la licence.
* /


function ErrorCorrectionLevel (ordinal, bits, nom)
{
	this.ordinal_Renamed_Field = ordinal;
	this.bits = bits;
	this.name = nom;
	this .__ defineGetter __ ("Bits", function ()
	{
		renvoyer this.bits;
	})
	this .__ defineGetter __ ("Name", function ()
	{
		retourne ce.name;
	})
	this.ordinal = function ()
	{
		retourne this.ordinal_Renamed_Field;
	}
}

ErrorCorrectionLevel.forBits = fonction (bits)
{
	if (bits <0 || bits> = FOR_BITS.length)
	{
		lancer "ArgumentException";
	}
	retourne FOR_BITS [bits];
}

var L = new ErrorCorrectionLevel (0, 0x01, "L");
var M = new ErrorCorrectionLevel (1, 0x00, "M");
var Q = new ErrorCorrectionLevel (2, 0x03, "Q");
var H = new ErrorCorrectionLevel (3, 0x02, "H");
var FOR_BITS = new Array (M, L, H, Q);
/ *
  Porté en JavaScript par Lazar Laszlo 2011 
  
  lazarsoft@gmail.com, www.lazarsoft.info
  
* /

/ *
*
* Copyright 2007 auteurs ZXing
*
* Sous licence Apache, Version 2.0 (la "Licence");
* vous ne pouvez pas utiliser ce fichier sauf en conformité avec la licence.
* Vous pouvez obtenir une copie de la licence à
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Sauf si requis par la loi applicable ou accepté par écrit, logiciel
* distribué sous la licence est distribué sur une base "tel quel",
* SANS GARANTIE OU CONDITION D'AUCUNE SORTE, expresse ou implicite.
* Voir la licence pour la langue spécifique régissant les autorisations et
* limitations en vertu de la licence.
* /


fonction BitMatrix (largeur, hauteur)
{
	si (! hauteur)
		height = width;
	if (width <1 || height <1)
	{
		jet "Les deux dimensions doivent être supérieures à 0";
	}
	this.width = width;
	this.height = height;
	var rowSize = width >> 5;
	if ((width & 0x1f)! = 0)
	{
		rowSize ++;
	}
	this.rowSize = rowSize;
	this.bits = new Array (rowSize * height);
	pour (var i = 0; i <this.bits.length; i ++)
		this.bits [i] = 0;
	
	this .__ defineGetter __ ("Width", function ()
	{
		renvoie this.width;
	})
	this .__ defineGetter __ ("Height", function ()
	{
		retourne ceci.
	})
	this .__ defineGetter __ ("Dimension", function ()
	{
		if (this.width! = this.height)
		{
			jet "Ne peut pas appeler getDimension () sur une matrice non carrée";
		}
		renvoie this.width;
	})
	
	this.get_Renamed = function (x, y)
		{
			var offset = y * this.rowSize + (x >> 5);
			return ((URShift (this.bits [offset], (x & 0x1f))) & 1)! = 0;
		}
	this.set_Renamed = function (x, y)
		{
			var offset = y * this.rowSize + (x >> 5);
			this.bits [offset] | = 1 << (x & 0x1f);
		}
	this.flip = function (x, y)
		{
			var offset = y * this.rowSize + (x >> 5);
			this.bits [offset] ^ = 1 << (x & 0x1f);
		}
	this.clear = function ()
		{
			var max = this.bits.length;
			pour (var i = 0; i <max; i ++)
			{
				this.bits [i] = 0;
			}
		}
	this.setRegion = function (gauche, haut, largeur, hauteur)
		{
			if (top <0 || laissé <0)
			{
				lancer "La gauche et le haut doivent être non négatifs";
			}
			if (height <1 || width <1)
			{
				jet "La hauteur et la largeur doivent être d'au moins 1";
			}
			var droite = gauche + largeur;
			var bottom = top + height;
			if (bottom> this.height || right> this.width)
			{
				jeter "La région doit tenir dans la matrice";
			}
			for (var y = top; y <bottom; y ++)
			{
				var offset = y * this.rowSize;
				pour (var x = left; x <right; x ++)
				{
					this.bits [offset + (x >> 5)] | = 1 << (x & 0x1f);
				}
			}
		}
}
/ *
  Porté en JavaScript par Lazar Laszlo 2011 
  
  lazarsoft@gmail.com, www.lazarsoft.info
  
* /

/ *
*
* Copyright 2007 auteurs ZXing
*
* Sous licence Apache, Version 2.0 (la "Licence");
* vous ne pouvez pas utiliser ce fichier sauf en conformité avec la licence.
* Vous pouvez obtenir une copie de la licence à
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Sauf si requis par la loi applicable ou accepté par écrit, logiciel
* distribué sous la licence est distribué sur une base "tel quel",
* SANS GARANTIE OU CONDITION D'AUCUNE SORTE, expresse ou implicite.
* Voir la licence pour la langue spécifique régissant les autorisations et
* limitations en vertu de la licence.
* /


function DataBlock (numDataCodewords, mots de code)
{
	this.numDataCodewords = numDataCodewords;
	this.codewords = mots de passe;
	
	this .__ defineGetter __ ("NumDataCodewords", function ()
	{
		retourne this.numDataCodewords;
	})
	this .__ defineGetter __ ("Codewords", function ()
	{
		renvoyer ces mots-clés;
	})
}	
	
DataBlock.getDataBlocks = function (rawCodewords, version, ecLevel)
{
	
	if (rawCodewords.length! = version.TotalCodewords)
	{
		lancer "ArgumentException";
	}
	
	// Détermine le nombre et la taille des blocs de données utilisés par cette version et
	// niveau de correction d'erreur
	var ecBlocks = version.getECBlocksForLevel (ecLevel);
	
	// Compter d'abord le nombre total de blocs de données
	var totalBlocks = 0;
	var ecBlockArray = ecBlocks.getECBlocks ();
	pour (var i = 0; i <ecBlockArray.length; i ++)
	{
		totalBlocks + = ecBlockArray [i] .Count;
	}
	
	// Maintenant, établissez DataBlocks avec la taille et le nombre de mots de données appropriés
	var result = new Array (totalBlocks);
	var numResultBlocks = 0;
	pour (var j = 0; j <ecBlockArray.length; j ++)
	{
		var ecBlock = ecBlockArray [j];
		pour (var i = 0; i <ecBlock.Count; i ++)
		{
			var numDataCodewords = ecBlock.DataCodewords;
			var numBlockCodewords = ecBlocks.ECCodewordsPerBlock + numDataCodewords;
			result [numResultBlocks ++] = new DataBlock (numDataCodewords, new Array (numBlockCodewords));
		}
	}
	
	// Tous les blocs ont la même quantité de données, sauf que le dernier n
	// (où n peut être 0) a 1 octet supplémentaire. Déterminez où cela commence.
	var courtesBlocksTotalCodewords = result [0] .codewords.length;
	var longerBlocksStartAt = result.length - 1;
	while (longerBlocksStartAt> = 0)
	{
		var numCodewords = result [longerBlocksStartAt] .codewords.length;
		if (numCodewords == abrégéBlocksTotalCodewords)
		{
			Pause;
		}
		longerBlocksStartAt--;
	}
	longerBlocksStartAt ++;
	
	var abrégéBlocksNumDataCodewords = shortBlocksTotalCodewords - ecBlocks.ECCodewordsPerBlock;
	// Les derniers éléments du résultat peuvent être 1 élément plus long;
	// d'abord remplir autant d'éléments que tous ont
	var rawCodewordsOffset = 0;
	pour (var i = 0; i <shortBlocksNumDataCodewords; i ++)
	{
		pour (var j = 0; j <numResultBlocks; j ++)
		{
			result [j] .codewords [i] = rawCodewords [rawCodewordsOffset ++];
		}
	}
	// Remplir le dernier bloc de données dans les plus longs
	for (var j = longerBlocksStartAt; j <numResultBlocks; j ++)
	{
		result [j] .codewords [courtesBlocksNumDataCodewords] = rawCodewords [rawCodewordsOffset ++];
	}
	// Maintenant, ajoutez les blocs de correction d'erreur
	var max = result [0] .codewords.length;
	for (var i = courtesBlocksNumDataCodewords; i <max; i ++)
	{
		pour (var j = 0; j <numResultBlocks; j ++)
		{
			var iOffset = j <longerBlocksStartAt? i: i + 1;
			result [j] .codewords [iOffset] = rawCodewords [rawCodewordsOffset ++];
		}
	}
	résultat de retour;
}
/ *
  Porté en JavaScript par Lazar Laszlo 2011 
  
  lazarsoft@gmail.com, www.lazarsoft.info
  
* /

/ *
*
* Copyright 2007 auteurs ZXing
*
* Sous licence Apache, Version 2.0 (la "Licence");
* vous ne pouvez pas utiliser ce fichier sauf en conformité avec la licence.
* Vous pouvez obtenir une copie de la licence à
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Sauf si requis par la loi applicable ou accepté par écrit, logiciel
* distribué sous la licence est distribué sur une base "tel quel",
* SANS GARANTIE OU CONDITION D'AUCUNE SORTE, expresse ou implicite.
* Voir la licence pour la langue spécifique régissant les autorisations et
* limitations en vertu de la licence.
* /


fonction BitMatrixParser (bitMatrix)
{
	var dimension = bitMatrix.Dimension;
	if (dimension <21 || (dimension & 0x03)! = 1)
	{
		lancer "Erreur BitMatrixParser";
	}
	this.bitMatrix = bitMatrix;
	this.parsedVersion = null;
	this.parsedFormatInfo = null;
	
	this.copyBit = function (i, j, versionBits)
	{
		return this.bitMatrix.get_Renamed (i, j)? (versionBits << 1) | 0x1: versionBits << 1;
	}
	
	this.readFormatInformation = function ()
	{
			if (this.parsedFormatInfo! = null)
			{
				retourne this.parsedFormatInfo;
			}
			
			// Lire les bits d'information du format en haut à gauche
			var formatInfoBits = 0;
			pour (var i = 0; i <6; i ++)
			{
				formatInfoBits = this.copyBit (i, 8, formatInfoBits);
			}
			// .. et saute un peu dans le schéma de synchronisation ...
			formatInfoBits = this.copyBit (7, 8, formatInfoBits);
			formatInfoBits = this.copyBit (8, 8, formatInfoBits);
			formatInfoBits = this.copyBit (8, 7, formatInfoBits);
			// .. et saute un peu dans le schéma de synchronisation ...
			pour (var j = 5; j> = 0; j--)
			{
				formatInfoBits = this.copyBit (8, j, formatInfoBits);
			}
			
			this.parsedFormatInfo = FormatInformation.decodeFormatInformation (formatInfoBits);
			if (this.parsedFormatInfo! = null)
			{
				retourne this.parsedFormatInfo;
			}
			
			// Hmm, a échoué. Essayez le motif en haut à droite / en bas à gauche
			var dimension = this.bitMatrix.Dimension;
			formatInfoBits = 0;
			var iMin = dimension - 8;
			pour (var i = dimension - 1; i> = iMin; i--)
			{
				formatInfoBits = this.copyBit (i, 8, formatInfoBits);
			}
			for (var j = dimension - 7; j <dimension; j ++)
			{
				formatInfoBits = this.copyBit (8, j, formatInfoBits);
			}
			
			this.parsedFormatInfo = FormatInformation.decodeFormatInformation (formatInfoBits);
			if (this.parsedFormatInfo! = null)
			{
				retourne this.parsedFormatInfo;
			}
			lancer "Erreur readFormatInformation";	
	}
	this.readVersion = function ()
		{
			
			if (this.parsedVersion! = null)
			{
				retourner this.parsedVersion;
			}
			
			var dimension = this.bitMatrix.Dimension;
			
			var provisoireVersion = (dimension - 17) >> 2;
			if (provisoireVersion <= 6)
			{
				retourne Version.getVersionForNumber (provisoireVersion);
			}
			
			// Lire les informations de version en haut à droite: 3 en largeur par 6 en hauteur
			var versionBits = 0;
			var ijMin = dimension - 11;
			pour (var j = 5; j> = 0; j--)
			{
				pour (var i = dimension - 9; i> = ijMin; i--)
				{
					versionBits = this.copyBit (i, j, versionBits);
				}
			}
			
			this.parsedVersion = Version.decodeVersionInformation (versionBits);
			if (this.parsedVersion! = null && this.parsedVersion.DimensionForVersion == dimension)
			{
				retourner this.parsedVersion;
			}
			
			// Hmm, a échoué. Essayez en bas à gauche: 6 de large par 3 de haut
			versionBits = 0;
			pour (var i = 5; i> = 0; i--)
			{
				pour (var j = dimension - 9; j> = ijMin; j--)
				{
					versionBits = this.copyBit (i, j, versionBits);
				}
			}
			
			this.parsedVersion = Version.decodeVersionInformation (versionBits);
			if (this.parsedVersion! = null && this.parsedVersion.DimensionForVersion == dimension)
			{
				retourner this.parsedVersion;
			}
			lancer "Erreur readVersion";
		}
	this.readCodewords = function ()
		{
			
			var FormatInfo = this.readFormatInformation ();
			var version = this.readVersion ();
			
			// Récupère le masque de données pour le format utilisé dans ce QR Code. Cela exclura
			// quelques bits de lecture lorsque nous parcourons la matrice de bits.
			var dataMask = DataMask.forReference (formatInfo.DataMask);
			var dimension = this.bitMatrix.Dimension;
			dataMask.unmaskBitMatrix (this.bitMatrix, dimension);
			
			var functionPattern = version.buildFunctionPattern ();
			
			var readingUp = true;
			var result = new Array (version.TotalCodewords);
			var resultOffset = 0;
			var currentByte = 0;
			var bitsRead = 0;
			// Lire les colonnes par paires, de droite à gauche
			pour (var j = dimension - 1; j> 0; j - = 2)
			{
				si (j == 6)
				{
					// Ignorer la colonne entière avec le motif d'alignement vertical;
					// économise du temps et rend l’autre code plus propre
					j--
				}
				// Lire alternativement de bas en haut puis de haut en bas
				for (var count = 0; count <dimension; count ++)
				{
					var i = readingUp? dimension - 1 - count: count;
					for (var col = 0; col <2; col ++)
					{
						// Ignore les bits couverts par le motif de fonction
						if (! functionPattern.get_Renamed (j - col, i))
						{
							// Lire un peu
							bitsRead ++;
							currentByte << = 1;
							if (this.bitMatrix.get_Renamed (j - col, i))
							{
								currentByte | = 1;
							}
							// Si nous avons fait un octet entier, enregistrez-le
							if (bitsRead == 8)
							{
								resultat [resultOffset ++] = currentByte;
								bitsRead = 0;
								currentByte = 0;
							}
						}
					}
				}
				readUp ^ = true; // readingUp =! readingUp; // changer de direction
			}
			if (resultOffset! = version.TotalCodewords)
			{
				lancer "Erreur readCodewords";
			}
			résultat de retour;
		}
}
/ *
  Porté en JavaScript par Lazar Laszlo 2011 
  
  lazarsoft@gmail.com, www.lazarsoft.info
  
* /

/ *
*
* Copyright 2007 auteurs ZXing
*
* Sous licence Apache, Version 2.0 (la "Licence");
* vous ne pouvez pas utiliser ce fichier sauf en conformité avec la licence.
* Vous pouvez obtenir une copie de la licence à
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Sauf si requis par la loi applicable ou accepté par écrit, logiciel
* distribué sous la licence est distribué sur une base "tel quel",
* SANS GARANTIE OU CONDITION D'AUCUNE SORTE, expresse ou implicite.
* Voir la licence pour la langue spécifique régissant les autorisations et
* limitations en vertu de la licence.
* /


DataMask = {};

DataMask.forReference = fonction (référence)
{
	if (référence <0 || référence> 7)
	{
		lancer "System.ArgumentException";
	}
	retourne DataMask.DATA_MASKS [référence];
}

function DataMask000 ()
{
	this.unmaskBitMatrix = fonction (bits, dimension)
	{
		pour (var i = 0; i <dimension; i ++)
		{
			pour (var j = 0; j <dimension; j ++)
			{
				si (this.isMasked (i, j))
				{
					bits.flip (j, i);
				}
			}
		}
	}
	this.isMasked = function (i, j)
	{
		return ((i + j) & 0x01) == 0;
	}
}

fonction DataMask001 ()
{
	this.unmaskBitMatrix = fonction (bits, dimension)
	{
		pour (var i = 0; i <dimension; i ++)
		{
			pour (var j = 0; j <dimension; j ++)
			{
				si (this.isMasked (i, j))
				{
					bits.flip (j, i);
				}
			}
		}
	}
	this.isMasked = function (i, j)
	{
		return (i & 0x01) == 0;
	}
}

fonction DataMask010 ()
{
	this.unmaskBitMatrix = fonction (bits, dimension)
	{
		pour (var i = 0; i <dimension; i ++)
		{
			pour (var j = 0; j <dimension; j ++)
			{
				si (this.isMasked (i, j))
				{
					bits.flip (j, i);
				}
			}
		}
	}
	this.isMasked = function (i, j)
	{
		return j% 3 == 0;
	}
}

fonction DataMask011 ()
{
	this.unmaskBitMatrix = fonction (bits, dimension)
	{
		pour (var i = 0; i <dimension; i ++)
		{
			pour (var j = 0; j <dimension; j ++)
			{
				si (this.isMasked (i, j))
				{
					bits.flip (j, i);
				}
			}
		}
	}
	this.isMasked = function (i, j)
	{
		return (i + j)% 3 == 0;
	}
}

fonction DataMask100 ()
{
	this.unmaskBitMatrix = fonction (bits, dimension)
	{
		pour (var i = 0; i <dimension; i ++)
		{
			pour (var j = 0; j <dimension; j ++)
			{
				si (this.isMasked (i, j))
				{
					bits.flip (j, i);
				}
			}
		}
	}
	this.isMasked = function (i, j)
	{
		return (((URShift (i, 1)) + (j / 3)) & 0x01) == 0;
	}
}

fonction DataMask101 ()
{
	this.unmaskBitMatrix = fonction (bits, dimension)
	{
		pour (var i = 0; i <dimension; i ++)
		{
			pour (var j = 0; j <dimension; j ++)
			{
				si (this.isMasked (i, j))
				{
					bits.flip (j, i);
				}
			}
		}
	}
	this.isMasked = function (i, j)
	{
		var temp = i * j;
		return (temp & 0x01) + (temp% 3) == 0;
	}
}

fonction DataMask110 ()
{
	this.unmaskBitMatrix = fonction (bits, dimension)
	{
		pour (var i = 0; i <dimension; i ++)
		{
			pour (var j = 0; j <dimension; j ++)
			{
				si (this.isMasked (i, j))
				{
					bits.flip (j, i);
				}
			}
		}
	}
	this.isMasked = function (i, j)
	{
		var temp = i * j;
		return (((temp & 0x01) + (temp% 3)) & 0x01) == 0;
	}
}
fonction DataMask111 ()
{
	this.unmaskBitMatrix = fonction (bits, dimension)
	{
		pour (var i = 0; i <dimension; i ++)
		{
			pour (var j = 0; j <dimension; j ++)
			{
				si (this.isMasked (i, j))
				{
					bits.flip (j, i);
				}
			}
		}
	}
	this.isMasked = function (i, j)
	{
		return (((((i + j) & 0x01) + ((i * j)% 3)) & 0x01) == 0;
	}
}

DataMask.DATA_MASKS = new Array (nouveau DataMask000 (), nouveau DataMask001 (), nouveau DataMask010 (), nouveau DataMask011 (), nouveau DataMask100 (), nouveau DataMask101 (), nouveau DataMask110 (), nouveau DataMask111 ());

/ *
  Porté en JavaScript par Lazar Laszlo 2011 
  
  lazarsoft@gmail.com, www.lazarsoft.info
  
* /

/ *
*
* Copyright 2007 auteurs ZXing
*
* Sous licence Apache, Version 2.0 (la "Licence");
* vous ne pouvez pas utiliser ce fichier sauf en conformité avec la licence.
* Vous pouvez obtenir une copie de la licence à
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Sauf si requis par la loi applicable ou accepté par écrit, logiciel
* distribué sous la licence est distribué sur une base "tel quel",
* SANS GARANTIE OU CONDITION D'AUCUNE SORTE, expresse ou implicite.
* Voir la licence pour la langue spécifique régissant les autorisations et
* limitations en vertu de la licence.
* /


fonction ReedSolomonDecoder (champ)
{
	this.field = champ;
	this.decode = function (reçu, deuxS)
	{
			var poly = new GF256Poly (this.field, received);
			var syndromeCoefficients = new Array (twoS);
			pour (var i = 0; i <syndromeCoefficients.length; i ++) syndromeCofficients [i] = 0;
			var dataMatrix = false; // this.field.Equals (GF256.DATA_MATRIX_FIELD);
			var noError = true;
			pour (var i = 0; i <twoS; i ++)
			{
				// Merci à sanfordsquires pour ce correctif:
				var eval = poly.evaluateAt (this.field.exp (dataMatrix? i + 1: i));
				syndromeCoefficients [syndromeCofficients.longueur - 1 - i] = eval;
				if (eval! = 0)
				{
					noError = false;
				}
			}
			if (noError)
			{
				revenir ;
			}
			syndrome var = nouveau GF256Poly (this.field, syndromeCoefficients);
			var sigmaOmega = this.runEuclideanAlgorithm (this.field.buildMonomial (twoS, 1), syndrome, twoS);
			var sigma = sigmaOmega [0];
			var omega = sigmaOmega [1];
			var errorLocations = this.findErrorLocations (sigma);
			var errorMagnitudes = this.findErrorMagnitudes (omega, errorLocations, dataMatrix);
			pour (var i = 0; i <errorLocations.length; i ++)
			{
				var position = received.length - 1 - this.field.log (erreursLocations [i]);
				si (position <0)
				{
					lancer "ReedSolomonException Bad error location";
				}
				received [position] = GF256.addOrSubtract (received [position], errorMagnitudes [i]);
			}
	}
	
	this.runEuclideanAlgorithm = fonction (a, b, R)
		{
			// Suppose que le degré est> = b's
			si (a.Degree <b.Degree)
			{
				var temp = a;
				a = b;
				b = temp;
			}
			
			var rLast = a;
			var r = b;
			var sLast = this.field.One;
			var s = this.field.Zero;
			var tLast = this.field.Zero;
			var t = this.field.One;
			
			// Exécuter l'algorithme euclidien jusqu'à ce que le degré de r soit inférieur à R / 2
			while (r.Degree> = Math.floor (R / 2))
			{
				var rLastLast = rLast;
				var sLastLast = sLast;
				var tLastLast = tLast;
				rLast = r;
				sLast = s;
				tLast = t;
				
				// Divise rLastLast par rLast, avec quotient dans q et reste dans r
				si (rLast.Zero)
				{
					// Oups, l'algorithme euclidien est déjà terminé?
					lancer "r_ {i-1} était nul";
				}
				r = rLastLast;
				var q = this.field.Zero;
				var denominatorLeadingTerm = rLast.getCoefficient (rLast.Degree);
				var dltInverse = this.field.inverse (denominatorLeadingTerm);
				while (r.Degree> = rLast.Degree &&! r.Zero)
				{
					var degreeDiff = r.Degree - rLast.Degree;
					var scale = this.field.multiply (r.getCoefficient (r.Degree), dltInverse);
					q = q.addOrSubtract (this.field.buildMonomial (degreeDiff, scale));
					r = r.addOrSubtract (rLast.multiplyByMonomial (degreeDiff, scale));
					//r.EXE ();
				}
				
				s = q.multiply1 (sLast) .addOrSubtract (sLastLast);
				t = q.multiply1 (tLast) .addOrSubtract (tLastLast);
			}
			
			var sigmaTildeAtZero = t.getCoefficient (0);
			si (sigmaTildeAtZero == 0)
			{
				lancer "ReedSolomonException sigmaTilde (0) était à zéro";
			}
			
			var inverse = this.field.inverse (sigmaTildeAtZero);
			var sigma = t.multiply2 (inverse);
			var omega = r.multiply2 (inverse);
			retourner le nouveau tableau (sigma, oméga);
		}
	this.findErrorLocations = function (errorLocator)
		{
			// Ceci est une application directe de la recherche de Chien
			var numErrors = errorLocator.Degree;
			if (numErrors == 1)
			{
				// raccourci
				retourne un nouveau tableau (errorLocator.getCoefficient (1));
			}
			var result = new Array (numErrors);
			var e = 0;
			pour (var i = 1; i <256 && e <numErrors; i ++)
			{
				if (errorLocator.evaluateAt (i) == 0)
				{
					result [e] = this.field.inverse (i);
					e ++;
				}
			}
			if (e! = numErrors)
			{
				throw "Le degré de localisation d'erreur ne correspond pas au nombre de racines";
			}
			résultat de retour;
		}
	this.findErrorMagnitudes = function (errorEvaluator, errorLocations, dataMatrix)
		{
			// Ceci applique directement la formule de Forney
			var s = errorLocations.length;
			var result = new Array (s);
			pour (var i = 0; i <s; i ++)
			{
				var xiInverse = this.field.inverse (errorLocations [i]);
				var dénominateur = 1;
				pour (var j = 0; j <s; j ++)
				{
					si (i! = j)
					{
						denominator = this.field.multiply (dénominateur, GF256.addOrSubtract (1, this.field.multiply (errorLocations [j], xiInverse)));
					}
				}
				result [i] = this.field.multiply (errorEvaluator.evaluateAt (xiInverse), this.field.inverse (dénominateur));
				// Merci à sanfordsquires pour ce correctif:
				if (dataMatrix)
				{
					result [i] = this.field.multiply (resultat [i], xiInverse);
				}
			}
			résultat de retour;
		}
}
/ *
  Porté en JavaScript par Lazar Laszlo 2011 
  
  lazarsoft@gmail.com, www.lazarsoft.info
  
* /

/ *
*
* Copyright 2007 auteurs ZXing
*
* Sous licence Apache, Version 2.0 (la "Licence");
* vous ne pouvez pas utiliser ce fichier sauf en conformité avec la licence.
* Vous pouvez obtenir une copie de la licence à
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Sauf si requis par la loi applicable ou accepté par écrit, logiciel
* distribué sous la licence est distribué sur une base "tel quel",
* SANS GARANTIE OU CONDITION D'AUCUNE SORTE, expresse ou implicite.
* Voir la licence pour la langue spécifique régissant les autorisations et
* limitations en vertu de la licence.
* /


fonction GF256Poly (champ, coefficients)
{
	if (coefficients == null || coefficients.length == 0)
	{
		lancer "System.ArgumentException";
	}
	this.field = champ;
	var coefficientsLength = coefficients.length;
	if (coefficientsLength> 1 && coefficients [0] == 0)
	{
		// Le terme principal doit être différent de zéro sauf pour le polynôme constant "0"
		var firstNonZero = 1;
		while (firstNonZero <coefficientsLength && coefficients [firstNonZero] == 0)
		{
			firstNonZero ++;
		}
		if (firstNonZero == coefficientsLength)
		{
			this.coefficients = field.Zero.coefficients;
		}
		autre
		{
			this.coefficients = new Array (coefficientsLength - firstNonZero);
			pour (var i = 0; i <this.coefficients.length; i ++) this.coefficients [i] = 0;
			//Array.Copy( coefficients, firstNonZero, this.coefficients, 0, this.coefficients.length);
			for (var ci = 0; ci <this.coefficients.length; ci ++) this.coefficients [ci] = coefficients [firstNonZero + ci];
		}
	}
	autre
	{
		this.coefficients = coefficients;
	}
	
	this .__ defineGetter __ ("Zero", function ()
	{
		retourner this.coefficients [0] == 0;
	})
	this .__ defineGetter __ ("Degree", function ()
	{
		retourner this.coefficients.length - 1;
	})
	this .__ defineGetter __ ("Coefficients", function ()
	{
		retourne ce.cofficients;
	})
	
	this.getCoefficient = function (degré)
	{
		retourne ce.cofficients [this.coefficients.length - 1 - degree];
	}
	
	this.evaluateAt = function (a)
	{
		si (a == 0)
		{
			// Renvoie juste le coefficient x ^ 0
			retourne this.getCoefficient (0);
		}
		var size = this.coefficients.length;
		si (a = 1)
		{
			// Juste la somme des coefficients
			var result = 0;
			pour (var i = 0; i <taille; i ++)
			{
				resultat = GF256.addOrSubtract (resultat, this.coefficients [i]);
			}
			résultat de retour;
		}
		var result2 = this.coefficients [0];
		pour (var i = 1; i <taille; i ++)
		{
			result2 = GF256.addOrSubtract (this.field.multiply (a, result2), this.coefficients [i]);
		}
		résultat de retour2;
	}
	
	this.addOrSubtract = function (autre)
		{
			if (this.field! = other.field)
			{
				lancer "GF256Polys n'a pas le même champ GF256";
			}
			si (this.Zero)
			{
				retourner autre chose;
			}
			si (autre.Zero)
			{
				retourne ceci;
			}
			
			var smallerCoefficients = this.coefficients;
			var largerCoefficients = other.coefficients;
			if (smallerCoefficients.length> largerCoefficients.length)
			{
				var temp = smallerCoefficients;
				SmallCoefficients = LargeCoefficients;
				largerCoefficients = temp;
			}
			var sumDiff = new Array (largerCoefficients.length);
			var lengthDiff = largerCoefficients.length - smallerCoefficients.length;
			// Copier les termes de haut niveau que l'on trouve uniquement dans les coefficients des polynômes de degré supérieur
			//Array.Copy(largerCoefficients, 0, sumDiff, 0, lengthDiff);
			for (var ci = 0; ci <lengthDiff; ci ++) sumDiff [ci] = largerCoefficients [ci];
			
			pour (var i = lengthDiff; i <largerCoefficients.length; i ++)
			{
				sumDiff [i] = GF256.addOrSubtract (plus petits caractères [i-lengthDiff], grands caractères [i]);
			}
			
			retourne le nouveau GF256Poly (champ, sumDiff);
	}
	this.multiply1 = function (autre)
		{
			if (this.field! = other.field)
			{
				lancer "GF256Polys n'a pas le même champ GF256";
			}
			if (this.Zero || other.Zero)
			{
				retourner this.field.Zero;
			}
			var aCoefficients = this.coefficients;
			var aLength = aCoefficients.length;
			var bCoefficients = other.coefficients;
			var bLength = bCoefficients.length;
			var product = new Array (aLength + bLength - 1);
			pour (var i = 0; i <aLength; i ++)
			{
				var aCoeff = aCoefficients [i];
				pour (var j = 0; j <bLength; j ++)
				{
					produit [i + j] = GF256.addOrSubtract (produit [i + j], this.field.multiply (aCoeff, bCoefficients [j]));
				}
			}
			retourne le nouveau GF256Poly (this.field, product);
		}
	this.multiply2 = fonction (scalaire)
		{
			if (scalaire == 0)
			{
				retourner this.field.Zero;
			}
			if (scalaire == 1)
			{
				retourne ceci;
			}
			var size = this.coefficients.length;
			var product = new Array (taille);
			pour (var i = 0; i <taille; i ++)
			{
				product [i] = this.field.multiply (this.coefficients [i], scalar);
			}
			retourne le nouveau GF256Poly (this.field, product);
		}
	this.multiplyByMonomial = fonction (degré, coefficient)
		{
			if (degré <0)
			{
				lancer "System.ArgumentException";
			}
			si (coefficient == 0)
			{
				retourner this.field.Zero;
			}
			var size = this.coefficients.length;
			var product = new Array (taille + degré);
			pour (var i = 0; i <product.length; i ++) produit [i] = 0;
			pour (var i = 0; i <taille; i ++)
			{
				produit [i] = this.field.multiply (this.coefficients [i], coefficient);
			}
			retourne le nouveau GF256Poly (this.field, product);
		}
	this.divide = function (autre)
		{
			if (this.field! = other.field)
			{
				lancer "GF256Polys n'a pas le même champ GF256";
			}
			si (autre.Zero)
			{
				lancer "Diviser par 0";
			}
			
			var quotient = this.field.Zero;
			var reste = this;
			
			var denominatorLeadingTerm = other.getCoefficient (other.Degree);
			var inverseDenominatorLeadingTerm = this.field.inverse (denominatorLeadingTerm);
			
			while (reste.Degree> = other.Degree &&! persistentder.Zero)
			{
				var degreeDifference = reste.Degree - other.Degree;
				var scale = this.field.multiply (reste.getCoefficient (reste.Degree), inverseDenominatorLeadingTerm);
				var term = other.multiplyByMonomial (degreeDifference, scale);
				var iterationQuotient = this.field.buildMonomial (degreeDifference, scale);
				quotient = quotient.addOrSubtract (iterationQuotient);
				reste = reste.addOrSubtract (terme);
			}
			
			retourne le nouveau tableau (quotient, reste);
		}
}
/ *
  Porté en JavaScript par Lazar Laszlo 2011 
  
  lazarsoft@gmail.com, www.lazarsoft.info
  
* /

/ *
*
* Copyright 2007 auteurs ZXing
*
* Sous licence Apache, Version 2.0 (la "Licence");
* vous ne pouvez pas utiliser ce fichier sauf en conformité avec la licence.
* Vous pouvez obtenir une copie de la licence à
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Sauf si requis par la loi applicable ou accepté par écrit, logiciel
* distribué sous la licence est distribué sur une base "tel quel",
* SANS GARANTIE OU CONDITION D'AUCUNE SORTE, expresse ou implicite.
* Voir la licence pour la langue spécifique régissant les autorisations et
* limitations en vertu de la licence.
* /


fonction GF256 (primitive)
{
	this.expTable = new Array (256);
	this.logTable = new Array (256);
	var x = 1;
	pour (var i = 0; i <256; i ++)
	{
		this.expTable [i] = x;
		x << = 1; // x = x * 2; nous supposons que le générateur alpha est 2
		if (x> = 0x100)
		{
			x ^ = primitive;
		}
	}
	pour (var i = 0; i <255; i ++)
	{
		this.logTable [this.expTable [i]] = i;
	}
	// logTable [0] == 0 mais cela ne devrait jamais être utilisé
	var at0 = new Array (1); at0 [0] = 0;
	this.zero = new GF256Poly (this, new Array (at0));
	var at1 = new Array (1); at1 [0] = 1;
	this.one = new GF256Poly (this, new Array (at1));
	
	this .__ defineGetter __ ("Zero", function ()
	{
		retourner this.zero;
	})
	this .__ defineGetter __ ("One", function ()
	{
		retourne ceci.one;
	})
	this.buildMonomial = fonction (degré, coefficient)
		{
			if (degré <0)
			{
				lancer "System.ArgumentException";
			}
			si (coefficient == 0)
			{
				retourner zéro;
			}
			var coefficients = new Array (degré + 1);
			pour (var i = 0; i <coefficients.longueur; i ++) coefficients [i] = 0;
			coefficients [0] = coefficient;
			retourne le nouveau GF256Poly (ce, coefficients);
		}
	this.exp = function (a)
		{
			retourne this.expTable [a];
		}
	this.log = function (a)
		{
			si (a == 0)
			{
				lancer "System.ArgumentException";
			}
			retourne this.logTable [a];
		}
	this.inverse = function (a)
		{
			si (a == 0)
			{
				lancer "System.ArithmeticException";
			}
			retourne this.expTable [255 - this.logTable [a]];
		}
	this.multiply = function (a, b)
		{
			if (a == 0 || b == 0)
			{
				retourne 0;
			}
			si (a = 1)
			{
				retourner b;
			}
			si (b == 1)
			{
				retourner un;
			}
			renvoyer this.expTable [(this.logTable [a] + this.logTable [b])% 255];
		}		
}

GF256.QR_CODE_FIELD = nouveau GF256 (0x011D);
GF256.DATA_MATRIX_FIELD = nouveau GF256 (0x012D);

GF256.addOrSubtract = function (a, b)
{
	retourne a ^ b;
}
/ *
  Porté en JavaScript par Lazar Laszlo 2011 
  
  lazarsoft@gmail.com, www.lazarsoft.info
  
* /

/ *
*
* Copyright 2007 auteurs ZXing
*
* Sous licence Apache, Version 2.0 (la "Licence");
* vous ne pouvez pas utiliser ce fichier sauf en conformité avec la licence.
* Vous pouvez obtenir une copie de la licence à
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Sauf si requis par la loi applicable ou accepté par écrit, logiciel
* distribué sous la licence est distribué sur une base "tel quel",
* SANS GARANTIE OU CONDITION D'AUCUNE SORTE, expresse ou implicite.
* Voir la licence pour la langue spécifique régissant les autorisations et
* limitations en vertu de la licence.
* /


Decoder = {};
Decoder.rsDecoder = new ReedSolomonDecoder (GF256.QR_CODE_FIELD);

Decoder.correctErrors = function (codewordBytes, numDataCodewords)
{
	var numCodewords = codewordBytes.length;
	// D'abord lu dans un tableau d'ints
	var codewordsInts = new Array (numCodewords);
	pour (var i = 0; i <numCodewords; i ++)
	{
		mots de passeInts [i] = codewordBytes [i] & 0xFF;
	}
	var numECCodewords = codewordBytes.length - numDataCodewords;
	essayer
	{
		Decoder.rsDecoder.decode (codewordsInts, numECCodewords);
		// var corrector = new ReedSolomon (codewordsInts, numECCodewords);
		//corrector.correct ();
	}
	attraper (rse)
	{
		jeter rse;
	}
	// Copie dans le tableau d'octets - il suffit de s'inquiéter des octets de données
	// Nous ne nous soucions pas des erreurs dans les mots de code de correction d'erreur
	pour (var i = 0; i <numDataCodewords; i ++)
	{
		codewordBytes [i] = mots de passeInts [i];
	}
}

Decoder.decode = function (bits)
{
	var parser = new BitMatrixParser (bits);
	var version = parser.readVersion ();
	var ecLevel = parser.readFormatInformation (). ErrorCorrectionLevel;
	
	// Lire les mots de passe
	var codewords = parser.readCodewords ();

	// Séparer en blocs de données
	var dataBlocks = DataBlock.getDataBlocks (mots de passe, version, ecLevel);
	
	// Compter le nombre total d'octets de données
	var totalBytes = 0;
	pour (var i = 0; i <dataBlocks.length; i ++)
	{
		totalBytes + = dataBlocks [i] .NumDataCodewords;
	}
	var resultBytes = new Array (totalBytes);
	var resultOffset = 0;
	
	// Correction d'erreur et copie des blocs de données dans un flux d'octets
	pour (var j = 0; j <dataBlocks.length; j ++)
	{
		var dataBlock = dataBlocks [j];
		var codewordBytes = dataBlock.Codewords;
		var numDataCodewords = dataBlock.NumDataCodewords;
		Decoder.correctErrors (codewordBytes, numDataCodewords);
		pour (var i = 0; i <numDataCodewords; i ++)
		{
			resultBytes [resultOffset ++] = codewordBytes [i];
		}
	}
	
	// Décode le contenu de ce flux d'octets
	var reader = new QRCodeDataBlockReader (resultBytes, version.VersionNumber, ecLevel.Bits);
	lecteur de retour;
	// retourne DecodedBitStreamParser.decode (resultBytes, version, ecLevel);
}
/ *
   Copyright 2011 Lazar Laszlo (lazarsoft@gmail.com, www.lazarsoft.info)
   
   Licence sous la licence Apache, version 2.0 (la "licence");
   vous ne pouvez utiliser ce fichier que conformément à la licence.
   Vous pouvez obtenir une copie de la licence à

       http://www.apache.org/licenses/LICENSE-2.0

   Sauf si requis par la loi applicable ou accepté par écrit, le logiciel
   distribué sous la licence est distribué sur une base "tel quel",
   SANS GARANTIE OU CONDITION D'AUCUNE SORTE, expresse ou implicite.
   Voir la licence pour la langue spécifique régissant les autorisations et
   limitations en vertu de la licence.
* /


qrcode = {};
qrcode.imagedata = null;
qrcode.width = 0;
qrcode.height = 0;
qrcode.qrCodeSymbol = null;
qrcode.debug = false;
qrcode.maxImgSize = 1024 * 1024;

qrcode.sizeOfDataLengthInfo = [[10, 9, 8, 8], [12, 11, 16, 10], [14, 13, 16, 12]];

qrcode.callback = null;

qrcode.decode = function (src) {
    
    if (arguments.length == 0)
    {
        var toile_qr = document.getElementById ("qr-canvas");
        var context = canvas_qr.getContext ('2d');
        qrcode.width = canvas_qr.width;
        qrcode.height = canvas_qr.height;
        qrcode.imagedata = context.getImageData (0, 0, qrcode.width, qrcode.height);
        qrcode.result = qrcode.process (context);
        if (qrcode.callback! = null)
            qrcode.callback (qrcode.result);
        retourne qrcode.result;
    }
    autre
    {
        var image = new Image ();
        image.crossOrigin = "Anonymous";
        image.onload = function () {
            // var toile_qr = document.getElementById ("qr-canvas");
            var toile_qr = document.createElement ('canvas');
            var context = canvas_qr.getContext ('2d');
            var nheight = image.height;
            var nwidth = image.width;
            if (image.width * image.height> qrcode.maxImgSize)
            {
                var ir = image.width / image.height;
                nheight = Math.sqrt (qrcode.maxImgSize / ir);
                nwidth = ir * nheight;
            }

            canvas_qr.width = nwidth;
            canvas_qr.height = nuit
            
            context.drawImage (image, 0, 0, canvas_qr.width, canvas_qr.height);
            qrcode.width = canvas_qr.width;
            qrcode.height = canvas_qr.height;
            essayer{
                qrcode.imagedata = context.getImageData (0, 0, canvas_qr.width, canvas_qr.height);
            } attraper (e) {
                qrcode.result = "La lecture d'images inter-domaines n'est pas prise en charge dans votre navigateur! Enregistrez-les sur votre ordinateur, puis faites glisser le fichier!";
                if (qrcode.callback! = null)
                    qrcode.callback (qrcode.result);
                revenir;
            }
            
            essayer
            {
                qrcode.result = qrcode.process (context);
            }
            attraper (e)
            {
                console.log (e);
                qrcode.result = "erreur de décodage du code QR";
            }
            if (qrcode.callback! = null)
                qrcode.callback (qrcode.result);
        }
        image.src = src;
    }
}

qrcode.isUrl = fonction (s)
{
    var regexp = / (ftp | http | https): \ / \ / (\ w +: {0,1} \ w * @)? (\ S +) (: [0-9] +)? (\ / | \ /([\w#!:.?+=&%@!\-\/]))?/;
    retourner regexp.test (s);
}

qrcode.decode_url = fonction (s)
{
  var escaped = "";
  essayer{
    échappé = évasion (s);
  }
  attraper (e)
  {
    console.log (e);
    échappé = s;
  }
  var ret = "";
  essayer{
    ret = decodeURIComponent (échappé);
  }
  attraper (e)
  {
    console.log (e);
    ret = échappé;
  }
  retourner ret;
}

qrcode.decode_utf8 = fonction (s)
{
    if (qrcode.isUrl (s))
        retourne qrcode.decode_url (s);
    autre
        résultats;
}

qrcode.process = function (ctx) {
    
    var start = new Date (). getTime ();

    var image = qrcode.grayScaleToBitmap (qrcode.grayscale ());
    // var image = qrcode.binarize (128);
    
    if (qrcode.debug)
    {
        pour (var y = 0; y <qrcode.height; y ++)
        {
            pour (var x = 0; x <qrcode.width; x ++)
            {
                var point = (x * 4) + (y * qrcode.width * 4);
                qrcode.imagedata.data [point] = image [x + y * qrcode.width]? 0: 0;
                qrcode.imagedata.data [point + 1] = image [x + y * qrcode.width]? 0: 0;
                qrcode.imagedata.data [point + 2] = image [x + y * qrcode.width]? 255: 0;
            }
        }
        ctx.putImageData (qrcode.imagedata, 0, 0);
    }
    
    // var finderPatternInfo = new FinderPatternFinder (). findFinderPattern (image);
    
    var detector = new Detector (image);

    var qRCodeMatrix = detector.detect ();
    
    / * pour (var y = 0; y <qRCodeMatrix.bits.Height; y ++)
    {
        pour (var x = 0; x <qRCodeMatrix.bits.Width; x ++)
        {
            var point = (x * 4 * 2) + (y * 2 * qrcode.width * 4);
            qrcode.imagedata.data [point] = qRCodeMatrix.bits.get_Renamed (x, y)? 0: 0;
            qrcode.imagedata.data [point + 1] = qRCodeMatrix.bits.get_Renamed (x, y)? 0: 0;
            qrcode.imagedata.data [point + 2] = qRCodeMatrix.bits.get_Renamed (x, y)? 255: 0;
        }
    } * /
    if (qrcode.debug)
        ctx.putImageData (qrcode.imagedata, 0, 0);
    
    var reader = Decoder.decode (qRCodeMatrix.bits);
    var data = reader.DataByte;
    var str = "";
    pour (var i = 0; i <data.length; i ++)
    {
        for (var j = 0; j <data [i] .length; j ++)
            str + = String.fromCharCode (données [i] [j]);
    }
    
    var end = new Date (). getTime ();
    var time = end - start;
    console.log (heure);
    
    retourne qrcode.decode_utf8 (str);
    alerte ("Time:" + time + "Code:" + str);
}

qrcode.getPixel = function (x, y) {
    if (qrcode.width <x) {
        jeter "erreur de point";
    }
    si (qrcode.height <y) {
        jeter "erreur de point";
    }
    point = (x * 4) + (y * qrcode.width * 4);
    p = (qrcode.imagedata.data [point] * 33 + qrcode.imagedata.data [point + 1] * 34 + qrcode.imagedata.data [point + 2] * 33) / 100;
    retour p
}

qrcode.binarize = function (th) {
    var ret = new Array (qrcode.width * qrcode.height);
    pour (var y = 0; y <qrcode.height; y ++)
    {
        pour (var x = 0; x <qrcode.width; x ++)
        {
            var gray = qrcode.getPixel (x, y);
            
            ret [x + y * qrcode.width] = gris <= th? true: false;
        }
    }
    retourner ret;
}

qrcode.getMiddleBrightnessPerArea = fonction (image)
{
    var numSqrtArea = 4;
    // obtenir une luminosité moyenne ((min + max) / 2) par zone
    var areaWidth = Math.floor (qrcode.width / numSqrtArea);
    var areaHeight = Math.floor (qrcode.height / numSqrtArea);
    var minmax = new Array (numSqrtArea);
    pour (var i = 0; i <numSqrtArea; i ++)
    {
        minmax [i] = nouveau tableau (numSqrtArea);
        pour (var i2 = 0; i2 <numSqrtArea; i2 ++)
        {
            minmax [i] [i2] = nouveau tableau (0,0);
        }
    }
    for (var ay = 0; ay <numSqrtArea; ay ++)
    {
        pour (var ax = 0; ax <numSqrtArea; ax ++)
        {
            minmax [ax] [ay] [0] = 0xFF;
            pour (var dy = 0; dy <areaHeight; dy ++)
            {
                for (var dx = 0; dx <areaWidth; dx ++)
                {
                    var target = image [areaWidth * ax + dx + (areaHeight * ay + dy) * qrcode.width];
                    if (cible <minmax [ax] [ay] [0])
                        minmax [ax] [ay] [0] = cible;
                    if (target> minmax [ax] [ay] [1])
                        minmax [ax] [ay] [1] = cible;
                }
            }
            // minmax [ax] [ay] [0] = (minmax [ax] [ay] [0] + minmax [ax] [ay] [1]) / 2;
        }
    }
    var middle = new Array (numSqrtArea);
    pour (var i3 = 0; i3 <numSqrtArea; i3 ++)
    {
        middle [i3] = new Array (numSqrtArea);
    }
    for (var ay = 0; ay <numSqrtArea; ay ++)
    {
        pour (var ax = 0; ax <numSqrtArea; ax ++)
        {
            middle [ax] [ay] = Math.floor ((minmax [ax] [ay] [0] + minmax [ax] [ay] [1]) / 2);
            //Console.out.print(middle[ax][ay] + ",");
        }
        //Console.out.println ("");
    }
    //Console.out.println ("");
    
    retournez au milieu;
}

qrcode.grayScaleToBitmap = function (grayScale)
{
    var middle = qrcode.getMiddleBrightnessPerArea (grayScale);
    var sqrtNumArea = middle.length;
    var areaWidth = Math.floor (qrcode.width / sqrtNumArea);
    var areaHeight = Math.floor (qrcode.height / sqrtNumArea);
    var bitmap = new Array (qrcode.height * qrcode.width);
    
    for (var ay = 0; ay <sqrtNumArea; ay ++)
    {
        for (var ax = 0; ax <sqrtNumArea; ax ++)
        {
            pour (var dy = 0; dy <areaHeight; dy ++)
            {
                for (var dx = 0; dx <areaWidth; dx ++)
                {
                    bitmap [areaWidth * ax + dx + (areaHeight * ay + dy) * qrcode.width] = (grayScale [areaWidth * ax + dx + (areaHeight * ay + dy) * qrcode.width] <middle [ax] [ay])? vrai faux;
                }
            }
        }
    }
    retourner le bitmap;
}

qrcode.grayscale = function () {
    var ret = new Array (qrcode.width * qrcode.height);
    pour (var y = 0; y <qrcode.height; y ++)
    {
        pour (var x = 0; x <qrcode.width; x ++)
        {
            var gray = qrcode.getPixel (x, y);
            
            ret [x + y * qrcode.width] = gris;
        }
    }
    retourner ret;
}




fonction URShift (nombre, bits)
{
    si (nombre> = 0)
        numéro de retour >> bits;
    autre
        return (nombre >> bits) + (2 << ~ bits);
}


Array.prototype.remove = function (from, to) {
  var rest = this.slice ((to || from) + 1 || this.length);
  this.length = de <0? this.length + from: from;
  retourne this.push.apply (this, reste);
};

/ *
  Porté en JavaScript par Lazar Laszlo 2011 
  
  lazarsoft@gmail.com, www.lazarsoft.info
  
* /

/ *
*
* Copyright 2007 auteurs ZXing
*
* Sous licence Apache, Version 2.0 (la "Licence");
* vous ne pouvez pas utiliser ce fichier sauf en conformité avec la licence.
* Vous pouvez obtenir une copie de la licence à
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Sauf si requis par la loi applicable ou accepté par écrit, logiciel
* distribué sous la licence est distribué sur une base "tel quel",
* SANS GARANTIE OU CONDITION D'AUCUNE SORTE, expresse ou implicite.
* Voir la licence pour la langue spécifique régissant les autorisations et
* limitations en vertu de la licence.
* /


var MIN_SKIP = 3;
var MAX_MODULES = 57;
var INTEGER_MATH_SHIFT = 8;
var CENTER_QUORUM = 2;

qrcode.orderBestPatterns = fonction (patterns)
		{
			
			distance de fonction (pattern1, pattern2)
			{
				xDiff = pattern1.X - pattern2.X;
				yDiff = pattern1.Y - pattern2.Y;
				renvoyer Math.sqrt ((xDiff * xDiff + yDiff * yDiff));
			}
			
			/// <summary> Renvoie la composante z du produit croisé entre les vecteurs BC et BA. </ summary>
			fonction crossProductZ (pointA, pointB, pointC)
			{
				var bX = pointB.x;
				var bY = pointB.y;
				return ((pointC.x - bX) * (pointA.y - bY)) - ((pointC.y - bY) * (pointA.x - bX));
			}

			
			// Trouver des distances entre les centres de motif
			var zeroOneDistance = distance (patterns [0], patterns [1]);
			var oneTwoDistance = distance (patterns [1], patterns [2]);
			var zeroTwoDistance = distance (patterns [0], patterns [2]);
			
			var pointA, pointB, pointC;
			// Suppose que le plus proche des deux autres est B; A et C ne seront que des suppositions au début
			if (oneTwoDistance> = zeroOneDistance && oneTwoDistance> = zeroTwoDistance)
			{
				pointB = patterns [0];
				pointA = motifs [1];
				pointC = motifs [2];
			}
			sinon if (zeroTwoDistance> = oneTwoDistance && zeroTwoDistance> = zeroOneDistance)
			{
				pointB = motifs [1];
				pointA = motifs [0];
				pointC = motifs [2];
			}
			autre
			{
				pointB = motifs [2];
				pointA = motifs [0];
				pointC = motifs [1];
			}
			
			// Utilisez le produit croisé pour déterminer si A et C sont corrects ou inversés.
			// Cela demande si BC x BA a une composante z positive, qui est l'arrangement
			// on veut pour A, B, C. Si c'est négatif, alors on l'a retourné et
			// devrait échanger A et C.
			if (crossProductZ (pointA, pointB, pointC) <0.0)
			{
				var temp = pointA;
				pointA = pointC;
				pointC = temp;
			}
			
			motifs [0] = pointA;
			motifs [1] = pointB;
			motifs [2] = pointC;
		}


fonction FinderPattern (posX, posY, estimeModuleSize)
{
	this.x = posX;
	this.y = posY;
	this.count = 1;
	this.estimatedModuleSize = estimeModuleSize;
	
	this .__ defineGetter __ ("EstimatedModuleSize", function ()
	{
		retourner this.estimatedModuleSize;
	}) 
	this .__ defineGetter __ ("Count", function ()
	{
		retourner this.count;
	})
	this .__ defineGetter __ ("X", function ()
	{
		retourner this.x;
	})
	this .__ defineGetter __ ("Y", function ()
	{
		retourne ceci.y;
	})
	this.incrementCount = function ()
	{
		this.count ++;
	}
	this.aboutEquals = function (moduleSize, i, j)
		{
			if (Math.abs (i - this.y) <= moduleSize && Math.abs (j - this.x) <= moduleSize)
			{
				var moduleSizeDiff = Math.abs (moduleSize - this.estimatedModuleSize);
				return moduleSizeDiff <= 1.0 || moduleSizeDiff / this.estimatedModuleSize <= 1.0;
			}
			retourner faux;
		}
	
}

function FinderPatternInfo (patternCenters)
{
	this.bottomLeft = patternCenters [0];
	this.topLeft = patternCenters [1];
	this.topRight = patternCenters [2];
	this .__ defineGetter __ ("BottomLeft", function ()
	{
		retourne this.bottomLeft;
	}) 
	this .__ defineGetter __ ("TopLeft", function ()
	{
		retourner this.topLeft;
	}) 
	this .__ defineGetter __ ("TopRight", function ()
	{
		retourner this.topRight;
	}) 
}

fonction FinderPatternFinder ()
{
	this.image = null;
	this.possibleCenters = []
	this.hasSkipped = false;
	this.crossCheckStateCount = new Array (0,0,0,0,0);
	this.resultPointCallback = null;
	
	this .__ defineGetter __ ("CrossCheckStateCount", function ()
	{
		this.crossCheckStateCount [0] = 0;
		this.crossCheckStateCount [1] = 0;
		this.crossCheckStateCount [2] = 0;
		this.crossCheckStateCount [3] = 0;
		this.crossCheckStateCount [4] = 0;
		retourne this.crossCheckStateCount;
	}) 
	
	this.foundPatternCross = function (stateCount)
		{
			var totalModuleSize = 0;
			pour (var i = 0; i <5; i ++)
			{
				var count = stateCount [i];
				si (compte == 0)
				{
					retourner faux;
				}
				totalModuleSize + = count;
			}
			if (totalModuleSize <7)
			{
				retourner faux;
			}
			var moduleSize = Math.floor ((totalModuleSize << INTEGER_MATH_SHIFT) / 7);
			var maxVariance = Math.floor (moduleSize / 2);
			// Autorise moins de 50% d'écart par rapport aux proportions 1-1-3-1-1
			renvoyer Math.abs (moduleSize - (stateCount [0] << INTEGER_MATH_SHIFT)) <maxVariance && Math.abs (moduleSize - (stateCount [1] << INTEGER_MATH_SHIFT)) <maxVariance && Math.abs (3 * moduleSize - (stateCount [ 2] << INTEGER_MATH_SHIFT)) <3 * maxVariance && Math.abs (moduleSize - (stateCount [3] << INTEGER_MATH_SHIFT)) <maxVariance && Math.abs (moduleSize - (stateCount [4] << INTEGER_MATH_SHIFT)) <maxVariance;
		}
	this.centerFromEnd = function (stateCount, end)
		{
			return (end-stateCount [4] - stateCount [3]) - stateCount [2] / 2.0;
		}
	this.crossCheckVertical = function (startI, centerJ, maxCount, originalStateCountTotal)
		{
			var image = this.image;
			
			var maxI = qrcode.height;
			var stateCount = this.CrossCheckStateCount;
			
			// Commence à compter depuis le centre
			var i = startI;
			while (i> = 0 && image [centerJ + i * qrcode.width])
			{
				stateCount [2] ++;
				je--;
			}
			si (i <0)
			{
				retourner NaN;
			}
			while (i> = 0 &&! image [centerJ + i * qrcode.width] && stateCount [1] <= maxCount)
			{
				stateCount [1] ++;
				je--;
			}
			// Si trop de modules sont déjà dans cet état ou sont sortis du bord:
			if (i <0 || stateCount [1]> maxCount)
			{
				retourner NaN;
			}
			while (i> = 0 && image [centerJ + i * qrcode.width] && stateCount [0] <= maxCount)
			{
				stateCount [0] ++;
				je--;
			}
			if (stateCount [0]> maxCount)
			{
				retourner NaN;
			}
			
			// Maintenant, compte à rebours du centre
			i = startI + 1;
			while (i <maxI && image [centerJ + i * qrcode.width])
			{
				stateCount [2] ++;
				i ++
			}
			si (i == maxI)
			{
				retourner NaN;
			}
			while (i <maxI &&! image [centerJ + i * qrcode.width] && stateCount [3] <maxCount)
			{
				stateCount [3] ++;
				i ++
			}
			if (i == maxI || stateCount [3]> = maxCount)
			{
				retourner NaN;
			}
			while (i <maxI && image [centerJ + i * qrcode.width] && stateCount [4] <maxCount)
			{
				stateCount [4] ++;
				i ++
			}
			if (stateCount [4]> = maxCount)
			{
				retourner NaN;
			}
			
			// Si nous avons trouvé une section de type chercheur, mais sa taille est différente de plus de 40%
			// l'original, supposons que c'est un faux positif
			var stateCountTotal = stateCount [0] + stateCount [1] + stateCount [2] + stateCount [3] + stateCount [4];
			if (5 * Math.abs (stateCountTotal - originalStateCountTotal)> = 2 * originalStateCountTotal)
			{
				retourner NaN;
			}
			
			return this.foundPatternCross (stateCount)? this.centerFromEnd (stateCount, i): NaN;
		}
	this.crossCheckHorizontal = function (startJ, centerI, maxCount, originalStateCountTotal)
		{
			var image = this.image;
			
			var maxJ = qrcode.width;
			var stateCount = this.CrossCheckStateCount;
			
			var j = startJ;
			while (j> = 0 && image [j + centerI * qrcode.width])
			{
				stateCount [2] ++;
				j--
			}
			si (j <0)
			{
				retourner NaN;
			}
			while (j> = 0 &&! image [j + centerI * qrcode.width] && stateCount [1] <= maxCount)
			{
				stateCount [1] ++;
				j--
			}
			if (j <0 || stateCount [1]> maxCount)
			{
				retourner NaN;
			}
			while (j> = 0 && image [j + centerI * qrcode.width] && stateCount [0] <= maxCount)
			{
				stateCount [0] ++;
				j--
			}
			if (stateCount [0]> maxCount)
			{
				retourner NaN;
			}
			
			j = début J + 1;
			while (j <maxJ && image [j + centerI * qrcode.width])
			{
				stateCount [2] ++;
				j ++;
			}
			si (j == maxJ)
			{
				retourner NaN;
			}
			while (j <maxJ &&! image [j + centerI * qrcode.width] && stateCount [3] <maxCount)
			{
				stateCount [3] ++;
				j ++;
			}
			if (j == maxJ || stateCount [3]> = maxCount)
			{
				retourner NaN;
			}
			while (j <maxJ && image [j + centerI * qrcode.width] && stateCount [4] <maxCount)
			{
				stateCount [4] ++;
				j ++;
			}
			if (stateCount [4]> = maxCount)
			{
				retourner NaN;
			}
			
			// Si nous avons trouvé une section de type chercheur, mais sa taille est très différente de celle
			// l'original, supposons que c'est un faux positif
			var stateCountTotal = stateCount [0] + stateCount [1] + stateCount [2] + stateCount [3] + stateCount [4];
			if (5 * Math.abs (stateCountTotal - originalStateCountTotal)> = originalStateCountTotal)
			{
				retourner NaN;
			}
			
			return this.foundPatternCross (stateCount)? this.centerFromEnd (stateCount, j): NaN;
		}
	this.handlePossibleCenter=function( stateCount,  i,  j)
		{
			var stateCountTotal = stateCount[0] + stateCount[1] + stateCount[2] + stateCount[3] + stateCount[4];
			var centerJ = this.centerFromEnd(stateCount, j); //float
			var centerI = this.crossCheckVertical(i, Math.floor( centerJ), stateCount[2], stateCountTotal); //float
			si (! isNaN (centerI))
			{
				// Vérification de nouveau
				centerJ = this.crossCheckHorizontal (Math.floor (centerJ), Math.floor (centerI), stateCount [2], stateCountTotal);
				si (! isNaN (centerJ))
				{
					var EvaluationsModuleSize = stateCountTotal / 7.0;
					var found = false;
					var max = this.possibleCenters.length;
					for (var index = 0; index <max; index ++)
					{
						var center = this.possibleCenters [index];
						// Cherchez à peu près le même centre et la même taille de module:
						if (center.aboutEquals (estimeModuleSize, centerI, centerJ))
						{
							center.incrementCount ();
							found = true;
							Pause;
						}
					}
					si trouvé)
					{
						var point = new FinderPattern (centerJ, centerI, estimeModuleSize);
						this.possibleCenters.push (point);
						if (this.resultPointCallback! = null)
						{
							this.resultPointCallback.foundPossibleResultPoint (point);
						}
					}
					retourne vrai;
				}
			}
			retourner faux;
		}
		
	this.selectBestPatterns = function ()
		{
			
			var startSize = this.possibleCenters.length;
			if (startSize <3)
			{
				// Impossible de trouver suffisamment de motifs de recherche
				jeter "Impossible de trouver suffisamment de motifs de recherche";
			}
			
			// Filtre les possibilités aberrantes dont la taille du module est trop différente
			si (startSize> 3)
			{
				// Mais nous ne pouvons le faire que si nous avons au moins 4 possibilités de choix
				var totalModuleSize = 0.0;
                var carré = 0.0;
				pour (var i = 0; i <startSize; i ++)
				{
					// totalModuleSize + = this.possibleCenters [i] .EstimatedModuleSize;
                    var centerValue = this.possibleCenters [i] .EstimatedModuleSize;
					totalModuleSize + = centerValue;
					square + = (centerValue * centerValue);
				}
				var average = totalModuleSize / startSize;
                this.possibleCenters.sort (fonction (center1, center2) {
				      var dA = Math.abs (center2.EstimatedModuleSize - average);
				      var dB = Math.abs (center1.EstimatedModuleSize - average);
				      si (dA <dB) {
				    	  retourner (-1);
				      } sinon if (dA == dB) {
				    	  retourne 0;
				      } autre {
				    	  retourner 1;
				      }
					})

				var stdDev = Math.sqrt (square / startSize - average * average);
				var limit = Math.max (0.2 * moyenne, stdDev);
				pour (var i = this.possibleCenters.length - 1; i> = 0; i--)
				{
					var pattern = this.possibleCenters [i];
					// if (Math.abs (pattern.EstimatedModuleSize - average)> 0,2 * moyenne)
                    if (Math.abs (pattern.EstimatedModuleSize - average)> limite)
					{
						ceci.les.centres.possibles.enlever (i);
					}
				}
			}
			
			si (this.possibleCenters.length> 3)
			{
				// Throw away all but those first size candidate points we found.
				this.possibleCenters.sort(function(a, b){
					if (a.count > b.count){return -1;}
					if (a.count < b.count){return 1;}
					return 0;
				});
			}
			
			return new Array( this.possibleCenters[0],  this.possibleCenters[1],  this.possibleCenters[2]);
		}
		
	this.findRowSkip=function()
		{
			var max = this.possibleCenters.length;
			if (max <= 1)
			{
				return 0;
			}
			var firstConfirmedCenter = null;
			for (var i = 0; i < max; i++)
			{
				var center =  this.possibleCenters[i];
				if (center.Count >= CENTER_QUORUM)
				{
					if (firstConfirmedCenter == null)
					{
						firstConfirmedCenter = center;
					}
					else
					{
						// We have two confirmed centers
						// How far down can we skip before resuming looking for the next
						// pattern? In the worst case, only the difference between the
						// difference in the x / y coordinates of the two centers.
						// This is the case where you find top left last.
						this.hasSkipped = true;
						return Math.floor ((Math.abs(firstConfirmedCenter.X - center.X) - Math.abs(firstConfirmedCenter.Y - center.Y)) / 2);
					}
				}
			}
			return 0;
		}
	
	this.haveMultiplyConfirmedCenters=function()
		{
			var confirmedCount = 0;
			var totalModuleSize = 0.0;
			var max = this.possibleCenters.length;
			for (var i = 0; i < max; i++)
			{
				var pattern =  this.possibleCenters[i];
				if (pattern.Count >= CENTER_QUORUM)
				{
					confirmedCount++;
					totalModuleSize += pattern.EstimatedModuleSize;
				}
			}
			if (confirmedCount < 3)
			{
				return false;
			}
			// OK, we have at least 3 confirmed centers, but, it's possible that one is a "false positive"
			// and that we need to keep looking. We detect this by asking if the estimated module sizes
			// vary too much. We arbitrarily say that when the total deviation from average exceeds
			// 5% of the total module size estimates, it's too much.
			var average = totalModuleSize / max;
			var totalDeviation = 0.0;
			for (var i = 0; i < max; i++)
			{
				pattern = this.possibleCenters[i];
				totalDeviation += Math.abs(pattern.EstimatedModuleSize - average);
			}
			return totalDeviation <= 0.05 * totalModuleSize;
		}
		
	this.findFinderPattern = function(image){
		var tryHarder = false;
		this.image=image;
		var maxI = qrcode.height;
		var maxJ = qrcode.width;
		var iSkip = Math.floor((3 * maxI) / (4 * MAX_MODULES));
		if (iSkip < MIN_SKIP || tryHarder)
		{
				iSkip = MIN_SKIP;
		}
		
		var done = false;
		var stateCount = new Array(5);
		for (var i = iSkip - 1; i < maxI && !done; i += iSkip)
		{
			// Get a row of black/white values
			stateCount[0] = 0;
			stateCount[1] = 0;
			stateCount[2] = 0;
			stateCount[3] = 0;
			stateCount[4] = 0;
			var currentState = 0;
			for (var j = 0; j < maxJ; j++)
			{
				if (image[j+i*qrcode.width] )
				{
					// Black pixel
					if ((currentState & 1) == 1)
					{
						// Counting white pixels
						currentState++;
					}
					stateCount[currentState]++;
				}
				else
				{
					// White pixel
					if ((currentState & 1) == 0)
					{
						// Counting black pixels
						if (currentState == 4)
						{
							// A winner?
							if (this.foundPatternCross(stateCount))
							{
								// Yes
								var confirmed = this.handlePossibleCenter(stateCount, i, j);
								if (confirmed)
								{
									// Start examining every other line. Checking each line turned out to be too
									// expensive and didn't improve performance.
									iSkip = 2;
									if (this.hasSkipped)
									{
										done = this.haveMultiplyConfirmedCenters();
									}
									else
									{
										var rowSkip = this.findRowSkip();
										if (rowSkip > stateCount[2])
										{
											// Skip rows between row of lower confirmed center
											// and top of presumed third confirmed center
											// but back up a bit to get a full chance of detecting
											// it, entire width of center of finder pattern
											
											// Skip by rowSkip, but back off by stateCount[2] (size of last center
											// of pattern we saw) to be conservative, and also back off by iSkip which
											// is about to be re-added
											i += rowSkip - stateCount[2] - iSkip;
											j = maxJ - 1;
										}
									}
								}
								else
								{
									// Advance to next black pixel
									do 
									{
										j++;
									}
									while (j < maxJ && !image[j + i*qrcode.width]);
									j--; // back up to that last white pixel
								}
								// Clear state to start looking again
								currentState = 0;
								stateCount[0] = 0;
								stateCount[1] = 0;
								stateCount[2] = 0;
								stateCount[3] = 0;
								stateCount[4] = 0;
							}
							else
							{
								// No, shift counts back by two
								stateCount[0] = stateCount[2];
								stateCount[1] = stateCount[3];
								stateCount[2] = stateCount[4];
								stateCount[3] = 1;
								stateCount[4] = 0;
								currentState = 3;
							}
						}
						else
						{
							stateCount[++currentState]++;
						}
					}
					else
					{
						// Counting white pixels
						stateCount[currentState]++;
					}
				}
			}
			if (this.foundPatternCross(stateCount))
			{
				var confirmed = this.handlePossibleCenter(stateCount, i, maxJ);
				if (confirmed)
				{
					iSkip = stateCount[0];
					if (this.hasSkipped)
					{
						// Found a third one
						done = haveMultiplyConfirmedCenters();
					}
				}
			}
		}
		
		var patternInfo = this.selectBestPatterns();
		qrcode.orderBestPatterns(patternInfo);
		
		return new FinderPatternInfo(patternInfo);
	};
}
/*
  Ported to JavaScript by Lazar Laszlo 2011 
  
  lazarsoft@gmail.com, www.lazarsoft.info
  
*/

/*
*
* Copyright 2007 ZXing authors
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*      http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/


function AlignmentPattern(posX, posY,  estimatedModuleSize)
{
	this.x=posX;
	this.y=posY;
	this.count = 1;
	this.estimatedModuleSize = estimatedModuleSize;
	
	this.__defineGetter__("EstimatedModuleSize", function()
	{
		return this.estimatedModuleSize;
	}); 
	this.__defineGetter__("Count", function()
	{
		return this.count;
	});
	this.__defineGetter__("X", function()
	{
		return Math.floor(this.x);
	});
	this.__defineGetter__("Y", function()
	{
		return Math.floor(this.y);
	});
	this.incrementCount = function()
	{
		this.count++;
	}
	this.aboutEquals=function( moduleSize,  i,  j)
		{
			if (Math.abs(i - this.y) <= moduleSize && Math.abs(j - this.x) <= moduleSize)
			{
				var moduleSizeDiff = Math.abs(moduleSize - this.estimatedModuleSize);
				return moduleSizeDiff <= 1.0 || moduleSizeDiff / this.estimatedModuleSize <= 1.0;
			}
			return false;
		}
	
}

function AlignmentPatternFinder( image,  startX,  startY,  width,  height,  moduleSize,  resultPointCallback)
{
	this.image = image;
	this.possibleCenters = new Array();
	this.startX = startX;
	this.startY = startY;
	this.width = width;
	this.height = height;
	this.moduleSize = moduleSize;
	this.crossCheckStateCount = new Array(0,0,0);
	this.resultPointCallback = resultPointCallback;
	
	this.centerFromEnd=function(stateCount,  end)
		{
			return  (end - stateCount[2]) - stateCount[1] / 2.0;
		}
	this.foundPatternCross = function(stateCount)
		{
			var moduleSize = this.moduleSize;
			var maxVariance = moduleSize / 2.0;
			for (var i = 0; i < 3; i++)
			{
				if (Math.abs(moduleSize - stateCount[i]) >= maxVariance)
				{
					return false;
				}
			}
			return true;
		}

	this.crossCheckVertical=function( startI,  centerJ,  maxCount,  originalStateCountTotal)
		{
			var image = this.image;
			
			var maxI = qrcode.height;
			var stateCount = this.crossCheckStateCount;
			stateCount[0] = 0;
			stateCount[1] = 0;
			stateCount[2] = 0;
			
			// Start counting up from center
			var i = startI;
			while (i >= 0 && image[centerJ + i*qrcode.width] && stateCount[1] <= maxCount)
			{
				stateCount[1]++;
				i--;
			}
			// If already too many modules in this state or ran off the edge:
			if (i < 0 || stateCount[1] > maxCount)
			{
				return NaN;
			}
			while (i >= 0 && !image[centerJ + i*qrcode.width] && stateCount[0] <= maxCount)
			{
				stateCount[0]++;
				i--;
			}
			if (stateCount[0] > maxCount)
			{
				return NaN;
			}
			
			// Now also count down from center
			i = startI + 1;
			while (i < maxI && image[centerJ + i*qrcode.width] && stateCount[1] <= maxCount)
			{
				stateCount[1]++;
				i++;
			}
			if (i == maxI || stateCount[1] > maxCount)
			{
				return NaN;
			}
			while (i < maxI && !image[centerJ + i*qrcode.width] && stateCount[2] <= maxCount)
			{
				stateCount[2]++;
				i++;
			}
			if (stateCount[2] > maxCount)
			{
				return NaN;
			}
			
			var stateCountTotal = stateCount[0] + stateCount[1] + stateCount[2];
			if (5 * Math.abs(stateCountTotal - originalStateCountTotal) >= 2 * originalStateCountTotal)
			{
				return NaN;
			}
			
			return this.foundPatternCross(stateCount)?this.centerFromEnd(stateCount, i):NaN;
		}
		
	this.handlePossibleCenter=function( stateCount,  i,  j)
		{
			var stateCountTotal = stateCount[0] + stateCount[1] + stateCount[2];
			var centerJ = this.centerFromEnd(stateCount, j);
			var centerI = this.crossCheckVertical(i, Math.floor (centerJ), 2 * stateCount[1], stateCountTotal);
			if (!isNaN(centerI))
			{
				var estimatedModuleSize = (stateCount[0] + stateCount[1] + stateCount[2]) / 3.0;
				var max = this.possibleCenters.length;
				for (var index = 0; index < max; index++)
				{
					var center =  this.possibleCenters[index];
					// Look for about the same center and module size:
					if (center.aboutEquals(estimatedModuleSize, centerI, centerJ))
					{
						return new AlignmentPattern(centerJ, centerI, estimatedModuleSize);
					}
				}
				// Hadn't found this before; save it
				var point = new AlignmentPattern(centerJ, centerI, estimatedModuleSize);
				this.possibleCenters.push(point);
				if (this.resultPointCallback != null)
				{
					this.resultPointCallback.foundPossibleResultPoint(point);
				}
			}
			return null;
		}
		
	this.find = function()
	{
			var startX = this.startX;
			var height = this.height;
			var maxJ = startX + width;
			var middleI = startY + (height >> 1);
			// We are looking for black/white/black modules in 1:1:1 ratio;
			// this tracks the number of black/white/black modules seen so far
			var stateCount = new Array(0,0,0);
			for (var iGen = 0; iGen < height; iGen++)
			{
				// Search from middle outwards
				var i = middleI + ((iGen & 0x01) == 0?((iGen + 1) >> 1):- ((iGen + 1) >> 1));
				stateCount[0] = 0;
				stateCount[1] = 0;
				stateCount[2] = 0;
				var j = startX;
				// Burn off leading white pixels before anything else; if we start in the middle of
				// a white run, it doesn't make sense to count its length, since we don't know if the
				// white run continued to the left of the start point
				while (j < maxJ && !image[j + qrcode.width* i])
				{
					j++;
				}
				var currentState = 0;
				while (j < maxJ)
				{
					if (image[j + i*qrcode.width])
					{
						// Black pixel
						if (currentState == 1)
						{
							// Counting black pixels
							stateCount[currentState]++;
						}
						else
						{
							// Counting white pixels
							if (currentState == 2)
							{
								// A winner?
								if (this.foundPatternCross(stateCount))
								{
									// Yes
									var confirmed = this.handlePossibleCenter(stateCount, i, j);
									if (confirmed != null)
									{
										return confirmed;
									}
								}
								stateCount[0] = stateCount[2];
								stateCount[1] = 1;
								stateCount[2] = 0;
								currentState = 1;
							}
							else
							{
								stateCount[++currentState]++;
							}
						}
					}
					else
					{
						// White pixel
						if (currentState == 1)
						{
							// Counting black pixels
							currentState++;
						}
						stateCount[currentState]++;
					}
					j++;
				}
				if (this.foundPatternCross(stateCount))
				{
					var confirmed = this.handlePossibleCenter(stateCount, i, maxJ);
					if (confirmed != null)
					{
						return confirmed;
					}
				}
			}
			
			// Hmm, nothing we saw was observed and confirmed twice. If we had
			// any guess at all, return it.
			if (!(this.possibleCenters.length == 0))
			{
				return  this.possibleCenters[0];
			}
			
			throw "Couldn't find enough alignment patterns";
		}
	
}
/*
  Ported to JavaScript by Lazar Laszlo 2011 
  
  lazarsoft@gmail.com, www.lazarsoft.info
  
*/

/*
*
* Copyright 2007 ZXing authors
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*      http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/


function QRCodeDataBlockReader(blocks,  version,  numErrorCorrectionCode)
{
	this.blockPointer = 0;
	this.bitPointer = 7;
	this.dataLength = 0;
	this.blocks = blocks;
	this.numErrorCorrectionCode = numErrorCorrectionCode;
	if (version <= 9)
		this.dataLengthMode = 0;
	else if (version >= 10 && version <= 26)
		this.dataLengthMode = 1;
	else if (version >= 27 && version <= 40)
		this.dataLengthMode = 2;
		
	this.getNextBits = function( numBits)
		{			
			var bits = 0;
			if (numBits < this.bitPointer + 1)
			{
				// next word fits into current data block
				var mask = 0;
				for (var i = 0; i < numBits; i++)
				{
					mask += (1 << i);
				}
				mask <<= (this.bitPointer - numBits + 1);
				
				bits = (this.blocks[this.blockPointer] & mask) >> (this.bitPointer - numBits + 1);
				this.bitPointer -= numBits;
				return bits;
			}
			else if (numBits < this.bitPointer + 1 + 8)
			{
				// next word crosses 2 data blocks
				var mask1 = 0;
				for (var i = 0; i < this.bitPointer + 1; i++)
				{
					mask1 += (1 << i);
				}
				bits = (this.blocks[this.blockPointer] & mask1) << (numBits - (this.bitPointer + 1));
                this.blockPointer++;
				bits += ((this.blocks[this.blockPointer]) >> (8 - (numBits - (this.bitPointer + 1))));
				
				this.bitPointer = this.bitPointer - numBits % 8;
				if (this.bitPointer < 0)
				{
					this.bitPointer = 8 + this.bitPointer;
				}
				return bits;
			}
			else if (numBits < this.bitPointer + 1 + 16)
			{
				// next word crosses 3 data blocks
				var mask1 = 0; // mask of first block
				var mask3 = 0; // mask of 3rd block
				//bitPointer + 1 : number of bits of the 1st block
				//8 : number of the 2nd block (note that use already 8bits because next word uses 3 data blocks)
				//numBits - (bitPointer + 1 + 8) : number of bits of the 3rd block 
				for (var i = 0; i < this.bitPointer + 1; i++)
				{
					mask1 += (1 << i);
				}
				var bitsFirstBlock = (this.blocks[this.blockPointer] & mask1) << (numBits - (this.bitPointer + 1));
				this.blockPointer++;
				
				var bitsSecondBlock = this.blocks[this.blockPointer] << (numBits - (this.bitPointer + 1 + 8));
				this.blockPointer++;
				
				for (var i = 0; i < numBits - (this.bitPointer + 1 + 8); i++)
				{
					mask3 += (1 << i);
				}
				mask3 <<= 8 - (numBits - (this.bitPointer + 1 + 8));
				var bitsThirdBlock = (this.blocks[this.blockPointer] & mask3) >> (8 - (numBits - (this.bitPointer + 1 + 8)));
				
				bits = bitsFirstBlock + bitsSecondBlock + bitsThirdBlock;
				this.bitPointer = this.bitPointer - (numBits - 8) % 8;
				if (this.bitPointer < 0)
				{
					this.bitPointer = 8 + this.bitPointer;
				}
				return bits;
			}
			else
			{
				return 0;
			}
		}
	this.NextMode=function()
	{
		if ((this.blockPointer > this.blocks.length - this.numErrorCorrectionCode - 2))
			return 0;
		else
			return this.getNextBits(4);
	}
	this.getDataLength=function( modeIndicator)
		{
			var index = 0;
			while (true)
			{
				if ((modeIndicator >> index) == 1)
					break;
				index++;
			}
			
			return this.getNextBits(qrcode.sizeOfDataLengthInfo[this.dataLengthMode][index]);
		}
	this.getRomanAndFigureString=function( dataLength)
		{
			var length = dataLength;
			var intData = 0;
			var strData = "";
			var tableRomanAndFigure = new Array('0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', ' ', '$', '%', '*', '+', '-', '.', '/', ':');
			do 
			{
				if (length > 1)
				{
					intData = this.getNextBits(11);
					var firstLetter = Math.floor(intData / 45);
					var secondLetter = intData % 45;
					strData += tableRomanAndFigure[firstLetter];
					strData += tableRomanAndFigure[secondLetter];
					length -= 2;
				}
				else if (length == 1)
				{
					intData = this.getNextBits(6);
					strData += tableRomanAndFigure[intData];
					length -= 1;
				}
			}
			while (length > 0);
			
			return strData;
		}
	this.getFigureString=function( dataLength)
		{
			var length = dataLength;
			var intData = 0;
			var strData = "";
			do 
			{
				if (length >= 3)
				{
					intData = this.getNextBits(10);
					if (intData < 100)
						strData += "0";
					if (intData < 10)
						strData += "0";
					length -= 3;
				}
				else if (length == 2)
				{
					intData = this.getNextBits(7);
					if (intData < 10)
						strData += "0";
					length -= 2;
				}
				else if (length == 1)
				{
					intData = this.getNextBits(4);
					length -= 1;
				}
				strData += intData;
			}
			while (length > 0);
			
			return strData;
		}
	this.get8bitByteArray=function( dataLength)
		{
			var length = dataLength;
			var intData = 0;
			var output = new Array();
			
			do 
			{
				intData = this.getNextBits(8);
				output.push( intData);
				length--;
			}
			while (length > 0);
			return output;
		}
    this.getKanjiString=function( dataLength)
		{
			var length = dataLength;
			var intData = 0;
			var unicodeString = "";
			do 
			{
				intData = getNextBits(13);
				var lowerByte = intData % 0xC0;
				var higherByte = intData / 0xC0;
				
				var tempWord = (higherByte << 8) + lowerByte;
				var shiftjisWord = 0;
				if (tempWord + 0x8140 <= 0x9FFC)
				{
					// between 8140 - 9FFC on Shift_JIS character set
					shiftjisWord = tempWord + 0x8140;
				}
				else
				{
					// between E040 - EBBF on Shift_JIS character set
					shiftjisWord = tempWord + 0xC140;
				}
				
				//var tempByte = new Array(0,0);
				//tempByte[0] = (sbyte) (shiftjisWord >> 8);
				//tempByte[1] = (sbyte) (shiftjisWord & 0xFF);
				//unicodeString += new String(SystemUtils.ToCharArray(SystemUtils.ToByteArray(tempByte)));
                unicodeString += String.fromCharCode(shiftjisWord);
				length--;
			}
			while (length > 0);
			
			
			return unicodeString;
		}

	this.__defineGetter__("DataByte", function()
	{
		var output = new Array();
		var MODE_NUMBER = 1;
	    var MODE_ROMAN_AND_NUMBER = 2;
	    var MODE_8BIT_BYTE = 4;
	    var MODE_KANJI = 8;
		do 
					{
						var mode = this.NextMode();
						//canvas.println("mode: " + mode);
						if (mode == 0)
						{
							if (output.length > 0)
								break;
							else
								throw "Empty data block";
						}
						//if (mode != 1 && mode != 2 && mode != 4 && mode != 8)
						//	break;
						//}
						if (mode != MODE_NUMBER && mode != MODE_ROMAN_AND_NUMBER && mode != MODE_8BIT_BYTE && mode != MODE_KANJI)
						{
							/*					canvas.println("Invalid mode: " + mode);
							mode = guessMode(mode);
							canvas.println("Guessed mode: " + mode); */
							throw "Invalid mode: " + mode + " in (block:" + this.blockPointer + " bit:" + this.bitPointer + ")";
						}
						dataLength = this.getDataLength(mode);
						if (dataLength < 1)
							throw "Invalid data length: " + dataLength;
						//canvas.println("length: " + dataLength);
						switch (mode)
						{
							
							case MODE_NUMBER: 
								//canvas.println("Mode: Figure");
								var temp_str = this.getFigureString(dataLength);
								var ta = new Array(temp_str.length);
								for(var j=0;j<temp_str.length;j++)
									ta[j]=temp_str.charCodeAt(j);
								output.push(ta);
								break;
							
							case MODE_ROMAN_AND_NUMBER: 
								//canvas.println("Mode: Roman&Figure");
								var temp_str = this.getRomanAndFigureString(dataLength);
								var ta = new Array(temp_str.length);
								for(var j=0;j<temp_str.length;j++)
									ta[j]=temp_str.charCodeAt(j);
								output.push(ta );
								//output.Write(SystemUtils.ToByteArray(temp_sbyteArray2), 0, temp_sbyteArray2.Length);
								break;
							
							case MODE_8BIT_BYTE: 
								//canvas.println("Mode: 8bit Byte");
								//sbyte[] temp_sbyteArray3;
								var temp_sbyteArray3 = this.get8bitByteArray(dataLength);
								output.push(temp_sbyteArray3);
								//output.Write(SystemUtils.ToByteArray(temp_sbyteArray3), 0, temp_sbyteArray3.Length);
								break;
							
							case MODE_KANJI: 
								//canvas.println("Mode: Kanji");
								//sbyte[] temp_sbyteArray4;
								//temp_sbyteArray4 = SystemUtils.ToSByteArray(SystemUtils.ToByteArray(getKanjiString(dataLength)));
								//output.Write(SystemUtils.ToByteArray(temp_sbyteArray4), 0, temp_sbyteArray4.Length);
                                var temp_str = this.getKanjiString(dataLength);
								output.push(temp_str);
								break;
							}
						//			
						//canvas.println("DataLength: " + dataLength);
						//Console.out.println(dataString);
					}
					while (true);
		return output;
	});
}