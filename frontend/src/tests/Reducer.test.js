import rootReducer from '../reducers'
import {
    RECIEVE_CATEGORIES,
    RECIEVE_POSTS,
    RECIEVE_POST,
    RECIEVE_COMMENTS_FOR_ID,
    RECIEVE_COMMENT
} from '../actions'

let initialState;

describe('Reducer', () => {
    beforeEach(() => {
        initialState = {
            categories: [],
            postList: [],
            comments: []
        }
    })

    it('should return default state', () => {
      const action = { type: 'dummy_action' };
  
      expect(rootReducer(undefined, action)).toEqual(initialState);
    });

    it('should handle RECIEVE_CATEGORIES', () => {
        const categories = [{
            "name": "react",
            "path": "react"
        }];
        const action = { type: RECIEVE_CATEGORIES, payload: categories };
        expect(rootReducer(undefined, action).categories).toEqual(categories);
    });

    it('should handle RECIEVE_POSTS', () => {
        const posts = [{
            "id": "8xf0y6ziyjabvozdd253nd",
            "timestamp": 1467166872634,
            "title": "Udacity is the best place to learn React",
            "body": "Everyone says so after all.",
            "author": "thingtwo",
            "category": "react",
            "voteScore": 6,
            "deleted": false,
            "commentCount": null
        }]
        const action = { type: RECIEVE_POSTS, payload: posts };
        expect(rootReducer(undefined, action).postList).toEqual(posts);
    });

    it('should handle RECIEVE_POST', () => {
        const post = {
            "id": "8xf0y6ziyjabvozdd253nd",
            "timestamp": 1467166872634,
            "title": "Udacity is the best place to learn React",
            "body": "Everyone says so after all.",
            "author": "thingtwo",
            "category": "react",
            "voteScore": 6,
            "deleted": false,
            "commentCount": null
        }
        const action = { type: RECIEVE_POST, payload: post };
        expect(rootReducer(undefined, action).postList).toEqual([post]);
    });
});