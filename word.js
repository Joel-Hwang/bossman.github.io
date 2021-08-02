
export class Word{
    constructor(){
        this.list = new Array();
    }

    retrieve(){
        jQuery.ajax({
            method: "GET",
            url: "https://www.tistory.com/apis/comment/list",
            data: {
                access_token: "c80122b26dd7c701a5e4795e8d7ce444_02e5990259cbd49a6a406602a4903714",
                blogName: "5789",
                postId: postId,
                output: 'json'
            }
        }).done(function (msg) {
                let comments = msg.tistory.item.comments;
                history.data = comments;
                let lines;
                for (let i = comments.length - 1; i >= 0; i--) {
                    if (comments[i].parentId === '') {
                        lines = comments[i].comment.split('\n');
                        quizId = comments[i].id;
                        break;
                    } else if (comments[i].parentId !== '' && oneday.isMode) {
                        let comYear = parseInt(comments[i].date.substring(0, 4));
                        let comMonth = parseInt(comments[i].date.substring(5, 7));
                        let comDay = parseInt(comments[i].date.substring(8, 10));
                        let date = new Date();
                        if (comYear == date.getFullYear()
                            && comMonth == (date.getMonth() + 1)
                            && comDay == date.getDate()) {
                            oneday.hadTest = true;
                            oneday.setWrongData(comments[i].comment);
                        }
                    }
                }
                for (let i = 0; i < lines.length; i++) {
                    if (lines[i].startsWith('w:')) {
                        let line = lines[i].substr(2);
                        if ("" === line.trim()) continue;
                        let wordvals = line.split('@next@');
                        for (let j = 0; j < wordvals.length; j++) {
                            let spWordvals = wordvals[j].split(',');
                            spWordvals[0] = spWordvals[0].trim();
                            spWordvals[1] = spWordvals[1].trim();
                            list[j] = spWordvals;
                        }
                    } else if (lines[i].startsWith('s:')) {
                        let line = lines[i].substr(2);
                        if ("" === line.trim()) continue;
                        sentences = line.split('@next@');
                    }
                }
                afterLoad();
            });
    }

    
}