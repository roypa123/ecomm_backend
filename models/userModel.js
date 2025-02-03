const knexConfig = require("../knexfile");
const knex = require("knex")(knexConfig);
const HelperFunction = require("../utils/helper_functions/helperfuctions");
const Constants = require("../utils/constants");
const { ResponseVO, PaginationResVO, ErrorVO } = require("../vo/responseVo");

class UserModel {
  static async userExists(email) {
    console.log(email);
    const existingUser = knex("user").where({ email }).first();
    return existingUser;
  }

  static async createUser(userData) {
    const first_name = userData.first_name;
    const last_name = userData.last_name;
    const email = userData.email;
    const role = userData.role;
    const password = await HelperFunction.hashPassword(userData.password);
    const apikey = await HelperFunction.generateApiKey();

    const createdUser = await knex("user")
      .insert({ first_name, last_name, email, password, apikey, role })
      .returning([
        "user_id",
        "first_name",
        "last_name",
        "email",
        "role",
        "apikey",
        "payment_end_date",
      ]);

    const createdUser1 = createdUser[0];

    return createdUser1;
  }

  static async loginUser(userData) {
    const email = userData.email;
    const plainPassword = userData.password;
    const role = userData.role;

    console.log("sss");

    const userData1 = await knex("user")
      .select(
        "password",
        "apikey",
        "user_id",
        "first_name",
        "last_name",
        "role",
        "email",
        "payment_end_date"
      )
      .where({ email: email, role: role })
      .first();

    const comparePassword = await HelperFunction.comparePasswords(
      plainPassword,
      userData1.password
    );
    console.log(comparePassword);

    if (comparePassword) {
      return {
        user_id: userData1.user_id,
        first_name: userData1.first_name,
        last_name: userData1.last_name,
        email: userData1.email,
        role: userData1.role,
        apikey: userData1.apikey,
        payment_end_date: userData1.payment_end_date,
      };
    } else {
      return null;
    }
  }

  static async fetchingUserDataForPasswordRequest(email) {
    console.log(email);

    const userData1 = await knex("user")
      .select("user_id")
      .where({ email: email })
      .first();

    return userData1;
  }

  static async sendingDataToRequestTokenTable(
    userId,
    requesttoken,
    futureTime
  ) {
    const user_id = userId;
    const token = requesttoken;
    const expiry_at = futureTime;

    const existingMedia = await knex("resettoken")
      .select("id")
      .where({ user_id });

    console.log("manu");

    if (existingMedia.length > 0) {
      // Update the existing record
      const updatedMedia = await knex("resettoken")
        .where({ user_id })
        .update({ token, expiry_at })
        .returning(["id", "user_id", "token", "expiry_at"]);
      console.log(updatedMedia);
      return updatedMedia;
    } else {
      // Insert a new record

      const createdMedia = await knex("resettoken")
        .insert({ user_id, token, expiry_at })
        .returning(["id", "user_id", "token", "expiry_at"]);
      console.log(createdMedia);
      return createdMedia;
    }
  }

  static async tokenExists(userData) {
    const token = userData.token;

    try {
      // const tokenData = await knex("resettoken")
      //   .select("id", "user_id", "token", "expiry_at")
      //   .where({ token })
      //   .first();

      const tokenData = await knex("resettoken")
        .select(
          "resettoken.id",
          "resettoken.user_id",
          "resettoken.token",
          "resettoken.expiry_at",
          "user.apikey"
        )
        .join("user", "resettoken.user_id", "user.user_id")
        .where({ "resettoken.token": token })
        .first();

      return tokenData;
    } catch (e) {
      throw e;
    }
  }

  static async tokenChangePassword(userData) {
    const id = userData.id;
    const user_id = userData.user_id;
    const token = userData.token;
    const apikey = userData.apikey;
    const password = await HelperFunction.hashPassword(userData.password);

    try {
      const passwordupdated = await knex("user")
        .where({ user_id, apikey })
        .update({
          password: password,
        });

      if (passwordupdated === 1) {
        const tabledeleted = await knex("resettoken").where({ id }).del();
        return tabledeleted;
      } else {
        throw new Error("Failed to update password.");
      }
    } catch (e) {
      throw e;
    }
  }
}

module.exports = UserModel;