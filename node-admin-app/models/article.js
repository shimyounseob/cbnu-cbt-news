module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
      "article",
      {
          id: {
              type: DataTypes.INTEGER,
              autoIncrement: true,
              primaryKey: true,
              allowNull: false,
              comment: "기사 고유번호",
          },
          title: {
              type: DataTypes.STRING(255),
              allowNull: false,
              comment: "게시글 제목",
          },
          content: {
              type: DataTypes.TEXT,
              allowNull: false,
              comment: "게시글 내용 (HTML 형식)",
          },
          publication_issue: {
              type: DataTypes.STRING(100),
              allowNull: true,
              comment: "게시글이 속한 발간호",
          },
          category: {
              type: DataTypes.STRING(100),
              allowNull: true,
              comment: "게시글 카테고리",
          },
          subcategory: {
              type: DataTypes.STRING(100),
              allowNull: true,
              comment: "게시글 세부 카테고리",
          },
          main_writer_id: {
              type: DataTypes.INTEGER,
              allowNull: true,
              comment: "메인 기자 ID (외래 키)",
          },
          created_by: {
              type: DataTypes.INTEGER,
              allowNull: false,
              comment: "게시글 작성자 ID",
          },
          created_at: {
              type: DataTypes.DATE,
              allowNull: false,
              defaultValue: DataTypes.NOW,
              comment: "게시글 작성 시간",
          },
          updated_by: {
              type: DataTypes.INTEGER,
              allowNull: true,
              comment: "게시글 수정자 ID",
          },
          updated_at: {
              type: DataTypes.DATE,
              allowNull: true,
              comment: "게시글 수정 시간",
          },
          view_count: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
            comment: "조회수",
        },

      },
      {
          sequelize,
          tableName: "article",
          timestamps: false,
          comment: "신문 기사 정보 테이블",
          indexes: [
              {
                  name: "PRIMARY",
                  unique: true,
                  using: "BTREE",
                  fields: [{ name: "id" }],
              },
          ],
      }
  );
};
