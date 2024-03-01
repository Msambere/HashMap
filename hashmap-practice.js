// HashMap class
class Node{
    constructor(key, hashkey, value, next=null){
        this.key = key
        this.hashkey = hashkey
        this.value=value;
        this.next = next;
    }

}
class linkedList{
    constructor(){
        this.head = null;
        this.length = 0;
    };

    //append(value) adds a new node containing value to the end of the list
    append(newNode){
        //if there is no head, make this the head
        if (this.head == null){
            this.head = newNode;
            this.length++;
        // if there is a head, cycle to end of list and add
        }else{
            let current = this.head
            while (current.next){
                if(current.hashkey == newNode.hashkey){
                    current.value = newNode.value
                    return
                }else{
                current = current.next
                }
            }
            if(current.hashkey == newNode.hashkey){
                current.value = value
                return
            }else{
            current.next = newNode;
            this.length++;
            }
        }  
    };

    //size returns the total number of nodes in the list
    size(){
        return this.length
    }
    //head returns the first node in the list
    head(){
        return this.head
    }
    
    //contains(value) returns true if the passed in value is in the list and otherwise returns false.
    contains(hashkey){
        if (this.size() == 0){
            return false
        }else if (this.size()>= 1){
            let current = this.head
            while(current.next){
                if(current.hashkey == hashkey){
                    return current.hashkey == hashkey
                }else{
                    current = current.next
                }
            }
            return current.hashkey == hashkey
        }
        return  this.head.hashkey == hashkey
    }
    //find(hashkey) returns the value of hashkey or null if not found.
    find(hashkey){
        let current = this.head;
        if (current == null ){
            return null
        }
        while(current.next != null)
            if(current.hashkey == hashkey){
                return current.value;
            }else {
                current = current.next;
            }
        if(current.hashkey == hashkey){
            return current.value
        }else{
            return null
        }
    }
    //toString represents your LinkedList objects as strings, so you can print them out and preview them in the console. The format should be: ( value ) -> ( value ) -> ( value ) -> null
    toString(){
        let current = this.head
        let myString ="";
        while(current.next != null){
            myString+=current.value
            myString+=" -> "
            current = current.next;
        }
        myString += current.value
        myString+=" -> "
        myString+= null
        return myString
    }


    //removeNode(hashkey) that removes the node with a given hashkey
    removeNode(hashkey){
        if (this.size() == 0){
            return false
        }
        let current = this.head;
        if (this.size()== 1){
            if (current.hashkey == hashkey){
                this.head = null
                this.length--
                return true
            }else{
                return false
            }
        }else{
            while(current.next != null){
                if(current.next.hashkey == hashkey){
                    current.next= current.next.next
                    this.length--
                    return true
                }else {
                    current = current.next;
                }
            return false
            }
        }
    }

};


class HashMap{
    constructor(){
        this.buckets = new Array(16);
        for(let i = 0; i<16; i++){
            this.buckets[i]= new linkedList
        }
    }

    hash(key) {
        let hashCode = 0;
           
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
          hashCode = primeNumber * hashCode + key.charCodeAt(i);
        }
     
        return hashCode;
    }
    
    set(key, value){
        let hashkey = this.hash(key)
        let newNode = new Node(key, hashkey, value);
        let index = newNode.hashkey%16;
        if (index < 0 ||  index>= this.buckets.length) {
            throw new Error("Trying to access index out of bound");
          }
        let currentBucket = this.buckets[index]
        currentBucket.append(newNode)


        }
        //deal with collisions

    get(key){
        let hashkey = this.hash(key);
        let index = hashkey%16;
        if (index < 0 ||  index>= this.buckets.length) {
            throw new Error("Trying to access index out of bound");
          }
        let currentBucket = this.buckets[index]
        return currentBucket.find(hashkey)

    } 
    //takes one argument as a key and returns the value that is assigned to this key. 
    //If a key is not found, return null.
        

    has(key){
        let hashkey = this.hash(key);
        let index = hashkey%16;
        if (index < 0 ||  index>= this.buckets.length) {
            throw new Error("Trying to access index out of bound");
          }
        let currentBucket = this.buckets[index]
        return currentBucket.contains(hashkey)
    } 
    //takes a key as an argument and returns true or false based on whether or not the key is in the hash map.

    remove(key){
        let hashkey = this.hash(key);
        let index = hashkey%16;
        if (index < 0 ||  index>= this.buckets.length) {
            throw new Error("Trying to access index out of bound");
          }
        let currentBucket = this.buckets[index]
        return currentBucket.removeNode(hashkey)
    } 
    //takes a key as an argument. 
    //If the given key is in the hash map, it should remove the entry with that key and return true. 
    //If the key isn’t in the hash map, it should return false.

    length(){
        let total = 0
        this.buckets.forEach((bucket)=> {
            total+=bucket.size();
        })
        return total
    }
    //returns the number of stored keys in the hash map.

    clear(){
        this.buckets.forEach((bucket)=>{
            bucket.length = 0
            bucket.head=null
        })
    }
    //removes all entries in the hash map.

    keys(){
        let keyList = []
        this.buckets.forEach((bucket)=>{
            if (bucket.size()==0){
            }else{
                let current = bucket.head
                while(current.next != null){
                    keyList.push(current.key)
                    current = current.next
                }
                keyList.push(current.key)
            }
        })
        return keyList
    } 
    //returns an array containing all the keys inside the hash map.

    values(){
        let valueList = []
        this.buckets.forEach((bucket)=>{
            if (bucket.size()==0){
            }else{
                let current = bucket.head
                while(current.next != null){
                    valueList.push(current.value)
                    current = current.next
                }
                valueList.push(current.value)
            }
        })
        return valueList
    } 
    //returns an array containing all the values.

    entries(){
        let entriesList= []
        this.buckets.forEach((bucket)=>{
            if (bucket.size()==0){
            }else{
                let current = bucket.head
                while(current.next != null){
                    let pair = [current.key, current.value]
                    entriesList.push(pair)
                    current = current.next
                }
                let pair = [current.key, current.value]
                entriesList.push(pair)
            }
        })
        return entriesList

    } 
    //returns an array that contains each key, value pair. Example: [[firstKey, firstValue], [secondKey, secondValue]]


}


//Hardcore for testing

let testMap =new HashMap
testMap.set('star','twinkle')
testMap.set('tiger','roar')
testMap.set('phoneNumber','5132350191')
testMap.set('degrees','1')
testMap.set('meaning of life', 42)