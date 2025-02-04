const knexConfig = require("../knexfile");
const knex = require("knex")(knexConfig);
const helperFunction = require("../utils/helper_functions/helperfunctions");
const { ResponseVO, PaginationResVO, ErrorVO } = require("../vo/responseVo");

class UserModel {
  static async userExists(email) {
    const existingUser = await knex("user").where({ email }).first();
    return existingUser;
  }

  static async createUser(userData) {
    const name = userData.name;
    const email = userData.email;
    const role = userData.role;
    const password = await helperFunction.hashPassword(userData.password);

    const currentTime = Date.now();
    const expiry = currentTime + 5 * 60 * 1000;
    const otp = await helperFunction.generateOTP();
    try {
      const result = await knex.transaction(async (trx) => {
        try {
          const [{ user_id: user_id1, name: name1, email: email1 }] = await trx("user")
            .insert({ name, email, password, role })
            .returning([
              "user_id",
              "name",
              "email",
              "role",
            ]);

          const [{ user_id: user_id2, otp_for_create_acount: otp2 }] = await trx("otp_for_createaccount")
            .insert({ user_id: user_id1, otp_for_create_acount: otp, expiry_at: expiry })
            .returning([
              "user_id",
              "otp_for_create_acount",
            ]);

          console.log("Data inserted successfully.");

          const data = { user_id2, otp2, email1, name1 };

          return data;
        } catch (error) {
          await trx.rollback();
          console.error("Error inserting data:", error);
          throw new Error("Failed to create user.");
        }

        finally {
          knex.destroy();
        }
      });
      return result;
    } catch (error) {
      throw error
    }
  }


  static async loginUser(userData) {
    const email = userData.email;
    const plainPassword = userData.password;

    try {
      const userData1 = await knex("user")
        .select(
          "user_id",
          "name",
          "email",
          "role",
          "password",
        )
        .where({ email: email })
        .first();

      const comparePassword = await helperFunction.comparePasswords(
        plainPassword,
        userData1.password
      );

      const user = {
        user_id: userData1.user_id,
        name: userData1.name,
        email: userData1.email,
        role: userData1.role,
      }



      if (comparePassword) {
        const access_token = await helperFunction.generateRefreshToken(user);
        const refresh_token = await helperFunction.generateAccessToken(user);
        console.log(userData1.user_id)


        const userData2 = await knex("user")
          .where({ user_id: userData1.user_id })
          .update({
            access_token: access_token,
            refresh_token: refresh_token
          })
          .returning([
            "user_id",
            "name",
            "email",
            "role",
            "access_token",
            "refresh_token"]
          )
        return userData2;
      } else {
        throw ("Incorrect Password");
      }

    } catch (error) {
      throw error;
    }

  }
}

module.exports = UserModel;