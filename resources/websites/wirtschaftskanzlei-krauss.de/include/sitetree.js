/* [nodename, id, name, navigationtext, href, isnavigation, childs[], templatename] */

function jdecode(s) {
    s = s.replace(/\+/g, "%20")
    return unescape(s);
}

var POS_NODENAME=0;
var POS_ID=1;
var POS_NAME=2;
var POS_NAVIGATIONTEXT=3;
var POS_HREF=4;
var POS_ISNAVIGATION=5;
var POS_CHILDS=6;
var POS_TEMPLATENAME=7;
var theSitetree=[ 
	['PAGE','4466',jdecode('Home'),jdecode(''),'4466.html','true',[],''],
	['PAGE','85801',jdecode('Was+ist+Mediation%3F'),jdecode(''),'85801.html','true',[],''],
	['PAGE','6601',jdecode('Wirtschaftsmediation'),jdecode(''),'6601/index.html','true',[ 
		['PAGE','63201',jdecode('Gerichtsverfahren'),jdecode(''),'6601/63201.html','true',[],''],
		['PAGE','63101',jdecode('Die+Vorteile'),jdecode(''),'6601/63101.html','true',[],''],
		['PAGE','64001',jdecode('Kostenvergleich'),jdecode(''),'6601/64001.html','true',[],'']
	],''],
	['PAGE','67101',jdecode('Konfliktmanagement'),jdecode(''),'67101.html','true',[],''],
	['PAGE','64401',jdecode('Das+Team'),jdecode(''),'64401.html','true',[],''],
	['PAGE','85201',jdecode('Wir+bieten+Ihnen+...'),jdecode(''),'85201.html','true',[],''],
	['PAGE','16255',jdecode('Interessante+Links'),jdecode(''),'16255.html','true',[],''],
	['PAGE','66301',jdecode('Presse'),jdecode(''),'66301.html','true',[],''],
	['PAGE','90801',jdecode('Downloads'),jdecode(''),'90801.html','true',[],''],
	['PAGE','16282',jdecode('Kontakt'),jdecode(''),'16282/index.html','true',[ 
		['PAGE','23702',jdecode('Kontakt+%28Folgeseite%29'),jdecode(''),'16282/23702.html','false',[],'']
	],''],
	['PAGE','84201',jdecode('Impressum'),jdecode(''),'84201.html','true',[],'']];
var siteelementCount=15;
theSitetree.topTemplateName='Collage';
					                                                                    
theSitetree.getById = function(id, ar) {												
							if (typeof(ar) == 'undefined')                              
								ar = this;                                              
							for (var i=0; i < ar.length; i++) {                         
								if (ar[i][POS_ID] == id)                                
									return ar[i];                                       
								if (ar[i][POS_CHILDS].length > 0) {                     
									var result=this.getById(id, ar[i][POS_CHILDS]);     
									if (result != null)                                 
										return result;                                  
								}									                    
							}                                                           
							return null;                                                
					  };                                                                
					                                                                    
theSitetree.getParentById = function(id, ar) {											
						if (typeof(ar) == 'undefined')                              	
							ar = this;                                             		
						for (var i=0; i < ar.length; i++) {                        		
							for (var j = 0; j < ar[i][POS_CHILDS].length; j++) {   		
								if (ar[i][POS_CHILDS][j][POS_ID] == id) {          		
									// child found                                 		
									return ar[i];                                  		
								}                                                  		
								var result=this.getParentById(id, ar[i][POS_CHILDS]);   
								if (result != null)                                 	
									return result;                                  	
							}                                                       	
						}                                                           	
						return null;                                                	
					 }								                                    
					                                                                    
theSitetree.getName = function(id) {                                                    
						var elem = this.getById(id);                                    
						if (elem != null)                                               
							return elem[POS_NAME];                                      
						return null;	                                                
					  };			                                                    
theSitetree.getNavigationText = function(id) {                                          
						var elem = this.getById(id);                                    
						if (elem != null)                                               
							return elem[POS_NAVIGATIONTEXT];                            
						return null;	                                                
					  };			                                                    
					                                                                    
theSitetree.getHREF = function(id) {                                                    
						var elem = this.getById(id);                                    
						if (elem != null)                                               
							return elem[POS_HREF];                                      
						return null;	                                                
					  };			                                                    
					                                                                    
theSitetree.getIsNavigation = function(id) {                                            
						var elem = this.getById(id);                                    
						if (elem != null)                                               
							return elem[POS_ISNAVIGATION];                              
						return null;	                                                
					  };			                                                    
					                                                                    
theSitetree.getTemplateName = function(id, lastTemplateName, ar) {             		 
	                                                                                 
	if (typeof(lastTemplateName) == 'undefined')                                     
		lastTemplateName = this.topTemplateName;	                                 
	if (typeof(ar) == 'undefined')                                                   
		ar = this;                                                                   
		                                                                             
	for (var i=0; i < ar.length; i++) {                                              
		var actTemplateName = ar[i][POS_TEMPLATENAME];                               
		                                                                             
		if (actTemplateName == '')                                                   
			actTemplateName = lastTemplateName;		                                 
		                                                                             
		if (ar[i][POS_ID] == id) {                                			         
			return actTemplateName;                                                  
		}	                                                                         
		                                                                             
		if (ar[i][POS_CHILDS].length > 0) {                                          
			var result=this.getTemplateName(id, actTemplateName, ar[i][POS_CHILDS]); 
			if (result != null)                                                      
				return result;                                                       
		}									                                         
	}                                                                                
	return null;                                                                     
	};                                                                               
/* EOF */					                                                            
