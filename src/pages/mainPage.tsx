import Container from "../components/container.tsx";
import { Pages, Token } from "../types";
import { server } from "../main";

export interface IProps {
  token: Token;
  username: string | undefined;
  pages: Pages;
}

export const MainPage = ({ token, username, pages }: IProps) => {
  return (
    <Container page="main" pages={pages} username={username}>
      {username === undefined ? (
        <div className="flex justify-center">
          <div className="text-brown max-w-[1600px]">
            <div className="text-[46px] font-semibold">
              Welcome to Conquer The World Teacher Portal!
            </div>
            <div className="text-[36px]">
              Empowering Education Through Engaging Gameplay
            </div>
            <div className="text-[24px]">
              <div className="text-[24px] mt-2">Dear Educators,</div>
              <div className="text-[24px]">
                We are thrilled to have you join our community of
                forward-thinking educators who are dedicated to enhancing the
                learning experience for students through innovative and
                interactive gameplay.
              </div>
              <div className="flex mt-3">
                <div className="font-bold mr-2 min-w-[250px]">
                  1. Sign Up and Login:
                </div>
                <div>
                  If you’re new here, click on the "Register" button to create
                  your account. Existing users can log in using their
                  credentials.
                </div>
              </div>
              <div className="flex">
                <div className="font-bold mr-2 min-w-[300px]">
                  2. Explore the Dashboard:
                </div>
                <div>
                  After logging in, you'll be taken to the dashboard where you
                  can create and start your own custom games.
                </div>
              </div>
              <div className="flex">
                <div className="font-bold mr-2 min-w-[305px]">
                  3. Setting Up Your Classes:
                </div>
                <div>
                  Add your classes and enroll students to get started. Customize
                  your game settings to align with your teaching goals.
                </div>
              </div>
              <div className="mt-3">
                Thank you for being a part of the Conquer The World community.
                Together, we can make learning an exciting and rewarding
                experience for students everywhere.
              </div>
              <div className="mt-2">Happy Teaching!</div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center text-brown text-[60px] font-semibold mt-4">
          {`Welcome ${username}!`}
        </div>
      )}
    </Container>
  );
};
