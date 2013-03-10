/* https://github.com/jquery/jquery-ui
* Includes: jquery.ui.dialog.js
* Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
(function(a,b){
    var c="ui-dialog ui-widget ui-widget-content ui-corner-all",d={
        buttons:!0,
        height:!0,
        maxHeight:!0,
        maxWidth:!0,
        minHeight:!0,
        minWidth:!0,
        width:!0
        },e={
        maxHeight:!0,
        maxWidth:!0,
        minHeight:!0,
        minWidth:!0
        },f=a.attrFn||{
        val:!0,
        css:!0,
        html:!0,
        text:!0,
        data:!0,
        width:!0,
        height:!0,
        offset:!0,
        click:!0
        };
        
    a.widget("ui.dialog",{
        options:{
            autoOpen:!0,
            buttons:{},
            closeOnEscape:!0,
            closeText:"close",
            dialogClass:"",
            draggable:!0,
            hide:null,
            height:"auto",
            maxHeight:!1,
            maxWidth:!1,
            minHeight:150,
            minWidth:150,
            modal:!1,
            position:{
                my:"center",
                at:"center",
                collision:"fit",
                using:function(b){
                    var c=a(this).css(b).offset().top;
                    c<0&&a(this).css("top",b.top-c)
                    }
                },
        resizable:!0,
        show:null,
        stack:!0,
        title:"",
        width:300,
        zIndex:1e3
    },
    _create:function(){
        this.originalTitle=this.element.attr("title"),typeof this.originalTitle!="string"&&(this.originalTitle=""),this.options.title=this.options.title||this.originalTitle;
        var b=this,d=b.options,e=d.title||"&#160;",f=a.ui.dialog.getTitleId(b.element),g=(b.uiDialog=a("<div></div>")).appendTo(document.body).hide().addClass(c+d.dialogClass).css({
            zIndex:d.zIndex
            }).attr("tabIndex",-1).css("outline",0).keydown(function(c){
            d.closeOnEscape&&!c.isDefaultPrevented()&&c.keyCode&&c.keyCode===a.ui.keyCode.ESCAPE&&(b.close(c),c.preventDefault())
            }).attr({
            role:"dialog",
            "aria-labelledby":f
        }).mousedown(function(a){
            b.moveToTop(!1,a)
            }),h=b.element.show().removeAttr("title").addClass("ui-dialog-content ui-widget-content").appendTo(g),i=(b.uiDialogTitlebar=a("<div></div>")).addClass("ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix").prependTo(g),j=a('<a href="#"></a>').addClass("ui-dialog-titlebar-close ui-corner-all").attr("role","button").hover(function(){
            j.addClass("ui-state-hover")
            },function(){
            j.removeClass("ui-state-hover")
            }).focus(function(){
            j.addClass("ui-state-focus")
            }).blur(function(){
            j.removeClass("ui-state-focus")
            }).click(function(a){
            return b.close(a),!1
            }).appendTo(i),k=(b.uiDialogTitlebarCloseText=a("<span></span>")).addClass("ui-icon ui-icon-closethick").text(d.closeText).appendTo(j),l=a("<span></span>").addClass("ui-dialog-title").attr("id",f).html(e).prependTo(i);
        a.isFunction(d.beforeclose)&&!a.isFunction(d.beforeClose)&&(d.beforeClose=d.beforeclose),i.find("*").add(i).disableSelection(),d.draggable&&a.fn.draggable&&b._makeDraggable(),d.resizable&&a.fn.resizable&&b._makeResizable(),b._createButtons(d.buttons),b._isOpen=!1,a.fn.bgiframe&&g.bgiframe()
        },
    _init:function(){
        this.options.autoOpen&&this.open()
        },
    destroy:function(){
        var a=this;
        return a.overlay&&a.overlay.destroy(),a.uiDialog.hide(),a.element.unbind(".dialog").removeData("dialog").removeClass("ui-dialog-content ui-widget-content").hide().appendTo("body"),a.uiDialog.remove(),a.originalTitle&&a.element.attr("title",a.originalTitle),a
        },
    widget:function(){
        return this.uiDialog
        },
    close:function(b){
        var c=this,d,e;
        if(!1===c._trigger("beforeClose",b))return;
        return c.overlay&&c.overlay.destroy(),c.uiDialog.unbind("keypress.ui-dialog"),c._isOpen=!1,c.options.hide?c.uiDialog.hide(c.options.hide,function(){
            c._trigger("close",b)
            }):(c.uiDialog.hide(),c._trigger("close",b)),a.ui.dialog.overlay.resize(),c.options.modal&&(d=0,a(".ui-dialog").each(function(){
            this!==c.uiDialog[0]&&(e=a(this).css("z-index"),isNaN(e)||(d=Math.max(d,e)))
            }),a.ui.dialog.maxZ=d),c
        },
    isOpen:function(){
        return this._isOpen
        },
    moveToTop:function(b,c){
        var d=this,e=d.options,f;
        return e.modal&&!b||!e.stack&&!e.modal?d._trigger("focus",c):(e.zIndex>a.ui.dialog.maxZ&&(a.ui.dialog.maxZ=e.zIndex),d.overlay&&(a.ui.dialog.maxZ+=1,d.overlay.$el.css("z-index",a.ui.dialog.overlay.maxZ=a.ui.dialog.maxZ)),f={
            scrollTop:d.element.scrollTop(),
            scrollLeft:d.element.scrollLeft()
            },a.ui.dialog.maxZ+=1,d.uiDialog.css("z-index",a.ui.dialog.maxZ),d.element.attr(f),d._trigger("focus",c),d)
        },
    open:function(){
        if(this._isOpen)return;
        var b=this,c=b.options,d=b.uiDialog;
        return b.overlay=c.modal?new a.ui.dialog.overlay(b):null,b._size(),b._position(c.position),d.show(c.show),b.moveToTop(!0),c.modal&&d.bind("keydown.ui-dialog",function(b){
            if(b.keyCode!==a.ui.keyCode.TAB)return;
            var c=a(":tabbable",this),d=c.filter(":first"),e=c.filter(":last");
            if(b.target===e[0]&&!b.shiftKey)return d.focus(1),!1;
            if(b.target===d[0]&&b.shiftKey)return e.focus(1),!1
                }),a(b.element.find(":tabbable").get().concat(d.find(".ui-dialog-buttonpane :tabbable").get().concat(d.get()))).eq(0).focus(),b._isOpen=!0,b._trigger("open"),b
        },
    _createButtons:function(b){
        var c=this,d=!1,e=a("<div></div>").addClass("ui-dialog-buttonpane ui-widget-content ui-helper-clearfix"),g=a("<div></div>").addClass("ui-dialog-buttonset").appendTo(e);
        c.uiDialog.find(".ui-dialog-buttonpane").remove(),typeof b=="object"&&b!==null&&a.each(b,function(){
            return!(d=!0)
            }),d&&(a.each(b,function(b,d){
            d=a.isFunction(d)?{
                click:d,
                text:b
            }:d;
            var e=a('<button type="button"></button>').click(function(){
                d.click.apply(c.element[0],arguments)
                }).appendTo(g);
            a.each(d,function(a,b){
                if(a==="click")return;
                a in f?e[a](b):e.attr(a,b)
                }),a.fn.button&&e.button()
            }),e.appendTo(c.uiDialog))
        },
    _makeDraggable:function(){
        function f(a){
            return{
                position:a.position,
                offset:a.offset
                }
            }
        var b=this,c=b.options,d=a(document),e;
        b.uiDialog.draggable({
        cancel:".ui-dialog-content, .ui-dialog-titlebar-close",
        handle:".ui-dialog-titlebar",
        containment:"document",
        start:function(d,g){
            e=c.height==="auto"?"auto":a(this).height(),a(this).height(a(this).height()).addClass("ui-dialog-dragging"),b._trigger("dragStart",d,f(g))
            },
        drag:function(a,c){
            b._trigger("drag",a,f(c))
            },
        stop:function(g,h){
            c.position=[h.position.left-d.scrollLeft(),h.position.top-d.scrollTop()],a(this).removeClass("ui-dialog-dragging").height(e),b._trigger("dragStop",g,f(h)),a.ui.dialog.overlay.resize()
            }
        })
    },
_makeResizable:function(c){
    function h(a){
        return{
            originalPosition:a.originalPosition,
            originalSize:a.originalSize,
            position:a.position,
            size:a.size
            }
        }
    c=c===b?this.options.resizable:c;
var d=this,e=d.options,f=d.uiDialog.css("position"),g=typeof c=="string"?c:"n,e,s,w,se,sw,ne,nw";
    d.uiDialog.resizable({
    cancel:".ui-dialog-content",
    containment:"document",
    alsoResize:d.element,
    maxWidth:e.maxWidth,
    maxHeight:e.maxHeight,
    minWidth:e.minWidth,
    minHeight:d._minHeight(),
    handles:g,
    start:function(b,c){
        a(this).addClass("ui-dialog-resizing"),d._trigger("resizeStart",b,h(c))
        },
    resize:function(a,b){
        d._trigger("resize",a,h(b))
        },
    stop:function(b,c){
        a(this).removeClass("ui-dialog-resizing"),e.height=a(this).height(),e.width=a(this).width(),d._trigger("resizeStop",b,h(c)),a.ui.dialog.overlay.resize()
        }
    }).css("position",f).find(".ui-resizable-se").addClass("ui-icon ui-icon-grip-diagonal-se")
    },
_minHeight:function(){
    var a=this.options;
    return a.height==="auto"?a.minHeight:Math.min(a.minHeight,a.height)
    },
_position:function(b){
    var c=[],d=[0,0],e;
    if(b){
        if(typeof b=="string"||typeof b=="object"&&"0"in b)c=b.split?b.split(" "):[b[0],b[1]],c.length===1&&(c[1]=c[0]),a.each(["left","top"],function(a,b){
            +c[a]===c[a]&&(d[a]=c[a],c[a]=b)
            }),b={
            my:c.join(" "),
            at:c.join(" "),
            offset:d.join(" ")
            };
            
        b=a.extend({},a.ui.dialog.prototype.options.position,b)
        }else b=a.ui.dialog.prototype.options.position;
    e=this.uiDialog.is(":visible"),e||this.uiDialog.show(),this.uiDialog.css({
        top:0,
        left:0
    }).position(a.extend({
        of:window
    },b)),e||this.uiDialog.hide()
    },
_setOptions:function(b){
    var c=this,f={},g=!1;
    a.each(b,function(a,b){
        c._setOption(a,b),a in d&&(g=!0),a in e&&(f[a]=b)
        }),g&&this._size(),this.uiDialog.is(":data(resizable)")&&this.uiDialog.resizable("option",f)
    },
_setOption:function(b,d){
    var e=this,f=e.uiDialog;
    switch(b){
        case"beforeclose":
            b="beforeClose";
            break;
        case"buttons":
            e._createButtons(d);
            break;
        case"closeText":
            e.uiDialogTitlebarCloseText.text(""+d);
            break;
        case"dialogClass":
            f.removeClass(e.options.dialogClass).addClass(c+d);
            break;
        case"disabled":
            d?f.addClass("ui-dialog-disabled"):f.removeClass("ui-dialog-disabled");
            break;
        case"draggable":
            var g=f.is(":data(draggable)");
            g&&!d&&f.draggable("destroy"),!g&&d&&e._makeDraggable();
            break;
        case"position":
            e._position(d);
            break;
        case"resizable":
            var h=f.is(":data(resizable)");
            h&&!d&&f.resizable("destroy"),h&&typeof d=="string"&&f.resizable("option","handles",d),!h&&d!==!1&&e._makeResizable(d);
            break;
        case"title":
            a(".ui-dialog-title",e.uiDialogTitlebar).html(""+(d||"&#160;"))
            }
            a.Widget.prototype._setOption.apply(e,arguments)
    },
_size:function(){
    var b=this.options,c,d,e=this.uiDialog.is(":visible");
    this.element.show().css({
        width:"auto",
        minHeight:0,
        height:0
    }),b.minWidth>b.width&&(b.width=b.minWidth),c=this.uiDialog.css({
        height:"auto",
        width:b.width
        }).height(),d=Math.max(0,b.minHeight-c);
    if(b.height==="auto")if(a.support.minHeight)this.element.css({
        minHeight:d,
        height:"auto"
    });
    else{
        this.uiDialog.show();
        var f=this.element.css("height","auto").height();
        e||this.uiDialog.hide(),this.element.height(Math.max(f,d))
        }else this.element.height(Math.max(b.height-c,0));
    this.uiDialog.is(":data(resizable)")&&this.uiDialog.resizable("option","minHeight",this._minHeight())
    }
}),a.extend(a.ui.dialog,{
    version:"1.8.21",
    uuid:0,
    maxZ:0,
    getTitleId:function(a){
        var b=a.attr("id");
        return b||(this.uuid+=1,b=this.uuid),"ui-dialog-title-"+b
        },
    overlay:function(b){
        this.$el=a.ui.dialog.overlay.create(b)
        }
    }),a.extend(a.ui.dialog.overlay,{
    instances:[],
    oldInstances:[],
    maxZ:0,
    events:a.map("focus,mousedown,mouseup,keydown,keypress,click".split(","),function(a){
        return a+".dialog-overlay"
        }).join(" "),
    create:function(b){
        this.instances.length===0&&(setTimeout(function(){
            a.ui.dialog.overlay.instances.length&&a(document).bind(a.ui.dialog.overlay.events,function(b){
                if(a(b.target).zIndex()<a.ui.dialog.overlay.maxZ)return!1
                    })
            },1),a(document).bind("keydown.dialog-overlay",function(c){
            b.options.closeOnEscape&&!c.isDefaultPrevented()&&c.keyCode&&c.keyCode===a.ui.keyCode.ESCAPE&&(b.close(c),c.preventDefault())
            }),a(window).bind("resize.dialog-overlay",a.ui.dialog.overlay.resize));
        var c=(this.oldInstances.pop()||a("<div></div>").addClass("ui-widget-overlay")).appendTo(document.body).css({
            width:this.width(),
            height:this.height()
            });
        return a.fn.bgiframe&&c.bgiframe(),this.instances.push(c),c
        },
    destroy:function(b){
        var c=a.inArray(b,this.instances);
        c!=-1&&this.oldInstances.push(this.instances.splice(c,1)[0]),this.instances.length===0&&a([document,window]).unbind(".dialog-overlay"),b.remove();
        var d=0;
        a.each(this.instances,function(){
            d=Math.max(d,this.css("z-index"))
            }),this.maxZ=d
        },
    height:function(){
        var b,c;
        return a.browser.msie&&a.browser.version<7?(b=Math.max(document.documentElement.scrollHeight,document.body.scrollHeight),c=Math.max(document.documentElement.offsetHeight,document.body.offsetHeight),b<c?a(window).height()+"px":b+"px"):a(document).height()+"px"
        },
    width:function(){
        var b,c;
        return a.browser.msie?(b=Math.max(document.documentElement.scrollWidth,document.body.scrollWidth),c=Math.max(document.documentElement.offsetWidth,document.body.offsetWidth),b<c?a(window).width()+"px":b+"px"):a(document).width()+"px"
        },
    resize:function(){
        var b=a([]);
        a.each(a.ui.dialog.overlay.instances,function(){
            b=b.add(this)
            }),b.css({
            width:0,
            height:0
        }).css({
            width:a.ui.dialog.overlay.width(),
            height:a.ui.dialog.overlay.height()
            })
        }
    }),a.extend(a.ui.dialog.overlay.prototype,{
    destroy:function(){
        a.ui.dialog.overlay.destroy(this.$el)
        }
    })
})(jQuery);
;
