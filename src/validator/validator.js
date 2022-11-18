const express = require("express");
const bcrypt = require("bcryptjs")

const validate = (valueToHash, HashedValue ) => {

console.log(valueToHash)
console.log(HashedValue)

   const hash = bcrypt.hashSync(valueToHash, '$2a$10$CwTycUXWue0Thq9StjUM0u');
    if(HashedValue == hash){
        return true;
    }

    return false;


}


 module.exports = {
    validate
  }