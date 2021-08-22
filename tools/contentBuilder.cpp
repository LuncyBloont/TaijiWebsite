#include <iostream>
#include <fstream>
#include <sstream>

#define CONTENTS_PATH "contents\\"
#define OUTPUT_PATH "format\\"

const std::string files[] = {
    "news_page_list.txt",
    "best_page_list.txt",
    "process_page_list.txt",
    "what_content.txt",
    "aboutus_page.txt"
};

std::string& replace_all(std::string& str, const std::string& old_value, const std::string& new_value)     
{ 
    for (std::string::size_type pos(0); pos != std::string::npos; pos += new_value.length())  
    { 
        if((pos = str.find(old_value,pos)) != std::string::npos)     
        { 
            str.replace(pos, old_value.length(), new_value);
        }   
        else
        {
            break;
        }    
    }     
    return str;     
}     

bool enformat(std::string filename)
{
    std::ifstream rf(CONTENTS_PATH + filename);
    if (rf.fail()) return false;
    
    std::string content = "";
    std::string outfile;
    
    std::string varname = filename.substr(0, filename.find_last_of("."));
    std::cout << "\t列表变量名：" << varname << std::endl;
    content += "var " + varname + " = [\n";
    outfile = varname + ".js";

    while (!rf.eof())
    {
        std::string s;
        std::getline(rf, s);
        if (s.find("@@") == 0)
        {
            std::string title = s.substr(2, s.size() - 3);
            std::string body = "";
            while (!rf.eof())
            {
                std::string ss;
                std::getline(rf, ss);
                if (ss.find("@") == 0 && (ss[1] == '\n' || ss[1] == '\r')) break;
                replace_all(ss, "\"", "\\\"");
                body += "<p>" + ss.substr(0, ss.size() - 1) + "<br /><p />";
            }
            content += "    \"" + title + "\", \"" + body + "\",\n";
        }
    }

    content[content.size() - 2] = '\n';
    content[content.size() - 1] = ']';
    content += ";\n";

    std::ofstream wf(OUTPUT_PATH + outfile);
    if (wf.fail()) return false;

    wf << content;

    rf.close();
    wf.close();

    return true;
}

int main()
{
    std::cout << "Hello! " << std::endl;

    for (int i = 0; i < sizeof(files) / sizeof(std::string); i++)
    {
        std::cout << "处理文件 " << files[i] << " 中……" << std::endl;
        if (!enformat (files[i]))
        {
            std::cerr << "\t*文件 " << files[i] << " 处理失败！！" << std::endl; 
        }
        else
        {
            std::cout << "\t文件 " << files[i] << " 处理完毕。" << std::endl;
        }
    }
    
    // std::getchar();
    return 0;
}