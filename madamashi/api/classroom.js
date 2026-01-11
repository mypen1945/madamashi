export default async function handler(req, res) {
    // Vercelの環境変数からAPIキーを取得（ブラウザからは見えません）
    const API_KEY = process.env.GOOGLE_API_KEY;
    const { endpoint, ...params } = req.query;

    // パラメータを組み立て
    const searchParams = new URLSearchParams({
        ...params,
        key: API_KEY
    });

    const url = `https://classroom.googleapis.com/v1/${endpoint}?${searchParams.toString()}`;

    try {
        const response = await fetch(url, {
            headers: {
                'Authorization': req.headers.authorization, // ユーザーのアクセストークンを転送
                'Accept': 'application/json'
            }
        });
        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch Classroom API' });
    }
}