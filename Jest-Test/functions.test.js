const functions=require('./functions'); 
const axios = require ("axios");

//  simple tests
test('add 2 + 2 equals 4', ()=>{
    expect(functions.add(2,2)).toBe(4);
});



// null tests
test('null', () => {
    const n = null;
    expect(n).toBeNull();
    expect(n).toBeDefined();
    expect(n).not.toBeUndefined();
    expect(n).not.toBeTruthy();
    expect(n).toBeFalsy();
});

// Number tests
test('two plus two', () => {
    const value = 2 + 2;
    expect(value).toBeGreaterThan(3);
    expect(value).toBeGreaterThanOrEqual(3.5);
    expect(value).toBeLessThan(5);
    expect(value).toBeLessThanOrEqual(4.5);
  
    // toBe and toEqual are equivalent for numbers
    expect(value).toBe(4);
    expect(value).toEqual(4);
  });

// Arrays 
  
  test('the shopping list has beer on it', () => {
    expect(functions.shoppingList).toContain('beer');
    expect(new Set(functions.shoppingList)).toContain('beer');
  });

// Objects   
test('gleiches Objekt', () => {
    expect(functions.createUser()).toEqual({"firstName":"German", "secondName":"Nemirovski"});
    
  });

  // Testing Asynchroneous calls


  test('get a promize', () => {
    functions.fetchUser().
        then(data => { expect(data.name).toBe('Leanne Graham');});
  });


