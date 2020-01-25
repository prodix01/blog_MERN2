import React, {Component} from 'react';
import axios from "axios";
import Moment from "react-moment";

class Dashboard extends Component {

    state = {
        posts: []
    };

    componentDidMount() {
        axios
            .get("/posts")
            .then(res => this.setState({
                posts: res.data.posts
            }))
            .catch(err =>console.log(err.response.data));

        this.setState({

        })
    }


    render() {

        const {posts} = this.state;
        console.log(posts);

        return (
            <div>
                <table className="table">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Title</th>
                        <th scope="col">Name</th>
                        <th scope="col">Date</th>
                    </tr>
                    </thead>
                    {posts.map(post =>

                        <tbody>
                        <tr>
                            <th scope="row"></th>
                            <td>{post.text}</td>
                            <td>{post.name}</td>
                            <td>
                                <Moment format="YYYY년 MM월 DD일">
                                    {post.date}
                                </Moment>
                            </td>
                        </tr>

                        </tbody>
                    )}
                </table>
            </div>
        );
    }
}

export default Dashboard;