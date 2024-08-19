module.exports = function (sequelize, DataTypes) {
    return sequelize.define(
        "image",
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
                comment: "이미지 고유번호",
            },
            article_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                comment: "기사 ID",
                references: {
                    model: "article",
                    key: "id",
                },
            },
            image_path: {
                type: DataTypes.STRING(255),
                allowNull: false,
                comment: "이미지 파일 경로",
            },
        },
        {
            sequelize,
            tableName: "image",
            timestamps: false,
            comment: "기사에 포함된 이미지 테이블",
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
