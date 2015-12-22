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
	['PAGE','4436',jdecode('Home'),jdecode(''),'4436.html','true',[],''],
	['PAGE','32802',jdecode('Directions'),jdecode(''),'32802.html','true',[],''],
	['PAGE','32901',jdecode('Tabelle'),jdecode(''),'32901.html','true',[],''],
	['PAGE','32933',jdecode('Bilder+%2B+Gallerie'),jdecode(''),'32933.html','true',[],''],
	['PAGE','32964',jdecode('Externe+Verlinkung'),jdecode(''),'32964.html','true',[],''],
	['PAGE','33057',jdecode('Kontaktformular'),jdecode(''),'33057/index.html','true',[ 
		['PAGE','42102',jdecode('Kontaktformular+%28follow+up+page%29'),jdecode(''),'33057/42102.html','false',[],'']
	],''],
	['PAGE','33088',jdecode('Anfahrtsplan'),jdecode(''),'33088.html','true',[],''],
	['PAGE','33181',jdecode('Animated+Gif'),jdecode(''),'33181.html','true',[],''],
	['PAGE','33212',jdecode('Leere+Seite'),jdecode(''),'33212.html','true',[],''],
	['PAGE','33243',jdecode('Blindtext'),jdecode(''),'33243.html','true',[],''],
	['PAGE','33274',jdecode('Voting'),jdecode(''),'33274.html','true',[],''],
	['PAGE','33305',jdecode('Semantische+Daten'),jdecode(''),'33305.html','true',[],''],
	['PAGE','33336',jdecode('Routenplaner'),jdecode(''),'33336.html','true',[],''],
	['PAGE','33367',jdecode('Blog'),jdecode(''),'33367.html','true',[],''],
	['PAGE','42174',jdecode('Mein+Fotoalbum'),jdecode(''),'42174.html','true',[],''],
	['PAGE','42455',jdecode('Guestbook'),jdecode(''),'42455/index.html','true',[ 
		['PAGE','42456',jdecode('Read+Guestbook'),jdecode(''),'42455/42456.html','true',[],'']
	],''],
	['PAGE','42553',jdecode('Direction'),jdecode(''),'42553.html','true',[],'']];
var siteelementCount=19;
theSitetree.topTemplateName='Movement';
					                                                                    
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
