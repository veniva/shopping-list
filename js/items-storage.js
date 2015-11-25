var itemStorage = {};

itemStorage.itemNamesStorageItem = 'items';

itemStorage.getItemNames = function(){
    try{
        return JSON.parse(localStorage.getItem(itemStorage.itemNamesStorageItem));
    }catch(err){
        return null;
    }
};

itemStorage.getItem = function(itemName){
    try{
        return JSON.parse(localStorage.getItem(itemName));
    }catch(err){
        return null;
    }
};

itemStorage.addItem = function(itemName, value){
    var itemNames = itemStorage.getItemNames();
    if(itemNames && itemNames.length)
        itemNames.push(itemName);
    else
        itemNames = [itemName];
    localStorage.setItem(itemStorage.itemNamesStorageItem, JSON.stringify(itemNames));
    localStorage.setItem(itemName, JSON.stringify(value));
};

itemStorage.editItem = function(itemName, value){
    var item = itemStorage.getItem(itemName);
    if(item){
        localStorage.setItem(itemName, JSON.stringify(value));
    }
};

itemStorage.removeItem = function(itemName){
    var item = itemStorage.getItem(itemName);
    if(item){
        //update item names list
        var itemNames = itemStorage.getItemNames();
        if(itemNames){
            var newItemNames = [];
            $(itemNames).each(function(){
                if(this != itemName){
                    newItemNames.push(this);
                }
            });
            localStorage.setItem(itemStorage.itemNamesStorageItem, JSON.stringify(newItemNames));
        }
        //remove item
        localStorage.removeItem(itemName);
    }
};

itemStorage.getItems = function(){
    var itemsList = itemStorage.getItemNames();
    var data = [];
    if(itemsList != null && typeof itemsList == "object"){
        $.each(itemsList, function(i, value){
            data.push(itemStorage.getItem(value));
        });
    }
    return data;
};

itemStorage.addItems = function(items){
    $(items).each(function(i, elem){
        itemStorage.addItem(elem.id, this);
    });
};