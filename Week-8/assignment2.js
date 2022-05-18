class Node{
    constructor(val){
        this.data=val;
        this.left=null;
        this.right=null;
    }
}
class BinaryTree{
    constructor(){
        this.root=null;
    }
    insert(val){
        var node =new Node(val);
        if(this.isEmpty()){
            this.root=node;
        }
        else{
            this.insertNode(this.root, node);
        }
    }
    insertNode(vertex,newNode){
        if(newNode.data < vertex.data){
            if(vertex.left === null){
                vertex.left = newNode;
            }
            else{
                this.insertNode(vertex.left,newNode);
            }
        }
        else{
            if(vertex.right === null){
                vertex.right = newNode;
            }
            else{
                this.insertNode(vertex.right,newNode);
            }
        }
    }
    getheight(){
        return this.height(this.root);
    }
    height(vertex){
        if(vertex==null){
            return 0;
        }
        var lheight=this.height(vertex.left);
        var rheight=this.height(vertex.right);
        
        if(lheight>rheight)
            return lheight+1;
        else
            return rheight+1 
    }
    isEmpty(){
        if(this.root==null){
            return true;
        }
        return false;
    }
    validateBinaryTree(){
        if(this.getheight()<=1)
            return true;
        return this.validate(-Infinity,this.root,Infinity)
    }
    validate(left,vertex,right){
        if(vertex == null){
            return true;
        }
        if(left<vertex.data && vertex.data<right){
            if(this.validate(left,vertex.left,vertex.data) && this.validate(vertex.data,vertex.right,right))
                return true;
            else
                return false;
        }
        else{
            return false;
        }
    }
    
}

var tree = new BinaryTree();
// tree.printPreOrder();
tree.insert(3);
tree.insert(9);
tree.insert(20);
tree.insert(15);
tree.insert(7);
console.log(tree.validateBinaryTree());

