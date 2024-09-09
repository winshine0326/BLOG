document.getElementById('submitBtn').addEventListener('click', async function() { // 글 저장 버튼 클릭 시 실행
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;

    if (title === '' || content === '') {
        alert('제목과 본문을 모두 입력해주세요.');
        return;
    }

    const postData = {
        title: title,
        content: content
    };

    try {
        const response = await fetch('http://localhost:3000/post', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postData)
        });

        if (response.ok) {
            const result = await response.json();
            alert(result.message);
            window.location.href = 'index.html'; // 저장 후 메인 페이지로 이동
        } else {
            const errorResult = await response.json();
            alert(errorResult.error);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('글 작성에 실패했습니다.');
    }
});
