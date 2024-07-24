import Container from "../components/container.tsx";
import { Pages, Token } from "../types";
import { server } from "../main";

export interface IProps {
  token: Token;
  username: string | undefined;
  pages: Pages;
}

export const MainPage = ({ token, username, pages }: IProps) => {
  const bg = "../public/napoleon.jpg";
  return (
    <Container page="Main" pages={pages} username={username}>
      <div className="h-[80vh] flex justify-center items-center p-4">
        {username !== undefined && false && (
          <div className="flex justify-center text-black text-[60px] font-semibold ">
            {`Welcome ${username}!`}
          </div>
        )}
        <div className="p-4 flex justify-center border-1 border-black rounded-lg items-center backdrop-blur-xl brightness-110">
          <div className="text-black">
            <div className="text-[44px] font-semibold">
              Welcome To Conquer The World Teacher Portal!
            </div>
            <div className="text-[32px]">
              Empowering education through engaging gameplay
            </div>
            <div className="text-[22px]">
              <div className="text-[22px] mt-2">Dear educators,</div>
              <div className="text-[22px]">
                We are thrilled to have you join our community of
                forward-thinking educators who are dedicated to enhancing the
                learning experience for students through innovative and
                interactive gameplay.
              </div>
              <div className="flex mt-3">
                <div className="font-bold mr-2 ">1. Sign up and login:</div>
                <div>
                  If you’re new here, click on the "Register" button to create
                  your account. Existing users can log in using their
                  credentials.
                </div>
              </div>
              <div className="flex">
                <div className="font-bold mr-2">2. Explore the dashboard:</div>
                <div>
                  After logging in, you'll be taken to the dashboard where you
                  can create and start your own custom games.
                </div>
              </div>
              <div className="flex">
                <div className="font-bold mr-2">3. Setting up your games:</div>
                <div>
                  Customize your game settings to align with your teaching
                  goals.
                </div>
              </div>
              <div className="mt-3">
                Thank you for being a part of the Conquer The World community.
                Together, we can make learning an exciting and rewarding
                experience for students everywhere.
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};
