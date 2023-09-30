import { shuffleArray } from '../../utils';
import { DirectoryUserDocument } from '../directory/types';

type CommentsArray = {
  parentResourceId: string;
  comment: string;
  quotedComment: string;
  likesCount: number;
  dislikesCount: number;
  reportsCount: number;
  isFeatured: boolean;
  isDeleted: boolean;
}[];

const commentsArray: CommentsArray = [
  {
    parentResourceId: '64d7f616dc23e0f96d8dda92',
    comment:
      "Welcome to the MacAuley family! 🎉 We're excited to have you on board.",
    quotedComment: '',
    likesCount: 12,
    dislikesCount: 0,
    reportsCount: 0,
    isFeatured: true,
    isDeleted: false,
  },
  {
    parentResourceId: '64d7f616dc23e0f96d8dda92',
    comment:
      "I remember my first day here; it was such a warm welcome. You're in for a treat!",
    quotedComment: '',
    likesCount: 9,
    dislikesCount: 0,
    reportsCount: 0,
    isFeatured: true,
    isDeleted: false,
  },
  {
    parentResourceId: '64d7f616dc23e0f96d8dda92',
    comment:
      "Hello, newcomers! Don't hesitate to ask any questions. We're here to help each other.",
    quotedComment: '',
    likesCount: 7,
    dislikesCount: 0,
    reportsCount: 0,
    isFeatured: true,
    isDeleted: false,
  },
  {
    parentResourceId: '64d7f616dc23e0f96d8dda92',
    comment:
      "Welcome, welcome! Let's make this journey together at MacAuley remarkable.",
    quotedComment: '',
    likesCount: 5,
    dislikesCount: 0,
    reportsCount: 0,
    isFeatured: true,
    isDeleted: false,
  },
  {
    parentResourceId: '64d7f616dc23e0f96d8dda92',
    comment:
      "A big MacAuley welcome to all the new team members. You're in great hands!",
    quotedComment: '',
    likesCount: 6,
    dislikesCount: 0,
    reportsCount: 0,
    isFeatured: true,
    isDeleted: false,
  },
  {
    parentResourceId: '64d7f616dc23e0f96d8dda92',
    comment:
      "Our strength lies in our diversity. Embrace it, and we'll achieve great things together!",
    quotedComment: '',
    likesCount: 8,
    dislikesCount: 0,
    reportsCount: 0,
    isFeatured: true,
    isDeleted: false,
  },
  {
    parentResourceId: '64d7f616dc23e0f96d8dda92',
    comment:
      "Welcome to the MacAuley family! 🌟 Let's build a bright future together.",
    quotedComment: '',
    likesCount: 10,
    dislikesCount: 0,
    reportsCount: 0,
    isFeatured: true,
    isDeleted: false,
  },
  {
    parentResourceId: '64d7f616dc23e0f96d8dda92',
    comment:
      "If you have any questions or need guidance, feel free to reach out. We're a supportive bunch!",
    quotedComment: '',
    likesCount: 4,
    dislikesCount: 0,
    reportsCount: 0,
    isFeatured: true,
    isDeleted: false,
  },
  {
    parentResourceId: '64d7f616dc23e0f96d8dda92',
    comment:
      "Exciting times ahead! Let's collaborate and innovate together, MacAuley newbies.",
    quotedComment: '',
    likesCount: 6,
    dislikesCount: 0,
    reportsCount: 0,
    isFeatured: true,
    isDeleted: false,
  },
  {
    parentResourceId: '64d7f616dc23e0f96d8dda92',
    comment:
      'Welcome, rookies! MacAuley is a place of learning and growth. Embrace the journey.',
    quotedComment: '',
    likesCount: 3,
    dislikesCount: 0,
    reportsCount: 0,
    isFeatured: true,
    isDeleted: false,
  },
  // Additional comments with quotes
  {
    parentResourceId: '64d7f616dc23e0f96d8dda92',
    comment: "MacAuley's warmth and camaraderie are truly exceptional.",
    quotedComment:
      "Welcome to the MacAuley family! 🎉 We're excited to have you on board.",
    likesCount: 2,
    dislikesCount: 0,
    reportsCount: 0,
    isFeatured: true,
    isDeleted: false,
  },
  {
    parentResourceId: '64d7f616dc23e0f96d8dda92',
    comment: "MacAuley's commitment to diversity is commendable.",
    quotedComment:
      "Our strength lies in our diversity. Embrace it, and we'll achieve great things together!",
    likesCount: 1,
    dislikesCount: 0,
    reportsCount: 0,
    isFeatured: true,
    isDeleted: false,
  },
  {
    parentResourceId: '64d7f616dc23e0f96d8dda92',
    comment: 'Greetings to our newest team members! 🎉',
    quotedComment: '',
    likesCount: 12,
    dislikesCount: 0,
    reportsCount: 0,
    isFeatured: true,
    isDeleted: false,
  },
  {
    parentResourceId: '64d7f616dc23e0f96d8dda92',
    comment: "Exciting times ahead! Let's embark on this journey together.",
    quotedComment: '',
    likesCount: 9,
    dislikesCount: 0,
    reportsCount: 0,
    isFeatured: true,
    isDeleted: false,
  },
  {
    parentResourceId: '64d7f616dc23e0f96d8dda92',
    comment:
      "A warm MacAuley welcome to the newcomers. We're thrilled to have you!",
    quotedComment: '',
    likesCount: 7,
    dislikesCount: 0,
    reportsCount: 0,
    isFeatured: true,
    isDeleted: false,
  },
  {
    parentResourceId: '64d7f616dc23e0f96d8dda92',
    comment:
      "Let's create something amazing together at MacAuley. Welcome aboard!",
    quotedComment: '',
    likesCount: 5,
    dislikesCount: 0,
    reportsCount: 0,
    isFeatured: true,
    isDeleted: false,
  },
  {
    parentResourceId: '64d7f616dc23e0f96d8dda92',
    comment:
      'We believe in the power of diversity. Your unique perspectives will drive us forward.',
    quotedComment: '',
    likesCount: 6,
    dislikesCount: 0,
    reportsCount: 0,
    isFeatured: true,
    isDeleted: false,
  },
  {
    parentResourceId: '64d7f616dc23e0f96d8dda92',
    comment:
      "Welcome to the MacAuley family! Let's make a difference together.",
    quotedComment: '',
    likesCount: 8,
    dislikesCount: 0,
    reportsCount: 0,
    isFeatured: true,
    isDeleted: false,
  },
  {
    parentResourceId: '64d7f616dc23e0f96d8dda92',
    comment:
      "If you have questions, don't hesitate to ask. We're here to support you!",
    quotedComment: '',
    likesCount: 4,
    dislikesCount: 0,
    reportsCount: 0,
    isFeatured: true,
    isDeleted: false,
  },
  {
    parentResourceId: '64d7f616dc23e0f96d8dda92',
    comment:
      "The possibilities are endless at MacAuley. Welcome, and let's dream big!",
    quotedComment: '',
    likesCount: 6,
    dislikesCount: 0,
    reportsCount: 0,
    isFeatured: true,
    isDeleted: false,
  },
  {
    parentResourceId: '64d7f616dc23e0f96d8dda92',
    comment: 'New beginnings bring new opportunities. Welcome to MacAuley!',
    quotedComment: '',
    likesCount: 3,
    dislikesCount: 0,
    reportsCount: 0,
    isFeatured: true,
    isDeleted: false,
  },
  {
    parentResourceId: '64d7f616dc23e0f96d8dda92',
    comment:
      "Together, we'll achieve greatness. Welcome to our vibrant community!",
    quotedComment: '',
    likesCount: 5,
    dislikesCount: 0,
    reportsCount: 0,
    isFeatured: true,
    isDeleted: false,
  },
  // Additional comments with quotes
  {
    parentResourceId: '64d7f616dc23e0f96d8dda92',
    comment:
      'I completely agree with the sentiment expressed earlier. MacAuley is all about unity and progress.',
    quotedComment:
      "A warm MacAuley welcome to the newcomers. We're thrilled to have you!",
    likesCount: 2,
    dislikesCount: 0,
    reportsCount: 0,
    isFeatured: true,
    isDeleted: false,
  },
  {
    parentResourceId: '64d7f616dc23e0f96d8dda92',
    comment:
      "Absolutely, diversity is our strength. Together, we'll achieve remarkable things.",
    quotedComment:
      'We believe in the power of diversity. Your unique perspectives will drive us forward.',
    likesCount: 1,
    dislikesCount: 0,
    reportsCount: 0,
    isFeatured: true,
    isDeleted: false,
  },
  {
    parentResourceId: '64d7f616dc23e0f96d8dda92',
    comment: "We're all in this together! 🎉",
    quotedComment: '',
    likesCount: 12,
    dislikesCount: 0,
    reportsCount: 0,
    isFeatured: true,
    isDeleted: false,
  },
  {
    parentResourceId: '64d7f616dc23e0f96d8dda92',
    comment: 'Exciting times ahead as we welcome new talents to MacAuley!',
    quotedComment: '',
    likesCount: 9,
    dislikesCount: 0,
    reportsCount: 0,
    isFeatured: true,
    isDeleted: false,
  },
  {
    parentResourceId: '64d7f616dc23e0f96d8dda92',
    comment:
      "A hearty MacAuley welcome to our newest members. Let's achieve greatness!",
    quotedComment: '',
    likesCount: 7,
    dislikesCount: 0,
    reportsCount: 0,
    isFeatured: true,
    isDeleted: false,
  },
  {
    parentResourceId: '64d7f616dc23e0f96d8dda92',
    comment: "Together, we'll create magic at MacAuley. Welcome aboard!",
    quotedComment: '',
    likesCount: 5,
    dislikesCount: 0,
    reportsCount: 0,
    isFeatured: true,
    isDeleted: false,
  },
  {
    parentResourceId: '64d7f616dc23e0f96d8dda92',
    comment:
      'We believe in the strength of diversity. Your unique perspectives will enrich us.',
    quotedComment: '',
    likesCount: 6,
    dislikesCount: 0,
    reportsCount: 0,
    isFeatured: true,
    isDeleted: false,
  },
  {
    parentResourceId: '64d7f616dc23e0f96d8dda92',
    comment:
      "Welcome to the MacAuley family! Let's write our success story together.",
    quotedComment: '',
    likesCount: 8,
    dislikesCount: 0,
    reportsCount: 0,
    isFeatured: true,
    isDeleted: false,
  },
  {
    parentResourceId: '64d7f616dc23e0f96d8dda92',
    comment:
      "Questions? Don't hesitate to ask. We're here to guide and support you!",
    quotedComment: '',
    likesCount: 4,
    dislikesCount: 0,
    reportsCount: 0,
    isFeatured: true,
    isDeleted: false,
  },
  {
    parentResourceId: '64d7f616dc23e0f96d8dda92',
    comment: 'The possibilities are endless at MacAuley. Welcome, dreamers!',
    quotedComment: '',
    likesCount: 6,
    dislikesCount: 0,
    reportsCount: 0,
    isFeatured: true,
    isDeleted: false,
  },
  {
    parentResourceId: '64d7f616dc23e0f96d8dda92',
    comment: 'New beginnings bring new opportunities. Welcome to MacAuley!',
    quotedComment: '',
    likesCount: 3,
    dislikesCount: 0,
    reportsCount: 0,
    isFeatured: true,
    isDeleted: false,
  },
  {
    parentResourceId: '64d7f616dc23e0f96d8dda92',
    comment:
      "Together, we'll shape the future. Welcome to our vibrant community!",
    quotedComment: '',
    likesCount: 5,
    dislikesCount: 0,
    reportsCount: 0,
    isFeatured: true,
    isDeleted: false,
  },
  {
    parentResourceId: '64d7f616dc23e0f96d8dda92',
    comment:
      'I completely agree with the sentiment expressed earlier. MacAuley is all about unity and progress.',
    quotedComment:
      "A hearty MacAuley welcome to our newest members. Let's achieve greatness!",
    likesCount: 2,
    dislikesCount: 0,
    reportsCount: 0,
    isFeatured: true,
    isDeleted: false,
  },
  {
    parentResourceId: '64d7f616dc23e0f96d8dda92',
    comment:
      "Absolutely, diversity is our strength. Together, we'll achieve remarkable things.",
    quotedComment:
      'We believe in the strength of diversity. Your unique perspectives will enrich us.',
    likesCount: 1,
    dislikesCount: 0,
    reportsCount: 0,
    isFeatured: true,
    isDeleted: false,
  },
  {
    parentResourceId: '64d7f616dc23e0f96d8dda92',
    comment: "We're all excited to welcome new faces to our MacAuley family!",
    quotedComment: '',
    likesCount: 12,
    dislikesCount: 0,
    reportsCount: 0,
    isFeatured: true,
    isDeleted: false,
  },
  {
    parentResourceId: '64d7f616dc23e0f96d8dda92',
    comment:
      "It's a pleasure to have you join our journey. Let's make it memorable!",
    quotedComment: '',
    likesCount: 9,
    dislikesCount: 0,
    reportsCount: 0,
    isFeatured: true,
    isDeleted: false,
  },
  {
    parentResourceId: '64d7f616dc23e0f96d8dda92',
    comment:
      'A warm MacAuley welcome to all newcomers. Your ideas will shape our future.',
    quotedComment: '',
    likesCount: 7,
    dislikesCount: 0,
    reportsCount: 0,
    isFeatured: true,
    isDeleted: false,
  },
  {
    parentResourceId: '64d7f616dc23e0f96d8dda92',
    comment:
      "Together, we'll innovate and grow. Welcome to the MacAuley family!",
    quotedComment: '',
    likesCount: 5,
    dislikesCount: 0,
    reportsCount: 0,
    isFeatured: true,
    isDeleted: false,
  },
  {
    parentResourceId: '64d7f616dc23e0f96d8dda92',
    comment:
      'Diversity is our strength. Your unique backgrounds enrich our collective journey.',
    quotedComment: '',
    likesCount: 6,
    dislikesCount: 0,
    reportsCount: 0,
    isFeatured: true,
    isDeleted: false,
  },
  {
    parentResourceId: '64d7f616dc23e0f96d8dda92',
    comment:
      "Welcome to the MacAuley family! Let's create amazing experiences together.",
    quotedComment: '',
    likesCount: 8,
    dislikesCount: 0,
    reportsCount: 0,
    isFeatured: true,
    isDeleted: false,
  },
  {
    parentResourceId: '64d7f616dc23e0f96d8dda92',
    comment:
      "Have questions? Don't hesitate to ask. We're here to support your journey.",
    quotedComment: '',
    likesCount: 4,
    dislikesCount: 0,
    reportsCount: 0,
    isFeatured: true,
    isDeleted: false,
  },
  {
    parentResourceId: '64d7f616dc23e0f96d8dda92',
    comment: 'The possibilities are limitless at MacAuley. Welcome, dreamers!',
    quotedComment: '',
    likesCount: 6,
    dislikesCount: 0,
    reportsCount: 0,
    isFeatured: true,
    isDeleted: false,
  },
  {
    parentResourceId: '64d7f616dc23e0f96d8dda92',
    comment: 'New beginnings bring new opportunities. Welcome to MacAuley!',
    quotedComment: '',
    likesCount: 3,
    dislikesCount: 0,
    reportsCount: 0,
    isFeatured: true,
    isDeleted: false,
  },
  {
    parentResourceId: '64d7f616dc23e0f96d8dda92',
    comment:
      "Together, we'll shape the future. Welcome to our vibrant community!",
    quotedComment: '',
    likesCount: 5,
    dislikesCount: 0,
    reportsCount: 0,
    isFeatured: true,
    isDeleted: false,
  },
  // Additional comments with quotes
  {
    parentResourceId: '64d7f616dc23e0f96d8dda92',
    comment:
      'I echo the sentiment expressed earlier. MacAuley is all about unity and progress.',
    quotedComment:
      'A warm MacAuley welcome to all newcomers. Your ideas will shape our future.',
    likesCount: 2,
    dislikesCount: 0,
    reportsCount: 0,
    isFeatured: true,
    isDeleted: false,
  },
  {
    parentResourceId: '64d7f616dc23e0f96d8dda92',
    comment:
      "Absolutely, diversity is our cornerstone. Together, we'll achieve remarkable things.",
    quotedComment:
      'Diversity is our strength. Your unique backgrounds enrich our collective journey.',
    likesCount: 1,
    dislikesCount: 0,
    reportsCount: 0,
    isFeatured: true,
    isDeleted: false,
  },
];

type ReturnCommentsWithoutQuotedUsernameReturnType = ReturnType<
  typeof returnCommentsWithoutQuotedUsername
>;

type ReturnCommentsWithoutQuotedUsername = (args: {
  commentsArray: CommentsArray;
  userDocs: DirectoryUserDocument[];
}) => ReturnCommentsWithoutQuotedUsernameReturnType;

function returnCommentsWithoutQuotedUsername({
  commentsArray,
  userDocs,
}: {
  userDocs: DirectoryUserDocument[];
  commentsArray: CommentsArray;
}) {
  return commentsArray.map((comment) => {
    const { likesCount, dislikesCount, reportsCount } = comment;

    // pick a random user
    const randomUser = userDocs[Math.floor(Math.random() * userDocs.length)];

    // grab their details
    const { _id, username, roles, jobPosition, department, profilePictureUrl } =
      randomUser;

    // shuffle array
    const shuffledUsers = shuffleArray(userDocs);

    // pick amount equal to likes count
    const likedUsers = shuffledUsers.slice(0, likesCount);
    const likedUserIds = likedUsers.map((user) => user._id);

    // remove the liked users from shuffled array
    const shuffledUsersMinusLikedUsers = shuffledUsers.slice(likesCount);

    // pick amount equal to dislikes count
    const dislikedUsers = shuffledUsersMinusLikedUsers.slice(0, dislikesCount);
    const dislikedUserIds = dislikedUsers.map((user) => user._id);

    // remove the disliked users from shuffled array
    const shuffledUsersMinusLikedAndDislikedUsers =
      shuffledUsersMinusLikedUsers.slice(dislikesCount);

    // pick amount equal to reports count
    const reportedUsers = shuffledUsersMinusLikedAndDislikedUsers.slice(
      0,
      reportsCount
    );
    const reportedUserIds = reportedUsers.map((user) => user._id);

    const requestBody = {
      userId: _id,
      username,
      roles,
      jobPosition,
      department,
      profilePictureUrl,
      parentResourceId: comment.parentResourceId,
      comment: comment.comment,
      quotedComment: comment.quotedComment,

      likesCount: comment.likesCount,
      dislikesCount: comment.dislikesCount,
      reportsCount: comment.reportsCount,

      isFeatured: comment.isFeatured,
      isDeleted: comment.isDeleted,

      likedUserIds,
      dislikedUserIds,
      reportedUserIds,
    };

    return requestBody;
  });
}

type CommentRequestBodyWithoutQuotedUsernames = ReturnType<
  typeof returnCommentsWithoutQuotedUsername
>;

// add quotedUsername to the comments
function returnCommentsRequestBodies({
  commentsArray,
  userDocs,
  returnCommentsWithoutQuotedUsername,
}: {
  commentsArray: CommentsArray;
  userDocs: DirectoryUserDocument[];
  returnCommentsWithoutQuotedUsername: ReturnCommentsWithoutQuotedUsername;
}) {
  const commentRequestBodyWithoutQuotedUsernames =
    returnCommentsWithoutQuotedUsername({
      commentsArray,
      userDocs,
    });

  return commentRequestBodyWithoutQuotedUsernames.reduce(
    (bodiesAcc, comment) => {
      const { quotedComment } = comment;
      // if there is no quoted comment, return the comment as is
      if (!quotedComment.length) {
        // 50 percent change to toggle isFeatured
        const isFeaturedToggle = Math.random() < 0.5;
        const commentWithIsFeatured = {
          ...comment,
          isFeatured: isFeaturedToggle,
        };

        bodiesAcc.push(commentWithIsFeatured);
        return bodiesAcc;
      }

      // find the user who made the quoted comment
      const quotedUser = commentRequestBodyWithoutQuotedUsernames.find(
        (comment) => comment.comment === quotedComment
      );
      if (!quotedUser)
        throw new Error(`Quoted user not found: ${quotedComment}`);

      // grab their username
      const { username: quotedUsername } = quotedUser;

      // add quotedUsername to the comment
      const commentWithQuotedUsername = {
        ...comment,
        quotedUsername,
      };

      bodiesAcc.push(commentWithQuotedUsername);

      return bodiesAcc;
    },
    [] as CommentRequestBodyWithoutQuotedUsernames
  );
}

export {
  commentsArray,
  returnCommentsRequestBodies,
  returnCommentsWithoutQuotedUsername,
};
