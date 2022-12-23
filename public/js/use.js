scanner = new jsQRScan({
	'id': 'camera',
	'width': 320,
	'height': 320,
	'callbackSuccess': retourOK,
	'callbackEnd': retourErreur,
	'scanMaxDuration': 20000,
	'scanInterval': 1000
});