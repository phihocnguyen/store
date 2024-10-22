import Header from "../components/header";
import Nav from "../components/Nav/nav";

const Messages = () => {
  const item = [
        { label: 'Dashboard', icon: "src/assets/dasb.svg",  link: "/mainpage" },
        { label: 'Appointments', icon: "src/assets/app.svg", link: "/appointments" },
        { label: 'Patients', icon: "src/assets/pat.svg", link: "/patients" },
        { label: 'Blogs', icon: "src/assets/pat.svg", link: "/blogs" },
        { label: 'Messages', icon: "src/assets/mes.svg", active:true, link: "/messages" },
        { label: 'Report', icon: "src/assets/rep.svg", link: "/report" },
        { label: 'Settings', icon: "src/assets/set.svg", link: "/settings" },
    ];

  const messageList = [
    {
      avatar: "https://placehold.co/40/add8e6/000",
      name: "Ibrahim Kadri",
      lastMessage: "See you next time Doctor. I have had a really great talk.",
    },
    {
      avatar: "https://placehold.co/40/add8e6/000",
      name: "Capri Sun",
      lastMessage: "12pm Tue is that OK?",
    },
    {
      avatar: "https://placehold.co/40/add8e6/000",
      name: "Ibrahim Kadri",
      lastMessage: "See you next time Doctor. I have had a really great talk.",
    },
    {
      avatar: "https://placehold.co/40/add8e6/000",
      name: "Capri Sun",
      lastMessage: "12pm Tue is that OK?",
    },
    {
      avatar: "https://placehold.co/40/add8e6/000",
      name: "Ibrahim Kadri",
      lastMessage: "See you next time Doctor. I have had a really great talk.",
    },
    {
      avatar: "https://placehold.co/40/add8e6/000",
      name: "Capri Sun",
      lastMessage: "12pm Tue is that OK?",
    },
    {
      avatar: "https://placehold.co/40/add8e6/000",
      name: "Ibrahim Kadri",
      lastMessage: "See you next time Doctor. I have had a really great talk.",
    },
    {
      avatar: "https://placehold.co/40/add8e6/000",
      name: "Capri Sun",
      lastMessage: "12pm Tue is that OK?",
    },
    {
      avatar: "https://placehold.co/40/add8e6/000",
      name: "Ibrahim Kadri",
      lastMessage: "See you next time Doctor. I have had a really great talk.",
    },
    {
      avatar: "https://placehold.co/40/add8e6/000",
      name: "Capri Sun",
      lastMessage: "12pm Tue is that OK?",
    },
    {
      avatar: "https://placehold.co/40/add8e6/000",
      name: "Ibrahim Kadri",
      lastMessage: "See you next time Doctor. I have had a really great talk.",
    },
    {
      avatar: "https://placehold.co/40/add8e6/000",
      name: "Capri Sun",
      lastMessage: "12pm Tue is that OK?",
    },
  ];



  return (
    <div className="w-screen h-screen">
      {/* Header */}
      <div className="w-full h-[7.5%] flex items-center border-b border-gray-300">
        <Header />
      </div>
      <div className="grid grid-cols-6 h-[92.5%]">
        <div className="border-r border-gray-300 col-span-1 flex justify-center items-start">
          <Nav items={item} />
        </div>
        <div className="col-span-5 grid grid-cols-4 p-4 bg-customBg">
          <div className="col-span-1 bg-white rounded">
            <div className="flex justify-between p-4 border-b border-gray-300">
              <p className="font-semibold">Messages</p>
              <button>
                <img
                  src="src/assets/search.svg"
                  className="mr-2 ml-3 w-4 h-4"></img>
              </button>
            </div>
            <div className="overflow-y-auto h-[calc(100vh-154px)] py-2 pl-2 pr-3">
              {messageList.map((message, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 rounded hover:bg-gray-200 hover:cursor-pointer w-full">
                  <img
                    className="rounded-full w-10 h-10"
                    src={message.avatar}
                    alt=""
                  />
                  <div className="flex-grow min-w-0">
                    <p className="text-xs font-semibold truncate">
                      {message.name}
                    </p>
                    <p className="text-xs text-gray-600 truncate w-full">
                      {message.lastMessage}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
