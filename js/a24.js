/* all fade and aniate effects are disabilitated - don't work properly on EVERY IE browser _ trasparent background? */
(function($) {
	$.extend(
	{
		a24init : function() {
			$("#maincon").add("#impressum").show();
			$(".logo_start").show();
			// MENU IMAGES HIDING
			$(".logo_singleline_bw").add(".logo_lang").add(".logo_kurz").hide();
			// change overflow of menu
			$("#navigation").add("#navigation div").css("overflow","hidden");
			$(".homelink_container").show();
			$.doMail("post","a24-landschaft","de");
		},
		enableFlashBack : function() {
			//alert("isflas");
			$("#supersize").remove();
			$.a24.isFlashBack = true;
		},
		openSearch : function() {
			$.closeImpre();
			if($.a24.opennwsdiv)
				if($.a24.nwsfinish)
				{
					$.a24.nwsfinish = false;
					$.a24.opennwsdiv = null;
				}
				else
					$.a24.shutupnwsdv = true;
			$("#menuH .suche").find("a").addClass("aktiv");
			if(!$.a24.closeNavi)
				$.resetProjects();
			$.a24.closeNavi = true;
			if($.a24.doFading)
			{
				$("#menu_suche").stop().fadeTo(500, 1);
				$("#navigation_logos .logo_singleline_bw").stop().fadeTo(500, 1);
			}
			else
				$("#navigation_logos .logo_singleline_bw").show();
			$("#suchfeld").attr("value","");
			$("#menu_suche").show();
			//$("#suchfeld").focus().autocomplete();
			if(!$.a24.has_touch) {
	       $("#suchfeld").focus(); 
			}
			$.a24.aktivmenu = "menu_suche";
		},
		openProject : function() {
			if($.a24.opennwsdiv)
				if($.a24.nwsfinish)
				{
					$.a24.nwsfinish = false;
					$.a24.opennwsdiv = null;
				}
				else
					$.a24.shutupnwsdv = true;
			$("#menu_projekte a").each(function(){
				$(this).removeClass("aktiv");
			});
			$.each($.a24.arrProjeParam, function(k,v){
				v.length = 0;
			})
			$.a24.closeNavi = false;
			if($.a24.doFading)
			{
				//$("#navigation_logos .logo_menuH").stop().fadeTo(200, 0);
				$("#navigation_logos .logo_menu").stop().fadeTo(300, 0);
				$("#navigation_logos .logo_lang").stop().fadeTo(500, 1);
				if(!$.a24.has_touch) {
          $("#menuH .suche a").add("#menuH .buero a").stop().fadeTo(50, 0).mouseover(function()
          {
					  $(this).stop().fadeTo(50, 1);
          });
        }
			}
			else
			{
				//$("#navigation_logos .logo_menuH").hide();
				$("#navigation_logos .logo_menu").show();
				$("#navigation_logos .logo_lang").show();
        if(!$.a24.has_touch) {
				  $("#menuH .suche a").add("#menuH .buero a").addClass("invisible").mouseover(function(){
            $(this).removeClass("invisible");
          });
        }
			}
			$.closeImpre();
			$("#menu_projekte div").each(function() 
			{
				if($(this).attr("class")!="")
				{
					$(this).mousemove(function(e) 
					{
						if($(this).find("div").height()>$(this).height())
						{
							$.scrollMenuDV($(this),e,"dx");
						}
					});
				}		
			});
			if($.a24.doFading)
				$("#menu_projekte").stop().fadeTo(500, 1,function(){
					$.getProjeData();
				});
			else
			{
				$("#menu_projekte").show();
				$.getProjeData();
			}
			$.a24.longmenu = true;
		}, 
    openBuero : function(id) {
			
			$("#menu_buero").find("a.aktiv").removeClass("aktiv");
			$("#menuH .buero a").addClass("aktiv");
			$("#impressum").remove();
			if($.a24.contentdv)
				$.resetContent();
			if($.a24.opennwsdiv)
				if($.a24.nwsfinish)
				{
					$.a24.nwsfinish = false;
					$.a24.opennwsdiv = null;
				}
				else
					$.a24.shutupnwsdv = true;
			$.resetProjects();
			$.a24.closeNavi = false;
			$.a24.aktivmenu = "menu_buero";
			if(id!=null)
			{
				$(".menu_news").add(".menu_preise").hide();
				$.changenavi(true);
				arrID = id.split("-");
				ber = arrID[0];
			}
			else
				ber = "aktuell";
			if(ber=="kontakt")
			{
				$.changenavi(false);
				$.openKont();
			}
			else
			{
				if($.a24.doFading)
				{
					$("#news_home").stop().fadeTo(200, 0,function(){
						$(this).remove();
					});
					$("#navigation_logos .logo_menu").stop().fadeTo(300, 0);
					$("#navigation_logos .logo_kurz").stop().fadeTo(500, 1);
					
          if(!$.a24.has_touch) {
            $("#menuH .suche a").add("#menuH .projekte a").stop().fadeTo(50, 0);
          }
					
          $("#menu_buero").stop().fadeTo(500, 1,function()
					{
						$("#"+ber).addClass("aktiv");
						if(ber=="aktuell")
							$.openAktuell(id);
						else if(ber=="publikationen")
							$.openPub(arrID[1]);
						else if(ber=="preise")
							$.openPreise(id);
						else if(ber=="mitarbeiter")
							$.openMitab(id);
					});
				}
				else
				{
					$("#navigation_logos .logo_start").hide();
					$("#news_home").hide().remove();
					$("#navigation_logos .logo_menu").hide();
					$("#navigation_logos .logo_kurz").show();

          if(!$.a24.has_touch) {
            $("#menuH .suche a").add("#menuH .projekte a").addClass("invisible");            
          }

					$("#menu_buero").css({zIndex:20}).show();
					$("#"+ber).addClass("aktiv");
					if(ber=="aktuell")
						$.openAktuell(id);
					else if(ber=="publikationen")
						$.openPub(arrID[1]);
					else if(ber=="preise")
						$.openPreise(id);
					else if(ber=="mitarbeiter")
						$.openMitab(id);
				}
			}
		},
		closeMenu : function() {
			if($.a24.doFading)
				$("#"+$.a24.aktivmenu).stop().fadeTo(300, 0, function(){
					$(this).hide();
				});
			else
				$("#"+$.a24.aktivmenu).hide();
			$.a24.aktivmenu = "";
			if($.a24.longmenu)
			{
				if($.a24.doFading)
				{
					$("#navigation_logos .logo_lang").stop().fadeTo(300, 0, function(){
						$(this).hide();
					});
				}
				else
				{
					$("#navigation_logos .logo_lang").hide();
				}
					
				$.a24.longmenu = false;
			}
			else
			{
				if($.a24.doFading)
				{
					$("#navigation_logos .logo_singleline_color").stop().fadeTo(500, 0);
					$("#navigation_logos .logo_singleline_bw").stop().fadeTo(500, 0);
					$("#navigation_logos .logo_kurz").stop().fadeTo(300, 0);
				}
				else
				{
					$("#navigation_logos .logo_singleline_color").hide();
					$("#navigation_logos .logo_singleline_bw").hide();
					$("#navigation_logos .logo_kurz").hide();
				}
			}
		},
		search : function(event,input,lan) {
			if($.a24.contentdv)
				$.resetContent();
			$.closeKonta(true);
			$.a24.searching = true;
			//$("#debug").html(event.keyCode)
			if(event.keyCode == 13 || event.keyCode == 9 || event.keyCode == 20 || event.keyCode == 224 || event.keyCode == 18 || event.keyCode == 17)
				event.preventDefault();
			if(event.keyCode == 27)
				input.attr("value","");
			var search_param = input.val();
			if(search_param!="")
			{
				//$.a24.searched_param = search_param;
				search_param = $.trim(search_param);
				$.startSearch(search_param, input, lan);
			}
			else
			{
				$.doList(true, null, null);
			}
		},
		startSearch : function(search_param,input,lan) {
			//$("#debug").html("search")
			$.a24.ajaxobj = $.ajax({
				// try to leverage ajaxQueue plugin to abort previous requests
				//mode		: "abort",
				// limit abortion to this input
				port		  : "search",
				cancel	  : true,
				url			  : "inc/search.php",
				type		  : "POST",
				dataType  : "json",
				timeout   : 1000,
				data		  : {suchfeld:search_param,sl:$.a24.sl},
				success: function(data) 
				{
					if(data)
					{
            console.log(data);
						if(data!="EMPTY") 
						{
							$.doList(false,data,true);
						}
						else
						{
							$.doList(true,null,null);
						}	
					}
				}
			});
		},
		doList : function(dellist,data,search) {
			if(dellist)
			{
				$.stopRequest();
				$("#projektlist").html("");
			}
			else
			{
				$("#impressum").remove();
				$.resetProjects();
				sec = null;
				jahr = null;
				startedjahrlist = false;
				i = 1;
				listitems = 24;
				closelist = false;
				strhtml = "";
				xsprung = 0;
				marginleftOr = marginleft = 93;
				margin_move = 4;
				zindex=100;
				maxstrlength = 50;        
				sprung = 290;
				top_val = top_val_Or = 4;
				top_val_move = 16;
				search ? classe="search" : classe="project";
				
        // iterate over database tables searched, k is the key, row is an array of the rows retreived from that table)
        // so we look at entries grouped by "Projekte", "Publikationen" etc. 
        $.each(data, function(k, row)
				{
					if(i == listitems)
					{	
						zindex++;
						xsprung = xsprung + sprung;
						strhtml += "</ul></div><div style='left:"+xsprung+"px' class='"+classe+"'><ul>";
						i = 1;
						marginleft=marginleftOr;
						top_val = top_val_Or;
					}	
					else if(i == 1)
						strhtml += "<div style='left:"+xsprung+"px;' class='"+classe+"'><ul>";
						
					if(search && sec != k)
					{
						if(i != 1)
						{
							strhtml +="<li style='top:"+top_val+"px;margin-left:"+marginleft+"px' class='title'></li>";
							marginleft = marginleft - margin_move;
							top_val = top_val + top_val_move;
							i++;
						}
						if(i == listitems || ((i+1)==listitems))
						{	
							zindex++;
							xsprung = xsprung + sprung;
							strhtml += "</ul></div><div style='left:"+xsprung+"px' class='"+classe+"'><ul>";
							i=1;
							marginleft = marginleftOr;
							top_val = top_val_Or;
						}
						marginleft = marginleft - margin_move;
						strhtml +="<li class='title' style='top:"+top_val+"px;margin-left:"+marginleft+"px'>"+k+"</li>";
						sec = k;
						top_val = top_val + top_val_move;
						i++;
					}
          
          // iterate over the rows in the current table, such as "Projekte"
					$.each(row, function(key, value)
					{
						key = key.replace("a", "");
						val = value.split("#");
						// Parts of val array
						/*
						0 -> TBL _ section index
						1 -> YEAR
						2 -> NAME / Title
						3 -> MINIATUR _ for projects only
						*/
						value = val[2]; 

            // for projects, add special yearly headlines and thumbnails
						if(val[0]=="projekte")
						{
              if(val[1] != jahr) // if the year has changed
							{
                // if column is complete (or we've started the year list and it's almost complete)
								if(i == listitems || ((i + 1) == listitems) || (((i + 2) == listitems) && startedjahrlist) )
								{
									zindex++;
									xsprung = xsprung + sprung;
									strhtml += "</ul></div><div style='left:"+xsprung+"px' class='"+classe+"'><ul>"; // start a new column
									i = 1;
									marginleft = marginleftOr;
									top_val = top_val_Or;
								}
								
                if(i != 1 && startedjahrlist)
								{
									strhtml +="<li style='top:"+top_val+"px;margin-left:"+marginleft+"px' class='title'></li>"; // show an empty line
									marginleft = marginleft - margin_move;
									top_val = top_val + top_val_move;
									i++;
								}
								jahr = val[1]; // save the current year
								marginleft = marginleft - margin_move;
								
                // show the year headline
                strhtml += "<li class='untertitle' style='top:"+top_val+"px;margin-left:"+marginleft+"px'>"+ jahr +"</li>";
								
                sec = k;
								top_val = top_val + top_val_move;
								i++;
								startedjahrlist = true;
							}
              
							// thumbnails
							if(val[3] != "" && !$.a24.has_touch)
							{
								//$("#debug").html(key)
								dvthmb = dvtxt = $("<div/>")
								.addClass("proje_thumbs")
								.attr({"id":"projimg"+key})
								.appendTo("#projektlist")
								.hide();
								img = $("<img/>")
								.attr({"src":$.a24.imgFOLD+val[3],"id":"projgall"+i})
								.appendTo(dvthmb);
							}
						}
        
            // if column is complete or almost complete and value goes over two lines
            if(i == listitems || (i == (listitems - 1) && value.length >= maxstrlength))
						{	
							zindex++;
							xsprung = xsprung + sprung;
							strhtml += "</ul></div><div style='left:"+xsprung+"px' class='"+classe+"'><ul>"; // start a new column
							i = 1;
							marginleft = marginleftOr;
							top_val = top_val_Or;
						}
						//$("#debug").append(value+" - "+value.length+"<br>")
						
            zindex++;

						if(val[0] == "mitarbeiter")
							id = val[0]+"#"+val[1]+"#"+key;
						else if(val[0] == "publikationen")
							id = val[0]+"#pub_"+key;
						else
							id = val[0]+"#"+key;

						m = val[0];
						c = "";						
            if(m != "projekte")
						{
							m = "buero";
							c = val[0];
						}
            
            // if the value fits on one line
						if(value.length < maxstrlength)
						{
							marginleft = marginleft - margin_move;
              // show the value
							strhtml +="<li style='top:"+top_val+"px;margin-left:"+marginleft+"px;z-index:"+zindex+"' id='"+id+"'><a href='?m="+m+"&c="+c+"&id="+key+"&sl="+$.a24.sl+"' class='listlink' id='"+id+"'>"+value+"</a></li>";
							top_val = top_val + top_val_move;
							i++;
						}
            // if not
						else
						{
							marginleft = marginleft - (margin_move*2);
              // shorten the value so it fits on two lines
							if(value.length > 60)
								value = value.substring(0, 60) + " [...]";
              // show the value
              strhtml +="<li class='double' style='top:"+top_val+"px;margin-left:"+marginleft+"px;z-index:"+zindex+"' id='"+id+"'><a href='?m="+m+"&c="+c+"&id="+key+"&sl="+$.a24.sl+"' id='"+id+"'>"+value+"</a></li>";
							top_val = top_val + (top_val_move*2);
							i = i + 2;
						}
            
					});
				});
				
        if(closelist)
					strhtml += "</ul></div>";
				
				$("#projektlist").append(strhtml);
        
        $("#projektlist div:last-child").addClass('last-column'); // make some space for thumbnail all the way on the right
        
				/* projekt list functions */
				$("#projektlist li").add("#projektlist a").click(function(event){
          //console.log("projektlist link clicked");
					event.preventDefault();
					$.openSection(this.id);
				});
        
        // if it's not a touch device, setup hover events on links
        if(!$.a24.has_touch) {
  				$("#projektlist li").hover(
            function(event){
          
  					para = this.id.split("#");
  					if(para[0]=="projekte")
  					{
  						nX = parseInt($(this).parent().parent().css("left"))
  						nX = nX+(parseInt($(this).css("margin-left"))+parseInt($(this).css("width"))+20);
  						nY = parseInt($(this).css("top"))-4;
  						//$("#debug").html()
  						if($.a24.doFading)
  							$("#projimg"+para[1]).css({"top":nY,"left":nX,"z-index":200}).fadeTo(500, 0.85);
  						else
  							$("#projimg"+para[1]).css({"top":nY,"left":nX,"z-index":200}).show();
  					}
  					event.preventDefault();
          
  				},function(event){
          
  					para = this.id.split("#");
  					if(para[0]=="projekte")
  					{
  						$("#projimg"+para[1]).css({"z-index":5}).hide();
  					}
  					event.preventDefault();
  				});
        }
        
				if($.a24.doFading)
				{
					$("#news_home").stop().fadeTo(200, 0,function(){
						$(this).remove();
					});
					$("#projektlist").stop().fadeTo(200, 1);
				}
				else
				{
					$("#news_home").hide().remove();
					$("#projektlist").show();
				}
				//$('#supersize').resizenow();
        
			}
		},
		stopRequest : function() {
			if($.a24.ajaxobj!=null)
			{
				//alert($.a24.ajaxobj)
				//$.a24.ajaxobj.abort();
				$.a24.ajaxobj = null;
			}
		},
		getProjeData : function() {
			$.a24.ajaxobj = $.ajax({
				// try to leverage ajaxQueue plugin to abort previous requests
				//mode		: "abort",
				// limit abortion to this input
				port		: "projdata",
				cancel		: true,
				url			: "inc/getproje.php",
				type		: "POST",
				dataType	: "json",
				timeout 	: 1000,
				data		: {param:$.a24.arrProjeParam,sl:$.a24.sl},
				success: function(data) 
				{
					//$("#debug").html("cc"+data);
					if(data)
					{
						if(data!="EMPTY") 
						{
							$.doList(false,data,false);
						}
						else
						{
							$.doList(true,null,null);
						}		
					}
				}
			});
		},
		updProjeParam : function(add,param){
			param = param.split("-");
			if(add)
			{
				$.a24.arrProjeParam[param[1]].push(param[2])
			}
			else
			{
				for(var i=0; i<$.a24.arrProjeParam[param[1]].length;i++ )
				{
					if($.a24.arrProjeParam[param[1]][i]==param[2])
					$.a24.arrProjeParam[param[1]].splice(i,1);
				}
			}
			$.getProjeData();
		},
		resetProjects : function() {
			$.stopRequest();
			$.doList(true,null,null);
      // remove swipe events
      $("#maincon").off();
      if($.a24.has_touch) { // unlock menu if it is a touch display
        $('#navigation').css('position', 'absolute');
        $('#navigation_logos').css('position', 'absolute');                
      }
      
		},
		openSection : function(param) {
			//$("#debug").html(param);
      console.log(param);
			param = param.split("#");
			if(param[0]=="projekte")
			{
				$.resetProjects();
        console.log($.a24.longmenu);
				//if($.a24.longmenu) {
					$.closeMenu();
          $.a24.menuOpen = false;
        //}
				if($.a24.doFading)
				{
					$("#menuH").stop().fadeTo(20, 0);
					$("#menuH .suche a").add("#menuH .buero a").stop().fadeTo(20, 1,function(){
						$("#menuH").find("a.aktiv").removeClass("aktiv");
					});
					//$("#navigation_logos .logo_start").stop().fadeTo(500, 1,function(){
            $("#navigation_logos .logo_start").css('opacity', 1);            
						$.getProje(param[1]);
          //});
				}	
				else
				{
					$("#menuH .suche a").add("#menuH .buero a").removeClass("invisible");
					$("#menuH").hide();
					$("#navigation_logos .logo_start").show();
					$("#menuH").find("a.aktiv").removeClass("aktiv");
					$.getProje(param[1]);
				}
				$.a24.closeNavi = true;
			}
			else
			{
				param[0] = param[0].toLowerCase();
				if(param[0]=="ueber")
					param[0]="kontakt";
				if(param[0]=="mitarbeiter")
					$.openBuero(param[0]+"-"+param[1]+"-"+param[2]);
				else
					$.openBuero(param[0]+"-"+param[1]);				
			}
		},
		getProje : function(id) {
			//$("#debug").html(id);
      console.log(id);
			$.a24.ajaxobj = $.ajax({
				// try to leverage ajaxQueue plugin to abort previous requests
				//mode		: "abort",
				// limit abortion to this input
				port		: "proje",
				cancel		: true,
				url			: "inc/getprojdata.php",
				type		: "POST",
				dataType	: "json",
				timeout 	: 1000,
				data		: {id:id,sl:$.a24.sl},
				success: function(data) 
				{
          console.log(data);
					//$("#debug").html("cc"+data);
					if(data)
					{
						if(data!="EMPTY") 
						{
							imgtochange = null;
							//$("#debug").html("cc"+data);
							$.a24.contentdv = $("<div/>")
							.hide()
							.addClass("proje_detail_main")
							.appendTo(document.body);
							$.each(data, function(group,arrdata){
								if(group=="DATA" || group=="EXTRA")
								{
									if(group=="DATA")
									{
										/* project text */ 
										dvtxt = $("<div/>")
										.addClass("proje_detail_text")
										.html("<div class='proje_detail_text_innen'><h1>"+arrdata["name"]+"</h1>"+arrdata["txt"]+"</div>")
										.hide();
										dvcloseline = $("<div/>")
										.addClass("proje_detail_closeline")
										.html("<a href='#' class='closetext'>â€”</a>").appendTo(dvtxt);
										dvtxt.appendTo($.a24.contentdv);
										/* project data */ 
										dvdata = $("<div/>")
										.addClass("proje_detail_data")
										.css({left:"0px",height:"20px"});
										dvdata_inner = $("<div/>")
										.addClass("proje_detail_data_innen")
										.html("<h1>"+arrdata["name"]+"</h1>")
										.appendTo(dvdata);
										list = $("<ul/>").appendTo(dvdata_inner);
										$.each(arrdata, function(k,v){
											if(k!="name"&&k!="txt")
											{
												if(v==null)
													v= "";
												tit = k.replace("_"," ");	
												var li = $("<li/>").html("<span class='capi'>"+tit+"</span>: "+v).appendTo(list);
											}
										});
									}	
									if(group=="EXTRA")
									{
										var li = $("<li/>").html("&nbsp;").appendTo(list);
										str = "";
										if(typeof(arrdata["pdf"])!="undefined" && arrdata["pdf"]!="")
											str += "<a href='/data/pdf/"+arrdata["pdf"]+"'>PDF</a>&nbsp;&nbsp;";
										if(arrdata["isPreis"]==1)
											str += "<a href='?m=preise&i="+arrdata["id_PREIS"]+"' id='preise-"+arrdata["id_PREIS"]+"'>"+$.a24.txt_preise+"</a>&nbsp;&nbsp;";
										if(arrdata["isPub"]==1)
											str += "<a href='?m=buero&c=pubs#proj_"+id+"' id='publikationen-proj_"+id+"'>"+$.a24.txt_publikationen+"</a>&nbsp;&nbsp;";
										var li = $("<li/>").html(str).addClass("extras").appendTo(list);
										
										$("li.extras a").click(function(event){
											$.openBuero(this.id);
											event.preventDefault();
										});
									}
									
									dvcloseline = $("<div/>")
									.addClass("proje_detail_closeline")
									.html("<a href='#' class='closedata'>â€”</a>").appendTo(dvdata);	
									dvdata.appendTo($.a24.contentdv);
									$("a.mitablink").click(function(event){
										if($(this).attr("name")==1) // user aktiv
											$.openSection(this.id);
										event.preventDefault();
									});
								}
								if(group=="IMAGES")
								{
									dvimg = $("<div/>")
									.addClass("proje_detail_images")
									.css("left","471px")
									.html("<div class='proje_detail_images_left'></div>");
									dvimg_inner = $("<div/>")
									.addClass("proje_detail_images_inner")
									.appendTo(dvimg);

									i = 1;
                  imageLinkIds = []; // an array of Ids to use later for swiping
                  imageLinkIds.push(null); // first position if empty
                  var currentImageIndex = 1;
                   
									$.each(data["IMAGES"], function(k, arrIMG) {
										id = i+"_"+arrIMG["neg"]+"_"+arrIMG["url"];
                    imageLinkIds.push(id);
										if(i == 1) {
											imgtochange = id;
                    }
										i == 1 ? classe = "aktiv" : classe = "";
										dvimg_inner.append("<a href='#' rel='"+id+"' class='"+classe+"'>"+i+"</a>");
										i++;
									});

									dvimg.append("<div class='proje_detail_images_right'></div>");
									dvimg.appendTo($.a24.contentdv);
									        
                  // setup click events on image links
                  $("div.proje_detail_images_inner a").click(function(event){
										//$(this).parent().find("a.smalloader img").show();
										$(this).parent().find("a.aktiv").removeClass("aktiv");
										$(this).addClass("aktiv");
										param = $(this).attr("rel").split("_");
										$.changeIMG(param[0], param[1], param[2]);
										event.preventDefault();
									});
                  
                  // listen for swipe events and load next iamge in both directions
                  $("#maincon").off();
                  $("#maincon").on('swipeleft', function() {
                    link = $('div.proje_detail_images_inner a[rel="' + imageLinkIds[currentImageIndex] + '"]');
                    link.removeClass("aktiv");                      
                    if(currentImageIndex < imageLinkIds.length - 1) {
                      currentImageIndex++;
                    } else {
                      currentImageIndex = 1;
                    }                    
                    param = imageLinkIds[currentImageIndex].split("_");
                    $.changeIMG(param[0], param[1], param[2]);
                    link = $('div.proje_detail_images_inner a[rel="' + imageLinkIds[currentImageIndex] + '"]');
                    link.addClass("aktiv");
                  });

                  $("#maincon").on('swiperight', function() {
                    link = $('div.proje_detail_images_inner a[rel="' + imageLinkIds[currentImageIndex] + '"]');
                    link.removeClass("aktiv");                      
                    if(currentImageIndex > 1) {
                      currentImageIndex--;
                    } else {
                      currentImageIndex = imageLinkIds.length - 1;
                    }
                    param = imageLinkIds[currentImageIndex].split("_");
                    $.changeIMG(param[0], param[1], param[2]);
                    link = $('div.proje_detail_images_inner a[rel="' + imageLinkIds[currentImageIndex] + '"]');
                    link.addClass("aktiv");                      
                  });
                                    
								}
							});
							/* navigation buttons */
							var navidv = $("<div/>")
							.addClass("proje_detail_navigation")
							.html("<a href='#' class='daten'>"+$.a24.txt_daten+"</a>&nbsp;&nbsp;<a href='#' class='text'>"+$.a24.txt_text+"</a>")
							.appendTo($.a24.contentdv);
							
              $("a.daten").click(function(event){
								$(this).addClass("aktiv");
								$.a24.isProjeData = true;
								if($.a24.doFading)
								{
									if($.a24.isProjeText)
									{
										$(".proje_detail_data").animate({opacity: 1,left:"376px"},200,function(){
											$(this).animate({height:"227px"},200);
										});
										$(".proje_detail_images").animate({left:"847px"},200);
									}
									else
										$(".proje_detail_data").animate({height:"267px"},200);
								}
								else
								{
									if($.a24.isProjeText)
									{
										$(".proje_detail_data").show();
										$(".proje_detail_data").css({left:"376",height:"267px"})
										$(".proje_detail_images").css({left:"847px"})
									}
									else
										$(".proje_detail_data").css({height:"267px"})
								}
								$(".proje_detail_data .proje_detail_closeline").addClass("aktiv");
								$.checkprojedetailimage();
								$.checkprojedetailstatus();
								event.preventDefault();
							});
							
              $("a.text").click(function(event){
                console.log('text open clicked');
								$(this).addClass("aktiv");
								$.a24.isProjeText = true;
								if($.a24.doFading)
								{
									if($.a24.isProjeData)
									{
										$(".proje_detail_images").animate({left:"847px"},200);
										$(".proje_detail_data").animate({left:"376px"},200);
									}
									else {
										$(".proje_detail_data").stop().fadeTo(200, 0);
                  }
							    $(".proje_detail_text").show().animate({opacity: 1, height:"400px"},200);

								}
								else
								{
									if($.a24.isProjeData)
									{
										$(".proje_detail_images").css({left:"847px"})
										$(".proje_detail_data").css({left:"376px"})
									}
									else {
										$(".proje_detail_data").hide();
                  }
									$(".proje_detail_text").css({height:"400px"}).show();
								}
								$(".proje_detail_text .proje_detail_closeline").addClass("aktiv");
								$.checkprojedetailimage();
								$.checkprojedetailstatus();
								event.preventDefault();
							});
							$("a.closedata").click(function(event){
								$("a.daten").removeClass("aktiv");
								$.a24.isProjeData = false;
								if($.a24.doFading)
								{
									if($.a24.isProjeText)
									{
										$(".proje_detail_data").animate({height:"20px"},200,function(){
											$(this).animate({opacity: 0,left:"0px"},200);
											$(".proje_detail_images").animate({left:"471px"},200);
											$.checkprojedetailimage();
										});
									}
									else
										$(".proje_detail_data").animate({height:"20px"},200);
								}
								else
								{
									if($.a24.isProjeText)
									{
										$(".proje_detail_data").css({left:"0",height:"20px"});
										$(".proje_detail_images").css({left:"471px"});
										$(".proje_detail_data").hide();
										$.checkprojedetailimage();
									}
									else
										$(".proje_detail_data").css({height:"20px"})
								}
								$(".proje_detail_data .proje_detail_closeline").removeClass("aktiv");
								$.checkprojedetailstatus();
								event.preventDefault();
							});
							$("a.closetext").click(function(event){
                console.log('text closed clicked');
                $("a.text").removeClass("aktiv");
								$.a24.isProjeText = false;
								if($.a24.doFading)
								{
									if($.a24.isProjeData)
									{
										$(".proje_detail_images").animate({left:"471px"},200);
										$(".proje_detail_data").animate({left:"0px"},200);
									}
									$(".proje_detail_text").animate({height:"20px"},200,function(){
										$(".proje_detail_data").stop().fadeTo(200, 1);
										$(this).hide();
									});
								}
								else
								{
									if($.a24.isProjeData)
									{
										$(".proje_detail_images").css({left:"471px"})
										$(".proje_detail_data").css({left:"0px"})
									}
									else
										$(".proje_detail_data").show();
									$(".proje_detail_text").css({height:"20px"}).hide();
								}
								$(".proje_detail_text .proje_detail_closeline").removeClass("aktiv");
								$.checkprojedetailimage();
								$.checkprojedetailstatus();
								event.preventDefault();
							});
							
              if($.a24.doFading)
								$.a24.contentdv.stop().fadeTo(200, 1,function(){
									if(imgtochange!=null)
									{
										imgtochange = imgtochange.split("_");
										$.changeIMG(imgtochange[0],imgtochange[1],imgtochange[2]);
									}	
								});
							else
							{
								$.a24.contentdv.show();
								if(imgtochange!=null)
								{
									imgtochange = imgtochange.split("_");
									$.changeIMG(imgtochange[0],imgtochange[1],imgtochange[2]);
								}
							}
							
              /* setting dragging coordinates */
							maxX = $(window).width()-$(".proje_detail_text").width()+5;
							if($(".proje_detail_images"))
							{
								//$("#debug").html(""+$(".proje_detail_images_inner").width()+"");
								$(".proje_detail_images").css({"width":$(".proje_detail_images_inner").width()+29})
								maxX = maxX-$(".proje_detail_images").width();
							}
							//$("#debug").html($(window).height())
              /*$.a24.contentdv.draggable({ 
							  containment: [-90, 5, maxX, ($(window).height()-25)],
                scroll: false,
                drag: function(event, ui) {
							  }
              });*/
							
              if($.a24.has_touch) { // fix menu if it is a touch display
                $('#navigation').css('position', 'fixed');
                $('#navigation_logos').css('position', 'fixed');                
              }
						}		
					}
				}
			});
		},
		changeIMG : function(i,neg,url) {
			$("#imgLoad").css({width:"0%"}).animate({width:"100%"},2000,function(){
				$(this).hide();
			}).show();
			if(neg==1)
			{
				$("#navigation").addClass("neg");
			}
			else
			{
				$("#navigation").removeClass("neg");
			}
			if($.a24.isFlashBack)
			{
				var flash = document.getElementById("flash");
				flash.loadImgSwf($.a24.imgFOLD+url);
			}
			else
			{
				$("#supersize .defimg").attr("src",$.a24.imgFOLD+url).bind("load", function() {
          $('#supersize').resizenow();
					$("#imgLoad").stop().hide();
				});
			}
			$.a24.projimg = i;
		},
		checkprojedetailstatus : function() {
			if($.a24.isProjeData&&$.a24.isProjeText)
				$(".proje_detail_navigation").hide();
			else
				$(".proje_detail_navigation").show();
		},
		checkprojedetailimage : function() {
			if($.a24.isProjeText&&!$.a24.isProjeData)
			{
				$(".proje_detail_images_left").css({"background-image":"url(/imago/fixed/sfondini_inner_proje_fotos_sx_black.png)"});
				$(".proje_detail_images_inner").css({"background-image":"url(/imago/fixed/sfondini_inner_proje_fotos_black.png)"});
				$(".proje_detail_images_right").css({"background-image":"url(/imago/fixed/sfondini_inner_proje_fotos_dx_black.png)"});
				$(".proje_detail_images_inner").addClass("black");
				$(".proje_detail_navigation").addClass("rosa");
			}
			else
			{
				$(".proje_detail_images_left").css({"background-image":"url(/imago/fixed/sfondini_inner_proje_fotos_sx.png)"});
				$(".proje_detail_images_inner").css({"background-image":"url(/imago/fixed/sfondini_inner_proje_fotos.png)"});
				$(".proje_detail_images_right").css({"background-image":"url(/imago/fixed/sfondini_inner_proje_fotos_dx.png)"});
				$(".proje_detail_images_inner").removeClass("black");
				$(".proje_detail_navigation").removeClass("rosa");
			}
		},
		changenavi : function(on) {
			if(on)
			{
        $.a24.menuOpen = true;
				if($.a24.doFading)
				{
					$("#menuH .suche a").add("#menuH .projekte a").stop().fadeTo(200, 1);
					$("#navigation_logos .logo_start").stop().fadeTo(500, 0);
				}		
				else
				{
					$("#menuH .suche a").add("#menuH .projekte a").removeClass("invisible");
					$("#navigation_logos .logo_start").hide();
				}				
				$("#menuH li").each(function(){
					if($.a24.doFading)
						$(this).stop().fadeTo(200, 1);
					else
						$(this).removeClass("invisible");
				});
				if($.a24.doFading)
					$("#menuH").stop().fadeTo(200, 1);
				else
					$("#menuH").show();
			}
			else
			{
        $.a24.menuOpen = false;
				if($.a24.doFading)
					$("#menuH").stop().fadeTo(200, 0,function(){
						$(this).find("a.aktiv").removeClass("aktiv");
					});
				else
				{
					$("#menuH").hide();
					$("#menuH").find("a.aktiv").removeClass("aktiv");
				}
				$.closeMenu();
				if($.a24.doFading)
					$("#navigation_logos .logo_start").stop().fadeTo(500, 1);
				else
					$("#navigation_logos .logo_start").stop().show();
			}
		},
		resetContent:function() {
			$.a24.isProjeData = $.a24.isProjeText = false;
			$.a24.contentdv.html("").remove();
			$.a24.contentdv = null;
		},
		closeImpre : function() {
			if($.a24.aktivbody=="impressum")
			{
				$("#impressum_text").css({zIndex:11});
				if($.a24.doFading)
					$("#impressum_text").stop().fadeTo(50, 0,function(){
						//$("#impressum_background").stop().fadeTo(50, 0);
						$("#impressum_background").hide();
						$("#news_home").stop().fadeTo(200, 1);
					});
				else
				{
					$("#impressum_background").hide();
					$("#impressum_text").hide();
					$("#news_home").show();
				}
				$(".impressum").show();
				$.a24.aktivbody = null;
			}
		},
		closeKonta : function (cback) {
			if($.a24.aktivbody=="kontakt")
			{
				$("#kontakt_text").css({zIndex:11});
				if($.a24.doFading)
					$("#kontakt_text").stop().fadeTo(200, 0,function(){
						if(cback)
							$("#impressum_background").hide();
					});
				else
				{
					if(cback)
						$("#impressum_background").hide();
					$("#kontakt_text").hide();
				}
				$.a24.aktivbody = null;
			}
		},
		encode : function(str) {
			nStr = "";
			for (var i = 0; i < str.length; i++)
			{
				nStr += "&#" + Number(str.charCodeAt(i)).toString() + ";";
			}
			return nStr;	
		},
		doMail : function(usr,dom,tld) {
			prex = $.encode("mailto:");
			at = "@";
			dt = ".";
			ecMail = $.encode(usr+at+dom+dt+tld);
			ecMailTXT = usr+"(at)"+dom+dt+tld;
			$(".mailspan").html("<a href=\""+prex+ecMail+"\">"+ecMailTXT+"</a>");
		},
		openKont : function() {
			$(".menu_news").add(".menu_preise").add(".menu_mitab").add(".menu_mitab_list").hide();
			$.a24.closeNavi = true;
			$.a24.aktivbody = "kontakt";
			if($.a24.doFading)
				$("#impressum_background").stop().fadeTo(50, 1,function(){
					if($('#supersize .mitab_img').length)
						$('#supersize .mitab_img').fadeTo(50, 1,function(){
							$(this).attr("src",$.a24.imgFOLD+"../fixed/trasp.png").hide();
						});
					$("#kontakt_text").css({zIndex:20}).stop().fadeTo(200, 1);
				});
			else
			{
				$("#impressum_background").show();
				if($('#supersize .mitab_img').length)
					$('#supersize .mitab_img')
					.attr("src",$.a24.imgFOLD+"../fixed/trasp.png")
					.hide();//.remove();
				$("#kontakt_text").show();
			}
			
		},
		openPub : function(id,pag) {
			$.a24.closeNavi = false;
			$.closeKonta(false);
			$.stopRequest();
			if($.a24.doFading)
				$("#impressum_background").stop().fadeTo(50, 1,function(){
					if($('#supersize .mitab_img').length)
						$('#supersize .mitab_img').fadeTo(50, 1,function(){
							$(this).attr("src",$.a24.imgFOLD+"../fixed/trasp.png").hide();
						});
					$(".menu_news").add(".menu_preise").add(".menu_mitab").add(".menu_mitab_list").hide();
				});
			else
			{
				$("#impressum_background").show();
				if($('#supersize .mitab_img').length)
					$('#supersize .mitab_img').attr("src",$.a24.imgFOLD+"../fixed/trasp.png").hide();//.remove();
				$(".menu_news").add(".menu_preise").add(".menu_mitab").add(".menu_mitab_list").hide();
			}
			
			if($(".inhalt_pubs").find(".paging_pubs").length==0)
			{
				dvdata = $("<div/>").addClass("inhalt_pubs");
				dvinh = $("<div/>")
				.addClass("inhalt_pubs_content")
				.appendTo(dvdata);
			}
			else
			{
				dvdata = $(".inhalt_pubs");
				dvinh = $(".inhalt_pubs_content");
			}
			$.a24.ajaxobj = $.ajax({
				// try to leverage ajaxQueue plugin to abort previous requests
				//mode		: "abort",
				// limit abortion to this input
				port		: "pubs",
				cancel		: true,
				url			: "inc/getpubs.php",
				type		: "POST",
				dataType	: "json",
				timeout 	: 1000,
				data		: {sl:$.a24.sl,id:id,pag:pag},
				success: function(data) 
				{			
					if(data)
					{
						if(data!="EMPTY") 
						{
							proj = null;
							txt = txtpag = "";
							$.each(data, function(k,row)
							{
								$.each(row, function(key,value)
								{		
									if(key!="a0")
									{
										val = value.split("#");
										if(proj!=val[0])
										{
											if(txt != "")
												txt += "<li style=\"margin-bottom:15px\"></li></ul>";
											pdata = val[0].split("-");
											if(pdata[0]=="")
												pdata[0] = 0;
											txtl = "<a id=\"projekte#"+pdata[0]+"\" class=\"listlink\" href=\"?m=projekte&c=&id="+pdata[0]+"&sl=de\">"
											txt += "<ul id='proj-"+pdata[0]+"'><h1>"+txtl+pdata[1]+"</a></h1>";
											proj=val[0];
										}
										pudata = val[1].split("-");
										txt += "<li id='pub-"+pudata[0]+"'>"+pudata[1]+" "+val[2]+"</li>";
									}
									else
									{
										if($(".inhalt_pubs").find(".paging_pubs").length==0)
										{
											txtpag = "<p>";
											if(id!=null)
												txtpag += "<a href='#' class='pg_pubs' id='reset'>ALLE</a>&nbsp;";
											if(value>1)
												for(n=1;n<=value;n++)
												{
													if(n==1)
														txtpag += "<a href='#' class='pg_pubs aktiv' id='"+id+"#"+n+"'>"+n+"</a>&nbsp;";
													else
														txtpag += "<a href='#' class='pg_pubs' id='"+id+"#"+n+"'>"+n+"</a>&nbsp;";
												}
													
											txtpag += "</p>";
											dvpagpub = $("<div/>")
											.addClass("paging_pubs")
											.html(txtpag);
										}
									}
								});
								if(txt!="")
									txt += "</ul>";
							});
							dvinh.html(txt);
							dvdata.find("a.listlink").click(function(e){
								$.resetContent();
								$.changenavi(false);
								$.a24.closeNavi = true;
								$("#impressum_background").hide();
								$.openSection(this.id);
								e.preventDefault();
							});
							if(dvdata.find(".paging_pubs").length==0)
							{
								dvdata.append(dvpagpub);
								dvpagpub.find("a.pg_pubs").click(function(e){
									if($(this).attr("id")=="reset")
									{
										$(".inhalt_pubs").fadeOut("fast",function(){
											$(this).remove();
											$.openPub(null,null);
										})
									}
									else
									{
										$(".paging_pubs").find(".aktiv").removeClass("aktiv");
										$(this).addClass("aktiv");
										attrs = $(this).attr("id").split("#")
										thID = attrs[0];
										thPAG = attrs[1];
										dvinh.fadeOut("fast",function(){
											$(this).html("").show();
											$.openPub(thID,thPAG);
										})
									}
									e.preventDefault();
								});
							}
						}
						else
							dvdata.html("<p>no info</p>");
					}
					else
						dvdata.html("<p>no info</p>");
					$.doBueroContent(dvdata,id);
				}
			});
		},
		scrollMenuDV : function(dv,e,pos) {
			var s_top = parseInt(dv.offset().top);
			var mheight = parseInt(dv.find('ul li').height()*dv.find('ul li').length);			
			var top_value = ((mheight-dv.height())/dv.height())*(s_top - e.pageY);
			if(pos=="sx")
				var left_value = top_value / 4;
			else
				var left_value = top_value / 4;	
			//$("#debug").html(s_top+" - "+left_value)
			dv.find("div").css({"top": top_value+"px", "left": left_value+"px"})
		},
		openPreise : function(id) {
			$.a24.closeNavi = false;
			$.closeKonta(true);
			$.closeImpre();
			$("#impressum_background").hide();
			if($('#supersize .mitab_img').length)
				$('#supersize .mitab_img').attr("src",$.a24.imgFOLD+"../fixed/trasp.png").hide();//.remove();
			$(".menu_news").add(".menu_mitab").add(".menu_mitab_list").hide();
			$(".menu_preise").find("a.aktiv").removeClass("aktiv");
			$(".menu_preise").mousemove(function(e) 
			{
				if($(this).find("div").height()>$(this).height())
				{
					$.scrollMenuDV($(this),e,"sx");
				}
			});
			$(".menu_preise a").click(function(e){
				if(this.id!="")
				{
					$(this).parent().parent().find("a.aktiv").removeClass("aktiv");
					$(this).addClass("aktiv");
					//alert(this.id);
					$.getBueroData(this.id);
				}	
				e.preventDefault();
			});
			if(id!=null)
			{
				$("#"+id).addClass("aktiv");
				$.getBueroData(id);
			}
			if($.a24.doFading)
				$(".menu_preise").fadeTo(200, 1);
			else
				$(".menu_preise").show();
		},
		openMitab : function(id) {
			$(".menu_news").add(".menu_preise").hide();
			$.a24.closeNavi = false;
			$.closeKonta(true);
			$.closeImpre();
			$("#impressum_background").hide();
			if($('#supersize .mitab_img').length)
			{
				$('#supersize .mitab_img').attr("src",$.a24.imgFOLD+"../fixed/trasp.png").hide();//.remove();
			}
			$(".menu_mitab").find("a.aktiv").removeClass("aktiv");
			$(".menu_mitab_list").each(function(){
				$(this).find("a.aktiv").removeClass("aktiv");
				$(this).hide();
			});
			$(".menu_mitab").mousemove(function(e) 
			{
				if($(this).find("div").height()>$(this).height())
				{
					$.scrollMenuDV($(this),e,"sx");
				}
			});
			$(".menu_mitab a").click(function(e){
				if(this.id!="")
				{
					$(this).parent().parent().find("a.aktiv").removeClass("aktiv");
					$(this).addClass("aktiv");
					$.getMitabs(this.id);
				}	
				e.preventDefault();
			});
			if(id!=null)
			{	
				arrID = id.split("-");
				//$("#debug").html("#menu-mitarbeiter-"+arrID[1]);
				$("#mitarbeiter-"+arrID[1]).addClass("aktiv");
				$.getMitabs(id);
			}
			if($.a24.doFading)
			{
				$(".menu_mitab").fadeTo(200, 1);
			}
			else
			{
				$(".menu_mitab").show();
			}
		},
		getMitabs : function(id) {
			$.a24.openmitabid = null;
			arrID = id.split("-");
			if($.a24.contentdv)
			{
				$.resetContent();
				if($('#supersize .mitab_img').length)
				{
					$('#supersize .mitab_img').attr("src",$.a24.imgFOLD+"../fixed/trasp.png").hide();//.remove();
				}
			}
			$(".menu_mitab_list").each(function(){
				$(this).find("a.aktiv").removeClass("aktiv");
				$(this).hide();
			});
			$("#menu-mitarbeiter-"+arrID[1]).mousemove(function(e) 
			{
				if($(this).find("div").height()>$(this).height())
				{
					$.scrollMenuDV($(this),e,"sx");
				}
			});
			$("#menu-mitarbeiter-"+arrID[1]+" a").click(function(e){
				id = this.id.split("-");
				if(this.id!="" && !$.a24.block_click && ($.a24.openmitabid!=id[2]))
				{	
						$.a24.block_click = true;
						$(this).parent().parent().find("a.aktiv").removeClass("aktiv");
						$(this).addClass("aktiv");
						$.getMitarbeiter(id[2]);
				}	
				e.preventDefault();
			});
			if(arrID[2]!=null)
			{
				$("#"+id).addClass("aktiv");
				$.getMitarbeiter(arrID[2]);
			}
			if($.a24.doFading)
			{
				$("#menu-mitarbeiter-"+arrID[1]).fadeTo(200, 1);
			}
			else
			{
				$("#menu-mitarbeiter-"+arrID[1]).show();
			}
		},
		getMitarbeiter : function(id) {
			if($.a24.contentdv)
				$.resetContent();
			$.stopRequest();
			$.a24.openmitabid = id;
			$.a24.ajaxobj = $.ajax({
				// try to leverage ajaxQueue plugin to abort previous requests
				//mode		: "abort",
				// limit abortion to this input
				port		: "mitab",
				cancel		: true,
				url			: "inc/getmitab.php",
				type		: "POST",
				dataType	: "json",
				timeout 	: 1000,
				data		: {id:id,sl:$.a24.sl},
				success: function(data) 
				{					
					if(data)
					{
						if(data!="EMPTY") 
						{
							$.a24.contentdv = $("<div/>")
							.hide()
							.addClass("buero_content_main")
							.appendTo(document.body);
							dvmain = $("<div/>")
							.attr({"class":"mitab_content_main"})
							.html("<h1>"+data["name"]+"</h1>")
							.appendTo($.a24.contentdv);
							if(data["gruppe"]==1)
							{
								// create navigation
								html = "<a href='#' class='lebenslauf aktiv'>"+$.a24.txt_lebenslauf+"</a>";
								html += "&nbsp;&nbsp;";
								html += "<a href='#' class='publikationen'>"+$.a24.txt_publikationen.toUpperCase()+"</a>";
								html += "&nbsp;&nbsp;";
								html += "<a href='#' class='vortrag'>"+$.a24.txt_vortrag+"</a>";
								html += "&nbsp;&nbsp;";
								html += "<a href='#' class='lehre'>"+$.a24.txt_lehre+"</a>";
                dvnavi = $("<div/>")
								.addClass("mitab_navi")
								.html(html)
								.appendTo(dvmain);
								$(".mitab_navi a").click(function(e){
									$(".mitab_navi a").removeClass("aktiv");
									$(".mitab_chef_content div").hide();
									$(".dv_"+$(this).attr("class")).show();
									$(this).addClass("aktiv");
									e.preventDefault();
								});
								// append content
								dvtxt = $("<div/>")
								.addClass("mitab_chef_content");

								dvleb = $("<div/>")
								.addClass("dv_lebenslauf")
								.html(data["vita"])
								.appendTo(dvtxt);

								dvvortrag = $("<div/>")
								.addClass("dv_vortrag")
								.html(data["vortrag"])
								.appendTo(dvtxt)
								.hide();

								dvlehre = $("<div/>")
								.addClass("dv_lehre")
								.html(data["lehre"])
								.appendTo(dvtxt)
								.hide();
                
								dvpub = $("<div/>")
								.addClass("dv_publikationen")
								if(data["pubs"])
								{
									i = 0;
									list = $("<ul/>").appendTo(dvpub);
									$.each(data["pubs"], function(k,v){
										var a = $("<a/>")
										.attr({href:"#",id:"publikationen-pub_"+data["pubs"][k]["id_PUB"]})
										.html(data["pubs"][k]["titel"])
										var li = $("<li/>").css({"margin-left":i+"px"}).html(a).appendTo(list);
										i = i+4;
									});
								}
								dvpub.appendTo(dvtxt).hide();
							}
							else
							{
								dvtxt = $("<div/>")
								.addClass("mitab_content")
								.html(data["vita"]);
							}
							dvtxt.appendTo(dvmain);
							$(".dv_publikationen a").click(function(e){
								$.openBuero(this.id);
								e.preventDefault();
							});
							if(data["bild"]!="")
							{
								//$("#debug").html(data["bild"])
								$("#imgLoad").css({width:"0%"}).animate({width:"100%"},2000,function(){
									$(this).hide();
								}).show();
								$('#supersize .mitab_img').attr("src",$.a24.imgFOLD+"../mitarbeiter/"+data["bild"]).bind("load", function() {
									$(this).show();
									$('#supersize').resizenow();
									$("#imgLoad").stop().hide();
								});
							}
							else
								if($('#supersize .mitab_img').length)
								{
									$('#supersize .mitab_img')
									.attr("src",$.a24.imgFOLD+"../fixed/trasp.png")
									.hide();//.remove();
								}
							if($.a24.doFading)
							{
								$.a24.contentdv.stop().fadeTo(200, 1,function(){
									$(".mitab_content_main").css({height:dvmain.height()+"px"});
									$.a24.block_click = false;
								});
							}
							else
							{
								$.a24.contentdv.show("fast",function(){
									$(".mitab_content_main").css({height:dvmain.height()+"px"});
									$.a24.block_click = false;
								});
							}
						}
						else
						{
							dvdata = $("<div/>")
							.addClass("proje_detail_text");
							dv = $("<div/>")
							.addClass("proje_detail_text_innen")
							.html("<p>no info</p>")
							.appendTo(dvdata);
							$.doBueroContent(dvdata,null);
						}
					}
					else
					{
						dvdata = $("<div/>")
						.addClass("proje_detail_text");
						dv = $("<div/>")
						.addClass("proje_detail_text_innen")
						.html("<p>no info</p>")
						.appendTo(dvdata);
						$.doBueroContent(dvdata,null);
					}
				}
			});
		},
		doBueroContent : function(dvdata,anchor) {
			if($('.buero_content_main').length==0)
			{
				$.a24.contentdv = $("<div/>")
				.hide()
				.addClass("buero_content_main")
				.appendTo(document.body);
			}
			else
				$.a24.contentdv = $('.buero_content_main');
			dvdata.appendTo($.a24.contentdv);
			if($.a24.doFading)
			{
				$.a24.contentdv.stop().fadeTo(200, 1,function(){
					$.a24.block_click = false;
					//$.scrollDVDATA(dvdata,anchor);
				});
			}	
			else
			{
				$.a24.contentdv.show();
				$.a24.block_click = false;
				//$.scrollDVDATA(dvdata,anchor);
			}
		},
		scrollDVDATA : function(dv,anchor) {
			dv.jScrollPane({
				verticalDragMinHeight	: 50,
				verticalDragMaxHeight	: 250,
				hijackInternalLinks		: true
			});
			var api = dv.data('jsp');
			if(anchor!=null)
			{
				anchor = anchor.replace("_","-");
				anc = $("#"+anchor);
				api.scrollToElement(anc,true,false)
			}
			var throttleTimeout;
			$(window).bind(
				'resize',
				function()
				{
					if ($.browser.msie) {
						// IE fires multiple resize events while you are dragging the browser window which
						// causes it to crash if you try to update the scrollpane on every one. So we need
						// to throttle it to fire a maximum of once every 50 milliseconds...
						if (!throttleTimeout) {
							throttleTimeout = setTimeout(
								function()
								{
									api.reinitialise();
									throttleTimeout = null;
								},
								50
							);
						}
					} 
					else 
					{
						api.reinitialise();
					}
				}
			);
		},
		getBueroData : function(id) {
			id = id.split("-");
			$.stopRequest();
			$.a24.ajaxobj = $.ajax({
				// try to leverage ajaxQueue plugin to abort previous requests
				//mode		: "abort",
				// limit abortion to this input
				port		: "buero",
				cancel		: true,
				url			: "inc/get"+id[0]+".php",
				type		: "POST",
				dataType	: "json",
				timeout 	: 1000,
				data		: {id:id[1],sl:$.a24.sl},
				success: function(data) 
				{
					dvdata = $("<div/>")
					.addClass("proje_detail_text");			
					if(data)
					{
						if($.a24.contentdv)
							$.resetContent();
						if(data!="EMPTY") 
						{
							
							dv = $("<div/>")
							.addClass("proje_detail_text_innen")
							.html("<h1>"+data[0]+"</h1><div class='proje_detail_text_innen_innen'>"+data[1]+"</div>")
							if(id[0]=="preise")
								if(data[2]!=null && data[2]!="")
									dvlnk = $("<div/>")
									.addClass("dv_preise_lnks")
									.html("<a href='?m=projekte&i="+data[2]+"&sl="+$.a24.sl+"' id='"+data[2]+"' class='inner_link'>"+data[3]+"</a>")
									.appendTo(dv);
							dv.appendTo(dvdata);
							dvdata.find("a.inner_link").click(function(event){
								$.resetContent();
								$.changenavi(false);
								$.a24.closeNavi = true;
								$.getProje(this.id);
								event.preventDefault();
							});
						}
						else
						{
							dv = $("<div/>")
							.addClass("proje_detail_text_innen")
							.html("<p>no info</p>")
							.appendTo(dvdata);
						}
					}
					else
					{
						dv = $("<div/>")
						.addClass("proje_detail_text_innen")
						.html("<p>no info</p>")
						.appendTo(dvdata);
					}
					$.doBueroContent(dvdata,null);
				}
			});
		},
		openAktuell : function(id) {
			$.a24.closeNavi = false;
			$.closeKonta(true);
			$.closeImpre();
			$("#impressum_background").hide();
			if($('#supersize .mitab_img').length)
			{
				$('#supersize .mitab_img')
				.attr("src",$.a24.imgFOLD+"../fixed/trasp.png")
				.hide();//.remove();
			}
			$(".menu_preise").add(".menu_mitab").add(".menu_mitab_list").hide();
			$(".menu_news").find("a.aktiv").removeClass("aktiv");
			$(".menu_news").mousemove(function(e) 
			{
				if($(this).find("div").height()>$(this).height())
				{
					$.scrollMenuDV($(this),e,"sx");
				}
			});
			$(".menu_news a").click(function(e){
				if(this.id!="" && !$.a24.block_click)
				{	
						$(this).parent().parent().find("a.aktiv").removeClass("aktiv");
						$(this).addClass("aktiv");
						$.a24.block_click = true;
						$.getNewsData(this.id);
				}	
				e.preventDefault();
			});
			if($.a24.doFading)
			{
				$(".menu_news").fadeTo(200, 1);
			}
			else
			{
        $(".menu_news").fadeTo(200, 1);
			}
			$.a24.contentdv = $("<div/>")
			.hide()
			.addClass("buero_content_main")
			.appendTo(document.body);
			var nX = 0;
			var i = 1;
			$(".menu_news a").each(function(){;
				dvnwscon = $("<div/>")
				.attr({"id":"dv-"+this.id,"name":i})
				.css({"left":nX+"px"})
				.addClass("nws_leiste")
				.appendTo($.a24.contentdv);
				dvclose = $("<div/>")
				.addClass("proje_detail_closeline")
				.html("<a href='#' id='"+this.id+"' class='openlink'>+</a>")
				.appendTo(dvnwscon);
				dvclose.find("a.openlink").click(function(e){
					if(this.id!="" && !$.a24.block_click)
					{	
						$(".menu_news").find("a.aktiv").removeClass("aktiv");
						$("#"+this.id).addClass("aktiv");
						$.getNewsData(this.id);
						$.a24.block_click = true;
					}	
					e.preventDefault();
				});
				nX += 22;
				i++;
			});
			if($.a24.doFading)
			{
				$.a24.contentdv.stop().fadeTo(200, 1);
			}	
			else
			{
				$.a24.contentdv.show();
			}	
			if(id!=null)
			{
				$("#"+id).addClass("aktiv");
				$.getNewsData(id);
			}	
		},
		getNewsData : function(id) {
			$.a24.block_click = true;
			spid = id.split("-");
			$.stopRequest();
			$.a24.ajaxobj = $.ajax({
				// try to leverage ajaxQueue plugin to abort previous requests
				//mode		: "abort",
				// limit abortion to this input
				port		: "nws",
				cancel		: true,
				url			: "inc/get"+spid[0]+".php",
				type		: "POST",
				dataType	: "json",
				timeout 	: 1000,
				data		: {id:spid[1],sl:$.a24.sl},
				success: function(data) 
				{					
					if(data)
					{
						if(data!="EMPTY") 
						{
							if($.a24.opennwsdiv)
							{
								// close other divs if open
								thisdvpos = parseInt($.a24.opennwsdiv.attr("name"));
								$(".buero_content_main div").each(function(){
									if(parseInt($(this).attr("name"))>thisdvpos)
									{
										nX = parseInt($(this).css("left"))-355;
                    if($.a24.doFading) {
                      $(this).stop().animate({left:nX+"px"},"fast");
                    } else {
                      $(this).css("left", nX+"px");
                    }
									}
								});
								$.a24.opennwsdiv.find(".proje_detail_text_innen").remove();
								if($.a24.doFading)
								{
	                   $.a24.opennwsdiv.removeClass("proje_detail_text").addClass("nws_leiste").find("#leiste_dx").show().stop().animate({left:"20px"},"fast",function(){
										$(this).remove();
										$.a24.opennwsdiv.find(".proje_detail_closeline a").html("+");
										$.openNWSDV(id,data);
									});
								}
								else
								{
									$.a24.opennwsdiv.removeClass("proje_detail_text").addClass("nws_leiste").find("#leiste_dx").show().css("left", "20px");
                	$(this).remove();
									$.a24.opennwsdiv.find(".proje_detail_closeline a").html("+");
									$.openNWSDV(id,data);								
								}
							}
							else
							{
								$.openNWSDV(id,data);
							}		
						}
						else
						{
							dvtxt = $("<div/>")
							.html("<p>no info</p>");
							$.doBueroContent(dvtxt,null);
						}
					}
					else
					{
						dvtxt = $("<div/>")
						.html("<p>no info</p>");
						$.doBueroContent(dvtxt,null);
					}
				}
			});
		},
		openNWSDV : function(id,data) {
      console.log('open news item');
			// open the div
			thisdvpos = parseInt($("#dv-"+id).attr("name"));
			$(".buero_content_main div").each(function(){
				if(parseInt($(this).attr("name"))>thisdvpos)
				{
					nX = parseInt($(this).css("left"))+355;
					if($.a24.doFading) {
            $(this).stop().animate({left:nX+"px"},"slow");
          } else {
            $(this).stop().css("left", nX+"px");
          }
				}
			});
			$.a24.opennwsdiv = $("#dv-"+id);
			dv = $("<div/>")
			.addClass("nws_leiste")
			.attr("id","leiste_dx")
			.appendTo($.a24.opennwsdiv);
			
			if($.a24.doFading)
			{
			
        $.a24.opennwsdiv.find("#leiste_dx").stop().animate({left:"355px"},"slow",function()
        {
					$.a24.opennwsdiv.hide().removeClass("nws_leiste").addClass("proje_detail_text").find("#leiste_dx").hide();
					$.a24.opennwsdiv.find(".proje_detail_closeline a").html("â€”");
					$.a24.opennwsdiv.stop().fadeIn("slow",function(){
						if(data[2]!="")
							strIMG = "<br /><p><img id='1_"+data[3]+"_"+data[2]+"'src='"+$.a24.imgFOLD+"thumbs/"+data[2]+"' style='width:110px;' /></p>";
						else
							strIMG = "";
						dv = $("<div/>")
						.addClass("proje_detail_text_innen")
						.html("<h1>"+data[0]+"</h1>"+data[1]+strIMG)
						.appendTo($.a24.opennwsdiv);
						$("div.proje_detail_text_innen img").click(function(event){
							param = this.id.split("_");
							$.changeIMG(param[0],param[1],param[2]);
							event.preventDefault();
						});
						if($.a24.shutupnwsdv)
						{
							$.a24.nwsfinish = false;
							$.a24.opennwsdiv = null;
						}
						else
							$.a24.nwsfinish = true;
						$.a24.shutupnwsdv = false;
					});
				});
        
      } else { // no animation

        $.a24.opennwsdiv.find("#leiste_dx").css("left", "355px");
				$.a24.opennwsdiv.removeClass("nws_leiste").addClass("proje_detail_text").find("#leiste_dx").hide();
					if(data[2]!="")
						strIMG = "<br /><p><img id='1_"+data[3]+"_"+data[2]+"'src='"+$.a24.imgFOLD+"thumbs/"+data[2]+"' style='width:110px;' /></p>";
					else
						strIMG = "";
					dv = $("<div/>")
					.addClass("proje_detail_text_innen")
					.html("<h1>"+data[0]+"</h1>"+data[1]+strIMG)
					.appendTo($.a24.opennwsdiv);
					$("div.proje_detail_text_innen img").click(function(event){
						param = this.id.split("_");
						$.changeIMG(param[0],param[1],param[2]);
						event.preventDefault();
					});
					$.a24.opennwsdiv.find(".proje_detail_closeline a").html("â€”");
					if($.a24.shutupnwsdv)
					{
						$.a24.nwsfinish = false;
						$.a24.opennwsdiv = null;
					}
					else
						$.a24.nwsfinish = true;
					$.a24.shutupnwsdv = false;
      }
        
			$.a24.block_click = false;
		}
	});
})(jQuery);

$(document).ready(function()
{
	$.a24 = {
		closeNavi							: true,
		longmenu 							: false,
	  aktivmenu 						: "",
		aktivbody 						: "",
		searched_param				: "",
		searching							: false,
		sl									  : null,
		arrProjeParam					: new Array(new Array(),new Array(),new Array()),
		ajaxobj								: null,
		doFading							: true,
		contentdv							: null,
		imgFOLD								: null,
		defbackimg						: null,
		defbackimgneg					: null,
		isProjeData						: false,
		isProjeText						: false,
		projimg								: null,
		loadPerc							: 99,
		isFlashBack 					: false,
		opennwsdiv						: null,
		block_click						: false,
		txt_lebenslauf				: null,
		txt_vortrag						: null,
		txt_lehre	  					: null,
		txt_daten							: null,
		txt_text							: null,
		txt_preise						: null,
		txt_publikationen			: null,
		openmitabid						: null,
		shutupnwsdv						: false,
		nwsfinish							: false,
    has_touch             : false,
    menuOpen              : false
	};
	  
  $.a24.has_touch = 'ontouchstart' in window || !!navigator.msMaxTouchPoints; // detect touch device
    
  if($.a24.has_touch) {
    $.a24.doFading = false;
  }
  /* 
	effects on the menu 
	$("#navigation_logos")
	*/  
  if(!$.a24.has_touch) { // only if it is not a touch device

    $("#navigation").hover(
  		function(){
  			if($.a24.closeNavi)
  			{
  				$.closeImpre();
  				$.closeKonta(true);
  				$.changenavi(true);
  				$.openSearch();
  			}
  		},
  		function(){
  			if($.a24.closeNavi)
  			{
  				if($.a24.searching || $.a24.aktivbody=="kontakt")
  					setTimeout(function(){
  						$.a24.searching = false;
  						$.changenavi(false);
  					}, 500);
  				else
  					$.changenavi(false);
  			}
  		}
  	);
	
  	$("#menuH").add("#menuH .suche").add("#menuH .buero").hover(
  		function(){
  			if(!$.a24.closeNavi&&($.a24.aktivmenu=="menu_projekte"))
  			{
  				if($.a24.doFading)
  					$("#menuH .suche a").add("#menuH .buero a").stop().fadeTo(200, 1);
  				else
  					$("#menuH .suche a").add("#menuH .buero a").removeClass("invisible");
  			}
  		},
  		function(){
  			if(!$.a24.closeNavi&&($.a24.aktivmenu=="menu_projekte"))
  			{
  				if($.a24.doFading)
  					$("#menuH .suche a").add("#menuH .buero a").stop().fadeTo(200, 0);
  				else
  					$("#menuH .suche a").add("#menuH .buero a").addClass("invisible");
  			}
  		}
  	);
	
  	$("#menuH").add("#menuH .suche").add("#menuH .projekte").hover(
  		function(){
  			if((!$.a24.closeNavi&&($.a24.aktivmenu=="menu_buero"))||$.a24.aktivbody=="kontakt")
  			{
  				if($.a24.doFading)
  					$("#menuH .suche a").add("#menuH .projekte a").stop().fadeTo(200, 1);
  				else
  					$("#menuH .suche a").add("#menuH .projekte a").removeClass("invisible");
  			}
  		},
  		function(){
  			if((!$.a24.closeNavi&&($.a24.aktivmenu=="menu_buero"))||$.a24.aktivbody=="kontakt")
  			{
  				if($.a24.doFading)
  					$("#menuH .suche a").add("#menuH .projekte a").stop().fadeTo(200, 0);
  				else
  					$("#menuH .suche a").add("#menuH .projekte a").addClass("invisible");
  			}
  		}
  	);
	
  	/* effects on the search field */
  	$("#suchfeld").add("#menu_suche").hover(
  		function(){
  			if($.a24.doFading)
  			{
  				$("#navigation_logos .logo_singleline_bw").stop().fadeTo(500, 0);
  				$("#navigation_logos .logo_singleline_color").stop().fadeTo(500, 1);
  				$("#menuH .projekte").add("#menuH .buero").stop().fadeTo(200, 0);
  			}
  			else
  			{
  				$("#navigation_logos .logo_singleline_bw").hide();
  				$("#navigation_logos .logo_singleline_color").show();
  				$("#menuH .projekte").add("#menuH .buero").addClass("invisible");
  			}
  		},
  		function(){
  			if($.a24.doFading)
  			{
  				$("#navigation_logos .logo_singleline_color").stop().fadeTo(500, 0);
  				$("#navigation_logos .logo_singleline_bw").stop().fadeTo(500, 1);
  				$("#menuH .projekte").add("#menuH .buero").stop().fadeTo(500, 1)
  			}
  			else
  			{
  				$("#navigation_logos .logo_singleline_color").hide();
  				$("#navigation_logos .logo_singleline_bw").show();
  				$("#menuH .projekte").add("#menuH .buero").removeClass("invisible");
  			}
    });
		
  } else { // touch device, show menu on first click of logo

    $("#navigation").click(function(event) {
      if(!$.a24.menuOpen) {
        $.closeImpre();
        $.closeKonta(true);
        $.changenavi(true);
        $.openSearch();  
      }
    });
    
  }
  
	/* search */
	$("#suchfeld")
  .keyup(function(event) {
		$.search(event,$(this));
	})
  .blur(function(){
    $.stopRequest();
	});
  
  $('#menu_suche form').submit(function(event) {
    document.activeElement.blur();
    $("#suchfeld").blur();
    event.preventDefault();
  });
  
	/* navigation */	
	$("#navigation #menuH li a").click(function(event) {
		// open lang menu background
		if($.a24.aktivmenu!=("menu_"+$(this).parent().attr("class")))
		{
			$("#impressum_background").hide();
			if($('#supersize .mitab_img').length)
				$('#supersize .mitab_img')
				.attr("src",$.a24.imgFOLD+"../fixed/trasp.png")
				.hide();//.remove();
			$(".menu_mitab").add(".menu_mitab_list").hide();
			// if content present, delete it
			if($.a24.contentdv)
				$.resetContent();
			$(this).parent().parent().find("a.aktiv").removeClass("aktiv");
			$(this).addClass("aktiv");
			$.closeMenu();
			$.closeKonta(true);
			$.a24.aktivmenu = "menu_"+$(this).parent().attr("class");
			if($.a24.aktivmenu=="menu_suche")
				$.openSearch();
			if($.a24.aktivmenu=="menu_projekte")
				$.openProject();
			if($.a24.aktivmenu=="menu_buero")
				$.openBuero($(".menu_news a").first().attr("id"));
		}
		else if($.a24.aktivmenu=="menu_projekte")
		{
			$("#menu_projekte a").each(function(){
				$(this).removeClass("aktiv");
			});
			$.each($.a24.arrProjeParam, function(k,v){
				v.length = 0;
			});
			$.getProjeData();
		}
		event.preventDefault();
	});

	/* navigation _ projekt list*/
	$("#menu_projekte a").click(function(event){
		
		if($.trim($(this).attr("class"))=="aktiv")
		{
			$(this).removeClass("aktiv");
			$.updProjeParam(false,this.id);
		}
		else
		{
			//$("#debug").html($(this).attr("id"))
			$(this).addClass("aktiv");
			$.updProjeParam(true,this.id);
		}
		event.preventDefault();
	});
	$("#menu_buero .buero_mainmenu a").click(function(event){
		$.a24.block_click = false;
		if($.a24.opennwsdiv)
			if($.a24.nwsfinish)
			{
				$.a24.nwsfinish = false;
				$.a24.opennwsdiv = null;
			}
			else
				$.a24.shutupnwsdv = true;
		//$("#debug").html($.a24.opennwsdiv);
		//$("#debug").html($(this).attr("class"))
		if($.a24.contentdv)
			$.resetContent();
		$(this).parent().parent().find("a.aktiv").removeClass("aktiv");
		$(this).addClass("aktiv");
		if(this.id=="kontakt")
			$.openKont();
		else if(this.id=="publikationen")
			$.openPub(null);
		else if(this.id=="preise")
			$.openPreise(null);
		else if(this.id=="mitarbeiter")
			$.openMitab(null);
		else if(this.id=="aktuell")
			$.openAktuell($(".menu_news a").first().attr("id"));
		event.preventDefault();
	});
	$(".impressum").click(function(event){
		//$("#navigation #menuH").find("a.aktiv").removeClass("aktiv");
		if($.a24.contentdv)
			$.resetContent();
		$.resetProjects();
		if($.a24.aktivmenu)
			$.closeMenu();
		if($.a24.doFading)
		{
			$("#news_home").stop().fadeTo(200, 0);
			$("#menuH").stop().fadeTo(20, 0);
			$("#menuH .suche a").add("#menuH .buero a").add("#menuH .projekte a").stop().fadeTo(20, 1,function(){
				$("#menuH").find("a.aktiv").removeClass("aktiv");
			});
			$("#navigation_logos .logo_start").stop().fadeTo(500, 1);
		}	
		else
		{
			$("#news_home").hide()
			$("#menuH .suche a").add("#menuH .buero a").add("#menuH .projekte a").removeClass("invisible");
			$("#menuH").hide();
			$("#navigation_logos .logo_start").show();
			$("#menuH").find("a.aktiv").removeClass("aktiv");
		}
		$.a24.closeNavi = true;
		if($("#kontakt_text"))
		{
			$("#kontakt_text").css({zIndex:11});
			if($.a24.doFading)
				$("#kontakt_text").stop().fadeTo(200, 0);
			else
				$("#kontakt_text").hide();
		}
		$("#impressum_text").css({zIndex:20});
		if($.a24.doFading)
			$("#impressum_background").stop().fadeTo(50, 1,function(){
				$("#impressum_text").stop().fadeTo(200, 1);
				 $.a24.aktivbody="impressum";
			});
		else
		{
			$("#impressum_background").show();
			$("#impressum_text").show();
			$.a24.aktivbody="impressum";
		}
		event.preventDefault();
	});
	/*$(".homelink").click(function(){
		location.reload()
	})*/
});



