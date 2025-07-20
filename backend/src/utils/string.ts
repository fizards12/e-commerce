export function hashString(str: string) {
    // Initialize the hash value to 0
    let hash = 0;
    // If the string is empty, return the hash value (which is 0)
    if (str.length === 0) return hash;
    // Iterate over each character in the string
    for (let i = 0; i < str.length; i++) {
        // Get the ASCII code of the current character
        const char = str.charCodeAt(i);
        // Calculate the hash value by shifting the current hash value 5 bits to the left,
        // subtracting the current hash value, and adding the ASCII code of the current character
        hash = (hash << 5) - hash + char;
        // Convert the hash value to a 32-bit integer by performing a bitwise AND operation
        hash = hash & hash;
    }
    // Return the final hash value
    return hash;
}

