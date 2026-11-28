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
  const both = and(a, b);
  const notBoth = not(both);
  const atLeastOne = or(a, b);
  return and(atLeastOne, notBoth);
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

// 2진수 만들기

function toBits(n) {
  const bits = [0,0,0,0,0,0,0,0];
  for (let i = bits.length - 1; i >= 0; i--){
    bits[i] = n % 2;
    n = Math.trunc(n / 2);
  }
  return bits;
}

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


// 10진수 만들기
function toNumber(bits) {
  let total = 0;
  let place = 1;
  for (let i = bits.length - 1; i >= 0; i--){
    if (bits[i] === 1){
      total += place
    }
    place *= 2
  }
  return total
}

function not8(bits) {
  const result = [0,0,0,0,0,0,0,0];
  for (let i = bits.length -1; i >= 0; i--) {
    result[i] = not(bits[i])
  }
  return result;
}
