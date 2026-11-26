function start() {
  console.log("과제싫은사람 모여라")
}
function and(a,b) {
  if (a === 1 && b === 1) {
    return 1;
  }
  else {
    return 0;
  }
}

function or(a,b) {
  if (a === 0 && b === 0) {
    return 0;
  }
  else {
    return 1;
  }
}

function not(a) {
  if (a === 1) {
    return 0;
  }
  else {
    return 1;
  }
}

function xor(a, b) {
  const both = and(a, b);           // ②
  const notBoth = not(both);        // ③
  const atLeastOne = or(a, b);
  return and(atLeastOne, notBoth);  // ① 그리고 ③
}

function halfAdder(a,b) {
  const sum = xor(a,b);
  const carry = and(a,b);
  return {sum, carry};
}

function fullAdder(a, b, carryIn) {
  const first = halfAdder(a,b);
  const second = halfAdder(first.sum, carryIn);
  const carryOut = or(first.carry, second.carry);
  return { sum: second.sum, carry: carryOut};
}

// [128,64,32,16, 8, 4, 2, 1]  ← 각 자리 값

const A = [0,0,0,0,0,1,0,1];   // 5
const B = [0,0,0,0,0,0,1,1];   // 3

function add8(A, B) {
  const result = [0,0,0,0,0,0,0,0];
  let carry = 0;
  for (let i = A.length - 1; i >= 0; i--){
    const r = fullAdder(A[i], B[i], carry);
    result[i] = r.sum;
    carry = r.carry;
  }
  return result;
}


console.log(add8(A, B));       // [0,0,0,0,1,0,0,0] = 8