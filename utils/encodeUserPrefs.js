const userPrefsStrToInt = {
    "Dog": 1, // 2**0
    "Cat": 2, // 2**1
    "Rabbit": 4, // 2**2
    "Small & Furry": 8, // 2**3
    "Horse": 16, // 2**4
    "Bird": 32, // 2**5
    "Scales, Fins & Other": 64, // 2**6
    "Barnyard": 128, // 2**7
    "good_with_children": 256, // 2**8
    "good_with_dogs": 512, // 2**9
    "good_with_cats": 1024, // 2**10
    "house_trained": 2048, // 2**11
    "special_needs": 4096, // 2**12
}

const prefsToInt = (prefs) => {
    let sum = 0;
    prefs.forEach(element => {
        sum += userPrefsStrToInt[element]
    });
    return sum;
}

export default prefsToInt;