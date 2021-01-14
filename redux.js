console.clear();

// People dropping off a form (Action Creators)
const createPolicy = (name, amount) => {
  
return {//Action (a form in our analogy)
  type:'CREATE_POLICY',
  payload: {
   name: name,
    amount:amount
  }  
 };
};

const deletePolicy = (name) => {  
  return {//Action (a form in our analogy)
    type:'DELETE_POLICY',
    payload: {
     name: name,      
    }  
   };
};

const createClaim = (name, amountOfMoneyToCollect) => {  
  return {//Action (a form in our analogy)
    type:'CREATE_CLAIM',
    payload: {
     name: name,      
     amountOfMoneyToCollect:amountOfMoneyToCollect
    }  
   };
};


// Reducers(Departments!)
const claimsHistory = (oldListOfClaims = [], action) => {
  if (action.type === "CREATE_CLAIM") {
  //WE CARE ABOUT THIS ACTION (FORM)
    return[...oldListOfClaims, action.payload]
  }
  //we don't care the action (form)
  return oldListOfClaims;  
;}

const accounting = (bagOfMoney = 100, action) => {
  if (action.type === "CREATE_CLAIM") {
  //WE CARE ABOUT THIS ACTION (FORM)
    return bagOfMoney - action.payload.amountOfMoneyToCollect;
  }
  else if (action.type === "CREATE_POLICY") {
  //WE CARE ABOUT THIS ACTION (FORM)
    return bagOfMoney + action.payload.amount;
  }
  //we don't care the action (form)
  return bagOfMoney;  
;}

const policies= (listOfPolicies = [], action) => {
  if(action.type === 'CREATE_POLICY') {
    return [...listOfPolicies, action.payload.name];
  } else if (action.type === 'DELETE_POLICY'){
    return listOfPolicies.filter(name => name !== action.payload.name)
  }
  return listOfPolicies
};

const { createStore, combineReducers} = Redux;

const ourDepartments = combineReducers({
  accounting: accounting,
  claimsHistory: claimsHistory,
  policies: policies
})

const store = createStore(ourDepartments);
store.dispatch(createPolicy('Alex', 20 ));
store.dispatch(createPolicy('Jim', 30 ));
store.dispatch(createPolicy('Alex', 40 ));

store.dispatch(createClaim('Alex', 120 ));
store.dispatch(createClaim('Jim', 50 ));

store.dispatch(deletePolicy('Bob' ));
store.dispatch(createPolicy('Weslei', 200 ));
store.dispatch(createClaim('Weslei', 120 ));
store.dispatch(deletePolicy('Weslei' ));


console.log(store.getState());