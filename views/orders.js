define([
	"views/forms/order",
	"models/orders"
], function(orderform, orders){

	var controls = {
		cols:[
			{ view: "button", type: "iconButton", icon: "plus", label: "Add order", width: 130, click: function(){
				this.$scope.ui(orderform.$ui).show();
			}},
			{ view: "button", type: "iconButton", icon: "external-link", label: "Export", width: 120, popup: "exportPopup"},
			{},
			{view:"richselect", id:"order_filter", value: "all", maxWidth: 400, minWidth: 250, vertical: true, labelWidth: 100, options:[
				{id:"all", value:"All"},
				{id:"new", value:"Need Invoicing"},
				{id:"ready", value:"Ready to Ship"},
				{id:"completed", value:"Completed"},
				{id:"cancelled", value:"Cancelled"}
			],  label:"Filter orders", on:{
					onChange:function(){
						var val = this.getValue();
						if(val=="all")
							$$("orderData").filter("#status#","");
						else
							$$("orderData").filter("#status#",val);
					}
				}
			}
		]
	};

	var grid = {
		id:"orderData",
		view:"treetable", select:true,
		columns:[
			{id:"id", header:"#", width:50},
			{id:"employee", header:["Employee", {content:"selectFilter"} ], sort:"string", minWidth:150, fillspace:1},
			{id:"customer", header:["Customer", {content:"selectFilter"} ], sort:"string", minWidth:150, fillspace:1},

			{id:"status", header:"Status", sort:"string", width:90},
			{id:"fee", header:"Fee", width:90, sort:"string", format:webix.i18n.priceFormat},
			{id:"taxes", header:"Taxes", width:90, sort:"string", format:webix.i18n.priceFormat},
			{id:"total", header:"Total", width:90, sort:"string", format:webix.i18n.priceFormat},
			{id:"shipping_company", header:"Shipping Company", sort:"string", },
			{id:"payment_method", header:"Payment method", width:130, sort:"string"},
			{id:"date", header:"Date", sort:"string", width:100},
			{id:"trash", header:"&nbsp;", width:35, template:"<span  style='color:#777777; cursor:pointer;' class='webix_icon fa-trash-o'></span>"}
		],
		export: true,
		data: orders.getAll,
		onClick:{
			webix_icon:function(e,id,node){
				webix.confirm({
					text:"Are you sure", ok:"Yes", cancel:"Cancel",
					callback:function(res){
						if(res){
							webix.$$("orderData").remove(id);
						}
					}
				});
			}
		},
		onContext:{}
	};

	var layout = {
		type: "space",
		rows:[
			controls,
			grid
		]
	};

	return { $ui: layout };

});