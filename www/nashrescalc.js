var PPP_1="";
var PI_1="";
var PA_1="";
var Edad_1="";

function NASHRES(ID) {
	
	document.getElementById('PPP').value = document.getElementById('PPP').value.replace(/^\s+|\s+$/gm,'');
	document.getElementById('PI').value = document.getElementById('PI').value.replace(/^\s+|\s+$/gm,'');
	document.getElementById('PA').value = document.getElementById('PA').value.replace(/^\s+|\s+$/gm,'');
	document.getElementById('Edad').value = document.getElementById('Edad').value.replace(/^\s+|\s+$/gm,'');
  
	var valido = true;

	if(ID.toString() != "") {
		valido = ValidarEntrada(ID);
		// alert("dsa");
	}
	
	if (valido) {
		var PPP = document.getElementById('PPP').value;
		var Edad = document.getElementById('Edad').value;
		var NAS = document.getElementById('NAS').value;
		var DT2 = document.getElementById('DT2').value;
		var ALT = document.getElementById('ALT').value;
  
		if (!PPP.toString() == "" && Edad > 0) {
			var NASHRES_Val = 0.047 + (0.972 * PPP) + (2.194 * ALT) - (3.076 * DT2) - (2.376 * NAS) - (0.102 * Edad);
	
			NASHRES_Val = Math.exp(NASHRES_Val) / (1 + Math.exp(NASHRES_Val)) * 100;

			if (NASHRES_Val <= 46.15) {
				Ana = "Baja probabilidad de resoluci&oacute;n de EHNA";
			} else if (NASHRES_Val >= 69.72) {
				Ana = "Alta probabilidad de resoluci&oacute;n de EHNA";
			} else {
				Ana = "Indeterminado - &iquestRealizar Biopsia?";
			}		   
			
			document.getElementById('NASHRESResult').innerHTML = "NASHRES: " + NASHRES_Val.toFixed(2);
			document.getElementById('ANAResult').innerHTML = Ana;
			GetColorPercent(NASHRES_Val.toFixed(2));
		} else {
			RstNASHRES();
		}  
	}
	
};

function ValidarEntrada(ID){

	var valido = true;
	var valor = document.getElementById(ID).value.replace(/^\s+|\s+$/gm,'');
	
	if (valor.length > 0) {  // Si es = 0 es válido igual, pues borró
		for (i = 0; i < valor.length; i++) {
			if ('0123456789.'.indexOf(valor.charAt(i)) == -1){
				valido = false;
				break;
			}
		}
	}

	if (valido){
		// alert("Pasó 1");
		if (ID == "PPP"){
			PPP_1 = document.getElementById('PPP').value;
		} else if (ID == "PI"){
			PI_1 = document.getElementById('PI').value;
		} else if (ID == "PA"){
			PA_1 = document.getElementById('PA').value;
		} else if (ID == "Edad"){
			Edad_1 = document.getElementById('Edad').value;
		}
	} else {
		// alert("Pasó 2");
		if (ID == "PPP"){
			document.getElementById('PPP').value = PPP_1.replace(/^\s+|\s+$/gm,'');
		} else if (ID == "PI"){
			document.getElementById('PI').value = PI_1.replace(/^\s+|\s+$/gm,'');
		} else if (ID == "PA"){
			document.getElementById('PA').value = PA_1.replace(/^\s+|\s+$/gm,'');
		} else if (ID == "Edad"){
			document.getElementById('Edad').value = Edad_1.replace(/^\s+|\s+$/gm,'');
		}
	}
	return valido;
	
	
}

function CalcPPP(ID){
	if (ValidarEntrada(ID)){
		var PI = document.getElementById('PI').value;
		var PA = document.getElementById('PA').value;
  
		if (PI > 0 && PA > 0) {
			var PPP = 100 - (PA * 100) / PI;
			document.getElementById('PPP').value = PPP.toFixed(1);
			NASHRES(ID);  
		}
	}
};

function GetColorPercent(NASHRES_Val){
	RC1 = 140;
	GC1 = 0;
	BC1 = 0;
	RC2 = 254;
	GC2 = 240;
	BC2 = 130;
	
	if (NASHRES_Val <= 46.15) {
		shc = "#8C0000";
	} else {
		shc = "#ffffff";
	}
		
	NASHRES_Val = 1 - NASHRES_Val/100;
	
	RF = Math.round(RC1 + NASHRES_Val * (RC2-RC1));
	GF = Math.round(GC1 + NASHRES_Val * (GC2-GC1));
	BF = Math.round(BC1 + NASHRES_Val * (BC2-BC1));
	
	var elem = document.getElementById('NASHRESResult');
	elem.style.color = "rgb("+RF+","+GF+","+BF+")";
	elem.style.textShadow = "2px 2px 3px "+shc;

	var elem = document.getElementById('ANAResult');
	elem.style.color = "rgb("+RF+","+GF+","+BF+")";
	elem.style.textShadow = "2px 2px 3px "+shc;
};

function RstNASHRES(){
	document.getElementById('NASHRESResult').innerHTML = "NASHRES: &minus;";
	var elem = document.getElementById('NASHRESResult');
	elem.style.color = "rgb(255,255,255)";
	elem.style.textShadow = "2px 2px 3px #000000";
	document.getElementById('ANAResult').innerHTML = "";
};