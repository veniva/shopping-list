function ListItems(table){
    this.table = table;
}

ListItems.prototype.initInsertId = 3;

ListItems.placeholders = {
    item: 'Item name',
    market: 'Market place',
    qty: 'Qty.'
};

ListItems.prototype.listItems = function(items){
    items = items ? items : [];
    var that = this;
    //add new user
    var newItem = {
        item: '',
        market: '',
        qty: '',
        done: ''
    };
    items.push(newItem);

    var $tBody = $(this.table).find('tbody');
    $tBody.empty();

    items.forEach(function(element, index){
        var tr = document.createElement('tr');
        var createInput = function(prop, value){
            return $('<input class="form-control" name="'+prop+'" value="'+value+'" placeholder="'+ListItems.placeholders[prop]+'">')[0];
        };
        $(tr).append('<td>'+(index+1)+'</td>');//adding a counter to display
        if(element.id){
            $.each(element, function(prop, value){
                if(prop != 'id'){
                    if(prop != 'done'){
                        var input = createInput(prop, value);
                        input.onkeyup = function(e){
                            element[prop] = this.value;
                            itemStorage.editItem(element.id, element);
                        };
                        $(tr).append($(document.createElement('td')).append(input));
                    }
                    else{
                        var checkbox = $('<input type="checkbox" name="'+prop+'" value="1">')[0];
                        checkbox.checked = element.done;
                        checkbox.onclick = function(){
                            element.done = this.checked;
                            itemStorage.editItem(element.id, element);
                        };
                        $(tr).append($(document.createElement('td')).append(checkbox));
                    }
                }
            });
            var $icon = $('<span class="glyphicon glyphicon-trash" aria-hidden="true"></span>');
            var $button = $('<button type="button" class="btn btn-default"></button>');
            $button.click(function(){
                itemStorage.removeItem(element.id);
                location.reload();
            });
            $(tr).append($(document.createElement('td')).append($button.append($icon)));

        }else{
            $.each(element, function(prop, value){
                if(prop != 'done'){
                    var input = createInput(prop, value);
                    input.onkeyup = function(e){
                        element[prop] = this.value;
                    };
                    $(tr).append($(document.createElement('td')).append(input));
                }
                else{
                    var $button = $('<button class="btn btn-success">add item</button>');
                    $button.click(function(){
                        var storedInsertId = localStorage.getItem('lastInsertId');
                        var lastInsertId = storedInsertId ? storedInsertId : that.initInsertId;
                        element.id = 'item-'+(++lastInsertId);
                        localStorage.setItem('lastInsertId', lastInsertId);
                        itemStorage.addItem(element.id, element);
                        window.location.reload();
                    });
                    $(tr).append($('<td colspan="2"></td>').append($button));
                }
            });
        }

        $tBody.append(tr);
    });
};

ListItems.initialData = [
    {
        id: 'item-'+1,
        item: 'Carrots',
        market: 'Marks & Spencer',
        qty: '0.5kg',
        done: false
    },
    {
        id: 'item-'+2,
        item: 'Tomato',
        market: 'Morrisons',
        qty: '2kg',
        done: false
    },
    {
        id: 'item-'+3,
        item: 'Fish',
        market: 'Sainsbury\'s',
        qty: '1kg',
        done: false
    }
];

