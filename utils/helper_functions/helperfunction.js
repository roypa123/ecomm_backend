const { v4: uuidv4 } = require("uuid");
const crypto = require("crypto");
const bcrypt = require("bcrypt");

class HelperFunction {
  static async generateApiKey() {
    const uuid = uuidv4();
    const apiKey = uuid.replace(/-/g, "").substring(0, 32);
    return apiKey.toString(); // Convert to string explicitly
  }

  static async generateImagesNames() {
    const uuid = uuidv4();
    const apiKey = uuid.replace(/-/g, "").substring(0, 10);
    return apiKey.toString(); // Convert to string explicitly
  }

  static async encrypt(input, encodedkey) {
    try {
      const algorithm = "aes-256-cbc";
      const iv = crypto.randomBytes(16); // Generate a random initialization vector (IV)

      const key = Buffer.from(encodedkey, "base64");
      const cipher = crypto.createCipheriv(algorithm, key, iv);

      let encryptedData = cipher.update(input, "utf8", "hex");
      encryptedData += cipher.final("hex");

      // Store the IV along with the encrypted data for decryption
      //return { ciphertext: encryptedData, iv: iv.toString("hex") };
      return encryptedData;
    } catch (error) {
      console.error("Encryption error:", error);
      throw error;
    }
  }

  static async hashPassword(password) {
    try {
      const saltRounds = 10; // Number of salt rounds to generate
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      return hashedPassword;
    } catch (error) {
      console.error("Error hashing password:", error);
      throw error; // Re-throw the error for proper handling
    }
  }

  static async comparePasswords(plainPassword, hashedPassword) {
    try {
      const match = await bcrypt.compare(plainPassword, hashedPassword);
      return match;
    } catch (error) {
      console.error("Error comparing passwords:", error);
      throw error; // Re-throw the error for proper handling
    }
  }

  static async isValidEmail(email) {
    // Regular expression for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    //console.log(emailRegex.test(email));
    return emailRegex.test(email);
  }

  static async isValidPassword(password) {
    // Minimum password length requirement
    const minLength = 8;

    // Regular expressions for additional requirements
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*()\-_=+[\]{};:'",.<>/?\\|`~]/.test(password);


    // Check if password meets all requirements
    return (
      password.length >= minLength &&
      hasUppercase &&
      hasLowercase &&
      hasNumber &&
      hasSpecialChar
    );
  }

  //////-----------------/////
}

module.exports = HelperFunction;
