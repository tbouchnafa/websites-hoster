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
	['PAGE','4481',jdecode('Home'),jdecode(''),'4481.html','true',[],''],
	['PAGE','9743',jdecode('News'),jdecode(''),'9743/index.html','true',[ 
		['PAGE','9770',jdecode('Studio'),jdecode(''),'9743/9770.html','true',[],''],
		['PAGE','9797',jdecode('Termine'),jdecode(''),'9743/9797.html','true',[],'']
	],''],
	['PAGE','9689',jdecode('Wir+%FCber+uns'),jdecode(''),'9689.html','true',[],''],
	['PAGE','9824',jdecode('Fotos'),jdecode(''),'9824/index.html','true',[ 
		['PAGE','11339',jdecode('Fotos+%28Folgeseite%29'),jdecode(''),'9824/11339.html','false',[],'']
	],''],
	['PAGE','9851',jdecode('Musik'),jdecode(''),'9851/index.html','true',[ 
		['PAGE','9878',jdecode('Timeless+Playlist'),jdecode(''),'9851/9878.html','true',[],''],
		['PAGE','9905',jdecode('CDs+%26+MP3'),jdecode(''),'9851/9905.html','true',[],'']
	],''],
	['PAGE','9932',jdecode('Downloads'),jdecode(''),'9932/index.html','true',[ 
		['PAGE','9959',jdecode('Texte'),jdecode(''),'9932/9959.html','true',[],''],
		['PAGE','9986',jdecode('MP3'),jdecode(''),'9932/9986.html','true',[],'']
	],''],
	['PAGE','10013',jdecode('Links'),jdecode(''),'10013.html','true',[],''],
	['PAGE','10067',jdecode('Kontakt'),jdecode(''),'10067.html','true',[],''],
	['PAGE','9402',jdecode('G%E4stebuch'),jdecode(''),'9402/index.html','true',[ 
		['PAGE','9403',jdecode('Eintr%E4ge'),jdecode(''),'9402/9403.html','true',[],'']
	],''],
	['PAGE','10040',jdecode('Impressum'),jdecode(''),'10040.html','true',[],'']];
var siteelementCount=18;
theSitetree.topTemplateName='Flyer';
					                                                                    
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
