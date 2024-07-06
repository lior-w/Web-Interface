import { Fab, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CancelTwoToneIcon from "@mui/icons-material/CancelTwoTone";
import { useState } from "react";

export interface IProps {
  originTags: string[];
  onChange: (tags: string[]) => void;
}

const Tags = ({ originTags, onChange }: IProps) => {
  const [currentTag, setCurrentTag] = useState<string>("");
  const [tags, setTags] = useState<string[]>(originTags);

  const onCurrentTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentTag(e.target.value);
  };

  const handleAddTag = () => {
    currentTag.length > 0 && setTags(tags.concat(currentTag));
    setCurrentTag("");
    handleChange(tags.concat(currentTag));
  };

  const handleDeleteTag = (index: number) => {
    setTags(tags.slice(0, index).concat(tags.slice(index + 1)));
    handleChange(tags.slice(0, index).concat(tags.slice(index + 1)));
  };

  const handleChange = (newTags: string[]) => {
    console.log(newTags);
    onChange(newTags);
  };

  return (
    <div className="mt-[20px]">
      <div className="flex">
        <TextField
          id="tags"
          sx={{
            background: "#FFFFFF",
            width: 500,
            marginTop: 2,
          }}
          className=""
          label="Tags"
          variant="filled"
          onChange={onCurrentTagChange}
          value={currentTag}
        />
        <Fab
          sx={{ marginLeft: 3, marginTop: 2 }}
          color="primary"
          aria-label="add"
          onClick={handleAddTag}
        >
          <AddIcon />
        </Fab>
      </div>

      <div className="w-[100%] flex flex-wrap">
        {tags.map((tag, index) => (
          <div>
            <div className="flex items-center mt-[10px] mr-[10px]">
              <div className="flex w-auto rounded-full border-1 border-gray-500 bg-gray-300 items-center pr-[10px] pt-[5px] pb-[5px]">
                <div className="text-[20px] mr-[10px] ml-[10px]">{`${tag}`}</div>
                <div>
                  <button
                    className="text-gray-400 hover:text-gray-600"
                    onClick={() => handleDeleteTag(index)}
                  >
                    <CancelTwoToneIcon fontSize="medium"></CancelTwoToneIcon>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tags;
