import * as CryptoJS from "crypto-js";

class Block {
    static calculateBlockHash = (
        index: number, 
        previousHash: string, 
        timestamp: number, 
        data: string
    ): string => CryptoJS.SHA256(index + previousHash + timestamp + data).toString();

    static validateStructure = (aBlock: Block): boolean => 
        typeof aBlock.index === "number" && 
        typeof aBlock.hash === "string" && 
        typeof aBlock.previousHash === "string" &&
        typeof aBlock.timestamp === "number" &&
        typeof aBlock.data === "string";

    public index: number;
    public hash: string;
    public previousHash: string;
    public data: string;
    public timestamp: number;
    
    constructor(
        index: number, 
        hash: string, 
        previousHash: string,
        data: string,
        timestamp: number
    ){
        this.index = index;
        this.hash = hash;
        this.previousHash = previousHash;
        this.data = data;
        this.timestamp = timestamp
    }
}

const genesisBlock: Block = new Block(0, "782401af9a6f47594cd55a2c4a9fc7871c159828edb26c742baca7f8130642e0", "", "genesis block", 123456);

let blockchain: Block[] = [genesisBlock];

const getBlockchain = (): Block[] => blockchain;

const getLatestBlock = (): Block => blockchain[blockchain.length - 1];

const getNewTimeStamp = (): number => Math.round(new Date().getTime() / 1000);

const createNewBlock = (data: string): Block => {
    const previousBlock: Block = getLatestBlock();
    const newIndex: number =previousBlock.index + 1;
    const newTimestamp: number = getNewTimeStamp();
    const nextHash: string = Block.calculateBlockHash(
        newIndex, 
        previousBlock.hash, 
        newTimestamp, 
        data
    );
    const newBlock: Block = new Block(
        newIndex, 
        nextHash, 
        previousBlock.hash, 
        data, 
        newTimestamp
    );

    addBlock(newBlock);

    return newBlock;
};

const getHashforBlock = (aBlock: Block): string => Block.calculateBlockHash(aBlock.index, aBlock.previousHash, aBlock.timestamp, aBlock.data);

const isBlockValid = (candidateBlock: Block, previousBlock: Block): boolean => {
    if(!Block.validateStructure(candidateBlock)) { // 구조 확인
        return false;
    } else if(previousBlock.index + 1 !== candidateBlock.index) { // index check
        return false;
    } else if(previousBlock.hash !== candidateBlock.previousHash) { // hash check
        return false;
    } else if(getHashforBlock(candidateBlock) !== candidateBlock.hash) { // hash 계산한 것과 다른지 확인
        return false;
    } else {
        return true;
    }
};

const addBlock = (candidateBlock: Block): void => {
    if(isBlockValid(candidateBlock, getLatestBlock())) {
        blockchain.push(candidateBlock);
    }
};

createNewBlock("second block");
createNewBlock("third block");
createNewBlock("fourth block");


console.log(blockchain);

export {};
